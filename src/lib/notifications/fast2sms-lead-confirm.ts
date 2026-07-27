import type { SendResult, SmsSender } from "./types";

type Fast2SmsLeadConfig = {
  apiKey: string;
  baseUrl: string;
  mode: string;
  senderId: string;
  entityId: string | null;
  templateIdLogin: string | null;
  dltMessageTemplateLogin: string | null;
  appName: string;
};

function trimEnv(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function getFast2SmsLeadConfig(): Fast2SmsLeadConfig | null {
  const apiKey = trimEnv(process.env.FAST2SMS_API_KEY);
  if (!apiKey) return null;

  return {
    apiKey,
    baseUrl:
      trimEnv(process.env.FAST2SMS_BASE_URL) ??
      "https://www.fast2sms.com/dev/bulkV2",
    mode: trimEnv(process.env.FAST2SMS_MODE) ?? "dlt_manual",
    senderId: trimEnv(process.env.FAST2SMS_SENDER_ID) ?? "",
    entityId: trimEnv(process.env.FAST2SMS_ENTITY_ID),
    templateIdLogin: trimEnv(process.env.FAST2SMS_TEMPLATE_ID_LOGIN),
    dltMessageTemplateLogin: trimEnv(
      process.env.FAST2SMS_DLT_MESSAGE_TEMPLATE_LOGIN,
    ),
    appName: trimEnv(process.env.FAST2SMS_APP_NAME) ?? "Dravio",
  };
}

function renderDltVarTemplate(template: string, values: string[]): string {
  let index = 0;
  return template.replace(/\{#var#\}/g, () => {
    const value = values[index] ?? "";
    index += 1;
    return value;
  });
}

function e164ToFast2SmsNumber(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    return digits.slice(2);
  }
  return digits;
}

function buildLeadConfirmBody(
  config: Fast2SmsLeadConfig,
  phone: string,
  message: string,
): URLSearchParams {
  const mode = config.mode.trim().toLowerCase();
  const payload = new URLSearchParams();

  if (mode === "otp") {
    payload.set("route", "otp");
    payload.set("numbers", phone);
    payload.set("variables_values", message.slice(0, 160));
    return payload;
  }

  const templateId = config.templateIdLogin;
  if (!templateId) {
    throw new Error("FAST2SMS_TEMPLATE_ID_LOGIN is required for SMS fallback.");
  }

  if (mode === "dlt") {
    payload.set("route", "dlt");
    payload.set("sender_id", config.senderId);
    payload.set("message", templateId);
    payload.set("variables_values", `${message.slice(0, 120)}|${config.appName}`);
    payload.set("numbers", phone);
    if (config.entityId) payload.set("entity_id", config.entityId);
    return payload;
  }

  const template = config.dltMessageTemplateLogin;
  if (!template) {
    throw new Error(
      "FAST2SMS_DLT_MESSAGE_TEMPLATE_LOGIN is required for dlt_manual mode.",
    );
  }
  if (!config.entityId) {
    throw new Error("FAST2SMS_ENTITY_ID is required for dlt_manual mode.");
  }

  const rendered = renderDltVarTemplate(template, [
    message.slice(0, 120),
    config.appName,
  ]);

  payload.set("route", "dlt_manual");
  payload.set("sender_id", config.senderId);
  payload.set("entity_id", config.entityId);
  payload.set("template_id", templateId);
  payload.set("message", rendered);
  payload.set("numbers", phone);
  return payload;
}

type Fast2SmsResponse = {
  return?: boolean;
  message?: string | string[];
  request_id?: string;
};

function formatFast2SmsError(body: Fast2SmsResponse): string {
  const msg = body.message;
  if (Array.isArray(msg) && msg.length > 0) return msg.join(" ");
  if (typeof msg === "string" && msg.trim()) return msg.trim();
  return "SMS provider rejected the request.";
}

export function createFast2SmsLeadConfirmSender(): SmsSender | null {
  const config = getFast2SmsLeadConfig();
  if (!config) return null;

  return {
    async sendConfirmation(phoneE164: string, message: string): Promise<SendResult> {
      const phone = e164ToFast2SmsNumber(phoneE164);
      if (phone.length < 10) {
        return { ok: false, error: "Invalid phone number for SMS." };
      }

      let body: URLSearchParams;
      try {
        body = buildLeadConfirmBody(config, phone, message);
      } catch (error) {
        const err =
          error instanceof Error ? error.message : "Invalid SMS configuration.";
        return { ok: false, error: err };
      }

      try {
        const response = await fetch(config.baseUrl, {
          method: "POST",
          headers: {
            authorization: config.apiKey,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: body.toString(),
          cache: "no-store",
        });

        const parsed = (await response.json().catch(() => ({}))) as Fast2SmsResponse;
        if (!response.ok || parsed.return !== true) {
          return { ok: false, error: formatFast2SmsError(parsed) };
        }

        return {
          ok: true,
          providerMsgId:
            typeof parsed.request_id === "string" ? parsed.request_id : undefined,
        };
      } catch (error) {
        const err =
          error instanceof Error ? error.message : "SMS request failed.";
        return { ok: false, error: err };
      }
    },
  };
}

export function isSmsFallbackEnabled(): boolean {
  const raw = process.env.NOTIFICATION_SMS_ENABLED?.trim().toLowerCase();
  return raw !== "false" && raw !== "0";
}

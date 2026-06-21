import "server-only";

import { getFast2SmsConfig } from "@/lib/sms/fast2sms-config";

type SendResult = { ok: true } | { ok: false; error: string };

type Fast2SmsResponse = {
  return?: boolean;
  message?: string | string[];
  request_id?: string;
};

function formatFast2SmsError(body: Fast2SmsResponse): string {
  const msg = body.message;
  if (Array.isArray(msg) && msg.length > 0) {
    return msg.join(" ");
  }
  if (typeof msg === "string" && msg.trim()) {
    return msg;
  }
  return "SMS provider rejected the request.";
}

/** Replace DLT {#var#} placeholders in registration order (OTP, app name, …). */
export function renderDltVarTemplate(
  template: string,
  values: string[],
): string {
  let index = 0;
  return template.replace(/\{#var#\}/g, () => {
    const value = values[index] ?? "";
    index += 1;
    return value;
  });
}

function buildFormBody(phone: string, otp: string): URLSearchParams {
  const config = getFast2SmsConfig();
  if (!config) {
    throw new Error("Fast2SMS is not configured.");
  }

  const mode = config.mode.trim().toLowerCase();
  const payload = new URLSearchParams();

  if (mode === "otp") {
    payload.set("route", "otp");
    payload.set("numbers", phone);
    payload.set("variables_values", otp);
    return payload;
  }

  if (mode === "dlt") {
    const templateId = config.templateIdLogin;
    if (!templateId) {
      throw new Error("FAST2SMS_TEMPLATE_ID_LOGIN is required for DLT route.");
    }
    payload.set("route", "dlt");
    payload.set("sender_id", config.senderId);
    payload.set("message", templateId);
    payload.set("variables_values", `${otp}|${config.appName}`);
    payload.set("numbers", phone);
    if (config.entityId) {
      payload.set("entity_id", config.entityId);
    }
    return payload;
  }

  // dlt_manual — pre-render message; Fast2SMS does not substitute {#var#} via variables_values.
  const template = config.dltMessageTemplateLogin;
  if (!template) {
    throw new Error(
      "FAST2SMS_DLT_MESSAGE_TEMPLATE_LOGIN is required for dlt_manual mode.",
    );
  }
  if (!config.templateIdLogin) {
    throw new Error(
      "FAST2SMS_TEMPLATE_ID_LOGIN is required for dlt_manual mode.",
    );
  }
  if (!config.entityId) {
    throw new Error("FAST2SMS_ENTITY_ID is required for dlt_manual mode.");
  }

  const message = renderDltVarTemplate(template, [otp, config.appName]);
  if (!message.includes(otp)) {
    throw new Error("DLT template must include OTP placeholders.");
  }
  if (message.includes("{#var#}")) {
    throw new Error(
      "DLT template still contains unreplaced {#var#} placeholders.",
    );
  }

  payload.set("route", "dlt_manual");
  payload.set("sender_id", config.senderId);
  payload.set("entity_id", config.entityId);
  payload.set("template_id", config.templateIdLogin);
  payload.set("message", message);
  payload.set("numbers", phone);
  return payload;
}

/** Sends a login/register OTP via Fast2SMS (Indian 10-digit numbers). */
export async function sendFast2SmsLoginOtp(
  phone: string,
  otp: string,
): Promise<SendResult> {
  const config = getFast2SmsConfig();
  if (!config) {
    return {
      ok: false,
      error: "SMS verification is not configured. Contact support.",
    };
  }

  if (!config.senderId && config.mode.trim().toLowerCase() !== "otp") {
    return { ok: false, error: "SMS sender is not configured." };
  }

  let body: URLSearchParams;
  try {
    body = buildFormBody(phone, otp);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid SMS configuration.";
    console.error("[sendFast2SmsLoginOtp] config", message);
    return { ok: false, error: "Could not send OTP. Try again later." };
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

    const parsed = (await response
      .json()
      .catch(() => ({}))) as Fast2SmsResponse;

    if (!response.ok || parsed.return !== true) {
      console.error("[sendFast2SmsLoginOtp]", response.status, parsed);
      return {
        ok: false,
        error: formatFast2SmsError(parsed),
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[sendFast2SmsLoginOtp]", error);
    return {
      ok: false,
      error: "Could not send OTP. Check your network and try again.",
    };
  }
}

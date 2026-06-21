import "server-only";

export type Fast2SmsConfig = {
  apiKey: string;
  baseUrl: string;
  mode: string;
  senderId: string;
  entityId: string | null;
  templateIdLogin: string | null;
  templateIdReset: string | null;
  dltMessageTemplateLogin: string | null;
  /** Second {#var#} in the login DLT template (product name). */
  appName: string;
};

function trimEnv(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getFast2SmsConfig(): Fast2SmsConfig | null {
  const apiKey = trimEnv(process.env.FAST2SMS_API_KEY);
  if (!apiKey) return null;

  return {
    apiKey,
    baseUrl: trimEnv(process.env.FAST2SMS_BASE_URL) ?? "https://www.fast2sms.com/dev/bulkV2",
    mode: trimEnv(process.env.FAST2SMS_MODE) ?? "dlt_manual",
    senderId: trimEnv(process.env.FAST2SMS_SENDER_ID) ?? "",
    entityId: trimEnv(process.env.FAST2SMS_ENTITY_ID),
    templateIdLogin: trimEnv(process.env.FAST2SMS_TEMPLATE_ID_LOGIN),
    templateIdReset: trimEnv(process.env.FAST2SMS_TEMPLATE_ID_RESET),
    dltMessageTemplateLogin: trimEnv(process.env.FAST2SMS_DLT_MESSAGE_TEMPLATE_LOGIN),
    appName: trimEnv(process.env.FAST2SMS_APP_NAME) ?? "Dravio",
  };
}

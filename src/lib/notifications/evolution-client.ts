import type { SendResult, WhatsAppPayload, WhatsAppSender } from "./types";

export type EvolutionClientConfig = {
  baseUrl: string;
  apiKey: string;
  instanceName: string;
};

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getEvolutionClientConfig(): EvolutionClientConfig | null {
  const baseUrl = process.env.EVOLUTION_API_URL?.trim();
  const apiKey = process.env.EVOLUTION_API_KEY?.trim();
  const instanceName = process.env.EVOLUTION_INSTANCE_NAME?.trim();
  if (!baseUrl || !apiKey || !instanceName) return null;
  return { baseUrl: trimTrailingSlash(baseUrl), apiKey, instanceName };
}

function extractProviderMsgId(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const record = body as Record<string, unknown>;
  const key = record.key;
  if (key && typeof key === "object" && "id" in key) {
    const id = (key as { id?: unknown }).id;
    if (typeof id === "string" && id.trim()) return id.trim();
  }
  if (typeof record.messageId === "string" && record.messageId.trim()) {
    return record.messageId.trim();
  }
  return undefined;
}

function formatEvolutionError(body: unknown, status: number): string {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    const message = record.message ?? record.error;
    if (typeof message === "string" && message.trim()) return message.trim();
    if (Array.isArray(message) && message.length > 0) {
      return message.map(String).join(" ");
    }
  }
  return `Evolution API error (${status})`;
}

export function createEvolutionWhatsAppSender(
  config: EvolutionClientConfig,
): WhatsAppSender {
  return {
    async send(payload: WhatsAppPayload): Promise<SendResult> {
      const endpoint =
        payload.kind === "text"
          ? `${config.baseUrl}/message/sendText/${encodeURIComponent(config.instanceName)}`
          : `${config.baseUrl}/message/sendMedia/${encodeURIComponent(config.instanceName)}`;

      const body =
        payload.kind === "text"
          ? { number: payload.number, text: payload.text }
          : {
              number: payload.number,
              mediatype: payload.mediatype,
              media: payload.media,
              ...(payload.fileName ? { fileName: payload.fileName } : {}),
              ...(payload.mimeType ? { mimetype: payload.mimeType } : {}),
              ...(payload.caption ? { caption: payload.caption } : {}),
            };

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            apikey: config.apiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
          cache: "no-store",
        });

        const parsed = await response.json().catch(() => ({}));
        if (!response.ok) {
          return {
            ok: false,
            error: formatEvolutionError(parsed, response.status),
          };
        }

        return {
          ok: true,
          providerMsgId: extractProviderMsgId(parsed),
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Evolution API request failed";
        return { ok: false, error: message };
      }
    },
  };
}

export function createEvolutionWhatsAppSenderFromEnv(): WhatsAppSender | null {
  const config = getEvolutionClientConfig();
  if (!config) return null;
  return createEvolutionWhatsAppSender(config);
}

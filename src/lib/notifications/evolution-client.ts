import type { SendResult, WhatsAppPayload, WhatsAppSender } from "./types";

export type EvolutionClientConfig = {
  baseUrl: string;
  apiKey: string;
  instanceName: string;
};

export type WhatsAppLinkMethod = "qr" | "code";

export type EvolutionConnectResult = {
  pairingCode?: string | null;
  qrDataUrl?: string | null;
  code?: string;
  count?: number;
};

export type EvolutionConnectionStateResult = {
  instanceName: string;
  state: "open" | "close" | "connecting" | string;
};

export class EvolutionApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "EvolutionApiError";
  }
}

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function flattenMessage(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return value.map(flattenMessage).filter(Boolean).join(" ");
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return flattenMessage(record.message ?? record.error ?? record.exists ?? "");
  }
  return "";
}

/**
 * Evolution nests the useful reason under `response.message` (often an array),
 * while the top-level `error` is only the generic HTTP label ("Forbidden").
 * Read the specific field first so callers can match on the real text.
 */
function formatEvolutionError(body: unknown, status: number): string {
  const record = asRecord(body);
  const nested = asRecord(record.response);

  for (const candidate of [nested.message, record.message, record.error]) {
    const text = flattenMessage(candidate);
    if (text) return text;
  }
  return `Evolution API error (${status})`;
}

function extractProviderMsgId(body: unknown): string | undefined {
  const record = asRecord(body);
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

/** Digits only — Evolution expects country code without "+" / spaces. */
export function toEvolutionNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

function normalizeQrDataUrl(value: string | null | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  if (raw.startsWith("data:")) return raw;
  return `data:image/png;base64,${raw}`;
}

export function getEvolutionClientConfig(): EvolutionClientConfig | null {
  const baseUrl = process.env.EVOLUTION_API_URL?.trim();
  const apiKey = process.env.EVOLUTION_API_KEY?.trim();
  const instanceName = process.env.EVOLUTION_INSTANCE_NAME?.trim();
  if (!baseUrl || !apiKey || !instanceName) return null;
  return { baseUrl: trimTrailingSlash(baseUrl), apiKey, instanceName };
}

/**
 * Client for the self-hosted Evolution API (evolution-package Docker stack).
 * On the app server, point EVOLUTION_API_URL at localhost (e.g. http://localhost:8080).
 */
export class EvolutionClient {
  readonly baseUrl: string;
  readonly apiKey: string;
  readonly instanceName: string;

  constructor(config: EvolutionClientConfig) {
    this.baseUrl = trimTrailingSlash(config.baseUrl);
    this.apiKey = config.apiKey.trim();
    this.instanceName = config.instanceName.trim();
  }

  static fromEnv(): EvolutionClient | null {
    const config = getEvolutionClientConfig();
    if (!config) return null;
    return new EvolutionClient(config);
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const response = await fetch(url, {
      ...init,
      headers: {
        apikey: this.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

    const body = (await response.json().catch(() => ({}))) as unknown;
    if (!response.ok) {
      let message = formatEvolutionError(body, response.status);
      // 405 on a valid path means we reached the Manager UI, not the REST API.
      if (response.status === 405) {
        message = `${message}. Check EVOLUTION_API_URL — use the API port (http://localhost:8080), not the Manager UI (:3001).`;
      }
      throw new EvolutionApiError(
        response.status,
        String(asRecord(body).code ?? "EVOLUTION_API_ERROR"),
        message,
        body,
      );
    }
    return body as T;
  }

  /** Create Baileys WhatsApp instance (idempotent if name already exists). */
  async createInstance(instanceName = this.instanceName): Promise<void> {
    try {
      await this.request("/instance/create", {
        method: "POST",
        body: JSON.stringify({
          instanceName,
          integration: "WHATSAPP-BAILEYS",
          qrcode: true,
          rejectCall: true,
          msgCall: "Please send a message instead of calling.",
          groupsIgnore: true,
          alwaysOnline: true,
          readMessages: false,
          readStatus: false,
          syncFullHistory: false,
        }),
      });
    } catch (error) {
      // Evolution returns 403/409 with "already in use" when the name is taken.
      // Do not treat every 403 as success (a wrong API key is also 403).
      if (error instanceof EvolutionApiError) {
        const msg = error.message.toLowerCase();
        if (
          error.status === 409 ||
          msg.includes("already") ||
          msg.includes("in use") ||
          msg.includes("exist")
        ) {
          return;
        }
      }
      throw error;
    }
  }

  /** Fetch QR / pairing credentials to link a phone. */
  async getLinkCredentials(
    linkMethod: WhatsAppLinkMethod = "qr",
    phoneDigits?: string,
    instanceName = this.instanceName,
  ): Promise<EvolutionConnectResult> {
    void linkMethod;
    const query = phoneDigits
      ? `?number=${encodeURIComponent(toEvolutionNumber(phoneDigits))}`
      : "";
    const result = await this.request<Record<string, unknown>>(
      `/instance/connect/${encodeURIComponent(instanceName)}${query}`,
      { method: "GET" },
    );

    const qrcode = asRecord(result.qrcode);
    const base64 =
      (typeof result.base64 === "string" ? result.base64 : null) ??
      (typeof qrcode.base64 === "string" ? qrcode.base64 : null);

    return {
      pairingCode:
        typeof result.pairingCode === "string" ? result.pairingCode : null,
      qrDataUrl: normalizeQrDataUrl(base64),
      code: typeof result.code === "string" ? result.code : undefined,
      count: typeof result.count === "number" ? result.count : undefined,
    };
  }

  async getConnectionState(
    instanceName = this.instanceName,
  ): Promise<EvolutionConnectionStateResult> {
    const result = await this.request<Record<string, unknown>>(
      `/instance/connectionState/${encodeURIComponent(instanceName)}`,
      { method: "GET" },
    );
    const instance = asRecord(result.instance);
    return {
      instanceName:
        typeof instance.instanceName === "string"
          ? instance.instanceName
          : instanceName,
      state: typeof instance.state === "string" ? instance.state : "close",
    };
  }

  async fetchInstances(): Promise<unknown> {
    return this.request("/instance/fetchInstances", { method: "GET" });
  }

  /** Instance names known to Evolution, for diagnosing name mismatches. */
  async listInstanceNames(): Promise<string[]> {
    const result = await this.fetchInstances();
    if (!Array.isArray(result)) return [];
    return result
      .map((entry) => {
        const record = asRecord(entry);
        const instance = asRecord(record.instance);
        const name = record.name ?? record.instanceName ?? instance.instanceName;
        return typeof name === "string" ? name : null;
      })
      .filter((name): name is string => Boolean(name));
  }

  /**
   * Register webhook for connection + send events.
   * From Evolution Docker → host Next.js, use host.docker.internal (not localhost).
   */
  async setWebhook(
    webhookUrl: string,
    instanceName = this.instanceName,
  ): Promise<void> {
    await this.request(`/webhook/set/${encodeURIComponent(instanceName)}`, {
      method: "POST",
      body: JSON.stringify({
        webhook: {
          enabled: true,
          url: webhookUrl,
          webhookByEvents: false,
          webhookBase64: false,
          events: ["SEND_MESSAGE", "MESSAGES_UPSERT", "CONNECTION_UPDATE"],
        },
      }),
    });
  }

  async sendPayload(payload: WhatsAppPayload): Promise<SendResult> {
    const number = toEvolutionNumber(payload.number);
    const endpoint =
      payload.kind === "text"
        ? `/message/sendText/${encodeURIComponent(this.instanceName)}`
        : `/message/sendMedia/${encodeURIComponent(this.instanceName)}`;

    const body =
      payload.kind === "text"
        ? { number, text: payload.text, delay: 0, linkPreview: true }
        : {
            number,
            mediatype: payload.mediatype,
            media: payload.media,
            delay: 0,
            ...(payload.fileName ? { fileName: payload.fileName } : {}),
            ...(payload.mimeType ? { mimetype: payload.mimeType } : {}),
            ...(payload.caption ? { caption: payload.caption } : {}),
          };

    try {
      const parsed = await this.request<unknown>(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });
      return { ok: true, providerMsgId: extractProviderMsgId(parsed) };
    } catch (error) {
      if (error instanceof EvolutionApiError) {
        return { ok: false, error: error.message };
      }
      const message =
        error instanceof Error ? error.message : "Evolution API request failed";
      return { ok: false, error: message };
    }
  }

  /** Disconnect WhatsApp session (keeps instance; can re-scan QR). */
  async logoutInstance(instanceName = this.instanceName): Promise<void> {
    try {
      await this.request(`/instance/logout/${encodeURIComponent(instanceName)}`, {
        method: "DELETE",
      });
    } catch (error) {
      // Already-disconnected instances answer 400/404; that is the desired end state.
      if (error instanceof EvolutionApiError) {
        const msg = error.message.toLowerCase();
        if (
          error.status === 404 ||
          msg.includes("not found") ||
          msg.includes("not connected") ||
          msg.includes("is not") ||
          msg.includes("disconnected") ||
          msg.includes("close") ||
          msg.includes("logout")
        ) {
          return;
        }
      }
      throw error;
    }
  }

  /** Remove the instance entirely from Evolution. */
  async deleteInstance(instanceName = this.instanceName): Promise<void> {
    try {
      await this.request(`/instance/delete/${encodeURIComponent(instanceName)}`, {
        method: "DELETE",
      });
    } catch (error) {
      if (error instanceof EvolutionApiError) {
        const msg = error.message.toLowerCase();
        if (error.status === 404 || msg.includes("not found")) {
          return;
        }
      }
      throw error;
    }
  }
}

export function createEvolutionWhatsAppSender(
  config: EvolutionClientConfig,
): WhatsAppSender {
  const client = new EvolutionClient(config);
  return {
    async send(payload: WhatsAppPayload): Promise<SendResult> {
      return client.sendPayload(payload);
    },
  };
}

export function createEvolutionWhatsAppSenderFromEnv(): WhatsAppSender | null {
  const config = getEvolutionClientConfig();
  if (!config) return null;
  return createEvolutionWhatsAppSender(config);
}

/** Build webhook URL Evolution should call (appends ?token= when secret is set). */
export function buildEvolutionWebhookUrl(): string | null {
  const base =
    process.env.EVOLUTION_WEBHOOK_URL?.trim() ||
    (process.env.NEXT_PUBLIC_SITE_URL
      ? `${trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL)}/api/webhooks/evolution`
      : null);
  if (!base) return null;

  const secret = process.env.EVOLUTION_WEBHOOK_SECRET?.trim();
  if (!secret) return base;
  if (base.includes("token=")) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}token=${encodeURIComponent(secret)}`;
}

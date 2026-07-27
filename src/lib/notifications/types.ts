import type { LeadFormType } from "@/lib/leads/types";

export type SendResult =
  | { ok: true; providerMsgId?: string }
  | { ok: false; error: string };

export type WhatsAppTextPayload = {
  kind: "text";
  number: string;
  text: string;
};

export type WhatsAppMediaPayload = {
  kind: "media";
  number: string;
  mediatype: "document" | "image" | "video" | "audio";
  media: string;
  fileName?: string;
  mimeType?: string;
  caption?: string;
};

export type WhatsAppPayload = WhatsAppTextPayload | WhatsAppMediaPayload;

export interface WhatsAppSender {
  send(payload: WhatsAppPayload): Promise<SendResult>;
}

export interface SmsSender {
  sendConfirmation(phoneE164: string, message: string): Promise<SendResult>;
}

export type LeadMessageContext = {
  id: string;
  formType: LeadFormType | string;
  name: string | null;
  pageLabel: string | null;
  pagePath: string | null;
  variant: string | null;
  neetScore: number | null;
  neetCategory: string | null;
  domicileState: string | null;
  targetStates: string | null;
  city: string | null;
  queryType: string | null;
  message: string | null;
  preferredSlot: string | null;
};

export type TemplateFn = (ctx: LeadMessageContext) => string;

export type NotificationMessageSpec =
  | { kind: "text"; text: TemplateFn }
  | {
      kind: "document";
      url: TemplateFn;
      fileName: string;
      caption?: TemplateFn;
      mimeType?: string;
    }
  | {
      kind: "image";
      url: TemplateFn;
      caption?: TemplateFn;
      mimeType?: string;
    };

export type ResolvedWhatsAppMessage =
  | { kind: "text"; text: string }
  | {
      kind: "document";
      url: string;
      fileName: string;
      caption?: string;
      mimeType?: string;
    }
  | {
      kind: "image";
      url: string;
      caption?: string;
      mimeType?: string;
    };

export type LeadForNotification = {
  id: string;
  formType: string;
  phoneE164: string | null;
  name: string | null;
  pageLabel: string | null;
  pagePath: string | null;
  variant: string | null;
  neetScore: number | null;
  neetCategory: string | null;
  domicileState: string | null;
  targetStates: string | null;
  city: string | null;
  queryType: string | null;
  message: string | null;
  preferredSlot: string | null;
};

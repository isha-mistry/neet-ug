import { e164ToEvolutionNumber } from "@/lib/leads/normalize-phone-e164";
import type {
  LeadForNotification,
  LeadMessageContext,
  ResolvedWhatsAppMessage,
  WhatsAppPayload,
} from "./types";
import { getNotificationMessageSpec } from "./message-templates";

function toMessageContext(lead: LeadForNotification): LeadMessageContext {
  return {
    id: lead.id,
    formType: lead.formType,
    name: lead.name,
    pageLabel: lead.pageLabel,
    pagePath: lead.pagePath,
    variant: lead.variant,
    neetScore: lead.neetScore,
    neetCategory: lead.neetCategory,
    domicileState: lead.domicileState,
    targetStates: lead.targetStates,
    city: lead.city,
    queryType: lead.queryType,
    message: lead.message,
    preferredSlot: lead.preferredSlot,
  };
}

export function resolveWhatsAppMessage(
  lead: LeadForNotification,
): ResolvedWhatsAppMessage {
  const ctx = toMessageContext(lead);
  const spec = getNotificationMessageSpec(lead.formType);

  switch (spec.kind) {
    case "text":
      return { kind: "text", text: spec.text(ctx) };
    case "document":
      return {
        kind: "document",
        url: spec.url(ctx),
        fileName: spec.fileName,
        caption: spec.caption?.(ctx),
        mimeType: spec.mimeType ?? "application/pdf",
      };
    case "image":
      return {
        kind: "image",
        url: spec.url(ctx),
        caption: spec.caption?.(ctx),
        mimeType: spec.mimeType ?? "image/jpeg",
      };
    default:
      return { kind: "text", text: "Thank you for contacting Dravio." };
  }
}

export function toWhatsAppPayload(
  phoneE164: string,
  message: ResolvedWhatsAppMessage,
): WhatsAppPayload {
  const number = e164ToEvolutionNumber(phoneE164);

  if (message.kind === "text") {
    return { kind: "text", number, text: message.text };
  }

  if (message.kind === "document") {
    return {
      kind: "media",
      number,
      mediatype: "document",
      media: message.url,
      fileName: message.fileName,
      mimeType: message.mimeType,
      caption: message.caption,
    };
  }

  return {
    kind: "media",
    number,
    mediatype: "image",
    media: message.url,
    mimeType: message.mimeType,
    caption: message.caption,
  };
}

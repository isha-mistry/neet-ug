import { FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE } from "@/lib/mbbs-state/constants";
import {
  getCounselWhatsAppUrl,
  getCounselWhatsAppWaMeBase,
} from "@/lib/leads/counsel-whatsapp-config";

export { FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE };

export function counselWhatsAppBaseUrl(): string {
  return getCounselWhatsAppWaMeBase();
}

/** Opens WhatsApp with a prefilled multi-line message. */
export function openCounselWhatsApp(lines: string[]): void {
  const url = counselWhatsAppUrl(lines.join("\n"));
  window.open(url, "_blank", "noopener,noreferrer");
}

export function counselWhatsAppUrl(text: string): string {
  return getCounselWhatsAppUrl(text);
}

/** Prefilled WhatsApp body after free-counselling lead forms (book counselling modal, etc.). */
export function buildFreeCounsellingWhatsAppMessage(details: {
  name?: string;
  countryCode?: string;
  phone?: string;
  domicileState?: string;
}): string[] {
  const lines = [FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE];
  const extras: string[] = [];
  if (details.name?.trim()) extras.push(`Name: ${details.name.trim()}`);
  if (details.phone?.trim()) {
    const cc = details.countryCode?.trim() || "+91";
    extras.push(`Mobile: ${cc} ${details.phone.trim()}`);
  }
  if (details.domicileState?.trim()) {
    extras.push(`Domicile state: ${details.domicileState.trim()}`);
  }
  if (extras.length > 0) {
    lines.push("", ...extras);
  }
  return lines;
}

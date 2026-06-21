import {
  getCounselWhatsAppUrl,
  getCounselWhatsAppWaMeBase,
} from "@/lib/leads/counsel-whatsapp-config";

export const MBBS_STATE_LAST_UPDATED = "May 2026";

export const FOCUS_STATE_SLUGS = [
  "gujarat",
  "rajasthan",
  "madhya-pradesh",
  "maharashtra",
] as const;

/** Prefill for direct WhatsApp links and free counselling CTAs. */
export const FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE =
  "Hi Dravio, I want a free MBBS counselling review. My score is ___, category is ___, and domicile state is ___.";

export const COUNSEL_WHATSAPP_WA_ME_BASE = getCounselWhatsAppWaMeBase();

export const COUNSEL_WHATSAPP_URL = getCounselWhatsAppUrl(
  FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE,
);

export const COUNSEL_BOOK_CALL_URL = "/contact";

export function mbbsStatePath(slug: string) {
  return `/mbbs-in-india/${slug}`;
}

/** Full college directory with state filter locked (e.g. `/colleges/state/gujarat`). */
export function collegesStateListingPath(stateSlug: string) {
  return `/colleges/state/${stateSlug}`;
}

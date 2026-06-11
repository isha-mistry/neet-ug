export const MBBS_STATE_LAST_UPDATED = "May 2026";

export const FOCUS_STATE_SLUGS = [
  "gujarat",
  "rajasthan",
  "madhya-pradesh",
  "maharashtra",
] as const;

export const COUNSEL_WHATSAPP_URL =
  "https://wa.me/919090909090?text=Hi%20MedSeat%2C%20I%20need%20help%20with%20MBBS%20admission";

export const COUNSEL_BOOK_CALL_URL = "/#contact";

export function mbbsStatePath(slug: string) {
  return `/mbbs-in-india/${slug}`;
}

/** Full college directory with state filter locked (e.g. `/colleges/state/gujarat`). */
export function collegesStateListingPath(stateSlug: string) {
  return `/colleges/state/${stateSlug}`;
}

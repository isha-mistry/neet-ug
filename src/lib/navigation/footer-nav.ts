import type { LinkItem } from "@/types/core";

/** Shorter quota list for the footer — full list stays in the header nav. */
export const FOOTER_QUOTA_LINKS: LinkItem[] = [
  { label: "Quota overview", href: "/quota" },
  { label: "All India Quota (AIQ)", href: "/quota/all-india" },
  { label: "State quota", href: "/quota/state" },
  { label: "Management quota", href: "/quota/management" },
  { label: "NRI quota", href: "/quota/nri" },
  { label: "Reservation categories", href: "/quota/categories" },
];

import type { LinkItem } from "@/types/core";

/** Quota guides column in the footer — mirrors header quota dropdown order. */
export const FOOTER_QUOTA_LINKS: LinkItem[] = [
  { label: "Quota overview", href: "/quota" },
  { label: "All India Quota (AIQ)", href: "/quota/all-india" },
  { label: "State quota", href: "/quota/state" },
  { label: "Management quota", href: "/quota/management" },
  { label: "Open & Closed States", href: "/open-closed-states" },
  { label: "NRI quota", href: "/quota/nri" },
  { label: "Deemed University", href: "/quota/deemed" },
  { label: "Special / Institutional", href: "/quota/special" },
  { label: "Reservation categories", href: "/quota/categories" },
  { label: "Counselling Resources", href: "/quota/counselling-resources" },
];

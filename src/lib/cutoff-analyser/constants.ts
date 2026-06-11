import type { ListingQuota } from "@/types/filters";

export const FOCUS_STATE_SLUGS = [
  "gujarat",
  "rajasthan",
  "madhya-pradesh",
  "maharashtra",
] as const;

export type FocusStateSlug = (typeof FOCUS_STATE_SLUGS)[number];

export const FOCUS_STATE_OPTIONS: {
  slug: FocusStateSlug;
  label: string;
  abbrev: string;
}[] = [
  { slug: "gujarat", label: "Gujarat", abbrev: "GJ" },
  { slug: "rajasthan", label: "Rajasthan", abbrev: "RJ" },
  { slug: "madhya-pradesh", label: "Madhya Pradesh", abbrev: "MP" },
  { slug: "maharashtra", label: "Maharashtra", abbrev: "MH" },
];

export const QUOTA_OPTIONS: { value: ListingQuota; label: string }[] = [
  { value: "state", label: "State 85%" },
  { value: "aiq", label: "AIQ 15%" },
  { value: "management", label: "Management" },
  { value: "nri", label: "NRI" },
];

/** Ranks within this margin of closing rank → borderline. */
export const BORDERLINE_RANK_MARGIN = 2000;

export const NEET_SCORE_MIN = 0;
export const NEET_SCORE_MAX = 720;

export const DEFAULT_SCORE = 580;

export const ANALYSER_DISCLAIMER =
  "Preview uses sample cutoff data from our design spec (score 580 · AIR ~12,420 · General). Live catalog integration for all states is coming soon. Lower AIR is better.";

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

export const CUTOFF_ANALYSER_SESSION_COOKIE = "dravio_cutoff_analyser_session";

export const CUTOFF_ANALYSER_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 90;

export const ANALYSER_DISCLAIMER =
  "Estimates use your NEET score mapped to an AIR band via our prediction service, then compared to closing ranks in our catalog for Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra. Not official MCC/NTA allotment. Lower AIR is better.";

import { FOCUS_STATE_OPTIONS } from "@/lib/cutoff-analyser/constants";

/** Dravio’s four MBBS focus states for lead forms. */
export const LEAD_FOCUS_STATE_OPTIONS = FOCUS_STATE_OPTIONS;

export type LeadFocusStateSlug = (typeof LEAD_FOCUS_STATE_OPTIONS)[number]["slug"];

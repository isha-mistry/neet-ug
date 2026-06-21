import { STATE_MATRIX } from "@/lib/mbbs-india/state-matrix";

/** States & UTs from the India MBBS matrix, sorted A–Z for lead forms. */
export const INDIAN_STATES_AND_UTS: readonly string[] = Object.freeze(
  [...STATE_MATRIX.map((row) => row.name)].sort((a, b) =>
    a.localeCompare(b, "en-IN"),
  ),
);

export const LEAD_STATE_OTHER = "Other" as const;

/** Full list plus “Other” for domicile / preference fields. */
export const INDIAN_STATES_FOR_LEADS: readonly string[] = Object.freeze([
  ...INDIAN_STATES_AND_UTS,
  LEAD_STATE_OTHER,
]);

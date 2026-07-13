import type { NeetCategory } from "@/lib/rank-predictor/types";

/** Counselling category codes (e.g. Gujarat OP/SE, Maharashtra CAP) → app filter category. */
export function counsellingCategoryToNeet(
  code: string,
): NeetCategory | undefined {
  const c = code.trim().toUpperCase();

  // Seat-type codes — not social reservation. Keep undefined so listing
  // "Open / General" never surfaces NRI / management closing ranks.
  if (c === "NRI" || c === "NQ" || c === "OTH" || c === "MGT" || c === "MQ") {
    return undefined;
  }

  // Open / General equivalents (incl. Karnataka KEA OPN / GMP / GMPH).
  // GMPH must be handled before the generic PwD `*PH` rule.
  if (
    c === "OP" ||
    c === "OPN" ||
    c === "OPEN" ||
    c === "GENERAL" ||
    c === "GM" ||
    c === "GMP" ||
    c === "GMPH"
  ) {
    return "general";
  }

  if (c === "EW" || c === "EWPH" || c === "EWS" || c.startsWith("EWS ")) {
    return "ews";
  }
  if (
    c === "SE" ||
    c === "SEBC" ||
    c === "SEPH" ||
    c === "SEBCHA" ||
    c === "SOBC" ||
    c === "OBC" ||
    c.startsWith("OBC ")
  ) {
    return "obc";
  }
  if (c === "SC" || c === "SCPH" || c.startsWith("SC ")) return "sc";
  if (c === "ST" || c === "STPH" || c.startsWith("ST ")) return "st";

  // Explicit PwD / PH codes (Karnataka PHM, MCC *\_ph, OPPH).
  if (c === "OPPH" || c === "PH" || c === "PHM" || c.endsWith("_PH")) {
    return "pwbd";
  }
  // Remaining codes ending in PH, excluding Karnataka Hyderabad-Karnataka
  // minority suffixes (MMH, MEH) and GMPH already handled above.
  if (c.endsWith("PH") && !["MMH", "MEH", "MAH", "MCH"].includes(c)) {
    return "pwbd";
  }

  // Maharashtra: PwD degree buckets (D1–D3) and defence horizontal codes
  if (/^D[1-3]$/.test(c) || c.startsWith("DEF")) return "pwbd";
  // NT-A/B/C/D and VJ-A (vertical); map to OBC for coarse NEET filters
  if (
    c === "VJA" ||
    c.startsWith("NT") ||
    c === "NTB" ||
    c === "NTC" ||
    c === "NTD"
  ) {
    return "obc";
  }
  return undefined;
}

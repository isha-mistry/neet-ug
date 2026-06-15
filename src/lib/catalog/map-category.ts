import type { NeetCategory } from "@/lib/rank-predictor/types";

/** Counselling category codes (e.g. Gujarat OP/SE, Maharashtra CAP) → app filter category. */
export function counsellingCategoryToNeet(
  code: string,
): NeetCategory | undefined {
  const c = code.trim().toUpperCase();
  if (c === "OP" || c === "OPEN" || c === "GENERAL") return "general";
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
  if (c === "OPPH" || c === "PH" || c.endsWith("PH")) return "pwbd";
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
  if (c === "NRI") return "general";
  return undefined;
}

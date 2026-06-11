import type { NeetCategory } from "@/lib/rank-predictor/types";

/** Counselling category codes (e.g. Gujarat OP/SE/EW) → app filter category. */
export function counsellingCategoryToNeet(
  code: string
): NeetCategory | undefined {
  const c = code.trim().toUpperCase();
  if (c === "OP" || c === "OPEN") return "general";
  if (c === "EW" || c === "EWPH") return "ews";
  if (c === "SE" || c === "SEBC" || c === "SEPH") return "obc";
  if (c === "SC" || c === "SCPH") return "sc";
  if (c === "ST" || c === "STPH") return "st";
  if (c === "OPPH" || c === "PH" || c.endsWith("PH")) return "pwbd";
  return undefined;
}

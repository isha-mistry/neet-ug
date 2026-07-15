import type { FeeCurrency } from "@/types/college";

/**
 * Normalize fee currency labels from state/MCC sheets.
 * Examples: "$" / "USD" / "US Dollar" → USD; "Rs." / "INR" / "Rupees" → INR.
 */
export function normalizeFeeCurrency(
  raw: string | null | undefined,
): FeeCurrency {
  const s = (raw ?? "")
    .trim()
    .toUpperCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
  if (!s) return "INR";
  if (s === "$" || s.includes("USD") || s.includes("DOLLAR")) return "USD";
  if (s.includes("INR") || s === "RS" || s.startsWith("RS ") || s.includes("RUPEE")) {
    return "INR";
  }
  return "INR";
}

/**
 * MCC NRI columns: when currency cell is blank, historical sheets imply USD.
 */
export function normalizeMccNriCurrency(
  raw: string | null | undefined,
): FeeCurrency {
  if (!(raw ?? "").trim()) return "USD";
  return normalizeFeeCurrency(raw);
}

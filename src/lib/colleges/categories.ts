import type { CollegeCutoff } from "@/types/college";

export type CategoryFilter = "general" | "ews" | "obc" | "sc" | "st" | "management";

export const CATEGORIES = [
  { value: "general", label: "Open / General" },
  { value: "ews", label: "EWS" },
  { value: "obc", label: "OBC / SEBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "management", label: "Management quota" },
] as const;

/**
 * Normalizes any raw category or quota string from raw college records
 * to our canonical CategoryFilter enum values.
 */
export function normalizeCategory(categoryStr?: string | null, quotaStr: string = ""): CategoryFilter | null {
  const catLower = (categoryStr || "").toLowerCase();
  const quotaLower = quotaStr.toLowerCase();

  if (catLower === "general" || catLower === "open" || catLower === "ur") {
    return "general";
  }
  if (catLower === "ews") {
    return "ews";
  }
  if (catLower === "obc" || catLower === "sebc") {
    return "obc";
  }
  if (catLower === "sc") {
    return "sc";
  }
  if (catLower === "st") {
    return "st";
  }
  if (
    catLower === "management" ||
    catLower === "management quota" ||
    catLower === "mq" ||
    quotaLower === "management" ||
    quotaLower === "mq"
  ) {
    return "management";
  }
  return null;
}

/**
 * Checks if a given college cutoff record matches a canonical category filter.
 */
export function matchesSelectedCategory(
  cutoff: Pick<CollegeCutoff, "category" | "quota">,
  selected: CategoryFilter
): boolean {
  return normalizeCategory(cutoff.category, cutoff.quota) === selected;
}

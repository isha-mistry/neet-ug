import type { CollegeCutoff, CollegeRecord } from "@/types/college";
import type { CollegeFilters, ListingQuota } from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";

function normalizeQuotaToken(quota: string): string {
  return quota.trim().toLowerCase().replace(/\s+/g, " ");
}

export function cutoffMatchesListingQuota(
  cutoff: CollegeCutoff,
  quota: ListingQuota
): boolean {
  const token = normalizeQuotaToken(cutoff.quota);
  switch (quota) {
    case "aiq":
      return token.includes("aiq") || token.includes("all india");
    case "state":
      return token.includes("state");
    case "management":
      return (
        token.includes("management") ||
        token.includes("institutional") ||
        token.includes("paid")
      );
    case "nri":
      return token.includes("nri");
    default:
      return false;
  }
}

export function recordSupportsListingQuota(
  record: CollegeRecord,
  quota: ListingQuota
): boolean {
  const info = record.quotaInfo.toLowerCase();
  if (record.cutoffs.some((c) => cutoffMatchesListingQuota(c, quota))) {
    return true;
  }
  switch (quota) {
    case "aiq":
      return info.includes("aiq") || info.includes("all india");
    case "state":
      return info.includes("state");
    case "management":
      return (
        (record.collegeType === "private" || record.collegeType === "deemed") &&
        (info.includes("management") ||
          info.includes("institutional") ||
          info.includes("paid") ||
          info.includes("institute"))
      );
    case "nri":
      return info.includes("nri");
    default:
      return false;
  }
}

function cutoffMatchesCategory(
  cutoff: CollegeCutoff,
  category: NeetCategory
): boolean {
  if (!cutoff.category) return category === "general";
  return cutoff.category === category;
}

export function recordSupportsListingCategory(
  record: CollegeRecord,
  category: NeetCategory
): boolean {
  if (category === "general") return true;
  const hasCategoryField = record.cutoffs.some((c) => c.category !== undefined);
  if (!hasCategoryField) return true;
  return record.cutoffs.some((c) => cutoffMatchesCategory(c, category));
}

export function pickDisplayCutoff(
  record: CollegeRecord,
  filters: Pick<CollegeFilters, "quota" | "category">
): CollegeCutoff | null {
  if (!record.cutoffs.length) return null;

  const latestYear = Math.max(...record.cutoffs.map((c) => c.year));
  let pool = record.cutoffs.filter((c) => c.year === latestYear);
  if (!pool.length) return null;

  if (filters.quota) {
    const byQuota = pool.filter((c) =>
      cutoffMatchesListingQuota(c, filters.quota!)
    );
    if (byQuota.length) pool = byQuota;
  }

  if (filters.category && filters.category !== "general") {
    const byCategory = pool.filter((c) =>
      cutoffMatchesCategory(c, filters.category!)
    );
    if (byCategory.length) pool = byCategory;
  }

  if (!pool.length) return null;

  return pool.reduce(
    (acc, current) => (current.rank < acc.rank ? current : acc),
    pool[0]
  );
}

import type { CollegeCutoff } from "@/types/college";
import type { ListingQuota } from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";

function normalizeQuotaToken(quota: string): string {
  return quota.trim().toLowerCase().replace(/\s+/g, " ");
}

export function cutoffMatchesListingQuotaClient(
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

function cutoffMatchesCategory(
  cutoff: CollegeCutoff,
  category: NeetCategory
): boolean {
  if (!cutoff.category) return category === "general";
  return cutoff.category === category;
}

export function pickAnalyserCutoffFromCutoffs(
  cutoffs: CollegeCutoff[],
  quota: ListingQuota,
  category: NeetCategory,
  minYear?: number,
): CollegeCutoff | null {
  if (!cutoffs.length) return null;

  let pool = cutoffs;
  if (minYear != null) {
    pool = pool.filter((c) => c.year >= minYear);
  }
  if (!pool.length) return null;

  const latestYear = Math.max(...pool.map((c) => c.year));
  pool = pool.filter((c) => c.year === latestYear);
  if (!pool.length) return null;

  const byQuota = pool.filter((c) =>
    cutoffMatchesListingQuotaClient(c, quota)
  );
  if (byQuota.length) pool = byQuota;

  if (category !== "general") {
    const byCategory = pool.filter((c) => cutoffMatchesCategory(c, category));
    if (byCategory.length) pool = byCategory;
  }

  if (!pool.length) return null;
  return pool.reduce(
    (acc, current) => (current.rank < acc.rank ? current : acc),
    pool[0]
  );
}

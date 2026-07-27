import type { CollegeCutoff, CollegeRecord } from "@/types/college";
import type { CollegeFilters, ListingQuota } from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import { counsellingCategoryToNeet } from "@/lib/catalog/map-category";
import { normalizeCategory } from "@/lib/colleges/categories";

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

function isNriCutoff(cutoff: CollegeCutoff): boolean {
  const quota = (cutoff.quota ?? "").toLowerCase();
  const dbCat = (cutoff.dbCategory ?? "").toLowerCase();
  const seatType = (cutoff.dbSeatType ?? "").toUpperCase();
  return (
    seatType === "NRI" ||
    seatType === "NQ" ||
    dbCat === "nri" ||
    quota.includes("nri") ||
    quota.includes("non-resident")
  );
}

function resolveCutoffNeetCategory(
  cutoff: CollegeCutoff,
): NeetCategory | undefined {
  if (cutoff.category) return cutoff.category;

  const fromDb = counsellingCategoryToNeet(cutoff.dbCategory ?? "");
  if (fromDb) return fromDb;

  const normalized = normalizeCategory(cutoff.dbCategory, cutoff.quota);
  if (!normalized || normalized === "management") return undefined;
  return normalized;
}

function cutoffMatchesCategory(
  cutoff: CollegeCutoff,
  category: NeetCategory
): boolean {
  // Default listing category is Open — never surface NRI AIRs under that badge.
  if (category === "general" && isNriCutoff(cutoff)) {
    return false;
  }
  return resolveCutoffNeetCategory(cutoff) === category;
}

/**
 * Maps admission-round labels to main counselling rounds 1–3.
 * Accepts "Round 3" even when the string also says mop-up; excludes stray
 * and unlabeled mop/special rounds.
 */
export function parseMainCounsellingRound(
  round?: string
): 1 | 2 | 3 | null {
  if (!round?.trim()) return null;
  const token = round.trim();
  if (/stray/i.test(token) && !/round\s*[123]\b|\br\s*[123]\b/i.test(token)) {
    return null;
  }
  const labeled =
    token.match(/round\s*([123])\b/i) ?? token.match(/\br\s*([123])\b/i);
  if (labeled) {
    return Number.parseInt(labeled[1], 10) as 1 | 2 | 3;
  }
  if (/mop|special/i.test(token)) return null;
  const bare = token.match(/\b([123])\b/);
  if (bare) return Number.parseInt(bare[1], 10) as 1 | 2 | 3;
  return null;
}

function preferDefaultListingQuota(pool: CollegeCutoff[]): CollegeCutoff[] {
  const state = pool.filter((c) => cutoffMatchesListingQuota(c, "state"));
  if (state.length) return state;
  const aiq = pool.filter((c) => cutoffMatchesListingQuota(c, "aiq"));
  if (aiq.length) return aiq;
  return pool;
}

/** Prefer Round 3 closing AIR, then Round 2, then Round 1. */
export function pickPreferredRoundCutoff(
  pool: CollegeCutoff[]
): CollegeCutoff | null {
  if (!pool.length) return null;
  const withMainRound = pool
    .map((cutoff) => ({
      cutoff,
      round: parseMainCounsellingRound(cutoff.round),
    }))
    .filter(
      (entry): entry is { cutoff: CollegeCutoff; round: 1 | 2 | 3 } =>
        entry.round != null
    );
  if (!withMainRound.length) return null;
  withMainRound.sort((a, b) => {
    if (b.round !== a.round) return b.round - a.round;
    return (b.cutoff.rank ?? 0) - (a.cutoff.rank ?? 0);
  });
  return withMainRound[0].cutoff;
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

  const category = filters.category ?? "general";
  const byCategory = pool.filter((c) => cutoffMatchesCategory(c, category));
  if (byCategory.length) pool = byCategory;

  if (filters.quota) {
    const byQuota = pool.filter((c) =>
      cutoffMatchesListingQuota(c, filters.quota!)
    );
    if (byQuota.length) pool = byQuota;
  } else {
    pool = preferDefaultListingQuota(pool);
  }

  if (!pool.length) return null;

  return pickPreferredRoundCutoff(pool);
}

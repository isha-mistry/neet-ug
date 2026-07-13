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

/** Counselling round order for listing cards (Round 1 closing rank). */
function roundOrderKey(round?: string): number {
  if (!round) return 999;
  if (/stray|mop|special/i.test(round)) return 900;
  const match = round.match(/(\d+)/);
  if (match) return Number.parseInt(match[1], 10);
  return 998;
}

function preferDefaultListingQuota(pool: CollegeCutoff[]): CollegeCutoff[] {
  const state = pool.filter((c) => cutoffMatchesListingQuota(c, "state"));
  if (state.length) return state;
  const aiq = pool.filter((c) => cutoffMatchesListingQuota(c, "aiq"));
  if (aiq.length) return aiq;
  return pool;
}

function pickRoundOneCutoff(pool: CollegeCutoff[]): CollegeCutoff | null {
  if (!pool.length) return null;
  return [...pool].sort(
    (a, b) => roundOrderKey(a.round) - roundOrderKey(b.round)
  )[0];
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

  return pickRoundOneCutoff(pool);
}

import type { CollegeRecord, CollegeType } from "@/types/college";
import type {
  CollegeFilters,
  ListingCollegeType,
  ListingQuota,
  SortValue,
} from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import {
  pickDisplayCutoff,
  recordSupportsListingCategory,
  recordSupportsListingQuota,
} from "./cutoff-context";
import { pickDisplayQuotaFee } from "./fee-context";

export function parseListSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): CollegeFilters {
  const q = first(searchParams.q);
  const state = first(searchParams.state);
  const quota = parseListingQuota(first(searchParams.quota));
  const category = parseListingCategory(first(searchParams.category));
  const typeParam = first(searchParams.type) ?? first(searchParams.types);
  const collegeType = parseListingCollegeType(typeParam);
  const typesParam = first(searchParams.types);
  const collegeTypes = typesParam?.includes(",")
    ? (typesParam.split(",").filter(Boolean) as CollegeType[])
    : collegeType
      ? undefined
      : typeParam
        ? ([typeParam] as CollegeType[])
        : undefined;
  const feeRange = parseRangeParam(searchParams.feeRange);
  const cutoffRange = parseRangeParam(searchParams.cutoffRange);
  const feeMin = parseNumber(searchParams.feeMin) ?? feeRange.min;
  const feeMax = parseNumber(searchParams.feeMax) ?? feeRange.max;
  const cutoffMin = parseNumber(searchParams.cutoffMin) ?? cutoffRange.min;
  const cutoffMax = parseNumber(searchParams.cutoffMax) ?? cutoffRange.max;
  const sort = (first(searchParams.sort) as SortValue | undefined) ?? undefined;
  const page = parseNumber(searchParams.page) ?? 1;
  const pageSize = parseNumber(searchParams.pageSize);

  return {
    q,
    state,
    quota,
    category,
    collegeType,
    collegeTypes,
    feeMin,
    feeMax,
    cutoffMin,
    cutoffMax,
    sort,
    page,
    pageSize,
  };
}

export function applyFilters(
  records: CollegeRecord[],
  filters: CollegeFilters,
  stateNamesBySlug?: Map<string, string>
): CollegeRecord[] {
  return records.filter((record) => {
    if (filters.q) {
      const needle = filters.q.trim().toLowerCase();
      const stateName =
        stateNamesBySlug?.get(record.stateSlug) ?? record.stateSlug;
      const haystack = `${record.name} ${record.city} ${stateName}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    if (filters.state && record.stateSlug !== filters.state) return false;

    if (filters.quota && !recordSupportsListingQuota(record, filters.quota)) {
      return false;
    }

    if (
      filters.category &&
      filters.category !== "general" &&
      !recordSupportsListingCategory(record, filters.category)
    ) {
      return false;
    }

    if (!matchesCollegeTypeFilter(record, filters)) return false;

    const feeCompare = feeAmountForFilters(record, filters);
    if (filters.feeMin !== undefined && feeCompare < filters.feeMin) return false;
    if (filters.feeMax !== undefined && feeCompare > filters.feeMax) return false;

    const latestRank = getLatestRank(record, filters);
    if (filters.cutoffMin !== undefined && latestRank < filters.cutoffMin)
      return false;
    if (filters.cutoffMax !== undefined && latestRank > filters.cutoffMax)
      return false;
    return true;
  });
}

function matchesCollegeTypeFilter(
  record: CollegeRecord,
  filters: CollegeFilters
): boolean {
  if (filters.collegeTypes && filters.collegeTypes.length > 0) {
    return filters.collegeTypes.includes(record.collegeType);
  }
  if (!filters.collegeType) return true;
  if (filters.collegeType === "government") {
    return (
      record.collegeType === "government" || record.collegeType === "aiims"
    );
  }
  return record.collegeType === filters.collegeType;
}

function feeAmountForFilters(
  record: CollegeRecord,
  filters: CollegeFilters
): number {
  const display = pickDisplayQuotaFee(record, filters.quota);
  if (record.fees.quotaBreakdown && display.available) {
    return display.sortKeyInr * 5;
  }
  return record.fees.totalCourse;
}

export function getLatestRank(
  record: CollegeRecord,
  filters?: Pick<CollegeFilters, "quota" | "category">
): number {
  const cutoff = filters
    ? pickDisplayCutoff(record, filters)
    : pickDisplayCutoff(record, {});
  return cutoff?.rank ?? Number.POSITIVE_INFINITY;
}

function parseListingQuota(value: string | undefined): ListingQuota | undefined {
  if (!value || value === "any") return undefined;
  const allowed: ListingQuota[] = ["aiq", "state", "management", "nri"];
  return allowed.includes(value as ListingQuota)
    ? (value as ListingQuota)
    : undefined;
}

function parseListingCategory(
  value: string | undefined
): NeetCategory | undefined {
  if (!value || value === "any") return undefined;
  const allowed: NeetCategory[] = [
    "general",
    "ews",
    "obc",
    "sc",
    "st",
    "pwbd",
  ];
  return allowed.includes(value as NeetCategory)
    ? (value as NeetCategory)
    : undefined;
}

function parseListingCollegeType(
  value: string | undefined
): ListingCollegeType | undefined {
  if (!value || value === "any") return undefined;
  const allowed: ListingCollegeType[] = ["government", "private", "deemed"];
  return allowed.includes(value as ListingCollegeType)
    ? (value as ListingCollegeType)
    : undefined;
}

function first(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw.trim() === "") return undefined;
  return raw;
}

function parseNumber(value: string | string[] | undefined): number | undefined {
  const v = first(value);
  if (v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

/** Parse fee/cutoff range tokens like "500000-1500000" from legacy URLs. */
export function parseRangeParam(
  value: string | string[] | undefined
): { min?: number; max?: number } {
  const raw = first(value);
  if (!raw || !raw.includes("-")) return {};
  const [minStr, maxStr] = raw.split("-");
  const min = Number(minStr);
  const max = Number(maxStr);
  return {
    min: Number.isFinite(min) ? min : undefined,
    max: Number.isFinite(max) ? max : undefined,
  };
}

import type { CollegeRecord, CollegeType } from "@/types/college";
import type { CollegeFilters, SortValue } from "@/types/filters";

export function parseListSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): CollegeFilters {
  const state = first(searchParams.state);
  const city = first(searchParams.city);
  const typesParam = first(searchParams.types);
  const collegeTypes = typesParam
    ? (typesParam.split(",").filter(Boolean) as CollegeType[])
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
    state,
    city,
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
  filters: CollegeFilters
): CollegeRecord[] {
  return records.filter((record) => {
    if (filters.state && record.stateSlug !== filters.state) return false;
    if (filters.city && record.city.toLowerCase() !== filters.city.toLowerCase())
      return false;
    if (
      filters.collegeTypes &&
      filters.collegeTypes.length > 0 &&
      !filters.collegeTypes.includes(record.collegeType)
    ) {
      return false;
    }
    if (filters.feeMin !== undefined && record.fees.totalCourse < filters.feeMin)
      return false;
    if (filters.feeMax !== undefined && record.fees.totalCourse > filters.feeMax)
      return false;
    const latestRank = getLatestRank(record);
    if (filters.cutoffMin !== undefined && latestRank < filters.cutoffMin)
      return false;
    if (filters.cutoffMax !== undefined && latestRank > filters.cutoffMax)
      return false;
    return true;
  });
}

export function getLatestRank(record: CollegeRecord): number {
  return record.cutoffs.reduce(
    (acc, current) => (current.year > acc.year ? current : acc),
    record.cutoffs[0]
  ).closingRank;
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

/** Parse fee/cutoff range tokens like "500000-1500000" from dropdowns. */
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

import { medseatData } from "./source";
import type { CollegeRecord } from "@/types/college";
import type {
  CollegeFilters,
  FilterOptionGroups,
} from "@/types/filters";
import type {
  CollegeListingViewModel,
  CollegeSummary,
} from "@/types/listing";
import type { CollegeDetailViewModel } from "@/types/detail";
import { applyFilters } from "@/lib/colleges/filters";
import { sortColleges } from "@/lib/colleges/sorting";
import { toCollegeDetail, toCollegeSummary } from "@/lib/colleges/mappers";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export function getAllColleges(): CollegeRecord[] {
  return medseatData.colleges;
}

export function findCollegeBySlug(slug: string): CollegeRecord | undefined {
  return medseatData.colleges.find((c) => c.slug === slug);
}

export function getCollegeDetailBySlug(
  slug: string
): CollegeDetailViewModel | null {
  const record = findCollegeBySlug(slug);
  return record ? toCollegeDetail(record) : null;
}

export function getCollegesBySlugs(slugs: string[]): CollegeRecord[] {
  return slugs
    .map((slug) => findCollegeBySlug(slug))
    .filter((c): c is CollegeRecord => Boolean(c));
}

export function getCollegeListing(
  filters: CollegeFilters
): CollegeListingViewModel {
  const filtered = applyFilters(getAllColleges(), filters);
  const sorted = sortColleges(filtered, filters.sort);

  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.max(1, filters.pageSize ?? DEFAULT_PAGE_SIZE);
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const slice = sorted.slice(start, start + pageSize);

  const items: CollegeSummary[] = slice.map(toCollegeSummary);

  return {
    items,
    pagination: {
      page: currentPage,
      pageSize,
      totalItems,
      totalPages,
    },
  };
}

export function getFilterOptions(): FilterOptionGroups {
  const colleges = getAllColleges();
  const uniqueStates = new Map<string, string>();
  const uniqueCities = new Set<string>();
  colleges.forEach((c) => {
    const stateName =
      medseatData.states.find((s) => s.slug === c.stateSlug)?.name ?? c.stateSlug;
    uniqueStates.set(c.stateSlug, stateName);
    uniqueCities.add(c.city);
  });

  return {
    collegeTypes: medseatData.filterOptions.collegeTypes,
    feeRanges: medseatData.filterOptions.feeRanges,
    cutoffRanges: medseatData.filterOptions.cutoffRanges,
    states: Array.from(uniqueStates.entries())
      .sort(([, a], [, b]) => a.localeCompare(b))
      .map(([value, label]) => ({ value, label })),
    cities: Array.from(uniqueCities)
      .sort()
      .map((city) => ({ value: city, label: city })),
  };
}

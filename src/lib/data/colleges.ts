import "server-only";
import { cache } from "react";
import { loadCatalogColleges, loadCollegeBySlugFromDb } from "./catalog-loader";
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
import {
  LISTING_CATEGORY_OPTIONS,
  LISTING_COLLEGE_TYPE_OPTIONS,
  LISTING_QUOTA_OPTIONS,
} from "@/lib/colleges/listing-options";
import { loadCatalogStates } from "./catalog-loader";
import { setStateNameCache } from "@/lib/data/state-name-cache";
import { medseatData } from "./source";

export const getAllColleges = cache(async (): Promise<CollegeRecord[]> => {
  return loadCatalogColleges();
});

export async function findCollegeBySlug(
  slug: string
): Promise<CollegeRecord | undefined> {
  const record = await loadCollegeBySlugFromDb(slug);
  return record ?? undefined;
}

export async function getCollegeDetailBySlug(
  slug: string
): Promise<CollegeDetailViewModel | null> {
  const record = await findCollegeBySlug(slug);
  if (!record) return null;

  // Ensure state name cache is populated for mapping logic
  const states = await loadCatalogStates();
  setStateNameCache(new Map(states.map((s) => [s.slug, s.name])));

  return toCollegeDetail(record);
}

export async function getCollegesBySlugs(
  slugs: string[]
): Promise<CollegeRecord[]> {
  const colleges = await getAllColleges();
  const bySlug = new Map(colleges.map((c) => [c.slug, c]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((c): c is CollegeRecord => Boolean(c));
}

export async function getCollegeListing(
  filters: CollegeFilters
): Promise<CollegeListingViewModel> {
  const all = await getAllColleges();
  const states = await loadCatalogStates();
  const stateNamesBySlug = new Map(states.map((s) => [s.slug, s.name]));
  const filtered = applyFilters(all, filters, stateNamesBySlug);
  const sorted = sortColleges(filtered, filters.sort, {
    quota: filters.quota,
    category: filters.category,
  });

  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.max(1, filters.pageSize ?? DEFAULT_PAGE_SIZE);
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const slice = sorted.slice(start, start + pageSize);

  const items: CollegeSummary[] = slice.map((record) =>
    toCollegeSummary(record, {
      quota: filters.quota,
      category: filters.category,
    })
  );

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

export async function getFilterOptions(): Promise<FilterOptionGroups> {
  const colleges = await getAllColleges();
  const states = await loadCatalogStates();
  const uniqueStates = new Map<string, string>();

  for (const college of colleges) {
    const label =
      states.find((s) => s.slug === college.stateSlug)?.name ?? college.stateSlug;
    uniqueStates.set(college.stateSlug, label);
  }

  return {
    states: [...uniqueStates.entries()]
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    quotas: LISTING_QUOTA_OPTIONS,
    categories: LISTING_CATEGORY_OPTIONS,
    collegeTypes: LISTING_COLLEGE_TYPE_OPTIONS,
    feeRanges: medseatData.filterOptions.feeRanges,
    cutoffRanges: medseatData.filterOptions.cutoffRanges,
  };
}

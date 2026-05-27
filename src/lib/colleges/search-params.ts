import type { CollegeFilters } from "@/types/filters";

/** Serialize active filters into URL search params for pagination/sort links. */
export function buildFilterSearchParams(
  filters: CollegeFilters
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.state) params.set("state", filters.state);
  if (filters.city) params.set("city", filters.city);
  if (filters.collegeTypes?.length) {
    params.set("types", filters.collegeTypes.join(","));
  }
  if (filters.feeMin !== undefined) {
    params.set("feeMin", String(filters.feeMin));
  }
  if (filters.feeMax !== undefined) {
    params.set("feeMax", String(filters.feeMax));
  }
  if (filters.cutoffMin !== undefined) {
    params.set("cutoffMin", String(filters.cutoffMin));
  }
  if (filters.cutoffMax !== undefined) {
    params.set("cutoffMax", String(filters.cutoffMax));
  }
  if (filters.sort) params.set("sort", filters.sort);
  return params;
}

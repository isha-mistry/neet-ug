import type { OptionItem } from "./core";
import type { CollegeType } from "./college";
import type { NeetCategory } from "@/lib/rank-predictor/types";

export type SortValue = "lowest_fees" | "highest_roi" | "lowest_cutoff";

export type ListingQuota = "aiq" | "state" | "management" | "nri";

/** College type choices on the listing filter (AIIMS included when browsing govt). */
export type ListingCollegeType = "government" | "private" | "deemed";

export interface CollegeFilters {
  /** Free-text search across name, city, and state. */
  q?: string;
  state?: string;
  quota?: ListingQuota;
  category?: NeetCategory;
  /** Single type from listing sidebar. */
  collegeType?: ListingCollegeType;
  /** Preset from category pages (may include aiims). */
  collegeTypes?: CollegeType[];
  feeMin?: number;
  feeMax?: number;
  cutoffMin?: number;
  cutoffMax?: number;
  sort?: SortValue;
  page?: number;
  pageSize?: number;
}

export interface FilterOptionGroups {
  states: OptionItem<string>[];
  quotas: OptionItem<ListingQuota>[];
  categories: OptionItem<NeetCategory>[];
  collegeTypes: OptionItem<ListingCollegeType>[];
  feeRanges: OptionItem<string>[];
  cutoffRanges: OptionItem<string>[];
}

export type SortOption = OptionItem<SortValue>;

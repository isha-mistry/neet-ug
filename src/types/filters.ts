import type { OptionItem } from "./core";
import type { CollegeType } from "./college";

export type SortValue = "lowest_fees" | "highest_roi" | "lowest_cutoff";

export interface CollegeFilters {
  state?: string;
  city?: string;
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
  collegeTypes: OptionItem<CollegeType>[];
  feeRanges: OptionItem<string>[];
  cutoffRanges: OptionItem<string>[];
  states: OptionItem<string>[];
  cities: OptionItem<string>[];
}

export type SortOption = OptionItem<SortValue>;

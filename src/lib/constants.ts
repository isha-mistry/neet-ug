import type { SortOption } from "@/types/filters";

export const DEFAULT_PAGE_SIZE = 50;

export const SORT_OPTIONS: SortOption[] = [
  { value: "lowest_fees", label: "Lowest Fees" },
  { value: "highest_roi", label: "Highest ROI" },
  { value: "lowest_cutoff", label: "Lowest Cutoff" },
];

export const SAFE_CUTOFF_THRESHOLD = 5000;
export const RISKY_CUTOFF_THRESHOLD = 30000;

export const COMPARISON_MAX_SELECTIONS = 4;

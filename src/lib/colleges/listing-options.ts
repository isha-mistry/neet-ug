import type { OptionItem } from "@/types/core";
import type { ListingCollegeType, ListingQuota } from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";

export const LISTING_QUOTA_OPTIONS: OptionItem<ListingQuota>[] = [
  { value: "aiq", label: "AIQ" },
  { value: "state", label: "State Quota" },
  { value: "management", label: "Management" },
  { value: "nri", label: "NRI" },
];

export const LISTING_CATEGORY_OPTIONS: OptionItem<NeetCategory>[] = [
  { value: "general", label: "Open / General" },
  { value: "ews", label: "EWS" },
  { value: "obc", label: "OBC / SEBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "pwbd", label: "PwD" },
];

export const LISTING_COLLEGE_TYPE_OPTIONS: OptionItem<ListingCollegeType>[] = [
  { value: "government", label: "Government" },
  { value: "semi-government", label: "Semi-Govt" },
  { value: "private", label: "Private" },
  { value: "deemed", label: "Deemed" },
];

/** Short label for closing-rank metric (matches active category filter, default Open). */
export { getListingFeeQuotaShort } from "@/lib/colleges/fee-context";

export function getListingCategoryShortLabel(category?: NeetCategory): string {
  if (!category || category === "general") return "Open";
  switch (category) {
    case "ews":
      return "EWS";
    case "obc":
      return "OBC";
    case "sc":
      return "SC";
    case "st":
      return "ST";
    case "pwbd":
      return "PwD";
    default:
      return "Open";
  }
}

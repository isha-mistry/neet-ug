import type { CollegeRecord } from "@/types/college";
import type { CollegeFilters, SortValue } from "@/types/filters";
import { getLatestRank } from "./filters";
import { pickDisplayQuotaFee } from "./fee-context";

export function sortColleges(
  records: CollegeRecord[],
  sort?: SortValue,
  rankContext?: Pick<CollegeFilters, "quota" | "category">
): CollegeRecord[] {
  const list = [...records];
  switch (sort) {
    case "lowest_fees":
      list.sort(
        (a, b) =>
          pickDisplayQuotaFee(a, rankContext?.quota).sortKeyInr -
          pickDisplayQuotaFee(b, rankContext?.quota).sortKeyInr
      );
      break;
    case "highest_roi":
      list.sort((a, b) => b.roiScore - a.roiScore);
      break;
    case "lowest_cutoff":
      list.sort(
        (a, b) =>
          getLatestRank(a, rankContext) - getLatestRank(b, rankContext)
      );
      break;
    default:
      list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return list;
}

import type { CollegeRecord } from "@/types/college";
import type { SortValue } from "@/types/filters";
import { getLatestRank } from "./filters";

export function sortColleges(
  records: CollegeRecord[],
  sort?: SortValue
): CollegeRecord[] {
  const list = [...records];
  switch (sort) {
    case "lowest_fees":
      list.sort((a, b) => a.fees.totalCourse - b.fees.totalCourse);
      break;
    case "highest_roi":
      list.sort((a, b) => b.roiScore - a.roiScore);
      break;
    case "lowest_cutoff":
      list.sort((a, b) => getLatestRank(a) - getLatestRank(b));
      break;
    default:
      list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return list;
}

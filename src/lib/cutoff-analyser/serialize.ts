import type { CollegeRecord } from "@/types/college";
import type { AnalyserCollege } from "./types";

export function toAnalyserCollege(record: CollegeRecord): AnalyserCollege {
  return {
    slug: record.slug,
    name: record.name,
    city: record.city,
    stateSlug: record.stateSlug,
    collegeType: record.collegeType,
    seatCount: record.seatCount,
    totalAnnualFee: record.fees.totalAnnual,
    cutoffs: record.cutoffs,
  };
}

import type { CollegeRecord } from "./college";

export interface CollegeDetailViewModel extends CollegeRecord {
  stateName: string;
  totalAnnualFee: number;
  totalCourseFee: number;
  latestCutoffRank: number;
  latestCutoffYear: number;
}

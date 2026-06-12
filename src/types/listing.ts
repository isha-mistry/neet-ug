import type {
  CollegeBond,
  CollegeRecord,
  CollegeSeatMatrix,
  CollegeType,
} from "./college";

export type SafeRiskTag = "safe" | "risky" | "moderate";

export interface CollegeSummary {
  slug: string;
  name: string;
  city: string;
  stateName: string;
  stateSlug: string;
  collegeType: CollegeType;
  totalAnnualFee: number;
  totalCourseFee: number;
  /** Quota-specific annual tuition for listing (GQ / MQ / NRI). */
  displayAnnualFee: string;
  latestCutoffRank: number;
  latestCutoffYear: number;
  seatCount: number;
  quotaInfo: string;
  seatMatrix?: CollegeSeatMatrix;
  bondLabel: string;
  roiScore: number;
  safetyTag: SafeRiskTag;
  bond: CollegeBond;
}

export interface ListingPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface CollegeListingViewModel {
  items: CollegeSummary[];
  pagination: ListingPagination;
}

export type CollegeRecordMap = Record<string, CollegeRecord>;
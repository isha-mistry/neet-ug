import type { Slug } from "./core";
import type { NeetCategory } from "@/lib/rank-predictor/types";

export type CollegeType = "government" | "private" | "deemed" | "aiims";

export type FeeCurrency = "INR" | "USD";

/** NRI quota fee from Gujarat fee sheet (`fees_currency` + `nri_fees`). */
export interface NriQuotaFee {
  amount: number;
  currency: FeeCurrency;
}

/** GQ/MQ annual tuition from source (INR). NRI is separate — not summed into totalAnnual. */
export interface QuotaFeeBreakdown {
  govtQuotaAnnualInr: number;
  managementQuotaAnnualInr: number;
  nri?: NriQuotaFee;
}

export interface CollegeFees {
  tuition: number;
  hostel: number;
  misc: number;
  totalAnnual: number;
  totalCourse: number;
  /** Present when built from gujarat_college_fees. */
  quotaBreakdown?: QuotaFeeBreakdown;
  gqFees?: number;
  mqFees?: number;
  nriFees?: number;
  nriCurrency?: string;
  hostelFees?: number;
  messFees?: number;
  universityFees?: number;
  transportFees?: number;
  examFees?: number;
}

export interface CollegeCutoff {
  year: number;
  rank: number;
  quota: string;
  category?: NeetCategory;
  round?: string;
  openingRank?: number;
  closingRank?: number;
  stateOpeningRank?: number;
  stateClosingRank?: number;
  categoryOpeningRank?: string;
  categoryClosingRank?: string;
}

export interface CollegeBond {
  years: number;
  penalty: number;
  note?: string;
}

export interface CollegeInfrastructure {
  beds: number;
  patientFlowPerDay: number;
  facilities: string[];
}

export interface CollegeReviews {
  pros: string[];
  cons: string[];
}

export interface CollegeOtherInfo {
  officialWebsite: string;
  counsellingBrochureUrl?: string;
}

export interface CollegeSeatMatrix {
  aiq: number;
  stateQuota: number;
  management: number;
  nri: number;
  categoryDistribution: Record<string, number>;
}

export interface CollegeRecord {
  slug: Slug;
  name: string;
  stateSlug: Slug;
  city: string;
  collegeType: CollegeType;
  seatCount: number;
  quotaInfo: string;
  fees: CollegeFees;
  cutoffs: CollegeCutoff[];
  bond: CollegeBond;
  infrastructure: CollegeInfrastructure;
  reviews: CollegeReviews;
  roiScore: number;
  otherInfo?: CollegeOtherInfo;
  seatMatrix?: CollegeSeatMatrix;
  /** NIRF India Rankings — Medical category (when present in catalog DB). */
  nirfMedicalRank?: number;
  nirfMedicalScore?: number;
  nirfRankingYear?: number;
  nirfInstitutionId?: string;
  /** Set on DB-built records for QA (not shown in UI by default). */
  dataQuality?: string[];
}

export interface StateRecord {
  slug: Slug;
  name: string;
  intro: string;
  totalSeats: number;
  competitionLevel: string;
}

export interface CategoryRecord {
  slug: Slug;
  title: string;
  description: string;
  preset: {
    collegeTypes?: CollegeType[];
    maxTotalFee?: number;
  };
}
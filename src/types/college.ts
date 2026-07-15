import type { CounsellingPool } from "@/lib/colleges/counselling-pool";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { Slug } from "@/types/core";

export type CollegeType =
  "government" | "private" | "deemed" | "aiims" | "semi-government";

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

/** One row from MP fee sheet (`mp_fees_data`). */
export interface StateFeeScheduleRow {
  feeType: string;
  category?: string;
  tuition?: number;
  development?: number;
  caution?: number;
  mmvyScholarship?: number;
  /** Maharashtra CET: Male / Female fee rows. */
  gender?: string;
  totalAnnual: number;
  /** Fee line currency when not INR (e.g. NRI tuition in USD). */
  currency?: FeeCurrency;
  /** KEA vs MCC — drives grouped fee panels. */
  counsellingPool?: CounsellingPool;
  /** Parent `FeeSchedule.source` (e.g. `karnataka_dump`, `up_dump`, `mcc_fee_csv`). */
  source?: string;
}

export interface CollegeFees {
  tuition: number;
  hostel: number;
  misc: number;
  totalAnnual: number;
  totalCourse: number;
  /** Present when built from gujarat_college_fees. */
  quotaBreakdown?: QuotaFeeBreakdown;
  /** MP DMAT / MH CET fee rows; does not affect GJ/RJ display. */
  stateFeeSchedule?: StateFeeScheduleRow[];
  /** Primary state schedule `FeeSchedule.source` (latest academic year). */
  scheduleSource?: string;
  /** Headline amounts from a separate `mcc_fee_csv` schedule when coexisting with state fees. */
  mccFeeSummary?: Pick<
    CollegeFees,
    "tuition" | "hostel" | "misc" | "totalAnnual" | "totalCourse"
  >;
  gqFees?: number;
  mqFees?: number;
  nriFees?: number;
  nriCurrency?: string;
  hostelFees?: number;
  /** UP DGME: annual hostel (AC) from fee sheet. */
  hostelAcFees?: number;
  /** UP DGME: annual hostel (non-AC) from fee sheet. */
  hostelNonAcFees?: number;
  /** One-time security deposit (UP and similar). */
  securityDeposit?: number;
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
  dbCategory?: string;
  dbSeatType?: string;
  /** Raw counselling quota from DB (e.g. "All India") — used for category filter matching. */
  dbQuota?: string;
  /** KEA state vs MCC AIQ — drives grouped cutoff UI. */
  counsellingPool?: CounsellingPool;
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
  /** ESIC insured-person pool (`esic_ip` in seat snapshots). */
  esic: number;
  /** GOI / central pool (MP state dumps). */
  goiQuota: number;
  management: number;
  nri: number;
  /** Institutional / IQ seats (Maharashtra private CAP). */
  iqQuota: number;
  /** Reservation breakdown within the state quota pool. */
  stateCategoryDistribution?: Record<string, number>;
  /** Reservation breakdown within the AIQ pool (MCC sub-buckets). */
  aiqCategoryDistribution?: Record<string, number>;
  /** @deprecated Merged view — prefer split distributions above. */
  categoryDistribution: Record<string, number>;
}

export interface CollegeRecord {
  slug: Slug;
  name: string;
  stateSlug: Slug;
  city: string;
  universityName?: string;
  collegeType: CollegeType;
  seatCount: number;
  quotaInfo: string;
  fees: CollegeFees;
  cutoffs: CollegeCutoff[];
  bond: CollegeBond;
  infrastructure: CollegeInfrastructure;
  reviews: CollegeReviews;
  roiScore: number | null;
  otherInfo?: CollegeOtherInfo;
  seatMatrix?: CollegeSeatMatrix;
  /** MCC/AIQ seat matrix when split from state counselling at DB layer. */
  mccSeatMatrix?: CollegeSeatMatrix;
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

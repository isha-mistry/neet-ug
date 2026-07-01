import type { CollegeCutoff, CollegeType } from "@/types/college";
import type { ListingQuota } from "@/types/filters";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { FocusStateSlug } from "./constants";

export type { FocusStateSlug } from "./constants";

export type CutoffStatus = "safe" | "borderline" | "out";

export interface AnalyserCollege {
  slug: string;
  name: string;
  city: string;
  stateSlug: string;
  collegeType: CollegeType;
  seatCount: number;
  totalAnnualFee: number;
  cutoffs: CollegeCutoff[];
}

export interface CutoffAnalyserInput {
  score: number;
  category: NeetCategory;
  domicileState: FocusStateSlug;
  stateSlugs: FocusStateSlug[];
  quota?: ListingQuota;
  collegeTypeFilter: "government" | "private" | "all";
}

export interface StateQuotaRow {
  stateSlug: FocusStateSlug;
  stateName: string;
  stateAbbrev: string;
  quota: ListingQuota;
  quotaLabel: string;
  openingRank: number | null;
  closingRank: number | null;
  gapToUser: number | null;
  status: CutoffStatus;
}

export interface CollegeMatch {
  college: AnalyserCollege;
  closingRank: number;
  gapToUser: number;
  likelihoodPercent: number;
  status: CutoffStatus;
}

export interface StateEligibility {
  stateSlug: FocusStateSlug;
  stateName: string;
  stateAbbrev: string;
  status: CutoffStatus;
  closingRank: number | null;
  userRank: number;
  gapToUser: number | null;
}

export interface CutoffAnalyserResult {
  userRank: number;
  rankRange: { min: number; max: number };
  referenceYear: number;
  admissionProbabilityPercent: number;
  probabilityLabel: string;
  safeCollegeCount: number;
  statesEligibleCount: number;
  statesSelectedCount: number;
  eligibleStateAbbrevs: string;
  stateQuotaRows: StateQuotaRow[];
  collegeMatches: CollegeMatch[];
  stateEligibility: StateEligibility[];
}

export interface PreferenceListItem {
  id: string;
  collegeSlug: string;
  name: string;
  city: string;
  stateSlug: string;
  affiliation: string;
  closingRank: number;
  gapToUser: number;
  tag: "safe" | "target" | "reach";
}

export interface CutoffAnalyserFormInput {
  score: number;
  category: NeetCategory;
  domicileState: FocusStateSlug;
  quota: ListingQuota;
  captchaToken?: string;
}

export interface CutoffAnalyserSummary {
  userRank: number;
  rankRange: { min: number; max: number };
  admissionProbabilityPercent: number;
  probabilityLabel: string;
  safeCollegeCount: number;
  statesEligibleCount: number;
  statesSelectedCount: number;
  eligibleStateAbbrevs: string;
  comparisonRowCount: number;
  collegeMatchCount: number;
}

export interface CutoffAnalyserTeaserResult {
  referenceYear: number;
  disclaimer: string;
  input: CutoffAnalyserFormInput;
  summary: CutoffAnalyserSummary;
}

export interface CutoffAnalyserUnlockedResult extends CutoffAnalyserTeaserResult {
  result: CutoffAnalyserResult;
  feeCollegesByState: Partial<Record<FocusStateSlug, AnalyserCollege[]>>;
}

export interface CutoffAnalyserRankContext {
  userRank: number;
  rankRange: { min: number; max: number };
  stateMeritRank?: number;
  referenceYear: number;
  minCutoffYear: number;
}

export interface CutoffAnalyserPhoneVerifiedSession extends CutoffAnalyserFormInput {
  verified: false;
  phoneVerified: true;
  phoneVerifiedAt: number;
  countryCode: string;
  phone: string;
}

export interface CutoffAnalyserSession extends CutoffAnalyserFormInput {
  verified: true;
  verifiedAt: number;
  countryCode: string;
  phone: string;
  leadName: string;
  leadStateSlug: string;
  leadCity: string;
}

export type CutoffAnalyserStoredSession =
  | CutoffAnalyserSession
  | CutoffAnalyserPhoneVerifiedSession;

export function isFullCutoffAnalyserSession(
  session: CutoffAnalyserStoredSession,
): session is CutoffAnalyserSession {
  return session.verified === true;
}

export function isPhoneVerifiedCutoffAnalyserSession(
  session: CutoffAnalyserStoredSession,
): session is CutoffAnalyserPhoneVerifiedSession {
  return session.verified === false && session.phoneVerified === true;
}

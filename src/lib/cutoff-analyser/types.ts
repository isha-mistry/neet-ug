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
  stateSlugs: FocusStateSlug[];
  quota: ListingQuota;
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

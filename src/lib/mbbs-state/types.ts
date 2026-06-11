import type { FaqItem } from "@/types/content";

export type FocusStateSlug =
  | "gujarat"
  | "rajasthan"
  | "madhya-pradesh"
  | "maharashtra";

export interface MbbsStateStats {
  totalColleges: number;
  totalSeats: number;
  govtColleges: number;
  govtSeats: number;
  pvtColleges: number;
  pvtSeats: number;
  aiqSeats: number;
  stateQuotaSeats: number;
  govtFeeAnnual: string;
  mgmtFeeCap: string;
  bondNote: string;
  domicileRequired: string;
}

export interface TopGovtCollege {
  name: string;
  city: string;
  established: number;
  seats: number;
  aiqSeats: number;
  closingRankGeneral: number;
  university: string;
  beds: number;
  feePerYear: string;
  bond?: string;
  slug?: string;
  hasPg: boolean;
}

export interface CutoffCategoryRow {
  category: string;
  aiqOpen2025: number;
  aiqClose2025: number;
  stateOpen2025: number;
  stateClose2025: number;
}

export interface CutoffTrendRow {
  college: string;
  year: number;
  generalClose: number;
  obcClose: number;
}

export interface TimelineEvent {
  date: string;
  label: string;
  track?: "neet" | "state" | "mcc";
}

export interface MbbsStateConfig {
  slug: FocusStateSlug;
  name: string;
  code: string;
  capital: string;
  counselingAuthority: string;
  counselingAuthorityShort: string;
  counselingPortal: string;
  counselingPortalUrl: string;
  universityNote: string;
  stats: MbbsStateStats;
  overview: string[];
  domicile: {
    rules: string[];
    documents: string[];
    nonDomicile: string;
    reservation: string;
    bond: string;
  };
  counselingSteps: string[];
  counselingRules: string[];
  fees: {
    govt: string;
    private: string;
    nri: string;
    hostel: string;
    bondPenalty: string;
    comparison: { label: string; total: string }[];
  };
  seatDistribution: {
    analysis: string;
    byCity: { city: string; colleges: number; seats: number }[];
    growth: { year: number; seats: number }[];
    vsNational: string;
  };
  vsOtherStates: string[];
  vsRecommendation: string;
  chances: {
    neetApplicantsState: string;
    stateQuotaGovtSeats: number;
    stats: { label: string; value: string }[];
    options: { title: string; body: string }[];
  };
  documents: {
    academic: string[];
    identity: string[];
    category: string[];
    photos: string;
    nri: string[];
    stateSpecific: string[];
  };
  topGovtColleges: TopGovtCollege[];
  aiqCutoffs: CutoffCategoryRow[];
  mgmtCutoffNote: string;
  cutoffTrends: CutoffTrendRow[];
  timeline: TimelineEvent[];
  faq: FaqItem[];
  notableColleges: string[];
  /** Optional long-form blocks (e.g. Gujarat competitor-style sections). */
  contentExtensions?: MbbsStateContentExtensions;
}

export interface MbbsStateContentExtensions {
  whyChoose?: string[];
  neetCounselingEligibility?: string[];
  bondServiceRules?: string[];
  undergradSeatSegments?: { title: string; detail: string }[];
  pgMdMsSeats?: number;
  extraQuickFacts?: { label: string; value: string }[];
  feeScheduleTables?: { title: string; headers: string[]; rows: string[][] }[];
  govtSeatMatrix?: {
    title: string;
    headers: string[];
    rows: { college: string; slug?: string; cells: string[] }[];
  }[];
}

export interface StateCollegeTableRow {
  slug: string;
  name: string;
  type: string;
  city: string;
  university: string;
  totalSeats: number;
  aiqSeats: number;
  stateSeats: number;
  mqSeats: number;
  nriSeats: number;
  nirfRank?: number;
  established?: number;
  nmcStatus: string;
}

/**
 * Sample data for the cutoff analyser UI (design brief).
 * Replace with catalog-backed compute when all state cutoffs are available.
 */
import { FOCUS_STATE_OPTIONS } from "./constants";
import type {
  AnalyserCollege,
  CollegeMatch,
  CutoffAnalyserResult,
  FocusStateSlug,
  PreferenceListItem,
  StateEligibility,
  StateQuotaRow,
} from "./types";
import type { ListingQuota } from "@/types/filters";
import { compareCutoffStatus } from "./status";

export const DEMO_USER_RANK = 12_420;
export const DEMO_REFERENCE_YEAR = 2025;
export const DEMO_SCORE = 580;

/** States shown on map/table regardless of domicile selection. */
export const DEMO_ANALYSIS_STATE_SLUGS: FocusStateSlug[] = [
  "gujarat",
  "rajasthan",
  "madhya-pradesh",
  "maharashtra",
];

/** Map: Maharashtra shown as muted (no domicile / not in scope for this profile). */
export const DEMO_MAP_MUTED_STATE_SLUGS: FocusStateSlug[] = ["maharashtra"];

function row(
  partial: Omit<StateQuotaRow, "stateName" | "stateAbbrev"> & {
    stateSlug: FocusStateSlug;
  }
): StateQuotaRow {
  const meta = FOCUS_STATE_OPTIONS.find((s) => s.slug === partial.stateSlug)!;
  return {
    stateName: meta.label,
    stateAbbrev: meta.abbrev,
    ...partial,
  };
}

export const DEMO_STATE_QUOTA_ROWS: StateQuotaRow[] = [
  row({
    stateSlug: "gujarat",
    quota: "state",
    quotaLabel: "State 85%",
    openingRank: 8_200,
    closingRank: 15_800,
    gapToUser: 15_800 - DEMO_USER_RANK,
    status: "safe",
  }),
  row({
    stateSlug: "gujarat",
    quota: "aiq",
    quotaLabel: "AIQ 15%",
    openingRank: 5_400,
    closingRank: 11_200,
    gapToUser: 11_200 - DEMO_USER_RANK,
    status: "borderline",
  }),
  row({
    stateSlug: "rajasthan",
    quota: "state",
    quotaLabel: "State 85%",
    openingRank: 6_100,
    closingRank: 11_200,
    gapToUser: 11_200 - DEMO_USER_RANK,
    status: "borderline",
  }),
  row({
    stateSlug: "rajasthan",
    quota: "aiq",
    quotaLabel: "AIQ 15%",
    openingRank: 4_800,
    closingRank: 9_600,
    gapToUser: 9_600 - DEMO_USER_RANK,
    status: "out",
  }),
  row({
    stateSlug: "madhya-pradesh",
    quota: "state",
    quotaLabel: "State 85%",
    openingRank: 7_400,
    closingRank: 10_500,
    gapToUser: 10_500 - DEMO_USER_RANK,
    status: "out",
  }),
  row({
    stateSlug: "madhya-pradesh",
    quota: "management",
    quotaLabel: "Management",
    openingRank: 45_000,
    closingRank: 62_000,
    gapToUser: 62_000 - DEMO_USER_RANK,
    status: "safe",
  }),
  row({
    stateSlug: "maharashtra",
    quota: "aiq",
    quotaLabel: "AIQ 15%",
    openingRank: 4_500,
    closingRank: 9_800,
    gapToUser: 9_800 - DEMO_USER_RANK,
    status: "out",
  }),
  row({
    stateSlug: "maharashtra",
    quota: "state",
    quotaLabel: "State 85%",
    openingRank: 6_800,
    closingRank: 9_200,
    gapToUser: 9_200 - DEMO_USER_RANK,
    status: "out",
  }),
];

const DEMO_COLLEGES: AnalyserCollege[] = [
  {
    slug: "demo-bj-medical-ahmedabad",
    name: "B.J. Medical College",
    city: "Ahmedabad",
    stateSlug: "gujarat",
    collegeType: "government",
    seatCount: 250,
    totalAnnualFee: 50_000,
    cutoffs: [],
  },
  {
    slug: "demo-sms-medical-jaipur",
    name: "SMS Medical College",
    city: "Jaipur",
    stateSlug: "rajasthan",
    collegeType: "government",
    seatCount: 200,
    totalAnnualFee: 45_000,
    cutoffs: [],
  },
  {
    slug: "demo-gmc-bhopal",
    name: "GMC Bhopal",
    city: "Bhopal",
    stateSlug: "madhya-pradesh",
    collegeType: "government",
    seatCount: 180,
    totalAnnualFee: 48_000,
    cutoffs: [],
  },
  {
    slug: "demo-gmc-indore",
    name: "Govt Medical College, Indore",
    city: "Indore",
    stateSlug: "madhya-pradesh",
    collegeType: "government",
    seatCount: 150,
    totalAnnualFee: 48_000,
    cutoffs: [],
  },
  {
    slug: "demo-grant-mumbai",
    name: "Grant Medical College",
    city: "Mumbai",
    stateSlug: "maharashtra",
    collegeType: "government",
    seatCount: 220,
    totalAnnualFee: 95_000,
    cutoffs: [],
  },
  {
    slug: "demo-kd-medical-pvt",
    name: "KD Hospital Medical College",
    city: "Ahmedabad",
    stateSlug: "gujarat",
    collegeType: "private",
    seatCount: 150,
    totalAnnualFee: 12_50_000,
    cutoffs: [],
  },
];

export const DEMO_COLLEGE_MATCHES: CollegeMatch[] = [
  {
    college: DEMO_COLLEGES[0],
    closingRank: 4_210,
    gapToUser: 4_210 - DEMO_USER_RANK,
    likelihoodPercent: 75,
    status: "safe",
  },
  {
    college: DEMO_COLLEGES[1],
    closingRank: 7_890,
    gapToUser: 7_890 - DEMO_USER_RANK,
    likelihoodPercent: 45,
    status: "borderline",
  },
  {
    college: DEMO_COLLEGES[2],
    closingRank: 11_340,
    gapToUser: 11_340 - DEMO_USER_RANK,
    likelihoodPercent: 20,
    status: "out",
  },
  {
    college: DEMO_COLLEGES[3],
    closingRank: 10_200,
    gapToUser: 10_200 - DEMO_USER_RANK,
    likelihoodPercent: 28,
    status: "out",
  },
  {
    college: DEMO_COLLEGES[4],
    closingRank: 9_800,
    gapToUser: 9_800 - DEMO_USER_RANK,
    likelihoodPercent: 15,
    status: "out",
  },
  {
    college: DEMO_COLLEGES[5],
    closingRank: 18_500,
    gapToUser: 18_500 - DEMO_USER_RANK,
    likelihoodPercent: 62,
    status: "borderline",
  },
];

export const DEMO_STATE_ELIGIBILITY: StateEligibility[] = [
  {
    stateSlug: "gujarat",
    stateName: "Gujarat",
    stateAbbrev: "GJ",
    status: "safe",
    closingRank: 15_800,
    userRank: DEMO_USER_RANK,
    gapToUser: 15_800 - DEMO_USER_RANK,
  },
  {
    stateSlug: "rajasthan",
    stateName: "Rajasthan",
    stateAbbrev: "RJ",
    status: "borderline",
    closingRank: 11_200,
    userRank: DEMO_USER_RANK,
    gapToUser: 11_200 - DEMO_USER_RANK,
  },
  {
    stateSlug: "madhya-pradesh",
    stateName: "Madhya Pradesh",
    stateAbbrev: "MP",
    status: "out",
    closingRank: 10_500,
    userRank: DEMO_USER_RANK,
    gapToUser: 10_500 - DEMO_USER_RANK,
  },
  {
    stateSlug: "maharashtra",
    stateName: "Maharashtra",
    stateAbbrev: "MH",
    status: "out",
    closingRank: 9_800,
    userRank: DEMO_USER_RANK,
    gapToUser: 9_800 - DEMO_USER_RANK,
  },
];

export const DEMO_INITIAL_PREFERENCE_LIST: PreferenceListItem[] = [
  {
    id: "demo-bj-medical-ahmedabad",
    collegeSlug: "demo-bj-medical-ahmedabad",
    name: "B.J. Medical, Ahmedabad",
    city: "Ahmedabad",
    stateSlug: "gujarat",
    affiliation: "Government",
    closingRank: 4_210,
    gapToUser: 4_210 - DEMO_USER_RANK,
    tag: "safe",
  },
  {
    id: "demo-sms-medical-jaipur",
    collegeSlug: "demo-sms-medical-jaipur",
    name: "SMS Medical, Jaipur",
    city: "Jaipur",
    stateSlug: "rajasthan",
    affiliation: "Government",
    closingRank: 7_890,
    gapToUser: 7_890 - DEMO_USER_RANK,
    tag: "target",
  },
  {
    id: "demo-gmc-indore",
    collegeSlug: "demo-gmc-indore",
    name: "Govt Medical College, Indore",
    city: "Indore",
    stateSlug: "madhya-pradesh",
    affiliation: "Government",
    closingRank: 10_200,
    gapToUser: 10_200 - DEMO_USER_RANK,
    tag: "reach",
  },
];

export interface DemoFeeRow {
  name: string;
  slug: string;
  collegeType: AnalyserCollege["collegeType"];
  totalAnnualFee: number;
  seatCount: number;
}

export const DEMO_FEE_BY_STATE: Record<FocusStateSlug, DemoFeeRow[]> = {
  gujarat: [
    {
      name: "B.J. Medical College, Ahmedabad",
      slug: "demo-bj-medical-ahmedabad",
      collegeType: "government",
      totalAnnualFee: 50_000,
      seatCount: 250,
    },
    {
      name: "M.P. Shah Medical College, Jamnagar",
      slug: "demo-mp-shah",
      collegeType: "government",
      totalAnnualFee: 52_000,
      seatCount: 200,
    },
    {
      name: "KD Hospital Medical College",
      slug: "demo-kd-medical-pvt",
      collegeType: "private",
      totalAnnualFee: 12_50_000,
      seatCount: 150,
    },
  ],
  rajasthan: [
    {
      name: "SMS Medical College, Jaipur",
      slug: "demo-sms-medical-jaipur",
      collegeType: "government",
      totalAnnualFee: 45_000,
      seatCount: 200,
    },
    {
      name: "RNT Medical College, Udaipur",
      slug: "demo-rnt-udaipur",
      collegeType: "government",
      totalAnnualFee: 44_000,
      seatCount: 150,
    },
  ],
  "madhya-pradesh": [
    {
      name: "GMC Bhopal",
      slug: "demo-gmc-bhopal",
      collegeType: "government",
      totalAnnualFee: 48_000,
      seatCount: 180,
    },
    {
      name: "Govt Medical College, Indore",
      slug: "demo-gmc-indore",
      collegeType: "government",
      totalAnnualFee: 48_000,
      seatCount: 150,
    },
  ],
  maharashtra: [
    {
      name: "Grant Medical College, Mumbai",
      slug: "demo-grant-mumbai",
      collegeType: "government",
      totalAnnualFee: 95_000,
      seatCount: 220,
    },
    {
      name: "B.J. Govt Medical College, Pune",
      slug: "demo-bj-pune",
      collegeType: "government",
      totalAnnualFee: 92_000,
      seatCount: 200,
    },
  ],
};

export function getDemoCutoffAnalysis(options: {
  collegeTypeFilter: "government" | "private" | "all";
}): CutoffAnalyserResult {
  let collegeMatches = DEMO_COLLEGE_MATCHES;
  if (options.collegeTypeFilter === "government") {
    collegeMatches = collegeMatches.filter(
      (m) =>
        m.college.collegeType === "government" ||
        m.college.collegeType === "aiims"
    );
  } else if (options.collegeTypeFilter === "private") {
    collegeMatches = collegeMatches.filter(
      (m) =>
        m.college.collegeType === "private" ||
        m.college.collegeType === "deemed"
    );
  }

  collegeMatches = [...collegeMatches].sort((a, b) => {
    const byStatus = compareCutoffStatus(a.status, b.status);
    if (byStatus !== 0) return byStatus;
    return b.likelihoodPercent - a.likelihoodPercent;
  });

  return {
    userRank: DEMO_USER_RANK,
    rankRange: { min: 11_800, max: 13_200 },
    referenceYear: DEMO_REFERENCE_YEAR,
    admissionProbabilityPercent: 72,
    probabilityLabel: "Safe for admission",
    safeCollegeCount: 8,
    statesEligibleCount: 3,
    statesSelectedCount: 4,
    eligibleStateAbbrevs: "GJ · RJ · MP",
    stateQuotaRows: DEMO_STATE_QUOTA_ROWS,
    collegeMatches,
    stateEligibility: DEMO_STATE_ELIGIBILITY,
  };
}

export function filterDemoRowsByQuota(
  rows: StateQuotaRow[],
  quota: ListingQuota | "all"
): StateQuotaRow[] {
  if (quota === "all") return rows;
  return rows.filter((r) => r.quota === quota);
}

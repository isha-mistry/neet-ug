import type { Slug } from "./core";

export type CollegeType = "government" | "private" | "deemed" | "aiims";

export interface CollegeFees {
  tuition: number;
  hostel: number;
  misc: number;
  totalAnnual: number;
  totalCourse: number;
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
  round: string;
  category: string;
  quota: string;
  openingRank: number;
  closingRank: number;
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

export interface CollegeSeatMatrix {
  aiq: number;
  stateQuota: number;
  management: number;
  nri: number;
  categoryDistribution: Record<string, number>;
}

export interface CollegeOtherInfo {
  officialWebsite: string;
  counsellingBrochureUrl?: string;
}

export interface CollegeRecord {
  slug: Slug;
  name: string;
  university: string;
  stateSlug: Slug;
  city: string;
  collegeType: CollegeType;
  seatCount: number;
  quotaInfo: string;
  fees: CollegeFees;
  seatMatrix: CollegeSeatMatrix;
  cutoffs: CollegeCutoff[];
  bond: CollegeBond;
  otherInfo: CollegeOtherInfo;
  roiScore: number;
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

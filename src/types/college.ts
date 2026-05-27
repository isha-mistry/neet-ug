import type { Slug } from "./core";

export type CollegeType = "government" | "private" | "deemed" | "aiims";

export interface CollegeFees {
  tuition: number;
  hostel: number;
  misc: number;
  totalAnnual: number;
  totalCourse: number;
}

export interface CollegeCutoff {
  year: number;
  rank: number;
  quota: string;
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

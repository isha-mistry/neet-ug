import type { CollegeType } from "@/types/college";
import type { CollegeSummary } from "@/types/listing";

export type NeetCategory = "general" | "ews" | "obc" | "sc" | "st" | "pwbd";

export interface RankPredictorFormInput {
  score: number;
  category: NeetCategory;
  stateSlug: string;
  collegeTypes?: CollegeType[];
  maxTotalCourseFee?: number;
}

export interface RankRangeDto {
  min: number;
  max: number;
}

export interface RankPredictorTeaserResult {
  referenceYear: number;
  disclaimer: string;
  input: RankPredictorFormInput;
  coarse: RankRangeDto;
  teaserColleges: CollegeSummary[];
  categoryNote: string;
}

export interface RankPredictorUnlockedResult extends RankPredictorTeaserResult {
  tight: RankRangeDto;
  stateMeritRange: RankRangeDto;
  previewColleges: CollegeSummary[];
}

/** Mobile OTP passed; profile step still required before full unlock. */
export interface RankPredictorPhoneVerifiedSession extends RankPredictorFormInput {
  verified: false;
  phoneVerified: true;
  phoneVerifiedAt: number;
  countryCode: string;
  phone: string;
}

/** Full unlock after profile details submitted. */
export interface RankPredictorSession extends RankPredictorFormInput {
  verified: true;
  verifiedAt: number;
  countryCode: string;
  phone: string;
  leadName: string;
  leadStateSlug: string;
  leadCity: string;
}

export type RankPredictorStoredSession =
  | RankPredictorSession
  | RankPredictorPhoneVerifiedSession;

export function isFullRankPredictorSession(
  session: RankPredictorStoredSession
): session is RankPredictorSession {
  return session.verified === true;
}

export function isPhoneVerifiedRankPredictorSession(
  session: RankPredictorStoredSession
): session is RankPredictorPhoneVerifiedSession {
  return session.verified === false && session.phoneVerified === true;
}

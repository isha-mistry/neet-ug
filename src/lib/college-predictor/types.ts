import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { CollegeSummary } from "@/types/listing";
import type { ListingQuota } from "@/types/filters";

export interface CollegePredictorFormInput {
  air: number;
  category: NeetCategory;
  stateSlug: string;
  quota: ListingQuota;
  captchaToken?: string;
}

export interface CollegePredictorBucketCounts {
  likely: number;
  possible: number;
  reach: number;
  withCutoffData: number;
}

export interface CollegePredictorTeaserResult {
  referenceYear: number;
  disclaimer: string;
  input: CollegePredictorFormInput;
  counts: CollegePredictorBucketCounts;
}

export interface CollegePredictorUnlockedResult extends CollegePredictorTeaserResult {
  likely: CollegeSummary[];
  possible: CollegeSummary[];
  reach: CollegeSummary[];
}

export interface CollegePredictorPhoneVerifiedSession extends CollegePredictorFormInput {
  verified: false;
  phoneVerified: true;
  phoneVerifiedAt: number;
  countryCode: string;
  phone: string;
}

export interface CollegePredictorSession extends CollegePredictorFormInput {
  verified: true;
  verifiedAt: number;
  countryCode: string;
  phone: string;
  leadName: string;
  leadStateSlug: string;
  leadCity: string;
}

export type CollegePredictorStoredSession =
  | CollegePredictorSession
  | CollegePredictorPhoneVerifiedSession;

export function isFullCollegePredictorSession(
  session: CollegePredictorStoredSession,
): session is CollegePredictorSession {
  return session.verified === true;
}

export function isPhoneVerifiedCollegePredictorSession(
  session: CollegePredictorStoredSession,
): session is CollegePredictorPhoneVerifiedSession {
  return session.verified === false && session.phoneVerified === true;
}

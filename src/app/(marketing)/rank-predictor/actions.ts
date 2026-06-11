"use server";

import {
  computeTeaserResult,
  computeUnlockedResult,
  validateRankPredictorInput,
  sessionsMatch,
} from "@/lib/rank-predictor/compute";
import {
  RANK_PREDICTOR_DEMO_OTP,
} from "@/lib/rank-predictor/constants";
import {
  getRankPredictorPhoneVerifiedSession,
  getRankPredictorSession,
  getRankPredictorStoredSession,
  setRankPredictorSession,
} from "@/lib/rank-predictor/session";
import type {
  RankPredictorFormInput,
  RankPredictorPhoneVerifiedSession,
  RankPredictorTeaserResult,
  RankPredictorUnlockedResult,
} from "@/lib/rank-predictor/types";
import { isFullRankPredictorSession } from "@/lib/rank-predictor/types";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function predictionErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return "Could not reach the prediction service. Try again in a moment.";
}

export async function submitRankPredictorAction(
  raw: RankPredictorFormInput
): Promise<ActionResult<RankPredictorTeaserResult>> {
  const validated = validateRankPredictorInput(raw);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  try {
    return { success: true, data: await computeTeaserResult(validated.input) };
  } catch (error) {
    return { success: false, error: predictionErrorMessage(error) };
  }
}

export async function verifyRankPredictorOtpAction(payload: {
  otp: string;
  countryCode?: string;
  phone?: string;
  consent: boolean;
  input: RankPredictorFormInput;
}): Promise<ActionResult<{ phoneVerified: true }>> {
  const validated = validateRankPredictorInput(payload.input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  if (!payload.consent) {
    return { success: false, error: "Please accept the terms to continue." };
  }

  const otp = payload.otp.trim();
  if (otp !== RANK_PREDICTOR_DEMO_OTP) {
    return { success: false, error: "Invalid verification code." };
  }

  const phone = payload.phone?.replace(/\D/g, "") ?? "";
  const countryCode = payload.countryCode?.trim() || "+91";

  if (phone.length !== 10) {
    return {
      success: false,
      error: "Enter a valid 10-digit mobile number.",
    };
  }

  const session: RankPredictorPhoneVerifiedSession = {
    verified: false,
    phoneVerified: true,
    phoneVerifiedAt: Date.now(),
    countryCode,
    phone,
    ...validated.input,
  };

  await setRankPredictorSession(session);

  return { success: true, data: { phoneVerified: true } };
}

export async function completeRankPredictorProfileAction(payload: {
  input: RankPredictorFormInput;
  leadName: string;
  leadStateSlug: string;
  leadCity: string;
}): Promise<ActionResult<RankPredictorUnlockedResult>> {
  const validated = validateRankPredictorInput(payload.input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }

  const pending = await getRankPredictorPhoneVerifiedSession();
  if (!pending || !sessionsMatch(pending, validated.input)) {
    return {
      success: false,
      error: "Verify your mobile number before continuing.",
    };
  }

  const leadName = payload.leadName.trim();
  const leadCity = payload.leadCity.trim();
  const leadStateSlug = payload.leadStateSlug.trim();

  if (leadName.length < 2) {
    return { success: false, error: "Enter your full name." };
  }
  if (!leadStateSlug) {
    return { success: false, error: "Select your state." };
  }
  if (leadCity.length < 2) {
    return { success: false, error: "Enter your city." };
  }

  await setRankPredictorSession({
    verified: true,
    verifiedAt: Date.now(),
    countryCode: pending.countryCode,
    phone: pending.phone,
    leadName,
    leadStateSlug,
    leadCity,
    ...validated.input,
  });

  try {
    return {
      success: true,
      data: await computeUnlockedResult(validated.input),
    };
  } catch (error) {
    return { success: false, error: predictionErrorMessage(error) };
  }
}

export async function getUnlockedRankPredictorAction(
  input: RankPredictorFormInput
): Promise<ActionResult<RankPredictorUnlockedResult>> {
  const validated = validateRankPredictorInput(input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  const session = await getRankPredictorSession();
  if (!session || !sessionsMatch(session, validated.input)) {
    return { success: false, error: "Verification required." };
  }
  try {
    return { success: true, data: await computeUnlockedResult(validated.input) };
  } catch (error) {
    return { success: false, error: predictionErrorMessage(error) };
  }
}

export async function getRankPredictorSessionAction(): Promise<
  ActionResult<{
    session: Awaited<ReturnType<typeof getRankPredictorStoredSession>>;
  }>
> {
  const session = await getRankPredictorStoredSession();
  return { success: true, data: { session } };
}

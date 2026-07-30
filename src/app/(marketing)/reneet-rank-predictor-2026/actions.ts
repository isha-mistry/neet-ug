"use server";

import {
  computeTeaserResult,
  computeUnlockedResult,
  validateRankPredictorInput,
  sessionsMatch,
} from "@/lib/rank-predictor/compute";
import { createLead } from "@/lib/leads/create-lead";
import { verifyPhoneLoginOtp } from "@/lib/otp/phone-otp-session";
import { assertPhoneVerifiedSession } from "@/lib/otp/phone-verified-session";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { RANK_PREDICTOR_PAGE_PATH } from "@/lib/rank-predictor/constants";
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
import { verifyTurnstileToken } from "@/lib/captcha/verify";
const RANK_PREDICTOR_PAGE_LABEL = "ReNEET Rank Predictor 2026";

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
  const captchaCheck = await verifyTurnstileToken(raw.captchaToken);
  if (!captchaCheck.ok) {
    return { success: false, error: captchaCheck.error };
  }

  const validated = validateRankPredictorInput(raw);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  try {
    const data = await computeTeaserResult(validated.input);

    const leadSaved = await createLead({
      formType: LEAD_FORM_TYPES.rankPredictor,
      pagePath: RANK_PREDICTOR_PAGE_PATH,
      pageLabel: `${RANK_PREDICTOR_PAGE_LABEL} — summary only`,
      variant: "estimate_only",
      neetScore: validated.input.score,
      neetCategory: validated.input.category,
      domicileState: validated.input.stateSlug,
      consent: false,
      rawPayload: { input: validated.input, coarse: data.coarse },
    });
    if (!leadSaved.success) {
      console.error("[submitRankPredictorAction] estimate_only lead", leadSaved.error);
    }

    return { success: true, data };
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
  /** Skip OTP when the number is in the 30-minute verified session. */
  trustedSession?: boolean;
}): Promise<ActionResult<{ phoneVerified: true }>> {
  const captchaCheck = await verifyTurnstileToken(payload.input.captchaToken);
  if (!captchaCheck.ok) {
    return { success: false, error: captchaCheck.error };
  }

  const validated = validateRankPredictorInput(payload.input);
  if (!validated.ok) {
    return { success: false, error: validated.message };
  }
  if (!payload.consent) {
    return { success: false, error: LEAD_CONSENT_ERROR };
  }

  const phone = payload.phone?.replace(/\D/g, "") ?? "";
  const countryCode = payload.countryCode?.trim() || "+91";

  if (phone.length !== 10) {
    return {
      success: false,
      error: "Enter a valid 10-digit mobile number.",
    };
  }

  const otpCheck = payload.trustedSession
    ? await assertPhoneVerifiedSession({ phone, countryCode })
    : await verifyPhoneLoginOtp({
        phone,
        countryCode,
        otp: payload.otp,
      });
  if (!otpCheck.ok) {
    return { success: false, error: otpCheck.error };
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

  const leadSaved = await createLead({
    formType: LEAD_FORM_TYPES.rankPredictor,
    pagePath: RANK_PREDICTOR_PAGE_PATH,
    pageLabel: RANK_PREDICTOR_PAGE_LABEL,
    variant: "phone_verified",
    countryCode,
    phone,
    neetScore: validated.input.score,
    neetCategory: validated.input.category,
    domicileState: validated.input.stateSlug,
    consent: payload.consent,
    rawPayload: { input: validated.input },
  });
  if (!leadSaved.success) {
    return { success: false, error: leadSaved.error };
  }

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

  await createLead({
    formType: LEAD_FORM_TYPES.rankPredictor,
    pagePath: RANK_PREDICTOR_PAGE_PATH,
    pageLabel: RANK_PREDICTOR_PAGE_LABEL,
    variant: "profile_complete",
    name: leadName,
    countryCode: pending.countryCode,
    phone: pending.phone,
    neetScore: validated.input.score,
    neetCategory: validated.input.category,
    domicileState: validated.input.stateSlug,
    city: leadCity,
    targetStates: leadStateSlug,
    consent: true,
    rawPayload: { input: validated.input },
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

"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { FiCheckCircle, FiGlobe, FiMessageSquare, FiRefreshCw } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LeadConsentField } from "@/components/features/leads/LeadConsentField";
import {
  CollegePredictorBanner,
  FormPanel,
  HowItWorksGrid,
  RankPredictorCollegePreview,
  RankPredictorFaqSection,
  RankPredictorFinalCta,
  RankPredictorHero,
  RankPredictorTrustBlock,
  RankResultShowcase,
  RankPredictorScoreChip,
  RankPredictorShell,
  ResultsPanel,
  VerifyModal,
  VerifyPanel,
} from "@/components/features/rank-predictor/RankPredictorParts";
import { sendPhoneLoginOtpAction } from "@/app/actions/send-phone-otp";
import {
  completeRankPredictorProfileAction,
  getRankPredictorSessionAction,
  submitRankPredictorAction,
  verifyRankPredictorOtpAction,
} from "@/app/(marketing)/reneet-rank-predictor-2026/actions";
import {
  NEET_SCORE_MAX,
  NEET_SCORE_MIN,
  RANK_PREDICTOR_MAX_PREVIEW_COLLEGES,
} from "@/lib/rank-predictor/constants";
import { RANK_PREDICTOR_FAQ, RANK_PREDICTOR_HERO } from "@/lib/rank-predictor/page-content";
import type {
  NeetCategory,
  RankPredictorFormInput,
  RankPredictorSession,
  RankPredictorTeaserResult,
  RankPredictorUnlockedResult,
} from "@/lib/rank-predictor/types";
import { isPhoneVerifiedRankPredictorSession } from "@/lib/rank-predictor/types";
import type { OptionItem } from "@/types/core";
import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { applyPredictorPhoneVerification } from "@/components/features/predictors/predictor-phone-verify";
import { TurnstileCaptcha } from "@/components/common/TurnstileCaptcha";

type WizardStep = "form" | "teaser" | "verify" | "unlocked";
type VerifyModalPhase = "phone" | "profile";

interface RankPredictorWizardProps {
  stateOptions: OptionItem<string>[];
  categoryOptions: OptionItem<NeetCategory>[];
  initialSession: RankPredictorSession | null;
  initialTeaser: RankPredictorTeaserResult | null;
  initialUnlocked: RankPredictorUnlockedResult | null;
}

export function RankPredictorWizard({
  stateOptions,
  categoryOptions,
  initialSession,
  initialTeaser: initialTeaserProp,
  initialUnlocked: initialUnlockedProp,
}: RankPredictorWizardProps) {
  const [step, setStep] = useState<WizardStep>(
    initialUnlockedProp ? "unlocked" : initialTeaserProp ? "teaser" : "form"
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [score, setScore] = useState(
    initialSession
      ? String(initialSession.score)
      : initialTeaserProp
        ? String(initialTeaserProp.input.score)
        : ""
  );
  const [category, setCategory] = useState<NeetCategory | "">(
    initialSession?.category ?? initialTeaserProp?.input.category ?? ""
  );
  const [stateSlug, setStateSlug] = useState(
    initialSession?.stateSlug ?? initialTeaserProp?.input.stateSlug ?? ""
  );

  const [teaser, setTeaser] = useState<RankPredictorTeaserResult | null>(
    initialTeaserProp
  );
  const [unlocked, setUnlocked] = useState<RankPredictorUnlockedResult | null>(
    initialUnlockedProp
  );

  const [phone, setPhone] = useState(initialSession?.phone ?? "");
  const [countryCode, setCountryCode] = useState(initialSession?.countryCode ?? "+91");
  const [otp, setOtp] = useState("");
  const [consent, setConsent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [phoneSessionTrusted, setPhoneSessionTrusted] = useState(false);
  const [verifyPhase, setVerifyPhase] = useState<VerifyModalPhase>("phone");
  const [leadName, setLeadName] = useState(initialSession?.leadName ?? "");
  const [leadCity, setLeadCity] = useState(initialSession?.leadCity ?? "");
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();

  const ballparkColleges = useMemo(() => {
    if (!unlocked?.previewColleges?.length) return [];
    return unlocked.previewColleges.slice(0, RANK_PREDICTOR_MAX_PREVIEW_COLLEGES);
  }, [unlocked]);

  const formInput = useMemo((): RankPredictorFormInput | null => {
    const scoreNum = Math.round(Number(score));
    if (!category || !stateSlug || !Number.isFinite(scoreNum)) return null;
    return {
      score: scoreNum,
      category,
      stateSlug,
      captchaToken,
    };
  }, [score, category, stateSlug, captchaToken]);

  const buildInput = useCallback((): RankPredictorFormInput | null => formInput, [formInput]);

  const categoryLabel =
    categoryOptions.find((c) => c.value === category)?.label ?? "";
  const domicileStateSlug = stateSlug || teaser?.input.stateSlug || "";
  const stateLabel =
    stateOptions.find((s) => s.value === domicileStateSlug)?.label ?? "";

  const goVerify = () => {
    setError(null);
    setPhoneSessionTrusted(false);
    setStep("verify");
    setVerifyPhase("phone");
    startTransition(async () => {
      const stored = await getRankPredictorSessionAction();
      if (
        stored.success &&
        stored.data.session &&
        isPhoneVerifiedRankPredictorSession(stored.data.session)
      ) {
        setPhone(stored.data.session.phone);
        setCountryCode(stored.data.session.countryCode);
        setOtpSent(true);
        setVerifyPhase("profile");
      }
    });
  };

  const completePhoneVerification = useCallback(
    async (trustedSession: boolean) => {
      const input = buildInput();
      if (!input) {
        setError("Session expired. Start a new prediction.");
        return;
      }
      await applyPredictorPhoneVerification({
        phone,
        countryCode,
        consent,
        trustedSession,
        otp,
        setError,
        setPhoneSessionTrusted,
        setOtpSent,
        verify: async (payload) => {
          const currentInput = buildInput();
          if (!currentInput) {
            return { success: false, error: "Session expired. Start a new prediction." };
          }
          const result = await verifyRankPredictorOtpAction({
            input: currentInput,
            phone: payload.phone,
            countryCode: payload.countryCode,
            otp: payload.otp,
            consent: payload.consent,
            trustedSession: payload.trustedSession,
          });
          return result.success
            ? { success: true }
            : { success: false, error: result.error };
        },
        onVerified: () => setVerifyPhase("profile"),
      });
    },
    [buildInput, phone, countryCode, consent, otp]
  );

  const handleSendOtp = () => {
    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setPhone(normalizedPhone);
    setError(null);
    setOtpSending(true);
    startTransition(async () => {
      const result = await sendPhoneLoginOtpAction({
        phone: normalizedPhone,
        countryCode,
        captchaToken,
      });
      setOtpSending(false);
      if (!result.success) {
        setError(result.error);
        setOtpSent(false);
        setPhoneSessionTrusted(false);
        return;
      }
      setOtpSent(true);
      if (result.alreadyVerified) {
        setPhoneSessionTrusted(true);
        if (consent) {
          await completePhoneVerification(true);
        }
      }
    });
  };

  const handleSubmitScore = () => {
    const input = buildInput();
    if (!input) {
      setError(`Please enter a valid NEET score between ${NEET_SCORE_MIN} and ${NEET_SCORE_MAX}.`);
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await submitRankPredictorAction(input);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setTeaser(result.data);
      setUnlocked(null);
      setStep("teaser");
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleVerifyOtp = () => {
    const input = buildInput();
    if (!input) return;
    if (!otpSent) {
      setError("Send the OTP or continue with your verified number first.");
      return;
    }
    setError(null);
    startTransition(async () => {
      await completePhoneVerification(phoneSessionTrusted);
    });
  };

  const handleUnlockFullPreview = () => {
    const input = buildInput();
    if (!input) return;
    if (!leadName.trim() || !domicileStateSlug || !leadCity.trim()) {
      setError("Please complete your name and city.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await completeRankPredictorProfileAction({
        input,
        leadName: leadName.trim(),
        leadStateSlug: domicileStateSlug,
        leadCity: leadCity.trim(),
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setUnlocked(result.data);
      setTeaser(result.data);
      setStep("unlocked");
    });
  };

  const handleReset = () => {
    setStep("form");
    setTeaser(null);
    setUnlocked(null);
    setScore("");
    setCategory("");
    setStateSlug("");
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setPhoneSessionTrusted(false);
    setConsent(false);
    setVerifyPhase("phone");
    setLeadName("");
    setLeadCity("");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showResults = (step === "teaser" || step === "verify" || step === "unlocked") && teaser;

  useEffect(() => {
    if (step !== "verify") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) {
        setStep("teaser");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [step, pending]);

  return (
    <RankPredictorShell>
      <TurnstileCaptcha key={`${step}-${verifyPhase}-${otpSent}`} onVerify={setCaptchaToken} />
      {step === "form" ? (
        <RankPredictorHero>
          <FormPanel>
            <div className="rp-form-stack flex flex-col gap-4">
              <Input
                label="NEET 2026 score (out of 720)"
                name="score"
                type="number"
                min={NEET_SCORE_MIN}
                max={NEET_SCORE_MAX}
                inputMode="numeric"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                hint="Whole marks between 0 and 720 — your expected or actual score."
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Category"
                  name="category"
                  placeholder="Select category"
                  options={categoryOptions}
                  value={category}
                  onValueChange={(v) => setCategory(v as NeetCategory | "")}
                  required
                />
                <Select
                  label="Domicile state"
                  name="state"
                  placeholder="Select state"
                  options={stateOptions}
                  value={stateSlug}
                  onValueChange={setStateSlug}
                  required
                />
              </div>

              {error ? (
                <p
                  className="rounded-[10px] bg-error-container px-3.5 py-2.5 text-[12.5px] text-on-error-container"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <Button
                type="button"
                size="lg"
                fullWidth
                disabled={pending}
                onClick={handleSubmitScore}
                className="h-12 rounded-xl text-[15px] font-bold"
              >
                {pending ? "Calculating..." : RANK_PREDICTOR_HERO.submitLabel}
              </Button>
            </div>
          </FormPanel>
        </RankPredictorHero>
      ) : null}

      <CollegePredictorBanner />

      <Container size="page">
        {showResults ? (
          <ResultsPanel>
            <div id="result" className="rp-rsum">
              <RankPredictorScoreChip
                score={teaser.input.score}
                categoryLabel={categoryLabel}
                stateLabel={stateLabel}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                leadingIcon={<FiRefreshCw aria-hidden="true" />}
                onClick={handleReset}
                className="rounded-[14px] border-[1.5px] px-5 py-2.5 text-[13.5px] font-bold"
              >
                New prediction
              </Button>
            </div>

            <RankResultShowcase
              preview={teaser.coarse}
              refined={unlocked?.tight}
              stateMeritRange={unlocked?.stateMeritRange}
              stateLabel={stateLabel}
              referenceYear={teaser.referenceYear}
              onUnlock={goVerify}
            />

            {step === "unlocked" ? (
              <p className="mt-4 rounded-2xl border border-primary/12 bg-primary-fixed/80 px-4 py-3.5 text-sm leading-relaxed text-on-primary-fixed">
                {teaser.categoryNote}
              </p>
            ) : null}

            {step === "unlocked" && unlocked ? (
              <div className="mt-11">
                <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="text-[25px] font-extrabold tracking-tight">
                      Colleges in your ballpark
                    </h3>
                    <p className="mt-1 text-[13.5px] text-on-surface-variant">
                      Matched to your refined band using {teaser.referenceYear} AIQ closing
                      ranks ({categoryLabel}) in our catalog.
                    </p>
                  </div>
                  <span className="rp-match-chip">
                    {ballparkColleges.length} matches
                  </span>
                </div>

                <div className="rp-ballpark-grid mt-5">
                  {ballparkColleges.map((college, index) => (
                    <RankPredictorCollegePreview
                      key={college.slug}
                      college={college}
                      index={index}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button as="link" href="/colleges" variant="outline" className="rounded-xl">
                    Browse all colleges
                  </Button>
                  <Button as="link" href="/college-predictor" variant="primary" className="rounded-xl">
                    Open College Predictor →
                  </Button>
                </div>
              </div>
            ) : null}
          </ResultsPanel>
        ) : null}
      </Container>

      <HowItWorksGrid />

      <Container size="page">
        <RankPredictorFaqSection items={RANK_PREDICTOR_FAQ} />
        <RankPredictorTrustBlock />
      </Container>

      <RankPredictorFinalCta onRunAgain={handleReset} />

      <VerifyModal
        open={step === "verify"}
        onClose={() => {
          if (!pending) setStep("teaser");
        }}
      >
        <VerifyPanel>
          <div className="rp-form-stack mx-auto flex max-w-md flex-col gap-5">
            {verifyPhase === "phone" ? (
              <>
                <div>
                  <span className="rp-field-label">Mobile number</span>
                  <PhoneNumberField
                    layout="verify"
                    countryCode={countryCode}
                    phone={phone}
                    onPhoneChange={(value) => {
                      setPhone(value);
                      if (otpSent) setOtpSent(false);
                      setPhoneSessionTrusted(false);
                    }}
                    onCountryCodeChange={(code) => {
                      setCountryCode(code);
                      setOtpSent(false);
                      setPhoneSessionTrusted(false);
                    }}
                    verifyLeadingIcon={
                      <FiGlobe className="text-lg text-on-surface-variant" aria-hidden />
                    }
                  />
                  <p className="rp-field-hint mt-2">
                    We&apos;ll send a 6-digit OTP via SMS. Valid for 5 minutes.
                  </p>
                </div>
                <Button
                  type="button"
                  variant={otpSent ? "secondary" : "primary"}
                  size="lg"
                  fullWidth
                  leadingIcon={
                    otpSent ? (
                      <FiCheckCircle className="size-5 shrink-0" aria-hidden />
                    ) : (
                      <FiMessageSquare className="size-5 shrink-0" aria-hidden />
                    )
                  }
                  className="h-12 rounded-xl"
                  disabled={pending || otpSending}
                  onClick={handleSendOtp}
                >
                  {otpSending
                    ? "Sending OTP…"
                    : otpSent && phoneSessionTrusted
                      ? "Verified"
                      : otpSent
                        ? "Resend OTP"
                        : "Send OTP to mobile"}
                </Button>
                {otpSent && !phoneSessionTrusted ? (
                  <Input
                    label="Enter OTP"
                    name="otp"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-digit code"
                    hint="Enter the code sent to your mobile number."
                  />
                ) : null}
                <LeadConsentField
                  id="rank-predictor-consent"
                  skin="embedded"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={pending}
                  disclaimer="I understand this is not official NTA data."
                />
                {error ? (
                  <p
                    className="rounded-xl bg-error-container px-4 py-3 text-sm text-on-error-container"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    disabled={
                      pending ||
                      !otpSent ||
                      !consent ||
                      (!phoneSessionTrusted && !otp.trim())
                    }
                    onClick={handleVerifyOtp}
                    className="flex-1 rounded-xl"
                    size="lg"
                  >
                    {pending
                      ? "Verifying…"
                      : phoneSessionTrusted
                        ? "Continue"
                        : "Verify OTP"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("teaser")}
                    className="rounded-xl"
                  >
                    Back
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                  <FiCheckCircle
                    className="mr-1 inline align-middle text-base text-primary"
                    aria-hidden
                  />
                  Mobile verified ({countryCode} {phone})
                </div>
                <Input
                  label="Full name"
                  name="leadName"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Enter Name"

                />
                <Input
                  label="City"
                  name="leadCity"
                  value={leadCity}
                  onChange={(e) => setLeadCity(e.target.value)}
                  placeholder="Your city"
                  autoComplete="address-level2"
                />
                {error ? (
                  <p
                    className="rounded-xl bg-error-container px-4 py-3 text-sm text-on-error-container"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    disabled={pending}
                    onClick={handleUnlockFullPreview}
                    className="flex-1 rounded-xl"
                    size="lg"
                  >
                    {pending ? "Unlocking…" : "Unlock full preview"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={pending}
                    onClick={() => {
                      setError(null);
                      setVerifyPhase("phone");
                    }}
                    className="rounded-xl"
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        </VerifyPanel>
      </VerifyModal>
    </RankPredictorShell>
  );
}

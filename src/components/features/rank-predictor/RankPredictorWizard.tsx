"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { FiBarChart2, FiCheckCircle, FiGlobe, FiMessageSquare, FiRefreshCw } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
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
import {
  completeRankPredictorProfileAction,
  getRankPredictorSessionAction,
  submitRankPredictorAction,
  verifyRankPredictorOtpAction,
} from "@/app/(marketing)/rank-predictor/actions";
import { useComparisonStore } from "@/store/comparison.store";
import { COMPARISON_MAX_SELECTIONS } from "@/lib/constants";
import {
  NEET_SCORE_MAX,
  NEET_SCORE_MIN,
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

type WizardStep = "form" | "teaser" | "verify" | "unlocked";
type VerifyModalPhase = "phone" | "profile";

const COUNTRY_CODE_OPTIONS: OptionItem<string>[] = [
  { value: "+91", label: "India (+91)" },
  { value: "+977", label: "Nepal (+977)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+1", label: "USA/Canada (+1)" },
];

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
  const [verifyPhase, setVerifyPhase] = useState<VerifyModalPhase>("phone");
  const [leadName, setLeadName] = useState(initialSession?.leadName ?? "");
  const [leadCity, setLeadCity] = useState(initialSession?.leadCity ?? "");

  const { selectedSlugs, toggle } = useComparisonStore();

  const formInput = useMemo((): RankPredictorFormInput | null => {
    const scoreNum = Math.round(Number(score));
    if (!category || !stateSlug || !Number.isFinite(scoreNum)) return null;
    return {
      score: scoreNum,
      category,
      stateSlug,
    };
  }, [score, category, stateSlug]);

  const buildInput = useCallback((): RankPredictorFormInput | null => formInput, [formInput]);

  const categoryLabel =
    categoryOptions.find((c) => c.value === category)?.label ?? "";
  const domicileStateSlug = stateSlug || teaser?.input.stateSlug || "";
  const stateLabel =
    stateOptions.find((s) => s.value === domicileStateSlug)?.label ?? "";

  const goVerify = () => {
    setError(null);
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

  const handleSendOtp = () => {
    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setPhone(normalizedPhone);
    setOtpSent(true);
    setError(null);
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
    if (!consent) {
      setError("Please accept the privacy policy to continue.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await verifyRankPredictorOtpAction({
        input,
        phone,
        countryCode,
        otp,
        consent,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setVerifyPhase("profile");
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
    setConsent(false);
    setVerifyPhase("phone");
    setLeadName("");
    setLeadCity("");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const compareAtCapacity = selectedSlugs.length >= COMPARISON_MAX_SELECTIONS;

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
                className="rounded-xl border-[1.5px] px-5 py-2.5 text-[13.5px] font-bold"
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
                    {unlocked.previewColleges.length} matches
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {unlocked.previewColleges.map((college) => (
                    <RankPredictorCollegePreview
                      key={college.slug}
                      college={college}
                      verified
                      inCompare={selectedSlugs.includes(college.slug)}
                      compareDisabled={
                        compareAtCapacity && !selectedSlugs.includes(college.slug)
                      }
                      onAddCompare={(slug) => toggle(slug)}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button as="link" href="/colleges" variant="outline" className="rounded-xl">
                    Browse all colleges
                  </Button>
                  {selectedSlugs.length > 0 ? (
                    <Button
                      as="link"
                      href="/compare"
                      variant="primary"
                      leadingIcon={<FiBarChart2 aria-hidden="true" />}
                      className="rounded-xl"
                    >
                      Open compare →
                    </Button>
                  ) : (
                    <Button as="link" href="/compare" variant="primary" className="rounded-xl">
                      Open compare →
                    </Button>
                  )}
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
                  <div className="rp-verify-phone">
                    <label className="rp-verify-phone-code">
                      <FiGlobe className="text-lg text-on-surface-variant" aria-hidden />
                      <select
                        name="countryCode"
                        value={countryCode}
                        onChange={(event) => setCountryCode(event.target.value)}
                        aria-label="Country code"
                      >
                        {COUNTRY_CODE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="rp-verify-phone-number">
                      <span className="font-semibold text-on-surface-variant">
                        {countryCode}
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="10-digit mobile"
                        value={phone}
                        onChange={(event) => {
                          setPhone(event.target.value);
                          if (otpSent) setOtpSent(false);
                        }}
                        aria-label="Mobile number"
                      />
                    </label>
                  </div>
                  <p className="rp-field-hint mt-2">
                    Used only to verify this prediction session.
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
                  onClick={handleSendOtp}
                >
                  {otpSent ? "OTP sent to mobile" : "Send OTP to mobile"}
                </Button>
                {otpSent ? (
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
                <Checkbox
                  label="I agree to the privacy policy and understand this is not official NTA data."
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
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
                    disabled={pending || !otpSent}
                    onClick={handleVerifyOtp}
                    className="flex-1 rounded-xl"
                    size="lg"
                  >
                    {pending ? "Verifying…" : "Verify OTP"}
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
                  autoComplete="name"
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

"use client";

import { useCallback, useEffect, useMemo, useState, useTransition, type ReactNode } from "react";
import { FiBarChart2, FiRefreshCw } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  CollegePredictorBanner,
  FormPanel,
  HowItWorksGrid,
  RankPredictorCollegePreview,
  RankPredictorFaq,
  RankPredictorHero,
  RankPredictorResultHeader,
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
  getUnlockedRankPredictorAction,
  submitRankPredictorAction,
  verifyRankPredictorOtpAction,
} from "@/app/(marketing)/rank-predictor/actions";
import { useComparisonStore } from "@/store/comparison.store";
import { COMPARISON_MAX_SELECTIONS } from "@/lib/constants";
import {
  NEET_SCORE_MAX,
  NEET_SCORE_MIN,
} from "@/lib/rank-predictor/constants";
import type {
  NeetCategory,
  RankPredictorFormInput,
  RankPredictorSession,
  RankPredictorTeaserResult,
  RankPredictorUnlockedResult,
} from "@/lib/rank-predictor/types";
import { isPhoneVerifiedRankPredictorSession } from "@/lib/rank-predictor/types";
import type { OptionItem } from "@/types/core";
import { cn } from "@/lib/utils";

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

function SectionBlock({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
          {description ? (
            <p className="mt-2 text-sm text-on-surface-variant md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

const FAQ = [
  {
    q: "Is this my official NEET rank?",
    a: "No. This tool estimates an AIR range from your score using historical trends. NTA publishes the official rank separately.",
  },
  {
    q: "Why do I need to verify?",
    a: "Verification unlocks a tighter rank range and the college preview list you can save and compare.",
  },
  {
    q: "What about category and state quota?",
    a: "We store your category and domicile for future features. College previews use closing ranks from our dataset (Gujarat state counselling 2025 where available).",
  },
];

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
    initialSession ? String(initialSession.score) : ""
  );
  const [category, setCategory] = useState<NeetCategory | "">(
    initialSession?.category ?? ""
  );
  const [stateSlug, setStateSlug] = useState(initialSession?.stateSlug ?? "");

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
  const [leadStateSlug, setLeadStateSlug] = useState(
    initialSession?.leadStateSlug ?? ""
  );
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
      setError("Fill in score, category, and domicile state.");
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

      const unlock = await getUnlockedRankPredictorAction(input);
      if (unlock.success) {
        setUnlocked(unlock.data);
        setStep("unlocked");
      }
    });
  };

  const handleVerifyOtp = () => {
    const input = buildInput();
    if (!input) {
      setError("Session expired. Start again from your score.");
      return;
    }
    if (!otpSent) {
      setError("Send the OTP before continuing.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await verifyRankPredictorOtpAction({
        otp,
        phone,
        countryCode,
        consent,
        input,
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
    if (!input) {
      setError("Session expired. Start again from your score.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await completeRankPredictorProfileAction({
        input,
        leadName,
        leadStateSlug,
        leadCity,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setUnlocked(result.data);
      setStep("unlocked");
    });
  };

  const handleReset = () => {
    setStep("form");
    setTeaser(null);
    setUnlocked(null);
    setOtp("");
    setOtpSent(false);
    setVerifyPhase("phone");
    setLeadName("");
    setLeadStateSlug("");
    setLeadCity("");
    setError(null);
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
      <Container size="2xl" className="flex flex-col gap-10 md:gap-12">
        {step === "form" ? (
          <RankPredictorHero>
            <FormPanel>
              <div className="flex flex-col gap-6">
                <Input
                  label="NEET score (out of 720)"
                  name="score"
                  type="number"
                  min={NEET_SCORE_MIN}
                  max={NEET_SCORE_MAX}
                  inputMode="numeric"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  hint={`Whole marks between ${NEET_SCORE_MIN} and ${NEET_SCORE_MAX}.`}
                  required
                />

                <div className="grid gap-5 sm:grid-cols-2">
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
                    className="rounded-xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container"
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
                  className="h-12 rounded-xl text-base"
                >
                  {pending ? "Calculating..." : "See my estimate"}
                </Button>
              </div>
            </FormPanel>
          </RankPredictorHero>
        ) : (
          <RankPredictorResultHeader />
        )}

        <CollegePredictorBanner />

        {showResults ? (
          <ResultsPanel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <RankPredictorScoreChip
                score={teaser.input.score}
                categoryLabel={
                  categoryOptions.find((c) => c.value === teaser.input.category)
                    ?.label ?? ""
                }
                stateLabel={
                  stateOptions.find((s) => s.value === teaser.input.stateSlug)
                    ?.label ?? ""
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                leadingIcon={<FiRefreshCw aria-hidden="true" />}
                onClick={handleReset}
                className="rounded-xl"
              >
                New prediction
              </Button>
            </div>

            <RankResultShowcase
              preview={teaser.coarse}
              refined={unlocked?.tight}
              stateMeritRange={unlocked?.stateMeritRange}
              referenceYear={teaser.referenceYear}
              onUnlock={goVerify}
            />

            {step === "unlocked" ? (
              <p className="rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                {teaser.categoryNote}
              </p>
            ) : null}

            {step === "unlocked" && unlocked ? (
              <>
                <SectionBlock
                  title="Colleges in your ballpark"
                  description={`Matched to your AIR band using ${teaser.referenceYear} AIQ closing ranks (${categoryOptions.find((c) => c.value === teaser.input.category)?.label ?? "your category"}) in our catalog.`}
                  actions={
                    selectedSlugs.length > 0 ? (
                      <Button
                        as="link"
                        href="/compare"
                        variant="primary"
                        size="sm"
                        leadingIcon={<FiBarChart2 aria-hidden="true" />}
                        className="rounded-xl"
                      >
                        Compare ({selectedSlugs.length})
                      </Button>
                    ) : undefined
                  }
                >
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                </SectionBlock>
                <div className="flex flex-wrap gap-3">
                  <Button as="link" href="/colleges" variant="outline" className="rounded-xl">
                    Browse all colleges
                  </Button>
                  <Button as="link" href="/compare" variant="secondary" className="rounded-xl">
                    Open compare
                  </Button>
                </div>
              </>
            ) : null}
          </ResultsPanel>
        ) : null}

        <SectionBlock
          title="How it works"
          className={cn(step !== "form" && "opacity-90")}
        >
          <HowItWorksGrid />
        </SectionBlock>

        <SectionBlock title="Common questions">
          <RankPredictorFaq items={FAQ} />
        </SectionBlock>

        <DataSourceNotice />
      </Container>
      <VerifyModal
        open={step === "verify"}
        onClose={() => {
          if (!pending) setStep("teaser");
        }}
      >
        <VerifyPanel>
          <div className="mx-auto flex max-w-md flex-col gap-5">
            {verifyPhase === "phone" ? (
              <>
                <div>
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Mobile number
                  </span>
                  <div className="grid overflow-hidden rounded-2xl border border-border bg-background transition-colors focus-within:border-brand-500 sm:grid-cols-[0.78fr_1.22fr]">
                    <label className="flex items-center gap-2 border-b border-border bg-surface-container-low px-4 py-3 sm:border-b-0 sm:border-r">
                      <span className="material-symbols-outlined text-lg text-text-muted">
                        public
                      </span>
                      <select
                        name="countryCode"
                        value={countryCode}
                        onChange={(event) => setCountryCode(event.target.value)}
                        className="w-full bg-transparent text-sm font-semibold text-text focus:outline-none"
                        aria-label="Country code"
                      >
                        {COUNTRY_CODE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex items-center gap-2 px-4 py-3">
                      <span className="text-sm font-semibold text-text-muted">
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
                        className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
                        aria-label="Mobile number"
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-text-muted">
                    Used only to verify this prediction session.
                  </p>
                </div>
                <Button
                  type="button"
                  variant={otpSent ? "secondary" : "primary"}
                  size="lg"
                  className="h-12 w-full rounded-xl shadow-[0_12px_28px_-18px_rgba(0,61,155,0.8)]"
                  onClick={handleSendOtp}
                >
                  <span className="material-symbols-outlined text-xl">
                    {otpSent ? "check_circle" : "sms"}
                  </span>
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
                  <span className="material-symbols-outlined mr-1 align-middle text-base text-primary">
                    check_circle
                  </span>
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
                <Select
                  label="State"
                  name="leadStateSlug"
                  placeholder="Select state"
                  options={stateOptions}
                  value={leadStateSlug}
                  onValueChange={setLeadStateSlug}
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

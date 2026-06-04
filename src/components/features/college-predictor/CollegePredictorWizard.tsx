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
  CollegePredictorAirChip,
  CollegePredictorBucketTabs,
  CollegePredictorFaq,
  CollegePredictorHero,
  CollegePredictorHowItWorks,
  CollegePredictorQuotaField,
  CollegePredictorResultHeader,
  CollegePredictorTeaserShowcase,
  FormPanel,
  RankPredictorShell,
  ResultsPanel,
  VerifyModal,
  VerifyPanel,
} from "@/components/features/college-predictor/CollegePredictorParts";
import {
  completeCollegePredictorProfileAction,
  getCollegePredictorSessionAction,
  getUnlockedCollegePredictorAction,
  submitCollegePredictorAction,
  verifyCollegePredictorOtpAction,
} from "@/app/(marketing)/college-predictor/actions";
import { useComparisonStore } from "@/store/comparison.store";
import { AIR_MAX, AIR_MIN } from "@/lib/college-predictor/constants";
import type {
  CollegePredictorFormInput,
  CollegePredictorSession,
  CollegePredictorTeaserResult,
  CollegePredictorUnlockedResult,
} from "@/lib/college-predictor/types";
import { isPhoneVerifiedCollegePredictorSession } from "@/lib/college-predictor/types";
import {
  getListingCategoryShortLabel,
  getListingFeeQuotaShort,
  LISTING_CATEGORY_OPTIONS,
} from "@/lib/colleges/listing-options";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { ListingQuota } from "@/types/filters";
import type { OptionItem } from "@/types/core";
import { cn } from "@/lib/utils";
import Link from "next/link";

type WizardStep = "form" | "teaser" | "verify" | "unlocked";
type VerifyModalPhase = "phone" | "profile";

const COUNTRY_CODE_OPTIONS: OptionItem<string>[] = [
  { value: "+91", label: "India (+91)" },
  { value: "+977", label: "Nepal (+977)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+1", label: "USA/Canada (+1)" },
];

interface CollegePredictorWizardProps {
  stateOptions: OptionItem<string>[];
  initialSession: CollegePredictorSession | null;
  initialTeaser: CollegePredictorTeaserResult | null;
  initialUnlocked: CollegePredictorUnlockedResult | null;
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

export function CollegePredictorWizard({
  stateOptions,
  initialSession,
  initialTeaser: initialTeaserProp,
  initialUnlocked: initialUnlockedProp,
}: CollegePredictorWizardProps) {
  const [step, setStep] = useState<WizardStep>(
    initialUnlockedProp ? "unlocked" : initialTeaserProp ? "teaser" : "form"
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [air, setAir] = useState(initialSession ? String(initialSession.air) : "");
  const [category, setCategory] = useState<NeetCategory | "">(
    initialSession?.category ?? ""
  );
  const [stateSlug, setStateSlug] = useState(initialSession?.stateSlug ?? "");
  const [quota, setQuota] = useState<ListingQuota | "">(initialSession?.quota ?? "state");

  const [teaser, setTeaser] = useState<CollegePredictorTeaserResult | null>(
    initialTeaserProp
  );
  const [unlocked, setUnlocked] = useState<CollegePredictorUnlockedResult | null>(
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

  const { selectedSlugs } = useComparisonStore();

  const formInput = useMemo((): CollegePredictorFormInput | null => {
    const airNum = Math.round(Number(air));
    if (!category || !stateSlug || !quota || !Number.isFinite(airNum)) return null;
    return {
      air: airNum,
      category,
      stateSlug,
      quota,
    };
  }, [air, category, stateSlug, quota]);

  const buildInput = useCallback((): CollegePredictorFormInput | null => formInput, [formInput]);

  const rankCategoryShort = getListingCategoryShortLabel(
    teaser?.input.category ?? formInput?.category
  );
  const feeQuotaShort = getListingFeeQuotaShort(teaser?.input.quota ?? formInput?.quota);

  const goVerify = () => {
    setError(null);
    setStep("verify");
    setVerifyPhase("phone");
    startTransition(async () => {
      const stored = await getCollegePredictorSessionAction();
      if (
        stored.success &&
        stored.data.session &&
        isPhoneVerifiedCollegePredictorSession(stored.data.session)
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

  const handleSubmitAir = () => {
    const input = buildInput();
    if (!input) {
      setError("Fill in rank, category, domicile state, and quota.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await submitCollegePredictorAction(input);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setTeaser(result.data);
      setUnlocked(null);
      setStep("teaser");

      const unlock = await getUnlockedCollegePredictorAction(input);
      if (unlock.success) {
        setUnlocked(unlock.data);
        setStep("unlocked");
      }
    });
  };

  const handleVerifyOtp = () => {
    const input = buildInput();
    if (!input) {
      setError("Session expired. Start again from your rank.");
      return;
    }
    if (!otpSent) {
      setError("Send the OTP before continuing.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await verifyCollegePredictorOtpAction({
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

  const handleUnlockLists = () => {
    const input = buildInput();
    if (!input) {
      setError("Session expired. Start again from your rank.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await completeCollegePredictorProfileAction({
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

  const showResults =
    (step === "teaser" || step === "verify" || step === "unlocked") && teaser;

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

  const categoryLabel =
    LISTING_CATEGORY_OPTIONS.find((c) => c.value === teaser?.input.category)?.label ??
    "";
  const stateLabel =
    stateOptions.find((s) => s.value === teaser?.input.stateSlug)?.label ?? "";
  const quotaLabel =
    teaser?.input.quota === "aiq"
      ? "AIQ"
      : teaser?.input.quota === "state"
        ? "State"
        : teaser?.input.quota === "management"
          ? "Management"
          : teaser?.input.quota === "nri"
            ? "NRI"
            : "";

  return (
    <RankPredictorShell>
      <Container size="2xl" className="flex flex-col gap-10 md:gap-12">
        {step === "form" ? (
          <CollegePredictorHero>
            <FormPanel>
              <div className="flex flex-col gap-6">
                <Input
                  label="All India Rank (AIR)"
                  name="air"
                  type="number"
                  min={AIR_MIN}
                  max={AIR_MAX}
                  inputMode="numeric"
                  value={air}
                  onChange={(e) => setAir(e.target.value)}
                  hint={`Official NTA rank between ${AIR_MIN.toLocaleString("en-IN")} and ${AIR_MAX.toLocaleString("en-IN")}.`}
                  required
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Select
                    label="Category"
                    name="category"
                    placeholder="Select category"
                    options={LISTING_CATEGORY_OPTIONS}
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

                <CollegePredictorQuotaField
                  value={quota}
                  onChange={(q) => setQuota(q)}
                />

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
                  onClick={handleSubmitAir}
                  className="h-14 rounded-2xl text-base shadow-[0_14px_32px_-18px_rgba(0,61,155,0.75)] ring-2 ring-primary/15"
                >
                  {pending ? "Matching colleges..." : "Get my college match summary"}
                </Button>
                <p className="text-center text-xs leading-relaxed text-on-surface-variant">
                  College names unlock after verification. No spam, just your
                  prediction session and shortlist.
                </p>
              </div>
            </FormPanel>
          </CollegePredictorHero>
        ) : (
          <CollegePredictorResultHeader
            referenceYear={teaser?.referenceYear}
          />
        )}

        {showResults ? (
          <ResultsPanel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CollegePredictorAirChip
                air={teaser.input.air}
                categoryLabel={categoryLabel}
                stateLabel={stateLabel}
                quotaLabel={quotaLabel}
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

            {step !== "unlocked" ? (
              <CollegePredictorTeaserShowcase
                air={teaser.input.air}
                counts={teaser.counts}
                referenceYear={teaser.referenceYear}
                onUnlock={goVerify}
              />
            ) : null}

            {step === "unlocked" && unlocked ? (
              <>
                <p className="rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                  {teaser.disclaimer}
                </p>

                {unlocked.likely.length > 0 ||
                  unlocked.possible.length > 0 ||
                  unlocked.reach.length > 0 ? (
                  <CollegePredictorBucketTabs
                    likely={unlocked.likely}
                    possible={unlocked.possible}
                    reach={unlocked.reach}
                    referenceYear={teaser.referenceYear}
                    rankCategoryShort={rankCategoryShort}
                    feeQuotaShort={feeQuotaShort}
                    headerActions={
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
                  />
                ) : null}

                {unlocked.likely.length === 0 &&
                  unlocked.possible.length === 0 &&
                  unlocked.reach.length === 0 ? (
                  <p className="rounded-xl border border-outline-variant/50 bg-surface-container-low px-4 py-4 text-sm text-on-surface-variant">
                    No colleges with cutoff data matched your inputs. Try State quota for
                    Gujarat, or browse the{" "}
                    <Link
                      href="/colleges" className="font-semibold text-primary hover:underline">
                      full catalog
                    </Link>
                    .
                  </p>
                ) : null}

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
          <CollegePredictorHowItWorks />
        </SectionBlock>

        <SectionBlock title="Common questions">
          <CollegePredictorFaq />
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
                    Demo OTP: <span className="font-mono font-semibold">121212</span>
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
                  label="I agree to the privacy policy and understand this is not official MCC/NTA allotment data."
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
                    {pending ? "Verifying..." : "Verify OTP"}
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
                  placeholder="Enter name"
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
                    onClick={handleUnlockLists}
                    className="flex-1 rounded-xl"
                    size="lg"
                  >
                    {pending ? "Unlocking..." : "Unlock college lists"}
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

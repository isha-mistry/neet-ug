"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { FiBarChart2, FiCheckCircle, FiGlobe, FiMessageSquare, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LeadConsentField } from "@/components/features/leads/LeadConsentField";
import { ToolCallout } from "@/components/features/predictors/PredictorToolParts";
import {
  CollegePredictorAirChip,
  CollegePredictorBucketTabs,
  CollegePredictorFaq,
  CollegePredictorHero,
  CollegePredictorHowItWorks,
  CollegePredictorQuotaField,
  CollegePredictorResultHeader,
  CollegePredictorTeaserShowcase,
  RankPredictorShell,
  ResultsPanel,
  VerifyModal,
  VerifyPanel,
} from "@/components/features/college-predictor/CollegePredictorParts";
import { sendPhoneLoginOtpAction } from "@/app/actions/send-phone-otp";
import {
  completeCollegePredictorProfileAction,
  getCollegePredictorSessionAction,
  getUnlockedCollegePredictorAction,
  submitCollegePredictorAction,
  verifyCollegePredictorOtpAction,
} from "@/app/(marketing)/college-predictor/actions";
import { useComparisonStore } from "@/store/comparison.store";
import { AIR_MAX, AIR_MIN } from "@/lib/college-predictor/constants";
import { COLLEGE_PREDICTOR_HERO, COLLEGE_PREDICTOR_VERIFY_PANEL } from "@/lib/college-predictor/page-content";
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
import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { applyPredictorPhoneVerification } from "@/components/features/predictors/predictor-phone-verify";

type WizardStep = "form" | "teaser" | "verify" | "unlocked";
type VerifyModalPhase = "phone" | "profile";

interface CollegePredictorWizardProps {
  stateOptions: OptionItem<string>[];
  initialSession: CollegePredictorSession | null;
  initialTeaser: CollegePredictorTeaserResult | null;
  initialUnlocked: CollegePredictorUnlockedResult | null;
}

export function CollegePredictorWizard({
  stateOptions,
  initialSession,
  initialTeaser: initialTeaserProp,
  initialUnlocked: initialUnlockedProp,
}: CollegePredictorWizardProps) {
  const [step, setStep] = useState<WizardStep>(
    initialUnlockedProp ? "unlocked" : initialTeaserProp ? "teaser" : "form",
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [air, setAir] = useState(initialSession ? String(initialSession.air) : "");
  const [category, setCategory] = useState<NeetCategory | "">(
    initialSession?.category ?? "",
  );
  const [stateSlug, setStateSlug] = useState(initialSession?.stateSlug ?? "");
  const [quota, setQuota] = useState<ListingQuota | "">(initialSession?.quota ?? "state");

  const [teaser, setTeaser] = useState<CollegePredictorTeaserResult | null>(
    initialTeaserProp,
  );
  const [unlocked, setUnlocked] = useState<CollegePredictorUnlockedResult | null>(
    initialUnlockedProp,
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
  const [leadStateSlug, setLeadStateSlug] = useState(
    initialSession?.leadStateSlug ?? "",
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
    teaser?.input.category ?? formInput?.category,
  );
  const feeQuotaShort = getListingFeeQuotaShort(teaser?.input.quota ?? formInput?.quota);

  const goVerify = () => {
    setError(null);
    setPhoneSessionTrusted(false);
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

  const completePhoneVerification = useCallback(
    async (trustedSession: boolean) => {
      const input = buildInput();
      if (!input) {
        setError("Session expired. Start again from your rank.");
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
            return { success: false, error: "Session expired. Start again from your rank." };
          }
          const result = await verifyCollegePredictorOtpAction({
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
      setError("Send the OTP or continue with your verified number first.");
      return;
    }
    setError(null);
    startTransition(async () => {
      await completePhoneVerification(phoneSessionTrusted);
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
    setPhoneSessionTrusted(false);
    setConsent(false);
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
    LISTING_CATEGORY_OPTIONS.find((c) => c.value === teaser?.input.category)?.label ?? "";
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
    <RankPredictorShell className="college-predictor-page">
      {step === "form" ? (
        <CollegePredictorHero>
          <div className="rp-form-stack flex flex-col gap-4">
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

            <div className="grid gap-4 sm:grid-cols-2">
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

            <CollegePredictorQuotaField value={quota} onChange={(q) => setQuota(q)} />

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
              onClick={handleSubmitAir}
              className="h-12 rounded-xl text-[15px] font-bold"
            >
              {pending ? "Matching colleges..." : COLLEGE_PREDICTOR_HERO.submitLabel}
            </Button>
            <p className="text-center text-xs leading-relaxed text-outline">
              {COLLEGE_PREDICTOR_HERO.submitHint}
            </p>
          </div>
        </CollegePredictorHero>
      ) : null}

      <Container
        size="page"
        className={step !== "form" ? "ms-content-below-nav" : undefined}
      >
        {step !== "form" ? (
          <CollegePredictorResultHeader referenceYear={teaser?.referenceYear} />
        ) : null}

        {showResults ? (
          <ResultsPanel>
            <div className="rp-rsum ">
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
                className="rounded-[14px] border-[1.5px] px-5 py-2.5 text-[13.5px] font-bold"
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
                <ToolCallout variant="info" className="mt-4">
                  {teaser.disclaimer}
                </ToolCallout>

                {unlocked.likely.length > 0 ||
                  unlocked.possible.length > 0 ||
                  unlocked.reach.length > 0 ? (
                  <div className="mt-8">
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
                  </div>
                ) : null}

                {unlocked.likely.length === 0 &&
                  unlocked.possible.length === 0 &&
                  unlocked.reach.length === 0 ? (
                  <ToolCallout variant="info" className="mt-4">
                    No colleges with cutoff data matched your inputs. Try State quota for
                    Gujarat, or browse the{" "}
                    <Link href="/colleges" className="font-bold text-primary hover:underline">
                      full catalog
                    </Link>
                    .
                  </ToolCallout>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    as="link"
                    href="/colleges"
                    variant="outline"
                    className="rounded-xl border-[1.5px]"
                  >
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
      </Container>

      <CollegePredictorHowItWorks />

      <Container size="page">
        <section className="py-16 md:py-24">
          <span className="rp-eyebrow">Common questions</span>
          <h2 className="rp-section-title">
            Before you shortlist, <em>read this.</em>
          </h2>
          <CollegePredictorFaq />
        </section>

        <DataSourceNotice />
      </Container>

      <VerifyModal
        open={step === "verify"}
        onClose={() => {
          if (!pending) setStep("teaser");
        }}
      >
        <VerifyPanel
          title={COLLEGE_PREDICTOR_VERIFY_PANEL.title}
          description={COLLEGE_PREDICTOR_VERIFY_PANEL.description}
          bullets={COLLEGE_PREDICTOR_VERIFY_PANEL.bullets}
        >
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
                  id="college-predictor-consent"
                  skin="embedded"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={pending}
                  disclaimer="I understand this is not official MCC/NTA allotment data."
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
                  placeholder="Enter name"
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
                    {pending ? "Unlocking…" : "Unlock college lists"}
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

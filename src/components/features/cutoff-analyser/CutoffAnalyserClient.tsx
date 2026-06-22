"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type DragEvent,
} from "react";
import {
  FiCheckCircle,
  FiGlobe,
  FiMessageSquare,
  FiDownload,
  FiMenu,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Container } from "@/components/common/Container";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import { ToolCallout } from "@/components/features/predictors/PredictorToolParts";
import { LeadConsentField } from "@/components/features/leads/LeadConsentField";
import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { applyPredictorPhoneVerification } from "@/components/features/predictors/predictor-phone-verify";
import { sendPhoneLoginOtpAction } from "@/app/actions/send-phone-otp";
import {
  completeCutoffAnalyserProfileAction,
  getCutoffAnalyserSessionAction,
  submitCutoffAnalyserAction,
  verifyCutoffAnalyserOtpAction,
} from "@/app/(marketing)/cutoff-analyser/actions";
import { CutoffComparisonTable } from "./CutoffComparisonTable";
import {
  AnalyserInputChip,
  AnalyserMetricCard,
  AnalyserSectionBlock,
  AnalyserSectionBody,
  CutoffAnalyserBanner,
  CutoffAnalyserHero,
  CutoffAnalyserLeadMagnet,
  CutoffAnalyserResultHeader,
  CutoffAnalyserTeaserShowcase,
  CollegePredictorQuotaField,
  FilterPill,
  gapDisplay,
  GlossaryGrid,
  RankPredictorFaqSection,
  RankPredictorShell,
  ResultsPanel,
  VerifyModal,
  VerifyPanel,
} from "./CutoffAnalyserParts";
import { EligibilityGlancePanel } from "./EligibilityGlancePanel";
import { CounselingTimelinePanel } from "./CounselingTimelinePanel";
import { STATUS_LABEL } from "./section-styles";
import {
  CUTOFF_ANALYSER_HERO,
  CUTOFF_ANALYSER_LEAD_MAGNET_CHOICE,
  CUTOFF_ANALYSER_LEAD_MAGNET_ROUNDS,
  CUTOFF_ANALYSER_VERIFY_PANEL,
} from "@/lib/cutoff-analyser/page-content";
import {
  ANALYSER_DISCLAIMER,
  FOCUS_STATE_OPTIONS,
  NEET_SCORE_MAX,
  NEET_SCORE_MIN,
  QUOTA_OPTIONS,
} from "@/lib/cutoff-analyser/constants";
import { filterStateQuotaRowsByQuota } from "@/lib/cutoff-analyser/quota-rows";
import { applyCollegeTypeFilter } from "@/lib/cutoff-analyser/run-shared";
import type {
  CutoffAnalyserFormInput,
  CutoffAnalyserSession,
  CutoffAnalyserTeaserResult,
  CutoffAnalyserUnlockedResult,
  FocusStateSlug,
  PreferenceListItem,
} from "@/lib/cutoff-analyser/types";
import { isPhoneVerifiedCutoffAnalyserSession } from "@/lib/cutoff-analyser/types";
import {
  COUNSELING_SESSION_YEAR,
  COUNSELING_TIMELINE_DISCLAIMER,
  CUTOFF_FAQ,
  GLOSSARY,
  getCounselingTimeline,
} from "@/lib/cutoff-analyser/content";
import { compareCutoffStatus, statusToPreferenceTag } from "@/lib/cutoff-analyser/status";
import { CollegeCard } from "@/components/features/colleges/listing/CollegeCard";
import {
  getListingCategoryShortLabel,
  getListingFeeQuotaShort,
} from "@/lib/colleges/listing-options";
import { collegeMatchToSummary } from "@/lib/cutoff-analyser/map-to-college-summary";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { cn, formatINR, formatNumber } from "@/lib/utils";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { ListingQuota } from "@/types/filters";
import type { OptionItem } from "@/types/core";

const CATEGORY_OPTIONS: { value: NeetCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "ews", label: "EWS" },
];

const DOMICILE_OPTIONS = FOCUS_STATE_OPTIONS.map((s) => ({
  value: s.slug,
  label: s.label,
}));

type WizardStep = "form" | "teaser" | "verify" | "unlocked";
type VerifyModalPhase = "phone" | "profile";

interface CutoffAnalyserClientProps {
  stateOptions: OptionItem<string>[];
  initialSession: CutoffAnalyserSession | null;
  initialTeaser: CutoffAnalyserTeaserResult | null;
  initialUnlocked: CutoffAnalyserUnlockedResult | null;
}

export function CutoffAnalyserClient({
  stateOptions,
  initialSession,
  initialTeaser: initialTeaserProp,
  initialUnlocked: initialUnlockedProp,
}: CutoffAnalyserClientProps) {
  const [step, setStep] = useState<WizardStep>(
    initialUnlockedProp ? "unlocked" : initialTeaserProp ? "teaser" : "form",
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [score, setScore] = useState(
    initialSession
      ? String(initialSession.score)
      : initialTeaserProp
        ? String(initialTeaserProp.input.score)
        : "",
  );
  const [category, setCategory] = useState<NeetCategory | "">(
    initialSession?.category ?? initialTeaserProp?.input.category ?? "",
  );
  const [domicileState, setDomicileState] = useState<FocusStateSlug | "">(
    initialSession?.domicileState ?? initialTeaserProp?.input.domicileState ?? "",
  );
  const [quota, setQuota] = useState<ListingQuota | "">(
    initialSession?.quota ?? initialTeaserProp?.input.quota ?? "state",
  );

  const [teaser, setTeaser] = useState<CutoffAnalyserTeaserResult | null>(
    initialTeaserProp,
  );
  const [unlocked, setUnlocked] = useState<CutoffAnalyserUnlockedResult | null>(
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

  const [collegeTypeFilter, setCollegeTypeFilter] = useState<
    "government" | "private" | "all"
  >("government");
  const [quotaTableFilter, setQuotaTableFilter] = useState<
    ListingQuota | "all"
  >("all");
  const [sortKey, setSortKey] = useState<
    "state" | "closing" | "gap" | "status"
  >("status");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [feeState, setFeeState] = useState<FocusStateSlug>("gujarat");
  const [preferenceList, setPreferenceList] = useState<PreferenceListItem[]>([]);

  const formInput = useMemo((): CutoffAnalyserFormInput | null => {
    const scoreNum = Math.round(Number(score));
    if (!category || !domicileState || !quota || !Number.isFinite(scoreNum)) {
      return null;
    }
    return {
      score: scoreNum,
      category,
      domicileState,
      quota,
    };
  }, [score, category, domicileState, quota]);

  const buildInput = useCallback(
    (): CutoffAnalyserFormInput | null => formInput,
    [formInput],
  );

  const result = useMemo(() => {
    if (!unlocked) return null;
    return applyCollegeTypeFilter(unlocked.result, collegeTypeFilter);
  }, [unlocked, collegeTypeFilter]);

  const counselingTimeline = useMemo(() => getCounselingTimeline(), []);

  const filteredRows = useMemo(
    () =>
      result
        ? filterStateQuotaRowsByQuota(result.stateQuotaRows, quotaTableFilter)
        : [],
    [result, quotaTableFilter],
  );

  const rankCategoryShort = useMemo(
    () =>
      getListingCategoryShortLabel(
        teaser?.input.category ?? (category || undefined),
      ),
    [teaser?.input.category, category],
  );

  const feeQuotaShort = useMemo(
    () => getListingFeeQuotaShort(teaser?.input.quota ?? (quota || undefined)),
    [teaser?.input.quota, quota],
  );

  const collegeListPreview = useMemo(() => {
    if (!result) return [];
    const listQuota = teaser?.input.quota ?? quota;
    if (!listQuota) return [];
    return result.collegeMatches.slice(0, 12).map((match) => ({
      match,
      college: collegeMatchToSummary(match, result.referenceYear, listQuota),
    }));
  }, [result, quota, teaser?.input.quota]);

  const addToPreference = useCallback(
    (match: NonNullable<typeof result>["collegeMatches"][number]) => {
      setPreferenceList((prev) => {
        if (prev.some((p) => p.collegeSlug === match.college.slug)) return prev;
        return [
          ...prev,
          {
            id: match.college.slug,
            collegeSlug: match.college.slug,
            name: match.college.name,
            city: match.college.city,
            stateSlug: match.college.stateSlug,
            affiliation:
              match.college.collegeType === "government"
                ? "Government"
                : match.college.collegeType === "deemed"
                  ? "Deemed"
                  : "Private",
            closingRank: match.closingRank,
            gapToUser: match.gapToUser,
            tag: statusToPreferenceTag(match.status),
          },
        ];
      });
    },
    [],
  );

  const activeDomicile = domicileState || teaser?.input.domicileState || "gujarat";

  const eligibilityGlanceContext = useMemo(() => {
    if (!result || !teaser) return undefined;
    const listQuota = teaser.input.quota;
    return {
      referenceYear: teaser.referenceYear,
      quota: listQuota,
      quotaLabel:
        QUOTA_OPTIONS.find((q) => q.value === listQuota)?.label ?? listQuota,
      categoryLabel: getListingCategoryShortLabel(teaser.input.category),
      stateQuotaRows: result.stateQuotaRows,
      collegeMatches: result.collegeMatches,
    };
  }, [result, teaser]);

  const mutedStateSlugs = useMemo(() => {
    if (activeDomicile === "maharashtra") {
      return ["gujarat"] as FocusStateSlug[];
    }
    return ["maharashtra"] as FocusStateSlug[];
  }, [activeDomicile]);

  const domicileLabel =
    FOCUS_STATE_OPTIONS.find((s) => s.slug === activeDomicile)?.label ??
    activeDomicile;

  const goVerify = () => {
    setError(null);
    setPhoneSessionTrusted(false);
    setStep("verify");
    setVerifyPhase("phone");
    startTransition(async () => {
      const stored = await getCutoffAnalyserSessionAction();
      if (
        stored.success &&
        stored.data.session &&
        isPhoneVerifiedCutoffAnalyserSession(stored.data.session)
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
        setError("Session expired. Start a new analysis.");
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
            return { success: false, error: "Session expired. Start a new analysis." };
          }
          const verifyResult = await verifyCutoffAnalyserOtpAction({
            input: currentInput,
            phone: payload.phone,
            countryCode: payload.countryCode,
            otp: payload.otp,
            consent: payload.consent,
            trustedSession: payload.trustedSession,
          });
          return verifyResult.success
            ? { success: true }
            : { success: false, error: verifyResult.error };
        },
        onVerified: () => setVerifyPhase("profile"),
      });
    },
    [buildInput, phone, countryCode, consent, otp],
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
      const sendResult = await sendPhoneLoginOtpAction({
        phone: normalizedPhone,
        countryCode,
      });
      setOtpSending(false);
      if (!sendResult.success) {
        setError(sendResult.error);
        setOtpSent(false);
        setPhoneSessionTrusted(false);
        return;
      }
      setOtpSent(true);
      if (sendResult.alreadyVerified) {
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
      setError(
        `Enter a valid NEET score between ${NEET_SCORE_MIN} and ${NEET_SCORE_MAX}, plus category, domicile, and quota.`,
      );
      return;
    }
    setError(null);
    startTransition(async () => {
      const submitResult = await submitCutoffAnalyserAction(input);
      if (!submitResult.success) {
        setError(submitResult.error);
        return;
      }
      setTeaser(submitResult.data);
      setUnlocked(null);
      setStep("teaser");
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleVerifyOtp = () => {
    if (!buildInput()) return;
    if (!otpSent) {
      setError("Send the OTP or continue with your verified number first.");
      return;
    }
    setError(null);
    startTransition(async () => {
      await completePhoneVerification(phoneSessionTrusted);
    });
  };

  const handleUnlockAnalysis = () => {
    const input = buildInput();
    if (!input) return;
    setError(null);
    startTransition(async () => {
      const profileResult = await completeCutoffAnalyserProfileAction({
        input,
        leadName: leadName.trim(),
        leadStateSlug,
        leadCity: leadCity.trim(),
      });
      if (!profileResult.success) {
        setError(profileResult.error);
        return;
      }
      setUnlocked(profileResult.data);
      setTeaser(profileResult.data);
      setPreferenceList([]);
      setStep("unlocked");
    });
  };

  const handleReset = () => {
    setStep("form");
    setTeaser(null);
    setUnlocked(null);
    setScore("");
    setCategory("");
    setDomicileState("");
    setQuota("state");
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setPhoneSessionTrusted(false);
    setConsent(false);
    setVerifyPhase("phone");
    setLeadName("");
    setLeadStateSlug("");
    setLeadCity("");
    setPreferenceList([]);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function exportCsv() {
    if (!result) return;
    const rows = [...filteredRows].sort((a, b) => {
      const byStatus = compareCutoffStatus(a.status, b.status);
      if (byStatus !== 0) return byStatus;
      return a.stateName.localeCompare(b.stateName);
    });
    const header = "State,Quota,Opening,Closing,Gap,Status\n";
    const body = rows
      .map(
        (r) =>
          `${r.stateName},${r.quotaLabel},${r.openingRank ?? ""},${r.closingRank ?? ""},${r.gapToUser ?? ""},${STATUS_LABEL[r.status]}`,
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cutoff-analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onDragStart(e: DragEvent, id: string) {
    e.dataTransfer.setData("text/plain", id);
  }

  function onDrop(e: DragEvent, targetId: string) {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;
    setPreferenceList((prev) => {
      const from = prev.findIndex((p) => p.id === sourceId);
      const to = prev.findIndex((p) => p.id === targetId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  function printPreferenceList() {
    const source = document.querySelector(".ca-preference-list-print-root");
    if (!(source instanceof HTMLElement)) return;

    const portalId = "ca-preference-list-print-portal";
    document.getElementById(portalId)?.remove();

    const portal = document.createElement("div");
    portal.id = portalId;
    portal.className = "ca-preference-list-print-portal";
    const clone = source.cloneNode(true) as HTMLElement;
    clone.removeAttribute("id");
    portal.appendChild(clone);
    document.body.appendChild(portal);
    document.body.classList.add("ca-print-preference-list");

    const cleanup = () => {
      document.body.classList.remove("ca-print-preference-list");
      portal.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  const feeColleges = useMemo(
    () => unlocked?.feeCollegesByState[feeState] ?? [],
    [unlocked?.feeCollegesByState, feeState],
  );

  const listWarnings = useMemo(() => {
    const w: string[] = [];
    if (preferenceList.length > 0 && preferenceList.length < 5) {
      w.push("Add at least 5 colleges to reduce round risk.");
    }
    if (!preferenceList.some((p) => p.tag === "safe")) {
      w.push("No Safe colleges tagged — consider adding safer options.");
    }
    const top10 = preferenceList.slice(0, 10);
    const byState = new Map<string, number>();
    for (const p of top10) {
      byState.set(p.stateSlug, (byState.get(p.stateSlug) ?? 0) + 1);
    }
    for (const [, count] of byState) {
      if (count > 5) {
        w.push("More than 5 picks from one state in your top 10 — diversify.");
        break;
      }
    }
    return w;
  }, [preferenceList]);

  const faqItems = useMemo(
    () => CUTOFF_FAQ.map((item) => ({ q: item.question, a: item.answer })),
    [],
  );

  return (
    <RankPredictorShell className="ca-page">
      {step === "form" ? (
        <CutoffAnalyserHero>
          <div className="rp-form-stack flex flex-col gap-4">
            <Input
              label="NEET score"
              name="score"
              type="number"
              min={NEET_SCORE_MIN}
              max={NEET_SCORE_MAX}
              inputMode="numeric"
              placeholder="e.g. 580"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              hint={CUTOFF_ANALYSER_HERO.submitHint}
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Category"
                name="category"
                placeholder="Select category"
                options={CATEGORY_OPTIONS}
                value={category}
                onValueChange={(v) => v && setCategory(v as NeetCategory)}
                required
              />
              <Select
                label="Domicile state"
                name="domicile"
                placeholder="Select state"
                options={DOMICILE_OPTIONS}
                value={domicileState}
                onValueChange={(v) => v && setDomicileState(v as FocusStateSlug)}
                required
              />
            </div>
            <p className="rp-field-hint">
              Home state for counseling. Analysis still shows cutoffs for GJ, RJ, MP & MH.
            </p>
            <CollegePredictorQuotaField
              value={quota || "state"}
              onChange={(q) => setQuota(q)}
            />

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
              {pending ? "Analysing…" : CUTOFF_ANALYSER_HERO.submitLabel}
            </Button>
          </div>
        </CutoffAnalyserHero>
      ) : null}

      <CutoffAnalyserBanner />

      <Container size="page">
        {showResults ? (
          <ResultsPanel>
            <div id="result" className="ca-results-head">
              <CutoffAnalyserResultHeader referenceYear={teaser.referenceYear} />

              <div className="rp-rsum ca-input-summary mt-6">
                <AnalyserInputChip
                  score={teaser.input.score}
                  categoryLabel={getListingCategoryShortLabel(teaser.input.category)}
                  domicileLabel={`Domicile ${domicileLabel}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  leadingIcon={<FiRefreshCw aria-hidden="true" />}
                  onClick={handleReset}
                  className="ca-input-summary-reset rounded-[14px] border-[1.5px] px-5 py-2.5 text-[13.5px] font-bold"
                >
                  New analysis
                </Button>
              </div>

              {step !== "unlocked" ? (
                <div className="mt-8">
                  <CutoffAnalyserTeaserShowcase
                    score={teaser.input.score}
                    summary={teaser.summary}
                    referenceYear={teaser.referenceYear}
                    onUnlock={goVerify}
                  />
                  <ToolCallout variant="info" className="mt-6">
                    {teaser.disclaimer}
                  </ToolCallout>
                </div>
              ) : null}

              {step === "unlocked" && result && unlocked ? (
                <>
                  <div className="ca-metric-block mt-6">
                    <div className="rp-metric-grid">
                      <AnalyserMetricCard
                        label="Your chances"
                        value={`${result.admissionProbabilityPercent}%`}
                        context={result.probabilityLabel}
                        progress={result.admissionProbabilityPercent}
                      />
                      <AnalyserMetricCard
                        label="Estimated rank"
                        value={formatNumber(result.userRank)}
                        context={`Band ${formatNumber(result.rankRange.min)} – ${formatNumber(result.rankRange.max)}`}
                      />
                      <AnalyserMetricCard
                        label="Safe colleges"
                        value={String(result.safeCollegeCount)}
                        context="Per college-type filter below"
                      />
                      <AnalyserMetricCard
                        label="States eligible"
                        value={`${result.statesEligibleCount} / ${result.statesSelectedCount}`}
                        context={result.eligibleStateAbbrevs || "—"}
                      />
                    </div>
                  </div>

                  <div className="ca-page-stack mt-10">
                    <AnalyserSectionBlock
                      title="How you compare"
                      className="pt-2"
                      description={`Opening and closing ranks for Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra from our ${result.referenceYear} catalog (your category).`}
                      actions={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          leadingIcon={<FiDownload aria-hidden />}
                          onClick={exportCsv}
                          className="rounded-xl"
                        >
                          Export CSV
                        </Button>
                      }
                    >
                      <AnalyserSectionBody toolbar>
                        <div className="flex flex-wrap gap-2">
                          {(["all", ...QUOTA_OPTIONS.map((q) => q.value)] as const).map(
                            (q) => (
                              <FilterPill
                                key={q}
                                active={quotaTableFilter === q}
                                onClick={() => setQuotaTableFilter(q)}
                              >
                                {q === "all"
                                  ? "All quotas"
                                  : QUOTA_OPTIONS.find((o) => o.value === q)?.label}
                              </FilterPill>
                            ),
                          )}
                        </div>
                      </AnalyserSectionBody>
                      <AnalyserSectionBody flush>
                        <CutoffComparisonTable
                          rows={filteredRows}
                          sortKey={sortKey}
                          sortDir={sortDir}
                          onSort={toggleSort}
                        />
                      </AnalyserSectionBody>
                    </AnalyserSectionBlock>

                    <AnalyserSectionBlock
                      title="Which colleges can you get?"
                      description="Ranked by likelihood at your score. Filter by institution type — quota follows your selection above."
                      actions={
                        <div className="flex flex-wrap gap-2">
                          {(["government", "private", "all"] as const).map((t) => (
                            <FilterPill
                              key={t}
                              active={collegeTypeFilter === t}
                              onClick={() => setCollegeTypeFilter(t)}
                            >
                              {t === "all" ? "All types" : t}
                            </FilterPill>
                          ))}
                        </div>
                      }
                    >
                      <AnalyserSectionBody>
                        {collegeListPreview.length > 0 ? (
                          <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-6 xl:gap-8">
                            {collegeListPreview.map(({ match, college }) => {
                              const inList = preferenceList.some(
                                (p) => p.collegeSlug === college.slug,
                              );
                              return (
                                <div
                                  key={college.slug}
                                  className="flex h-full flex-col gap-3"
                                >
                                  <div className="min-h-0 flex-1">
                                    <CollegeCard
                                      college={college}
                                      rankCategoryShort={rankCategoryShort}
                                      feeQuotaShort={feeQuotaShort}
                                      layout="grid"
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    variant={inList ? "secondary" : "primary"}
                                    size="sm"
                                    className="relative z-20 w-full rounded-xl sm:ml-auto sm:w-auto"
                                    disabled={inList}
                                    onClick={() => addToPreference(match)}
                                  >
                                    {inList ? "In your list" : "Add to list"}
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <ToolCallout variant="info">
                            No colleges in our catalog matched your score, category, and quota
                            for these states. Try another quota (for example State 85%) or browse{" "}
                            <Link href="/colleges" className="font-bold text-primary hover:underline">
                              all colleges
                            </Link>
                            .
                          </ToolCallout>
                        )}
                      </AnalyserSectionBody>
                    </AnalyserSectionBlock>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
                      <AnalyserSectionBlock
                        id="college-list"
                        className="ca-preference-list-print-root min-w-0"
                        title="Build your preference order"
                        description="Drag to reorder on desktop. Tag Safe, Target, or Reach, then export or save locally."
                      >
                        <AnalyserSectionBody className="space-y-4">
                          <p className="rp-field-hint italic">
                            MCC limits AIQ choices to 20 colleges. State counseling may differ.
                          </p>
                          {listWarnings.map((w) => (
                            <ToolCallout key={w} variant="safe">
                              {w}
                            </ToolCallout>
                          ))}
                          <ul className="space-y-2">
                            {preferenceList.map((item, index) => {
                              const gap = gapDisplay(item.gapToUser);
                              return (
                                <li
                                  key={item.id}
                                  draggable
                                  onDragStart={(e) => onDragStart(e, item.id)}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => onDrop(e, item.id)}
                                  className="rp-pref-row"
                                >
                                  <div className="flex items-center gap-2 ca-pref-no-print">
                                    <FiMenu
                                      className="hidden h-4 w-4 text-outline sm:block"
                                      aria-hidden
                                    />
                                    <span className="rp-pref-rank">{index + 1}</span>
                                  </div>
                                  <div className="ca-pref-print-only rp-pref-rank">{index + 1}</div>
                                  <div className="min-w-0 flex-1">
                                    <Link
                                      href={`/colleges/${item.collegeSlug}`}
                                      className="font-semibold text-on-surface hover:text-primary"
                                    >
                                      {item.name}
                                    </Link>
                                    <p className="text-xs text-on-surface-variant">
                                      {item.city}, {item.affiliation}
                                    </p>
                                    <p className={cn("text-xs", gap.className)}>
                                      Closing {formatNumber(item.closingRank)} · {gap.text}
                                    </p>
                                  </div>
                                  <select
                                    value={item.tag}
                                    onChange={(e) =>
                                      setPreferenceList((prev) =>
                                        prev.map((p) =>
                                          p.id === item.id
                                            ? {
                                              ...p,
                                              tag: e.target.value as PreferenceListItem["tag"],
                                            }
                                            : p,
                                        ),
                                      )
                                    }
                                    className="ca-pref-no-print rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs font-semibold"
                                    aria-label={`Tag for ${item.name}`}
                                  >
                                    <option value="safe">Safe</option>
                                    <option value="target">Target</option>
                                    <option value="reach">Reach</option>
                                  </select>
                                  <span className="ca-pref-print-only">{item.tag}</span>
                                  <button
                                    type="button"
                                    className="ca-pref-no-print rounded-lg p-2 text-outline transition hover:bg-error-container hover:text-error"
                                    aria-label={`Remove ${item.name}`}
                                    onClick={() =>
                                      setPreferenceList((prev) =>
                                        prev.filter((p) => p.id !== item.id),
                                      )
                                    }
                                  >
                                    <FiX />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                          <div className="ca-pref-no-print flex flex-wrap gap-2 pt-2">
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="rounded-xl"
                              onClick={printPreferenceList}
                            >
                              Export / Print
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="rounded-xl"
                              onClick={() => {
                                const blob = new Blob(
                                  [JSON.stringify(preferenceList, null, 2)],
                                  { type: "application/json" },
                                );
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "college-preferences.json";
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                            >
                              Save JSON
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="rounded-xl"
                              onClick={() => setPreferenceList([])}
                            >
                              Clear list
                            </Button>
                          </div>
                        </AnalyserSectionBody>
                      </AnalyserSectionBlock>

                      <CutoffAnalyserLeadMagnet
                        className="ca-lead-band min-w-0 lg:sticky lg:top-24"
                        content={CUTOFF_ANALYSER_LEAD_MAGNET_CHOICE}
                        formType={LEAD_FORM_TYPES.freeCounsellingCollegePreferenceList}
                        consentFieldId="lead-cutoff-preference-list-consent"
                      />
                    </div>

                    <AnalyserSectionBlock
                      title="Your options at a glance"
                      description="Chances in Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra at your estimated rank. Compare the map with the state cards."
                    >
                      <AnalyserSectionBody flush className="p-0">
                        <EligibilityGlancePanel
                          eligibility={result.stateEligibility}
                          mutedStateSlugs={mutedStateSlugs}
                          glanceContext={eligibilityGlanceContext}
                        />
                      </AnalyserSectionBody>
                    </AnalyserSectionBlock>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
                      <AnalyserSectionBlock
                        className="min-w-0 order-2 lg:order-1"
                        title="Don't miss your round"
                        description="Key counseling milestones for your focus states and MCC AIQ—dates update as portals publish notices."
                      >
                        <AnalyserSectionBody flush className="p-0">
                          <CounselingTimelinePanel
                            events={counselingTimeline}
                            sessionYear={COUNSELING_SESSION_YEAR}
                            disclaimer={COUNSELING_TIMELINE_DISCLAIMER}
                          />
                        </AnalyserSectionBody>
                      </AnalyserSectionBlock>

                      <CutoffAnalyserLeadMagnet
                        className="ca-lead-band order-1 min-w-0 lg:order-2 lg:sticky lg:top-24"
                        content={CUTOFF_ANALYSER_LEAD_MAGNET_ROUNDS}
                        formType={LEAD_FORM_TYPES.neetUgLiveUpdates}
                        redirectToWhatsApp={false}
                        consentFieldId="lead-cutoff-rounds-alert-consent"
                      />
                    </div>

                    <AnalyserSectionBlock
                      title="Understand the cost"
                      description="Annual fees from our catalog for each focus state."
                    >
                      <AnalyserSectionBody toolbar>
                        <div className="flex flex-wrap gap-2">
                          {FOCUS_STATE_OPTIONS.map((s) => (
                            <FilterPill
                              key={s.slug}
                              active={feeState === s.slug}
                              onClick={() => setFeeState(s.slug)}
                            >
                              {s.label}
                            </FilterPill>
                          ))}
                        </div>
                      </AnalyserSectionBody>
                      <AnalyserSectionBody flush>
                        <div className="quota-table-wrap">
                          <table className="quota-table">
                            <thead>
                              <tr>
                                <th className="p-3">College</th>
                                <th className="p-3">Type</th>
                                <th className="p-3 text-right">Annual fee</th>
                                <th className="p-3 text-right">Seats</th>
                              </tr>
                            </thead>
                            <tbody>
                              {feeColleges.length === 0 ? (
                                <tr>
                                  <td colSpan={4} className="p-4 text-sm text-on-surface-variant">
                                    No fee rows for this state in our catalog yet.
                                  </td>
                                </tr>
                              ) : (
                                feeColleges.map((c) => (
                                  <tr
                                    key={c.slug}
                                    className="border-b border-outline-variant hover:bg-surface-container-low/80"
                                  >
                                    <td className="p-3">
                                      <Link
                                        href={`/colleges/${c.slug}`}
                                        className="font-semibold text-primary hover:underline"
                                      >
                                        {c.name}
                                      </Link>
                                    </td>
                                    <td className="p-3 capitalize text-on-surface-variant">
                                      {c.collegeType}
                                    </td>
                                    <td className="p-3 text-right tabular-nums font-semibold text-on-surface">
                                      {formatINR(c.totalAnnualFee)}
                                    </td>
                                    <td className="p-3 text-right tabular-nums">{c.seatCount}</td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </AnalyserSectionBody>
                    </AnalyserSectionBlock>

                    <ToolCallout variant="info" className="mt-4">
                      {unlocked.disclaimer}
                    </ToolCallout>
                  </div>
                </>
              ) : null}
            </div>
          </ResultsPanel>
        ) : null}

        <RankPredictorFaqSection items={faqItems} />
        <section className="py-12 md:py-16">
          <span className="rp-eyebrow">Reference</span>
          <h2 className="rp-section-title">Glossary of terms</h2>
          <div className="mt-10">
            <GlossaryGrid terms={GLOSSARY} />
          </div>
          <div className="mt-8">
            <Button
              as="link"
              href="/neet-ug-2026/terms-explained"
              variant="outline"
              size="md"
              className="rounded-xl"
            >
              Explore counselling terms in detail
            </Button>
          </div>
        </section>

        <p className="pb-8 text-center text-xs leading-relaxed text-outline">
          {ANALYSER_DISCLAIMER}
        </p>

        <DataSourceNotice />
      </Container>

      <VerifyModal
        open={step === "verify"}
        onClose={() => {
          if (!pending) setStep("teaser");
        }}
      >
        <VerifyPanel
          title={CUTOFF_ANALYSER_VERIFY_PANEL.title}
          description={CUTOFF_ANALYSER_VERIFY_PANEL.description}
          bullets={[...CUTOFF_ANALYSER_VERIFY_PANEL.bullets]}
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
                  id="cutoff-analyser-consent"
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
                    onClick={handleUnlockAnalysis}
                    className="flex-1 rounded-xl"
                    size="lg"
                  >
                    {pending ? "Unlocking…" : "Unlock full analysis"}
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

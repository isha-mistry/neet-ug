"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import type { NeetUgLeadMagnetContent } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import type { LeadFormType } from "@/lib/leads/types";
import { Button } from "@/components/ui/Button";
import {
  ToolFilterPill,
  ToolGlossaryGrid,
  ToolInputChip,
  ToolMetricCard,
  ToolResultBanner,
} from "@/components/features/predictors/PredictorToolParts";
import {
  FormPanel,
  RankPredictorFaq,
  RankPredictorLockedCTA,
  RankPredictorShell,
  ResultsPanel,
  RpMarketingHero,
  VerifyModal,
  VerifyPanel,
} from "@/components/features/rank-predictor/RankPredictorParts";
import { CUTOFF_ANALYSER_HERO, CUTOFF_ANALYSER_STRIP } from "@/lib/cutoff-analyser/page-content";
import { cn, formatINR, formatNumber } from "@/lib/utils";
import type { CutoffStatus, CutoffAnalyserSummary } from "@/lib/cutoff-analyser/types";
import type { AnalyserCollege } from "@/lib/cutoff-analyser/types";
import { FOCUS_STATE_OPTIONS } from "@/lib/cutoff-analyser/constants";
import { STATUS_LABEL, STATUS_BADGE_CLASS } from "./section-styles";

export {
  FormPanel,
  RankPredictorFaq,
  RankPredictorFaqSection,
  RankPredictorShell,
  ResultsPanel,
  VerifyModal,
  VerifyPanel,
} from "@/components/features/rank-predictor/RankPredictorParts";
export { CollegePredictorBanner } from "@/components/features/rank-predictor/RankPredictorParts";
export { ToolQuotaField as CollegePredictorQuotaField } from "@/components/features/predictors/PredictorToolParts";
export {
  ToolSectionBlock as AnalyserSectionBlock,
  ToolSectionBody as AnalyserSectionBody,
  ToolFilterPill as FilterPill,
  ToolMetricCard as AnalyserMetricCard,
  ToolGlossaryGrid as GlossaryGrid,
} from "@/components/features/predictors/PredictorToolParts";

const ANALYSER_DISCLAIMER_SHORT =
  "Indicative estimates from score–rank bands and catalog cutoffs. Not official MCC/NTA allotment.";

export function CutoffAnalyserHero({ children }: { children?: ReactNode }) {
  return (
    <RpMarketingHero
      id="analyse"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Predictors", href: "/rank-predictor" },
        { label: "Cutoff Analyser" },
      ]}
      title="See where your NEET score "
      titleEmphasis="stands across key states."
      lede="Compare state and quota cutoffs for Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra. See a summary first, then unlock tables, college matches, and a preference list after verification."
      trio={[
        { key: "Step 1", value: "Score summary" },
        { key: "Focus", value: "GJ · RJ · MP · MH" },
        { key: "Step 3", value: "Full analysis" },
      ]}
      fine={ANALYSER_DISCLAIMER_SHORT}
    >
      <FormPanel
        title={CUTOFF_ANALYSER_HERO.formTitle}
        subtitle={CUTOFF_ANALYSER_HERO.formSubtitle}
      >
        {children}
      </FormPanel>
    </RpMarketingHero>
  );
}

export function CutoffAnalyserBanner() {
  const c = CUTOFF_ANALYSER_STRIP;
  return (
    <div className="rp-strip rp-bleed">
      <div className="rp-strip-in ms-layout-page">
        <p>
          <b>{c.bold}</b> {c.text}
        </p>
        <Link
          href="/college-predictor"
          className="inline-flex shrink-0 items-center justify-center rounded-[14px] border-[1.5px] border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-[13.5px] font-bold text-primary transition hover:border-primary hover:bg-primary-fixed"
        >
          {c.cta}
        </Link>
      </div>
    </div>
  );
}

export function CutoffAnalyserLeadMagnet({
  content,
  className,
  formType,
  consentFieldId,
  redirectToWhatsApp,
}: {
  content: NeetUgLeadMagnetContent;
  className?: string;
  formType?: LeadFormType;
  consentFieldId?: string;
  redirectToWhatsApp?: boolean;
}) {
  return (
    <div className={className}>
      <NeetUgLeadMagnetPanel
        pageLabel="Cutoff Analyser"
        content={content}
        formType={formType}
        consentFieldId={consentFieldId}
        redirectToWhatsApp={redirectToWhatsApp}
      />
    </div>
  );
}

export function CutoffAnalyserResultHeader({
  referenceYear,
}: {
  referenceYear: number;
}) {
  return (
    <div className="ca-result-banner">
      <ToolResultBanner
        flag="Analysis ready"
        title="Your cutoff "
        titleEmphasis="snapshot"
        description={`Rank estimate and college matches use ${referenceYear} closing ranks in our catalog where available. Lower AIR is better.`}
      />
    </div>
  );
}

export function CutoffAnalyserTeaserShowcase({
  score,
  summary,
  referenceYear,
  onUnlock,
}: {
  score: number;
  summary: CutoffAnalyserSummary;
  referenceYear: number;
  onUnlock: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <section className="rp-teaser-grid">
        <div className="rp-teaser-panel">
          <span className="rp-result-flag">Locked preview</span>
          <h2 className="rp-tool-section-title mt-4">
            {summary.collegeMatchCount > 0
              ? `${formatNumber(summary.collegeMatchCount)} colleges with ${referenceYear} cutoffs`
              : "No catalog cutoffs matched yet"}
          </h2>
          <p className="rp-tool-section-lede mt-2">
            Based on NEET score{" "}
            <span className="font-bold text-on-surface">{score}</span> (est. AIR{" "}
            {formatNumber(summary.userRank)}, band {formatNumber(summary.rankRange.min)}–
            {formatNumber(summary.rankRange.max)}) for your category and quota. Tables and
            college names stay hidden until verification.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-outline">
                Your chances
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-on-surface">
                {summary.admissionProbabilityPercent}%
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">{summary.probabilityLabel}</p>
            </div>
            <div className="rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-outline">
                Safe colleges
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-on-surface">
                {summary.safeCollegeCount}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">Government filter</p>
            </div>
            <div className="rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-outline">
                States eligible
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-on-surface">
                {summary.statesEligibleCount}/{summary.statesSelectedCount}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">
                {summary.eligibleStateAbbrevs || "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-outline">
                Quota rows
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-on-surface">
                {summary.comparisonRowCount}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">GJ · RJ · MP · MH</p>
            </div>
          </div>
          <p className="rp-callout rp-callout-info mt-5">
            Unlock to compare opening/closing ranks, build a preference list, and export your
            shortlist.
          </p>
        </div>

        <div className="rp-teaser-unlock flex flex-col">
          <span className="rp-result-flag bg-primary text-on-primary">Full analysis locked</span>
          <h2 className="rp-tool-section-title mt-4 text-primary">
            Unlock state cutoffs and college matches
          </h2>
          <p className="rp-tool-section-lede mt-2">
            Verification turns the summary into tables, cards, choice-list tools, and counseling
            timelines tailored to your score.
          </p>
          <ul className="rp-lfeats mt-4">
            <li>
              State & quota comparison
              <small>Opening, closing, gap, and status</small>
            </li>
            <li>
              College match cards
              <small>Likelihood and Safe / Target / Reach tags</small>
            </li>
            <li>
              Preference list & export
              <small>CSV, print, and JSON save</small>
            </li>
          </ul>
          <div className="mt-auto pt-5">
            <RankPredictorLockedCTA onUnlock={onUnlock} />
          </div>
        </div>
      </section>
    </div>
  );
}

export function AnalyserInputChip({
  score,
  categoryLabel,
  domicileLabel,
  compareLabel = "Comparing GJ, RJ, MP, MH",
}: {
  score: number;
  categoryLabel: string;
  domicileLabel: string;
  compareLabel?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
      <ToolInputChip>
        <span className="rp-rpill-score">{score}</span>
        <span className="text-on-surface-variant">/ 720</span>
      </ToolInputChip>
      <span className="rp-rpill shrink-0">{categoryLabel}</span>
      <span className="rp-rpill max-w-full text-left text-[13px] leading-snug sm:text-sm">
        {domicileLabel}
      </span>
      <span className="rp-rpill max-w-full text-left text-[13px] leading-snug sm:text-sm">
        {compareLabel}
      </span>
    </div>
  );
}

export function CutoffStatusBadge({ status }: { status: CutoffStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        STATUS_BADGE_CLASS[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export function gapDisplay(gap: number): { text: string; className: string } {
  if (gap >= 2000) {
    return {
      text: `+${formatNumber(gap)} ranks better`,
      className: "text-college-type-government-fg",
    };
  }
  if (gap >= 0) {
    return {
      text: `+${formatNumber(gap)} ranks better`,
      className: "text-on-tertiary-fixed-variant",
    };
  }
  return {
    text: `${formatNumber(Math.abs(gap))} ranks below cutoff`,
    className: "text-error",
  };
}

export function CutoffAnalyserCollegeCard({
  college,
  closingRank,
  gapToUser,
  likelihoodPercent,
  status,
  selected,
  onAdd,
}: {
  college: AnalyserCollege;
  closingRank: number;
  gapToUser: number;
  likelihoodPercent: number;
  status: CutoffStatus;
  selected: boolean;
  onAdd: () => void;
}) {
  const gap = gapDisplay(gapToUser);
  const stateAbbrev =
    FOCUS_STATE_OPTIONS.find((s) => s.slug === college.stateSlug)?.abbrev ??
    college.stateSlug;

  return (
    <article className="rp-tool-card group">
      <div className="rp-tool-card-body">
        <div className="flex flex-wrap items-center gap-2">
          <CollegeTypeBadge type={college.collegeType} />
          <span className="rp-match-chip">{likelihoodPercent}% likely</span>
          {selected ? (
            <span className="ml-auto text-xs font-bold text-primary">In list</span>
          ) : null}
        </div>
        <div>
          <h3 className="text-lg font-extrabold leading-snug tracking-tight text-on-surface group-hover:text-primary">
            {college.name}
          </h3>
          <p className="mt-1.5 text-sm text-on-surface-variant">
            {college.city}, {stateAbbrev}
          </p>
        </div>
        <div className="rp-metric-bar">
          <span
            className={cn(
              status === "safe"
                ? "bg-tertiary"
                : status === "borderline"
                  ? "bg-amber-500"
                  : "bg-error",
            )}
            style={{ width: `${likelihoodPercent}%`, backgroundImage: "none" }}
          />
        </div>
        <dl className="grid grid-cols-2 gap-4 rounded-xl bg-surface-container-low p-3.5 text-sm">
          <div>
            <dt className="rp-metric-k">Closing rank</dt>
            <dd className="mt-1 font-semibold tabular-nums text-on-surface">
              AIR {formatNumber(closingRank)}
            </dd>
            <dd className={cn("mt-0.5 text-xs", gap.className)}>{gap.text}</dd>
          </div>
          <div>
            <dt className="rp-metric-k">Annual fee</dt>
            <dd className="mt-1 font-semibold text-on-surface">
              {formatINR(college.totalAnnualFee, { compact: true })}
            </dd>
            <dd className="text-xs text-on-surface-variant">{college.seatCount} seats</dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {college.slug.startsWith("demo-") ? (
            <Button type="button" variant="outline" size="sm" disabled className="rounded-xl">
              Sample college
            </Button>
          ) : (
            <Button
              as="link"
              href={`/colleges/${college.slug}`}
              variant="outline"
              size="sm"
              className="rounded-xl border-[1.5px]"
            >
              View college
            </Button>
          )}
          <Button
            type="button"
            variant={selected ? "secondary" : "primary"}
            size="sm"
            onClick={onAdd}
            className="rounded-xl"
          >
            {selected ? "In your list" : "Add to list"}
          </Button>
        </div>
      </div>
    </article>
  );
}

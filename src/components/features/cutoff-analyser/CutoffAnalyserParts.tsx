"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import type { NeetUgLeadMagnetContent } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
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
  RankPredictorShell,
  ResultsPanel,
  RpMarketingHero,
} from "@/components/features/rank-predictor/RankPredictorParts";
import { CUTOFF_ANALYSER_HERO, CUTOFF_ANALYSER_STRIP } from "@/lib/cutoff-analyser/page-content";
import { cn, formatINR, formatNumber } from "@/lib/utils";
import type { CutoffStatus } from "@/lib/cutoff-analyser/types";
import type { AnalyserCollege } from "@/lib/cutoff-analyser/types";
import { FOCUS_STATE_OPTIONS } from "@/lib/cutoff-analyser/constants";
import { STATUS_LABEL, STATUS_BADGE_CLASS } from "./section-styles";

export {
  FormPanel,
  RankPredictorFaq,
  RankPredictorFaqSection,
  RankPredictorShell,
  ResultsPanel,
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
      lede="Compare state and quota cutoffs for Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra. Build a preference list and track counseling dates — updated live as you change your score."
      trio={[
        { key: "Live", value: "Instant recalc" },
        { key: "Focus", value: "GJ · RJ · MP · MH" },
        { key: "Plan", value: "Choice list" },
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
      <div className="rp-strip-in ms-layout-page px-5!">
        <p>
          <b>{c.bold}</b> {c.text}
        </p>
        <Link
          href="/college-predictor"
          className="inline-flex shrink-0 items-center justify-center rounded-xl border-[1.5px] border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-[13.5px] font-bold text-primary transition hover:border-primary hover:bg-primary-fixed"
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
}: {
  content: NeetUgLeadMagnetContent;
  className?: string;
}) {
  return (
    <div className={className}>
      <NeetUgLeadMagnetPanel pageLabel="Cutoff Analyser" content={content} />
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

export function AnalyserInputChip({
  score,
  categoryLabel,
  statesLabel,
}: {
  score: number;
  categoryLabel: string;
  statesLabel: string;
}) {
  return (
    <ToolInputChip>
      <span className="rp-rpill-score">{score}</span>
      <span className="text-on-surface-variant">/ 720</span>
      <i className="rp-rpill-sep">·</i>
      <span>{categoryLabel}</span>
      <i className="rp-rpill-sep">·</i>
      <span>{statesLabel}</span>
    </ToolInputChip>
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

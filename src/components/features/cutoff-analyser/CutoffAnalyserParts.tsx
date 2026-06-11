"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { Button } from "@/components/ui/Button";
import { cn, formatINR, formatNumber } from "@/lib/utils";
import type { CutoffStatus } from "@/lib/cutoff-analyser/types";
import type { AnalyserCollege } from "@/lib/cutoff-analyser/types";
import { FOCUS_STATE_OPTIONS } from "@/lib/cutoff-analyser/constants";
import { STATUS_LABEL, STATUS_ROW_CLASS, STATUS_BADGE_CLASS } from "./section-styles";

export {
  FormPanel,
  RankPredictorFaq,
  RankPredictorShell,
  ResultsPanel,
  CollegePredictorBanner,
} from "@/components/features/rank-predictor/RankPredictorParts";
export { CollegePredictorQuotaField } from "@/components/features/college-predictor/CollegePredictorParts";

export function CutoffAnalyserHero({ children }: { children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-[0_30px_80px_-48px_rgba(0,61,155,0.55)] md:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-secondary-container/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-primary-fixed/60 blur-3xl"
      />
      <div className="relative grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="px-2 py-6 text-center md:px-6 lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-label-sm font-label-sm text-on-primary-fixed">
            <span className="material-symbols-outlined text-base">query_stats</span>
            Score → cutoff analyser
          </div>
          <h1 className="mx-auto max-w-3xl font-headline-xl text-[2.35rem] font-bold leading-[1.05] tracking-tight text-primary md:text-5xl lg:mx-0">
            See where your NEET score stands across key states
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-body-md text-body-md text-on-surface-variant md:text-body-lg lg:mx-0">
            Compare state and quota cutoffs for Gujarat, Rajasthan, Madhya Pradesh,
            and Maharashtra. Build a preference list and track counseling dates —
            updated live as you change your score.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <HeroProofPill icon="speed" label="Live" value="Instant recalc" />
            <HeroProofPill icon="map" label="Focus" value="GJ · RJ · MP · MH" />
            <HeroProofPill icon="checklist" label="Plan" value="Choice list" />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-on-surface-variant">
            {ANALYSER_DISCLAIMER_SHORT}
          </p>
        </div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

const ANALYSER_DISCLAIMER_SHORT =
  "Indicative estimates from score–rank bands and catalog cutoffs. Not official MCC/NTA allotment.";

function HeroProofPill({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest/75 p-3 text-left shadow-sm backdrop-blur">
      <span className="material-symbols-outlined mb-2 inline-flex rounded-xl bg-primary-fixed p-2 text-lg text-primary">
        {icon}
      </span>
      <p className="text-[11px] font-bold uppercase tracking-wider text-outline">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-on-surface">{value}</p>
    </div>
  );
}

export function CutoffAnalyserResultHeader({
  referenceYear,
}: {
  referenceYear: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-outline-variant/40 bg-linear-to-r from-surface-container-lowest via-surface-container-low to-primary-fixed/35 p-6 shadow-sm md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <span className="material-symbols-outlined text-sm">insights</span>
          Analysis ready
        </span>
        <h2 className="mt-3 font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
          Your cutoff snapshot
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
          Rank estimate and college matches use {referenceYear} closing ranks in
          our catalog where available. Lower AIR is better.
        </p>
      </div>
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
    <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-2 text-sm">
      <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
        <span className="material-symbols-outlined text-lg">school</span>
        {score}
        <span className="font-normal text-on-surface-variant">/ 720</span>
      </span>
      <span className="hidden h-4 w-px bg-outline-variant sm:block" aria-hidden />
      <span className="text-on-surface-variant">{categoryLabel}</span>
      <span className="text-on-surface-variant">·</span>
      <span className="text-on-surface-variant">{statesLabel}</span>
    </div>
  );
}

export function AnalyserSectionBlock({
  title,
  description,
  actions,
  children,
  className,
  id,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm text-on-surface-variant md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm">
        {children}
      </div>
    </section>
  );
}

export function AnalyserSectionBody({
  children,
  className,
  flush,
}: {
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <div className={cn(!flush && "p-4 md:p-6", className)}>{children}</div>
  );
}

export function CutoffStatusBadge({ status }: { status: CutoffStatus }) {
  const icon =
    status === "safe"
      ? "check_circle"
      : status === "borderline"
        ? "error"
        : "cancel";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        STATUS_BADGE_CLASS[status]
      )}
    >
      <span className="material-symbols-outlined text-sm" aria-hidden>
        {icon}
      </span>
      {STATUS_LABEL[status]}
    </span>
  );
}

export function AnalyserMetricCard({
  label,
  value,
  context,
  progress,
}: {
  label: string;
  value: string;
  context: string;
  progress?: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 blur-2xl"
      />
      <p className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant">
        {label}
      </p>
      <p className="mt-2 font-headline-md text-2xl font-bold tabular-nums tracking-tight text-primary md:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-on-surface-variant md:text-sm">
        {context}
      </p>
      {progress != null ? (
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-surface-container-high"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-primary to-primary-container"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
    </div>
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

export function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-on-primary"
          : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary/40 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <div
        className={cn(
          "h-1",
          status === "safe"
            ? "bg-linear-to-r from-primary to-primary-container"
            : status === "borderline"
              ? "bg-linear-to-r from-tertiary-container to-tertiary-fixed"
              : "bg-linear-to-r from-error/80 to-error-container"
        )}
      />
      <div className="relative flex flex-1 flex-col gap-4 p-5 md:p-6">
        {selected ? (
          <span className="absolute right-4 top-4 material-symbols-outlined text-primary">
            bookmark_added
          </span>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <CollegeTypeBadge type={college.collegeType} />
          <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-xs font-semibold text-on-surface-variant">
            {likelihoodPercent}% likely
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-snug text-on-surface group-hover:text-primary">
            {college.name}
          </h3>
          <p className="mt-1.5 inline-flex items-center gap-1 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-base">location_on</span>
            {college.city}, {stateAbbrev}
          </p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-container-high">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              status === "safe"
                ? "bg-primary"
                : status === "borderline"
                  ? "bg-tertiary-container"
                  : "bg-error/70"
            )}
            style={{ width: `${likelihoodPercent}%` }}
          />
        </div>
        <dl className="grid grid-cols-2 gap-4 rounded-xl bg-surface-container-low p-3.5 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-outline">
              Closing rank
            </dt>
            <dd className="mt-1 font-semibold text-on-surface">
              AIR {formatNumber(closingRank)}
            </dd>
            <dd className={cn("mt-0.5 text-xs", gap.className)}>{gap.text}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-outline">
              Annual fee
            </dt>
            <dd className="mt-1 font-semibold text-on-surface">
              {formatINR(college.totalAnnualFee, { compact: true })}
            </dd>
            <dd className="text-xs text-on-surface-variant">
              {college.seatCount} seats
            </dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {college.slug.startsWith("demo-") ? (
            <Button type="button" variant="outline" size="sm" disabled>
              Sample college
            </Button>
          ) : (
            <Button as="link" href={`/colleges/${college.slug}`} variant="outline" size="sm">
              View college
            </Button>
          )}
          <Button type="button" variant={selected ? "secondary" : "primary"} size="sm" onClick={onAdd}>
            {selected ? "In your list" : "Add to list"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function GlossaryGrid({
  terms,
}: {
  terms: { term: string; definition: string }[];
}) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {terms.map((g) => (
        <div
          key={g.term}
          className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-4"
        >
          <dt className="font-semibold text-on-surface">{g.term}</dt>
          <dd className="mt-1 text-sm text-on-surface-variant">{g.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

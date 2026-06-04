"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { CollegeResultsGrid } from "@/components/features/colleges/listing/CollegeResultsGrid";
import { formatNumber, cn } from "@/lib/utils";
import type { CollegeSummary } from "@/types/listing";
import {
  RankPredictorFaq,
  RankPredictorShell,
  ResultsPanel,
} from "@/components/features/rank-predictor/RankPredictorParts";
import type { CollegePredictorBucketCounts } from "@/lib/college-predictor/types";
import type { ListingQuota } from "@/types/filters";
import { LISTING_QUOTA_OPTIONS } from "@/lib/colleges/listing-options";
import { REFERENCE_CUTOFF_YEAR } from "@/lib/college-predictor/constants";
import generatedManifest from "@/data/generated/manifest.json";

type BucketKey = "likely" | "possible" | "reach";

type BucketTabCopy = {
  key: BucketKey;
  tabLabel: string;
  heading: string;
  subline: (referenceYear: number) => string;
};

const BUCKET_TAB_COPY: BucketTabCopy[] = [
  {
    key: "likely",
    tabLabel: "Likely",
    heading: "High probability matches",
    subline: (year) =>
      `Based on ${year} cutoff trends, these colleges are highly accessible at your current rank.`,
  },
  {
    key: "possible",
    tabLabel: "Possible",
    heading: "Competitive options within reach",
    subline: (year) =>
      `Using ${year} closing ranks, your AIR sits modestly above the cutoff. Admission is tougher than Likely, but still worth shortlisting.`,
  },
  {
    key: "reach",
    tabLabel: "Reach",
    heading: "Ambitious targets to track",
    subline: (year) =>
      `These colleges fall in a wider band above ${year} cutoffs. Outcomes are less certain; follow later rounds and category movement.`,
  },
];

export { RankPredictorShell, ResultsPanel };
export { VerifyModal } from "@/components/features/rank-predictor/RankPredictorParts";

export function CollegePredictorHero({ children }: { children?: ReactNode }) {
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
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-label-sm font-label-sm text-primary">
            <span className="material-symbols-outlined text-base">school</span>
            Official AIR - matched colleges
          </div>
          <h1 className="mx-auto max-w-3xl font-headline-xl text-[2.35rem] font-bold leading-[1.05] tracking-tight text-primary md:text-5xl lg:mx-0">
            Find colleges matched to your NEET rank
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-body-md text-body-md text-on-surface-variant md:text-body-lg lg:mx-0">
            Enter your official AIR to get a private chance summary. Verify once
            to unlock the full Likely, Possible, and Reach college lists with
            closing ranks and fees.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <HeroProofPill icon="lock" label="Preview" value="Counts only" />
            <HeroProofPill icon="lock_open" label="Unlock" value="Full lists" />
            <HeroProofPill icon="payments" label="Compare" value="Fees + ranks" />
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-xs leading-relaxed text-on-surface-variant lg:mx-0">
            College names stay locked until verification. Indicative only, based
            on available closing-rank data.{" "}
            No official rank yet?{" "}
            <Link href="/rank-predictor" className="font-semibold text-primary hover:underline">
              Estimate rank from your score
            </Link>
            .
          </p>
        </div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

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

export function CollegePredictorQuotaField({
  value,
  onChange,
}: {
  value: ListingQuota | "";
  onChange: (q: ListingQuota) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant">
        Counseling quota
      </legend>
      <p className="mb-3 text-xs leading-relaxed text-on-surface-variant">
        Choose the counseling route you want to evaluate. State quota works best
        where state cutoff rows are available.
      </p>
      <div className="flex flex-wrap gap-2">
        {LISTING_QUOTA_OPTIONS.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                active
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary/40 hover:text-primary"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CollegePredictorResultHeader({
  referenceYear = REFERENCE_CUTOFF_YEAR,
}: {
  referenceYear?: number;
}) {
  const institutionCount = generatedManifest.collegeCount;
  const institutionLabel =
    institutionCount >= 100
      ? `${Math.floor(institutionCount / 100) * 100}+`
      : String(institutionCount);

  return (
    <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-6 py-7 shadow-sm md:px-8 md:py-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-college-type-government-bg px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-college-type-government-fg">
        <span className="material-symbols-outlined text-base">verified</span>
        Chance summary ready
      </span>
      <h1 className="mt-4 font-headline-xl text-[1.75rem] font-bold leading-tight tracking-tight text-primary md:text-4xl">
        Your matched-college summary
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-on-surface-variant md:text-base">
        Review your personalized match results based on your rank, category, and
        domicile. Our {referenceYear} analytical engine has processed{" "}
        {institutionLabel} institutions for your profile.
      </p>
    </div>
  );
}

export function CollegePredictorTeaserShowcase({
  air,
  counts,
  referenceYear,
  onUnlock,
}: {
  air: number;
  counts: CollegePredictorBucketCounts;
  referenceYear: number;
  onUnlock: () => void;
}) {
  const total = counts.likely + counts.possible + counts.reach;

  return (
    <div className="flex flex-col gap-4">
      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-sm md:p-7">
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-low px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary">visibility</span>
            Locked preview
          </span>
          <h2 className="mt-4 font-headline-md text-headline-md text-on-surface">
            {total > 0
              ? `${formatNumber(total)} colleges found in your bands`
              : "No matched colleges yet"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            Based on{" "}
            <span className="font-semibold text-on-surface">AIR {formatNumber(air)}</span>{" "}
            and {referenceYear} cutoff data where available. We keep college names
            hidden until verification.
          </p>
          {counts.withCutoffData === 0 ? (
            <p className="mt-4 rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
              We do not have cutoff data for this quota yet. Try State quota for
              Gujarat colleges, or browse the{" "}
              <Link href="/colleges" className="font-semibold text-primary hover:underline">
                full catalog
              </Link>
              .
            </p>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <BucketTile label="Likely" count={counts.likely} tone="success" />
              <BucketTile label="Possible" count={counts.possible} tone="brand" />
              <BucketTile label="Reach" count={counts.reach} tone="muted" />
            </div>
          )}
          <p className="mt-5 rounded-xl bg-primary-fixed/30 px-4 py-3 text-sm font-medium text-on-surface-variant">
            {total > 0
              ? "This is the teaser. Unlock to see names, fees, closing ranks, and shortlist links."
              : "Adjust quota or category to see matches."}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-surface-container-lowest via-primary-fixed/45 to-surface-container-low p-6 shadow-[0_18px_48px_-26px_rgba(0,61,155,0.45)] md:p-7">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative flex h-full flex-col">
            <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary">
              <span className="material-symbols-outlined text-sm">lock</span>
              Full college list locked
            </span>
            <h2 className="font-headline-md text-headline-md text-primary">
              Unlock the names behind your match count
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Verification turns the summary into an actionable shortlist across
              Likely, Possible, and Reach colleges.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-on-surface">
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                College names grouped by chance
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                Closing rank and quota-aware fees
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                Compare and shortlist next steps
              </span>
            </div>
            <div className="mt-auto pt-5">
              <CollegePredictorLockedCTA onUnlock={onUnlock} />
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-2xl border border-secondary/20 bg-linear-to-r from-secondary-fixed/45 via-surface-container-lowest to-primary-fixed/35 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-3 text-sm leading-relaxed text-on-surface">
          <span className="material-symbols-outlined mt-0.5 text-xl text-secondary">
            favorite
          </span>
          <span>
            Save your favorite colleges and arrange them in your personalized{" "}
            <span className="font-semibold text-primary">Choice List</span>.
          </span>
        </p>
        <span className="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary opacity-80">
          Choice List
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </span>
      </div>
    </div>
  );
}

function CollegePredictorLockedCTA({ onUnlock }: { onUnlock: () => void }) {
  return (
    <button
      type="button"
      onClick={onUnlock}
      className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-r from-primary to-primary-container px-5 py-4 text-left text-on-primary shadow-[0_16px_36px_-14px_rgba(0,61,155,0.7)] ring-2 ring-primary/25 transition hover:shadow-[0_20px_44px_-14px_rgba(0,61,155,0.75)] active:scale-[0.99]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-on-primary/15 blur-2xl"
      />
      <span className="relative">
        <span className="block text-base font-semibold md:text-lg">
          Unlock my college list
        </span>
        <span className="mt-0.5 block text-sm text-on-primary/90">
          Verify mobile number to reveal names and shortlist
        </span>
      </span>
      <span className="relative material-symbols-outlined shrink-0 text-2xl transition group-hover:translate-x-0.5">
        arrow_forward
      </span>
    </button>
  );
}

function BucketTile({
  label,
  count,
  tone,
}: {
  label: string;
  count: number;
  tone: "success" | "brand" | "muted";
}) {
  const styles =
    tone === "success"
      ? "border-secondary/30 bg-college-metric-rank"
      : tone === "brand"
        ? "border-primary/20 bg-college-metric-fees"
        : "border-outline-variant/40 bg-surface-container-low";

  return (
    <div className={cn("rounded-xl border p-4 text-center", styles)}>
      <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold tabular-nums text-primary">
        {formatNumber(count)}
      </p>
    </div>
  );
}

export function CollegePredictorBucketTabs({
  likely,
  possible,
  reach,
  referenceYear,
  rankCategoryShort,
  feeQuotaShort,
  headerActions,
}: {
  likely: CollegeSummary[];
  possible: CollegeSummary[];
  reach: CollegeSummary[];
  referenceYear: number;
  rankCategoryShort: string;
  feeQuotaShort: string;
  headerActions?: ReactNode;
}) {
  const lists = useMemo(
    () => ({ likely, possible, reach }),
    [likely, possible, reach]
  );

  const defaultTab = useMemo((): BucketKey => {
    for (const tab of BUCKET_TAB_COPY) {
      if (lists[tab.key].length > 0) return tab.key;
    }
    return "likely";
  }, [lists]);

  const [active, setActive] = useState<BucketKey>(defaultTab);

  const activeMeta =
    BUCKET_TAB_COPY.find((t) => t.key === active) ?? BUCKET_TAB_COPY[0];
  const activeColleges = lists[active];

  return (
    <section className="flex flex-col gap-0">
      <div
        role="tablist"
        aria-label="College chance buckets"
        className="flex gap-1 overflow-x-auto border-b border-outline-variant/60 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {BUCKET_TAB_COPY.map((tab) => {
          const count = lists[tab.key].length;
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`college-predictor-tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`college-predictor-panel-${tab.key}`}
              onClick={() => setActive(tab.key)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
              )}
            >
              {tab.tabLabel}
              <span
                className={cn(
                  "inline-flex min-w-[1.75rem] justify-center rounded-full px-2 py-0.5 text-xs font-bold tabular-nums",
                  isActive
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant"
                )}
              >
                {formatNumber(count)}
              </span>
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`college-predictor-panel-${active}`}
        aria-labelledby={`college-predictor-tab-${active}`}
        className="pt-6"
      >
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
              {activeMeta.heading}
            </h2>
            <p className="mt-2 text-sm italic leading-relaxed text-on-surface-variant md:text-base">
              {activeMeta.subline(referenceYear)}
            </p>
          </div>
          {headerActions ? (
            <div className="shrink-0 md:pt-1">{headerActions}</div>
          ) : null}
        </div>

        <CollegeResultsGrid
          colleges={activeColleges}
          resetHref="/college-predictor"
          rankCategoryShort={rankCategoryShort}
          feeQuotaShort={feeQuotaShort}
        />
      </div>
    </section>
  );
}

export function CollegePredictorHowItWorks() {
  const items = [
    {
      icon: "tag",
      title: "Enter your official rank",
      body: "AIR, category, domicile state, and counseling quota (AIQ, State, Management, or NRI).",
    },
    {
      icon: "pie_chart",
      title: "Get the locked preview",
      body: "See Likely, Possible, and Reach counts only. College names remain hidden until verification.",
    },
    {
      icon: "verified_user",
      title: "Unlock your shortlist",
      body: "Confirm your number with OTP, add your details, then browse full college lists and compare.",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="relative rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-sm"
        >
          <span className="absolute right-4 top-4 text-5xl font-black text-secondary/10">
            {i + 1}
          </span>
          <span className="material-symbols-outlined mb-4 inline-flex rounded-xl bg-secondary-fixed p-2.5 text-2xl text-on-secondary-fixed">
            {item.icon}
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CollegePredictorFaq() {
  const items = [
    {
      q: "What rank should I enter?",
      a: "Use your official NEET UG All India Rank from NTA. Do not enter marks unless you are using the rank predictor to estimate a range first.",
    },
    {
      q: "What do Likely, Possible, and Reach mean?",
      a: "Likely means your AIR is at or better than the published closing rank for that college (lower number is better). Possible and Reach use progressively wider bands above the closing rank.",
    },
    {
      q: "Why verify my mobile number?",
      a: "Verification unlocks the full college names and details. We use the same OTP flow as the rank predictor.",
    },
    {
      q: "Which cutoffs are used?",
      a: "We use closing ranks in our dataset for your selected quota and category, including Gujarat state counselling 2025 where available. This is not an official allotment from MCC or state authorities.",
    },
  ];
  return <RankPredictorFaq items={items} />;
}

export function CollegePredictorAirChip({
  air,
  categoryLabel,
  stateLabel,
  quotaLabel,
}: {
  air: number;
  categoryLabel: string;
  stateLabel: string;
  quotaLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-3 py-1.5 text-sm font-semibold text-primary">
        AIR {formatNumber(air)}
      </span>
      <span className="inline-flex rounded-full bg-surface-container-high px-3 py-1.5 text-sm text-on-surface-variant">
        {categoryLabel}
      </span>
      <span className="inline-flex rounded-full bg-surface-container-high px-3 py-1.5 text-sm text-on-surface-variant">
        {stateLabel}
      </span>
      <span className="inline-flex rounded-full bg-surface-container-high px-3 py-1.5 text-sm text-on-surface-variant">
        {quotaLabel}
      </span>
    </div>
  );
}

export function FormPanel({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-outline-variant/50 bg-surface-container-lowest/90 shadow-[0_24px_64px_-32px_rgba(25,28,30,0.35)] backdrop-blur">
      <div className="relative overflow-hidden border-b border-outline-variant/40 bg-linear-to-r from-surface-container-low to-primary-fixed/45 px-6 py-5 md:px-8">
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl"
        />
        <div className="relative flex items-start gap-3">
          <span className="material-symbols-outlined rounded-2xl bg-primary px-3 py-2 text-2xl text-on-primary">
            travel_explore
          </span>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Start your shortlist
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Four details unlock your private college match summary.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}

export function VerifyPanel({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0_28px_70px_-28px_rgba(0,61,155,0.55)]">
      <div className="relative overflow-hidden bg-linear-to-br from-primary via-primary-container to-secondary px-6 py-8 text-on-primary md:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-on-primary/15 blur-3xl"
        />
        <div className="relative flex items-start gap-4">
          <span className="material-symbols-outlined rounded-2xl bg-on-primary/15 p-3 text-3xl">
            shield
          </span>
          <div className="pr-8">
            <span className="inline-flex rounded-full bg-on-primary/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
              One-time verification
            </span>
            <h2 className="mt-2 font-headline-md text-headline-md">
              Unlock your college list
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-on-primary/90">
              Verify your mobile number to reveal college names, closing ranks,
              fees, and shortlist actions.
            </p>
            <div className="mt-4 grid gap-2 text-xs font-semibold text-on-primary/90 sm:grid-cols-3">
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lock_open</span>
                Full lists
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">workspace_premium</span>
                Chance buckets
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">compare_arrows</span>
                Compare access
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { CollegeResultsGrid } from "@/components/features/colleges/listing/CollegeResultsGrid";
import {
  ToolFilterPill,
  ToolInputChip,
  ToolResultBanner,
  ToolSection,
} from "@/components/features/predictors/PredictorToolParts";
import {
  FormPanel,
  RankPredictorFaq,
  RankPredictorLockedCTA,
  RankPredictorShell,
  ResultsPanel,
  RpMarketingHero,
  VerifyPanel,
} from "@/components/features/rank-predictor/RankPredictorParts";
import { COLLEGE_PREDICTOR_HERO, COLLEGE_PREDICTOR_HOW_IT_WORKS } from "@/lib/college-predictor/page-content";
import { formatNumber, cn } from "@/lib/utils";
import type { CollegeSummary } from "@/types/listing";
import type { CollegePredictorBucketCounts } from "@/lib/college-predictor/types";
import type { ListingQuota } from "@/types/filters";
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

export { RankPredictorShell, ResultsPanel, FormPanel, VerifyPanel };
export { VerifyModal } from "@/components/features/rank-predictor/RankPredictorParts";
export { ToolQuotaField as CollegePredictorQuotaField } from "@/components/features/predictors/PredictorToolParts";

export function CollegePredictorHero({ children }: { children?: ReactNode }) {
  return (
    <RpMarketingHero
      id="predict"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Predictors", href: "/reneet-rank-predictor-2026" },
        { label: "College Predictor" },
      ]}
      title="NEET College "
      titleEmphasis="Predictor"
      lede="Enter your official AIR to get a private chance summary. Verify once to unlock the full Likely, Possible, and Reach college lists with closing ranks and fees."
      trio={[
        { key: "Preview", value: "Counts only" },
        { key: "Unlock", value: "Full lists" },
        { key: "Compare", value: "Fees + ranks" },
      ]}
      fine={
        <>
          College names stay locked until verification. Indicative only, based on available
          closing-rank data. No official rank yet?{" "}
          <Link href="/reneet-rank-predictor-2026" className="font-bold text-primary hover:underline">
            Estimate rank from your score
          </Link>
          .
        </>
      }
    >
      <FormPanel
        title={COLLEGE_PREDICTOR_HERO.formTitle}
        subtitle={COLLEGE_PREDICTOR_HERO.formSubtitle}
      >
        {children}
      </FormPanel>
    </RpMarketingHero>
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
    <ToolResultBanner
      flag="Chance summary ready"
      title="Your matched-college "
      titleEmphasis="summary"
      description={`Review your personalized match results based on your rank, category, and domicile. Our ${referenceYear} analytical engine has processed ${institutionLabel} institutions for your profile.`}
    />
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
      <section className="rp-teaser-grid">
        <div className="rp-teaser-panel">
          <span className="rp-result-flag">Locked preview</span>
          <h2 className="rp-tool-section-title mt-4">
            {total > 0
              ? `${formatNumber(total)} colleges found in your bands`
              : "No matched colleges yet"}
          </h2>
          <p className="rp-tool-section-lede mt-2">
            Based on <span className="font-bold text-on-surface">AIR {formatNumber(air)}</span>{" "}
            and {referenceYear} cutoff data where available. We keep college names hidden until
            verification.
          </p>
          {counts.withCutoffData === 0 ? (
            <p className="rp-callout rp-callout-info mt-4">
              We do not have cutoff data for this quota yet. Try State quota for Gujarat colleges,
              or browse the{" "}
              <Link href="/colleges" className="font-bold text-primary hover:underline">
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
          <p className="rp-callout rp-callout-info mt-5">
            {total > 0
              ? "This is the teaser. Unlock to see names, fees, closing ranks, and shortlist links."
              : "Adjust quota or category to see matches."}
          </p>
        </div>

        <div className="rp-teaser-unlock flex flex-col">
          <span className="rp-result-flag bg-primary text-on-primary">Full list locked</span>
          <h2 className="rp-tool-section-title mt-4 text-primary">
            Unlock the names behind your match count
          </h2>
          <p className="rp-tool-section-lede mt-2">
            Verification turns the summary into an actionable shortlist across Likely, Possible,
            and Reach colleges.
          </p>
          <ul className="rp-lfeats mt-4">
            <li>
              College names grouped by chance
              <small>Likely, Possible, and Reach tabs</small>
            </li>
            <li>
              Closing rank and quota-aware fees
              <small>From our catalog where available</small>
            </li>
            <li>
              Compare and shortlist next steps
              <small>Side-by-side fees and seats</small>
            </li>
          </ul>
          <div className="mt-auto pt-5">
            <RankPredictorLockedCTA onUnlock={onUnlock} />
          </div>
        </div>
      </section>

      <div className="rp-strip rp-bleed">
        <div className="rp-strip-in ms-layout-page">
          <p>
            <b>Save your favorites</b> and arrange them in your personalized Choice List once
            you unlock the full college names.
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-xl border-[1.5px] border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-[13.5px] font-bold text-primary">
            Choice List
            <FiArrowRight aria-hidden />
          </span>
        </div>
      </div>
    </div>
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
  return (
    <div
      className={cn(
        "rp-bucket-tile",
        tone === "success" && "rp-bucket-tile-success",
        tone === "brand" && "rp-bucket-tile-brand",
        tone === "muted" && "rp-bucket-tile-muted",
      )}
    >
      <p className="rp-metric-k">{label}</p>
      <p className="rp-metric-v mt-1">{formatNumber(count)}</p>
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
    [likely, possible, reach],
  );

  const defaultTab = useMemo((): BucketKey => {
    for (const tab of BUCKET_TAB_COPY) {
      if (lists[tab.key].length > 0) return tab.key;
    }
    return "likely";
  }, [lists]);

  const [active, setActive] = useState<BucketKey>(defaultTab);

  useEffect(() => {
    setActive(defaultTab);
  }, [defaultTab]);

  const activeMeta =
    BUCKET_TAB_COPY.find((t) => t.key === active) ?? BUCKET_TAB_COPY[0];
  const activeColleges = lists[active];

  return (
    <section className="flex flex-col gap-0">
      <div role="tablist" aria-label="College chance buckets" className="rp-tool-tabs">
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
              className={cn("rp-tool-tab", isActive && "rp-tool-tab-active")}
            >
              {tab.tabLabel}
              <span className="rp-tool-tab-count">{formatNumber(count)}</span>
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
            <h2 className="rp-tool-section-title">{activeMeta.heading}</h2>
            <p className="rp-tool-section-lede mt-2 italic">
              {activeMeta.subline(referenceYear)}
            </p>
          </div>
          {headerActions ? <div className="shrink-0 md:pt-1">{headerActions}</div> : null}
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
  const { eyebrow, title, titleEmphasis, steps } = COLLEGE_PREDICTOR_HOW_IT_WORKS;

  return (
    <ToolSection eyebrow={eyebrow} title={title} titleEmphasis={titleEmphasis} alt>
      <div className="rp-steps">
        {steps.map((item, i) => (
          <div key={item.title} className="rp-step">
            <span className="rp-step-n">{i + 1}</span>
            <div className="rp-step-ic ">
              <span className="material-symbols-outlined text-[21px]">
                {item.icon}
              </span>
            </div>
            <h3 className="text-lg font-extrabold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-on-surface-variant">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </ToolSection>
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
      <ToolInputChip>
        <span className="rp-rpill-score">AIR {formatNumber(air)}</span>
      </ToolInputChip>
      <span className="rp-rpill">{categoryLabel}</span>
      <span className="rp-rpill">{stateLabel}</span>
      <span className="rp-rpill">{quotaLabel}</span>
    </div>
  );
}

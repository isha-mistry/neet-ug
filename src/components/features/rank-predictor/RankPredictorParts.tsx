import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatINR, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import type { CollegeSummary } from "@/types/listing";

interface RankPredictorHeroProps {
  children?: ReactNode;
}

export function RankPredictorHero({ children }: RankPredictorHeroProps) {
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
            <span className="material-symbols-outlined text-base">analytics</span>
            Score → rank estimate
          </div>
          <h1 className="mx-auto max-w-3xl font-headline-xl text-[2.35rem] font-bold leading-[1.05] tracking-tight text-primary md:text-5xl lg:mx-0">
            Predict your NEET rank before results are out
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-body-md text-body-md text-on-surface-variant md:text-body-lg lg:mx-0">
            Enter your score, see an instant estimated AIR range, then verify to
            unlock the refined band and the colleges worth exploring first.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <HeroProofPill icon="bolt" label="Instant" value="Rank range" />
            <HeroProofPill icon="lock_open" label="Unlock" value="15 colleges" />
            <HeroProofPill icon="compare_arrows" label="Next step" value="Compare" />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-on-surface-variant">
            Indicative only. Not affiliated with NTA/MCC. College previews unlock
            after verification using historical closing-rank trends where available.
          </p>
        </div>
        <div className="relative">
          {children ? (
            children
          ) : (
            <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest/80 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-primary">Start with your score</p>
              <p className="mt-2 text-sm text-on-surface-variant">
                The predictor form loads here on the first step.
              </p>
            </div>
          )}
        </div>
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

export function RankPredictorResultHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-outline-variant/40 bg-linear-to-r from-surface-container-lowest via-surface-container-low to-primary-fixed/35 p-6 shadow-sm md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="material-symbols-outlined text-sm">insights</span>
            Prediction ready
          </span>
          <h1 className="mt-3 font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
            Your estimated NEET rank range
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
            Review your estimated AIR band, then verify to unlock the refined range
            and college previews.
          </p>
        </div>
      </div>
    </div>
  );
}

interface RankPredictorShellProps {
  children: ReactNode;
  className?: string;
}

export function RankPredictorShell({ children, className }: RankPredictorShellProps) {
  return (
    <div
      className={cn(
        "relative min-h-[60vh] bg-[radial-gradient(circle_at_top_left,var(--color-primary-fixed),transparent_34rem),linear-gradient(180deg,var(--color-surface-container-lowest),var(--color-surface-container-low))] pb-16 pt-6 md:pb-24 md:pt-10",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-primary-fixed/30 to-transparent"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

interface ScoreChipProps {
  score: number;
  categoryLabel: string;
  stateLabel: string;
}

export function RankPredictorScoreChip({
  score,
  categoryLabel,
  stateLabel,
}: ScoreChipProps) {
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
      <span className="text-on-surface-variant">{stateLabel}</span>
    </div>
  );
}

interface RankBandProps {
  label: string;
  min: number;
  max: number;
  referenceYear: number;
  variant?: "preview" | "unlocked" | "locked";
}

export function RankBandDisplay({
  label,
  min,
  max,
  referenceYear,
  variant = "preview",
}: RankBandProps) {
  const isLocked = variant === "locked";
  const isUnlocked = variant === "unlocked";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 transition-shadow md:p-7",
        isUnlocked
          ? "border-primary/30 bg-linear-to-br from-surface-container-lowest via-surface-container-low to-primary-fixed/40 shadow-[0_12px_40px_-12px_rgba(0,61,155,0.25)]"
          : isLocked
            ? "border-dashed border-outline-variant bg-surface-container/50"
            : "border-outline-variant/50 bg-surface-container-lowest shadow-sm"
      )}
    >
      {!isLocked ? (
        <div
          aria-hidden
          className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl"
        />
      ) : null}
      <div className="relative flex items-start justify-between gap-3">
        <p className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant">
          {label}
        </p>
        {isUnlocked ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
            <span className="material-symbols-outlined text-sm">verified</span>
            Unlocked
          </span>
        ) : null}
      </div>
      {isLocked ? (
        <div className="relative mt-4 flex flex-col items-center py-4 text-center">
          <span className="material-symbols-outlined mb-3 text-4xl text-outline">
            lock
          </span>
          <p className="font-headline-md text-headline-md text-on-surface">
            Tighter range locked
          </p>
          <p className="mt-2 max-w-xs text-sm text-on-surface-variant">
            Verify your mobile number to refine your AIR band and see more colleges.
          </p>
        </div>
      ) : (
        <>
          <p className="relative mt-3 font-headline-lg text-headline-lg-mobile tracking-tight text-primary md:text-headline-lg">
            AIR {formatNumber(min)}
            <span className="mx-2 font-normal text-on-surface-variant">–</span>
            {formatNumber(max)}
          </p>
          <RankRangeBar min={min} max={max} highlight={isUnlocked} />
          <p className="relative mt-4 text-sm leading-relaxed text-on-surface-variant">
            Based on NEET {referenceYear} score–rank trends. Indicative only — not
            official NTA rank.
          </p>
        </>
      )}
    </div>
  );
}

interface RankResultShowcaseProps {
  preview: { min: number; max: number };
  refined?: { min: number; max: number };
  stateMeritRange?: { min: number; max: number };
  referenceYear: number;
  onUnlock: () => void;
}

export function RankResultShowcase({
  preview,
  refined,
  stateMeritRange,
  referenceYear,
  onUnlock,
}: RankResultShowcaseProps) {
  const previewSpan = preview.max - preview.min;
  const refinedSpan = refined ? refined.max - refined.min : 0;
  const narrowedPercent =
    refined && previewSpan > 0
      ? Math.max(0, Math.round(((previewSpan - refinedSpan) / previewSpan) * 100))
      : 0;

  if (refined) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-primary/25 bg-linear-to-br from-primary via-primary-container to-secondary px-6 py-7 text-on-primary shadow-[0_26px_70px_-28px_rgba(0,61,155,0.75)] md:px-8 md:py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-on-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 left-10 h-56 w-56 rounded-full bg-secondary-fixed/25 blur-3xl"
        />
        <div className="relative grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-on-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary">
              <span className="material-symbols-outlined text-sm">verified</span>
              Refined result unlocked
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-on-primary/75">
              Estimated AIR range
            </p>
            <h2 className="mt-2 font-headline-xl text-4xl font-black tracking-tight md:text-6xl">
              {formatNumber(refined.min)}
              <span className="mx-3 font-normal text-on-primary/55">–</span>
              {formatNumber(refined.max)}
            </h2>
            {stateMeritRange ? (
              <>
                <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-on-primary/75">
                  State merit rank range
                </p>
                <h3 className="mt-2 font-headline-lg text-3xl font-black tracking-tight md:text-4xl">
                  {formatNumber(stateMeritRange.min)}
                  <span className="mx-3 font-normal text-on-primary/55">–</span>
                  {formatNumber(stateMeritRange.max)}
                </h3>
              </>
            ) : null}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-on-primary/85 md:text-base">
              Indicative AIR and state merit bands unlocked after verification.
              Use them to explore colleges in your ballpark, not as official NTA
              or state counselling ranks.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-on-primary/20 bg-on-primary/10 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-on-primary/70">
                Preview band was
              </p>
              <p className="mt-1 text-lg font-bold">
                AIR {formatNumber(preview.min)} – {formatNumber(preview.max)}
              </p>
            </div>
            <div className="rounded-2xl border border-on-primary/20 bg-on-primary/10 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-on-primary/70">
                Range narrowed
              </p>
              <p className="mt-1 text-3xl font-black">{narrowedPercent}%</p>
            </div>
            <div className="rounded-2xl border border-on-primary/20 bg-on-primary/10 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-on-primary/70">
                Reference trend
              </p>
              <p className="mt-1 text-lg font-bold">NEET {referenceYear}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
      <RankBandDisplay
        label="Estimated AIR · wide band"
        min={preview.min}
        max={preview.max}
        referenceYear={referenceYear}
        variant="preview"
      />
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-surface-container-lowest via-primary-fixed/45 to-surface-container-low p-6 shadow-[0_18px_48px_-26px_rgba(0,61,155,0.45)] md:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative flex h-full flex-col">
          <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary">
            <span className="material-symbols-outlined text-sm">lock</span>
            Refined result locked
          </span>
          <h2 className="font-headline-md text-headline-md text-primary">
            Want the tighter AIR band?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            Verification unlocks the refined rank estimate and the complete
            college preview list, so you can move from curiosity to shortlist.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-on-surface">
            <span className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-primary">check_circle</span>
              Up to 15 colleges near your range
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-primary">check_circle</span>
              Compare selected colleges instantly
            </span>
          </div>
          <div className="mt-auto pt-5">
            <RankPredictorLockedCTA onUnlock={onUnlock} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RankRangeBar({
  min,
  max,
  highlight,
}: {
  min: number;
  max: number;
  highlight?: boolean;
}) {
  const cap = 900_000;
  const left = Math.min(100, (min / cap) * 100);
  const width = Math.max(4, Math.min(100 - left, ((max - min) / cap) * 100));

  return (
    <div className="relative mt-5">
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-container-high">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            highlight
              ? "bg-linear-to-r from-primary to-primary-container"
              : "bg-primary/70"
          )}
          style={{ marginLeft: `${left}%`, width: `${width}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-outline">
        <span>Top ranks</span>
        <span>Broad pool</span>
      </div>
    </div>
  );
}

export function RankPredictorLockedCTA({ onUnlock }: { onUnlock: () => void }) {
  return (
    <button
      type="button"
      onClick={onUnlock}
      className="group relative mt-4 flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-r from-primary to-primary-container px-5 py-4 text-left text-on-primary shadow-[0_16px_36px_-14px_rgba(0,61,155,0.7)] ring-2 ring-primary/25 transition hover:shadow-[0_20px_44px_-14px_rgba(0,61,155,0.75)] active:scale-[0.99] md:mt-0"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-on-primary/15 blur-2xl"
      />
      <span className="relative">
        <span className="block text-base font-semibold md:text-lg">Unlock full preview</span>
        <span className="mt-0.5 block text-sm text-on-primary/90">
          Refined AIR band + up to 15 colleges + compare access
        </span>
      </span>
      <span className="relative material-symbols-outlined shrink-0 text-2xl transition group-hover:translate-x-0.5">
        arrow_forward
      </span>
    </button>
  );
}

interface RankPredictorCollegePreviewProps {
  college: CollegeSummary;
  verified: boolean;
  cutoffCaption?: string;
  onAddCompare?: (slug: string) => void;
  compareDisabled?: boolean;
  inCompare?: boolean;
}

export function RankPredictorCollegePreview({
  college,
  verified,
  cutoffCaption = "AIQ closing rank",
  onAddCompare,
  compareDisabled,
  inCompare,
}: RankPredictorCollegePreviewProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <div className="h-1 bg-linear-to-r from-primary/80 via-primary-container to-secondary-container" />
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CollegeTypeBadge type={college.collegeType} />
          <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-xs font-semibold text-on-surface-variant">
            Near your estimate
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-snug text-on-surface group-hover:text-primary">
            {college.name}
          </h3>
          <p className="mt-1.5 inline-flex items-center gap-1 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-base">location_on</span>
            {college.city}, {college.stateName}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 rounded-xl bg-surface-container-low p-3.5 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-outline">
              Closing rank
            </dt>
            <dd className="mt-1 font-semibold text-on-surface">
              AIR {formatNumber(college.latestCutoffRank)}
            </dd>
            <dd className="text-xs text-on-surface-variant">
              {college.latestCutoffYear > 0 ? `${college.latestCutoffYear} · ` : ""}
              {cutoffCaption}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-outline">
              Course fees
            </dt>
            <dd className="mt-1 font-semibold text-on-surface">
              {formatINR(college.totalCourseFee, { compact: true })}
            </dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <Button as="link" href={`/colleges/${college.slug}`} variant="outline" size="sm">
            View college
          </Button>
          {verified && onAddCompare ? (
            <Button
              type="button"
              variant={inCompare ? "secondary" : "primary"}
              size="sm"
              disabled={compareDisabled}
              onClick={() => onAddCompare(college.slug)}
            >
              {inCompare ? "In compare" : "Add to compare"}
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function CollegePredictorBanner() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-secondary/20 bg-linear-to-r from-secondary-fixed/40 to-surface-container-low px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined mt-0.5 text-2xl text-secondary">
          campaign
        </span>
        <p className="text-sm leading-relaxed text-on-surface">
          <span className="font-semibold text-on-surface">Official rank published?</span>{" "}
          Use the College Predictor with your NTA rank for counseling-style lists.
        </p>
      </div>
      <Link
        href="/college-predictor"
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface-container-low"
      >
        College predictor
        <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </Link>
    </div>
  );
}

export function HowItWorksGrid() {
  const items = [
    {
      icon: "edit_note",
      title: "Enter your score",
      body: "Add NEET marks, category, and domicile state to get started.",
    },
    {
      icon: "insights",
      title: "See your AIR band",
      body: "Get an indicative rank range right away. We do not show colleges at this step. Verify your mobile number next to unlock matched colleges and a tighter, more useful estimate.",
    },
    {
      icon: "verified_user",
      title: "Verify & explore",
      body: "Confirm your number with OTP, add name and location, then browse colleges near your rank and compare options.",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="relative rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-sm"
        >
          <span className="absolute right-4 top-4 text-5xl font-black text-primary/5">
            {i + 1}
          </span>
          <span className="material-symbols-outlined mb-4 inline-flex rounded-xl bg-primary-fixed p-2.5 text-2xl text-primary">
            {item.icon}
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function RankPredictorFaq({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="divide-y divide-outline-variant/60 overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4 open:bg-surface-container-low/50">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-on-surface marker:content-none [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant transition group-open:rotate-180">
              expand_more
            </span>
          </summary>
          <p className="mt-3 pb-1 text-sm leading-relaxed text-on-surface-variant">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function VerifyPanel({
  children,
}: {
  children: ReactNode;
}) {
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
              Unlock your refined rank result
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-on-primary/90">
              Verify your mobile number to unlock the tighter rank band and
              college preview list.
            </p>
            <div className="mt-4 grid gap-2 text-xs font-semibold text-on-primary/90 sm:grid-cols-3">
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lock_open</span>
                Refined band
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">list_alt</span>
                Full preview
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

export function VerifyModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/45 p-0 backdrop-blur-[2px] md:items-center md:justify-center md:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Verify to unlock full preview"
        className="relative max-h-[94vh] w-full overflow-y-auto rounded-t-3xl md:max-h-[90vh] md:max-w-2xl md:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-on-primary/25 bg-on-primary/10 text-on-primary transition hover:bg-on-primary/20"
          aria-label="Close verification popup"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
        {children}
      </div>
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
            calculate
          </span>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Your NEET details
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Three inputs are enough for an instant estimate.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}

export function ResultsPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 rounded-3xl border border-outline-variant/40 bg-linear-to-b from-surface-container-lowest via-surface-container-lowest to-surface-container-low p-6 backdrop-blur-sm shadow-[0_18px_50px_-28px_rgba(25,28,30,0.2)] md:p-8">
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import {
  RANK_PREDICTOR_FINAL_CTA,
  RANK_PREDICTOR_HERO,
  RANK_PREDICTOR_HOW_IT_WORKS,
  RANK_PREDICTOR_STRIP,
} from "@/lib/rank-predictor/page-content";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { cn } from "@/lib/utils";
import { formatINR, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import type { CollegeSummary } from "@/types/listing";
import {
  FiArrowRight,
  FiCheckCircle,
  FiList,
  FiLock,
  FiMapPin,
  FiRepeat,
  FiShield,
  FiUnlock,
  FiX,
  RankPredictorLockBadgeIcon,
  RankPredictorNeetDetailsIcon,
  RankPredictorScoreSparklineIcon,
  rankPredictorStepIcons,
} from "@/components/features/rank-predictor/rank-predictor-icons";
import { RefinedResultConfetti } from "@/components/features/rank-predictor/RefinedResultConfetti";

interface RankPredictorHeroProps {
  children?: ReactNode;
}

export type RpHeroBreadcrumb = { label: string; href?: string };

export interface RpMarketingHeroProps {
  children?: ReactNode;
  id?: string;
  breadcrumbs: readonly RpHeroBreadcrumb[];
  title: string;
  titleEmphasis: string;
  lede: string;
  trio: readonly { key: string; value: string }[];
  fine: ReactNode;
}

export function RpMarketingHero({
  children,
  id = "predict",
  breadcrumbs,
  title,
  titleEmphasis,
  lede,
  trio,
  fine,
}: RpMarketingHeroProps) {
  return (
    <header className="rp-hero rp-bleed" id={id}>
      <div className="rp-hero-inner">
        <div className="rp-hero-grid">
          <div>
            <nav className="rp-crumb" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <span key={`${crumb.label}-${index}`} className="contents">
                    {index > 0 ? <span className="rp-crumb-sep">/</span> : null}
                    {isLast || !crumb.href ? (
                      <span style={isLast ? { color: "var(--color-primary)" } : undefined}>
                        {crumb.label}
                      </span>
                    ) : (
                      <Link href={crumb.href}>{crumb.label}</Link>
                    )}
                  </span>
                );
              })}
            </nav>
            <h1 className="rp-hero-title">
              {title}
              <em>{titleEmphasis}</em>
            </h1>
            <p className="rp-hero-lede">{lede}</p>
            <div className="rp-trio">
              {trio.map((item) => (
                <div key={item.key} className="rp-trio-card">
                  <span className="rp-trio-k">{item.key}</span>
                  <b className="rp-trio-b">{item.value}</b>
                </div>
              ))}
            </div>
            <p className="rp-hero-fine">{fine}</p>
          </div>
          <div className="relative rp-hero-aside">{children}</div>
        </div>
      </div>
    </header>
  );
}

export function RankPredictorHero({ children }: RankPredictorHeroProps) {
  return (
    <RpMarketingHero
      id="predict"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Predictors", href: "/rank-predictor" },
        { label: "Rank Predictor" },
      ]}
      title={RANK_PREDICTOR_HERO.title}
      titleEmphasis={RANK_PREDICTOR_HERO.titleEmphasis}
      lede={RANK_PREDICTOR_HERO.lede}
      trio={RANK_PREDICTOR_HERO.trio}
      fine={RANK_PREDICTOR_HERO.fine}
    >
      {children}
    </RpMarketingHero>
  );
}

interface RankPredictorShellProps {
  children: ReactNode;
  className?: string;
}

export function RankPredictorShell({ children, className }: RankPredictorShellProps) {
  return (
    <div className={cn("rp-page relative overflow-x-clip min-h-[60vh] pb-16 pt-0 md:pb-24", className)}>
      {children}
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
    <span className="rp-rpill">
      <RankPredictorScoreSparklineIcon className="shrink-0 text-primary" />
      <span className="rp-rpill-score">{score}</span>
      <span className="text-on-surface-variant">/720</span>
      <i className="rp-rpill-sep">·</i>
      <span>{categoryLabel}</span>
      <i className="rp-rpill-sep">·</i>
      <span>{stateLabel}</span>
    </span>
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

  if (isLocked) {
    return (
      <div className="rp-bcard">
        <span className="rp-bk">{label}</span>
        <div className="mt-6 flex flex-col items-center py-6 text-center">
          <FiLock className="mb-3 text-4xl text-outline" aria-hidden />
          <p className="text-lg font-bold text-on-surface">Tighter range locked</p>
          <p className="mt-2 max-w-xs text-sm text-on-surface-variant">
            Verify your mobile number to refine your AIR band and see more colleges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rp-bcard">
      <span className="rp-bk">{label}</span>
      <p className="rp-bnum mt-2">
        AIR {formatNumber(min)}
        <span className="mx-2 font-medium text-on-surface-variant">–</span>
        {formatNumber(max)}
      </p>
      <RankRangeBar min={min} max={max} highlight={variant === "unlocked"} />
      <p className="rp-bnote">
        <b>
          Based on NEET {referenceYear - 1} &amp; {referenceYear} score–rank trends.
        </b>{" "}
        Indicative only — your official rank comes from NTA. Use this band to start
        preparing your college strategy early, then verify it against your scorecard.
      </p>
    </div>
  );
}

interface RankResultShowcaseProps {
  preview: { min: number; max: number };
  refined?: { min: number; max: number };
  stateMeritRange?: { min: number; max: number };
  stateLabel?: string;
  referenceYear: number;
  onUnlock: () => void;
}

export function RankResultShowcase({
  preview,
  refined,
  stateMeritRange,
  stateLabel,
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
      <div className="rp-refined-result-wrap relative isolate overflow-visible">
        <RefinedResultConfetti />
        <section className="rp-brand-gradient rp-brand-elevated relative z-0 overflow-hidden rounded-[1.75rem] px-6 py-7 text-on-primary ring-1 ring-on-primary/15 md:px-8 md:py-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-on-primary/12 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-primary-hover/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,transparent_40%,color-mix(in_srgb,var(--color-on-primary)_6%,transparent)_100%)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-on-primary/25 bg-on-primary/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-on-primary shadow-sm">
                <FiCheckCircle className="text-[15px]" aria-hidden />
                Refined result unlocked
              </div>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary/70">
                Estimated AIR range
              </p>
              <h2 className="mt-2 font-headline-xl text-[2.35rem] font-black tabular-nums tracking-tight md:text-[3.35rem] md:leading-[1.05]">
                {formatNumber(refined.min)}
                <span className="mx-2 font-light text-on-primary/45 md:mx-3">–</span>
                {formatNumber(refined.max)}
              </h2>
              {stateMeritRange ? (
                <div className="mt-7 border-t border-on-primary/20 pt-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-primary/70">
                    State merit rank range{stateLabel ? ` · ${stateLabel}` : ""}
                  </p>
                  <h3 className="mt-2 font-headline-lg text-[1.85rem] font-black tabular-nums tracking-tight md:text-[2.35rem]">
                    {formatNumber(stateMeritRange.min)}
                    <span className="mx-2 font-light text-on-primary/45 md:mx-3">–</span>
                    {formatNumber(stateMeritRange.max)}
                  </h3>
                </div>
              ) : null}
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-on-primary/88 md:text-[15px]">
                Indicative AIR and state merit bands after verification. Use them to
                explore colleges in your ballpark — not as official NTA or state
                counselling ranks.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rp-result-stat rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-primary/65">
                  Preview band was
                </p>
                <p className="mt-1.5 text-base font-bold tabular-nums leading-snug md:text-lg">
                  AIR {formatNumber(preview.min)} – {formatNumber(preview.max)}
                </p>
              </div>
              <div className="rp-result-stat rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-primary/65">
                  Range narrowed
                </p>
                <p className="mt-1.5 text-3xl font-black tabular-nums leading-none">
                  {narrowedPercent}%
                </p>
              </div>
              <div className="rp-result-stat rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-primary/65">
                  Reference trend
                </p>
                <p className="mt-1.5 font-mono text-base font-bold md:text-lg">
                  NEET {referenceYear - 1} + {referenceYear}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="rp-rgrid">
      <RankBandDisplay
        label="Estimated AIR · wide band"
        min={preview.min}
        max={preview.max}
        referenceYear={referenceYear}
        variant="preview"
      />
      <div className="rp-lcard">
        <span className="rp-lflag">
          <RankPredictorLockBadgeIcon className="h-3 w-3" />
          Refined result locked
        </span>
        <h3>
          A 65,000-wide band is a headline.
          <br />
          <em>A 1,000-wide band is a plan.</em>
        </h3>
        <p className="mb-4 text-sm text-on-surface-variant">
          One quick mobile verification unlocks the version of this estimate you can
          actually act on:
        </p>
        <ul className="rp-lfeats">
          <li>
            Refined AIR band — up to <b>98% narrower</b>
            <small>Tight enough to shortlist against real closing ranks</small>
          </li>
          <li>
            Your <b>state merit rank</b> estimate
            <small>The number your state counseling actually runs on</small>
          </li>
          <li>
            Up to <b>15 colleges near your range</b>
            <small>With last year&apos;s closing ranks and full course fees</small>
          </li>
          <li>
            Instant <b>compare access</b>
            <small>Side-by-side fees, seats and bond terms</small>
          </li>
        </ul>
        <RankPredictorLockedCTA onUnlock={onUnlock} />
        <p className="rp-lfine">Free · OTP on WhatsApp · No spam, counseling updates only</p>
      </div>
    </div>
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
    <div className="my-6">
      <div className="rp-spec-bar">
        <div
          className={cn("rp-spec-band", highlight && "narrow")}
          style={{ left: `${left}%`, width: `${width}%` }}
        />
      </div>
      <div className="rp-spec-lbl">
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
      className="rp-brand-gradient rp-brand-elevated-sm group relative mt-auto flex w-full items-center justify-between gap-4 overflow-hidden rounded-[14px] px-5 py-[18px] text-left text-on-primary ring-1 ring-on-primary/20 transition hover:-translate-y-0.5 hover:brightness-[1.03] active:scale-[0.99]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-on-primary/12 blur-2xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,transparent_35%,color-mix(in_srgb,var(--color-on-primary)_7%,transparent)_100%)]"
      />
      <span className="relative">
        <b className="block text-base font-extrabold md:text-lg">Unlock full preview</b>
        <span className="mt-0.5 block text-xs opacity-85">
          Refined band + state rank + 15 colleges — free
        </span>
      </span>
      <FiArrowRight
        className="relative shrink-0 text-2xl transition group-hover:translate-x-0.5"
        aria-hidden
      />
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
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-outline-variant bg-surface-container-lowest shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="rp-ccard-top" />
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
            <FiMapPin className="text-base" aria-hidden />
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
    <div className="rp-strip rp-bleed">
      <div className="rp-strip-in ms-layout-page">
        <p>
          <b>{RANK_PREDICTOR_STRIP.bold}</b> {RANK_PREDICTOR_STRIP.text}
        </p>
        <Link
          href="/college-predictor"
          className="inline-flex shrink-0 items-center justify-center rounded-xl border-[1.5px] border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-[13.5px] font-bold text-primary transition hover:border-primary hover:bg-primary-fixed"
        >
          {RANK_PREDICTOR_STRIP.cta}
        </Link>
      </div>
    </div>
  );
}

export function HowItWorksGrid() {
  const { eyebrow, title, titleEmphasis, steps } = RANK_PREDICTOR_HOW_IT_WORKS;

  return (
    <section className="rp-section-alt rp-bleed">
      <div className="ms-layout-page">
        <span className="rp-eyebrow">{eyebrow}</span>
        <h2 className="rp-section-title">
          {title}
          <em>{titleEmphasis}</em>
        </h2>
        <div className="rp-steps">
          {steps.map((item, i) => {
            const StepIcon = rankPredictorStepIcons[item.icon];
            return (
              <div key={item.title} className="rp-step">
                <span className="rp-step-n">{i + 1}</span>
                <span className="rp-step-ic">
                  <StepIcon className="h-[21px] w-[21px]" aria-hidden />
                </span>
                <h3 className="text-lg font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-on-surface-variant">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
        <div className="rp-s2s">
          <div className="rp-s2s-node">
            <div className="rp-s2s-dot">720</div>
            <div className="rp-s2s-copy">
              <b>Your score</b>
              <span>What you earned</span>
            </div>
          </div>
          <div className="rp-s2s-node rp-s2s-node-you">
            <div className="rp-s2s-dot">AIR</div>
            <div className="rp-s2s-copy">
              <b>Your rank</b>
              <span>What it&apos;s worth</span>
            </div>
            <span className="rp-s2s-tag">You are here</span>
          </div>
          <div className="rp-s2s-node">
            <div className="rp-s2s-dot">R1</div>
            <div className="rp-s2s-copy">
              <b>Counseling rounds</b>
              <span>Where strategy decides</span>
            </div>
          </div>
          <div className="rp-s2s-node">
            <div className="rp-s2s-dot">✓</div>
            <div className="rp-s2s-copy">
              <b>Your MBBS seat</b>
              <span>Where it all lands</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RankPredictorFaq({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="rp-faq-cols">
      {items.map((item, index) => (
        <details key={item.q} className="rp-faq-item group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-[19px] text-[15px] font-bold marker:content-none [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="font-mono font-semibold text-primary transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-[22px] pb-5 text-[13.5px] leading-relaxed text-on-surface-variant">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function RankPredictorFaqSection({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <section className="py-16 md:py-24">
      <span className="rp-eyebrow">Common questions</span>
      <h2 className="rp-section-title">Asked before every results day.</h2>
      <RankPredictorFaq items={items} />
    </section>
  );
}

export function RankPredictorTrustBlock() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="rp-trust">
        <p>
          <b>Data compiled &amp; verified by:</b> the MedSeat MBBS counseling team —
          specialists in NEET UG counseling for Gujarat, Rajasthan, Madhya Pradesh and
          Maharashtra.
        </p>
        <p className="mt-2">
          <b>Data sources:</b> estimates and college data are compiled and cross-verified
          against official publications and portals including NTA, the National Medical
          Commission (NMC), the Medical Counselling Committee (MCC), and state counseling
          authorities ACPUGMEC, RUHS, DMAT and CET Cell.
        </p>
        <p className="rp-trust-links mt-2.5">
          Explore further:{" "}
          <Link href="/colleges">All MBBS colleges</Link>
          <Link href="/colleges/state">MBBS by state</Link>
          <Link href="/cutoff-analyser">Cutoff Analyser</Link>
          <Link href="/compare">College comparison</Link>
        </p>
      </div>
    </section>
  );
}

export function RankPredictorFinalCta({ onRunAgain }: { onRunAgain: () => void }) {
  const c = RANK_PREDICTOR_FINAL_CTA;
  return (
    <section className="rp-final rp-bleed" id="cta">
      <div className="ms-layout-page">
        <h2>
          {c.title}
          <br />
          <em>{c.titleBreak}</em>
        </h2>
        <p className="rp-hero-lede mx-auto mt-[18px] max-w-[500px]">{c.lede}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3.5">
          <a
            href={COUNSEL_WHATSAPP_URL}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-[15px] font-bold text-on-primary shadow-[0_10px_28px_-10px_color-mix(in_srgb,var(--color-primary)_55%,transparent)] transition hover:bg-primary-hover"
          >
            {c.book}
          </a>
          <button
            type="button"
            onClick={onRunAgain}
            className="inline-flex items-center justify-center rounded-xl border-[1.5px] border-outline-variant bg-surface-container-lowest px-7 py-3.5 text-[15px] font-bold text-primary transition hover:border-primary hover:bg-primary-fixed"
          >
            {c.again}
          </button>
        </div>
        <p className="rp-final-meta">{c.meta}</p>
      </div>
    </section>
  );
}

export function VerifyPanel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface-container-lowest shadow-[0_28px_70px_-28px_color-mix(in_srgb,var(--color-primary-pressed)_45%,transparent)]">
      <div className="rp-brand-gradient relative overflow-hidden px-6 py-8 text-on-primary md:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-on-primary/12 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-0 h-56 w-56 rounded-full bg-primary-hover/35 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,transparent_40%,color-mix(in_srgb,var(--color-on-primary)_6%,transparent)_100%)]"
        />
        <div className="relative flex items-start gap-4">
          <span className="inline-flex rounded-2xl border border-on-primary/25 bg-on-primary/12 p-3 text-on-primary shadow-sm">
            <FiShield className="h-8 w-8" aria-hidden />
          </span>
          <div className="pr-8">
            <span className="inline-flex items-center rounded-full border border-on-primary/25 bg-on-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              One-time verification
            </span>
            <h2 className="mt-3 font-headline-md text-headline-md font-bold tracking-tight">
              Unlock your refined rank result
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-on-primary/88">
              Verify your mobile number to unlock the tighter rank band and
              college preview list.
            </p>
            <div className="mt-5 grid gap-2 text-xs font-semibold text-on-primary/92 sm:grid-cols-3">
              <span className="inline-flex items-center gap-1.5">
                <FiUnlock className="text-sm" aria-hidden />
                Refined band
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiList className="text-sm" aria-hidden />
                Full preview
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiRepeat className="text-sm" aria-hidden />
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
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm transition hover:border-primary hover:bg-primary-fixed"
          aria-label="Close verification popup"
        >
          <FiX className="text-lg" aria-hidden />
        </button>
        {children}
      </div>
    </div>
  );
}

export function FormPanel({
  children,
  title = RANK_PREDICTOR_HERO.formTitle,
  subtitle = RANK_PREDICTOR_HERO.formSubtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="rp-fcard">
      <div className="rp-fhead">
        <span className="rp-fhead-ic">
          <RankPredictorNeetDetailsIcon className="h-[21px] w-[21px]" />
        </span>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="rp-fbody">{children}</div>
    </div>
  );
}

export function ResultsPanel({ children }: { children: ReactNode }) {
  return <section className="rp-result-wrap">{children}</section>;
}


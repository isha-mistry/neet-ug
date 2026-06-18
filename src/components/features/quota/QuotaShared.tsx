"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FiExternalLink, FiDownload, FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { GuideCard } from "@/components/features/mbbs-india/MbbsIndiaParts";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import { RankPredictorShell } from "@/components/features/rank-predictor/RankPredictorParts";
import { SectionHeading } from "@/components/features/neet-ug/shared/SectionHeading";
import {
  guideCardClass,
  hubCardHoverClass,
  summaryHighlightCardClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

/** Re-export brand card surface for quota page sections. */
export const quotaCardClass = guideCardClass;

interface QuotaPageShellProps {
  current: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

function QuotaBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="rp-crumb" aria-label="Breadcrumb">
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;
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
  );
}

export function QuotaPageShell({
  current,
  children,
  className,
  containerClassName,
}: QuotaPageShellProps) {
  return (
    <RankPredictorShell className={className}>
      <Container size="page" className={cn("py-8 md:py-10", containerClassName)}>
        <div className="relative z-10 mb-8">
          <QuotaBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: current },
            ]}
          />
        </div>
        <div className="relative z-10 space-y-10">{children}</div>
        <QuotaLeadBlock pageLabel={`Quota: ${current}`} />
      </Container>
    </RankPredictorShell>
  );
}

interface QuotaOverviewShellProps {
  children: ReactNode;
}

export function QuotaOverviewShell({ children }: QuotaOverviewShellProps) {
  return (
    <RankPredictorShell>
      <Container size="page" className="py-8 md:py-10">
        <div className="mb-8">
          <QuotaBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas" },
            ]}
          />
        </div>
        <div className="space-y-10">{children}</div>
        <QuotaLeadBlock pageLabel="Quota overview" />
      </Container>
    </RankPredictorShell>
  );
}

function QuotaLeadBlock({ pageLabel }: { pageLabel: string }) {
  return (
    <section id="counselling-lead-section" className="relative mt-12 md:mt-14">
      <div className="rounded-[1.75rem] bg-linear-to-br from-primary via-primary to-primary-hover p-px shadow-[0_18px_42px_-22px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]">
        <div className={cn(guideCardClass, "relative overflow-hidden rounded-[calc(1.75rem-1px)] border-0 bg-surface p-6 md:p-8")}>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                <span className="material-symbols-outlined text-[12px]">support_agent</span>
                Need help choosing?
              </span>
              <h2 className="rp-section-title mt-4">
                Talk to a counsellor <em>before locking</em> quota choices
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                Share your rank, category, domicile and budget. Our expert team will help you compare AIQ,
                state, management, NRI and deemed options before registration or reporting deadlines.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: "recommend", title: "Seat recommendations", body: "Custom options matching your NEET score and category." },
                  { icon: "account_balance_wallet", title: "Budget planning", body: "Cost breakdown including hidden fees and security deposits." },
                  { icon: "compare_arrows", title: "Quota comparisons", body: "Analyze state quota vs. deemed and management routes." },
                  { icon: "notifications_active", title: "Cut-off alerts", body: "Updates on registration dates and round results." },
                ].map((item) => (
                  <div key={item.title} className={cn(summaryHighlightCardClass, "flex gap-3")}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">{item.title}</h4>
                      <p className="mt-0.5 text-[11px] leading-normal text-on-surface-variant">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-outline-variant/50 pt-4 text-xs font-semibold text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  100% free consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
                  Instant callback
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                  10,000+ students helped
                </span>
              </div>
            </div>

            <FreeCounsellingLeadForm
              pageLabel={pageLabel}
              title="Book free counselling"
              submitLabel="Request call"
              fields="name-phone-only"
              className="border border-outline-variant/60 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(37,70,208,0.18)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export interface QuotaInfoCardItem {
  icon: string;
  title: string;
  body: string;
}

interface QuotaInfoGridProps {
  items: QuotaInfoCardItem[];
  columns?: "two" | "three";
  className?: string;
}

export function QuotaInfoGrid({ items, columns = "three", className }: QuotaInfoGridProps) {
  return (
    <section
      className={cn(
        guideCardClass,
        "grid grid-cols-1 overflow-hidden p-0",
        columns === "two" ? "md:grid-cols-2" : "md:grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "group flex gap-4 border-outline-variant/40 p-5 transition-colors hover:bg-surface-container-low/45 md:p-6",
            "border-b last:border-b-0 md:border-b-0",
            columns === "two" ? "md:border-r md:even:border-r-0" : "md:border-r md:last:border-r-0"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
          </div>
          <div>
            <h3 className="font-headline-md text-base font-bold leading-snug text-on-surface">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export interface QuotaProcessStep {
  title: string;
  body: string;
}

interface QuotaProcessListProps {
  title: string;
  subtitle?: string;
  steps: QuotaProcessStep[];
  className?: string;
}

export function QuotaProcessList({ title, subtitle, steps, className }: QuotaProcessListProps) {
  return (
    <section className={cn(guideCardClass, "relative overflow-hidden pl-6 md:pl-7", className)}>
      <span className="absolute left-0 top-0 h-full w-1 bg-primary" aria-hidden />
      <PremiumSectionHeader icon="route" title={title} subtitle={subtitle} />
      <div className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-outline-variant/40 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-4 border-b border-outline-variant/40 bg-surface-container-low/35 p-4 transition-colors hover:bg-surface-container-lowest md:border-r md:even:border-r-0"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
              {index + 1}
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-surface">{step.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export interface QuotaTheoryPoint {
  icon: string;
  title: string;
  body: string;
}

export interface QuotaTheoryContent {
  eyebrow?: string;
  title: string;
  intro: string;
  points: QuotaTheoryPoint[];
  note?: string;
}

interface QuotaTheoryPanelProps extends QuotaTheoryContent {
  className?: string;
}

export function QuotaTheoryPanel({
  eyebrow = "Theory primer",
  title,
  intro,
  points,
  note,
  className,
}: QuotaTheoryPanelProps) {
  return (
    <section className={cn(guideCardClass, "relative overflow-hidden pl-6 md:pl-7", className)}>
      <span className="absolute left-0 top-0 h-full w-1 bg-primary" aria-hidden />
      <QuotaSectionHeading eyebrow={eyebrow} title={title} description={intro} className="mb-6" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        {points.map((point) => (
          <div
            key={point.title}
            className="group flex gap-4 border-b border-outline-variant/40 pb-5 last:border-b-0 md:nth-last-[-n+2]:border-b-0"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <span className="material-symbols-outlined text-[20px]">{point.icon}</span>
            </span>
            <div>
              <h3 className="text-sm font-bold text-on-surface">{point.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{point.body}</p>
            </div>
          </div>
        ))}
      </div>
      {note ? (
        <div className="mt-5 rounded-xl border border-primary/15 bg-primary-fixed/55 px-4 py-3 text-xs font-semibold leading-relaxed text-on-primary-fixed">
          {note}
        </div>
      ) : null}
    </section>
  );
}

interface QuotaSectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  emphasis?: string;
}

export function QuotaSectionHeading({
  eyebrow,
  title,
  description,
  className,
  emphasis,
}: QuotaSectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow ? <span className="rp-eyebrow">{eyebrow}</span> : null}
      <h2 className="rp-section-title !mt-0">
        {title}
        {emphasis ? <em>{emphasis}</em> : null}
      </h2>
      {description ? (
        <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant">{description}</p>
      ) : null}
    </div>
  );
}

interface QuotaHeaderProps {
  eyebrow: string;
  title: string;
  highlightedText: string;
  titleSuffix?: string;
  description: string;
  eyebrowIcon?: string;
  watermarkIcon?: string;
}

export function QuotaHeader({
  eyebrow,
  title,
  highlightedText,
  titleSuffix = "",
  description,
  eyebrowIcon = "school",
  watermarkIcon,
}: QuotaHeaderProps) {
  return (
    <section className="mb-2">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
            <span className="material-symbols-outlined text-sm">{eyebrowIcon}</span>
            {eyebrow}
          </span>
          <h1 className="rp-hero-title mt-4">
            {title} <em>{highlightedText}</em>
            {titleSuffix ? ` ${titleSuffix}` : ""}
          </h1>
          <p className="rp-hero-lede">{description}</p>
        </div>
        <GuideCard className="hidden h-fit md:block">
          <div className="flex flex-col gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-on-primary">
              <span
                className="material-symbols-outlined text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {watermarkIcon || eyebrowIcon}
              </span>
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                Quota planner
              </p>
              <p className="mt-1 text-sm font-bold leading-snug text-on-surface">
                Compare eligibility, rounds, seats, and documents before choice filling.
              </p>
            </div>
          </div>
        </GuideCard>
      </div>
    </section>
  );
}

export interface QuotaMetricItem {
  icon: string;
  label: string;
  value: string;
  caption: string;
}

interface QuotaMetricsProps {
  title?: string;
  metrics: QuotaMetricItem[];
}

export function QuotaMetrics({ title = "Key facts at a glance", metrics }: QuotaMetricsProps) {
  return (
    <section>
      {title ? (
        <span className="rp-eyebrow mb-4 block">{title}</span>
      ) : null}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={cn(
              summaryHighlightCardClass,
              hubCardHoverClass,
              "flex min-h-[128px] flex-col justify-between"
            )}
          >
            <div className="mb-3 flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">{metric.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                {metric.label}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">{metric.value}</div>
              <div className="mt-0.5 text-[11px] leading-normal text-on-surface-variant">{metric.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface QuotaCtaAction {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  isExternal?: boolean;
}

interface QuotaCtaProps {
  title: string;
  description: string;
  actions: QuotaCtaAction[];
  footerNote?: string;
  customGraphic?: ReactNode;
}

export function QuotaCta({ title, description, actions, footerNote, customGraphic }: QuotaCtaProps) {
  return (
    <section className="rp-brand-gradient rp-brand-elevated relative overflow-hidden rounded-[1.75rem] px-6 py-8 text-on-primary ring-1 ring-on-primary/15 md:px-10 md:py-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-on-primary/10 blur-2xl"
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          {customGraphic}
          <h2 className="font-headline-md text-xl font-bold tracking-tight text-on-primary md:text-2xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-on-primary/85 md:text-base">{description}</p>
          {footerNote ? (
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-on-primary/60">
              {footerNote}
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row md:w-auto md:shrink-0">
          {actions.map((act, idx) => (
            <Link
              key={idx}
              href={act.href}
              target={act.isExternal ? "_blank" : undefined}
              rel={act.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.98] sm:w-auto",
                act.variant === "primary"
                  ? "bg-on-primary text-primary shadow-sm hover:bg-on-primary/95"
                  : "border border-on-primary/40 text-on-primary hover:bg-on-primary/10"
              )}
            >
              {act.label}
              {act.isExternal ? (
                <FiExternalLink className="shrink-0 text-xs" />
              ) : act.variant === "primary" ? (
                <FiArrowRight className="shrink-0 text-xs" />
              ) : (
                <FiDownload className="shrink-0 text-xs" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

interface PremiumSectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
}

export function PremiumSectionHeader({ icon, title, subtitle }: PremiumSectionHeaderProps) {
  return <SectionHeading icon={icon} title={title} description={subtitle} />;
}

interface SeatMatrixDonutProps {
  percent: number;
  total: string;
  label: string;
  color?: string;
  backgroundColor?: string;
}

export function SeatMatrixDonut({
  percent,
  total,
  label,
  color = "stroke-primary",
  backgroundColor = "stroke-surface-container-high",
}: SeatMatrixDonutProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={cn(guideCardClass, "mx-auto flex w-full flex-col items-center justify-center")}>
      <div className="relative h-48 w-48">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={backgroundColor}
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={`${color} transition-all duration-500 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold leading-none tracking-tight text-on-surface">{total}</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ProgressItem {
  label: string;
  percentage: string;
  value: number;
  color?: string;
}

interface CategoryProgressBarsProps {
  items: ProgressItem[];
}

export function CategoryProgressBars({ items }: CategoryProgressBarsProps) {
  return (
    <div className={cn(guideCardClass, "w-full space-y-4")}>
      <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
        Category-wise share
      </h4>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-[11px] font-medium text-on-surface-variant">
            <span className="w-12 text-left font-bold text-on-surface">{item.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full border border-outline-variant/20 bg-surface-container-low">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color || "bg-primary"}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
            <span className="w-12 text-right font-semibold text-primary">{item.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface LiveDecisionToolsProps {
  excludeIds?: string[];
  highlightId?: string;
}

export function LiveDecisionTools({ excludeIds = [], highlightId }: LiveDecisionToolsProps) {
  const tools = [
    {
      id: "cutoff",
      name: "Cutoff Analyser",
      href: "/cutoff-analyser",
      icon: "analytics",
      desc: "Analyze year-wise category rank trends",
      badge: "Historical Data",
    },
    {
      id: "predictor",
      name: "College Predictor",
      href: "/college-predictor",
      icon: "online_prediction",
      desc: "Predict your MBBS college chances",
      badge: "Popular Tool",
    },
    {
      id: "rank",
      name: "Rank Predictor",
      href: "/rank-predictor",
      icon: "batch_prediction",
      desc: "Calculate rank matching score inputs",
      badge: "Real-time Engine",
    },
    {
      id: "compare",
      name: "Compare Colleges",
      href: "/compare",
      icon: "compare_arrows",
      desc: "Side-by-side fee and matrix comparisons",
      badge: "Direct Side-by-Side",
    },
  ].filter((t) => !excludeIds.includes(t.id));

  return (
    <GuideCard>
      <div className="mb-5 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live decision tools
        </h4>
        <span className="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
          Active
        </span>
      </div>

      <div className="space-y-3">
        {tools.map((tool) => {
          const isHighlighted = tool.id === highlightId;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={cn(
                guideCardClass,
                hubCardHoverClass,
                "group block p-4 no-underline",
                isHighlighted && "border-primary/40 bg-primary/[0.03]"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                    isHighlighted
                      ? "bg-primary text-on-primary"
                      : "bg-primary-fixed text-primary group-hover:bg-primary group-hover:text-on-primary"
                  )}
                >
                  <span className="material-symbols-outlined text-[22px]">{tool.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface transition-colors group-hover:text-primary">
                      {tool.name}
                    </span>
                    {isHighlighted ? (
                      <span className="rounded-sm border border-primary/20 bg-primary-fixed px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-primary">
                        Recommended
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[11px] font-medium leading-relaxed text-on-surface-variant">
                    {tool.desc}
                  </p>
                </div>
                <span className="material-symbols-outlined text-sm text-on-surface-variant opacity-0 transition-all group-hover:opacity-100">
                  arrow_forward
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </GuideCard>
  );
}

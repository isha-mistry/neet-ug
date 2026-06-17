"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FiExternalLink, FiDownload, FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";

interface QuotaPageShellProps {
  current: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function QuotaPageShell({
  current,
  children,
  className = "py-8",
  containerClassName = "animate-fadeIn",
}: QuotaPageShellProps) {
  return (
    <div className={cn("bg-background text-on-surface font-body-md antialiased", className)}>
      <Container size="page" className={containerClassName}>
        <div className="relative z-10 mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas", href: "/quota" },
              { label: current },
            ]}
          />
        </div>
        <div className="relative z-10">{children}</div>
        <QuotaLeadBlock pageLabel={`Quota: ${current}`} />
      </Container>
    </div>
  );
}

interface QuotaOverviewShellProps {
  children: ReactNode;
}

export function QuotaOverviewShell({ children }: QuotaOverviewShellProps) {
  return (
    <div className="bg-background text-on-background font-body-md antialiased">
      <Container size="page" className="py-12">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Quotas" },
            ]}
          />
        </div>
        {children}
        <QuotaLeadBlock pageLabel="Quota overview" />
      </Container>
    </div>
  );
}

function QuotaLeadBlock({ pageLabel }: { pageLabel: string }) {
  return (
    <section id="counselling-lead-section" className="relative mt-16 overflow-hidden rounded-3xl border border-outline-variant bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-primary/[0.04] p-6 shadow-clinical-soft md:p-8">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl" aria-hidden />
      
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div className="flex flex-col justify-center h-full">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary">
              <span className="material-symbols-outlined text-[12px] font-black">support_agent</span>
              Need help choosing?
            </span>
            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-on-surface sm:text-3xl lg:text-[2rem]">
              Talk to a counsellor <span className="text-primary">before locking</span> quota choices
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
              Share your rank, category, domicile and budget. Our expert team will help you compare AIQ,
              state, management, NRI and deemed options before registration or reporting deadlines.
            </p>
          </div>

          {/* Key counselling features grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/50 p-3.5 transition-all hover:bg-surface-container-lowest hover:shadow-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">recommend</span>
              </div>
              <div>
                <h4 className="text-xs font-black text-on-surface">Seat Recommendations</h4>
                <p className="mt-0.5 text-[11px] leading-normal text-on-surface-variant">
                  Get custom options matching your NEET score & category.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/50 p-3.5 transition-all hover:bg-surface-container-lowest hover:shadow-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
              <div>
                <h4 className="text-xs font-black text-on-surface">Budget Planning</h4>
                <p className="mt-0.5 text-[11px] leading-normal text-on-surface-variant">
                  Detailed cost breakdown including hidden fees & security deposits.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/50 p-3.5 transition-all hover:bg-surface-container-lowest hover:shadow-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
              </div>
              <div>
                <h4 className="text-xs font-black text-on-surface">Quota Comparisons</h4>
                <p className="mt-0.5 text-[11px] leading-normal text-on-surface-variant">
                  Analyze State Quota vs. Deemed & Management Quota.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/50 p-3.5 transition-all hover:bg-surface-container-lowest hover:shadow-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div>
                <h4 className="text-xs font-black text-on-surface">Cut-off Alerts</h4>
                <p className="mt-0.5 text-[11px] leading-normal text-on-surface-variant">
                  Real-time updates on registration dates and round results.
                </p>
              </div>
            </div>
          </div>

          {/* Quick trust metrics */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-outline-variant/50 pt-4 text-xs font-semibold text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
              100% Free Consultation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[16px]">timer</span>
              Instant Callback
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[16px]">groups</span>
              10,000+ Students Helped
            </span>
          </div>
        </div>

        <div className="lg:mt-0">
          <FreeCounsellingLeadForm
            pageLabel={pageLabel}
            title="Book free counselling"
            submitLabel="Request call"
            fields="name-phone-only"
            className="border border-outline-variant/60 shadow-clinical-soft bg-surface"
          />
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
        "grid grid-cols-1 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft",
        columns === "two" ? "md:grid-cols-2" : "md:grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "group flex gap-4 border-outline-variant/70 p-5 transition-colors hover:bg-surface-container-low/45",
            columns === "two" ? "md:p-6" : "",
            "border-b last:border-b-0 md:border-b-0",
            columns === "two" ? "md:border-r md:even:border-r-0" : "md:border-r md:last:border-r-0"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
            <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight text-on-surface">{item.title}</h3>
            <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">{item.body}</p>
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
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 pl-7 shadow-clinical-soft md:p-7 md:pl-8",
        className
      )}
    >
      <span className="absolute left-0 top-0 h-full w-1.5 bg-primary" aria-hidden />
      <PremiumSectionHeader icon="route" title={title} subtitle={subtitle} />
      <div className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-outline-variant/60 md:grid-cols-2">
        {steps.map((step, index) => (
          <div key={step.title} className="flex gap-4 border-b border-outline-variant/60 bg-surface-container-low/35 p-4 transition-colors hover:bg-surface-container-lowest md:border-r md:even:border-r-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-on-primary shadow-sm">
              {index + 1}
            </div>
            <div>
              <h4 className="text-sm font-extrabold tracking-tight text-on-surface">{step.title}</h4>
              <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">{step.body}</p>
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
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 pl-7 shadow-clinical-soft md:p-7 md:pl-8",
        className
      )}
    >
      <span className="absolute left-0 top-0 h-full w-1.5 bg-primary" aria-hidden />
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </span>
        <h2 className="text-xl font-black tracking-tight text-on-surface md:text-2xl">
          {title}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant md:text-base">
          {intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        {points.map((point) => (
          <div
            key={point.title}
            className="group flex gap-4 border-b border-outline-variant/50 pb-5 last:border-b-0 md:nth-last-[-n+2]:border-b-0"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <span className="material-symbols-outlined text-[22px]">{point.icon}</span>
            </span>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-on-surface">
                {point.title}
              </h3>
              <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">
                {point.body}
              </p>
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

// ----------------------------------------------------
// 1. Quota Header Component
// ----------------------------------------------------
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
    <section className="relative mb-10 overflow-hidden py-4 md:py-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-primary">
            <span className="material-symbols-outlined text-sm">{eyebrowIcon}</span>
            <span className="font-label-md text-label-sm uppercase tracking-wider font-semibold">{eyebrow}</span>
          </div>
          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-on-surface md:text-5xl">
            {title} <span className="text-primary">{highlightedText}</span>{titleSuffix ? " " + titleSuffix : ""}
          </h1>
          <p className="mb-0 max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
            {description}
          </p>
        </div>
        <div className="relative hidden min-h-[190px] overflow-hidden rounded-4xl bg-primary-fixed/55 p-5 md:block h-fit md:self-end">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl" aria-hidden />
          <div className="relative flex h-full flex-col justify-between gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {watermarkIcon || eyebrowIcon}
              </span>
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                Quota planner
              </p>
              <p className="mt-1 text-sm font-extrabold leading-tight text-on-surface">
                Compare eligibility, rounds, seats, and documents before choice filling.
              </p>
            </div>
          </div>
        </div>
      </div>
      {watermarkIcon && (
        <div className="pointer-events-none absolute -bottom-28 right-52 hidden select-none text-on-surface opacity-[0.025] lg:block">
          <span className="material-symbols-outlined text-[300px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {watermarkIcon}
          </span>
        </div>
      )}
    </section>
  );
}

// ----------------------------------------------------
// 2. Quota Metrics Component (Key Facts Card Row)
// ----------------------------------------------------
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

export function QuotaMetrics({ title = "Key Facts at a Glance", metrics }: QuotaMetricsProps) {
  return (
    <section className="mb-12">
      {title && (
        <h2 className="mb-4 text-sm font-black uppercase tracking-[0.14em] text-on-surface-variant">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="flex min-h-[132px] flex-col justify-between rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 shadow-clinical-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-clinical-hover md:p-5"
          >
            <div className="mb-4 flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">{metric.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                {metric.label}
              </span>
            </div>
            <div>
              <div className="mb-1 text-sm font-black tracking-tight text-on-surface">
                {metric.value}
              </div>
              <div className="text-[11px] text-on-surface-variant/85 leading-normal">
                {metric.caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// 3. Quota CTA Section (Redesigned deep blue banner)
// ----------------------------------------------------
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
    <section className="relative mb-12 overflow-hidden rounded-2xl border border-outline-variant bg-linear-to-br from-primary via-primary to-primary-hover px-6 py-8 text-on-primary shadow-[0_18px_42px_-22px_color-mix(in_srgb,var(--color-primary)_55%,transparent)] md:px-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-on-primary/10 blur-2xl" aria-hidden />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          {customGraphic}
          <h2 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/85 md:text-base">
            {description}
          </p>
          {footerNote && (
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
              {footerNote}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row md:w-auto md:shrink-0">
          {actions.map((act, idx) => (
            <Link
              key={idx}
              href={act.href}
              target={act.isExternal ? "_blank" : undefined}
              rel={act.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 active:scale-95 sm:w-auto",
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

// ----------------------------------------------------
// 4. Premium Section Header (Circular Icon Style)
// ----------------------------------------------------
interface PremiumSectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
}

export function PremiumSectionHeader({ icon, title, subtitle }: PremiumSectionHeaderProps) {
  return (
    <div className="mb-6 flex items-start gap-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary text-on-primary shadow-sm">
        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
          {icon}
        </span>
      </div>
      <div>
        <h3 className="text-base font-extrabold tracking-tight text-on-surface md:text-lg">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. SVG Donut Chart Component
// ----------------------------------------------------
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
    <div className="mx-auto flex w-full flex-col items-center justify-center rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-clinical-soft transition-all duration-300 hover:shadow-clinical-hover">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={`${backgroundColor}`}
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Circle */}
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
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-extrabold text-on-surface leading-none tracking-tight">{total}</span>
          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. Category Progress Bars Component
// ----------------------------------------------------
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
    <div className="w-full space-y-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-clinical-soft transition-all duration-300 hover:shadow-clinical-hover">
      <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Category-wise Share</h4>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-[11px] font-medium text-on-surface-variant">
            <span className="w-12 text-left font-bold text-on-surface">{item.label}</span>
            <div className="flex-1 bg-surface-container-low rounded-full h-2 overflow-hidden border border-outline-variant/20">
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

// ----------------------------------------------------
// 7. Reusable Live Decision Tools Sidebar Widget
// ----------------------------------------------------
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
      desc: "Side-by-side fee & matrix comparisons",
      badge: "Direct Side-by-Side",
    },
  ].filter(t => !excludeIds.includes(t.id));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-outline-variant bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest to-surface-container-low/40 p-6 shadow-clinical-soft transition-shadow hover:shadow-clinical-hover">
      {/* Decorative top right highlight glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" aria-hidden />

      <div className="mb-5 flex items-center justify-between">
        <h4 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-extrabold flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Live Decision Tools
        </h4>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
      </div>

      <div className="space-y-3">
        {tools.map((tool) => {
          const isHighlighted = tool.id === highlightId;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={cn(
                "group relative block overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-clinical-soft cursor-pointer",
                isHighlighted
                  ? "border-primary bg-primary/[0.03] shadow-xs"
                  : "border-outline-variant/60 bg-surface hover:border-primary/30 hover:bg-surface-container-lowest"
              )}
            >
              {/* Highlight background glow */}
              {isHighlighted && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-transparent" />
              )}
              
              <div className="relative flex items-start gap-3 z-10">
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                  isHighlighted
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-primary group-hover:bg-primary group-hover:text-on-primary"
                )}>
                  <span className="material-symbols-outlined text-[22px]">{tool.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-on-surface group-hover:text-primary transition-colors">
                      {tool.name}
                    </span>
                    {isHighlighted && (
                      <span className="text-[8px] font-bold text-primary bg-primary-fixed border border-primary/20 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant font-medium">
                    {tool.desc}
                  </p>
                </div>
                
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

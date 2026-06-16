"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import { Button } from "@/components/ui/Button";
import {
  COUNSEL_BOOK_CALL_URL,
  MBBS_INDIA_LAST_UPDATED,
} from "@/lib/mbbs-india/constants";
import type { CatalogSeatBreakdown } from "@/lib/mbbs/catalog-aggregates";
import { mbbsIndiaPageTitle } from "@/lib/mbbs/constants";
import {
  guideBandClass,
  guideCardClass,
  summaryHighlightCardClass,
} from "@/lib/mbbs-india/section-styles";
import { cn, formatNumber } from "@/lib/utils";

export function MbbsIndiaHero({ catalog }: { catalog: CatalogSeatBreakdown }) {
  const pageTitle = mbbsIndiaPageTitle();
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-outline-variant/30 bg-surface p-6 shadow-[0_24px_64px_-32px_rgba(0,61,155,0.35)] md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary-fixed/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-secondary-container/25 blur-3xl"
      />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.85fr] lg:items-start">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-label-sm font-label-sm text-on-primary">
              <span className="material-symbols-outlined text-base">local_hospital</span>
              National MBBS guide
            </span>
            <span className="text-sm text-on-surface-variant">
              Updated {MBBS_INDIA_LAST_UPDATED}
            </span>
          </div>
          <h1 className="max-w-2xl font-headline-xl text-[1.85rem] font-bold leading-[1.1] tracking-tight text-primary md:text-[2.5rem]">
            {pageTitle}
          </h1>
          <p className="max-w-xl text-body-md leading-relaxed text-on-surface-variant md:text-body-lg">
            {formatNumber(catalog.totalColleges)} colleges and{" "}
            {formatNumber(catalog.totalSeats)} MBBS seats in our catalog — cutoffs, fees, and
            counseling in one place for NEET UG admission in India.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <HeroStatPill
              icon="school"
              label="Colleges"
              value={formatNumber(catalog.totalColleges)}
            />
            <HeroStatPill
              icon="event_seat"
              label="MBBS seats"
              value={formatNumber(catalog.totalSeats)}
            />
            <HeroStatPill
              icon="domain"
              label="Govt seats"
              value={formatNumber(catalog.govtSeats)}
            />
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button as="link" href="/cutoff-analyser" variant="primary" size="md">
              Check cutoffs
            </Button>
          </div>
          <p className="text-xs text-outline">Data: MedSeat college catalog (live database)</p>
        </div>
        <FreeCounsellingLeadForm pageLabel="MBBS in India" className="mx-auto w-full max-w-sm lg:max-w-none" />
      </div>
    </div>
  );
}

function HeroStatPill({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest/90 p-3.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined rounded-lg bg-primary-fixed p-1.5 text-lg text-primary">
          {icon}
        </span>
        <p className="text-[10px] font-bold uppercase tracking-wider text-outline">{label}</p>
      </div>
      <p className="text-lg font-bold tabular-nums leading-tight text-on-surface">{value}</p>
    </div>
  );
}

export function GuideHelpLink({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-primary/15 bg-primary-fixed/25 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-5",
        className
      )}
    >
      <p className="text-sm leading-relaxed text-on-surface-variant">
        Need help choosing AIQ vs state quota or government vs private?
      </p>
      <Button
        as="link"
        href={COUNSEL_BOOK_CALL_URL}
        variant="primary"
        size="md"
        className="shrink-0 sm:ml-auto"
      >
        Book a free counseling call
      </Button>
    </div>
  );
}

export function GuideSection({
  id,
  eyebrow,
  title,
  description,
  band = false,
  embedded = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  band?: boolean;
  /** When true, skip inner Container (parent supplies page grid / max width). */
  embedded?: boolean;
  children: ReactNode;
}) {
  const inner = (
    <>
      <header className="w-full border-l-4 border-primary pl-5">
        {eyebrow ? (
          <span className="mb-1 block text-label-md font-label-md uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface md:text-headline-lg">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant md:text-base">
            {description}
          </p>
        ) : null}
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </>
  );

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 py-12 md:py-16",
        band && guideBandClass,
        embedded && "first:pt-0"
      )}
    >
      {embedded ? (
        <div className="flex flex-col gap-8">{inner}</div>
      ) : (
        <Container size="2xl" className="flex flex-col gap-8">
          {inner}
        </Container>
      )}
    </section>
  );
}

export function GuideCard({
  children,
  className,
  padding = true,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
} & ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(guideCardClass, !padding && "overflow-hidden p-0", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function ProseBlock({ children }: { children: ReactNode }) {
  return (
    <div className="w-full space-y-5 text-body-md leading-[1.75] text-on-surface-variant">
      {children}
    </div>
  );
}

export function RelatedLinksGrid({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex h-full items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface px-4 py-4 text-sm font-semibold text-on-surface transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
          >
            <span className="material-symbols-outlined rounded-lg bg-surface-container-high p-2 text-lg text-primary group-hover:bg-primary group-hover:text-on-primary">
              arrow_forward
            </span>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SubsectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-base font-bold text-on-surface md:text-lg">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
      {children}
    </h3>
  );
}

export function MetricGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => {
        const multiline = s.value.includes("\n");
        return (
          <div
            key={s.label}
            className={summaryHighlightCardClass}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-outline">
              {s.label}
            </p>
            <p
              className={cn(
                "mt-2 font-bold text-primary text-2xl tabular-nums ",
                multiline
                  ? "leading-snug whitespace-pre-line"
                  : "tracking-tight"
              )}
            >
              {s.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function GuideSteps({
  steps,
  size = "default",
}: {
  steps: string[];
  size?: "default" | "compact";
}) {
  const compact = size === "compact";
  return (
    <ol className={cn("space-y-4", compact && "space-y-3")}>
      {steps.map((step, i) => (
        <li key={step} className="flex gap-3">
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary",
              compact ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-xs"
            )}
            aria-hidden
          >
            {i + 1}
          </span>
          <p
            className={cn(
              "text-sm leading-relaxed text-on-surface-variant",
              compact ? "pt-0.5" : "pt-1"
            )}
          >
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function SummaryHighlights({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className={summaryHighlightCardClass}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            {item.label}
          </p>
          <p className="mt-1 text-xl font-bold tabular-nums text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

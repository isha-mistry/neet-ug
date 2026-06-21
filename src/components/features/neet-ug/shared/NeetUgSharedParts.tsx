"use client";

import Link from "next/link";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "@/components/common/Container";
import {
  guideBandClass,
  guideCardClass,
  hubCardHoverClass,
  summaryHighlightCardClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

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
          <span className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-[23px] font-extrabold leading-[1.12] tracking-[-0.022em] text-on-surface md:text-[31px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-[15px] leading-[1.65] text-on-surface-variant max-w-2xl">
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

export function ProseBlock({ children }: { children: ReactNode }) {
  return (
    <div className="w-full space-y-5 text-[15px] leading-[1.65] text-on-surface-variant">
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
            className="group flex h-full items-center gap-3 rounded-[14px] border border-outline-variant bg-surface-container-lowest px-4 py-4 text-sm font-semibold text-on-surface transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_2px_6px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(37,70,208,0.28)]"
          >
            <span className="material-symbols-outlined rounded-lg bg-surface-container-high p-2 text-lg text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
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
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-outline">
              {s.label}
            </p>
            <p
              className={cn(
                "mt-2 font-bold text-primary text-2xl tabular-nums",
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
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
            {item.label}
          </p>
          <p className="mt-1 text-xl font-bold tabular-nums text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

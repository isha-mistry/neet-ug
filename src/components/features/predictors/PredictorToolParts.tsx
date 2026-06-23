"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LISTING_QUOTA_OPTIONS } from "@/lib/colleges/listing-options";
import type { ListingQuota } from "@/types/filters";

export function ToolSectionBlock({
  title,
  titleEmphasis,
  description,
  actions,
  children,
  className,
  id,
}: {
  title: string;
  titleEmphasis?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="rp-tool-section-head">
        <div>
          <h2 className="rp-tool-section-title">
            {title}
            {titleEmphasis ? <em className="not-italic text-primary">{titleEmphasis}</em> : null}
          </h2>
          {description ? <p className="rp-tool-section-lede">{description}</p> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className="rp-tool-panel">{children}</div>
    </section>
  );
}

export function ToolSectionBody({
  children,
  className,
  flush,
  toolbar,
}: {
  children: ReactNode;
  className?: string;
  flush?: boolean;
  toolbar?: boolean;
}) {
  return (
    <div
      className={cn(
        toolbar
          ? "rp-tool-panel-toolbar"
          : flush
            ? "rp-tool-panel-body-flush"
            : "rp-tool-panel-body",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ToolMetricCard({
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
    <div className="rp-metric-card">
      <p className="rp-metric-k">{label}</p>
      <p className="rp-metric-v">{value}</p>
      <p className="rp-metric-note">{context}</p>
      {progress != null ? (
        <div
          className="rp-metric-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      ) : null}
    </div>
  );
}

export function ToolFilterPill({
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
      className={cn("rp-filter-pill", active && "rp-filter-pill-active")}
    >
      {children}
    </button>
  );
}

export function ToolResultBanner({
  flag,
  title,
  titleEmphasis,
  description,
}: {
  flag: string;
  title: string;
  titleEmphasis?: string;
  description: string;
}) {
  return (
    <div className="rp-result-banner">
      <span className="rp-result-flag">{flag}</span>
      <h2 className="rp-result-title">
        {title}
        {titleEmphasis ? <em>{titleEmphasis}</em> : null}
      </h2>
      <p className="rp-result-lede">{description}</p>
    </div>
  );
}

export function ToolInputChip({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="rp-rpill">{children}</div>;
}

export function ToolCallout({
  variant = "info",
  children,
  className,
}: {
  variant?: "info" | "warn" | "safe";
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rp-callout",
        variant === "warn" && "rp-callout-warn",
        variant === "safe" && "rp-callout-safe",
        variant === "info" && "rp-callout-info",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function ToolGlossaryGrid({
  terms,
}: {
  terms: { term: string; definition: string }[];
}) {
  return (
    <dl className="rp-glossary-grid">
      {terms.map((g) => (
        <div key={g.term} className="rp-glossary-item">
          <dt className="rp-glossary-term">{g.term}</dt>
          <dd className="rp-glossary-def">{g.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ToolQuotaField({
  value,
  onChange,
}: {
  value: ListingQuota | "";
  onChange: (q: ListingQuota) => void;
}) {
  return (
    <fieldset className="rp-quota-field">
      <legend>Counselling quota</legend>
      <p className="rp-quota-field-hint">
        Choose the counselling route you want to evaluate. State quota works best where
        state cutoff rows are available.
      </p>
      <div className="rp-quota-pills">
        {LISTING_QUOTA_OPTIONS.map((opt) => (
          <ToolFilterPill
            key={opt.value}
            active={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </ToolFilterPill>
        ))}
      </div>
    </fieldset>
  );
}

export function ToolSection({
  eyebrow,
  title,
  titleEmphasis,
  children,
  className,
  alt,
}: {
  eyebrow?: string;
  title: string;
  titleEmphasis?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}) {
  return (
    <section className={cn(alt && "rp-section-alt rp-bleed", className)}>
      <div className={cn(alt && "ms-layout-page")}>
        {eyebrow ? <span className="rp-eyebrow">{eyebrow}</span> : null}
        <h2 className="rp-section-title">
          {title}
          {titleEmphasis ? <em>{titleEmphasis}</em> : null}
        </h2>
        {children}
      </div>
    </section>
  );
}

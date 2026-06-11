"use client";

import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import type { MbbsStateConfig } from "@/lib/mbbs-state/types";
import { mbbsStatePageTitle } from "@/lib/mbbs/constants";
import { Button } from "@/components/ui/Button";
import {
  MBBS_STATE_LAST_UPDATED,
  collegesStateListingPath,
} from "@/lib/mbbs-state/constants";
import { summaryHighlightCardClass } from "@/lib/mbbs-india/section-styles";
import { cn, formatNumber } from "@/lib/utils";
import { FiArrowRight } from "react-icons/fi";

export function MbbsStateHero({ config }: { config: MbbsStateConfig }) {
  const title = mbbsStatePageTitle(config.name);
  const { stats } = config;
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-outline-variant/30 bg-surface p-6 shadow-[0_24px_64px_-32px_rgba(0,61,155,0.35)] md:p-10">
      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-label-sm text-on-primary">
            {config.code} · {config.counselingAuthorityShort}
          </span>
          <p className="text-sm text-on-surface-variant">Updated {MBBS_STATE_LAST_UPDATED}</p>
          <h1 className="text-[1.75rem] font-bold leading-tight text-primary md:text-[2.35rem]">
            {title}
          </h1>
          <p className="text-body-md leading-relaxed text-on-surface-variant">
            {config.name} has {stats.totalColleges} medical colleges with{" "}
            {stats.totalSeats.toLocaleString("en-IN")} MBBS seats. State quota admissions are
            managed by {config.counselingAuthorityShort}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as="link" href="/cutoff-analyser" variant="primary" size="md">
              Check {config.name} cutoffs
            </Button>
          </div>
        </div>
        <FreeCounsellingLeadForm
          pageLabel={`MBBS in ${config.name}`}
          className="mx-auto w-full max-w-md lg:max-w-none"
        />
      </div>
    </div>
  );
}

export function StateSummaryHighlights({ config }: { config: MbbsStateConfig }) {
  const s = config.stats;
  const items = [
    { label: "Medical colleges", value: String(s.totalColleges) },
    { label: "MBBS seats", value: s.totalSeats.toLocaleString("en-IN") },
    { label: "Government seats", value: s.govtSeats.toLocaleString("en-IN") },
    { label: "Private seats", value: s.pvtSeats.toLocaleString("en-IN") },
  ];
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

export function StateCollegesExploreCta({ config }: { config: MbbsStateConfig }) {
  const { stats } = config;
  const listingHref = collegesStateListingPath(config.slug);

  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-4 rounded-xl border border-outline-variant/40 bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-5 md:py-5",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,61,155,0.08)]"
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-on-surface">
          Explore all {config.name} medical colleges
        </p>
        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
          See fees, NEET cutoffs, seat counts, bonds, and college type for{" "}
          {formatNumber(stats.totalColleges)} campuses in our searchable directory
        </p>
      </div>
      <Button
        as="link"
        href={listingHref}
        variant="primary"
        size="md"
        trailingIcon={<FiArrowRight aria-hidden />}
        className="shrink-0 sm:ml-auto"
      >
        View {config.name} colleges
      </Button>
    </div>
  );
}

export function buildStateSummaryRows(config: MbbsStateConfig) {
  const s = config.stats;
  const rows = [
    { label: `Total medical colleges in ${config.name}`, value: String(s.totalColleges) },
    { label: "Total MBBS seats", value: s.totalSeats.toLocaleString("en-IN") },
    {
      label: "Government medical colleges",
      value: `${s.govtColleges} colleges · ${s.govtSeats.toLocaleString("en-IN")} seats`,
    },
    {
      label: "Private medical colleges",
      value: `${s.pvtColleges} colleges · ${s.pvtSeats.toLocaleString("en-IN")} seats`,
    },
    { label: "All India Quota (15%) seats", value: s.aiqSeats.toLocaleString("en-IN") },
    { label: "State quota (85%) seats", value: s.stateQuotaSeats.toLocaleString("en-IN") },
    { label: "State counseling authority", value: config.counselingAuthorityShort },
    {
      label: "State counseling portal",
      value: config.counselingPortal,
    },
    { label: "Government seat annual fee", value: s.govtFeeAnnual },
    { label: "Management quota fee cap", value: s.mgmtFeeCap },
    { label: "Bond / rural service", value: s.bondNote },
    { label: "Domicile for state quota", value: s.domicileRequired },
    { label: "Course duration", value: "4.5 years + 1 year internship" },
  ];
  const extra = config.contentExtensions?.extraQuickFacts ?? [];
  return [...rows, ...extra];
}

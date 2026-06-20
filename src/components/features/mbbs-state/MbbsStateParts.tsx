"use client";

import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import type { MbbsStateConfig } from "@/lib/mbbs-state/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  MBBS_STATE_LAST_UPDATED,
  collegesStateListingPath,
} from "@/lib/mbbs-state/constants";
import { summaryHighlightCardClass } from "@/lib/mbbs-india/section-styles";
import { cn, formatNumber } from "@/lib/utils";
import { FiArrowRight } from "react-icons/fi";
import { MBBS_ACADEMIC_SESSION, mbbsStatePageTitle } from "@/lib/mbbs/constants";

export function MbbsStateHero({ config }: { config: MbbsStateConfig }) {
  const { stats } = config;
  return (
    <div className="relative overflow-hidden py-6 md:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full blur-3xl"
      />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_580px] lg:items-start xl:gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="brand" icon={<span className="material-symbols-outlined text-sm">location_on</span>}>
              {config.code} · {config.counselingAuthorityShort}
            </Badge>
            <span className="text-sm text-on-surface-variant font-medium">
              Updated {MBBS_STATE_LAST_UPDATED}
            </span>
          </div>
          
          <h1 className="rp-hero-title max-w-2xl text-balance">
            MBBS in {config.name} {MBBS_ACADEMIC_SESSION}: <em>Colleges, Seats & Admission</em>
          </h1>
          
          <p className="rp-hero-lede max-w-xl">
            Complete details on {formatNumber(stats.totalColleges)} medical colleges and{" "}
            {formatNumber(stats.totalSeats)} MBBS seats — counseling procedures, domicile rules, and fee structures in {config.name}.
          </p>

          <div className="rp-trio max-w-xl">
            <div className="rp-trio-card">
              <span className="rp-trio-k">Colleges</span>
              <p className="rp-trio-b text-on-surface">{formatNumber(stats.totalColleges)}</p>
            </div>
            <div className="rp-trio-card">
              <span className="rp-trio-k">Govt Seats</span>
              <p className="rp-trio-b text-on-surface">{formatNumber(stats.govtSeats)}</p>
            </div>
            <div className="rp-trio-card">
              <span className="rp-trio-k">Private Seats</span>
              <p className="rp-trio-b text-on-surface">{formatNumber(stats.pvtSeats)}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button as="link" href="/cutoff-analyser" variant="primary">
              Check {config.name} cutoffs
            </Button>
            <Button as="link" href="#colleges-list" variant="secondary">
              View colleges
            </Button>
          </div>
          <p className="rp-hero-fine">Data updated for {MBBS_ACADEMIC_SESSION} counseling cycle</p>
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
        "mt-6 flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-5 md:py-5",
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

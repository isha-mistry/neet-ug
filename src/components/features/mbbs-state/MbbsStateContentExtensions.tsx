"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  GuideCard,
  SubsectionTitle,
} from "@/components/features/mbbs-india/MbbsIndiaParts";
import type { MbbsStateConfig } from "@/lib/mbbs-state/types";
import { guideTableClass, guideTableWrapClass } from "@/lib/mbbs-india/section-styles";
import { cn, formatNumber } from "@/lib/utils";

function useExt(config: MbbsStateConfig) {
  return config.contentExtensions;
}

export function WhyChooseGujaratBlock({ config }: { config: MbbsStateConfig }) {
  const points = useExt(config)?.whyChoose;
  if (!points?.length) return null;
  return (
    <section id="why-choose" className="scroll-mt-28">
      <GuideCard>
        <SubsectionTitle>Why choose {config.name} for MBBS?</SubsectionTitle>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-on-surface-variant">
          {points.map((point) => (
            <li key={point.slice(0, 48)}>{point}</li>
          ))}
        </ul>
      </GuideCard>
    </section>
  );
}

export function UgSeatMatrixBlock({ config }: { config: MbbsStateConfig }) {
  const ext = useExt(config);
  if (!ext?.undergradSeatSegments?.length) return null;
  return (
    <GuideCard>
      <SubsectionTitle>Undergraduate (MBBS) seat matrix — {config.name}</SubsectionTitle>
      <ul className="mt-3 space-y-4">
        {ext.undergradSeatSegments.map((seg) => (
          <li key={seg.title}>
            <p className="text-sm font-semibold text-on-surface">{seg.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{seg.detail}</p>
          </li>
        ))}
      </ul>
      {ext.pgMdMsSeats ? (
        <p className="mt-4 text-xs text-outline">
          PG (MD/MS) seats statewide (reference): {formatNumber(ext.pgMdMsSeats)} — verify on
          ACPPGMEC / medadmgujarat.org.
        </p>
      ) : null}
    </GuideCard>
  );
}

export function GovtSeatMatrixBlock({ config }: { config: MbbsStateConfig }) {
  const tables = useExt(config)?.govtSeatMatrix;
  if (!tables?.length) return null;
  return (
    <div className="mt-8 flex flex-col gap-8">
      {tables.map((table, tableIndex) => (
        <div key={table.title}>
          {tableIndex === 0 ? (
            <section id="govt-seat-matrix" className="scroll-mt-28">
              <SubsectionTitle>{table.title}</SubsectionTitle>
            </section>
          ) : (
            <SubsectionTitle>{table.title}</SubsectionTitle>
          )}
          <div className={cn(guideTableWrapClass, "mt-3")}>
            <table className={cn(guideTableClass, "min-w-[640px] [&_td]:tabular-nums")}>
              <thead>
                <tr>
                  {table.headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.college}>
                    <td className="font-medium text-on-surface">
                      {row.slug ? (
                        <Link href={`/colleges/${row.slug}`} className="text-primary hover:underline">
                          {row.college}
                        </Link>
                      ) : (
                        row.college
                      )}
                    </td>
                    {row.cells.map((cell, i) => (
                      <td key={`${row.college}-${i}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="text-xs text-outline">
        Category-wise OPEN / SC / ST / SEBC splits are published in the ACPUGMEC seat matrix PDF each
        year — use our{" "}
        <Link href={`/colleges/state/${config.slug}`} className="text-primary hover:underline">
          full {config.name} college directory
        </Link>{" "}
        for campus-level seat and fee detail.
      </p>
    </div>
  );
}

export function NeetCounselingEligibilityBlock({ config }: { config: MbbsStateConfig }) {
  const rules = useExt(config)?.neetCounselingEligibility;
  if (!rules?.length) return null;
  return (
    <GuideSectionShell id="eligibility" title={`NEET-UG eligibility — ${config.name} counselling`}>
      <GuideCard>
        <p className="text-sm text-on-surface-variant">
          In addition to domicile rules below, {config.counselingAuthorityShort} expects candidates to
          meet national NEET and board requirements:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-on-surface-variant">
          {rules.map((rule) => (
            <li key={rule.slice(0, 40)}>{rule}</li>
          ))}
        </ul>
      </GuideCard>
    </GuideSectionShell>
  );
}

export function FeeScheduleTablesBlock({ config }: { config: MbbsStateConfig }) {
  const tables = useExt(config)?.feeScheduleTables;
  if (!tables?.length) return null;
  return (
    <div className="mt-6 flex flex-col gap-6">
      {tables.map((table) => (
        <div key={table.title}>
          <SubsectionTitle>{table.title}</SubsectionTitle>
          <div className={cn(guideTableWrapClass, "mt-3")}>
            <table className={guideTableClass}>
              <thead>
                <tr>
                  {table.headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className={ci === 0 ? "font-medium" : "tabular-nums"}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="text-xs text-outline">
        Amounts are per state fee fixation / NMC orders for the admission year — confirm on
        medadmgujarat.org before payment.
      </p>
    </div>
  );
}

export function ServiceBondRulesBlock({ config }: { config: MbbsStateConfig }) {
  const rules = useExt(config)?.bondServiceRules;
  if (!rules?.length) return null;
  return (
    <GuideSectionShell id="service-bond" title={`MBBS service bond & penalty — ${config.name}`}>
      <GuideCard>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-on-surface-variant">
          {rules.map((rule) => (
            <li key={rule.slice(0, 48)}>{rule}</li>
          ))}
        </ul>
      </GuideCard>
    </GuideSectionShell>
  );
}

function GuideSectionShell({
  id,
  title,
  embedded,
  children,
}: {
  id: string;
  title: string;
  embedded?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-12 md:py-16", embedded && "py-8 md:py-10")}>
      <header className="mb-6 w-full border-l-4 border-primary pl-5">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface md:text-headline-lg">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

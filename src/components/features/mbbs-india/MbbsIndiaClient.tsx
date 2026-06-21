"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/features/content/FaqList";
import { IndiaStatesMap } from "@/components/features/colleges/directory/IndiaStatesMap";
import {
  GuideCard,
  GuideHelpLink,
  GuideSection,
  GuideSteps,
  MbbsIndiaHero,
  MetricGrid,
  ProseBlock,
  RelatedLinksGrid,
  SubsectionTitle,
  SummaryHighlights,
} from "./MbbsIndiaParts";
import { SeatTrendChart } from "./SeatTrendChart";
import { StateMatrixTable } from "./StateMatrixTable";
import { GuidePageJumpNav } from "./GuidePageJumpNav";
import { MBBS_INDIA_JUMP_SECTIONS } from "@/lib/mbbs-india/constants";
import {
  AIQ_GOVT_CUTOFFS,
  CHANCES_OPTIONS,
  CHANCES_STATS,
  COUNSELING_AIQ_STEPS,
  COUNSELING_DOCUMENTS,
  COUNSELING_STATE_STEPS,
  COUNSELING_TIMELINE,
  FEE_STRUCTURE,
  FOCUS_STATE_COUNSELORS,
  MBBS_INDIA_FAQ,
  NEET_ELIGIBILITY_POINTS,
  NEET_EXAM_PATTERN,
  NEET_QUALIFYING_PERCENTILES,
  NIRF_TOP_GOVT_COLLEGES,
  OVERVIEW_PARAGRAPHS,
  PG_AFTER_MBBS,
  RELATED_PAGES,
  SCORE_TO_RANK_REFERENCE,
  SEAT_TRENDS,
  SEAT_TREND_ANALYSIS,
  SUMMARY_STATS,
} from "@/lib/mbbs-india/content";
import {
  GOVT_ONLY_STATES_NOTE,
  NMC_INDIA_TOTALS,
  STATE_MATRIX,
} from "@/lib/mbbs-india/state-matrix";
import {
  guideTableClass,
  guideTableLabelNumericColsClass,
  guideTableRankNameNumericColsClass,
  guideTableWrapClass,
} from "@/lib/mbbs-india/section-styles";
import type { CatalogSeatBreakdown } from "@/lib/mbbs/catalog-aggregates";
import { MBBS_ACADEMIC_SESSION } from "@/lib/mbbs/constants";
import type { StateMapRichStat } from "@/lib/mbbs-india/state-map-rich-stats";
import { cn, formatNumber } from "@/lib/utils";

interface MbbsIndiaClientProps {
  mapStats: StateMapRichStat[];
  catalog: CatalogSeatBreakdown;
}

function catalogSummaryHighlights(catalog: CatalogSeatBreakdown) {
  return [
    { label: "Medical colleges", value: formatNumber(catalog.totalColleges) },
    { label: "MBBS seats", value: formatNumber(catalog.totalSeats) },
    { label: "Government seats", value: formatNumber(catalog.govtSeats) },
    { label: "Private seats", value: formatNumber(catalog.pvtSeats) },
  ] as const;
}

function mergeSummaryStats(_catalog: CatalogSeatBreakdown) {
  return SUMMARY_STATS;
}

export function MbbsIndiaClient({ mapStats, catalog }: MbbsIndiaClientProps) {
  const summaryHighlights = catalogSummaryHighlights(catalog);
  const summaryStats = mergeSummaryStats(catalog);
  return (
    <div className="bg-surface-container-lowest">
      <Container size="2xl" className="pb-4 pt-2">
        <MbbsIndiaHero catalog={catalog} />
      </Container>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant bg-surface-container-lowest/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={MBBS_INDIA_JUMP_SECTIONS} />
        </Container>
      </nav>

      <Container size="2xl" className="pb-16 pt-2 lg:pt-4">
        <div className="lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[12.5rem_minmax(0,1fr)] xl:gap-10">
          <aside
            className={cn(
              "sticky top-[4.25rem] z-20 hidden max-h-[calc(100dvh-4.5rem)] self-start overflow-y-auto overscroll-contain",
              "lg:col-start-1 lg:row-start-1 lg:block lg:w-full"
            )}
          >
            <GuidePageJumpNav variant="sidebar" jumpSections={MBBS_INDIA_JUMP_SECTIONS} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection
              embedded
              id="colleges-seats"
              eyebrow="At a glance"
              title="Quick summary & overview"
              description="National MBBS numbers alongside context on NEET, NMC, and how admissions work in India."
            >
              <div className="flex w-full flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                    Key statistics
                  </h3>
                  <SummaryHighlights items={[...summaryHighlights]} />
                  <GuideCard padding={false}>
                    <table
                      className={cn(
                        guideTableClass,
                        "[&_th]:w-[48%] [&_th]:bg-surface-container-low/80 [&_th]:font-semibold"
                      )}
                    >
                      <tbody>
                        {summaryStats.map((row) => (
                          <tr key={row.label}>
                            <th scope="row" className="text-left text-on-surface">
                              {row.label}
                            </th>
                            <td className="text-on-surface-variant">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GuideCard>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                    Overview of MBBS in India
                  </h3>
                  <GuideCard>
                    <ProseBlock>
                      {OVERVIEW_PARAGRAPHS.map((p) => (
                        <p key={p.slice(0, 40)}>{p}</p>
                      ))}
                    </ProseBlock>
                  </GuideCard>
                  <GuideHelpLink />
                </div>
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="states-map"
              title="Medical colleges & MBBS seats by state"
              description="Darker states have more MBBS seats. Click a state to open its college directory."
            >
              <GuideCard padding={false} className="overflow-x-hidden">
                <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 md:px-6">
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    Darker states have more MBBS seats. Southern and western states lead in
                    private college capacity; several northeastern states and UTs have fewer seats.
                  </p>
                </div>
                <IndiaStatesMap
                  stats={mapStats}
                  layout="wide"
                  metric="seats"
                  className="rounded-none border-0 shadow-none"
                />
              </GuideCard>
            </GuideSection>

            <GuideSection embedded title="State-wise medical college & seat matrix">
              <StateMatrixTable rows={STATE_MATRIX} totals={NMC_INDIA_TOTALS} />
              <p className="text-sm text-on-surface-variant">{GOVT_ONLY_STATES_NOTE}</p>
            </GuideSection>

            <GuideSection embedded id="seat-trends" title="MBBS seat trends (2017–2025)">
              <div className={guideTableWrapClass}>
                <table
                  className={cn(
                    guideTableClass,
                    guideTableLabelNumericColsClass,
                    "min-w-[880px] text-xs sm:text-sm"
                  )}
                >
                  <thead>
                    <tr>
                      {[
                        "Year",
                        "Govt colleges",
                        "Pvt colleges",
                        "Total colleges",
                        "Govt seats",
                        "Pvt seats",
                        "Total seats",
                        "NEET (L)",
                        "Govt %",
                        "Overall %",
                      ].map((h) => (
                        <th key={h} className="whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SEAT_TRENDS.map((row) => (
                      <tr key={row.year}>
                        <td className="font-semibold text-on-surface">{row.year}</td>
                        <td className="tabular-nums">{formatNumber(row.govtColleges)}</td>
                        <td className="tabular-nums">{formatNumber(row.privateColleges)}</td>
                        <td className="tabular-nums">{formatNumber(row.totalColleges)}</td>
                        <td className="tabular-nums">{formatNumber(row.govtSeats)}</td>
                        <td className="tabular-nums">{formatNumber(row.privateSeats)}</td>
                        <td className="tabular-nums font-semibold">{formatNumber(row.totalSeats)}</td>
                        <td className="tabular-nums">{row.neetApplicantsLakh.toFixed(2)}</td>
                        <td className="tabular-nums">{row.govtSeatChancePct.toFixed(2)}%</td>
                        <td className="tabular-nums">{row.overallChancePct.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <GuideCard>
                <SeatTrendChart rows={SEAT_TRENDS} />
              </GuideCard>
              <GuideCard>
                <ProseBlock>
                  {SEAT_TREND_ANALYSIS.map((p) => (
                    <p key={p.slice(0, 36)}>{p}</p>
                  ))}
                </ProseBlock>
              </GuideCard>
            </GuideSection>

            <GuideSection embedded id="cutoff-ranks" title="Cutoff ranks — AIQ government MBBS">
              <div className={guideTableWrapClass}>
                <table
                  className={cn(
                    guideTableClass,
                    guideTableLabelNumericColsClass,
                    "min-w-[640px]"
                  )}
                >
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>AIQ open 2025</th>
                      <th>AIQ close 2025</th>
                      <th>AIQ open 2024</th>
                      <th>AIQ close 2024</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AIQ_GOVT_CUTOFFS.map((row) => (
                      <tr key={row.category}>
                        <td className="font-medium">{row.category}</td>
                        <td className="tabular-nums">{formatNumber(row.aiqOpening2025)}</td>
                        <td className="tabular-nums">{formatNumber(row.aiqClosing2025)}</td>
                        <td className="tabular-nums">{formatNumber(row.aiqOpening2024)}</td>
                        <td className="tabular-nums">{formatNumber(row.aiqClosing2024)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <GuideCard className="flex flex-col gap-4 border-primary/20 bg-linear-to-br from-surface-container-lowest via-surface-container-lowest to-primary-fixed/30 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <SubsectionTitle>Check your NEET score</SubsectionTitle>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    Estimate rank range and compare colleges in Gujarat, Rajasthan, MP, and Maharashtra.
                  </p>
                </div>
                <Button as="link" href="/cutoff-analyser" variant="primary" className="shrink-0">
                  Open Cutoff Analyser
                </Button>
              </GuideCard>
              <div className="grid gap-6 md:grid-cols-2">
                <GuideCard>
                  <SubsectionTitle>Score → rank reference</SubsectionTitle>
                  <ul className="mt-3 space-y-1.5 text-sm text-on-surface-variant">
                    {SCORE_TO_RANK_REFERENCE.map((r) => (
                      <li key={r.score}>
                        <span className="font-semibold text-on-surface">{r.score} marks</span> ≈ rank{" "}
                        {r.approxRank}
                      </li>
                    ))}
                  </ul>
                </GuideCard>
                <GuideCard>
                  <SubsectionTitle>Qualifying percentiles</SubsectionTitle>
                  <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
                    {NEET_QUALIFYING_PERCENTILES.map((r) => (
                      <li key={r.category}>
                        <span className="font-semibold text-on-surface">{r.category}:</span>{" "}
                        {r.percentile} — {r.note}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-outline">
                    Qualifying NEET is not the same as getting a seat — ranks must match counseling cutoffs.
                  </p>
                </GuideCard>
              </div>
            </GuideSection>

            <GuideSection embedded id="fee-structure" title="Fee structure of MBBS in India">
              <div className="grid gap-4 md:grid-cols-2">
                <GuideCard>
                  <SubsectionTitle>Government colleges</SubsectionTitle>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {FEE_STRUCTURE.govtIntro}
                  </p>
                </GuideCard>
                <GuideCard>
                  <SubsectionTitle>NRI quota</SubsectionTitle>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{FEE_STRUCTURE.nri}</p>
                </GuideCard>
              </div>
              <GuideCard>
                <SubsectionTitle>Private management quota (focus states)</SubsectionTitle>
                <ul className="mt-3 divide-y divide-outline-variant/40 text-sm">
                  {FEE_STRUCTURE.focusStates.map((s) => (
                    <li
                      key={s.state}
                      className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:justify-between"
                    >
                      <span className="font-semibold text-on-surface">{s.state}</span>
                      <span className="text-on-surface-variant">
                        Govt {s.govtRange} · FRC cap {s.privateCap}
                      </span>
                    </li>
                  ))}
                </ul>
              </GuideCard>
              <GuideCard>
                <SubsectionTitle>Other costs & bonds</SubsectionTitle>
                <p className="mt-2 text-sm text-on-surface-variant">{FEE_STRUCTURE.otherCosts}</p>
                <p className="mt-4 rounded-xl bg-primary-fixed/40 p-4 text-sm font-medium text-on-surface">
                  {FEE_STRUCTURE.comparison}
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection embedded id="counseling-process" title="MBBS admission process — step by step">
              <div className="grid gap-6 lg:grid-cols-2">
                <GuideCard>
                  <SubsectionTitle>Track A — AIQ 15% (MCC)</SubsectionTitle>
                  <div className="mt-4">
                    <GuideSteps steps={COUNSELING_AIQ_STEPS} />
                  </div>
                </GuideCard>
                <GuideCard>
                  <SubsectionTitle>Track B — State 85%</SubsectionTitle>
                  <div className="mt-4">
                    <GuideSteps steps={COUNSELING_STATE_STEPS} />
                  </div>
                </GuideCard>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {FOCUS_STATE_COUNSELORS.map((s) => (
                  <div
                    key={s.state}
                    className="rounded-[14px] border border-outline-variant bg-surface-container-lowest px-4 py-3.5 shadow-sm"
                  >
                    <p className="font-semibold text-on-surface">{s.state}</p>
                    <p className="text-sm text-on-surface-variant">{s.authority}</p>
                    <a
                      href={`https://${s.portal}`}
                      className="mt-1 inline-block text-xs font-semibold text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.portal}
                    </a>
                  </div>
                ))}
              </div>
              <GuideCard>
                <SubsectionTitle>Document checklist</SubsectionTitle>
                <ul className="mt-3 grid gap-2 text-sm text-on-surface-variant sm:grid-cols-2">
                  {COUNSELING_DOCUMENTS.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </GuideCard>
            </GuideSection>

            <GuideSection embedded id="your-chances" title="Your chances of getting an MBBS seat">
              <MetricGrid items={CHANCES_STATS} />
              <p className="text-sm text-on-surface-variant">
                Reserved categories improve relative odds within category lists, but absolute competition
                remains intense because seat counts are fixed nationally.
              </p>
              <SubsectionTitle>What if you don&apos;t get a government seat?</SubsectionTitle>
              <ul className="grid gap-3 md:grid-cols-2">
                {CHANCES_OPTIONS.map((opt, i) => (
                  <li key={opt.title}>
                    <GuideCard className="h-full">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Option {i + 1}
                      </p>
                      <p className="mt-1 font-semibold text-on-surface">{opt.title}</p>
                      <p className="mt-2 text-sm text-on-surface-variant">{opt.body}</p>
                    </GuideCard>
                  </li>
                ))}
              </ul>
              <GuideHelpLink />
            </GuideSection>

            <GuideSection embedded title="Top government medical colleges (NIRF)">
              <div className={guideTableWrapClass}>
                <table
                  className={cn(
                    guideTableClass,
                    guideTableRankNameNumericColsClass,
                    "min-w-[900px] text-xs sm:text-sm"
                  )}
                >
                  <thead>
                    <tr>
                      {["Rank", "College", "City", "State", "Fee / year", "Seats", "AIQ", "State quota"].map(
                        (h) => (
                          <th key={h}>{h}</th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {NIRF_TOP_GOVT_COLLEGES.map((c) => (
                      <tr key={c.rank}>
                        <td className="tabular-nums font-semibold">{c.rank}</td>
                        <td className="font-medium">{c.name}</td>
                        <td>{c.city}</td>
                        <td>{c.state}</td>
                        <td className="whitespace-nowrap">{c.feeApprox}</td>
                        <td className="tabular-nums">{c.seats}</td>
                        <td className="tabular-nums">{c.aiqSeats}</td>
                        <td className="tabular-nums">{c.stateSeats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-on-surface-variant">
                AIIMS institutions (23 nationwide) follow dedicated AIQ counseling rules alongside MCC.{" "}
                <Link href="/colleges" className="font-semibold text-primary hover:underline">
                  View all colleges
                </Link>
              </p>
            </GuideSection>

            <GuideSection embedded id="neet-exam" title="NEET UG exam pattern & eligibility">
              <div className="grid gap-6 md:grid-cols-2">
                <GuideCard>
                  <SubsectionTitle>Eligibility</SubsectionTitle>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-on-surface-variant">
                    {NEET_ELIGIBILITY_POINTS.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </GuideCard>
                <GuideCard>
                  <SubsectionTitle>Exam pattern</SubsectionTitle>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-on-surface-variant">
                    {NEET_EXAM_PATTERN.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </GuideCard>
              </div>
            </GuideSection>

            <GuideSection embedded title={`NEET UG counseling ${MBBS_ACADEMIC_SESSION} — timeline`}>
              <GuideCard>
                <ul className="space-y-4 border-l-2 border-primary/40 pl-5">
                  {COUNSELING_TIMELINE.map((ev) => (
                    <li key={ev.label} className="relative text-sm">
                      <span className="absolute -left-[1.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary-fixed/50" />
                      <span className="font-semibold text-on-surface">{ev.date}</span>
                      <span className="text-on-surface-variant"> — {ev.label}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-outline">
                  Estimated interactive schedule based on five-year trends (aligned with our{" "}
                  <Link href="/counselling" className="font-semibold text-primary hover:underline">
                    counselling hub
                  </Link>
                  ). You may participate in AIQ and state counseling together. Reporting is mandatory to
                  retain a seat. Verify dates on{" "}
                  <a
                    href="https://mcc.nic.in"
                    className="font-semibold text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    mcc.nic.in
                  </a>{" "}
                  and state portals before registering.
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection embedded id="pg-after-mbbs" title="PG options after MBBS">
              <div className="grid gap-4 md:grid-cols-2">
                {(
                  [
                    ["NEET PG / MD / MS", PG_AFTER_MBBS.neetPg],
                    ["NEXT exam", PG_AFTER_MBBS.next],
                    ["Super-specialization", PG_AFTER_MBBS.superSpecialty],
                    ["Diploma, DNB & careers", PG_AFTER_MBBS.otherPaths],
                  ] as const
                ).map(([title, body]) => (
                  <GuideCard key={title}>
                    <SubsectionTitle>{title}</SubsectionTitle>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{body}</p>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            <GuideSection embedded title="Student stories">
              <GuideCard className="border border-dashed border-outline-variant bg-surface-container-low text-center">
                <span className="material-symbols-outlined text-4xl text-outline">forum</span>
                <h3 className="mt-3 text-lg font-bold text-on-surface">Coming soon — our students speak</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-on-surface-variant">
                  Verified counseling success stories with NEET scores, quotas, and colleges allotted.
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection embedded id="faq" title="Frequently asked questions">
              <FaqList items={MBBS_INDIA_FAQ} />
            </GuideSection>

            <GuideSection embedded title="Related guides">
              <RelatedLinksGrid links={RELATED_PAGES} />
            </GuideSection>
          </div>
        </div>
      </Container>
    </div>
  );
}

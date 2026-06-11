"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/features/content/FaqList";
import {
  GuideCard,
  GuideHelpLink,
  GuideSection,
  GuideSteps,
  ProseBlock,
  RelatedLinksGrid,
  SubsectionTitle,
} from "@/components/features/mbbs-india/MbbsIndiaParts";
import { GuidePageJumpNav } from "@/components/features/mbbs-india/GuidePageJumpNav";
import { StateCollegeTable } from "./StateCollegeTable";
import {
  FeeScheduleTablesBlock,
  GovtSeatMatrixBlock,
  NeetCounselingEligibilityBlock,
  ServiceBondRulesBlock,
  UgSeatMatrixBlock,
  WhyChooseGujaratBlock,
} from "./MbbsStateContentExtensions";
import {
  buildStateSummaryRows,
  MbbsStateHero,
  StateCollegesExploreCta,
  StateSummaryHighlights,
} from "./MbbsStateParts";
import { buildMbbsStateJumpSections } from "@/lib/mbbs-state/jump-nav";
import { MBBS_ACADEMIC_SESSION } from "@/lib/mbbs/constants";
import type { MbbsStateConfig, StateCollegeTableRow } from "@/lib/mbbs-state/types";
import {
  guideTableClass,
  guideTableLabelNumericColsClass,
  guideTableWrapClass,
} from "@/lib/mbbs-india/section-styles";
import { MBBS_INDIA_PAGE_PATH } from "@/lib/mbbs-india/constants";
import { cn, formatNumber } from "@/lib/utils";

interface MbbsStateClientProps {
  config: MbbsStateConfig;
  colleges: StateCollegeTableRow[];
  relatedStateLinks: { label: string; href: string }[];
}

export function MbbsStateClient({
  config,
  colleges,
  relatedStateLinks,
}: MbbsStateClientProps) {
  const summaryRows = buildStateSummaryRows(config);
  const jumpSections = buildMbbsStateJumpSections(config);

  return (
    <div className="bg-surface-container-lowest">
      <Container size="2xl" className="pb-4 pt-2">
        <MbbsStateHero config={config} />
      </Container>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={jumpSections} />
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
            <GuidePageJumpNav variant="sidebar" jumpSections={jumpSections} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
      <GuideSection
        embedded
        id="summary"
        eyebrow="At a glance"
        title={`Quick summary & overview — MBBS in ${config.name}`}
      >
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <StateSummaryHighlights config={config} />
            <GuideCard padding={false}>
              <table className={cn(guideTableClass, "[&_th]:w-[48%] [&_th]:bg-surface-container-low/80")}>
                <tbody>
                  {summaryRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="text-left font-semibold text-on-surface">
                        {row.label}
                      </th>
                      <td className="text-on-surface-variant">
                        {row.label.includes("portal") ? (
                          <a
                            href={config.counselingPortalUrl}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GuideCard>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Overview</h3>
            <GuideCard>
              <ProseBlock>
                {config.overview.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </ProseBlock>
            </GuideCard>
            <GuideHelpLink />
          </div>
          <WhyChooseGujaratBlock config={config} />
          <UgSeatMatrixBlock config={config} />
        </div>
      </GuideSection>

      <GuideSection
        embedded
        id="colleges-list"
        title={`Medical colleges in ${config.name}`}
        description={config.universityNote}
      >
        <StateCollegeTable rows={colleges} />
        <StateCollegesExploreCta config={config} />
      </GuideSection>

      <GuideSection embedded id="top-govt" title={`Top government medical colleges in ${config.name}`}>
        <div className="grid gap-4 md:grid-cols-2">
          {config.topGovtColleges.map((c) => (
            <GuideCard key={c.name} className="h-full">
              <SubsectionTitle>
                {c.slug ? (
                  <Link href={`/colleges/${c.slug}`} className="hover:underline">
                    {c.name}
                  </Link>
                ) : (
                  c.name
                )}
              </SubsectionTitle>
              <p className="mt-1 text-sm text-on-surface-variant">
                {c.city} · Est. {c.established} · {formatNumber(c.seats)} MBBS seats (AIQ{" "}
                {formatNumber(c.aiqSeats)})
              </p>
              <ul className="mt-3 space-y-1 text-sm text-on-surface-variant">
                <li>
                  <span className="font-semibold text-on-surface">Closing rank (Gen):</span> ~
                  {formatNumber(c.closingRankGeneral)}
                </li>
                <li>
                  <span className="font-semibold text-on-surface">Fee:</span> {c.feePerYear}/year
                </li>
                <li>
                  <span className="font-semibold text-on-surface">Hospital beds:</span> ~
                  {formatNumber(c.beds)}
                </li>
                <li>{c.hasPg ? "MD/MS programs available" : "UG-focused campus"}</li>
                {c.bond ? <li>{c.bond}</li> : null}
              </ul>
            </GuideCard>
          ))}
        </div>
        <p className="text-sm text-on-surface-variant">
          Top government seats in {config.name} typically require NEET ranks well inside the state
          quota closing band for General category — register early on {config.counselingPortal}.
        </p>
        <GovtSeatMatrixBlock config={config} />
      </GuideSection>

      <GuideSection embedded id="cutoffs" title={`MBBS cutoff ranks in ${config.name}`}>
        <SubsectionTitle>AIQ 15% — government colleges</SubsectionTitle>
        <div className={cn(guideTableWrapClass, "mt-3")}>
          <table
            className={cn(guideTableClass, guideTableLabelNumericColsClass, "min-w-[640px]")}
          >
            <thead>
              <tr>
                <th>Category</th>
                <th>AIQ open 2025</th>
                <th>AIQ close 2025</th>
                <th>State open 2025</th>
                <th>State close 2025</th>
              </tr>
            </thead>
            <tbody>
              {config.aiqCutoffs.map((row) => (
                <tr key={row.category}>
                  <td className="font-medium">{row.category}</td>
                  <td className="tabular-nums">{formatNumber(row.aiqOpen2025)}</td>
                  <td className="tabular-nums">{formatNumber(row.aiqClose2025)}</td>
                  <td className="tabular-nums">{formatNumber(row.stateOpen2025)}</td>
                  <td className="tabular-nums">{formatNumber(row.stateClose2025)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GuideCard className="mt-4">
          <SubsectionTitle>Management quota (private)</SubsectionTitle>
          <p className="mt-2 text-sm text-on-surface-variant">{config.mgmtCutoffNote}</p>
        </GuideCard>
        <div className={cn(guideTableWrapClass, "mt-4")}>
          <table className={cn(guideTableClass, guideTableLabelNumericColsClass)}>
            <thead>
              <tr>
                <th>College</th>
                <th>Year</th>
                <th>Gen close</th>
                <th>OBC close</th>
              </tr>
            </thead>
            <tbody>
              {config.cutoffTrends.map((t) => (
                <tr key={`${t.college}-${t.year}`}>
                  <td>{t.college}</td>
                  <td>{t.year}</td>
                  <td className="tabular-nums">{formatNumber(t.generalClose)}</td>
                  <td className="tabular-nums">{formatNumber(t.obcClose)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GuideCard className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-on-surface-variant">
            Enter your NEET score to compare {config.name} cutoffs with your category and quota.
          </p>
          <Button as="link" href="/cutoff-analyser" variant="primary">
            Open Cutoff Analyser
          </Button>
        </GuideCard>
      </GuideSection>

      <NeetCounselingEligibilityBlock config={config} />

      <GuideSection embedded id="domicile" title={`Domicile & eligibility — ${config.name} state quota`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <GuideCard>
            <SubsectionTitle>What qualifies as domicile</SubsectionTitle>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-on-surface-variant">
              {config.domicile.rules.map((r) => (
                <li key={r.slice(0, 40)}>{r}</li>
              ))}
            </ul>
          </GuideCard>
          <GuideCard>
            <SubsectionTitle>Documents for domicile</SubsectionTitle>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-on-surface-variant">
              {config.domicile.documents.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </GuideCard>
        </div>
        <GuideCard>
          <p className="text-sm text-on-surface-variant">
            <strong className="text-on-surface">Non-domicile students:</strong>{" "}
            {config.domicile.nonDomicile}
          </p>
          <p className="mt-3 text-sm text-on-surface-variant">
            <strong className="text-on-surface">Reservation:</strong> {config.domicile.reservation}
          </p>
          <p className="mt-3 text-sm text-on-surface-variant">
            <strong className="text-on-surface">Bond:</strong> {config.domicile.bond}
          </p>
        </GuideCard>
      </GuideSection>

      <GuideSection embedded id="counseling" title={`State counseling — ${config.counselingAuthorityShort}`}>
        <GuideCard>
          <GuideSteps steps={config.counselingSteps} />
        </GuideCard>
        <GuideCard>
          <SubsectionTitle>Important rules</SubsectionTitle>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-on-surface-variant">
            {config.counselingRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            Official portal:{" "}
            <a
              href={config.counselingPortalUrl}
              className="font-semibold text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.counselingPortalUrl}
            </a>
          </p>
        </GuideCard>
      </GuideSection>

      <GuideSection embedded id="fees" title={`Fee structure — MBBS in ${config.name}`}>
        <div className="grid gap-4 md:grid-cols-2">
          <GuideCard>
            <SubsectionTitle>Government colleges</SubsectionTitle>
            <p className="mt-2 text-sm text-on-surface-variant">{config.fees.govt}</p>
          </GuideCard>
          <GuideCard>
            <SubsectionTitle>Private management quota</SubsectionTitle>
            <p className="mt-2 text-sm text-on-surface-variant">{config.fees.private}</p>
          </GuideCard>
          <GuideCard>
            <SubsectionTitle>NRI quota</SubsectionTitle>
            <p className="mt-2 text-sm text-on-surface-variant">{config.fees.nri}</p>
          </GuideCard>
          <GuideCard>
            <SubsectionTitle>Hostel & living</SubsectionTitle>
            <p className="mt-2 text-sm text-on-surface-variant">{config.fees.hostel}</p>
          </GuideCard>
        </div>
        <GuideCard>
          <SubsectionTitle>Bond penalty</SubsectionTitle>
          <p className="mt-2 text-sm text-on-surface-variant">{config.fees.bondPenalty}</p>
          <table className={cn(guideTableClass, "mt-4")}>
            <thead>
              <tr>
                <th>Seat type</th>
                <th>Indicative 5.5-year total</th>
              </tr>
            </thead>
            <tbody>
              {config.fees.comparison.map((row) => (
                <tr key={row.label}>
                  <td className="font-medium">{row.label}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GuideCard>
        <FeeScheduleTablesBlock config={config} />
      </GuideSection>

      <ServiceBondRulesBlock config={config} />

      <GuideSection embedded id="seats-data" title={`MBBS seat distribution in ${config.name}`}>
        <GuideCard>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {config.seatDistribution.analysis}
          </p>
          <p className="mt-3 text-sm text-on-surface-variant">{config.seatDistribution.vsNational}</p>
        </GuideCard>
        <div className={guideTableWrapClass}>
          <table className={cn(guideTableClass, guideTableLabelNumericColsClass)}>
            <thead>
              <tr>
                <th>City</th>
                <th>Colleges</th>
                <th>Seats</th>
              </tr>
            </thead>
            <tbody>
              {config.seatDistribution.byCity.map((c) => (
                <tr key={c.city}>
                  <td>{c.city}</td>
                  <td className="tabular-nums">{c.colleges}</td>
                  <td className="tabular-nums">{formatNumber(c.seats)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={guideTableWrapClass}>
          <table className={cn(guideTableClass, guideTableLabelNumericColsClass)}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Total MBBS seats</th>
              </tr>
            </thead>
            <tbody>
              {config.seatDistribution.growth.map((g) => (
                <tr key={g.year}>
                  <td>{g.year}</td>
                  <td className="tabular-nums">{formatNumber(g.seats)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection embedded title={`${config.name} vs other states`}>
        <GuideCard>
          <ul className="list-disc space-y-2 pl-5 text-sm text-on-surface-variant">
            {config.vsOtherStates.map((p) => (
              <li key={p.slice(0, 40)}>{p}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-on-surface">{config.vsRecommendation}</p>
        </GuideCard>
      </GuideSection>

      <GuideSection embedded title={`Admission timeline ${config.name} ${MBBS_ACADEMIC_SESSION}`}>
        <GuideCard>
          <ul className="space-y-3 border-l-2 border-primary/40 pl-5">
            {config.timeline.map((ev) => (
              <li key={ev.label} className="relative text-sm">
                <span className="absolute -left-[1.35rem] top-1.5 h-2 w-2 rounded-full bg-primary" />
                <span className="font-semibold text-on-surface">{ev.date}</span>
                <span className="text-on-surface-variant"> — {ev.label}</span>
                {ev.track === "mcc" ? (
                  <span className="ml-1 text-xs text-primary">(MCC)</span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-outline">
            Dates are indicative — confirm on{" "}
            <a href={config.counselingPortalUrl} className="text-primary hover:underline">
              {config.counselingPortal}
            </a>{" "}
            and mcc.nic.in.
          </p>
        </GuideCard>
      </GuideSection>

      <GuideSection embedded id="your-chances" title={`Your chances in ${config.name}`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {config.chances.stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-outline-variant/30 bg-surface p-4 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-outline">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-bold text-primary">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-on-surface-variant">
          ~{formatNumber(config.chances.stateQuotaGovtSeats)} state-quota government seats vs{" "}
          {config.chances.neetApplicantsState} NEET applicants from {config.name}.
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          {config.chances.options.map((opt) => (
            <li key={opt.title}>
              <GuideCard className="h-full">
                <p className="font-semibold text-on-surface">{opt.title}</p>
                <p className="mt-2 text-sm text-on-surface-variant">{opt.body}</p>
              </GuideCard>
            </li>
          ))}
        </ul>
        <GuideHelpLink />
      </GuideSection>

      <GuideSection embedded title="Documents for counseling" id="documents">
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["Academic", config.documents.academic],
              ["Identity & domicile", config.documents.identity],
              ["Category", config.documents.category],
              ["NRI (if applicable)", config.documents.nri],
            ] as const
          ).map(([title, items]) => (
            <GuideCard key={title}>
              <SubsectionTitle>{title}</SubsectionTitle>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-on-surface-variant">
                {items.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </GuideCard>
          ))}
        </div>
        <GuideCard>
          <p className="text-sm text-on-surface-variant">{config.documents.photos}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-on-surface-variant">
            {config.documents.stateSpecific.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </GuideCard>
      </GuideSection>

      <GuideSection embedded title="Student stories">
        <GuideCard className="border border-dashed text-center">
          <p className="text-lg font-bold text-on-surface">
            Coming soon — stories from {config.name} students
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-on-surface-variant">
            We will publish verified admission journeys through {config.counselingAuthorityShort}.
          </p>
        </GuideCard>
      </GuideSection>

      <GuideSection embedded id="faq" title={`FAQ — MBBS in ${config.name}`}>
        <FaqList items={config.faq} />
      </GuideSection>

      <GuideSection embedded title="Explore more">
        <RelatedLinksGrid
          links={[
            { label: "MBBS in India", href: MBBS_INDIA_PAGE_PATH },
            ...relatedStateLinks,
            { label: "Cutoff Analyser", href: "/cutoff-analyser" },
            { label: "MCC AIQ quota guide", href: "/quota/general" },
            { label: "All colleges directory", href: "/colleges" },
            ...config.topGovtColleges
              .filter((c) => c.slug)
              .slice(0, 3)
              .map((c) => ({
                label: c.name,
                href: `/colleges/${c.slug}`,
              })),
          ]}
        />
      </GuideSection>
          </div>
        </div>
      </Container>
    </div>
  );
}

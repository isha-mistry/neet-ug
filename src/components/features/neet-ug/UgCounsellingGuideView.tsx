"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { GuidePageJumpNav } from "@/components/features/mbbs-india/GuidePageJumpNav";
import {
  GuideCard,
  GuideSection,
  GuideSteps,
  MetricGrid,
} from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import { ChronologyJourney } from "@/components/features/neet-ug/counselling/ChronologyJourney";
import { CounsellingFeeTable } from "@/components/features/neet-ug/counselling/CounsellingFeeTable";
import { CounsellingRounds } from "@/components/features/neet-ug/counselling/CounsellingRounds";
import { DocumentChecklist } from "@/components/features/neet-ug/counselling/DocumentChecklist";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { NeetUgUpdatesSidebar } from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { NeetUgHubFinalCta, NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { RpMarketingHero } from "@/components/features/rank-predictor/RankPredictorParts";
import { mccCounsellingGuide } from "@/lib/data/mcc-counselling";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";
import {
  NEET_UG_COUNSELLING_COMPARISON,
  NEET_UG_COUNSELLING_HERO,
  NEET_UG_COUNSELLING_INTRO_PARAS,
  NEET_UG_COUNSELLING_JUMP_SECTIONS,
  NEET_UG_COUNSELLING_KEY_STATS,
  NEET_UG_COUNSELLING_LEAD_MAGNET,
  NEET_UG_COUNSELLING_MCC_COVERAGE_ROWS,
  NEET_UG_COUNSELLING_OFFICIAL_LINKS,
  NEET_UG_COUNSELLING_RELATED_LINKS,
  NEET_UG_COUNSELLING_SEAT_MATRIX_FOOTNOTE,
  NEET_UG_COUNSELLING_SEAT_MATRIX_ROWS,
  NEET_UG_COUNSELLING_SEAT_SUMMARY,
  NEET_UG_COUNSELLING_STREAMS,
} from "@/lib/neet-ug-2026/counselling-guide-content";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

export function UgCounsellingGuideView() {
  const { seatStatistics } = neetUg2026Data;
  const { roleOfMcc, candidateGuidelines, abbreviations } = mccCounsellingGuide;

  const aiqInstitutions =
    mccCounsellingGuide.chapters.aiq.openSeatsDomicileFree?.[0] ??
    "State government medical/dental colleges";

  const mccScopeRows = roleOfMcc.scope.map((row) => ({
    category: row.category,
    institutions: row.institutions,
  }));

  const mccCoverageRows = [
    {
      cat: "15% All India Quota",
      quota: "15% of state govt seats",
      by: "MCC (Central)",
      inst: aiqInstitutions,
    },
    ...NEET_UG_COUNSELLING_MCC_COVERAGE_ROWS.map((row) => ({ ...row })),
  ];

  const seatMatrixRows = NEET_UG_COUNSELLING_SEAT_MATRIX_ROWS.map((row) => ({ ...row }));

  const glanceStats = NEET_UG_COUNSELLING_KEY_STATS.map((stat, index) => {
    if (index === 2) {
      return {
        label: "MBBS seats (approx.)",
        value: `${Math.round(seatStatistics.mbbs.total / 1000)}K+\nIndia`,
      };
    }
    return { label: stat.label, value: stat.value };
  });

  return (
    <NeetUg2026Shell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Counselling guide" },
        ]}
        title={NEET_UG_COUNSELLING_HERO.title}
        titleEmphasis={NEET_UG_COUNSELLING_HERO.titleEmphasis}
        lede={NEET_UG_COUNSELLING_HERO.lede}
        trio={NEET_UG_COUNSELLING_HERO.trio}
        fine={NEET_UG_COUNSELLING_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 Counselling"
          content={NEET_UG_COUNSELLING_LEAD_MAGNET}
          formType={LEAD_FORM_TYPES.neetUgLiveUpdates}
          redirectToWhatsApp={false}
          consentFieldId="lead-neet-ug-2026-counselling-guide-consent"
        />
      </RpMarketingHero>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav
            variant="horizontal"
            jumpSections={NEET_UG_COUNSELLING_JUMP_SECTIONS}
          />
        </Container>
      </nav>

      <Container size="2xl" className="pb-4 pt-6 md:pt-8">
        <div className="mt-6 lg:hidden">
          <NeetUgUpdatesSidebar />
        </div>

        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)_minmax(17rem,20rem)] lg:items-start lg:gap-8 xl:grid-cols-[12.5rem_minmax(0,1fr)_22rem] xl:gap-10">
          <aside
            className={cn(
              "sticky top-[4.25rem] z-20 hidden max-h-[calc(100dvh-4.5rem)] self-start overflow-y-auto overscroll-contain",
              "lg:col-start-1 lg:row-start-1 lg:block lg:w-full"
            )}
          >
            <GuidePageJumpNav
              variant="sidebar"
              jumpSections={NEET_UG_COUNSELLING_JUMP_SECTIONS}
            />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection embedded id="at-a-glance" eyebrow="Snapshot" title="At a glance">
              <MetricGrid items={glanceStats} />
            </GuideSection>

            <GuideSection
              embedded
              id="overview"
              eyebrow="Fundamentals"
              title="What is NEET UG counselling?"
              description="How MCC central counselling fits with state DME/CET cells — and rules from the MCC bulletin."
            >
              <GuideCard>
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    {NEET_UG_COUNSELLING_INTRO_PARAS.map((para) => (
                      <p key={para} className="text-sm leading-relaxed text-on-surface-variant">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="w-full rounded-[14px] bg-surface-container-low p-4 md:p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                      Counselling streams
                    </p>
                    <ul className="mt-3 space-y-3">
                      {NEET_UG_COUNSELLING_STREAMS.map((stream) => (
                        <li key={stream.title} className="flex gap-2 text-sm leading-relaxed">
                          <span
                            className="material-symbols-outlined shrink-0 text-lg text-primary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                            aria-hidden
                          >
                            check_circle
                          </span>
                          <span>
                            <strong className="text-on-surface">{stream.title}:</strong>{" "}
                            {stream.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GuideCard>

              <div className="mt-8">
                <h3
                  id="mcc-intro"
                  className="scroll-mt-28 text-base font-bold text-on-surface"
                >
                  {roleOfMcc.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {roleOfMcc.summary}
                </p>
                <div className="mt-4">
                  <DataTable
                    theme="guide"
                    columns={[
                      { key: "category", label: "Counselling pool" },
                      { key: "institutions", label: "Institutions" },
                    ]}
                    rows={mccScopeRows}
                  />
                </div>
                <p className="mt-4 text-xs italic text-on-surface-variant">{roleOfMcc.limitation}</p>
              </div>

              <GuideCard className="mt-6">
                <h3 className="text-sm font-bold text-on-surface">Information for candidates</h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Mandatory rules from the MCC bulletin before registering on mcc.nic.in:
                </p>
                <div className="mt-4">
                  <GuideSteps size="compact" steps={[...candidateGuidelines]} />
                </div>
              </GuideCard>

              <GuideCard className="mt-6">
                <h3 className="text-sm font-bold text-on-surface">List of abbreviations</h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {abbreviations.map((item) => (
                    <div key={item.abbr} className="flex gap-2 py-1 text-sm">
                      <span className="shrink-0 font-bold text-primary">{item.abbr}</span>
                      <span className="text-on-surface-variant">— {item.full}</span>
                    </div>
                  ))}
                </div>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="process"
              eyebrow="Process"
              title="Chronological roadmap"
              description="Official steps from MCC registration through stray vacancy rounds."
            >
              <ChronologyJourney />
            </GuideSection>

            <GuideSection
              embedded
              id="fees"
              eyebrow="Counselling fees"
              title="Registration & security deposits"
              description="Non-refundable registration fee plus refundable security deposit — amounts vary by quota and category."
            >
              <CounsellingFeeTable />
            </GuideSection>

            <GuideSection
              embedded
              id="comparison"
              eyebrow="Comparison"
              title="AIQ central vs state quota counselling"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {NEET_UG_COUNSELLING_COMPARISON.map((card) => (
                  <GuideCard key={card.title} className="flex h-full flex-col">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary"
                      aria-hidden
                    >
                      <span className="material-symbols-outlined text-[22px] leading-none">
                        {card.icon}
                      </span>
                    </span>
                    <h3 className="mt-4 font-semibold text-on-surface">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">
                      {card.desc}
                    </p>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="mcc-coverage"
              eyebrow="Coverage"
              title="Seats under central MCC counselling"
            >
              <DataTable
                theme="guide"
                scrollable
                columns={[
                  { key: "cat", label: "Seat category" },
                  { key: "quota", label: "Quota" },
                  { key: "by", label: "Conducted by" },
                  { key: "inst", label: "Institutions included" },
                ]}
                rows={mccCoverageRows}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="rounds"
              eyebrow="Round actions"
              title="Counselling rounds & rules"
              description="Exit, upgradation, and forfeiture rules differ by round — read before you accept a seat."
            >
              <CounsellingRounds />
            </GuideSection>

            <GuideSection
              embedded
              id="seat-matrix"
              eyebrow="Seat matrix 2026"
              title="Total seats under NEET UG 2026"
              description="Indicative programme-wise split — final matrix is published before Round 1."
            >
              <MetricGrid
                items={NEET_UG_COUNSELLING_SEAT_SUMMARY.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
              <div className="mt-6">
                <DataTable
                  theme="guide"
                  scrollable
                  columns={[
                    { key: "prog", label: "Programme" },
                    { key: "govt", label: "Government", align: "right" },
                    { key: "private", label: "Private / deemed", align: "right" },
                    { key: "central", label: "Central / AIIMS", align: "right" },
                    { key: "total", label: "Total seats", align: "right" },
                  ]}
                  rows={seatMatrixRows}
                  footnote={NEET_UG_COUNSELLING_SEAT_MATRIX_FOOTNOTE}
                />
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="documents"
              eyebrow="Before reporting"
              title="Document checklist"
              description="Originals and copies ready before MCC or state portal login and college reporting."
            >
              <DocumentChecklist />
            </GuideSection>

            <GuideSection
              embedded
              id="official-links"
              eyebrow="Official resources"
              title="Counselling portals"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_COUNSELLING_OFFICIAL_LINKS.map((link) => {
                  const className = cn(
                    guideCardClass,
                    hubCardHoverClass,
                    "group block no-underline"
                  );
                  const inner = (
                    <>
                      <div className="flex items-start gap-3">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary"
                          aria-hidden
                        >
                          <span className="material-symbols-outlined text-[22px] leading-none">
                            {link.icon}
                          </span>
                        </span>
                        <div>
                          <p className="font-semibold text-on-surface group-hover:text-primary">
                            {link.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                            {link.desc}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary">
                            {link.label}
                            <span className="material-symbols-outlined text-sm">
                              {link.external ? "open_in_new" : "chevron_right"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </>
                  );
                  return link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className={className}>
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </GuideSection>

            <GuideSection embedded id="related" eyebrow="More on Dravio" title="Related guides">
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_COUNSELLING_RELATED_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(guideCardClass, hubCardHoverClass, "group block no-underline")}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-2xl text-primary"
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-on-surface group-hover:text-primary">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </GuideSection>

            <GuideSection embedded id="tools-cta" eyebrow="Plan ahead" title="Start with your score or rank">
              <NeetUgHubFinalCta />
            </GuideSection>
          </div>

          <div className="hidden lg:col-start-3 lg:row-start-1 lg:mt-0 lg:block">
            <NeetUgUpdatesSidebar />
          </div>
        </div>
      </Container>
    </NeetUg2026Shell>
  );
}

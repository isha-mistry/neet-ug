"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { GuidePageJumpNav } from "@/components/features/mbbs-india/GuidePageJumpNav";
import {
  GuideCard,
  GuideSection,
  GuideSteps,
  MetricGrid,
} from "@/components/features/mbbs-india/MbbsIndiaParts";
import { NeetTimeline } from "@/components/features/neet-ug/NeetTimeline";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import {
  UpdatesFaqBlock,
  UpdatesNoticeFeed,
} from "@/components/features/neet-ug/NeetUgUpdatesSections";
import {
  NeetUgUpdatesShell,
  NeetUgUpdatesSidebar,
} from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { NeetUgHubFinalCta } from "@/components/features/neet-ug/NeetUg2026Parts";
import { HighYieldChaptersWidget } from "@/components/features/neet-ug/shared/HighYieldChaptersWidget";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { RpMarketingHero } from "@/components/features/rank-predictor/RankPredictorParts";
import {
  NEET_UG_UPDATES_AFTER_RESULT_LINKS,
  NEET_UG_UPDATES_DATES_FOOTNOTE,
  NEET_UG_UPDATES_DOCUMENT_CHECKLIST,
  NEET_UG_UPDATES_EXAM_DAY_CHECKLIST,
  NEET_UG_UPDATES_FAQ,
  NEET_UG_UPDATES_HERO,
  NEET_UG_UPDATES_JUMP_SECTIONS,
  NEET_UG_UPDATES_KEY_STATS,
  NEET_UG_UPDATES_LEAD_MAGNET,
  NEET_UG_UPDATES_NOTICE_FEED,
  NEET_UG_UPDATES_RELATED_HUB_LINKS,
  NEET_UG_UPDATES_STATE_COUNSELLING_FOOTNOTE,
  NEET_UG_UPDATES_STATE_COUNSELLING_ROWS,
  NEET_UG_UPDATES_SUMMARY,
  NEET_UG_UPDATES_TIMELINE,
} from "@/lib/neet-ug-2026/updates-content";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

export function NeetUgUpdatesView() {
  const stateCounsellingTableRows = NEET_UG_UPDATES_STATE_COUNSELLING_ROWS.map((row) => ({
    ...row,
  }));

  const stateCounsellingColumns = [
    { key: "authority", label: "Authority" },
    { key: "round", label: "Round" },
    { key: "window", label: "Indicative window" },
    {
      key: "status",
      label: "Status",
      align: "right" as const,
      badge: true,
      badgeColorKey: "statusColor",
    },
  ];

  return (
    <NeetUgUpdatesShell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Live updates" },
        ]}
        title={NEET_UG_UPDATES_HERO.title}
        titleEmphasis={NEET_UG_UPDATES_HERO.titleEmphasis}
        lede={NEET_UG_UPDATES_HERO.lede}
        trio={NEET_UG_UPDATES_HERO.trio}
        fine={NEET_UG_UPDATES_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 Live Updates"
          content={NEET_UG_UPDATES_LEAD_MAGNET}
        />
      </RpMarketingHero>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={NEET_UG_UPDATES_JUMP_SECTIONS} />
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
            <GuidePageJumpNav variant="sidebar" jumpSections={NEET_UG_UPDATES_JUMP_SECTIONS} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection embedded id="at-a-glance" eyebrow="Snapshot" title="NEET 2026 at a glance">
              <MetricGrid
                items={NEET_UG_UPDATES_KEY_STATS.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="summary"
              eyebrow="Where we are"
              title="Quick summary"
              description="ReNEET through counselling — indicative sequencing from NTA and MCC past cycles."
            >
              <GuideCard>
                <div className="flex gap-3">
                  <span
                    className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-primary"
                    aria-hidden
                  >
                    info
                  </span>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {NEET_UG_UPDATES_SUMMARY}
                  </p>
                </div>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="notices"
              eyebrow="Official sources"
              title="Notice feed"
              description="Key NTA and MCC milestones — open the portal links for PDFs and registration windows."
            >
              <UpdatesNoticeFeed items={NEET_UG_UPDATES_NOTICE_FEED} />
            </GuideSection>

            <GuideSection
              embedded
              id="dates"
              eyebrow="Schedule"
              title="Important dates & status"
              description="Registration through state counselling — updated as official notices land."
            >
              <NeetTimeline dates={NEET_UG_UPDATES_TIMELINE} />
              <p className="mt-3 text-xs text-outline">{NEET_UG_UPDATES_DATES_FOOTNOTE}</p>
            </GuideSection>

            <GuideSection
              embedded
              id="exam-day"
              eyebrow="ReNEET"
              title="Exam-day checklist"
              description="Use before 21 June 2026 — align with the latest NTA admit card and information bulletin."
            >
              <GuideCard>
                <GuideSteps size="compact" steps={[...NEET_UG_UPDATES_EXAM_DAY_CHECKLIST]} />
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="state-counselling"
              eyebrow="Counselling"
              title="State & AIQ Round 1 (indicative)"
              description="Planning windows for our four focus states plus MCC AIQ — not official allotment dates."
            >
              <DataTable
                theme="guide"
                columns={stateCounsellingColumns}
                rows={stateCounsellingTableRows}
                footnote={NEET_UG_UPDATES_STATE_COUNSELLING_FOOTNOTE}
                scrollable
              />
            </GuideSection>

            <GuideSection
              embedded
              id="documents"
              eyebrow="Before MCC / state login"
              title="Document checklist"
              description="Keep scans ready before registration opens — formats differ slightly by portal."
            >
              <GuideCard>
                <GuideSteps size="compact" steps={[...NEET_UG_UPDATES_DOCUMENT_CHECKLIST]} />
                <p className="mt-5 border-t border-outline-variant/40 pt-4 text-sm text-on-surface-variant">
                  Step-by-step counselling:{" "}
                  <Link href="/neet-ug-2026/counselling-guide" className="font-semibold text-primary hover:underline">
                    NEET UG 2026 counselling guide
                  </Link>
                  .
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="after-result"
              eyebrow="Next steps"
              title="What to do after the result"
              description="Shortlist colleges and understand counselling before choice filling opens."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_UPDATES_AFTER_RESULT_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(guideCardClass, hubCardHoverClass, "group block no-underline")}
                  >
                    <p className="font-semibold text-on-surface group-hover:text-primary">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="faq"
              eyebrow="Questions"
              title="ReNEET, results & counselling FAQ"
              description="Quick answers — always cross-check on NTA and MCC when notices change."
            >
              <UpdatesFaqBlock items={NEET_UG_UPDATES_FAQ} />
            </GuideSection>

            <GuideSection
              embedded
              id="related"
              eyebrow="More on MedSeat"
              title="Related guides"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                {NEET_UG_UPDATES_RELATED_HUB_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      guideCardClass,
                      hubCardHoverClass,
                      "flex flex-col items-center gap-2 py-5 text-center no-underline"
                    )}
                  >
                    <span
                      className="material-symbols-outlined text-2xl text-primary"
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold text-on-surface">{item.label}</span>
                  </Link>
                ))}
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="study-plan"
              eyebrow="ReNEET prep"
              title="High-yield chapters while you wait"
              description="Focus revision on chapters with the best marks-to-effort ratio (NCERT 11 & 12)."
            >
              <HighYieldChaptersWidget showExplanatoryText={false} showHeading={false} />
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
    </NeetUgUpdatesShell>
  );
}

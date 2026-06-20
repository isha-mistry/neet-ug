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
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { NeetUgUpdatesSidebar } from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { NeetUgHubFinalCta, NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { RpMarketingHero } from "@/components/features/rank-predictor/RankPredictorParts";
import {
  NEET_UG_ANSWER_KEY_CHALLENGE_NOTE,
  NEET_UG_ANSWER_KEY_CUTOFF_TREND_FOOTNOTE,
  NEET_UG_ANSWER_KEY_CUTOFF_TREND_ROWS,
  NEET_UG_ANSWER_KEY_HERO,
  NEET_UG_ANSWER_KEY_JUMP_SECTIONS,
  NEET_UG_ANSWER_KEY_KEY_STATS,
  NEET_UG_ANSWER_KEY_LEAD_MAGNET,
  NEET_UG_ANSWER_KEY_OMR_STEPS,
  NEET_UG_ANSWER_KEY_QUALIFYING_ROWS,
  NEET_UG_ANSWER_KEY_RELATED_LINKS,
  NEET_UG_ANSWER_KEY_RESULT_STEPS,
  NEET_UG_ANSWER_KEY_SCORECARD_FIELDS,
  NEET_UG_ANSWER_KEY_TIE_BREAKING,
} from "@/lib/neet-ug-2026/answer-key-content";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

export function NeetAnswerKeyView() {
  const qualifyingRows = NEET_UG_ANSWER_KEY_QUALIFYING_ROWS.map((row) => ({ ...row }));
  const trendRows = NEET_UG_ANSWER_KEY_CUTOFF_TREND_ROWS.map((row) => ({ ...row }));

  return (
    <NeetUg2026Shell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Answer key & results" },
        ]}
        title={NEET_UG_ANSWER_KEY_HERO.title}
        titleEmphasis={NEET_UG_ANSWER_KEY_HERO.titleEmphasis}
        lede={NEET_UG_ANSWER_KEY_HERO.lede}
        trio={NEET_UG_ANSWER_KEY_HERO.trio}
        fine={NEET_UG_ANSWER_KEY_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 Answer Key"
          content={NEET_UG_ANSWER_KEY_LEAD_MAGNET}
        />
      </RpMarketingHero>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={NEET_UG_ANSWER_KEY_JUMP_SECTIONS} />
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
            <GuidePageJumpNav variant="sidebar" jumpSections={NEET_UG_ANSWER_KEY_JUMP_SECTIONS} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection embedded id="at-a-glance" eyebrow="Snapshot" title="At a glance">
              <MetricGrid
                items={NEET_UG_ANSWER_KEY_KEY_STATS.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="omr-answer-key"
              eyebrow="Official answer key"
              title="OMR sheet & provisional answer key"
              description="NTA usually releases the provisional key 7–10 days after the exam. View your scanned OMR and challenge within the window."
            >
              <GuideCard>
                <GuideSteps size="compact" steps={[...NEET_UG_ANSWER_KEY_OMR_STEPS]} />
                <p className="mt-5 border-t border-outline-variant pt-4 text-sm leading-relaxed text-on-surface-variant">
                  Portal:{" "}
                  <Link
                    href="https://neet.nta.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    neet.nta.nic.in
                  </Link>
                </p>
              </GuideCard>
              <GuideCard className="mt-4 border-tertiary/25 bg-tertiary-fixed/30">
                <h3 className="flex items-center gap-2 text-sm font-bold text-on-surface">
                  <span className="material-symbols-outlined text-lg text-tertiary" aria-hidden>
                    gavel
                  </span>
                  Challenging an answer key
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  {NEET_UG_ANSWER_KEY_CHALLENGE_NOTE}
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="results"
              eyebrow="Results"
              title="NEET 2026 result & scorecard"
              description="Results are expected in late July 2026 on the NTA portal. Your scorecard includes the fields below."
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {NEET_UG_ANSWER_KEY_SCORECARD_FIELDS.map((field) => (
                  <GuideCard key={field.label} className="flex flex-col gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary"
                      aria-hidden
                    >
                      <span className="material-symbols-outlined text-[22px] leading-none">
                        {field.icon}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-semibold text-on-surface">{field.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
                        {field.desc}
                      </p>
                    </div>
                  </GuideCard>
                ))}
              </div>

              <GuideCard className="mt-6">
                <h3 className="text-sm font-bold text-on-surface">How to check your result</h3>
                <div className="mt-4">
                  <GuideSteps size="compact" steps={[...NEET_UG_ANSWER_KEY_RESULT_STEPS]} />
                </div>
              </GuideCard>

              <GuideCard className="mt-4">
                <h3 className="text-sm font-bold text-on-surface">Tie-breaking criteria</h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  When two or more candidates score identical marks, NTA applies these rules in order:
                </p>
                <div className="mt-4">
                  <GuideSteps size="compact" steps={[...NEET_UG_ANSWER_KEY_TIE_BREAKING]} />
                </div>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="cutoffs"
              eyebrow="Cut-off & qualification"
              title="Qualifying cut-off 2026 by category"
              description="Minimum qualifying percentiles per NTA rules. Below these thresholds you cannot join counselling."
            >
              <DataTable
                theme="guide"
                columns={[
                  { key: "category", label: "Category" },
                  { key: "percentile", label: "Required percentile" },
                  {
                    key: "score",
                    label: "Expected score range",
                    badge: true,
                    badgeVariant: "blue",
                  },
                  {
                    key: "intensity",
                    label: "Competition",
                    align: "right",
                    badge: true,
                    badgeColorKey: "statusColor",
                  },
                ]}
                rows={qualifyingRows}
              />

              <div className="mt-8">
                <h3 className="text-base font-bold text-on-surface">
                  Year-wise qualifying score trend (2019–2025)
                </h3>
                <p className="mt-1.5 text-sm text-on-surface-variant">
                  Score range (highest – qualifying threshold) for each category across years.
                </p>
                <div className="mt-4">
                  <DataTable
                    theme="guide"
                    columns={[
                      { key: "year", label: "Year" },
                      { key: "general", label: "General (UR/EWS)" },
                      { key: "obc", label: "OBC-NCL" },
                      { key: "scSt", label: "SC / ST" },
                      { key: "pwd", label: "PwBD (UR)" },
                    ]}
                    rows={trendRows}
                    highlightLastRow
                    scrollable
                    footnote={NEET_UG_ANSWER_KEY_CUTOFF_TREND_FOOTNOTE}
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-linear-to-br from-primary to-primary-pressed rp-brand-elevated relative overflow-hidden rounded-[1.75rem] px-6 py-8 text-on-primary ring-1 ring-on-primary/15 md:px-8">
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-on-primary/80">
                        Rank predictor
                      </p>
                      <h3 className="mt-1 font-headline-md text-lg font-bold">
                        Know your rank from your score
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-on-primary/85">
                        Estimate your All India Rank before results and shortlist MBBS colleges by
                        category and state.
                      </p>
                    </div>
                    <Link
                      href="/rank-predictor"
                      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-on-primary px-5 py-3 text-sm font-bold text-primary no-underline transition hover:bg-on-primary/90"
                    >
                      Predict your rank
                    </Link>
                  </div>
                </div>
              </div>
            </GuideSection>

            <GuideSection embedded id="related" eyebrow="More on MedSeat" title="Related guides">
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_ANSWER_KEY_RELATED_LINKS.map((item) => (
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

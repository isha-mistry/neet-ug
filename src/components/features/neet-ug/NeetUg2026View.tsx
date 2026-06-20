"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { GuidePageJumpNav } from "@/components/features/mbbs-india/GuidePageJumpNav";
import {
  GuideCard,
  GuideSection,
  MetricGrid,
} from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import { NeetTimeline } from "@/components/features/neet-ug/NeetTimeline";
import {
  NeetUg2026Hero,
  NeetUg2026Shell,
  NeetUgHubFinalCta,
  NeetUgHubResourceGrid,
  NeetUgHubSidebar,
} from "@/components/features/neet-ug/NeetUg2026Parts";
// import { AdvisoryAlertCard } from "@/components/features/neet-ug/shared/AdvisoryAlertCard";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { HighYieldChaptersWidget } from "@/components/features/neet-ug/shared/HighYieldChaptersWidget";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";
import {
  NEET_UG_HUB_ELIGIBILITY,
  NEET_UG_HUB_EXAM_PATTERN,
  NEET_UG_HUB_JUMP_SECTIONS,
  NEET_UG_HUB_TIMELINE,
} from "@/lib/neet-ug-2026/hub-content";
import { cn } from "@/lib/utils";

export function NeetUg2026View() {
  const { expectedCutoffs } = neetUg2026Data;

  const tableRows = expectedCutoffs.map((cut) => {
    let badgeColor: "blue" | "rose" | "amber" | "emerald" = "blue";
    if (cut.status === "High Competition") badgeColor = "rose";
    else if (cut.status === "Moderate") badgeColor = "amber";
    else if (
      cut.status === "Low" ||
      cut.status === "Low Competition" ||
      cut.status === "Normal" ||
      cut.status === "Relaxed"
    ) {
      badgeColor = "emerald";
    }
    return { ...cut, statusColor: badgeColor };
  });

  const tableColumns = [
    { key: "category", label: "Category" },
    { key: "percentile", label: "Required percentile" },
    { key: "score", label: "Expected score range", badge: true, badgeVariant: "blue" as const },
    {
      key: "status",
      label: "Competition",
      align: "right" as const,
      badge: true,
      badgeColorKey: "statusColor",
    },
  ];

  return (
    <NeetUg2026Shell>
      <NeetUg2026Hero />

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={NEET_UG_HUB_JUMP_SECTIONS} />
        </Container>
      </nav>

      <Container size="2xl" className="pb-4 pt-6 md:pt-8">
        {/* Official advisory banner — hidden for now
        <AdvisoryAlertCard showFeedLink />
        */}

        <div className="mt-6 lg:hidden">
          <NeetUgHubSidebar />
        </div>

        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)_minmax(17rem,20rem)] lg:items-start lg:gap-8 xl:grid-cols-[12.5rem_minmax(0,1fr)_22rem] xl:gap-10">
          <aside
            className={cn(
              "sticky top-[4.25rem] z-20 hidden max-h-[calc(100dvh-4.5rem)] self-start overflow-y-auto overscroll-contain",
              "lg:col-start-1 lg:row-start-1 lg:block lg:w-full"
            )}
          >
            <GuidePageJumpNav variant="sidebar" jumpSections={NEET_UG_HUB_JUMP_SECTIONS} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection embedded id="hub-guides" eyebrow="Start here" title="Guides & tools">
              <NeetUgHubResourceGrid />
            </GuideSection>

            <GuideSection
              embedded
              id="timeline"
              eyebrow="Schedule"
              title="NEET 2026 official timeline"
              description="Registration through ReNEET and expected results — updated as NTA publishes notices."
            >
              <NeetTimeline dates={NEET_UG_HUB_TIMELINE} />
            </GuideSection>

            <GuideSection
              embedded
              id="eligibility"
              eyebrow="Who can apply"
              title="Eligibility criteria"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {NEET_UG_HUB_ELIGIBILITY.map((item, index) => (
                  <GuideCard key={item.title} className="flex gap-4">
                    <span
                      className="font-mono text-2xl font-bold tabular-nums text-primary"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-on-surface">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
                        {item.desc}
                      </p>
                    </div>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            <GuideSection embedded id="exam-pattern" eyebrow="Paper format" title="Examination pattern">
              <MetricGrid
                items={NEET_UG_HUB_EXAM_PATTERN.map((p) => ({ label: p.label, value: p.val }))}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="study-plan"
              eyebrow="Preparation"
              title="High-yield syllabus & PCB plan"
              description="Prioritise chapters with the best marks-to-effort ratio, aligned to NCERT Classes 11 & 12."
            >
              <HighYieldChaptersWidget showExplanatoryText={false} showHeading={false} />
            </GuideSection>

            <GuideSection
              embedded
              id="cutoffs"
              eyebrow="Qualifying"
              title="Expected NEET 2026 cutoffs"
              description="Indicative percentiles and score bands from recent NEET trends — not official NTA cutoffs."
            >
              <DataTable theme="guide" columns={tableColumns} rows={tableRows} />
            </GuideSection>

            <GuideSection embedded id="next-steps" eyebrow="After the exam" title="Plan your counseling">
              <NeetUgHubFinalCta />
              <p className="text-center text-xs text-outline">
                Also see{" "}
                <Link href="/mbbs-in-india" className="font-semibold text-primary hover:underline">
                  MBBS in India
                </Link>{" "}
                for national seats, fees, and state-wise matrices.
              </p>
            </GuideSection>
          </div>

          <div className="hidden lg:col-start-3 lg:row-start-1 lg:mt-0 lg:block">
            <NeetUgHubSidebar />
          </div>
        </div>
      </Container>
    </NeetUg2026Shell>
  );
}

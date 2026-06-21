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
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { NeetUgUpdatesSidebar } from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { NeetUgHubFinalCta, NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { RpMarketingHero } from "@/components/features/rank-predictor/RankPredictorParts";
import {
  NEET_UG_APPLICATION_CORRECTION_ALLOWED,
  NEET_UG_APPLICATION_CORRECTION_FOOTNOTE,
  NEET_UG_APPLICATION_CORRECTION_NOT_ALLOWED,
  NEET_UG_APPLICATION_DOCUMENTS,
  NEET_UG_APPLICATION_EXAM_DAY_ALLOWED,
  NEET_UG_APPLICATION_EXAM_DAY_PROHIBITED,
  NEET_UG_APPLICATION_EXAM_DAY_STATS,
  NEET_UG_APPLICATION_FEE_FOOTNOTE,
  NEET_UG_APPLICATION_FEE_ROWS,
  NEET_UG_APPLICATION_HERO,
  NEET_UG_APPLICATION_JUMP_SECTIONS,
  NEET_UG_APPLICATION_KEY_STATS,
  NEET_UG_APPLICATION_LEAD_MAGNET,
  NEET_UG_APPLICATION_OMR_RULES,
  NEET_UG_APPLICATION_RELATED_LINKS,
  NEET_UG_APPLICATION_SLIP_VS_ADMIT_ROWS,
  NEET_UG_APPLICATION_STEPS,
} from "@/lib/neet-ug-2026/application-form-content";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

function GuideAllowedProhibited({
  allowedTitle,
  prohibitedTitle,
  allowed,
  prohibited,
  footnote,
}: {
  allowedTitle: string;
  prohibitedTitle: string;
  allowed: readonly string[];
  prohibited: readonly string[];
  footnote?: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <GuideCard className="border-tertiary/25 bg-tertiary-fixed/30">
        <h3 className="flex items-center gap-2 text-sm font-bold text-on-surface">
          <span className="material-symbols-outlined text-lg text-tertiary" aria-hidden>
            check_circle
          </span>
          {allowedTitle}
        </h3>
        <ul className="mt-4 space-y-2.5 text-sm text-on-surface-variant">
          {allowed.map((item) => (
            <li key={item} className="flex gap-2 leading-relaxed">
              <span className="text-tertiary" aria-hidden>
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </GuideCard>
      <GuideCard className="border-error/30 bg-error-container/70">
        <h3 className="flex items-center gap-2 text-sm font-bold text-on-error-container">
          <span className="material-symbols-outlined text-lg text-error" aria-hidden>
            block
          </span>
          {prohibitedTitle}
        </h3>
        <ul className="mt-4 space-y-2.5 text-sm text-on-surface-variant">
          {prohibited.map((item) => (
            <li key={item} className="flex gap-2 leading-relaxed">
              <span className="text-error" aria-hidden>
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {footnote ? (
          <p className="mt-4 border-t border-error/30 pt-4 text-xs leading-relaxed text-on-error-container/90">
            <strong className="font-semibold">Note:</strong> {footnote}
          </p>
        ) : null}
      </GuideCard>
    </div>
  );
}

export function ApplicationFormView() {
  const feeRows = NEET_UG_APPLICATION_FEE_ROWS.map((row) => ({ ...row }));
  const slipRows = NEET_UG_APPLICATION_SLIP_VS_ADMIT_ROWS.map((row) => ({ ...row }));

  return (
    <NeetUg2026Shell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Application & admit card" },
        ]}
        title={NEET_UG_APPLICATION_HERO.title}
        titleEmphasis={NEET_UG_APPLICATION_HERO.titleEmphasis}
        lede={NEET_UG_APPLICATION_HERO.lede}
        trio={NEET_UG_APPLICATION_HERO.trio}
        fine={NEET_UG_APPLICATION_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 Application"
          content={NEET_UG_APPLICATION_LEAD_MAGNET}
          formType={LEAD_FORM_TYPES.neetUgLiveUpdates}
          redirectToWhatsApp={false}
          consentFieldId="lead-neet-ug-2026-application-form-consent"
        />
      </RpMarketingHero>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav
            variant="horizontal"
            jumpSections={NEET_UG_APPLICATION_JUMP_SECTIONS}
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
              jumpSections={NEET_UG_APPLICATION_JUMP_SECTIONS}
            />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection embedded id="at-a-glance" eyebrow="Snapshot" title="At a glance">
              <MetricGrid
                items={NEET_UG_APPLICATION_KEY_STATS.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="how-to-apply"
              eyebrow="Application process"
              title="How to apply for NEET UG 2026"
              description="Five steps on the official NTA portal — complete payment and save your confirmation page."
            >
              <GuideCard>
                <GuideSteps size="compact" steps={[...NEET_UG_APPLICATION_STEPS]} />
                <p className="mt-5 border-t border-outline-variant pt-4 text-sm leading-relaxed text-on-surface-variant">
                  <strong className="font-semibold text-on-surface">Official portal:</strong> Submit
                  applications only through{" "}
                  <Link
                    href="https://neet.nta.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    neet.nta.nic.in
                  </Link>
                  . Third-party sites or agents cannot file your NEET application.
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="fees"
              eyebrow="Fee structure"
              title="NEET UG 2026 application fee"
              description="Category-wise non-refundable fee as notified by NTA. Pay via card, net banking, or UPI."
            >
              <DataTable
                theme="guide"
                columns={[
                  { key: "category", label: "Category" },
                  { key: "fee", label: "Application fee", badge: true, badgeVariant: "blue" },
                  { key: "note", label: "Remark", align: "right" },
                ]}
                rows={feeRows}
                footnote={NEET_UG_APPLICATION_FEE_FOOTNOTE}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="documents"
              eyebrow="Before you start"
              title="Documents required for application"
              description="Prepare JPG uploads within NTA size limits before you begin the form."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {NEET_UG_APPLICATION_DOCUMENTS.map((doc) => (
                  <GuideCard key={doc.title} className="flex gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary"
                      aria-hidden
                    >
                      <span className="material-symbols-outlined text-[22px] leading-none">
                        {doc.icon}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-semibold text-on-surface">{doc.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
                        {doc.desc}
                      </p>
                    </div>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="correction"
              eyebrow="Correction window"
              title="Application correction window"
              description="NTA opens a limited window after applications close — some fields cannot be changed later."
            >
              <GuideAllowedProhibited
                allowedTitle="Can be edited"
                prohibitedTitle="Cannot be changed"
                allowed={NEET_UG_APPLICATION_CORRECTION_ALLOWED}
                prohibited={NEET_UG_APPLICATION_CORRECTION_NOT_ALLOWED}
                footnote={NEET_UG_APPLICATION_CORRECTION_FOOTNOTE}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="slip-vs-admit"
              eyebrow="Pre-exam documents"
              title="City intimation slip vs admit card"
              description="NTA releases two documents before the exam — know which one you need at the gate."
            >
              <DataTable
                theme="guide"
                columns={[
                  { key: "feature", label: "Feature" },
                  { key: "slip", label: "City intimation slip" },
                  { key: "admit", label: "Official admit card" },
                ]}
                rows={slipRows}
              />
              <GuideCard className="mt-4 border-secondary/25 bg-secondary-fixed/70">
                <p className="text-sm leading-relaxed text-on-secondary-fixed-variant">
                  <strong className="font-semibold">Admit card errors:</strong> If name, DOB, or photo
                  are wrong, contact NTA at{" "}
                  <span className="font-semibold">011-40759000</span> or{" "}
                  <span className="font-semibold">neet@nta.ac.in</span> with supporting documents —
                  do not wait until exam day.
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="exam-day"
              eyebrow="Exam day"
              title="Exam day rules & protocol"
              description="Arrive at least 90 minutes early. Gate closes at 1:30 PM for the 2:00 PM slot."
            >
              <MetricGrid
                items={NEET_UG_APPLICATION_EXAM_DAY_STATS.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
              <div className="mt-6">
                <GuideAllowedProhibited
                  allowedTitle="Items allowed inside"
                  prohibitedTitle="Prohibited items"
                  allowed={NEET_UG_APPLICATION_EXAM_DAY_ALLOWED}
                  prohibited={NEET_UG_APPLICATION_EXAM_DAY_PROHIBITED}
                />
              </div>
              <GuideCard className="mt-6">
                <h3 className="text-sm font-bold text-on-surface">OMR sheet & rough work</h3>
                <div className="mt-4">
                  <GuideSteps size="compact" steps={[...NEET_UG_APPLICATION_OMR_RULES]} />
                </div>
              </GuideCard>
            </GuideSection>

            <GuideSection embedded id="related" eyebrow="More on Dravio" title="Related guides">
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_APPLICATION_RELATED_LINKS.map((item) => (
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

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
  NEET_UG_NRI_AIQ_RULES,
  NEET_UG_NRI_CERTIFICATE_BLOCKS,
  NEET_UG_NRI_DOCUMENTS,
  NEET_UG_NRI_ELIGIBILITY,
  NEET_UG_NRI_HERO,
  NEET_UG_NRI_JUMP_SECTIONS,
  NEET_UG_NRI_KEY_STATS,
  NEET_UG_NRI_LEAD_MAGNET,
  NEET_UG_NRI_RELATED_LINKS,
  NEET_UG_NRI_RESERVATION_ROWS,
  NEET_UG_NRI_STATE_RULES,
} from "@/lib/neet-ug-2026/nri-guide-content";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

export function NriAdmissionGuideView() {
  const reservationRows = NEET_UG_NRI_RESERVATION_ROWS.map((row) => ({ ...row }));

  return (
    <NeetUg2026Shell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Reservation & NRI guide" },
        ]}
        title={NEET_UG_NRI_HERO.title}
        titleEmphasis={NEET_UG_NRI_HERO.titleEmphasis}
        lede={NEET_UG_NRI_HERO.lede}
        trio={NEET_UG_NRI_HERO.trio}
        fine={NEET_UG_NRI_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 NRI Guide"
          content={NEET_UG_NRI_LEAD_MAGNET}
          formType={LEAD_FORM_TYPES.getNriCounsellingSupport}
          redirectToWhatsApp={false}
          consentFieldId="lead-neet-ug-2026-nri-guide-consent"
        />
      </RpMarketingHero>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={NEET_UG_NRI_JUMP_SECTIONS} />
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
            <GuidePageJumpNav variant="sidebar" jumpSections={NEET_UG_NRI_JUMP_SECTIONS} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection embedded id="at-a-glance" eyebrow="Snapshot" title="At a glance">
              <MetricGrid
                items={NEET_UG_NRI_KEY_STATS.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="reservation"
              eyebrow="Reservation policy"
              title="Category & reservation framework"
              description="Central rules apply to MCC AIQ; state governments set norms for the remaining 85% quota."
            >
              <DataTable
                theme="guide"
                scrollable
                columns={[
                  { key: "category", label: "Category" },
                  { key: "quota", label: "Quota", badge: true, badgeVariant: "blue" },
                  { key: "type", label: "Type", badge: true, badgeColorKey: "typeColor" },
                  { key: "scope", label: "Scope" },
                  { key: "note", label: "Note" },
                ]}
                rows={reservationRows}
              />

              <GuideCard className="mt-6">
                <h3 className="text-sm font-bold text-on-surface">AIQ vs state quota reservation</h3>
                <div className="mt-5 grid gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      All India Quota (15%)
                    </p>
                    <div className="mt-3">
                      <GuideSteps size="compact" steps={[...NEET_UG_NRI_AIQ_RULES]} />
                    </div>
                  </div>
                  <div className="md:border-l md:border-outline-variant md:pl-8">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                      State quota (85%)
                    </p>
                    <div className="mt-3">
                      <GuideSteps size="compact" steps={[...NEET_UG_NRI_STATE_RULES]} />
                    </div>
                  </div>
                </div>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="certificates"
              eyebrow="Documents"
              title="Category certificate requirements"
              description="Wrong format or issuing authority can cancel your seat at verification — prepare before MCC or state login."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {NEET_UG_NRI_CERTIFICATE_BLOCKS.map((cert) => (
                  <GuideCard key={cert.title} className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-primary-fixed text-primary"
                        aria-hidden
                      >
                        <span className="material-symbols-outlined text-[22px] leading-none">
                          {cert.icon}
                        </span>
                      </span>
                      <h3 className="font-semibold text-on-surface">{cert.title}</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-on-surface-variant">
                      {cert.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="text-primary" aria-hidden>
                            ·
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="nri-eligibility"
              eyebrow="NRI admission"
              title="NRI eligibility & sponsor framework"
              description="Two candidate types qualify for NRI quota seats in Deemed and private colleges — both need a valid NEET UG 2026 score."
            >
              <div className="bg-linear-to-br from-primary to-primary-pressed  rp-brand-elevated relative mb-6 overflow-hidden rounded-[1.75rem] px-6 py-8 text-on-primary ring-1 ring-on-primary/15 md:px-8">
                <p className="relative text-sm leading-relaxed text-on-primary/90">
                  NRI and NRI-sponsored seats are filled through MCC for Deemed universities and
                  through state portals for private colleges. Fees are typically in foreign currency
                  with separate document verification.
                </p>
                <Link
                  href="#top"
                  className="relative mt-4 inline-flex items-center gap-1 text-sm font-bold text-on-primary underline-offset-2 hover:underline"
                >
                  Request NRI guidance in the hero form
                  <span className="material-symbols-outlined text-base" aria-hidden>
                    arrow_forward
                  </span>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {NEET_UG_NRI_ELIGIBILITY.map((block) => (
                  <GuideCard key={block.title}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-primary-fixed text-primary"
                        aria-hidden
                      >
                        <span className="material-symbols-outlined text-[22px] leading-none">
                          {block.icon}
                        </span>
                      </span>
                      <h3 className="font-semibold text-on-surface">{block.title}</h3>
                    </div>
                    <div className="mt-4">
                      <GuideSteps size="compact" steps={[...block.steps]} />
                    </div>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="nri-documents"
              eyebrow="NRI quota"
              title="Documents for NRI admission"
              description="Keep originals and notarised copies ready for college and MCC verification."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_NRI_DOCUMENTS.map((doc) => (
                  <GuideCard key={doc.label} className="flex items-center gap-3 py-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-primary-fixed text-primary"
                      aria-hidden
                    >
                      <span className="material-symbols-outlined text-lg leading-none">
                        {doc.icon}
                      </span>
                    </span>
                    <span className="text-sm font-medium text-on-surface">{doc.label}</span>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            <GuideSection embedded id="related" eyebrow="More on Dravio" title="Related guides">
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_NRI_RELATED_LINKS.map((item) => (
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

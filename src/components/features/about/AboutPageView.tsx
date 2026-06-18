"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { GuidePageJumpNav } from "@/components/features/mbbs-india/GuidePageJumpNav";
import {
  GuideCard,
  GuideSection,
  MetricGrid,
} from "@/components/features/mbbs-india/MbbsIndiaParts";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { NeetUgUpdatesSidebar } from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { NeetUgHubFinalCta } from "@/components/features/neet-ug/NeetUg2026Parts";
import {
  RankPredictorShell,
} from "@/components/features/rank-predictor/RankPredictorParts";
import { Button } from "@/components/ui/Button";
import {
  ABOUT_COMPLIANCE,
  ABOUT_CONTACT,
  ABOUT_FINAL_CTA,
  ABOUT_FIT_CHECK,
  ABOUT_GEOGRAPHY,
  ABOUT_GLANCE_STATS,
  ABOUT_HERO,
  ABOUT_HOW_WE_WORK,
  ABOUT_JUMP_SECTIONS,
  ABOUT_LEAD_MAGNET,
  ABOUT_MANIFESTO,
  ABOUT_PRINCIPLES,
  ABOUT_PRODUCT,
  ABOUT_STORY,
  ABOUT_TEAM,
} from "@/lib/about/content";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { guideCardClass, hubCardHoverClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

const BOOK_CALL_HREF = `${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${encodeURIComponent(
  "Hi MedSeat, I'd like to book a free 15-minute counseling call about NEET UG MBBS admissions."
)}`;

export function AboutPageView() {
  return (
    <RankPredictorShell>
      {/* Hero — centered for About page */}
      <header className="rp-hero rp-bleed" id="top">
        <div className="rp-hero-inner">
          <div className="mx-auto max-w-4xl text-center">
            <nav className="rp-crumb justify-center" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="rp-crumb-sep">/</span>
              <span style={{ color: "var(--color-primary)" }}>About MedSeat</span>
            </nav>

            <h1 className="rp-hero-title">
              {ABOUT_HERO.title}
              <em>{ABOUT_HERO.titleEmphasis}</em>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              {ABOUT_HERO.lede}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ABOUT_HERO.trio.map((item) => (
                <div key={item.key} className="rp-trio-card text-left">
                  <span className="rp-trio-k">{item.key}</span>
                  <b className="rp-trio-b">{item.value}</b>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-on-surface-variant">
              {ABOUT_HERO.fine}
            </p>
          </div>
        </div>
      </header>

      {/* Mobile jump nav */}
      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={ABOUT_JUMP_SECTIONS} />
        </Container>
      </nav>

      {/* Full-width single-column layout */}
      <Container size="2xl" className="pb-4 pt-6 md:pt-8">
        <div className="mt-6 flex flex-col gap-4 lg:hidden">
          <NeetUgLeadMagnetPanel pageLabel="About MedSeat" content={ABOUT_LEAD_MAGNET} />
          <NeetUgUpdatesSidebar />
        </div>

        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-10">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            {/* At a glance */}
            <GuideSection embedded id="at-a-glance" eyebrow="Snapshot" title="At a glance">
              <MetricGrid
                items={ABOUT_GLANCE_STATS.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
            </GuideSection>

            {/* What we provide */}
            <GuideSection
              embedded
              id="what-we-provide"
              eyebrow={ABOUT_PRODUCT.eyebrow}
              title={ABOUT_PRODUCT.headline}
              description={ABOUT_PRODUCT.description}
            >
              <div className="grid gap-4 sm:grid-cols-3">
                {ABOUT_PRODUCT.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={cn(guideCardClass, hubCardHoverClass, "group flex flex-col no-underline")}
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-on-primary"
                      aria-hidden
                    >
                      <span className="material-symbols-outlined text-[22px]">{tool.icon}</span>
                    </span>
                    <h3 className="mt-4 text-base font-bold text-on-surface group-hover:text-primary">
                      {tool.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">
                      {tool.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                      {tool.cta}
                      <FiArrowRight className="text-sm" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {ABOUT_PRODUCT.extras.map((extra) => (
                  <Link
                    key={extra.href}
                    href={extra.href}
                    className={cn(guideCardClass, hubCardHoverClass, "group block no-underline")}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary"
                        aria-hidden
                      >
                        <span className="material-symbols-outlined text-[20px]">{extra.icon}</span>
                      </span>
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary">
                        {extra.title}
                      </p>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-on-surface-variant">{extra.body}</p>
                  </Link>
                ))}
              </div>
            </GuideSection>

            {/* Our story */}
            <GuideSection
              embedded
              id="story"
              eyebrow="Our story"
              title="Built because we kept seeing the same mistake."
            >
              <div className="flex flex-col gap-5 text-sm leading-relaxed text-on-surface-variant md:text-base">
                {ABOUT_STORY.paragraphs.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </GuideSection>

            {/* Principles */}
            <GuideSection
              embedded
              id="principles"
              eyebrow="What we believe"
              title="Four principles. Non-negotiable."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {ABOUT_PRINCIPLES.map((item) => (
                  <GuideCard key={item.title}>
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary"
                        aria-hidden
                      >
                        <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-on-surface">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </GuideCard>
                ))}
              </div>
            </GuideSection>

            {/* Geography */}
            <GuideSection
              embedded
              id="geography"
              eyebrow="Our geography"
              title="Four states. By choice."
              description={ABOUT_GEOGRAPHY.body}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {ABOUT_GEOGRAPHY.stateCards.map((state) => (
                  <Link
                    key={state.slug}
                    href={state.href}
                    className={cn(guideCardClass, hubCardHoverClass, "group block no-underline")}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {state.code}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-on-surface group-hover:text-primary">
                      {state.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                      {state.auth}
                    </p>
                    <div className="mt-4 flex gap-6 text-sm">
                      <div>
                        <p className="font-bold text-on-surface">{state.seats}</p>
                        <p className="text-xs text-on-surface-variant">seats</p>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{state.colleges}</p>
                        <p className="text-xs text-on-surface-variant">colleges</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {ABOUT_GEOGRAPHY.closing}
              </p>
              <Link
                href="/neet-ug-2026/counselling-guide"
                className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                MCC All India Quota counseling guide
                <FiArrowRight className="text-sm" aria-hidden />
              </Link>
            </GuideSection>

            {/* How we work */}
            <GuideSection
              embedded
              id="how-we-work"
              eyebrow="How we work"
              title="A counseling practice, not a content farm."
            >
              <ol className="grid gap-4">
                {ABOUT_HOW_WE_WORK.map((pillar, index) => (
                  <GuideCard key={pillar.title}>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-on-primary"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-on-surface">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      {pillar.body}
                    </p>
                  </GuideCard>
                ))}
              </ol>
            </GuideSection>

            {/* Fit check */}
            <GuideSection
              embedded
              id="fit-check"
              eyebrow="Fit check"
              title="Be honest with us, and we'll be honest back."
              description={ABOUT_FIT_CHECK.subheadline}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <GuideCard className="border-primary/20 bg-primary-fixed/20">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
                    <span className="material-symbols-outlined text-lg" aria-hidden>
                      check_circle
                    </span>
                    We&apos;re a good fit if…
                  </h3>
                  <ul className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-sm leading-relaxed text-on-surface-variant">
                    {ABOUT_FIT_CHECK.goodFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </GuideCard>
                <GuideCard>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-on-surface">
                    <span className="material-symbols-outlined text-lg text-outline" aria-hidden>
                      do_not_disturb_on
                    </span>
                    We&apos;re probably not the right fit if…
                  </h3>
                  <ul className="mt-4 flex list-disc flex-col gap-2.5 pl-5 text-sm leading-relaxed text-on-surface-variant">
                    {ABOUT_FIT_CHECK.notFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </GuideCard>
              </div>
            </GuideSection>

            {/* Where we stand */}
            <GuideSection
              embedded
              id="where-we-stand"
              eyebrow="Where we stand"
              title="Things we want you to know before you book."
            >
              <GuideCard>
                <div className="flex flex-col gap-6">
                  {ABOUT_MANIFESTO.map((block) => (
                    <div key={block.title}>
                      <h3 className="text-sm font-bold text-on-surface">{block.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
                        {block.body}
                      </p>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-outline-variant/40 pt-4 text-xs font-medium text-primary">
                    <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                    <Link href="/refund-policy" className="hover:underline">
                      Refund Policy
                    </Link>
                  </div>
                </div>
              </GuideCard>
            </GuideSection>

            {/* Team */}
            <GuideSection
              embedded
              id="team"
              eyebrow="The team"
              title="The people who'll answer your call."
              description="Real names, real faces, real credentials — update this section before launch."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {ABOUT_TEAM.members.map((member) => (
                  <GuideCard key={member.name} padding={false} className="overflow-hidden">
                    <div className="flex h-36 items-center justify-center bg-surface-container-high">
                      {member.photoReady && member.photoSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={member.photoSrc}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-4xl text-outline" aria-hidden>
                          person
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-base font-bold text-on-surface">{member.name}</p>
                      <span className="mt-1 inline-block rounded-full bg-primary-fixed px-2.5 py-0.5 text-xs font-bold text-primary">
                        {member.role}
                      </span>
                      <p className="mt-3 font-mono text-[11px] leading-relaxed text-on-surface-variant">
                        {member.credentials}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                        {member.bio}
                      </p>
                      {member.linkedInHref ? (
                        <a
                          href={member.linkedInHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                        >
                          LinkedIn
                        </a>
                      ) : null}
                    </div>
                  </GuideCard>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {ABOUT_TEAM.footnote}
              </p>
            </GuideSection>

            {/* Contact */}
            <GuideSection
              embedded
              id="contact"
              eyebrow="Find us"
              title="We exist somewhere real."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <GuideCard>
                  <div className="space-y-4 text-sm text-on-surface-variant">
                    <div>
                      <p className="font-bold text-on-surface">{ABOUT_CONTACT.officeName}</p>
                      {ABOUT_CONTACT.addressLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <p>{ABOUT_CONTACT.availability}</p>
                    <div className="space-y-1">
                      <p>Phone: {ABOUT_CONTACT.channels.phone}</p>
                      <p>WhatsApp: {ABOUT_CONTACT.channels.whatsapp}</p>
                      <p>
                        Email:{" "}
                        <a
                          href={`mailto:${ABOUT_CONTACT.channels.email}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {ABOUT_CONTACT.channels.email}
                        </a>
                      </p>
                    </div>
                    <Button
                      as="link"
                      href={BOOK_CALL_HREF}
                      variant="primary"
                      size="md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a free call →
                    </Button>
                  </div>
                </GuideCard>

                <GuideCard className="border-outline-variant/30 bg-surface-container-low">
                  <dl className="space-y-4 text-sm">
                    {ABOUT_COMPLIANCE.rows.map((row) => (
                      <div key={row.label}>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-outline">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 leading-relaxed text-on-surface-variant">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <nav
                    className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t border-outline-variant/40 pt-4 text-xs font-medium text-primary"
                    aria-label="Legal policies"
                  >
                    {ABOUT_COMPLIANCE.policyLinks.map((link, i) => (
                      <span key={link.href} className="inline-flex items-center gap-3">
                        {i > 0 ? (
                          <span className="text-outline-variant" aria-hidden>
                            ·
                          </span>
                        ) : null}
                        <Link href={link.href} className="hover:underline">
                          {link.label}
                        </Link>
                      </span>
                    ))}
                  </nav>
                </GuideCard>
              </div>
            </GuideSection>

            {/* Final CTA */}
            <GuideSection embedded id="cta" eyebrow="Get started" title={ABOUT_FINAL_CTA.headline}>
              <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
                {ABOUT_FINAL_CTA.body}
              </p>
              <NeetUgHubFinalCta />
              <p className="text-center text-xs text-on-surface-variant">{ABOUT_FINAL_CTA.meta}</p>
            </GuideSection>
          </div>

          <div className="hidden lg:col-start-2 lg:row-start-1 lg:block">
            <div className="sticky top-[4.25rem] flex flex-col gap-4 border-l border-outline-variant/40 pl-6">
              <NeetUgLeadMagnetPanel pageLabel="About MedSeat" content={ABOUT_LEAD_MAGNET} />
              <NeetUgUpdatesSidebar />
            </div>
          </div>
        </div>
      </Container>
    </RankPredictorShell>
  );
}

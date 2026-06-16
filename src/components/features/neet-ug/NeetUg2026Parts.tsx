import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import { GuideCard } from "@/components/features/mbbs-india/MbbsIndiaParts";
import {
  RankPredictorShell,
  RpMarketingHero,
} from "@/components/features/rank-predictor/RankPredictorParts";
import { Button } from "@/components/ui/Button";
import { NEET_UG_HUB_HERO, NEET_UG_HUB_RESOURCE_LINKS, NEET_UG_HUB_SIDEBAR_TOOLS } from "@/lib/neet-ug-2026/hub-content";
import { NeetUgHeroLeadMagnet } from "@/components/features/neet-ug/NeetUgHeroLeadMagnet";
import { NtaHelpdeskCard } from "@/components/features/neet-ug/shared/NtaHelpdeskCard";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

export function NeetUg2026Shell({ children }: { children: ReactNode }) {
  return <RankPredictorShell>{children}</RankPredictorShell>;
}

export function NeetUg2026Hero() {
  return (
    <RpMarketingHero
      id="top"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Predictors", href: "/rank-predictor" },
        { label: "NEET UG 2026" },
      ]}
      title={NEET_UG_HUB_HERO.title}
      titleEmphasis={NEET_UG_HUB_HERO.titleEmphasis}
      lede={NEET_UG_HUB_HERO.lede}
      trio={NEET_UG_HUB_HERO.trio}
      fine={NEET_UG_HUB_HERO.fine}
    >
      <NeetUgHeroLeadMagnet />
    </RpMarketingHero>
  );
}

export function NeetUgHubSidebarPromos() {
  return (
    <>
      <GuideCard>
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            <span className="material-symbols-outlined block text-sm leading-none">download</span>
            Free PDF
          </span>
          <h3 className="font-headline-md text-lg font-bold leading-snug text-on-surface">
            NEET 2026 counseling playbook
          </h3>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Seat matrices, state quota rules, and choice-filling strategy for GJ · RJ · MP · MH + MCC
            AIQ.
          </p>
          <Button as="link" href="/#playbook" variant="secondary" size="md" className="w-full">
            Get the guide
          </Button>
        </div>
      </GuideCard>
      {NEET_UG_HUB_SIDEBAR_TOOLS.map((tool) => (
        <GuideCard key={tool.href}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary"
                aria-hidden
              >
                <span className="material-symbols-outlined block text-[22px] leading-none [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_24]">
                  {tool.icon}
                </span>
              </span>
              <div className="min-w-0 flex-1 space-y-1.5">
                <span className="inline-flex w-fit items-center rounded-full bg-primary-fixed px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {tool.eyebrow}
                </span>
                <h3 className="font-headline-md text-base font-bold leading-snug text-on-surface md:text-[1.05rem] md:leading-snug">
                  {tool.title}
                </h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant">{tool.description}</p>
            <Button
              as="link"
              href={tool.href}
              variant="primary"
              size="md"
              fullWidth
              trailingIcon={<FiArrowRight className="text-lg" aria-hidden />}
              className="h-11 w-full rounded-xl text-sm font-bold shadow-[0_10px_28px_-12px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]"
            >
              {tool.cta}
            </Button>
          </div>
        </GuideCard>
      ))}
    </>
  );
}

export function NeetUgHubSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex flex-col gap-4 lg:sticky lg:top-[4.25rem] lg:self-start",
        className
      )}
    >
      <NtaHelpdeskCard />
      <NeetUgHubSidebarPromos />
    </aside>
  );
}

export function NeetUgHubResourceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {NEET_UG_HUB_RESOURCE_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            guideCardClass,
            hubCardHoverClass,
            "flex items-start gap-4 no-underline"
          )}
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-fixed transition-colors group-hover:bg-primary"
            aria-hidden
          >
            <span className="material-symbols-outlined block text-[24px] leading-none text-primary transition-colors group-hover:text-on-primary [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_24]">
              {item.icon}
            </span>
          </span>
          <div className="min-w-0 flex-1 pt-0.5 text-left">
            <p className="font-semibold text-on-surface group-hover:text-primary">{item.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function NeetUgHubFinalCta() {
  return (
    <div className="rp-brand-gradient rp-brand-elevated relative overflow-hidden rounded-[1.75rem] px-6 py-10 text-on-primary ring-1 ring-on-primary/15 md:px-10 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-on-primary/10 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <h2 className="font-headline-lg text-2xl font-bold tracking-tight md:text-3xl">
          Results turn rank into <em className="not-italic text-secondary-fixed">choices.</em>
        </h2>
        <p className="text-sm leading-relaxed text-on-primary/85 md:text-base">
          Use the Rank Predictor for an AIR band today, then the College Predictor when your
          scorecard is out.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Button as="link" href="/rank-predictor" variant="secondary" size="md">
            Predict my rank
          </Button>
          <Button
            as="link"
            href="/college-predictor"
            variant="ghost"
            size="md"
            className="border border-on-primary/30 text-on-primary hover:bg-on-primary/10"
          >
            College predictor
          </Button>
        </div>
      </div>
    </div>
  );
}

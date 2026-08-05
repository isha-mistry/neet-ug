"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import {
  GuideCard,
  GuideSection,
} from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { NeetUgHubFinalCta } from "@/components/features/neet-ug/NeetUg2026Parts";
import {
  NeetUgUpdatesShell,
  NeetUgUpdatesSidebar,
} from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { UpdatesNoticeAllBrowser } from "@/components/features/neet-ug/NeetUgUpdatesSections";
import { RpMarketingHero } from "@/components/features/rank-predictor/RankPredictorParts";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import {
  NEET_UG_NOTICES_ALL_HERO,
  NEET_UG_UPDATES_LEAD_MAGNET,
  type UpdatesNoticeItem,
} from "@/lib/neet-ug-2026/updates-content";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

export function NeetUgNoticesArchiveView({
  notices,
}: {
  notices: readonly UpdatesNoticeItem[];
}) {
  return (
    <NeetUgUpdatesShell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Live updates", href: "/neet-ug-2026/updates" },
          { label: "Latest notices" },
        ]}
        title={NEET_UG_NOTICES_ALL_HERO.title}
        titleEmphasis={NEET_UG_NOTICES_ALL_HERO.titleEmphasis}
        lede={NEET_UG_NOTICES_ALL_HERO.lede}
        trio={NEET_UG_NOTICES_ALL_HERO.trio}
        fine={NEET_UG_NOTICES_ALL_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 Latest Notices"
          content={NEET_UG_UPDATES_LEAD_MAGNET}
          formType={LEAD_FORM_TYPES.neetUgLiveUpdates}
          redirectToWhatsApp={false}
          consentFieldId="lead-neet-ug-2026-latest-notices-consent"
        />
      </RpMarketingHero>

      <Container size="2xl" className="pb-4 pt-6 md:pt-8">
        <div className="mt-6 lg:hidden">
          <NeetUgUpdatesSidebar />
        </div>

        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(17rem,20rem)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-10">
          <div className="min-w-0">
            <nav aria-label="Related pages" className="mb-6">
              <Link
                href="/neet-ug-2026/updates"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary no-underline hover:underline"
              >
                <span className="material-symbols-outlined text-base" aria-hidden>
                  arrow_back
                </span>
                Back to live updates
              </Link>
            </nav>

            <GuideSection
              embedded
              id="latest-notices"
              eyebrow="Official sources"
              title="All the latest notifications"
              description="Every published NTA, MCC, and state counselling notice in the live feed. Filter by authority or search keywords."
            >
              <UpdatesNoticeAllBrowser items={notices} />
            </GuideSection>

            <GuideSection
              embedded
              id="related"
              eyebrow="Also useful"
              title="Related tools"
              description="Use these after you open an official PDF."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    href: "/neet-ug-2026/counselling-guide",
                    label: "Counselling guide",
                    desc: "MCC AIQ rounds, choice filling, and reporting.",
                  },
                  {
                    href: "/college-predictor",
                    label: "College predictor",
                    desc: "Likely, Possible & Reach lists from your AIR.",
                  },
                  {
                    href: "/neet-ug-2026/updates",
                    label: "Live updates hub",
                    desc: "Timeline, checklists, and latest five notices.",
                  },
                  {
                    href: "/state-counselling",
                    label: "State counselling",
                    desc: "Portals and guides for domicile quota states.",
                  },
                ].map((item) => (
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

            <GuideSection embedded id="tools-cta" eyebrow="Plan ahead" title="Start with your score or rank">
              <NeetUgHubFinalCta />
            </GuideSection>

            <GuideCard className="mt-8 border-dashed p-4 text-xs leading-relaxed text-on-surface-variant md:p-5">
              Notices are curated from public government PDFs. Dravio does not replace
              NTA, MCC, or state portals — verify every deadline and fee on the official
              link before you act.
            </GuideCard>
          </div>

          <div className="mt-10 hidden lg:mt-0 lg:block">
            <NeetUgUpdatesSidebar />
          </div>
        </div>
      </Container>
    </NeetUgUpdatesShell>
  );
}

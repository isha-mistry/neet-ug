"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/common/Container";
import { GuidePageJumpNav } from "@/components/features/mbbs-india/GuidePageJumpNav";
import { GuideCard, GuideSection } from "@/components/features/mbbs-india/MbbsIndiaParts";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { NeetUgUpdatesSidebar } from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { NeetUgHubFinalCta, NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { RpMarketingHero } from "@/components/features/rank-predictor/RankPredictorParts";
import {
  TERMS_EXPLAINED_HERO,
  TERMS_EXPLAINED_JUMP_SECTIONS,
  TERMS_EXPLAINED_LAST_VERIFIED,
  TERMS_EXPLAINED_LEAD_MAGNET,
  TERMS_EXPLAINED_RELATED_LINKS,
  TERMS_EXPLAINED_SECTIONS,
  TERMS_EXPLAINED_VERIFICATION_NOTE,
  type GlossaryTerm,
  type TermsExplainedSection,
} from "@/lib/neet-ug-2026/terms-explained-content";
import { guideCardClass, hubCardHoverClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function termMatchesQuery(term: GlossaryTerm, query: string) {
  const haystack = `${term.term} ${term.definition}`.toLowerCase();
  return haystack.includes(query);
}

function filterSection(section: TermsExplainedSection, query: string): TermsExplainedSection | null {
  if (!query) return section;

  if (section.kind === "terms") {
    const terms = section.terms.filter((t) => termMatchesQuery(t, query));
    if (terms.length === 0) return null;
    return { ...section, terms };
  }

  const groups = section.groups
    .map((group) => ({
      ...group,
      terms: group.terms.filter((t) => termMatchesQuery(t, query)),
    }))
    .filter((group) => group.terms.length > 0);

  if (groups.length === 0) return null;
  return { ...section, groups };
}

function GlossaryTermList({ terms }: { terms: GlossaryTerm[] }) {
  return (
    <div className="flex flex-col gap-4">
      {terms.map((entry) => (
        <article key={entry.term} className={cn(guideCardClass, "p-5 md:p-6")}>
          <h3 className="text-base font-bold leading-snug text-on-surface md:text-[1.05rem]">
            {entry.term}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-on-surface-variant md:text-[0.9375rem]">
            {entry.definition}
          </p>
        </article>
      ))}
    </div>
  );
}

function TermsExplainedSectionBlock({ section }: { section: TermsExplainedSection }) {
  return (
    <GuideSection
      embedded
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
    >
      {section.kind === "terms" ? (
        <GlossaryTermList terms={section.terms} />
      ) : (
        <div className="flex flex-col gap-10">
          {section.groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                {group.label}
              </h3>
              <div className="mt-4">
                <GlossaryTermList terms={group.terms} />
              </div>
            </div>
          ))}
        </div>
      )}
    </GuideSection>
  );
}

export function TermsExplainedView() {
  const [searchQuery, setSearchQuery] = useState("");

  const query = normalizeSearch(searchQuery);

  const filteredSections = useMemo(() => {
    return TERMS_EXPLAINED_SECTIONS.map((section) => filterSection(section, query)).filter(
      (section): section is TermsExplainedSection => section != null
    );
  }, [query]);

  const matchCount = useMemo(() => {
    if (!query) return null;
    return filteredSections.reduce((total, section) => {
      if (section.kind === "terms") return total + section.terms.length;
      return total + section.groups.reduce((n, g) => n + g.terms.length, 0);
    }, 0);
  }, [filteredSections, query]);

  return (
    <NeetUg2026Shell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Terms explained" },
        ]}
        title={TERMS_EXPLAINED_HERO.title}
        titleEmphasis={TERMS_EXPLAINED_HERO.titleEmphasis}
        lede={TERMS_EXPLAINED_HERO.lede}
        trio={TERMS_EXPLAINED_HERO.trio}
        fine={TERMS_EXPLAINED_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 Glossary"
          content={TERMS_EXPLAINED_LEAD_MAGNET}
        />
      </RpMarketingHero>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={TERMS_EXPLAINED_JUMP_SECTIONS} />
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
            <GuidePageJumpNav variant="sidebar" jumpSections={TERMS_EXPLAINED_JUMP_SECTIONS} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideCard className="mb-8 p-5 md:p-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-on-surface">Search glossary</span>
                <div className="relative">
                  <span
                    className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-on-surface-variant"
                    aria-hidden
                  >
                    search
                  </span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. AIQ, GMERS, mop-up, NCL certificate…"
                    className="w-full rounded-xl border border-outline-variant bg-surface py-2.5 pl-11 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/25"
                    aria-describedby="glossary-search-hint"
                  />
                </div>
                <p id="glossary-search-hint" className="text-xs text-on-surface-variant">
                  {query
                    ? matchCount === 0
                      ? "No terms match your search — try a shorter keyword or browse sections below."
                      : `${matchCount} term${matchCount === 1 ? "" : "s"} match your search across ${filteredSections.length} section${filteredSections.length === 1 ? "" : "s"}.`
                    : "Filter by term name or definition text across all 12 categories."}
                </p>
              </label>
            </GuideCard>

            {query && filteredSections.length === 0 ? (
              <GuideCard className="p-6 text-center">
                <p className="font-semibold text-on-surface">No matching terms</p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Try synonyms (e.g. &quot;AIQ&quot; for All India Quota) or clear the search to
                  browse by section.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-sm font-bold text-primary hover:underline"
                >
                  Clear search
                </button>
              </GuideCard>
            ) : (
              filteredSections.map((section) => (
                <TermsExplainedSectionBlock key={section.id} section={section} />
              ))
            )}

            <GuideSection embedded id="trust" eyebrow="Accuracy" title="How we maintain this glossary">
              <GuideCard className="p-5 md:p-6">
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  If you encounter a term not listed here or need clarification on how a term applies
                  to your category, state, or rank — use the form above and our counsellors will
                  respond. We update this page as policies change. For 2026 cycle notifications, see
                  our{" "}
                  <Link href="/neet-ug-2026/updates" className="font-semibold text-primary hover:underline">
                    Live Updates
                  </Link>{" "}
                  page.
                </p>
                <dl className="mt-6 grid gap-3 border-t border-outline-variant/40 pt-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-outline">
                      Last verified
                    </dt>
                    <dd className="mt-1 font-semibold text-on-surface">
                      {TERMS_EXPLAINED_LAST_VERIFIED}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-bold uppercase tracking-wider text-outline">
                      Verified against
                    </dt>
                    <dd className="mt-1 leading-relaxed text-on-surface-variant">
                      {TERMS_EXPLAINED_VERIFICATION_NOTE}
                    </dd>
                  </div>
                </dl>
              </GuideCard>
            </GuideSection>

            <GuideSection embedded id="related" eyebrow="More on MedSeat" title="Related guides">
              <div className="grid gap-3 sm:grid-cols-2">
                {TERMS_EXPLAINED_RELATED_LINKS.map((item) => (
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

import { getHomeContent } from "@/lib/data/site";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { HomeHero } from "@/components/features/home/HomeHero";
import { ExploreEntryPoints } from "@/components/features/home/ExploreEntryPoints";
import { TrustHighlights } from "@/components/features/home/TrustHighlights";

export default function HomePage() {
  const home = getHomeContent();
  return (
    <>
      <Section tone="default" className="pt-10 md:pt-16">
        <Container size="2xl">
          <HomeHero content={home.hero} />
        </Container>
      </Section>

      <Section tone="muted">
        <Container size="2xl" className="flex flex-col gap-8">
          <header className="flex max-w-2xl flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-700">
              Explore
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-text md:text-3xl">
              Pick a path that fits your decision style.
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Browse the full database, focus on a state, jump straight to a
              category, or compare colleges head to head.
            </p>
          </header>
          <ExploreEntryPoints entries={home.exploreEntryPoints} />
        </Container>
      </Section>

      <Section tone="default">
        <Container size="2xl">
          <TrustHighlights content={home.trustHighlights} />
        </Container>
      </Section>
    </>
  );
}

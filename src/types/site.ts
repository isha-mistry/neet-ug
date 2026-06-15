import type { CTA, LinkItem, NavSection } from "./core";

export interface SiteIdentity {
  brandName: string;
  tagline: string;
  description: string;
  primaryNav: LinkItem[];
  quotaLinks: LinkItem[];
  footer: {
    columns: NavSection[];
    legal: string;
  };
}

export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: CTA;
  secondaryCta: CTA;
}

export interface HomeExploreEntry {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface HomeTrustItem {
  id: string;
  label: string;
  value: string;
  caption: string;
  icon: string;
}

export interface HomeContent {
  hero: HomeHeroContent;
  exploreEntryPoints: HomeExploreEntry[];
  trustHighlights: {
    title: string;
    description: string;
    items: HomeTrustItem[];
  };
}

export interface PageMetaContent {
  title: string;
  description: string;
}

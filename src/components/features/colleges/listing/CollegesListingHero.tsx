import Link from "next/link";
import { COLLEGES_LISTING_HERO } from "@/lib/colleges/listing-hero-content";

export function CollegesListingHero() {
  return (
    <header className="rp-hero rp-hero-compact rp-bleed " id="colleges">
      <div className="rp-hero-inner">
        <nav className="rp-crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="rp-crumb-sep">/</span>
          <span style={{ color: "var(--color-primary)" }}>Colleges</span>
        </nav>
        <h1 className="rp-hero-title rp-hero-title-compact max-w-3xl text-balance">
          {COLLEGES_LISTING_HERO.title}
          <em>{COLLEGES_LISTING_HERO.titleEmphasis}</em>
        </h1>
        <p className="rp-hero-lede rp-hero-lede-compact max-w-2xl text-balance">
          {COLLEGES_LISTING_HERO.lede}
        </p>
      </div>
    </header>
  );
}

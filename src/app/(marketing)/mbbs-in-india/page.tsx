import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { MbbsIndiaClient } from "@/components/features/mbbs-india/MbbsIndiaClient";
import { getAllColleges } from "@/lib/data/colleges";
import { getRichStateMapStats } from "@/lib/mbbs-india/state-map-rich-stats";
import { aggregateCatalogSeatBreakdown } from "@/lib/mbbs/catalog-aggregates";
import { MBBS_ACADEMIC_SESSION } from "@/lib/mbbs/constants";
import { MBBS_INDIA_PAGE_PATH } from "@/lib/mbbs-india/constants";
import { MBBS_INDIA_FAQ } from "@/lib/mbbs-india/content";
import {
  buildMbbsIndiaArticleJsonLd,
  buildMbbsIndiaFaqJsonLd,
} from "@/lib/mbbs-india/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const colleges = await getAllColleges();
  const catalog = aggregateCatalogSeatBreakdown(colleges);
  return buildMetadata({
    title: `MBBS in India ${MBBS_ACADEMIC_SESSION}: Colleges, Seats, Cutoffs & NEET Counseling Guide`,
    description: `Complete national guide to MBBS in India — ${catalog.totalColleges} colleges, ${catalog.totalSeats.toLocaleString("en-IN")} seats, AIQ & state counseling, fees, cutoffs, eligibility, and career paths after MBBS.`,
    path: MBBS_INDIA_PAGE_PATH,
  });
}

export default async function MbbsInIndiaPage() {
  const [mapStats, colleges] = await Promise.all([getRichStateMapStats(), getAllColleges()]);
  const catalog = aggregateCatalogSeatBreakdown(colleges);
  const faqJsonLd = buildMbbsIndiaFaqJsonLd(MBBS_INDIA_FAQ);
  const articleJsonLd = buildMbbsIndiaArticleJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Container size="2xl" className="pt-4 pb-2">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "MBBS in India" },
          ]}
        />
      </Container>
      <MbbsIndiaClient mapStats={mapStats} catalog={catalog} />
    </>
  );
}

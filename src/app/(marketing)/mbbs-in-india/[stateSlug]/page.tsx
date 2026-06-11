import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { MbbsStateClient } from "@/components/features/mbbs-state/MbbsStateClient";
import { getAllColleges } from "@/lib/data/colleges";
import { MBBS_ACADEMIC_SESSION } from "@/lib/mbbs/constants";
import { MBBS_INDIA_PAGE_PATH } from "@/lib/mbbs-india/constants";
import { FOCUS_STATE_SLUGS, mbbsStatePath } from "@/lib/mbbs-state/constants";
import { getMbbsStateConfig } from "@/lib/mbbs-state/configs/all-states";
import { mergeMbbsStateConfigWithCatalog } from "@/lib/mbbs-state/merge-catalog-stats";
import { buildMbbsStateFaqJsonLd } from "@/lib/mbbs-state/jsonld";
import { mapCatalogCollegesToTableRows } from "@/lib/mbbs-state/map-colleges";
import type { FocusStateSlug } from "@/lib/mbbs-state/types";
import { buildMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
}

export function generateStaticParams() {
  return FOCUS_STATE_SLUGS.map((stateSlug) => ({ stateSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stateSlug } = await params;
  const baseConfig = getMbbsStateConfig(stateSlug);
  if (!baseConfig) {
    return buildMetadata({
      title: "State guide not found",
      description: "No MBBS state guide for this URL.",
    });
  }
  const allColleges = await getAllColleges();
  const config = mergeMbbsStateConfigWithCatalog(baseConfig, allColleges);
  return buildMetadata({
    title: `MBBS in ${config.name} ${MBBS_ACADEMIC_SESSION} — Colleges, Cutoffs & Counseling`,
    description: `${config.name} has ${config.stats.totalColleges} medical colleges and ${config.stats.totalSeats.toLocaleString("en-IN")} MBBS seats. ${config.counselingAuthorityShort} counseling, fees, domicile rules, and cutoffs.`,
    path: mbbsStatePath(stateSlug),
  });
}

function relatedStateLinks(current: FocusStateSlug) {
  return FOCUS_STATE_SLUGS.filter((s) => s !== current).map((slug) => {
    const cfg = getMbbsStateConfig(slug)!;
    return { label: `MBBS in ${cfg.name}`, href: mbbsStatePath(slug) };
  });
}

export default async function MbbsStatePage({ params }: PageProps) {
  const { stateSlug } = await params;
  const baseConfig = getMbbsStateConfig(stateSlug);
  if (!baseConfig) notFound();

  const allColleges = await getAllColleges();
  const config = mergeMbbsStateConfigWithCatalog(baseConfig, allColleges);
  const stateColleges = allColleges.filter((c) => c.stateSlug === stateSlug);
  const tableRows = mapCatalogCollegesToTableRows(stateColleges, stateSlug);

  const faqJsonLd = buildMbbsStateFaqJsonLd(config.faq, config.name);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container size="2xl" className="pt-4 pb-2">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "MBBS in India", href: MBBS_INDIA_PAGE_PATH },
            { label: `MBBS in ${config.name}` },
          ]}
        />
      </Container>
      <MbbsStateClient
        config={config}
        colleges={tableRows}
        relatedStateLinks={relatedStateLinks(config.slug)}
      />
    </>
  );
}

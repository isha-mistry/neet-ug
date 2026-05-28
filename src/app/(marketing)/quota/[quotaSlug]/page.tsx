import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";
import { ContentPageShell } from "@/components/features/content/ContentPageShell";
import { QuotaGuideOverview } from "@/components/features/quota/QuotaGuideOverview";
import { ContentSectionList } from "@/components/features/content/ContentSectionList";
import { getQuotaGuideBySlug, getQuotaGuides } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ quotaSlug: string }>;
}

export function generateStaticParams() {
  return getQuotaGuides().map((guide) => ({ quotaSlug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { quotaSlug } = await params;
  const guide = getQuotaGuideBySlug(quotaSlug);
  if (!guide) {
    return buildMetadata({
      title: "Quota Guide Not Found",
      description: "No matching quota guide was found.",
    });
  }
  return buildMetadata({
    title: guide.title,
    description: guide.summary,
    path: `/quota/${quotaSlug}`,
  });
}

export default async function QuotaGuidePage({ params }: PageProps) {
  const { quotaSlug } = await params;
  const guide = getQuotaGuideBySlug(quotaSlug);
  if (!guide) notFound();

  return (
    <ContentPageShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Quota Guides", href: "/quota/general" },
          { label: guide.title },
        ]}
      />
      <PageHeader
        eyebrow="Quota Guide"
        title={guide.title}
        description={guide.summary}
      />
      <QuotaGuideOverview guide={guide} />
      <ContentSectionList sections={guide.sections} />
    </ContentPageShell>
  );
}

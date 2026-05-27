import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CollegeSelector } from "@/components/features/colleges/comparison/CollegeSelector";
import { ComparisonMetricsTable } from "@/components/features/colleges/comparison/ComparisonMetricsTable";
import { BestFitScoreCard } from "@/components/features/colleges/comparison/BestFitScoreCard";
import { RecommendationPanel } from "@/components/features/colleges/comparison/RecommendationPanel";
import { ComparisonCTAGroup } from "@/components/features/colleges/comparison/ComparisonCTAGroup";
import { getAllColleges } from "@/lib/data/colleges";
import { getComparisonMetrics } from "@/lib/data/comparison";
import { toCollegeSummary } from "@/lib/colleges/mappers";
import { getPageMeta } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  const meta = getPageMeta("comparison");
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/compare",
  });
}

export default function ComparePage() {
  const meta = getPageMeta("comparison");
  const catalog = getAllColleges();
  const summaries = catalog.map(toCollegeSummary);
  const metrics = getComparisonMetrics();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare" },
        ]}
      />
      <PageHeader
        eyebrow="Decision Tools"
        title={meta.title}
        description={meta.description}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <CollegeSelector catalog={summaries} />
        <div className="flex flex-col gap-6">
          <BestFitScoreCard catalog={catalog} metrics={metrics} />
          <ComparisonMetricsTable catalog={catalog} metrics={metrics} />
          <RecommendationPanel catalog={catalog} metrics={metrics} />
          <ComparisonCTAGroup catalog={catalog} metrics={metrics} />
        </div>
      </div>
    </>
  );
}

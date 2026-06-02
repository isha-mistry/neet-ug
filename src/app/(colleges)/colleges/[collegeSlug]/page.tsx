import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CollegeDetailHeader } from "@/components/features/colleges/detail/CollegeDetailHeader";
import { KeyInfoStrip } from "@/components/features/colleges/detail/KeyInfoStrip";
import { FeesBreakdown } from "@/components/features/colleges/detail/FeesBreakdown";
import { CutoffTrendGraph } from "@/components/features/colleges/detail/CutoffTrendGraph";
import { BondInfo } from "@/components/features/colleges/detail/BondInfo";
import { InfrastructureStats } from "@/components/features/colleges/detail/InfrastructureStats";
import { ReviewsBlock } from "@/components/features/colleges/detail/ReviewsBlock";
import { DetailCTAGroup } from "@/components/features/colleges/detail/DetailCTAGroup";
import {
  getAllColleges,
  getCollegeDetailBySlug,
} from "@/lib/data/colleges";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildCollegeJsonLd } from "@/lib/seo/jsonld";

interface PageProps {
  params: Promise<{ collegeSlug: string }>;
}

export async function generateStaticParams() {
  const colleges = await getAllColleges();
  return colleges.map((college) => ({ collegeSlug: college.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { collegeSlug } = await params;
  const college = await getCollegeDetailBySlug(collegeSlug);
  if (!college) {
    return buildMetadata({
      title: "College Not Found",
      description: "No matching college found.",
    });
  }
  return buildMetadata({
    title: college.name,
    description: `${college.name} in ${college.city}, ${college.stateName}. Fees, cutoff, bond and infrastructure details.`,
    path: `/colleges/${collegeSlug}`,
  });
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { collegeSlug } = await params;
  const college = await getCollegeDetailBySlug(collegeSlug);
  if (!college) {
    notFound();
  }
  const jsonLd = buildCollegeJsonLd(college);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/colleges" },
          { label: college.name },
        ]}
      />
      <CollegeDetailHeader
        name={college.name}
        city={college.city}
        stateName={college.stateName}
        collegeType={college.collegeType}
      />
      <KeyInfoStrip
        totalAnnualFee={college.totalAnnualFee}
        latestCutoffRank={college.latestCutoffRank}
        latestCutoffYear={college.latestCutoffYear}
        seatCount={college.seatCount}
      />
      <DetailCTAGroup collegeSlug={college.slug} />
      <div className="grid gap-6 lg:grid-cols-2">
        <FeesBreakdown fees={college.fees} />
        <CutoffTrendGraph cutoffs={college.cutoffs} />
        <BondInfo bond={college.bond} />
        <InfrastructureStats infrastructure={college.infrastructure} />
      </div>
      <ReviewsBlock reviews={college.reviews} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

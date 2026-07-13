import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CollegeDetailFacts } from "@/components/features/colleges/detail/CollegeDetailFacts";
import { CollegeDetailHeader } from "@/components/features/colleges/detail/CollegeDetailHeader";
import { CollegeDetailAtAGlance } from "@/components/features/colleges/detail/CollegeDetailAtAGlance";
import { CollegeDetailQuotaFeeCallout } from "@/components/features/colleges/detail/CollegeDetailQuotaFeeCallout";
import { CollegeDetailSectionNav } from "@/components/features/colleges/detail/CollegeDetailSectionNav";
import {
  getAllColleges,
  getCollegeDetailBySlug,
} from "@/lib/data/colleges";
import { pickRelatedColleges } from "@/lib/colleges/related-colleges";
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
    metaTitle: `${college.name} MBBS Admission 2026 | Fees, Cutoff & Seats`,
    description: `Explore MBBS admission details for ${college.name}, including fees, seat matrix, cutoff trends, counselling quotas, and eligibility information.`,
    path: `/colleges/${collegeSlug}`,
  });
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { collegeSlug } = await params;
  const college = await getCollegeDetailBySlug(collegeSlug);
  if (!college) {
    notFound();
  }

  const catalog = await getAllColleges();
  const related = pickRelatedColleges(college, catalog, 4);
  const jsonLd = buildCollegeJsonLd(college);
  const showSeats = Boolean(college.seatMatrix || college.mccSeatMatrix);
  const counsellingPageLabel = `College: ${college.name}`;
  const counsellingFormClass =
    "p-4 shadow-sm md:p-5 [&_h2]:text-lg [&_h2]:md:text-xl";

  return (
    <>
      <div className="ms-content-below-nav flex flex-col gap-4 md:gap-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Colleges", href: "/colleges" },
            { label: college.name },
          ]}
        />

        <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant">
          Fees, cutoffs, seat matrix, and bond details for{" "}
          <span className="font-semibold text-on-surface">{college.name}</span> in{" "}
          {college.city}, {college.stateName}.
        </p>

        <div className="flex flex-col gap-8 md:gap-10">
          <CollegeDetailHeader
            slug={college.slug}
            name={college.name}
            city={college.city}
            stateName={college.stateName}
            collegeType={college.collegeType}
            quotaInfo={college.quotaInfo}
            seatMatrix={college.seatMatrix}
            mccSeatMatrix={college.mccSeatMatrix}
            officialWebsite={college.otherInfo?.officialWebsite}
            counsellingBrochureUrl={college.otherInfo?.counsellingBrochureUrl}
            bond={college.bond}
            seatCount={college.seatCount}
            universityName={college.universityName}
            nirfMedicalRank={college.nirfMedicalRank}
            nirfRankingYear={college.nirfRankingYear}
          />

          <CollegeDetailAtAGlance
            totalAnnualFee={college.totalAnnualFee}
            latestCutoffRank={college.latestCutoffRank}
            latestCutoffYear={college.latestCutoffYear}
            seatCount={college.seatCount}
            nirfMedicalRank={college.nirfMedicalRank}
            nirfRankingYear={college.nirfRankingYear}
            bondYears={college.bond.years}
          />

          <CollegeDetailSectionNav showSeats={showSeats} variant="mobile" />

          {college.fees.quotaBreakdown ? (
            <CollegeDetailQuotaFeeCallout breakdown={college.fees.quotaBreakdown} />
          ) : null}

          <CollegeDetailFacts
            college={college}
            related={related}
            showSeats={showSeats}
            counsellingPageLabel={counsellingPageLabel}
            counsellingFormClass={counsellingFormClass}
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

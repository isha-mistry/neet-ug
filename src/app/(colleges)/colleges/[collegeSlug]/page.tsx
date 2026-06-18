import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CollegeDetailHeader } from "@/components/features/colleges/detail/CollegeDetailHeader";
import { CollegeDetailAtAGlance } from "@/components/features/colleges/detail/CollegeDetailAtAGlance";
import { CollegeDecisionSnapshot } from "@/components/features/colleges/detail/CollegeDecisionSnapshot";
import { CollegeDetailQuotaFeeCallout } from "@/components/features/colleges/detail/CollegeDetailQuotaFeeCallout";
import { AdmissionInfo } from "@/components/features/colleges/detail/AdmissionInfo";
import { SeatMatrixInfo } from "@/components/features/colleges/detail/SeatMatrixInfo";
import { FeesAndBondInfo } from "@/components/features/colleges/detail/FeesAndBondInfo";
import { CollegeClinicalInfo } from "@/components/features/colleges/detail/CollegeClinicalInfo";
import { CollegeCounsellingPath } from "@/components/features/colleges/detail/CollegeCounsellingPath";
import { CollegeDetailComparePanel } from "@/components/features/colleges/detail/CollegeDetailComparePanel";
import { CollegeDetailRelated } from "@/components/features/colleges/detail/CollegeDetailRelated";
import { CollegeDetailQuickLinks } from "@/components/features/colleges/detail/CollegeDetailQuickLinks";
import { CollegeDetailSectionNav } from "@/components/features/colleges/detail/CollegeDetailSectionNav";
import { CollegeDetailCtaBand } from "@/components/features/colleges/detail/CollegeDetailCtaBand";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
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
    description: `${college.name} in ${college.city}, ${college.stateName}. Fees, cutoff, bond and admission details.`,
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
  const showSeats = Boolean(college.seatMatrix);
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
          roiScore={college.roiScore}
          nirfMedicalRank={college.nirfMedicalRank}
          nirfRankingYear={college.nirfRankingYear}
          bondYears={college.bond.years}
        />

        <CollegeDetailSectionNav showSeats={showSeats} variant="mobile" />

        <div className="flex flex-col gap-4 xl:hidden">
          <FreeCounsellingLeadForm
            pageLabel={counsellingPageLabel}
            title="Book free counselling"
            submitLabel="Book counselling"
            fields="name-phone-only"
            className={counsellingFormClass}
          />
          <CollegeDetailComparePanel
            slug={college.slug}
            collegeName={college.name}
          />
        </div>

        {college.fees.quotaBreakdown ? (
          <CollegeDetailQuotaFeeCallout breakdown={college.fees.quotaBreakdown} />
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start xl:gap-10">
          <div className="flex min-w-0 flex-col gap-10">
            <CollegeDecisionSnapshot college={college} />

            <div id="admission" className="scroll-mt-28">
              <AdmissionInfo
                seatCount={college.seatCount}
                cutoffs={college.cutoffs}
              />
            </div>

            {college.seatMatrix ? (
              <div id="seats" className="scroll-mt-28">
                <SeatMatrixInfo seatMatrix={college.seatMatrix} />
              </div>
            ) : null}

            <div id="fees" className="scroll-mt-28">
              <FeesAndBondInfo
                fees={college.fees}
                bond={college.bond}
                stateSlug={college.stateSlug}
              />
            </div>

            <CollegeClinicalInfo
              infrastructure={college.infrastructure}
              collegeName={college.name}
            />

            <CollegeCounsellingPath
              collegeName={college.name}
              stateName={college.stateName}
              stateSlug={college.stateSlug}
              seatMatrix={college.seatMatrix}
            />

            <CollegeDetailCtaBand collegeName={college.name} />
          </div>

          <aside className="hidden flex-col gap-4 xl:sticky xl:top-24 xl:flex">
            <FreeCounsellingLeadForm
              pageLabel={counsellingPageLabel}
              title="Book free counselling"
              submitLabel="Book counselling"
              fields="name-phone-only"
              className={counsellingFormClass}
            />
            <CollegeDetailComparePanel
              slug={college.slug}
              collegeName={college.name}
            />
            <CollegeDetailSectionNav showSeats={showSeats} variant="sidebar" />
            <CollegeDetailRelated peers={related} />
            <CollegeDetailQuickLinks
              stateName={college.stateName}
              stateSlug={college.stateSlug}
            />
          </aside>
        </div>

        <div className="flex flex-col gap-4 xl:hidden">
          <CollegeDetailRelated peers={related} />
          <CollegeDetailQuickLinks
            stateName={college.stateName}
            stateSlug={college.stateSlug}
          />
        </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CollegeDetailHeader } from "@/components/features/colleges/detail/CollegeDetailHeader";
import { AdmissionInfo } from "@/components/features/colleges/detail/AdmissionInfo";
import { SeatMatrixInfo } from "@/components/features/colleges/detail/SeatMatrixInfo";
import { FeesAndBondInfo } from "@/components/features/colleges/detail/FeesAndBondInfo";
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
      <div className="flex flex-col gap-10">
        <CollegeDetailHeader
          name={college.name}
          city={college.city}
          stateName={college.stateName}
          collegeType={college.collegeType}
          quotaInfo={college.quotaInfo}
          officialWebsite={college.otherInfo?.officialWebsite}
          counsellingBrochureUrl={college.otherInfo?.counsellingBrochureUrl}
          bond={college.bond}
          seatCount={college.seatCount}
        />
        
        <AdmissionInfo seatCount={college.seatCount} cutoffs={college.cutoffs} />
        
        {college.seatMatrix && <SeatMatrixInfo seatMatrix={college.seatMatrix} />}
        
        <FeesAndBondInfo fees={college.fees} bond={college.bond} />
      </div>

      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
    </>
  );
}



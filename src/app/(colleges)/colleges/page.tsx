import type { Metadata } from "next";
import { CollegeListPageTemplate } from "@/components/features/colleges/listing/CollegeListPageTemplate";
import { CollegesListingHero } from "@/components/features/colleges/listing/CollegesListingHero";
import { getCollegeListing, getFilterOptions } from "@/lib/data/colleges";
import { getPageMeta } from "@/lib/data/site";
import { parseListSearchParams } from "@/lib/colleges/filters";
import { buildMetadata } from "@/lib/seo/metadata";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateMetadata(): Metadata {
  const meta = getPageMeta("allColleges");
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: "/colleges",
  });
}

export default async function AllCollegesPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const filters = parseListSearchParams(resolved);
  const [listing, filterOptions] = await Promise.all([
    getCollegeListing(filters),
    getFilterOptions(),
  ]);

  return (
    <>
      <CollegesListingHero />
      <CollegeListPageTemplate
        basePath="/colleges"
        filters={filters}
        filterOptions={filterOptions}
        listing={listing}
      />
    </>
  );
}

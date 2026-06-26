import type { Metadata } from "next";
import { CollegeListPageTemplate } from "@/components/features/colleges/listing/CollegeListPageTemplate";
import { CollegesListingHero } from "@/components/features/colleges/listing/CollegesListingHero";
import { getCollegeListing, getFilterOptions } from "@/lib/data/colleges";
import { getPageMeta } from "@/lib/data/site";
import { parseListSearchParams } from "@/lib/colleges/filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/site-config";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const page = Number(resolved?.page) || 1;
  const meta = getPageMeta("allColleges");
  const path = page > 1 ? `/colleges?page=${page}` : "/colleges";

  return buildMetadata({
    title: page > 1 ? `${meta.title} - Page ${page}` : meta.title,
    description: meta.description,
    path,
  });
}

export default async function AllCollegesPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const filters = parseListSearchParams(resolved);
  const [listing, filterOptions] = await Promise.all([
    getCollegeListing(filters),
    getFilterOptions(),
  ]);

  const currentPage = filters.page || 1;
  const totalPages = listing.pagination.totalPages;

  const buildPageUrl = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(resolved)) {
      if (k === "page") continue;
      if (Array.isArray(v)) {
        v.forEach((val) => sp.append(k, val));
      } else if (v !== undefined) {
        sp.set(k, v);
      }
    }
    sp.set("page", String(p));
    return `/colleges?${sp.toString()}`;
  };

  return (
    <>
      {currentPage > 1 && (
        <link rel="prev" href={`${SITE_URL}${buildPageUrl(currentPage - 1)}`} />
      )}
      {currentPage < totalPages && (
        <link rel="next" href={`${SITE_URL}${buildPageUrl(currentPage + 1)}`} />
      )}
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

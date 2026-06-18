import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CollegeListPageTemplate } from "@/components/features/colleges/listing/CollegeListPageTemplate";
import {
  getCollegeListing,
  getFilterOptions,
} from "@/lib/data/colleges";
import {
  findCategoryBySlug,
  getAllCategories,
  presetToFilters,
} from "@/lib/data/categories";
import { parseListSearchParams } from "@/lib/colleges/filters";
import { buildMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    categorySlug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);
  if (!category) {
    return buildMetadata({
      title: "Category Not Found",
      description: "No matching category found.",
    });
  }
  return buildMetadata({
    title: category.title,
    description: category.description,
    path: `/colleges/category/${categorySlug}`,
  });
}

export default async function CategoryCollegesPage({
  params,
  searchParams,
}: PageProps) {
  const { categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }
  const resolved = await searchParams;
  const userFilters = parseListSearchParams(resolved);
  const preset = presetToFilters(category);
  const filters = {
    ...userFilters,
    collegeTypes: preset.collegeTypes ?? userFilters.collegeTypes,
    feeMax:
      preset.feeMax !== undefined
        ? Math.min(preset.feeMax, userFilters.feeMax ?? preset.feeMax)
        : userFilters.feeMax,
  };
  const listing = await getCollegeListing(filters);
  const filterOptions = await getFilterOptions();

  return (
    <div className="ms-content-below-nav flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/colleges" },
          { label: "Categories", href: "/colleges/category" },
          { label: category.title },
        ]}
      />
      <PageHeader
        eyebrow="Category"
        title={category.title}
        description={category.description}
      />
      <CollegeListPageTemplate
        basePath={`/colleges/category/${categorySlug}`}
        filters={filters}
        filterOptions={filterOptions}
        listing={listing}
        hiddenFilters={
          preset.collegeTypes ? ["collegeType", "collegeTypes"] : undefined
        }
        lockedFilters={{
          collegeTypes: preset.collegeTypes,
          feeMax: preset.feeMax,
        }}
      />
    </div>
  );
}

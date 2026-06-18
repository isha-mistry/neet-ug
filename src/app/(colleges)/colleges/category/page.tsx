import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CategoryDirectoryGrid } from "@/components/features/colleges/directory/CategoryDirectoryGrid";
import { getCategoryDirectoryItems } from "@/lib/data/directory";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "MBBS Colleges by Category",
    description:
      "Browse government, private, AIIMS, and low-fee MBBS colleges with pre-applied filters.",
    path: "/colleges/category",
  });
}

export default async function CategoriesDirectoryPage() {
  const categories = await getCategoryDirectoryItems();

  return (
    <div className="ms-content-below-nav flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/colleges" },
          { label: "Categories" },
        ]}
      />
      <PageHeader
        eyebrow="Intent-based Discovery"
        title="MBBS Colleges by Category"
        description="Pick a category to view colleges that match your budget, college type, or admission goals."
      />
      <CategoryDirectoryGrid categories={categories} />
    </div>
  );
}

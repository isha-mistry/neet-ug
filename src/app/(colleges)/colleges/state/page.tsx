import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { StateDirectoryGrid } from "@/components/features/colleges/directory/StateDirectoryGrid";
import { getStateDirectoryItems } from "@/lib/data/directory";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "MBBS Colleges by State",
    description:
      "Browse MBBS colleges state by state with counseling context, seat counts, and competition levels.",
    path: "/colleges/state",
  });
}

export default function StatesDirectoryPage() {
  const states = getStateDirectoryItems();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/colleges" },
          { label: "States" },
        ]}
      />
      <PageHeader
        eyebrow="State-wise Discovery"
        title="MBBS Colleges by State"
        description="Choose a state to explore counseling details, competition level, and the full list of MBBS colleges in that region."
      />
      <StateDirectoryGrid states={states} />
    </>
  );
}

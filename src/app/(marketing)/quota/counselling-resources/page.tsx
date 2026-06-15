import type { Metadata } from "next";
import { CounsellingResourcesView } from "@/components/features/quota/CounsellingResourcesView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Counselling Resources & Portals - NEET UG",
  description:
    "Your authoritative gateway to medical admissions in India. Access verified official portals for Central and State-level NEET UG counselling in one streamlined hub.",
  path: "/quota/counselling-resources",
});

export default function CounsellingResourcesPage() {
  return <CounsellingResourcesView />;
}

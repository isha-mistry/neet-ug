import type { Metadata } from "next";
import { UgCounsellingGuideView } from "@/components/features/neet-ug/UgCounsellingGuideView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG Counselling Process",
  metaTitle: "NEET UG Counselling Process 2026 | Step-by-Step Admission Guide",
  description:
    "Learn the complete NEET UG counselling process from registration and choice filling to seat allotment and admission.",
  path: "/neet-ug-2026/counselling-guide",
});

export default function UgCounsellingGuidePage() {
  return <UgCounsellingGuideView />;
}

import type { Metadata } from "next";
import { NriAdmissionGuideView } from "@/components/features/neet-ug/NriAdmissionGuideView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NRI MBBS Admission Guide",
  metaTitle: "NRI Quota MBBS Admission 2026 | Eligibility, Fees & Counselling",
  description:
    "Understand NRI quota admissions, eligibility criteria, required documents, fee structures, and counselling procedures.",
  path: "/neet-ug-2026/nri-guide",
});

export default function NriAdmissionGuidePage() {
  return <NriAdmissionGuideView />;
}

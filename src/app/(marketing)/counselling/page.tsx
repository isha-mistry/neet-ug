import { CounsellingPageView } from "@/components/features/counselling/CounsellingPageView";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Medical College Admission Guidance",
  metaTitle: "Medical College Admission Guidance | NEET UG Counselling Services",
  description:
    "Get personalized guidance for medical college admissions through NEET UG counselling. Explore colleges, quotas, fees, and admission strategies.",
  path: "/counselling",
});

export default function CounsellingPage() {
  return <CounsellingPageView />;
}

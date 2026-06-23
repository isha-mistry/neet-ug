import type { Metadata } from "next";
import { AllIndiaQuotaView } from "@/components/features/quota/AllIndiaQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "All India Quota Admissions",
  metaTitle: "All India Quota MBBS Admission 2026 | AIQ Counselling Guide",
  description:
    "Learn about AIQ admissions, counselling rounds, seat allocation, eligibility, and cutoff trends.",
  path: "/quota/all-india",
});

export default function AllIndiaQuotaPage() {
  return <AllIndiaQuotaView />;
}

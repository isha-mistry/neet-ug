import type { Metadata } from "next";
import { DeemedQuotaView } from "@/components/features/quota/DeemedQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Deemed University MBBS Admissions",
  metaTitle: "Deemed University MBBS Admission 2026 | Colleges, Fees & Cutoffs",
  description:
    "Explore MBBS admissions in deemed universities, including counselling, fees, seats, and cutoff trends.",
  path: "/quota/deemed",
});

export default function DeemedUniversityQuotaPage() {
  return <DeemedQuotaView />;
}

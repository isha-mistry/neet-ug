import type { Metadata } from "next";
import { NriQuotaView } from "@/components/features/quota/NriQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NRI Quota MBBS Admissions",
  metaTitle: "NRI Quota MBBS Admission 2026 | Fees, Eligibility & Counselling",
  description:
    "Learn about NRI quota admissions, documentation requirements, fees, and admission procedures.",
  path: "/quota/nri",
});

export default function NriQuotaPage() {
  return <NriQuotaView />;
}

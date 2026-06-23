import type { Metadata } from "next";
import { ManagementQuotaView } from "@/components/features/quota/ManagementQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Management Quota MBBS Admissions",
  metaTitle: "Management Quota MBBS Admission 2026 | Fees, Eligibility & Colleges",
  description:
    "Explore management quota admission opportunities, fee structures, and medical college options across India.",
  path: "/quota/management",
});

export default function ManagementQuotaPage() {
  return <ManagementQuotaView />;
}

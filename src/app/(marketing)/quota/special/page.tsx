import type { Metadata } from "next";
import { SpecialQuotaView } from "@/components/features/quota/SpecialQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Special & Institutional Quotas - NEET UG",
  description:
    "Guide on special and institutional medical admission quotas in India, including ESIC, AFMC Pune, CW Quota, Minority Quotas, Maharashtra Institute Quota, and Central Quotas.",
  path: "/quota/special",
});

export default function SpecialQuotasPage() {
  return <SpecialQuotaView />;
}

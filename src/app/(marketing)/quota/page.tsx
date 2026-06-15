import type { Metadata } from "next";
import { QuotaOverview } from "@/components/features/quota/QuotaOverview";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Understanding the Seat Quota System",
  description:
    "A guide to medical admission quotas in India, covering All India Quota (AIQ), State Quota (SQ), Management Quota (MQ), NRI Quota, Deemed Universities, and Special Quotas.",
  path: "/quota",
});

export default function QuotaPage() {
  return <QuotaOverview />;
}

import type { Metadata } from "next";
import { QuotaOverview } from "@/components/features/quota/QuotaOverview";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Medical Admission Quotas in India",
  metaTitle: "Medical Admission Quotas in India | AIQ, State, NRI & Management",
  description:
    "Understand all major admission quotas in India and how they affect counselling, eligibility, and fees.",
  path: "/quota",
});

export default function QuotaPage() {
  return <QuotaOverview />;
}

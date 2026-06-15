import type { Metadata } from "next";
import { DeemedQuotaView } from "@/components/features/quota/DeemedQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Deemed University Quota Guide - NEET UG",
  description:
    "Comprehensive guide to Deemed University Quota counselling. Learn about MCC registration, 2 Lakhs refundable deposit, and state-wise Deemed medical colleges.",
  path: "/quota/deemed",
});

export default function DeemedUniversityQuotaPage() {
  return <DeemedQuotaView />;
}

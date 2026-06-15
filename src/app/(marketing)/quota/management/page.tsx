import type { Metadata } from "next";
import { ManagementQuotaView } from "@/components/features/quota/ManagementQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Management Quota (MQ) Guide - Private Medical Colleges",
  description:
    "Explore Management Quota (MQ) seats, state-wise fees range (₹8L - ₹25L/yr), rank ranges, and counselling process for private medical colleges in India.",
  path: "/quota/management",
});

export default function ManagementQuotaPage() {
  return <ManagementQuotaView />;
}

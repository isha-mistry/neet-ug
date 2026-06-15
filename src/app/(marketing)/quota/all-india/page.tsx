import type { Metadata } from "next";
import { AllIndiaQuotaView } from "@/components/features/quota/AllIndiaQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "All India Quota (AIQ) Guide - NEET UG",
  description:
    "Understand the 15% All India Quota eligibility, central reservation rules, state-wise seats, premium central universities (AIIMS, JIPMER, AFMC), and MCC counselling rounds.",
  path: "/quota/all-india",
});

export default function AllIndiaQuotaPage() {
  return <AllIndiaQuotaView />;
}

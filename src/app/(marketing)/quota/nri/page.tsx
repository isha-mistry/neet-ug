import type { Metadata } from "next";
import { NriQuotaView } from "@/components/features/quota/NriQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NRI Quota Admission Guide - NEET UG",
  description:
    "Check NRI, OCI, and PIO eligibility, mandatory document checklist (embassy certificate, sponsorship affidavit), and state-wise seats distribution.",
  path: "/quota/nri",
});

export default function NriQuotaPage() {
  return <NriQuotaView />;
}

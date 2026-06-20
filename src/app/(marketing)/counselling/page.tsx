import { CounsellingPageView } from "@/components/features/counselling/CounsellingPageView";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "MBBS Counselling for NEET 2026 — MedSeat",
  description:
    "Plan your college list, quota route, documents and counselling rounds with clear MBBS counselling support across Gujarat, Rajasthan, MP, Maharashtra and All India Quota MCC.",
  path: "/counselling",
});

export default function CounsellingPage() {
  return <CounsellingPageView />;
}

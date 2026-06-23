import type { Metadata } from "next";
import { NeetUg2026View } from "@/components/features/neet-ug/NeetUg2026View";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG 2026 Guidance",
  metaTitle: "NEET UG 2026 Guide | Counselling, Admissions & Seat Allotment",
  description:
    "Everything you need to know about NEET UG 2026, including counselling, admissions, seat allotment, and important dates.",
  path: "/neet-ug-2026",
});

export default function NeetUg2026Page() {
  return <NeetUg2026View />;
}

import type { Metadata } from "next";
import { NeetUg2026View } from "@/components/features/neet-ug/NeetUg2026View";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG 2026 Hub — Exam Dates, Eligibility, Cutoffs & Counseling",
  description:
    "Complete NEET UG 2026 guide: ReNEET timeline, eligibility, exam pattern, expected cutoffs, and links to MCC AIQ and state counseling resources.",
  path: "/neet-ug-2026",
});

export default function NeetUg2026Page() {
  return <NeetUg2026View />;
}

import type { Metadata } from "next";
import { JourneyHomeLanding } from "@/components/features/journey-home/JourneyHomeLanding";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG Counselling Guidance",
  metaTitle: "NEET UG Counselling Guidance 2026 | Medical College Admissions | Dravio",
  description:
    "Get expert NEET UG counselling guidance for medical college admissions. Understand counselling rounds, quotas, cutoffs, seat allotment, and admission opportunities across India.",
  path: "/",
});

export default function HomePage() {
  return <JourneyHomeLanding />;
}


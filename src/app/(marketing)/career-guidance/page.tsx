import type { Metadata } from "next";
import { CareerGuidanceView } from "@/components/features/career-guidance/CareerGuidanceView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Medical Career Guidance After NEET",
  metaTitle: "Medical Career Guidance After NEET | MBBS, BDS & Allied Courses",
  description:
    "Explore medical and healthcare career options available after NEET, including MBBS, BDS, AYUSH, and allied fields.",
  path: "/career-guidance",
});

export default function CareerGuidancePage() {
  return <CareerGuidanceView />;
}

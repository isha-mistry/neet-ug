import type { Metadata } from "next";
import { CareerGuidanceView } from "@/components/features/career-guidance/CareerGuidanceView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Career Options & Guidance After NEET UG 2026 | MedSeat",
  description:
    "Explore diverse career pathways after NEET UG in India. Compare MBBS, BDS, AYUSH, Nursing, Veterinary, and Allied Health sciences courses with tuition fees, duration, and average salaries.",
  path: "/career-guidance",
});

export default function CareerGuidancePage() {
  return <CareerGuidanceView />;
}

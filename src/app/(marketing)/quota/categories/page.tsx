import type { Metadata } from "next";
import { ReservationCategoriesView } from "@/components/features/quota/ReservationCategoriesView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET Reservation Categories",
  metaTitle: "NEET Reservation Categories Explained 2026",
  description:
    "Understand reservation categories, eligibility requirements, and their impact on medical college admissions.",
  path: "/quota/categories",
});

export default function ReservationCategoriesPage() {
  return <ReservationCategoriesView />;
}

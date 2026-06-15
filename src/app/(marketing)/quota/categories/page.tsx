import type { Metadata } from "next";
import { ReservationCategoriesView } from "@/components/features/quota/ReservationCategoriesView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Reservation Categories & Eligibility - NEET UG",
  description:
    "Navigating the complex landscape of medical reservations. We simplify quotas, state-specific rules, and document requirements for your dream college.",
  path: "/quota/categories",
});

export default function ReservationCategoriesPage() {
  return <ReservationCategoriesView />;
}

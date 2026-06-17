import type { Metadata } from "next";
import { StateCounsellingView } from "@/components/features/state-counselling/StateCounsellingView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG State Counselling Guide",
  description:
    "Compare NEET UG state counselling authorities, eligibility, reservation, documents, rounds, seat categories and admission rules for Gujarat, Maharashtra, Rajasthan and Madhya Pradesh.",
  path: "/state-counselling",
});

export default function StateCounsellingPage() {
  return <StateCounsellingView />;
}

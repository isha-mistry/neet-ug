import type { Metadata } from "next";
import { StateCounsellingView } from "@/components/features/state-counselling/StateCounsellingView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "State Wise NEET UG Counselling",
  metaTitle: "State Wise NEET UG Counselling 2026 | Admission Process & Cutoffs",
  description:
    "Explore state-specific counselling processes, eligibility criteria, quotas, and cutoff trends across India.",
  path: "/state-counselling",
});

export default function StateCounsellingPage() {
  return <StateCounsellingView />;
}

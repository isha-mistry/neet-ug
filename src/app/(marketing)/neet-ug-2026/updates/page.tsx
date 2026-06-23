import type { Metadata } from "next";
import { NeetUgUpdatesView } from "@/components/features/neet-ug/NeetUgUpdatesView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG 2026 Updates",
  metaTitle: "NEET UG 2026 Updates, Notifications & Admission News",
  description:
    "Stay updated with the latest NEET UG 2026 announcements, counselling updates, and admission notifications.",
  path: "/neet-ug-2026/updates",
});

export default function NeetUgUpdatesPage() {
  return <NeetUgUpdatesView />;
}

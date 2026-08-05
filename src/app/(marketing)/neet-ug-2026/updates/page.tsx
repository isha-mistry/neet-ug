import type { Metadata } from "next";
import { NeetUgUpdatesView } from "@/components/features/neet-ug/NeetUgUpdatesView";
import { getNoticeFeed } from "@/lib/neet-ug-2026/notice-feed";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG 2026 Updates",
  metaTitle: "NEET UG 2026 Updates, Notifications & Admission News",
  description:
    "Stay updated with the latest NEET UG 2026 announcements, counselling updates, and admission notifications.",
  path: "/neet-ug-2026/updates",
});

export default async function NeetUgUpdatesPage() {
  const notices = await getNoticeFeed();
  return <NeetUgUpdatesView notices={notices} />;
}

import type { Metadata } from "next";
import { NeetUgNoticesArchiveView } from "@/components/features/neet-ug/NeetUgNoticesArchiveView";
import { getNoticeFeed } from "@/lib/neet-ug-2026/notice-feed";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG 2026 Notices",
  metaTitle: "NEET UG 2026 Latest Official Notices | NTA, MCC & State",
  description:
    "View all the latest NEET UG 2026 official notifications — NTA, MCC, and state counselling PDFs. Filter by authority and open government links.",
  path: "/neet-ug-2026/updates/notices",
});

export default async function NeetUgNoticesPage() {
  const notices = await getNoticeFeed();
  return <NeetUgNoticesArchiveView notices={notices} />;
}

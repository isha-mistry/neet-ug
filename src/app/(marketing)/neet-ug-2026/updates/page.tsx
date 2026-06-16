import type { Metadata } from "next";
import { NeetUgUpdatesView } from "@/components/features/neet-ug/NeetUgUpdatesView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG 2026 Live Updates — NTA Dates, ReNEET & Counselling Alerts",
  description:
    "Official NEET UG 2026 timeline: ReNEET on 21 June, tentative answer key and results, MCC AIQ and state counselling windows — with WhatsApp alerts and predictor tools.",
  path: "/neet-ug-2026/updates",
});

export default function NeetUgUpdatesPage() {
  return <NeetUgUpdatesView />;
}

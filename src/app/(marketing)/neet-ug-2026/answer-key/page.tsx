import type { Metadata } from "next";
import { NeetAnswerKeyView } from "@/components/features/neet-ug/NeetAnswerKeyView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG Answer Key",
  metaTitle: "NEET UG 2026 Answer Key & Score Analysis",
  description:
    "Check answer key updates, estimate your NEET score, and understand its impact on counselling opportunities.",
  path: "/neet-ug-2026/answer-key",
});

export default function NeetAnswerKeyPage() {
  return <NeetAnswerKeyView />;
}

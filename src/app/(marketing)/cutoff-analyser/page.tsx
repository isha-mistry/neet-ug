import type { Metadata } from "next";
import { CutoffAnalyserClient } from "@/components/features/cutoff-analyser/CutoffAnalyserClient";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "MBBS Cutoff Analyser — NEET score to colleges",
  description:
    "Enter your NEET score to compare state and quota cutoffs across Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra. Build and export your college preference list.",
  path: "/cutoff-analyser",
});

export default function CutoffAnalyserPage() {
  return <CutoffAnalyserClient />;
}

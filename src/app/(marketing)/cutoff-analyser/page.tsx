import type { Metadata } from "next";
import { CutoffAnalyserClient } from "@/components/features/cutoff-analyser/CutoffAnalyserClient";
import { computeTeaserResult, computeUnlockedResult } from "@/lib/cutoff-analyser/run";
import { getCutoffAnalyserSession } from "@/lib/cutoff-analyser/session";
import { getAllStates } from "@/lib/data/states";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET Cutoff Analyser",
  metaTitle: "NEET Cutoff Analyser 2026 | College & Quota Trends",
  description:
    "Analyze previous year's cutoffs and understand your chances across different colleges and quotas.",
  path: "/cutoff-analyser",
});

export default async function CutoffAnalyserPage() {
  const session = await getCutoffAnalyserSession();
  let initialUnlocked = null;
  let initialTeaser = null;

  if (session) {
    try {
      initialUnlocked = await computeUnlockedResult(session);
      initialTeaser = await computeTeaserResult(session);
    } catch {
      initialUnlocked = null;
      initialTeaser = null;
    }
  }

  const states = await getAllStates();
  const stateOptions = states.map((state) => ({
    value: state.slug,
    label: state.name,
  }));

  return (
    <CutoffAnalyserClient
      stateOptions={stateOptions}
      initialSession={session}
      initialTeaser={initialTeaser}
      initialUnlocked={initialUnlocked}
    />
  );
}

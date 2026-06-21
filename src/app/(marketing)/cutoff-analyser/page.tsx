import type { Metadata } from "next";
import { CutoffAnalyserClient } from "@/components/features/cutoff-analyser/CutoffAnalyserClient";
import { computeTeaserResult, computeUnlockedResult } from "@/lib/cutoff-analyser/run";
import { getCutoffAnalyserSession } from "@/lib/cutoff-analyser/session";
import { getAllStates } from "@/lib/data/states";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "MBBS Cutoff Analyser — NEET score to colleges",
  description:
    "Enter your NEET score to compare state and quota cutoffs across Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra. Build and export your college preference list.",
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

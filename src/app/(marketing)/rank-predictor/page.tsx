import type { Metadata } from "next";
import { RankPredictorWizard } from "@/components/features/rank-predictor/RankPredictorWizard";
import { getAllStates } from "@/lib/data/states";
import { buildMetadata } from "@/lib/seo/metadata";
import { getRankPredictorSession } from "@/lib/rank-predictor/session";
import {
  computeTeaserResult,
  computeUnlockedResult,
} from "@/lib/rank-predictor/compute";
import type { NeetCategory } from "@/lib/rank-predictor/types";
export const metadata: Metadata = buildMetadata({
  title: "NEET Rank Predictor from Score",
  description:
    "Estimate your NEET All India Rank range from your score, preview sample colleges, and unlock a tighter band after verification.",
  path: "/rank-predictor",
});

const CATEGORY_OPTIONS: { value: NeetCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "ews", label: "EWS" },
  { value: "obc", label: "OBC-NCL" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "pwbd", label: "PwBD" },
];

export default async function RankPredictorPage() {
  const session = await getRankPredictorSession();
  const initialUnlocked = session ? await computeUnlockedResult(session) : null;
  const initialTeaser = session
    ? computeTeaserResult(session)
    : initialUnlocked;

  const states = await getAllStates();
  const stateOptions = states.map((state) => ({
    value: state.slug,
    label: state.name,
  }));

  return (
    <RankPredictorWizard
      stateOptions={stateOptions}
      categoryOptions={CATEGORY_OPTIONS}
      initialSession={session}
      initialTeaser={initialTeaser}
      initialUnlocked={initialUnlocked}
    />
  );
}

import type { Metadata } from "next";
import { RankPredictorWizard } from "@/components/features/rank-predictor/RankPredictorWizard";
import { getAllStates } from "@/lib/data/states";
import { buildMetadata } from "@/lib/seo/metadata";
import { getRankPredictorSession } from "@/lib/rank-predictor/session";
import { computeUnlockedResult } from "@/lib/rank-predictor/compute";
import type { NeetCategory } from "@/lib/rank-predictor/types";
export const metadata: Metadata = buildMetadata({
  title: "NEET 2026 Rank Predictor — See Where Your Score Lands",
  description:
    "Enter your NEET 2026 score and get an instant estimated AIR band built from the last two years of official score–rank data. Verify to unlock a refined band, your state merit rank and matched colleges.",
  path: "/rank-predictor",
});

const CATEGORY_OPTIONS: { value: NeetCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "ews", label: "EWS" },
  { value: "obc", label: "SEBC / OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "pwbd", label: "PwBD" },
];

export default async function RankPredictorPage() {
  const session = await getRankPredictorSession();
  let initialUnlocked = null;
  let initialTeaser = null;

  if (session) {
    try {
      initialUnlocked = await computeUnlockedResult(session);
      initialTeaser = initialUnlocked;
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
    <RankPredictorWizard
      stateOptions={stateOptions}
      categoryOptions={CATEGORY_OPTIONS}
      initialSession={session}
      initialTeaser={initialTeaser}
      initialUnlocked={initialUnlocked}
    />
  );
}

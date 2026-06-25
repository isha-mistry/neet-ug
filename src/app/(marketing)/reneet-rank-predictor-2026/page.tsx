import type { Metadata } from "next";
import { RankPredictorWizard } from "@/components/features/rank-predictor/RankPredictorWizard";
import { getAllStates } from "@/lib/data/states";
import { buildMetadata } from "@/lib/seo/metadata";
import { getRankPredictorSession } from "@/lib/rank-predictor/session";
import { computeUnlockedResult } from "@/lib/rank-predictor/compute";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import { RANK_PREDICTOR_PAGE_PATH } from "@/lib/rank-predictor/constants";

export const metadata: Metadata = buildMetadata({
  title: "ReNEET Rank Predictor 2026",
  metaTitle: "ReNEET Rank Predictor 2026 | Estimate Your All-India Rank",
  description:
    "Enter your ReNEET 2026 score to get an estimated All-India Rank band and explore likely admission opportunities before official results.",
  path: RANK_PREDICTOR_PAGE_PATH,
});

const CATEGORY_OPTIONS: { value: NeetCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "ews", label: "EWS" },
  { value: "obc", label: "SEBC / OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "pwbd", label: "PwBD" },
];

export default async function ReNeetRankPredictor2026Page() {
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

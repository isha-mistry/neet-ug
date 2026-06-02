import type { Metadata } from "next";
import { CollegePredictorWizard } from "@/components/features/college-predictor/CollegePredictorWizard";
import { getAllStates } from "@/lib/data/states";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCollegePredictorSession } from "@/lib/college-predictor/session";
import {
  computeTeaserResult,
  computeUnlockedResult,
} from "@/lib/college-predictor/compute";

export const metadata: Metadata = buildMetadata({
  title: "NEET College Predictor from AIR",
  description:
    "Enter your official All India Rank to see likely, possible, and reach college counts, then unlock full lists after mobile verification.",
  path: "/college-predictor",
});

export default async function CollegePredictorPage() {
  const session = await getCollegePredictorSession();
  const initialUnlocked = session ? await computeUnlockedResult(session) : null;
  const initialTeaser = session
    ? await computeTeaserResult(session)
    : initialUnlocked;

  const states = await getAllStates();
  const stateOptions = states.map((state) => ({
    value: state.slug,
    label: state.name,
  }));

  return (
    <CollegePredictorWizard
      stateOptions={stateOptions}
      initialSession={session}
      initialTeaser={initialTeaser}
      initialUnlocked={initialUnlocked}
    />
  );
}

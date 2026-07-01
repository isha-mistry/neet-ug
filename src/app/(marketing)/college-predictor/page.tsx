import type { Metadata } from "next";
import { CollegePredictorWizard } from "@/components/features/college-predictor/CollegePredictorWizard";
import { getAllStates } from "@/lib/data/states";
import { getCategoriesByState } from "@/lib/data/colleges";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCollegePredictorSession } from "@/lib/college-predictor/session";
import {
  computeTeaserResult,
  computeUnlockedResult,
} from "@/lib/college-predictor/compute";

export const metadata: Metadata = buildMetadata({
  title: "NEET College Predictor",
  metaTitle: "NEET College Predictor 2026 | Medical College Admission Chances",
  description:
    "Discover medical colleges where you may be eligible based on your NEET score, category, and state.",
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
  const categoriesByState = await getCategoriesByState();

  return (
    <CollegePredictorWizard
      stateOptions={stateOptions}
      categoriesByState={categoriesByState}
      initialSession={session}
      initialTeaser={initialTeaser}
      initialUnlocked={initialUnlocked}
    />
  );
}


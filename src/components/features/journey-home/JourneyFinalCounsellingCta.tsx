"use client";

import { JOURNEY_FINAL_COUNSELLING_CTA } from "@/lib/journey-home/content";
import { JourneyCounsellingLeadTrigger } from "./JourneyCounsellingLeadTrigger";

export function JourneyFinalCounsellingCta() {
  return (
    <JourneyCounsellingLeadTrigger
      label={JOURNEY_FINAL_COUNSELLING_CTA.buttonLabel}
      className="btn btn-blue"
      pageHash="cta"
      config={JOURNEY_FINAL_COUNSELLING_CTA}
    />
  );
}

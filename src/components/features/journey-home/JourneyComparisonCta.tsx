"use client";

import { useState } from "react";
import { JOURNEY_COMPARISON_CTA } from "@/lib/journey-home/content";
import { SeatRadarLeadModal } from "./SeatRadarLeadModal";

export function JourneyComparisonCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="cmp-cta reveal">
        <p className="cmp-cta-copy">{JOURNEY_COMPARISON_CTA.copy}</p>
        <button
          type="button"
          className="btn btn-blue"
          onClick={() => setOpen(true)}
        >
          {JOURNEY_COMPARISON_CTA.buttonLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <SeatRadarLeadModal
        open={open}
        redirectTo={JOURNEY_COMPARISON_CTA.redirectTo}
        onClose={() => setOpen(false)}
        introLine={JOURNEY_COMPARISON_CTA.introLine}
        lede={JOURNEY_COMPARISON_CTA.modalLede}
      />
    </>
  );
}

"use client";

import type { SeatRadarCtaContent } from "@/lib/journey-home/seat-radar-cta";

type SeatRadarResultCtaProps = {
  content: SeatRadarCtaContent;
  onAction: () => void;
};

export function SeatRadarResultCta({ content, onAction }: SeatRadarResultCtaProps) {
  return (
    <div className="radar-cta">
      <h4 className="radar-cta-heading">{content.heading}</h4>
      <p className="radar-cta-copy">{content.copy}</p>
      <button type="button" className="btn btn-blue" onClick={onAction}>
        {content.buttonLabel}
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
  );
}

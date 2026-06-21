"use client";

import { JourneyLeadModal } from "./JourneyLeadModal";

type SeatRadarLeadModalProps = {
  open: boolean;
  redirectTo: string;
  neetScore?: string;
  category?: string;
  onClose: () => void;
  introLine?: string;
  lede?: string;
};

const DEFAULT_INTRO =
  "Hi Dravio, I completed the Seat Radar on the home page.";
const DEFAULT_LEDE =
  "We'll follow up on WhatsApp with the next step for your Seat Radar result.";

export function SeatRadarLeadModal({
  open,
  redirectTo,
  neetScore = "",
  category = "gen",
  onClose,
  introLine = DEFAULT_INTRO,
  lede = DEFAULT_LEDE,
}: SeatRadarLeadModalProps) {
  return (
    <JourneyLeadModal
      open={open}
      redirectTo={redirectTo}
      variant="radar"
      neetScore={neetScore}
      category={category}
      onClose={onClose}
      introLine={introLine}
      lede={lede}
    />
  );
}

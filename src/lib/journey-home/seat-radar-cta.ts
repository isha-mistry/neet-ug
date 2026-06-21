import type { SeatRadarResult } from "./seat-radar";

export type SeatRadarCtaTier = "strong" | "tight" | "below";

export type SeatRadarCtaContent = {
  heading: string;
  copy: string;
  buttonLabel: string;
  redirectTo: string;
};

export const SEAT_RADAR_CATEGORY_LABELS: Record<string, string> = {
  gen: "General",
  ews: "EWS",
  obc: "SEBC / OBC",
  sc: "SC",
  st: "ST",
};

export { INDIAN_STATES_FOR_LEADS as SEAT_RADAR_DOMICILE_STATES } from "@/lib/leads/indian-states";

const CTA_BY_TIER: Record<SeatRadarCtaTier, SeatRadarCtaContent> = {
  strong: {
    heading: "Your next step",
    copy: "You have options. The main decision now is how to order your choices correctly before counselling starts.",
    buttonLabel: "Get my choice list reviewed",
    redirectTo: "/counselling",
  },
  tight: {
    heading: "Your next step",
    copy: "Your result may depend on the right quota, state, and round strategy. Review your options before choice filling begins.",
    buttonLabel: "Plan my counselling strategy",
    redirectTo: "/counselling",
  },
  below: {
    heading: "Your next step",
    copy: "There may still be admission routes to understand. Check the cutoff details before assuming there are no options.",
    buttonLabel: "Check cutoff options",
    redirectTo: "/cutoff-analyser",
  },
};

export function getSeatRadarCtaTier(
  result: SeatRadarResult,
): SeatRadarCtaTier | null {
  if (result.kind === "invalid") return null;
  if (result.kind === "below") return "below";
  if (result.tS >= 30) return "strong";
  return "tight";
}

export function getSeatRadarCtaContent(
  tier: SeatRadarCtaTier,
): SeatRadarCtaContent {
  return CTA_BY_TIER[tier];
}

import type { CutoffStatus } from "@/lib/cutoff-analyser/types";

export const STATUS_ROW_CLASS: Record<CutoffStatus, string> = {
  safe: "border-l-[3px] border-l-primary bg-college-metric-rank/40",
  borderline: "border-l-[3px] border-l-tertiary-container bg-tertiary-fixed/35",
  out: "border-l-[3px] border-l-error bg-error-container/45",
};

export const STATUS_BADGE_CLASS: Record<CutoffStatus, string> = {
  safe: "bg-college-type-government-bg text-college-type-government-fg ring-1 ring-primary/15",
  borderline: "bg-tertiary-fixed text-on-tertiary-fixed-variant ring-1 ring-tertiary-container/30",
  out: "bg-error-container text-on-error-container ring-1 ring-error/20",
};

export const STATUS_LABEL: Record<CutoffStatus, string> = {
  safe: "Safe",
  borderline: "Borderline",
  out: "Unlikely",
};

export const MAP_FILL: Record<CutoffStatus | "muted", string> = {
  safe: "var(--color-primary)",
  borderline: "var(--color-tertiary-container)",
  out: "var(--color-error)",
  muted: "var(--color-surface-container-highest)",
};

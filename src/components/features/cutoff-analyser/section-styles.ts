import type { CutoffStatus } from "@/lib/cutoff-analyser/types";

/** Clean rows without colorful left borders. */
export const STATUS_ROW_CLASS: Record<CutoffStatus, string> = {
  safe: "bg-surface-container-lowest",
  borderline: "bg-surface-container-lowest",
  out: "bg-surface-container-lowest",
};

export const STATUS_BADGE_CLASS: Record<CutoffStatus, string> = {
  safe: "bg-tertiary-fixed text-on-tertiary-fixed-variant ring-1 ring-tertiary/15",
  borderline: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  out: "bg-error-container text-on-error-container ring-1 ring-error/15",
};

export const STATUS_LABEL: Record<CutoffStatus, string> = {
  safe: "Safe",
  borderline: "Borderline",
  out: "Unlikely",
};

export const MAP_FILL: Record<CutoffStatus | "muted", string> = {
  safe: "var(--color-tertiary)",
  borderline: "#f59e0b",
  out: "var(--color-error)",
  muted: "var(--color-surface-container-high)",
};


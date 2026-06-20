import type { CutoffStatus } from "@/lib/cutoff-analyser/types";

/** Subtle left-accent rows — status shown via badge, not full-row tint. */
export const STATUS_ROW_CLASS: Record<CutoffStatus, string> = {
  safe: "border-l-[3px] border-l-primary bg-surface-container-lowest",
  borderline: "border-l-[3px] border-l-tertiary bg-surface-container-lowest",
  out: "border-l-[3px] border-l-error bg-surface-container-lowest",
};

export const STATUS_BADGE_CLASS: Record<CutoffStatus, string> = {
  safe: "bg-primary-fixed text-primary ring-1 ring-primary/15",
  borderline: "bg-tertiary-fixed text-on-tertiary-fixed-variant ring-1 ring-tertiary-container/25",
  out: "bg-error-container text-on-error-container ring-1 ring-error/15",
};

export const STATUS_LABEL: Record<CutoffStatus, string> = {
  safe: "Safe",
  borderline: "Borderline",
  out: "Unlikely",
};

export const MAP_FILL: Record<CutoffStatus | "muted", string> = {
  safe: "var(--color-primary)",
  borderline: "color-mix(in srgb, var(--color-tertiary) 72%, var(--color-primary) 28%)",
  out: "color-mix(in srgb, var(--color-error) 55%, var(--color-outline-variant) 45%)",
  muted: "var(--color-surface-container-high)",
};

"use client";

import { cn } from "@/lib/utils";

export type RankPredictorStepId = "form" | "teaser" | "verify" | "unlocked";

const STEPS: { id: RankPredictorStepId; label: string; short: string }[] = [
  { id: "form", label: "Your details", short: "Details" },
  { id: "teaser", label: "Rank estimate", short: "Estimate" },
  { id: "verify", label: "Verify", short: "Verify" },
  { id: "unlocked", label: "Full preview", short: "Explore" },
];

function stepIndex(id: RankPredictorStepId): number {
  return STEPS.findIndex((s) => s.id === id);
}

interface RankPredictorStepperProps {
  current: RankPredictorStepId;
  className?: string;
}

export function RankPredictorStepper({ current, className }: RankPredictorStepperProps) {
  const currentIdx = stepIndex(current);

  return (
    <nav
      aria-label="Rank predictor progress"
      className={cn(
        "w-full rounded-2xl border border-outline-variant/45 bg-surface-container-lowest/80 p-3 shadow-sm backdrop-blur",
        className
      )}
    >
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {STEPS.map((step, index) => {
          const isComplete = index < currentIdx;
          const isCurrent = step.id === current;
          const isUpcoming = index > currentIdx;

          return (
            <li
              key={step.id}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <div className="flex w-full items-center">
                {index > 0 ? (
                  <span
                    aria-hidden
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors duration-300",
                      isComplete || isCurrent ? "bg-primary" : "bg-surface-container-high"
                    )}
                  />
                ) : (
                  <span className="flex-1" aria-hidden />
                )}
                <span
                  className={cn(
                    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 sm:h-10 sm:w-10",
                    isCurrent &&
                    "bg-primary text-on-primary shadow-[0_8px_24px_-4px_rgba(0,61,155,0.45)] ring-4 ring-primary/15",
                    isComplete && !isCurrent && "bg-primary-container text-on-primary-container",
                    isUpcoming && "bg-surface-container text-on-surface-variant"
                  )}
                >
                  {isComplete && !isCurrent ? (
                    <span className="material-symbols-outlined text-lg">check</span>
                  ) : (
                    index + 1
                  )}
                </span>
                {index < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors duration-300",
                      isComplete ? "bg-primary" : "bg-surface-container-high"
                    )}
                  />
                ) : (
                  <span className="flex-1" aria-hidden />
                )}
              </div>
              <span
                className={cn(
                  "hidden text-center text-xs font-semibold tracking-wide sm:block",
                  isCurrent ? "text-primary" : "text-on-surface-variant"
                )}
              >
                {step.short}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-center text-sm text-on-surface-variant sm:hidden">
        Step {currentIdx + 1} of {STEPS.length}:{" "}
        <span className="font-semibold text-on-surface">
          {STEPS[currentIdx]?.label}
        </span>
      </p>
    </nav>
  );
}

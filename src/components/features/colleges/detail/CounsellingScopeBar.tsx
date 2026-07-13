"use client";

import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { cn } from "@/lib/utils";
import { useCounsellingScope } from "./CounsellingScopeContext";

export function CounsellingScopeBar({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const scope = useCounsellingScope();
  if (!scope?.showToggle) return null;

  const { authority, setAuthority, stateLabel, mccLabel } = scope;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p
        className={cn(
          "text-on-surface-variant",
          compact ? "text-xs" : "text-sm",
        )}
      >
        This college has both state counselling and MCC data. Switch view to
        compare cutoffs, seats, and fees separately.
      </p>

      <div
        className="inline-flex rounded-full border border-outline-variant bg-surface-container-lowest p-1"
        role="tablist"
        aria-label="Counselling authority"
      >
        {(
          [
            { value: "state" as const, label: stateLabel },
            { value: "mcc" as const, label: mccLabel },
          ] as const
        ).map((option) => {
          const active = authority === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setAuthority(option.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition",
                active
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary",
              )}
            >
              {active ? (
                <MaterialSymbol name="check_circle" className="text-base" />
              ) : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

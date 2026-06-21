"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LEAD_FOCUS_STATE_OPTIONS } from "@/lib/leads/focus-states";
import { cn } from "@/lib/utils";

type LeadFocusStatesMultiSelectProps = {
  id?: string;
  name?: string;
  required?: boolean;
  skin?: "journey" | "surface";
  className?: string;
};

export function LeadFocusStatesMultiSelect({
  id: idProp,
  name = "targetStates",
  required,
  skin = "journey",
  className,
}: LeadFocusStatesMultiSelectProps) {
  const autoId = useId();
  const triggerId = idProp ?? autoId;
  const listId = `${triggerId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());

  const isJourney = skin === "journey";

  const selectedOptions = LEAD_FOCUS_STATE_OPTIONS.filter((opt) =>
    selectedSlugs.has(opt.slug),
  );
  const hiddenValue = selectedOptions.map((opt) => opt.label).join(", ");

  useEffect(() => {
    const hidden = rootRef.current?.querySelector<HTMLInputElement>('input[type="hidden"]');
    hidden?.dispatchEvent(new Event("input", { bubbles: true }));
    hidden?.dispatchEvent(new Event("change", { bubbles: true }));
  }, [hiddenValue]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function toggleSlug(slug: string) {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <input type="hidden" name={name} value={hiddenValue} required={required} />
      <button
        type="button"
        id={triggerId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(
          "lead-focus-states-trigger flex w-full items-center justify-between gap-2 text-left",
          isJourney && "lead-focus-states-trigger--journey",
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="min-w-0 flex-1">
          {selectedOptions.length === 0 ? (
            <span
              className={cn(
                "text-[13px] font-medium",
                isJourney ? "text-[var(--ink)]" : "text-on-surface",
              )}
            >
              Select state
            </span>
          ) : (
            <span className="flex flex-wrap gap-x-2 gap-y-1">
              {selectedOptions.map((opt) => (
                <span
                  key={opt.slug}
                  className={cn(
                    "text-[13px] font-bold tracking-wide",
                    isJourney ? "text-[var(--blue)]" : "text-primary",
                  )}
                >
                  {opt.abbrev}
                </span>
              ))}
            </span>
          )}
        </span>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-150",
            open && "rotate-180",
            isJourney ? "text-[var(--muted)]" : "text-on-surface-variant",
          )}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={triggerId}
          className={cn(
            "lead-focus-states-list absolute z-20 mt-1.5 max-h-56 w-full overflow-auto p-1",
            isJourney && "lead-focus-states-list--journey",
          )}
        >
          {LEAD_FOCUS_STATE_OPTIONS.map((opt) => {
            const checked = selectedSlugs.has(opt.slug);
            return (
              <li key={opt.slug} role="option" aria-selected={checked}>
                <button
                  type="button"
                  className={cn(
                    "lead-focus-states-option flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px]",
                    checked && "lead-focus-states-option--selected",
                    isJourney && "lead-focus-states-option--journey",
                  )}
                  onClick={() => toggleSlug(opt.slug)}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                      checked
                        ? isJourney
                          ? "border-[var(--blue)] bg-[var(--blue)] text-white"
                          : "border-primary bg-primary text-on-primary"
                        : isJourney
                          ? "border-[var(--line)] bg-white"
                          : "border-outline-variant bg-surface-container-lowest",
                    )}
                    aria-hidden
                  >
                    {checked ? (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                        <path
                          d="M2.5 6l2.5 2.5 4.5-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </span>
                  <span className={isJourney ? "text-[var(--ink)]" : "text-on-surface"}>
                    {opt.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

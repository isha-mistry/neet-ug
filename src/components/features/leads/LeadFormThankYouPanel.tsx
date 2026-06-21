"use client";

import { LEAD_REDIRECT_SECONDS } from "@/components/features/leads/useLeadRedirectCountdown";
import { cn } from "@/lib/utils";

type LeadFormThankYouPanelProps = {
  titleId: string;
  /** Journey home radar modal styling vs site surface modal. */
  skin?: "journey" | "surface";
  /** When set and &gt; 0, shows redirect countdown. */
  redirectCountdown?: number | null;
  /** e.g. “counselling page” — shown as “Redirecting to …” */
  redirectPageLabel?: string;
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeadRedirectCountdown({
  seconds,
  skin,
  redirectPageLabel,
}: {
  seconds: number;
  skin: "journey" | "surface";
  redirectPageLabel?: string;
}) {
  const isJourney = skin === "journey";
  const display = Math.min(
    LEAD_REDIRECT_SECONDS,
    Math.max(1, seconds),
  );
  const progress =
    ((LEAD_REDIRECT_SECONDS - display) / LEAD_REDIRECT_SECONDS) * 100;

  return (
    <div
      className="mt-6 flex w-full max-w-[18rem] flex-col items-center gap-3"
      aria-live="polite"
      aria-atomic="true"
    >
      {redirectPageLabel ? (
        <p
          className={cn(
            "lead-modal-thanks-redirect m-0 w-full text-center text-[14px] font-semibold leading-snug",
            isJourney ? "text-[var(--ink)]" : "text-on-surface",
          )}
        >
          Redirecting to {redirectPageLabel}
        </p>
      ) : null}
      <div className="flex w-full items-center gap-3">
        <div
          className={cn(
            "h-2 min-w-0 flex-1 overflow-hidden rounded-full",
            isJourney ? "bg-[rgba(37,70,208,0.1)]" : "bg-primary/10",
          )}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={LEAD_REDIRECT_SECONDS}
          aria-valuenow={LEAD_REDIRECT_SECONDS - display}
          aria-label={`Redirect in ${display} seconds`}
        >
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-1000 ease-linear",
              isJourney ? "bg-[var(--blue)]" : "bg-primary",
            )}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <span
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold tabular-nums leading-none text-white",
            isJourney ? "bg-[var(--blue)]" : "bg-primary",
          )}
          aria-hidden
        >
          {display}
        </span>
        <span className="sr-only">Redirecting in {display} seconds</span>
      </div>
    </div>
  );
}

export function LeadFormThankYouPanel({
  titleId,
  skin = "surface",
  redirectCountdown = null,
  redirectPageLabel,
}: LeadFormThankYouPanelProps) {
  const isJourney = skin === "journey";

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center text-center",
        isJourney ? "px-1 pb-2 pt-3" : "px-2 py-4",
      )}
    >
      <div className="relative mb-4 h-14 w-14 shrink-0">
        <span
          className={cn(
            "animate-lead-thanks-ring pointer-events-none absolute -inset-2.5 z-0 rounded-full border-[1.5px]",
            isJourney ? "border-[rgba(37,70,208,0.32)]" : "border-primary/30",
          )}
          aria-hidden
        />
        <span
          className={cn(
            "relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-white",
            isJourney
              ? "bg-[var(--blue)] shadow-[0_0_0_5px_rgba(37,70,208,0.18),0_6px_18px_-4px_rgba(37,70,208,0.7)]"
              : "bg-primary shadow-[0_0_0_5px_color-mix(in_srgb,var(--color-primary)_18%,transparent),0_6px_18px_-4px_color-mix(in_srgb,var(--color-primary)_70%,transparent)]",
          )}
        >
          <CheckIcon className="h-7 w-7 shrink-0" />
        </span>
      </div>
      <h3
        id={titleId}
        className={cn(
          "m-0 text-[19px] font-extrabold leading-snug tracking-tight",
          isJourney ? "lead-modal-thanks-title text-[var(--ink)]" : "text-on-surface",
        )}
      >
        Thank you for sharing the details.
      </h3>
      <p
        className={cn(
          "mx-auto mt-3 max-w-[20rem] text-[15px] leading-relaxed",
          isJourney
            ? "lead-modal-thanks-sub text-[var(--muted)]"
            : "text-on-surface-variant",
        )}
      >
        We will get back to you shortly.
      </p>
      {redirectCountdown != null && redirectCountdown > 0 ? (
        <LeadRedirectCountdown
          seconds={redirectCountdown}
          skin={skin}
          redirectPageLabel={redirectPageLabel}
        />
      ) : null}
    </div>
  );
}

/** Page name for “Redirecting to …” copy from modal redirect path. */
export function leadRedirectPageLabel(redirectTo: string): string {
  const path = redirectTo.split("?")[0]?.replace(/\/$/, "") ?? redirectTo;
  if (path.includes("counselling") || path.includes("counseling")) {
    return "counselling page";
  }
  if (path.includes("cutoff-analyser")) {
    return "cutoff analyser page";
  }
  if (path.includes("college-predictor")) {
    return "college predictor page";
  }
  if (path.includes("rank-predictor")) {
    return "rank predictor page";
  }
  if (path.includes("contact")) {
    return "contact page";
  }
  return "the next page";
}

"use client";

import { cn } from "@/lib/utils";

type LeadModalCloseButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  skin?: "journey" | "surface";
  className?: string;
};

export function LeadModalCloseButton({
  onClick,
  disabled,
  skin = "surface",
  className,
}: LeadModalCloseButtonProps) {
  const isJourney = skin === "journey";

  return (
    <button
      type="button"
      className={cn(
        "absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 transition-opacity duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        isJourney
          ? "text-[var(--blue)] hover:opacity-75 focus-visible:ring-[var(--blue)]/35"
          : "text-primary hover:opacity-75 focus-visible:ring-primary/35",
        disabled && "pointer-events-none cursor-not-allowed opacity-45",
        className,
      )}
      aria-label="Close"
      onClick={onClick}
      disabled={disabled}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

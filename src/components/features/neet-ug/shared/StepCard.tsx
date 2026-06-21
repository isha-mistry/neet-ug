import React from "react";
import { neetCardClass, neetInteractiveCardClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  desc: string;
  icon?: string;
  /** "default" = vertical step number above icon, "compact" = just step number */
  variant?: "default" | "compact";
}

export function StepCard({
  step,
  title,
  desc,
  icon: _icon,
  variant: _variant = "default",
}: StepCardProps) {
  void _icon;
  void _variant;

  return (
    <div className={cn(neetCardClass, neetInteractiveCardClass, "flex flex-col items-start gap-4 md:flex-row")}>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px] bg-primary text-xs font-extrabold text-on-primary shadow-primary-button">
          {step}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 pt-0.5">
        <h4 className="text-[16.5px] font-extrabold leading-snug tracking-[-0.01em] text-on-surface">
          {title}
        </h4>
        <p className="text-sm leading-[1.6] text-on-surface-variant">{desc}</p>
      </div>
    </div>
  );
}

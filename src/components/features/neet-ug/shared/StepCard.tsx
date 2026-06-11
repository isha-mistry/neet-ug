import React from "react";

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
    <div className="flex flex-col items-start gap-4 rounded-lg border border-clinical-outline bg-clinical-surface p-5 shadow-sm transition-colors duration-200 hover:border-clinical-outline-strong md:flex-row">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-clinical-blue text-xs font-extrabold text-white">
          {step}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 pt-0.5">
        <h4 className="text-[15px] font-extrabold leading-snug text-clinical-navy">
          {title}
        </h4>
        <p className="text-[13px] leading-relaxed text-clinical-muted">{desc}</p>
      </div>
    </div>
  );
}

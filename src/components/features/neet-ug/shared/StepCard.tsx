import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

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
  icon,
  variant = "default",
}: StepCardProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-clinical-outline bg-clinical-surface p-5 shadow-clinical-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-clinical-blue/20 hover:shadow-clinical-hover md:flex-row">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clinical-blue text-xs font-extrabold text-white shadow-sm">
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

import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

interface SectionHeadingProps {
  icon: string;
  title: string;
  description?: string;
  eyebrow?: string;
  /**
   * "default" — blue filled icon bg (used in NeetUg2026View, ApplicationForm, NriGuide)
   * "alt"     — white icon bg with ring (used in AnswerKey, CounsellingGuide)
   */
  variant?: "default" | "alt";
}

export function SectionHeading({
  icon,
  title,
  description,
  eyebrow,
  variant = "default",
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      {eyebrow && (
        <span className="inline-flex w-fit rounded-full bg-clinical-surface-low px-3 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.14em] text-clinical-blue ring-1 ring-clinical-outline">
          {eyebrow}
        </span>
      )}
      {variant === "default" ? (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-clinical-outline bg-clinical-surface-low text-clinical-blue shadow-clinical-soft">
            <MaterialSymbol name={icon} size="md" />
          </div>
          <h2 className="m-0 text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-clinical-navy md:text-[28px]">
            {title}
          </h2>
        </div>
      ) : (
        <div className="flex items-start gap-3 border-l-[3px] border-clinical-blue py-1 pl-4">
          <h2 className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-clinical-navy md:text-[26px]">
            {title}
          </h2>
        </div>
      )}
      {description && (
        <p
          className={`mt-1 max-w-2xl text-sm leading-6 text-clinical-muted ${
            variant === "default" ? "pl-12" : "pl-4 md:pl-12"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

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
        <span className="inline-flex w-fit rounded-md bg-clinical-surface-low px-2.5 py-1 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-clinical-blue ring-1 ring-clinical-outline">
          {eyebrow}
        </span>
      )}
      {variant === "default" ? (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-clinical-outline bg-clinical-surface-low text-clinical-blue">
            <MaterialSymbol name={icon} size="sm" />
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

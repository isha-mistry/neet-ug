import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetBadgeClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  icon?: string;
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
        <span className={cn(neetBadgeClass, "bg-primary-fixed text-primary ring-1 ring-primary/10")}>
          {eyebrow}
        </span>
      )}
      {variant === "default" ? (
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary-fixed text-primary">
              <MaterialSymbol name={icon} size="sm" />
            </div>
          )}
          <h2 className="m-0 text-[23px] font-extrabold leading-[1.12] tracking-[-0.022em] text-on-surface md:text-[31px]">
            {title}
          </h2>
        </div>
      ) : (
        <div className="flex items-start gap-3 border-l-4 border-primary py-1 pl-4">
          <h2 className="text-[23px] font-extrabold leading-[1.12] tracking-[-0.022em] text-on-surface md:text-[31px]">
            {title}
          </h2>
        </div>
      )}
      {description && (
        <p
          className={`mt-1 max-w-2xl text-[15px] leading-[1.65] text-on-surface-variant ${
            variant === "default" ? "pl-12" : "pl-4 md:pl-12"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

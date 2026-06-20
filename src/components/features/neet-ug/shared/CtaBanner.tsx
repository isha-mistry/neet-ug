import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { Button } from "@/components/ui/Button";
import { neetBadgeClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

interface CtaBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  ctaIcon?: string;
}

export function CtaBanner({
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  ctaIcon = "arrow_forward",
}: CtaBannerProps) {
  return (
    <div className="rp-brand-gradient rp-brand-elevated relative mt-2 flex flex-col items-center gap-6 overflow-hidden rounded-[1.75rem] p-8 text-center text-on-primary ring-1 ring-on-primary/15 md:p-10">
      <span className={cn(neetBadgeClass, "z-10 bg-on-primary/10 text-on-primary ring-1 ring-on-primary/15")}> 
        {eyebrow}
      </span>

      <div className="z-10 flex max-w-2xl flex-col gap-3">
        <h2 className="text-[23px] font-extrabold leading-[1.12] tracking-[-0.022em] text-on-primary md:text-[31px]">
          {title}
        </h2>
        <p className="text-sm leading-[1.65] text-on-primary/85 md:text-base">
          {description}
        </p>
      </div>

      <Button
        as="link"
        href={ctaHref}
        variant="inverse"
        size="md"
        className="z-10 mt-2"
        trailingIcon={<MaterialSymbol name={ctaIcon} size="md" />}
      >
        {ctaText}
      </Button>
    </div>
  );
}

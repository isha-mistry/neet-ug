import React from "react";
import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

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
    <div className="relative mt-2 flex flex-col items-center gap-6 overflow-hidden rounded-xl border border-[#1f2a44] bg-clinical-dark p-8 text-center text-white shadow-sm md:p-10">
      <span className="z-10 inline-flex w-fit rounded-md bg-white/10 px-3 py-1 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-blue-100 ring-1 ring-white/15">
        {eyebrow}
      </span>

      <div className="z-10 flex max-w-2xl flex-col gap-3">
        <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.02em] text-white md:text-4xl">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-blue-100/90 md:text-base">
          {description}
        </p>
      </div>

      <Link
        href={ctaHref}
        className="z-10 mt-2 inline-flex h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-7 text-sm font-bold tracking-wide text-clinical-blue no-underline shadow-sm transition-colors hover:bg-slate-50 active:scale-[0.98]"
      >
        <span>{ctaText}</span>
        <MaterialSymbol name={ctaIcon} size="md" />
      </Link>
    </div>
  );
}

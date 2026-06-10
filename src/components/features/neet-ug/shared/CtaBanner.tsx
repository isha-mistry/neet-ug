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
    <div className="relative mt-2 flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-clinical-dark to-clinical-blue p-8 text-center text-white shadow-clinical-panel md:p-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute right-0 top-0 -mr-24 -mt-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -mb-24 -ml-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <span className="z-10 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase leading-none tracking-[0.14em] text-blue-100 ring-1 ring-white/20">
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
        className="z-10 mt-2 inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-8 text-base font-bold tracking-wide text-clinical-blue no-underline shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-50 active:scale-[0.98]"
      >
        <span>{ctaText}</span>
        <MaterialSymbol name={ctaIcon} size="md" />
      </Link>
    </div>
  );
}

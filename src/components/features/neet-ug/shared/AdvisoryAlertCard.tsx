"use client";

import Link from "next/link";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";
import { cn } from "@/lib/utils";

interface AdvisoryAlertCardProps {
  showFeedLink?: boolean;
}

export function AdvisoryAlertCard({ showFeedLink = false }: AdvisoryAlertCardProps) {
  const { officialNotice } = neetUg2026Data;
  const headline = officialNotice.headline
    .replace(/^⚠️\s*OFFICIAL NOTICE:\s*/i, "")
    .replace(/⚠️/g, "")
    .trim();

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-2xl border border-tertiary/25 bg-tertiary-container/15 p-5 md:flex-row md:items-center md:justify-between md:p-6",
        "border-l-4 border-l-tertiary"
      )}
      role="status"
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 text-left">
        <span className="material-symbols-outlined shrink-0 text-tertiary" aria-hidden>
          warning
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-tertiary">
            Official advisory
          </p>
          <h2 className="mt-1 text-base font-bold leading-snug text-on-surface md:text-lg">
            {headline}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-on-surface-variant">
            {officialNotice.subtext} {officialNotice.warning}
          </p>
        </div>
      </div>
      {showFeedLink ? (
        <Link
          href="/neet-ug-2026/updates"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-xs font-bold text-on-surface shadow-sm transition-colors hover:border-primary hover:text-primary md:self-center"
        >
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-error" aria-hidden />
          Live updates
        </Link>
      ) : null}
    </div>
  );
}

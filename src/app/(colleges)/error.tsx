"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function CollegesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-border bg-surface px-6 py-12 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-text">
        Something went wrong while loading colleges.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-text-muted">
        Please try again, or go back to the colleges listing.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center justify-center rounded-[14px] bg-brand-700 px-5 text-sm font-semibold tracking-wide text-text-on-brand transition-colors hover:bg-brand-800"
        >
          Try Again
        </button>
        <Link
          href="/colleges"
          className="inline-flex h-11 items-center justify-center rounded-[14px] border border-border-strong bg-background px-5 text-sm font-semibold tracking-wide text-text transition-colors hover:bg-surface"
        >
          Go to Colleges
        </Link>
      </div>
    </section>
  );
}

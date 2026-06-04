"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import { FiChevronRight } from "react-icons/fi";
import { formatNumber } from "@/lib/utils";
import type { StateRecord } from "@/types/college";

export interface StateDirectoryItem extends StateRecord {
  collegeCount: number;
}

const ROW =
  "grid grid-cols-[minmax(0,1fr)_3.25rem_3.75rem_4rem_1rem] items-center gap-x-2 sm:grid-cols-[minmax(0,1fr)_4rem_4.5rem_4.5rem_1rem] sm:gap-x-3";

function competitionClass(level: string): string {
  const base =
    "inline-flex justify-center rounded px-1 py-px text-[9px] font-bold uppercase tracking-wide sm:text-[10px]";
  switch (level) {
    case "High":
      return `${base} bg-amber-100 text-amber-950`;
    case "Medium":
      return `${base} bg-sky-100 text-sky-950`;
    default:
      return `${base} bg-slate-200/80 text-slate-800`;
  }
}

function StateRows({
  states,
  activeSlug,
  onActiveSlugChange,
}: {
  states: StateDirectoryItem[];
  activeSlug?: string | null;
  onActiveSlugChange?: (slug: string | null) => void;
}) {
  return (
    <ol className="min-w-0 divide-y divide-border">
      {states.map((state, index) => {
        const isActive = state.slug === activeSlug;
        return (
        <li
          key={state.slug}
          className={index % 2 === 0 ? "bg-surface" : "bg-surface-muted/25"}
        >
          <Link
            href={`/colleges/state/${state.slug}`}
            onMouseEnter={() => onActiveSlugChange?.(state.slug)}
            className={cn(
              `${ROW} min-h-9 px-2 py-1.5 text-sm transition-colors hover:bg-brand-50 focus-visible:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700 sm:min-h-10 sm:px-3`,
              isActive && "bg-brand-50 ring-1 ring-inset ring-brand-200"
            )}
          >
            <span className="truncate font-medium text-text">{state.name}</span>
            <span className="text-right text-xs font-medium tabular-nums text-text sm:text-sm">
              {formatNumber(state.collegeCount)}
            </span>
            <span className="text-right text-xs tabular-nums text-text-secondary sm:text-sm">
              {formatNumber(state.totalSeats)}
            </span>
            <span className={competitionClass(state.competitionLevel)}>
              {state.competitionLevel}
            </span>
            <FiChevronRight
              aria-hidden
              className="h-3.5 w-3.5 justify-self-end text-brand-600"
            />
            <span className="sr-only">
              {state.name}, {formatNumber(state.collegeCount)} colleges
            </span>
          </Link>
        </li>
        );
      })}
    </ol>
  );
}

function ColumnHeader() {
  return (
    <div
      className={`${ROW} border-b border-border bg-surface-muted/50 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted sm:px-3`}
    >
      <span>State</span>
      <span className="text-right">Col.</span>
      <span className="text-right">Seats</span>
      <span className="text-center">Level</span>
      <span className="sr-only">Open</span>
    </div>
  );
}

interface StateDirectoryListProps {
  states: StateDirectoryItem[];
  columns?: 1 | 2;
  /** Drop outer border when parent provides a scroll frame. */
  embedded?: boolean;
  activeSlug?: string | null;
  onActiveSlugChange?: (slug: string | null) => void;
  explorerRef?: RefObject<HTMLDivElement | null>;
}

export function StateDirectoryList({
  states,
  columns = 1,
  embedded = false,
  activeSlug,
  onActiveSlugChange,
  explorerRef,
}: StateDirectoryListProps) {
  function handleListPointerLeave(e: React.MouseEvent) {
    const related = e.relatedTarget as Node | null;
    if (related && explorerRef?.current?.contains(related)) {
      return;
    }
    onActiveSlugChange?.(null);
  }

  const frame = embedded
    ? "overflow-hidden"
    : "overflow-hidden rounded-lg border border-border";
  const sorted = [...states].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );

  if (columns === 2) {
    const mid = Math.ceil(sorted.length / 2);
    const left = sorted.slice(0, mid);
    const right = sorted.slice(mid);

    return (
      <nav
        aria-label="States with MBBS colleges in catalog"
        className={frame}
        onMouseLeave={handleListPointerLeave}
      >
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-border">
          <div className="min-w-0">
            <ColumnHeader />
            <StateRows
              states={left}
              activeSlug={activeSlug}
              onActiveSlugChange={onActiveSlugChange}
            />
          </div>
          <div className="min-w-0 border-t border-border lg:border-t-0">
            <ColumnHeader />
            <StateRows
              states={right}
              activeSlug={activeSlug}
              onActiveSlugChange={onActiveSlugChange}
            />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="States with MBBS colleges in catalog"
      className={frame}
      onMouseLeave={handleListPointerLeave}
    >
      <ColumnHeader />
      <StateRows
        states={sorted}
        activeSlug={activeSlug}
        onActiveSlugChange={onActiveSlugChange}
      />
    </nav>
  );
}

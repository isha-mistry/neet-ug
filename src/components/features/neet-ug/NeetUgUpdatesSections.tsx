"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GuideCard } from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import {
  NOTICE_FEED_ALL_PATH,
  UPDATES_NOTICE_TAGS,
  type UpdatesNoticeItem,
  type UpdatesNoticeTag,
} from "@/lib/neet-ug-2026/updates-content";
import { cn } from "@/lib/utils";

export const NOTICE_TAG_CLASS: Record<UpdatesNoticeTag, string> = {
  NTA: "bg-primary-fixed text-primary",
  MCC: "bg-secondary-fixed/80 text-secondary",
  Advisory: "bg-tertiary-fixed/50 text-on-tertiary-fixed-variant",
  Gujarat: "bg-tertiary-fixed/80 text-tertiary",
  MP: "bg-secondary-fixed text-secondary",
  Rajasthan: "bg-tertiary-fixed/60 text-on-tertiary-fixed-variant",
  Maharashtra: "bg-primary-fixed/80 text-primary",
  Karnataka: "bg-secondary-fixed/60 text-secondary",
  UP: "bg-tertiary-fixed/40 text-on-tertiary-fixed-variant",
};

export function UpdatesNoticeTagBadge({ tag }: { tag: UpdatesNoticeTag }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        NOTICE_TAG_CLASS[tag],
      )}
    >
      {tag}
    </span>
  );
}

export function UpdatesNoticeCard({ notice }: { notice: UpdatesNoticeItem }) {
  return (
    <GuideCard className="p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <UpdatesNoticeTagBadge tag={notice.tag} />
        <span className="text-xs font-semibold tabular-nums text-outline">
          {notice.date}
        </span>
      </div>
      <h3 className="mt-2.5 text-base font-bold leading-snug text-on-surface">
        {notice.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
        {notice.summary}
      </p>
      <Link
        href={notice.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary no-underline hover:underline"
      >
        Read on official portal
        <span className="material-symbols-outlined text-base" aria-hidden>
          open_in_new
        </span>
      </Link>
    </GuideCard>
  );
}

export function UpdatesNoticeFeed({
  items,
  totalCount,
  showViewAll = false,
}: {
  items: readonly UpdatesNoticeItem[];
  /** Full list size (when preview is sliced). Defaults to items.length. */
  totalCount?: number;
  showViewAll?: boolean;
}) {
  const total = totalCount ?? items.length;

  if (items.length === 0) {
    return (
      <GuideCard className="p-5 md:p-6">
        <p className="text-sm leading-relaxed text-on-surface-variant">
          No live notices yet. When entries are added to the notice feed sheet
          (title, summary, and official link), they will appear here after the next
          refresh.
        </p>
      </GuideCard>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((notice) => (
        <UpdatesNoticeCard
          key={`${notice.date}-${notice.title}-${notice.href}`}
          notice={notice}
        />
      ))}

      {showViewAll && total > items.length ? (
        <div className="pt-1">
          <Link
            href={NOTICE_FEED_ALL_PATH}
            className={cn(
              "group flex flex-col gap-1 rounded-2xl border border-primary/25 bg-primary-fixed/40 px-5 py-4 no-underline",
              "transition-[transform,box-shadow,border-color,background-color] duration-200",
              "hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary-fixed/70",
              "hover:shadow-[0_2px_6px_rgba(0,0,0,0.04),0_20px_40px_-28px_rgba(37,70,208,0.35)]",
              "sm:flex-row sm:items-center sm:justify-between",
            )}
          >
            <div>
              <p className="text-sm font-bold text-on-surface">
                View all the latest notifications
              </p>
              <p className="mt-0.5 text-xs text-on-surface-variant">
                Browse all {total} notices — filter by NTA, MCC, or state
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View all latest notices
              <span
                className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                arrow_forward
              </span>
            </span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

type TagFilter = "All" | UpdatesNoticeTag;

/** Full latest-notices browser with search + tag filters. */
export function UpdatesNoticeAllBrowser({
  items,
}: {
  items: readonly UpdatesNoticeItem[];
}) {
  const [tag, setTag] = useState<TagFilter>("All");
  const [query, setQuery] = useState("");

  const availableTags = useMemo(() => {
    const set = new Set(items.map((n) => n.tag));
    return UPDATES_NOTICE_TAGS.filter((t) => set.has(t));
  }, [items]);

  const tagCounts = useMemo(() => {
    const counts = new Map<UpdatesNoticeTag, number>();
    for (const item of items) {
      counts.set(item.tag, (counts.get(item.tag) ?? 0) + 1);
    }
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((notice) => {
      if (tag !== "All" && notice.tag !== tag) return false;
      if (!q) return true;
      return (
        notice.title.toLowerCase().includes(q) ||
        notice.summary.toLowerCase().includes(q) ||
        notice.tag.toLowerCase().includes(q) ||
        notice.date.toLowerCase().includes(q)
      );
    });
  }, [items, tag, query]);

  if (items.length === 0) {
    return (
      <GuideCard className="p-5 md:p-6">
        <p className="text-sm leading-relaxed text-on-surface-variant">
          No live notices yet. When entries are added to the notice feed sheet,
          they will appear here after the next refresh.
        </p>
      </GuideCard>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <GuideCard className="p-4 md:p-5">
        <label className="sr-only" htmlFor="notice-all-search">
          Search notices
        </label>
        <div className="relative">
          <span
            className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            aria-hidden
          >
            search
          </span>
          <input
            id="notice-all-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, body, date…"
            className={cn(
              "w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-2.5 pl-10 pr-3",
              "text-sm text-on-surface outline-none transition-shadow placeholder:text-outline",
              "focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(37,70,208,0.12)]",
            )}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by source">
          <button
            type="button"
            onClick={() => setTag("All")}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
              tag === "All"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed/60 hover:text-primary",
            )}
          >
            All
            <span className="ml-1.5 tabular-nums opacity-80">{items.length}</span>
          </button>
          {availableTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                tag === t
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed/60 hover:text-primary",
              )}
            >
              {t}
              <span className="ml-1.5 tabular-nums opacity-80">
                {tagCounts.get(t) ?? 0}
              </span>
            </button>
          ))}
        </div>
      </GuideCard>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-on-surface-variant">
          Showing{" "}
          <strong className="font-bold tabular-nums text-on-surface">
            {filtered.length}
          </strong>{" "}
          of{" "}
          <span className="tabular-nums">{items.length}</span> notice
          {items.length === 1 ? "" : "s"}
          {tag !== "All" ? (
            <>
              {" "}
              · <UpdatesNoticeTagBadge tag={tag} />
            </>
          ) : null}
        </p>
        {(tag !== "All" || query.trim()) && (
          <button
            type="button"
            onClick={() => {
              setTag("All");
              setQuery("");
            }}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <GuideCard className="p-6 text-center">
          <span
            className="material-symbols-outlined mx-auto text-3xl text-outline"
            aria-hidden
          >
            filter_alt_off
          </span>
          <p className="mt-2 text-sm font-semibold text-on-surface">
            No notices match your filters
          </p>
          <p className="mt-1 text-xs text-on-surface-variant">
            Try another tag or clear the search.
          </p>
        </GuideCard>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((notice) => (
            <UpdatesNoticeCard
              key={`${notice.date}-${notice.title}-${notice.href}`}
              notice={notice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** @deprecated Use UpdatesNoticeAllBrowser */
export const UpdatesNoticeArchiveBrowser = UpdatesNoticeAllBrowser;

export function UpdatesFaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-y border-outline-variant">
      {items.map((item, index) => (
        <details
          key={item.q}
          className="group border-b border-outline-variant last:border-b-0"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-bold leading-snug text-on-surface marker:content-none [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              className="shrink-0 font-mono text-lg font-semibold text-primary transition group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="pb-5 pr-6 text-sm leading-relaxed text-on-surface-variant">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

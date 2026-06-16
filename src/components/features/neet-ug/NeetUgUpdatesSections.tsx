import Link from "next/link";
import { GuideCard } from "@/components/features/mbbs-india/MbbsIndiaParts";
import type { UpdatesNoticeItem } from "@/lib/neet-ug-2026/updates-content";
import { cn } from "@/lib/utils";

const NOTICE_TAG_CLASS: Record<UpdatesNoticeItem["tag"], string> = {
  NTA: "bg-primary-fixed text-primary",
  MCC: "bg-secondary-fixed/80 text-secondary",
  Advisory: "bg-tertiary-fixed/50 text-on-tertiary-fixed-variant",
};

export function UpdatesNoticeFeed({ items }: { items: readonly UpdatesNoticeItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((notice) => (
        <GuideCard key={`${notice.date}-${notice.title}`} className="p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                NOTICE_TAG_CLASS[notice.tag]
              )}
            >
              {notice.tag}
            </span>
            <span className="text-xs font-semibold tabular-nums text-outline">{notice.date}</span>
          </div>
          <h3 className="mt-2.5 text-base font-bold leading-snug text-on-surface">{notice.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{notice.summary}</p>
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
      ))}
    </div>
  );
}

export function UpdatesFaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-y border-outline-variant/50">
      {items.map((item, index) => (
        <details
          key={item.q}
          className="group border-b border-outline-variant/40 last:border-b-0"
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

"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { CounselingEvent } from "@/lib/cutoff-analyser/counseling-timeline";
import { COUNSELING_STATUS_LABEL } from "@/lib/cutoff-analyser/counseling-timeline";
import { cn } from "@/lib/utils";

function phaseLabel(event: CounselingEvent): string {
  if (event.id.startsWith("neet-")) return "Exam & results";
  if (event.stateTag === "AIQ") return "MCC All India Quota";
  if (event.stateTag) return "State quota (GJ · RJ · MP · MH)";
  return "Reporting & verification";
}

function groupByPhase(events: CounselingEvent[]) {
  const groups: { label: string; events: CounselingEvent[] }[] = [];
  for (const event of events) {
    const label = phaseLabel(event);
    const last = groups.at(-1);
    if (last?.label === label) {
      last.events.push(event);
    } else {
      groups.push({ label, events: [event] });
    }
  }
  return groups;
}

function statusStyles(status: CounselingEvent["status"]) {
  switch (status) {
    case "live":
      return {
        dot: "bg-secondary ring-secondary/30",
        badge: "bg-secondary text-on-secondary",
        row: "ca-timeline-row ca-timeline-row-live",
        accent: "bg-secondary",
      };
    case "done":
      return {
        dot: "bg-outline/80 ring-outline-variant/50",
        badge: "bg-surface-container-high text-outline",
        row: "ca-timeline-row opacity-90",
        accent: "bg-outline-variant/60",
      };
    default:
      return {
        dot: "bg-primary ring-primary/25",
        badge: "bg-primary-fixed text-primary",
        row: "ca-timeline-row",
        accent: "bg-transparent",
      };
  }
}

function TimelineEventRow({ event }: { event: CounselingEvent }) {
  const styles = statusStyles(event.status);

  return (
    <article
      className={cn(
        "relative grid gap-3 px-4 py-5 last:border-b-0 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-x-8 md:px-6 md:py-5",
        styles.row,
      )}
    >
      <span
        className={cn(
          "absolute bottom-0 left-0 top-0 w-1",
          styles.accent,
          event.status === "live" && "animate-pulse",
        )}
        aria-hidden
      />

      <div className="flex flex-col gap-2 md:items-end md:pt-0.5">
        <p className="font-mono text-xs font-semibold tabular-nums leading-snug text-on-surface md:text-right">
          {event.dateRange}
        </p>
        <span
          className={cn(
            "inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            styles.badge,
          )}
        >
          {COUNSELING_STATUS_LABEL[event.status]}
        </span>
      </div>

      <div className="relative min-w-0 md:border-l md:border-outline-variant/70 md:pl-6">
        <span
          className={cn(
            "absolute -left-[calc(0.375rem+1px)] top-1.5 hidden h-2.5 w-2.5 rounded-full ring-4 ring-surface-container-lowest md:block",
            event.status === "live" && "animate-pulse",
            styles.dot,
          )}
          aria-hidden
        />
        <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
          <h4 className="text-sm font-semibold leading-snug text-on-surface md:text-[0.9375rem]">
            {event.roundName}
          </h4>
          {event.stateTag ? (
            <span className="rounded-md bg-surface-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
              {event.stateTag}
            </span>
          ) : null}
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
          {event.action}
        </p>
        {event.details ? (
          <details className="group mt-3 max-w-2xl">
            <summary className="cursor-pointer text-xs font-semibold text-primary hover:underline">
              Source note
            </summary>
            <p className="mt-2 text-xs leading-relaxed text-outline">
              {event.details}
            </p>
          </details>
        ) : null}
      </div>
    </article>
  );
}

export function CounselingTimelinePanel({
  events,
  sessionYear,
  disclaimer,
}: {
  events: CounselingEvent[];
  sessionYear: number;
  disclaimer: string;
}) {
  const groups = useMemo(() => groupByPhase(events), [events]);

  const counts = useMemo(() => {
    const c = { upcoming: 0, live: 0, done: 0 };
    for (const e of events) {
      if (e.status === "upcoming") c.upcoming += 1;
      else if (e.status === "live") c.live += 1;
      else if (e.status === "done") c.done += 1;
    }
    return c;
  }, [events]);

  const liveEvent = events.find((e) => e.status === "live");

  return (
    <div className="flex flex-col">
      <div className="ca-timeline-head">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-on-primary">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              Session {sessionYear}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container-lowest px-3 py-1 text-xs font-medium text-on-surface-variant">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              {counts.upcoming} upcoming
            </span>
            {counts.live > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-1 text-xs font-semibold text-on-secondary-fixed">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" aria-hidden />
                {counts.live} open now
              </span>
            ) : null}
            {counts.done > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-outline">
                {counts.done} completed
              </span>
            ) : null}
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-on-surface-variant lg:text-right">
            {disclaimer}{" "}
            <Link
              href="https://neet.nta.nic.in/"
              className="font-semibold text-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              NTA
            </Link>
            {" · "}
            <Link
              href="https://mcc.nic.in/ug-medical-counselling/"
              className="font-semibold text-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MCC UG
            </Link>
          </p>
        </div>

        {liveEvent ? (
          <div className="mt-4 flex gap-3 rounded-xl border border-secondary/40 bg-secondary-fixed/25 px-3 py-2.5 md:items-center">
            <span className="material-symbols-outlined shrink-0 text-secondary">campaign</span>
            <p className="text-sm text-on-surface">
              <span className="font-semibold">Active now:</span>{" "}
              {liveEvent.roundName}
              <span className="text-on-surface-variant"> · {liveEvent.dateRange}</span>
            </p>
          </div>
        ) : null}
      </div>

      <div className="relative pb-1">
        {groups.map((group) => (
          <section key={`${group.label}-${group.events[0]?.id ?? ""}`}>
            <div className="border-b border-outline-variant/70 bg-surface-container-low px-4 py-2.5 md:px-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-outline">
                {group.label}
              </h3>
            </div>
            {group.events.map((event) => (
              <TimelineEventRow key={event.id} event={event} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

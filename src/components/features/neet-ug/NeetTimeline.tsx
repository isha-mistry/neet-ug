"use client";

import React from "react";
import { GuideCard } from "@/components/features/mbbs-india/MbbsIndiaParts";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  event: string;
  date: string;
  status: string;
  icon?: string;
  description?: string;
}

interface NeetTimelineProps {
  dates: TimelineEvent[];
}

export function NeetTimeline({ dates }: NeetTimelineProps) {
  return (
    <GuideCard>
      <div className="relative ml-3 border-l border-outline-variant py-1">
        <ol className="space-y-8">
          {dates.map((d) => {
            const completed = d.status === "Completed";
            return (
              <li key={`${d.event}-${d.date}`} className="relative pl-9">
                <span
                  className={cn(
                    "absolute left-0 top-1.5 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2",
                    completed
                      ? "border-primary bg-primary shadow-sm"
                      : "border-outline bg-surface"
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      completed ? "bg-on-primary" : "bg-outline"
                    )}
                  />
                </span>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h4 className="text-sm font-bold leading-snug text-on-surface md:text-base">
                      {d.event}
                    </h4>
                    {d.description ? (
                      <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant md:text-sm">
                        {d.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <span className="text-xs font-semibold tabular-nums text-on-surface-variant">
                      {d.date}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        completed
                          ? "border-tertiary-container/50 bg-tertiary-container/25 text-tertiary"
                          : "border-primary/20 bg-primary-fixed/40 text-primary"
                      )}
                    >
                      {d.status}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </GuideCard>
  );
}

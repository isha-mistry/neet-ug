"use client";

import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface TimelineEvent {
  event: string;
  date: string;
  status: string;
  icon: string;
}

interface NeetTimelineProps {
  dates?: TimelineEvent[];
}

const defaultDates: TimelineEvent[] = [
  { event: "Official Notification & Registration", date: "Feb 9, 2026", status: "Completed", icon: "assignment" },
  { event: "Last Date to Apply", date: "Mar 16, 2026", status: "Completed", icon: "event_busy" },
  { event: "Admit Card Release Date", date: "Apr 28, 2026", status: "Completed", icon: "badge" },
  { event: "NEET UG 2026 Exam Date", date: "May 3, 2026", status: "Completed", icon: "draw" },
  { event: "Provisional Answer Key & OMR", date: "May 28, 2026", status: "Completed", icon: "flaky" },
  { event: "NEET UG 2026 Result Declaration", date: "Expected June 15, 2026", status: "Upcoming", icon: "campaign" },
];

export function NeetTimeline({ dates = defaultDates }: NeetTimelineProps) {
  return (
    <div className="border border-border bg-surface-elevated rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <div className="relative border-l-2 border-brand-100 pl-6 ml-3 space-y-6">
        {dates.map((d, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <span className={`absolute -left-[35px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white ${
              d.status === "Completed" ? "border-primary text-primary" : "border-brand-300 text-brand-500"
            }`}>
              <MaterialSymbol name={d.icon} size="sm" />
            </span>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h4 className="font-semibold text-text text-base">{d.event}</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary bg-surface-container px-2.5 py-0.5 rounded-full border border-border">
                  {d.date}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  d.status === "Completed" ? "bg-primary-fixed text-on-primary-fixed" : "bg-secondary-fixed text-on-secondary-fixed"
                }`}>
                  {d.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

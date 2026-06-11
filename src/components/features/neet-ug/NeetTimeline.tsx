"use client";

import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

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
    <div className="bg-white border border-clinical-outline rounded-3xl p-8 shadow-clinical-soft flex flex-col gap-6">
      <div className="relative border-l border-clinical-outline/80 ml-4 space-y-8 py-2">
        {dates.map((d, index) => (
          <div key={index} className="relative pl-10">
            {/* Timeline dot */}
            <span className={`absolute left-0 top-1.5 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              d.status === "Completed"
                ? "border-clinical-blue bg-clinical-blue text-white shadow-sm"
                : "border-slate-300 bg-white"
            }`}>
              {d.status === "Completed" ? (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              )}
            </span>
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex flex-col">
                <h4 className="font-extrabold text-clinical-navy text-sm md:text-base leading-snug">{d.event}</h4>
                {d.description && (
                  <p className="text-clinical-muted text-xs mt-1.5 font-medium leading-relaxed">{d.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-clinical-muted">
                  {d.date}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  d.status === "Completed"
                    ? "bg-emerald-50 text-clinical-green border-emerald-100/50"
                    : "bg-clinical-surface-low text-clinical-blue border-clinical-outline"
                }`}>
                  {d.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

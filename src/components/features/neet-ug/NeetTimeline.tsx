"use client";

import React from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface TimelineEvent {
  event: string;
  date: string;
  status: string;
  icon: string;
  description?: string;
}

interface NeetTimelineProps {
  dates: TimelineEvent[];
}

export function NeetTimeline({ dates }: NeetTimelineProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
      <div className="relative border-l border-slate-100/80 ml-4 space-y-8 py-2">
        {dates.map((d, index) => (
          <div key={index} className="relative pl-10">
            {/* Timeline dot */}
            <span className={`absolute left-0 top-1 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              d.status === "Completed"
                ? "border-blue-500 bg-blue-50/80 text-blue-600 shadow-sm shadow-blue-100/50"
                : "border-slate-200 bg-slate-50 text-slate-400"
            }`}>
              <MaterialSymbol name={d.icon} size="sm" />
            </span>
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex flex-col">
                <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug">{d.event}</h4>
                {d.description && (
                  <p className="text-slate-400/95 text-xs mt-1.5 font-medium leading-relaxed">{d.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-slate-500">
                  {d.date}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  d.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-blue-50 text-blue-700 border-blue-100"
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

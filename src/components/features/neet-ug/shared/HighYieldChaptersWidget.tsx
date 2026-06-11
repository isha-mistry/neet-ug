"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";

interface HighYieldChaptersWidgetProps {
  showExplanatoryText?: boolean;
}

const SUBJECT_WEIGHTS = [
  {
    percentage: "50%",
    title: "Biology (Botany & Zoology)",
    subtitle: "90 Questions | 360 Marks",
    colorTheme: "rose"
  },
  {
    percentage: "25%",
    title: "Chemistry",
    subtitle: "45 Questions | 180 Marks",
    colorTheme: "blue"
  },
  {
    percentage: "25%",
    title: "Physics",
    subtitle: "45 Questions | 180 Marks",
    colorTheme: "amber"
  }
] as const;

export function HighYieldChaptersWidget({ showExplanatoryText = true }: HighYieldChaptersWidgetProps) {
  const [activeSubject, setActiveSubject] = useState<"physics" | "chemistry" | "botany" | "zoology">("botany");
  const { syllabus } = neetUg2026Data;

  const getColorClasses = (theme: string) => {
    switch (theme) {
      case "rose": return "border-rose-100 bg-rose-50 text-rose-600";
      case "blue": return "border-blue-100 bg-blue-50 text-blue-600";
      case "amber": return "border-amber-100 bg-amber-50 text-amber-500";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
          <MaterialSymbol name="menu_book" size="md" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-none m-0 text-left">
          NEET UG 2026 High-Yield Syllabus & Smart PCB Study Plan
        </h3>
      </div>
      
      {showExplanatoryText && (
        <p className="text-sm text-slate-500 mt-1 leading-relaxed text-left">
          Maximize your study ROI by prioritizing chapters that carry the highest marks for the least effort, fully aligned with official NCERT 11 & 12.
        </p>
      )}

      {/* Subject Weightage Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUBJECT_WEIGHTS.map((weight, index) => (
          <div key={index} className="bg-white/80 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200">
            <span className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm ${getColorClasses(weight.colorTheme)}`}>
              {weight.percentage}
            </span>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">{weight.title}</span>
              <span className="text-sm font-extrabold text-slate-800">{weight.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100/70 p-1 rounded-xl gap-1 self-start shadow-inner border border-slate-200/40">
        {(["botany", "zoology", "chemistry", "physics"] as const).map((subject) => (
          <button
            key={subject}
            onClick={() => setActiveSubject(subject)}
            className={`px-5 py-2 font-bold text-xs capitalize transition-all rounded-lg whitespace-nowrap cursor-pointer ${
              activeSubject === subject
                ? "bg-white text-blue-600 shadow-sm font-extrabold"
                : "text-slate-500 hover:text-slate-800 font-semibold"
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* High-Yield Chapter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(activeSubject === "physics"
          ? syllabus.highYieldChapters.physics
          : activeSubject === "chemistry"
          ? syllabus.highYieldChapters.chemistry
          : activeSubject === "botany"
          ? syllabus.highYieldChapters.biology.botany
          : syllabus.highYieldChapters.biology.zoology
        ).map((chapter, index) => (
          <div key={index} className="bg-white border border-slate-100/80 rounded-lg p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md hover:border-blue-100/60 hover:-translate-y-0.5 transition-all duration-200 text-left">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <div>
                  {chapter.branch || chapter.unit ? (
                    <span className="bg-blue-50 text-blue-700 border border-blue-100/60 text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded uppercase">
                      {chapter.branch || chapter.unit}
                    </span>
                  ) : null}
                </div>
                <span className={`shrink-0 text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded uppercase border ${
                  chapter.priority === "Very High"
                    ? "bg-rose-50 text-rose-600 border-rose-100/50"
                    : "bg-amber-50 text-amber-700 border-amber-100/50"
                }`}>
                  {chapter.priority}
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-base leading-snug">{chapter.name}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{chapter.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

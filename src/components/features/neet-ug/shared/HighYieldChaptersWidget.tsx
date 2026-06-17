"use client";

import { useState } from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";
import {
  guideCardClass,
  hubCardHoverClass,
  summaryHighlightCardClass,
} from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

interface HighYieldChaptersWidgetProps {
  showExplanatoryText?: boolean;
  /** When false, omit the in-widget title (use page section heading instead). */
  showHeading?: boolean;
}

const SUBJECT_WEIGHTS = [
  {
    percentage: "50%",
    title: "Biology (Botany & Zoology)",
    questions: "90 Questions",
    marks: "360 Marks",
  },
  {
    percentage: "25%",
    title: "Chemistry",
    questions: "45 Questions",
    marks: "180 Marks",
  },
  {
    percentage: "25%",
    title: "Physics",
    questions: "45 Questions",
    marks: "180 Marks",
  },
] as const;

const WEIGHT_BADGE_CLASS =
  "border-2 border-primary/15 bg-primary-fixed text-primary";

const PRIORITY_BADGE_CLASS =
  "border-tertiary-fixed-dim/60 bg-tertiary-fixed text-on-tertiary-fixed-variant";

export function HighYieldChaptersWidget({
  showExplanatoryText = true,
  showHeading = true,
}: HighYieldChaptersWidgetProps) {
  const [activeSubject, setActiveSubject] = useState<"physics" | "chemistry" | "botany" | "zoology">(
    "botany"
  );
  const { syllabus } = neetUg2026Data;

  return (
    <div className="flex flex-col gap-6">
      {showHeading ? (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-outline-variant/40 bg-primary-fixed text-primary">
            <MaterialSymbol name="menu_book" size="md" />
          </div>
          <h3 className="m-0 text-left font-headline-md text-xl font-bold leading-none text-on-surface md:text-2xl">
            NEET UG 2026 High-Yield Syllabus & Smart PCB Study Plan
          </h3>
        </div>
      ) : null}

      {showExplanatoryText ? (
        <p className="mt-1 text-left text-sm leading-relaxed text-on-surface-variant">
          Maximize your study ROI by prioritizing chapters that carry the highest marks for the
          least effort, fully aligned with official NCERT 11 & 12.
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SUBJECT_WEIGHTS.map((weight) => (
          <div
            key={weight.title}
            className={cn(summaryHighlightCardClass, "flex items-center gap-4 p-5")}
          >
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                WEIGHT_BADGE_CLASS
              )}
            >
              {weight.percentage}
            </span>
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
                {weight.title}
              </span>
              <span className="text-sm font-bold leading-snug text-on-surface">
                {weight.questions}
              </span>
              <span className="text-sm font-bold leading-snug text-on-surface">{weight.marks}</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="inline-flex self-start gap-1 rounded-xl border border-outline-variant/40 bg-surface-container-high p-1"
        role="tablist"
        aria-label="PCB subjects"
      >
        {(["botany", "zoology", "chemistry", "physics"] as const).map((subject) => (
          <button
            key={subject}
            type="button"
            role="tab"
            aria-selected={activeSubject === subject}
            onClick={() => setActiveSubject(subject)}
            className={cn(
              "cursor-pointer rounded-lg px-5 py-2 text-xs font-semibold capitalize transition-all whitespace-nowrap",
              activeSubject === subject
                ? "bg-surface font-bold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {(activeSubject === "physics"
          ? syllabus.highYieldChapters.physics
          : activeSubject === "chemistry"
            ? syllabus.highYieldChapters.chemistry
            : activeSubject === "botany"
              ? syllabus.highYieldChapters.biology.botany
              : syllabus.highYieldChapters.biology.zoology
        ).map((chapter) => (
          <article
            key={`${chapter.name}-${chapter.unit ?? chapter.branch ?? ""}`}
            className={cn(guideCardClass, hubCardHoverClass, "flex flex-col gap-3 text-left")}
          >
            <div className="flex items-start justify-between gap-3">
              {chapter.branch || chapter.unit ? (
                <span className="rounded-md border border-primary/15 bg-primary-fixed/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {chapter.branch || chapter.unit}
                </span>
              ) : (
                <span />
              )}
              <span
                className={cn(
                  "shrink-0 rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  PRIORITY_BADGE_CLASS
                )}
              >
                {chapter.priority}
              </span>
            </div>
            <h4 className="text-base font-bold leading-snug text-on-surface">{chapter.name}</h4>
            <p className="text-sm leading-relaxed text-on-surface-variant">{chapter.reason}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

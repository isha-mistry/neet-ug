/** Shared layout tokens for MBBS in India guide */
export const guideTableWrapClass =
  "overflow-x-auto rounded-2xl border border-outline-variant/40 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,61,155,0.12)]";

export const guideTableClass =
  "w-full border-collapse text-sm [&_thead]:bg-surface-container-high [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-[11px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-on-surface [&_th]:align-middle [&_td]:px-4 [&_td]:py-3 [&_td]:align-middle [&_tbody_tr]:border-t [&_tbody_tr]:border-outline-variant/40 [&_tbody_tr:nth-child(even)]:bg-surface-container-lowest/50 [&_tbody_tr:hover]:bg-primary-fixed/20";

/** Label in the first column; remaining columns right-aligned (headers + body + footer). */
export const guideTableLabelNumericColsClass =
  "[&_thead_th:first-child]:text-left [&_tbody_td:first-child]:text-left [&_tfoot_td:first-child]:text-left [&_thead_th:not(:first-child)]:text-right [&_tbody_td:not(:first-child)]:text-right [&_tfoot_td:not(:first-child)]:text-right";

/** State college list: # right; name/meta left; seat columns right; NMC left. */
export const guideTableCollegeListColsClass =
  "[&_thead_th:nth-child(1)]:text-right [&_tbody_td:nth-child(1)]:text-right [&_thead_th:nth-child(2)]:text-left [&_tbody_td:nth-child(2)]:text-left [&_thead_th:nth-child(n+3):nth-child(-n+5)]:text-left [&_tbody_td:nth-child(n+3):nth-child(-n+5)]:text-left [&_thead_th:nth-child(n+6):nth-child(-n+10)]:text-right [&_tbody_td:nth-child(n+6):nth-child(-n+10)]:text-right [&_thead_th:nth-child(11)]:text-left [&_tbody_td:nth-child(11)]:text-left";

/** Rank + seat/count columns right; name/location columns left (NIRF-style). */
export const guideTableRankNameNumericColsClass =
  "[&_thead_th:nth-child(1)]:text-right [&_tbody_td:nth-child(1)]:text-right [&_thead_th:nth-child(n+2):nth-child(-n+5)]:text-left [&_tbody_td:nth-child(n+2):nth-child(-n+5)]:text-left [&_thead_th:nth-child(n+6)]:text-right [&_tbody_td:nth-child(n+6)]:text-right";

export const guideCardClass =
  "rounded-2xl border border-outline-variant/40 bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,61,155,0.1)] p-5 md:p-6";

/** Compact stat tiles in MBBS summary sections (no primary fill). */
export const summaryHighlightCardClass =
  "rounded-xl border border-outline-variant/40 bg-surface px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,61,155,0.08)]";

export const guideBandClass =
  "border-y border-outline-variant/30 bg-surface-container-low/60";

/** Shared layout tokens for MBBS in India guide */
export const guideTableWrapClass =
  "overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]";

export const guideTableClass =
  "w-full border-collapse text-sm [&_thead]:bg-primary [&_thead_th]:text-white [&_tbody_th]:text-on-surface [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-[11px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.14em] [&_th]:align-middle [&_td]:px-4 [&_td]:py-3 [&_td]:align-middle [&_tbody_tr]:border-b [&_tbody_tr]:border-outline-variant [&_tbody_tr:last-child]:border-b-0 [&_tbody_tr:hover]:bg-primary-fixed/20 [&_tbody_td:first-child]:bg-surface-container-low/60 [&_tbody_td:first-child]:font-bold [&_tbody_td:first-child]:text-on-surface";

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
  "rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)] p-5 md:p-6";

/** Compact stat tiles in MBBS summary sections (no primary fill). */
export const summaryHighlightCardClass =
  "rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-14px_rgba(37,70,208,0.16)]";

export const guideBandClass =
  "border-y border-outline-variant bg-surface-container-low/30";


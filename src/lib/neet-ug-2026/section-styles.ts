/** Shared surfaces for NEET UG 2026 hub (aligned with Journey Home design system). */

export const guideTableWrapClass =
  "overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]";

export const guideTableClass =
  "w-full border-collapse text-sm tabular-nums [&_thead]:bg-primary [&_th]:px-5 [&_th]:py-4 [&_th]:text-[10px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.14em] [&_th]:text-on-primary [&_td]:px-5 [&_td]:py-4 [&_td]:align-top [&_td]:leading-[1.6] [&_tbody_tr]:border-b [&_tbody_tr]:border-outline-variant [&_tbody_tr:last-child]:border-b-0 [&_tbody_tr:hover]:bg-primary-fixed/20 [&_tbody_td:first-child]:bg-surface-container-low/60 [&_tbody_td:first-child]:font-bold [&_tbody_td:first-child]:text-on-surface";

export const guideTableLabelNumericColsClass =
  "[&_thead_th:first-child]:text-left [&_tbody_td:first-child]:text-left [&_tfoot_td:first-child]:text-left [&_thead_th:not(:first-child)]:text-right [&_tbody_td:not(:first-child)]:text-right [&_tfoot_td:not(:first-child)]:text-right";

export const guideCardClass =
  "rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)] p-5 md:p-6";

export const summaryHighlightCardClass =
  "rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-14px_rgba(37,70,208,0.16)]";

export const guideBandClass =
  "border-y border-outline-variant bg-surface-container-low/30";

/** Interactive hub link / tile hover (on top of guideCardClass). */
export const hubCardHoverClass =
  "transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_2px_6px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(37,70,208,0.28)]";

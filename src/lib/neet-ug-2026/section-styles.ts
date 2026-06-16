/** Shared surfaces for NEET UG 2026 hub (aligned with MBBS guide + rank predictor). */
export {
  guideCardClass,
  guideTableClass,
  guideTableLabelNumericColsClass,
  guideTableWrapClass,
  summaryHighlightCardClass,
} from "@/lib/mbbs-india/section-styles";

/** Interactive hub link / tile hover (on top of guideCardClass). */
export const hubCardHoverClass =
  "transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-12px_rgba(0,61,155,0.14)]";

import type { SVGProps } from "react";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiList,
  FiLock,
  FiMapPin,
  FiRepeat,
  FiShield,
  FiUnlock,
  FiX,
} from "react-icons/fi";

/** Form card icon — matches rank-predictor-page.html fhead clipboard SVG */
export function RankPredictorNeetDetailsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 8h8M8 12h8M8 16h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Result summary pill — matches HTML rpill chart sparkline */
export function RankPredictorScoreSparklineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M2 12l4-8 3 5 2-3 3 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small lock badge — matches HTML lflag lock SVG */
export function RankPredictorLockBadgeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <rect
        x="2.5"
        y="6"
        width="9"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.5 6V4.5a2.5 2.5 0 015 0V6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export const rankPredictorStepIcons = {
  score: FiActivity,
  band: FiBarChart2,
  verify: FiShield,
} as const;

export {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiList,
  FiLock,
  FiMapPin,
  FiShield,
  FiUnlock,
  FiX,
  FiRepeat,
};

"use client";

import { useEffect, useRef, useState } from "react";

export const LEAD_REDIRECT_SECONDS = 5;

/**
 * Counts down from {@link LEAD_REDIRECT_SECONDS} while mounted, then calls `onComplete`.
 * Mount only while the thank-you / redirect UI is visible so each run starts fresh.
 */
export function useLeadRedirectCountdown(onComplete: () => void): number {
  const completedRef = useRef(false);
  const [seconds, setSeconds] = useState(LEAD_REDIRECT_SECONDS);

  useEffect(() => {
    completedRef.current = false;
    let remaining = LEAD_REDIRECT_SECONDS;

    const id = window.setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        window.clearInterval(id);
        setSeconds(0);
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
        return;
      }
      setSeconds(remaining);
    }, 1000);

    return () => window.clearInterval(id);
  }, [onComplete]);

  return seconds;
}

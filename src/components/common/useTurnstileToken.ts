"use client";

import { useCallback, useState } from "react";

/**
 * Manages a Cloudflare Turnstile token that must be refreshed after each
 * server-side verification (tokens are single-use).
 */
export function useTurnstileToken() {
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const [resetKey, setResetKey] = useState(0);

  const clearCaptchaToken = useCallback(() => {
    setCaptchaToken(undefined);
  }, []);

  /** Invalidate the current token and request a new challenge. */
  const refreshCaptcha = useCallback(() => {
    setCaptchaToken(undefined);
    setResetKey((key) => key + 1);
  }, []);

  return {
    captchaToken,
    resetKey,
    setCaptchaToken,
    clearCaptchaToken,
    refreshCaptcha,
    turnstileProps: {
      resetKey,
      onVerify: setCaptchaToken,
      onExpire: clearCaptchaToken,
      onError: clearCaptchaToken,
    },
  };
}

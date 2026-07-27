"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useCallback, useEffect, useRef } from "react";

export type TurnstileCaptchaProps = {
  onVerify: (token: string) => void;
  /** Called when the token expires or the widget is reset — clear stored token. */
  onExpire?: () => void;
  onError?: () => void;
  /**
   * Increment/change after a token is consumed server-side (OTP send, verify, lead submit)
   * so a fresh challenge is issued without a full page refresh.
   */
  resetKey?: string | number;
  className?: string;
};

const TEST_SITE_KEY = "1x00000000000000000000AA";

export function TurnstileCaptcha({
  onVerify,
  onExpire,
  onError,
  resetKey = 0,
  className,
}: TurnstileCaptchaProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;
  const widgetRef = useRef<TurnstileInstance | null>(null);
  const prevResetKey = useRef(resetKey);

  const handleSuccess = useCallback(
    (token: string) => {
      onVerify(token);
    },
    [onVerify],
  );

  const handleExpire = useCallback(() => {
    onExpire?.();
  }, [onExpire]);

  const handleError = useCallback(() => {
    onExpire?.();
    onError?.();
  }, [onError, onExpire]);

  // resetKey changed → reset widget for a new single-use token (same mount).
  useEffect(() => {
    if (prevResetKey.current === resetKey) return;
    prevResetKey.current = resetKey;
    onExpire?.();
    widgetRef.current?.reset();
  }, [resetKey, onExpire]);

  return (
    <div className={className}>
      <Turnstile
        ref={widgetRef}
        // Remount when resetKey changes so invisible widgets reliably re-challenge.
        key={`turnstile-${siteKey}-${resetKey}`}
        siteKey={siteKey}
        options={{
          size: "invisible",
          refreshExpired: "auto",
        }}
        onSuccess={handleSuccess}
        onExpire={handleExpire}
        onError={handleError}
      />
    </div>
  );
}

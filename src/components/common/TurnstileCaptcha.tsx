"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useCallback } from "react";

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  className?: string;
}

const TEST_SITE_KEY = "1x00000000000000000000AA";

export function TurnstileCaptcha({ onVerify, onError, className }: TurnstileCaptchaProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

  const handleSuccess = useCallback(
    (token: string) => {
      onVerify(token);
    },
    [onVerify]
  );

  return (
    <div className={className}>
      <Turnstile
        siteKey={siteKey}
        options={{
          size: "invisible",
        }}
        onSuccess={handleSuccess}
        onError={onError}
      />
    </div>
  );
}

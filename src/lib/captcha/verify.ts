import { reportAppError } from "@/lib/sentry/error-reporter";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Cloudflare Turnstile token server-side.
 * Falls back to true in development or when official test keys are configured.
 */
export async function verifyTurnstileToken(
  token?: string | null,
  ip?: string | null
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    reportAppError(new Error("TURNSTILE_SECRET_KEY environment variable is not configured"), {
      module: "security",
      feature: "captcha",
      action: "verifyTurnstileToken",
      metadata: { reason: "missing_secret_key", ip: ip || undefined },
    });
    return { ok: false, error: "Security check configuration error. Please refresh and try again." };
  }

  // If no token was provided
  if (!token || !token.trim()) {
    // In dev mode with test keys, allow pass-through if testing without widget
    if (process.env.NODE_ENV === "development" && secret.startsWith("1x000")) {
      return { ok: true };
    }
    reportAppError(new Error("Turnstile CAPTCHA token missing or empty"), {
      module: "security",
      feature: "captcha",
      action: "verifyTurnstileToken",
      metadata: { reason: "missing_token", ip: ip || undefined },
    });
    return { ok: false, error: "Security check failed. Please refresh the page and try again." };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      reportAppError(
        new Error(`Turnstile verification HTTP error: ${res.status} ${res.statusText}`),
        {
          module: "security",
          feature: "captcha",
          action: "verifyTurnstileToken",
          metadata: {
            reason: "http_error",
            httpStatus: res.status,
            httpStatusText: res.statusText,
            responseText: errorText.slice(0, 500),
            ip: ip || undefined,
          },
        }
      );
      return { ok: false, error: "Security check failed due to server error. Please try again." };
    }

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) {
      const errorCodes = data["error-codes"] || [];
      console.warn("[verifyTurnstileToken] CAPTCHA verification failed:", errorCodes);
      reportAppError(
        new Error(`Turnstile CAPTCHA verification failed: ${errorCodes.join(", ") || "unknown_error"}`),
        {
          module: "security",
          feature: "captcha",
          action: "verifyTurnstileToken",
          metadata: {
            reason: "verification_failed",
            errorCodes,
            ip: ip || undefined,
          },
        }
      );
      return { ok: false, error: "Security check failed. Please refresh and try again." };
    }

    return { ok: true };
  } catch (err) {
    reportAppError(err, {
      module: "security",
      feature: "captcha",
      action: "verifyTurnstileToken",
      metadata: {
        reason: "unexpected_exception",
        ip: ip || undefined,
      },
    });
    return { ok: false, error: "Could not verify security challenge. Please try again." };
  }
}

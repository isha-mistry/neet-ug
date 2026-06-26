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
  const secret = process.env.TURNSTILE_SECRET_KEY!;

  // If no token was provided
  if (!token || !token.trim()) {
    // In dev mode with test keys, allow pass-through if testing without widget
    if (process.env.NODE_ENV === "development" && secret.startsWith("1x000")) {
      return { ok: true };
    }
    return { ok: false, error: "Please complete the security check (CAPTCHA)." };
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

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("[verifyTurnstileToken] CAPTCHA verification failed:", data["error-codes"]);
      return { ok: false, error: "Security check failed. Please refresh and try again." };
    }

    return { ok: true };
  } catch (err) {
    reportAppError(err, {
      module: "security",
      feature: "captcha",
      action: "verifyTurnstileToken",
    });
    return { ok: false, error: "Could not verify security challenge. Please try again." };
  }
}

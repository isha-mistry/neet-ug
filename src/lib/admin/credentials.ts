import "server-only";

import { timingSafeEqual } from "node:crypto";

function parseAllowlist(): Set<string> {
  const raw = process.env.ADMIN_EMAIL_ALLOWLIST?.trim() ?? "";
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

function safeEqualString(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    // Compare against self to keep timing closer when lengths differ
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

/**
 * Validates admin email allowlist + shared password.
 * Always runs password compare when password is configured to reduce timing leaks.
 */
export function verifyAdminCredentials(
  email: string,
  password: string
): boolean {
  const normalizedEmail = email.trim().toLowerCase();
  const allowlist = parseAllowlist();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!normalizedEmail || !password || !expectedPassword || allowlist.size === 0) {
    return false;
  }

  const emailAllowed = allowlist.has(normalizedEmail);
  const passwordOk = safeEqualString(password, expectedPassword);

  return emailAllowed && passwordOk;
}

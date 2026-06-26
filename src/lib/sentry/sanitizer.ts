/**
 * Centralized PII & Sensitive Payload Sanitizer for Telemetry.
 * Ensures strict compliance with data protection standards before dispatching context to Sentry.
 */

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "authtoken",
  "auth_token",
  "authorization",
  "cookie",
  "secret",
  "otp",
  "api_key",
  "apikey",
  "access_token",
  "refresh_token",
  "phone",
  "mobile",
  "phonenumber",
  "phone_number",
  "email",
  "mail",
  "fullname",
  "full_name",
  "name",
  "message",
  "query",
  "address",
]);

/**
 * Sanitizes email strings by masking local parts while preserving domain for debugging.
 */
function maskEmail(val: string): string {
  const parts = val.split("@");
  if (parts.length === 2 && parts[1]) {
    return `[REDACTED_EMAIL] (${parts[1]})`;
  }
  return "[REDACTED_EMAIL]";
}

/**
 * Sanitizes phone numbers by masking exact digits while noting validity.
 */
function maskPhone(val: string): string {
  const digits = val.replace(/\D/g, "");
  if (digits.length >= 10) {
    return `[REDACTED_PHONE_10_DIGITS]`;
  }
  return `[REDACTED_PHONE_${digits.length}_DIGITS]`;
}

/**
 * Recursively sanitizes any data structure (objects, arrays, primitives).
 */
export function sanitizeContextData(input: unknown, depth = 0): unknown {
  if (depth > 6 || input === null || input === undefined) {
    return input;
  }

  if (typeof input === "string") {
    const trimmed = input.trim();
    // Scrub inline emails
    if (trimmed.includes("@") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return maskEmail(trimmed);
    }
    // Scrub inline 10+ digit sequences
    if (/^(?:\+?\d{1,3}[\s-]?)?\d{10}$/.test(trimmed)) {
      return maskPhone(trimmed);
    }
    return input;
  }

  if (typeof input === "number" || typeof input === "boolean") {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeContextData(item, depth + 1));
  }

  if (typeof input === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      const lowerKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");

      if (SENSITIVE_KEYS.has(lowerKey)) {
        if (lowerKey.includes("email") && typeof value === "string") {
          sanitized[key] = maskEmail(value);
        } else if ((lowerKey.includes("phone") || lowerKey.includes("mobile")) && typeof value === "string") {
          sanitized[key] = maskPhone(value);
        } else {
          sanitized[key] = typeof value === "boolean" ? value : `[REDACTED_${key.toUpperCase()}]`;
        }
      } else {
        sanitized[key] = sanitizeContextData(value, depth + 1);
      }
    }
    return sanitized;
  }

  return "[UNSUPPORTED_TYPE]";
}

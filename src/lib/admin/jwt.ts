import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import {
  ADMIN_JWT_TTL_SEC,
  ADMIN_ROLE,
} from "@/lib/admin/constants";

export type AdminJwtPayload = {
  sub: string;
  role: typeof ADMIN_ROLE;
  iat: number;
  exp: number;
};

function getJwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_JWT_SECRET must be set (min 32 characters)");
  }
  return secret;
}

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64");
}

function hmacSha256(data: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(data).digest();
}

function signHs256(data: string, secret: string): string {
  return base64UrlEncode(hmacSha256(data, secret));
}

export function signAdminJwt(email: string): {
  token: string;
  expiresAt: string;
} {
  const secret = getJwtSecret();
  const nowSec = Math.floor(Date.now() / 1000);
  const exp = nowSec + ADMIN_JWT_TTL_SEC;
  const header = { alg: "HS256", typ: "JWT" };
  const payload: AdminJwtPayload = {
    sub: email.toLowerCase(),
    role: ADMIN_ROLE,
    iat: nowSec,
    exp,
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = signHs256(signingInput, secret);
  return {
    token: `${signingInput}.${signature}`,
    expiresAt: new Date(exp * 1000).toISOString(),
  };
}

export function verifyAdminJwt(token: string): AdminJwtPayload | null {
  try {
    const secret = getJwtSecret();
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [encodedHeader, encodedPayload, signature] = parts;
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    let providedSig: Buffer;
    try {
      providedSig = base64UrlDecode(signature);
    } catch {
      return null;
    }
    const expectedSig = hmacSha256(signingInput, secret);
    if (
      providedSig.length !== expectedSig.length ||
      !timingSafeEqual(providedSig, expectedSig)
    ) {
      return null;
    }
    const payload = JSON.parse(
      base64UrlDecode(encodedPayload).toString("utf8")
    ) as AdminJwtPayload;
    if (
      typeof payload.sub !== "string" ||
      payload.role !== ADMIN_ROLE ||
      typeof payload.exp !== "number" ||
      typeof payload.iat !== "number"
    ) {
      return null;
    }
    if (Math.floor(Date.now() / 1000) >= payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

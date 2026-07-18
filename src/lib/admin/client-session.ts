"use client";

import {
  ADMIN_TOKEN_EXPIRES_STORAGE_KEY,
  ADMIN_TOKEN_STORAGE_KEY,
} from "@/lib/admin/constants";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  const expiresAt = sessionStorage.getItem(ADMIN_TOKEN_EXPIRES_STORAGE_KEY);
  if (!token) return null;
  if (expiresAt) {
    const expMs = Date.parse(expiresAt);
    if (!Number.isNaN(expMs) && Date.now() >= expMs) {
      clearAdminToken();
      return null;
    }
  }
  return token;
}

export function setAdminToken(token: string, expiresAt: string): void {
  sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  sessionStorage.setItem(ADMIN_TOKEN_EXPIRES_STORAGE_KEY, expiresAt);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(ADMIN_TOKEN_EXPIRES_STORAGE_KEY);
}

export async function adminFetch(
  input: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getAdminToken();
  const headers = new Headers(init.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(input, { ...init, headers });
}

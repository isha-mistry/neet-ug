"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { setAdminToken } from "@/lib/admin/client-session";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        token?: string;
        expiresAt?: string;
        error?: string;
      };
      if (!res.ok || !data.token || !data.expiresAt) {
        setError(data.error || "Invalid credentials");
        return;
      }
      setAdminToken(data.token, data.expiresAt);
      router.replace("/admin/leads");
    } catch {
      setError("Unable to sign in. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md space-y-5 rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">
          Admin sign in
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Leads inbox — authorized staff only.
        </p>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          Email
        </span>
        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          Password
        </span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      {error ? (
        <p className="rounded-xl border border-error/30 bg-error-container/70 px-3 py-2 text-sm text-on-surface">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-on-primary transition hover:bg-primary-pressed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

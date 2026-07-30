"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  adminFetch,
  clearAdminToken,
  getAdminToken,
} from "@/lib/admin/client-session";

type StatusResponse = {
  ok: boolean;
  configured?: boolean;
  baseUrl?: string;
  instanceName?: string;
  instances?: string[];
  state?: string;
  connected?: boolean;
  error?: string;
};

type ConnectResponse = {
  ok: boolean;
  alreadyConnected?: boolean;
  instanceName?: string;
  state?: string;
  connected?: boolean;
  qrDataUrl?: string | null;
  pairingCode?: string | null;
  error?: string;
};

type ActionResponse = {
  ok: boolean;
  error?: string;
  state?: string;
  connected?: boolean;
  deleted?: boolean;
  webhookConfigured?: boolean;
  webhookUrl?: string | null;
  instanceName?: string;
};

function stateBadgeClass(state: string | undefined, connected: boolean): string {
  if (connected) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  const s = (state ?? "").toLowerCase();
  if (s.includes("connect")) return "bg-amber-100 text-amber-900 border-amber-200";
  if (s === "unreachable") return "bg-red-100 text-red-800 border-red-200";
  return "bg-surface-container-high text-on-surface-variant border-outline-variant";
}

export function AdminWhatsAppView() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [qrAgeSeconds, setQrAgeSeconds] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const qrTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  const logout = useCallback(() => {
    clearAdminToken();
    router.replace("/admin/login");
  }, [router]);

  const handleUnauthorized = useCallback(() => {
    clearAdminToken();
    router.replace("/admin/login");
  }, [router]);

  const refreshStatus = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/whatsapp/status");
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      const json = (await res.json()) as StatusResponse;
      setStatus(json);
      if (json.connected) {
        setQrDataUrl(null);
        setPairingCode(null);
      }
      if (!json.ok && json.error) {
        setError(json.error);
      } else {
        setError(null);
      }
    } catch {
      setError("Failed to reach WhatsApp status API");
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    if (!ready) return;
    void refreshStatus();
  }, [ready, refreshStatus]);

  // Poll while waiting for QR scan to complete
  useEffect(() => {
    if (!ready) return;
    const shouldPoll =
      Boolean(qrDataUrl) ||
      (status?.state?.toLowerCase().includes("connect") && !status.connected);

    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }

    if (!shouldPoll) return;

    pollRef.current = setInterval(() => {
      void refreshStatus();
    }, 4000);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [ready, qrDataUrl, status?.state, status?.connected, refreshStatus]);

  async function runSetup() {
    setBusy("setup");
    setMessage(null);
    setError(null);
    try {
      const res = await adminFetch("/api/admin/whatsapp/setup", {
        method: "POST",
        body: "{}",
      });
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      const json = (await res.json()) as ActionResponse;
      if (!json.ok) {
        setError(json.error || "Setup failed");
        return;
      }
      setMessage(
        json.webhookConfigured
          ? `Instance ready. Webhook registered (${json.webhookUrl ?? "ok"}).`
          : "Instance ready. Set EVOLUTION_WEBHOOK_URL (or NEXT_PUBLIC_SITE_URL) to register webhooks.",
      );
      await refreshStatus();
    } catch {
      setError("Setup request failed");
    } finally {
      setBusy(null);
    }
  }

  /**
   * WhatsApp rejects a QR that Evolution has already rotated ("Could not link
   * device"), so this reruns on a timer while the code is on screen.
   */
  const fetchQr = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      if (!silent) {
        setBusy("connect");
        setMessage(null);
        setError(null);
      }
      try {
        const res = await adminFetch("/api/admin/whatsapp/connect", {
          method: "POST",
          body: "{}",
        });
        if (res.status === 401) {
          handleUnauthorized();
          return;
        }
        const json = (await res.json()) as ConnectResponse;
        if (!json.ok) {
          setError(json.error || "Failed to fetch QR code");
          if (!silent) setQrDataUrl(null);
          return;
        }
        if (json.alreadyConnected || json.connected) {
          setQrDataUrl(null);
          setPairingCode(null);
          setMessage("WhatsApp is already connected.");
          await refreshStatus();
          return;
        }
        if (!json.qrDataUrl) {
          if (!silent) {
            setError(
              "Evolution did not return a QR image yet. Wait a few seconds and try again.",
            );
            setQrDataUrl(null);
          }
          await refreshStatus();
          return;
        }
        setQrDataUrl(json.qrDataUrl);
        setPairingCode(json.pairingCode ?? null);
        setQrAgeSeconds(0);
        setError(null);
        setMessage(
          "Scan this QR with WhatsApp → Linked devices. It refreshes automatically until linked.",
        );
        await refreshStatus();
      } catch {
        if (!silent) setError("Connect request failed");
      } finally {
        if (!silent) setBusy(null);
      }
    },
    [handleUnauthorized, refreshStatus],
  );

  // Evolution rotates the QR; pull a fresh one well inside that window.
  useEffect(() => {
    if (!ready || !qrDataUrl || status?.connected) {
      if (qrTimerRef.current) {
        clearInterval(qrTimerRef.current);
        qrTimerRef.current = null;
      }
      return;
    }

    qrTimerRef.current = setInterval(() => {
      setQrAgeSeconds((age) => {
        const next = age + 1;
        if (next >= 20) {
          void fetchQr({ silent: true });
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (qrTimerRef.current) {
        clearInterval(qrTimerRef.current);
        qrTimerRef.current = null;
      }
    };
  }, [ready, qrDataUrl, status?.connected, fetchQr]);

  async function showQr() {
    await fetchQr();
  }

  async function disconnect(deleteInstance: boolean) {
    const confirmMsg = deleteInstance
      ? "Log out WhatsApp and delete the Evolution instance? You will need Setup again before reconnecting."
      : "Log out WhatsApp from this device? You can scan a new QR afterwards.";
    if (!window.confirm(confirmMsg)) return;

    setBusy(deleteInstance ? "delete" : "logout");
    setMessage(null);
    setError(null);
    try {
      const res = await adminFetch("/api/admin/whatsapp/logout", {
        method: "POST",
        body: JSON.stringify({ deleteInstance }),
      });
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      const json = (await res.json()) as ActionResponse;
      if (!json.ok) {
        setError(json.error || "Disconnect failed");
        return;
      }
      setQrDataUrl(null);
      setPairingCode(null);
      setMessage(
        deleteInstance
          ? "WhatsApp logged out and instance deleted."
          : "WhatsApp logged out. Scan a new QR to reconnect.",
      );
      await refreshStatus();
    } catch {
      setError("Disconnect request failed");
    } finally {
      setBusy(null);
    }
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-on-surface-variant">
        Checking session…
      </div>
    );
  }

  const connected = Boolean(status?.connected);
  const stateLabel = status?.state ?? "unknown";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-outline-variant pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Internal · Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-on-surface">
            WhatsApp connection
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Link Evolution API (Docker on localhost) by scanning a QR code.
            Disconnect when you need to remove the session.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/leads"
            className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed"
          >
            Leads
          </Link>
          <Link
            href="/admin/plans"
            className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed"
          >
            Plans
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed"
          >
            Log out
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-outline-variant bg-surface-container-low/40 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
              Connection status
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${stateBadgeClass(stateLabel, connected)}`}
              >
                {connected ? "Connected" : stateLabel}
              </span>
              {status?.instanceName ? (
                <span className="text-sm text-on-surface-variant">
                  Instance{" "}
                  <span className="font-semibold text-on-surface">
                    {status.instanceName}
                  </span>
                </span>
              ) : null}
            </div>
            {status?.baseUrl ? (
              <p className="mt-2 text-xs text-on-surface-variant">
                API: <code className="text-on-surface">{status.baseUrl}</code>
              </p>
            ) : null}
            {status?.instances?.length ? (
              <p className="mt-1 text-xs text-on-surface-variant">
                Instances on server:{" "}
                <code className="text-on-surface">
                  {status.instances.join(", ")}
                </code>
              </p>
            ) : null}
          </div>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => void refreshStatus()}
            className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </section>

      <section className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => void runSetup()}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-hover disabled:opacity-50"
        >
          {busy === "setup" ? "Setting up…" : "1. Setup instance"}
        </button>
        <button
          type="button"
          disabled={busy !== null || connected}
          onClick={() => void showQr()}
          className="rounded-xl border border-primary bg-primary-fixed px-4 py-2.5 text-sm font-semibold text-on-primary-fixed transition hover:border-primary disabled:opacity-50"
        >
          {busy === "connect" ? "Loading QR…" : "2. Show QR to connect"}
        </button>
        <button
          type="button"
          disabled={busy !== null || !connected}
          onClick={() => void disconnect(false)}
          className="rounded-xl border border-outline-variant px-4 py-2.5 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed disabled:opacity-50"
        >
          {busy === "logout" ? "Logging out…" : "Log out WhatsApp"}
        </button>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => void disconnect(true)}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-800 transition hover:bg-red-100 disabled:opacity-50"
        >
          {busy === "delete" ? "Removing…" : "Log out + delete instance"}
        </button>
      </section>

      {message ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {message}
        </p>
      ) : null}
      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {qrDataUrl && !connected ? (
        <section className="flex flex-col items-center gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 text-center">
          <p className="text-sm font-semibold text-on-surface">
            Scan with WhatsApp
          </p>
          <p className="max-w-sm text-xs text-on-surface-variant">
            Open WhatsApp on your phone → Settings → Linked devices → Link a
            device, then scan this code.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt="WhatsApp QR code"
            className="h-64 w-64 rounded-xl border border-outline-variant bg-white p-2"
          />
          <p className="text-xs text-on-surface-variant">
            Auto-refreshing in {Math.max(0, 20 - qrAgeSeconds)}s — scan the code
            currently on screen.
          </p>
          {pairingCode ? (
            <p className="text-sm text-on-surface-variant">
              Pairing code:{" "}
              <span className="font-mono font-bold text-on-surface">
                {pairingCode}
              </span>
            </p>
          ) : null}
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => void showQr()}
            className="text-sm font-semibold text-primary hover:underline disabled:opacity-50"
          >
            Refresh QR
          </button>
        </section>
      ) : null}

      <section className="rounded-2xl border border-dashed border-outline-variant p-4 text-xs leading-relaxed text-on-surface-variant">
        <p className="font-semibold text-on-surface">Server setup notes</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>
            Evolution Docker API should be reachable as{" "}
            <code>EVOLUTION_API_URL</code> (typically{" "}
            <code>http://localhost:8080</code> on the same host).
          </li>
          <li>
            <code>EVOLUTION_API_KEY</code> must match{" "}
            <code>WHATSAPP_EVOLUTION_API_KEY</code> in the Evolution package
            <code>.env</code>.
          </li>
          <li>
            Webhooks from the Evolution container to Next.js should use{" "}
            <code>http://host.docker.internal:3000/api/webhooks/evolution</code>{" "}
            (not <code>localhost</code> inside Docker). Set{" "}
            <code>EVOLUTION_WEBHOOK_URL</code>.
          </li>
        </ul>
      </section>
    </div>
  );
}

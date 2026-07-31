"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  adminFetch,
  clearAdminToken,
  getAdminToken,
} from "@/lib/admin/client-session";
import { AdminConfirmDialog } from "@/components/features/admin/AdminConfirmDialog";
import {
  AdminToastViewport,
  useAdminToasts,
} from "@/components/features/admin/AdminToast";

type StatusResponse = {
  ok: boolean;
  configured?: boolean;
  baseUrl?: string;
  instanceName?: string;
  instances?: string[];
  instanceExists?: boolean;
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

type Stage =
  | "loading"
  | "not-configured"
  | "unreachable"
  | "setup"
  | "link"
  | "connected";

type ConfirmAction = "logout" | "delete" | null;

function deriveStage(status: StatusResponse | null): Stage {
  if (!status) return "loading";
  if (status.configured === false) return "not-configured";
  if (!status.ok || status.state === "unreachable") return "unreachable";
  if (status.connected) return "connected";
  if (status.instanceExists === false) return "setup";
  return "link";
}

const STEPS = [
  {
    key: "setup",
    title: "Set up instance",
    description: "Create the WhatsApp instance on the server",
  },
  {
    key: "link",
    title: "Link device",
    description: "Scan the QR code with WhatsApp on your phone",
  },
  {
    key: "connected",
    title: "Connected",
    description: "Messages can be sent from Dravio",
  },
] as const;

function stepIndexForStage(stage: Stage): number {
  if (stage === "setup") return 0;
  if (stage === "link") return 1;
  if (stage === "connected") return 2;
  return -1;
}

function Stepper({ stage }: { stage: Stage }) {
  const current = stepIndexForStage(stage);
  return (
    <ol className="grid gap-3 sm:grid-cols-3">
      {STEPS.map((step, index) => {
        const done = current > index || (stage === "connected" && index === 2);
        const active = current === index;
        return (
          <li
            key={step.key}
            className={`flex items-start gap-3 rounded-2xl border p-4 transition ${
              active
                ? "border-primary bg-primary-fixed/60"
                : done
                  ? "border-emerald-200 bg-emerald-50/60"
                  : "border-outline-variant bg-surface-container-low/40"
            }`}
          >
            <span
              aria-hidden
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                done
                  ? "bg-emerald-600 text-white"
                  : active
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {done ? "✓" : index + 1}
            </span>
            <div>
              <p
                className={`text-sm font-bold ${
                  active || done ? "text-on-surface" : "text-on-surface-variant"
                }`}
              >
                {step.title}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-on-surface-variant">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function AdminWhatsAppView() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [qrAgeSeconds, setQrAgeSeconds] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const qrTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasConnectedRef = useRef<boolean | null>(null);
  const { toasts, pushToast, dismissToast } = useAdminToasts();

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
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
      // Announce the transition to connected (e.g. after a QR scan completes).
      if (wasConnectedRef.current === false && json.connected) {
        pushToast("success", "WhatsApp connected — you're all set.");
      }
      wasConnectedRef.current = Boolean(json.connected);
    } catch {
      setStatus((prev) => ({
        ...(prev ?? {}),
        ok: false,
        state: "unreachable",
        connected: false,
        error: "Failed to reach the WhatsApp status API.",
      }));
    }
  }, [handleUnauthorized, pushToast]);

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
        pushToast("error", json.error || "Setup failed. Try again.");
        return;
      }
      pushToast(
        "success",
        json.webhookConfigured
          ? "Instance is ready and the webhook is registered."
          : "Instance is ready. Webhook is not registered yet — check the server configuration.",
      );
      await refreshStatus();
    } catch {
      pushToast("error", "Setup request failed. Try again.");
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
      if (!silent) setBusy("connect");
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
          if (!silent) {
            pushToast("error", json.error || "Failed to fetch the QR code.");
            setQrDataUrl(null);
          }
          return;
        }
        if (json.alreadyConnected || json.connected) {
          setQrDataUrl(null);
          setPairingCode(null);
          if (!silent) pushToast("info", "WhatsApp is already connected.");
          await refreshStatus();
          return;
        }
        if (!json.qrDataUrl) {
          if (!silent) {
            pushToast(
              "error",
              "The server did not return a QR image yet. Wait a few seconds and try again.",
            );
            setQrDataUrl(null);
          }
          await refreshStatus();
          return;
        }
        setQrDataUrl(json.qrDataUrl);
        setPairingCode(json.pairingCode ?? null);
        setQrAgeSeconds(0);
        await refreshStatus();
      } catch {
        if (!silent) pushToast("error", "Connect request failed. Try again.");
      } finally {
        if (!silent) setBusy(null);
      }
    },
    [handleUnauthorized, refreshStatus, pushToast],
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

  async function disconnect(deleteInstance: boolean) {
    setConfirmAction(null);
    setBusy(deleteInstance ? "delete" : "logout");
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
        pushToast("error", json.error || "Disconnect failed. Try again.");
        return;
      }
      setQrDataUrl(null);
      setPairingCode(null);
      pushToast(
        "success",
        deleteInstance
          ? "WhatsApp logged out and the instance was deleted."
          : "WhatsApp logged out. Scan a new QR code to reconnect.",
      );
      await refreshStatus();
    } catch {
      pushToast("error", "Disconnect request failed. Try again.");
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

  const stage = deriveStage(status);
  const connected = stage === "connected";
  const stateLabel = status?.state ?? "unknown";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-outline-variant pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">
            WhatsApp connection
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Connect the number Dravio uses to send WhatsApp messages. Follow
            the steps below — only the actions relevant right now are shown.
          </p>
        </div>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => void refreshStatus()}
          className="rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed disabled:opacity-50"
        >
          Refresh status
        </button>
      </header>

      {stage !== "not-configured" && stage !== "unreachable" ? (
        <Stepper stage={stage} />
      ) : null}

      <section className="rounded-2xl border border-outline-variant bg-surface-container-low/40 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            Current status
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              connected
                ? "border-emerald-200 bg-emerald-100 text-emerald-800"
                : stage === "unreachable" || stage === "not-configured"
                  ? "border-red-200 bg-red-100 text-red-800"
                  : "border-amber-200 bg-amber-100 text-amber-900"
            }`}
          >
            {stage === "loading"
              ? "Checking…"
              : connected
                ? "Connected"
                : stage === "setup"
                  ? "Not set up"
                  : stage === "not-configured"
                    ? "Not configured"
                    : stage === "unreachable"
                      ? "Server unreachable"
                      : stateLabel}
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
      </section>

      {stage === "not-configured" ? (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-bold text-red-900">
            WhatsApp is not configured on this server
          </p>
          <p className="mt-1 text-sm leading-relaxed text-red-800">
            {status?.error ||
              "The WhatsApp service credentials are missing. Contact the developer to configure the server before using this page."}
          </p>
        </section>
      ) : null}

      {stage === "unreachable" ? (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-bold text-red-900">
            Cannot reach the WhatsApp server
          </p>
          <p className="mt-1 text-sm leading-relaxed text-red-800">
            {status?.error ||
              "The WhatsApp service did not respond. It may be restarting."}
          </p>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => void refreshStatus()}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            Try again
          </button>
        </section>
      ) : null}

      {stage === "setup" ? (
        <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Step 1 of 3
          </p>
          <h2 className="mt-1 text-lg font-bold text-on-surface">
            Set up the WhatsApp instance
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-on-surface-variant">
            This creates the instance on the server and prepares it for
            linking. You only need to do this once — after that you can go
            straight to scanning the QR code.
          </p>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => void runSetup()}
            className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-hover disabled:opacity-50"
          >
            {busy === "setup" ? "Setting up…" : "Set up instance"}
          </button>
        </section>
      ) : null}

      {stage === "link" ? (
        <section className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Step 2 of 3
          </p>
          <h2 className="mt-1 text-lg font-bold text-on-surface">
            Link WhatsApp by scanning the QR code
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-on-surface-variant">
            On your phone, open WhatsApp → Settings → Linked devices → Link a
            device, then scan the code below. The page detects the connection
            automatically.
          </p>

          {qrDataUrl ? (
            <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-outline-variant bg-surface-container-low/40 p-6 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="WhatsApp QR code"
                className="h-64 w-64 rounded-xl border border-outline-variant bg-white p-2"
              />
              <p className="text-xs text-on-surface-variant">
                New code in {Math.max(0, 20 - qrAgeSeconds)}s — always scan the
                code currently on screen.
              </p>
              {pairingCode ? (
                <p className="text-sm text-on-surface-variant">
                  Or enter this pairing code:{" "}
                  <span className="font-mono font-bold text-on-surface">
                    {pairingCode}
                  </span>
                </p>
              ) : null}
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                Waiting for you to scan…
              </p>
            </div>
          ) : (
            <button
              type="button"
              disabled={busy !== null}
              onClick={() => void fetchQr()}
              className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition hover:bg-primary-hover disabled:opacity-50"
            >
              {busy === "connect" ? "Loading QR…" : "Show QR code"}
            </button>
          )}

          <div className="mt-6 border-t border-outline-variant pt-4">
            <p className="text-xs text-on-surface-variant">
              Having trouble linking? You can delete the instance and start
              over from step 1.
            </p>
            <button
              type="button"
              disabled={busy !== null}
              onClick={() => setConfirmAction("delete")}
              className="mt-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-100 disabled:opacity-50"
            >
              {busy === "delete" ? "Removing…" : "Delete instance & start over"}
            </button>
          </div>
        </section>
      ) : null}

      {stage === "connected" ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-base font-bold text-white"
            >
              ✓
            </span>
            <div>
              <h2 className="text-lg font-bold text-on-surface">
                WhatsApp is connected
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-on-surface-variant">
                Dravio can send WhatsApp messages from the linked number.
                Nothing else to do here — use the options below only if you
                need to disconnect.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
              <p className="text-sm font-bold text-on-surface">Log out</p>
              <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                Unlinks this device. The instance stays, so you can reconnect
                by scanning a new QR code (step 2).
              </p>
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => setConfirmAction("logout")}
                className="mt-3 rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed disabled:opacity-50"
              >
                {busy === "logout" ? "Logging out…" : "Log out WhatsApp"}
              </button>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
              <p className="text-sm font-bold text-red-900">
                Log out + delete instance
              </p>
              <p className="mt-1 text-xs leading-relaxed text-red-800">
                Unlinks the device and removes the instance completely. You
                will need to start again from step 1.
              </p>
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => setConfirmAction("delete")}
                className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {busy === "delete" ? "Removing…" : "Log out + delete"}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <AdminConfirmDialog
        open={confirmAction === "logout"}
        title="Log out WhatsApp?"
        description="This unlinks the current device. You can reconnect afterwards by scanning a new QR code."
        confirmLabel="Log out"
        busy={busy === "logout"}
        onConfirm={() => void disconnect(false)}
        onCancel={() => setConfirmAction(null)}
      />
      <AdminConfirmDialog
        open={confirmAction === "delete"}
        title="Log out and delete the instance?"
        description="This unlinks WhatsApp and removes the instance from the server. You will need to run setup again before reconnecting."
        confirmLabel="Delete instance"
        tone="danger"
        busy={busy === "delete"}
        onConfirm={() => void disconnect(true)}
        onCancel={() => setConfirmAction(null)}
      />

      <AdminToastViewport toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AdminToastKind = "success" | "error" | "info";

export type AdminToast = {
  id: number;
  kind: AdminToastKind;
  text: string;
};

const AUTO_DISMISS_MS = 6000;

export function useAdminToasts() {
  const [toasts, setToasts] = useState<AdminToast[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismissToast = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const pushToast = useCallback(
    (kind: AdminToastKind, text: string) => {
      const id = nextId.current++;
      setToasts((list) => [...list, { id, kind, text }]);
      timers.current.set(
        id,
        setTimeout(() => dismissToast(id), AUTO_DISMISS_MS),
      );
    },
    [dismissToast],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((timer) => clearTimeout(timer));
      map.clear();
    };
  }, []);

  return { toasts, pushToast, dismissToast };
}

const KIND_STYLES: Record<AdminToastKind, string> = {
  success: "border-emerald-300 bg-emerald-50 text-emerald-900",
  error: "border-red-300 bg-red-50 text-red-900",
  info: "border-outline-variant bg-surface-container-lowest text-on-surface",
};

const KIND_ICON: Record<AdminToastKind, string> = {
  success: "✓",
  error: "!",
  info: "i",
};

const ICON_STYLES: Record<AdminToastKind, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-primary text-on-primary",
};

export function AdminToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: AdminToast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <div
      className="fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${KIND_STYLES[toast.kind]}`}
        >
          <span
            aria-hidden
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${ICON_STYLES[toast.kind]}`}
          >
            {KIND_ICON[toast.kind]}
          </span>
          <p className="flex-1 leading-snug">{toast.text}</p>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 text-xs font-bold opacity-60 transition hover:opacity-100"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

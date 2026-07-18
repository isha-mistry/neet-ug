"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useBookCounsellingModal } from "@/components/features/leads/BookCounsellingModalProvider";

const SESSION_KEY = "dravio:counselling-scroll-prompt-dismissed-at";
const DISMISS_TTL_MS = 5 * 60 * 1000;
const SCROLL_THRESHOLD = 0.4;

function isScrollPromptRoute(pathname: string): boolean {
  return (
    pathname === "/neet-ug-2026" ||
    pathname.startsWith("/neet-ug-2026/") ||
    pathname === "/mbbs-in-india" ||
    pathname.startsWith("/mbbs-in-india/") ||
    pathname === "/quota" ||
    pathname.startsWith("/quota/")
  );
}

function scrollPromptSource(pathname: string): string {
  if (pathname.startsWith("/neet-ug-2026")) return "scroll_prompt:neet-ug-2026";
  if (pathname.startsWith("/mbbs-in-india")) return "scroll_prompt:mbbs-in-india";
  if (pathname.startsWith("/quota")) return "scroll_prompt:quota";
  return "scroll_prompt";
}

function getDismissedAt(): number | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const dismissedAt = Number(raw);
    if (!Number.isFinite(dismissedAt)) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return dismissedAt;
  } catch {
    return null;
  }
}

function clearDismissed(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore private-mode / storage quota failures.
  }
}

function wasDismissedRecently(): boolean {
  const dismissedAt = getDismissedAt();
  if (dismissedAt == null) return false;
  if (Date.now() - dismissedAt >= DISMISS_TTL_MS) {
    clearDismissed();
    return false;
  }
  return true;
}

function markDismissed(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, String(Date.now()));
  } catch {
    // Ignore private-mode / storage quota failures.
  }
}

function msUntilDismissExpires(): number | null {
  const dismissedAt = getDismissedAt();
  if (dismissedAt == null) return null;
  const remaining = DISMISS_TTL_MS - (Date.now() - dismissedAt);
  return remaining > 0 ? remaining : 0;
}

function getScrollProgress(): number {
  const el = document.documentElement;
  const maxScroll = el.scrollHeight - el.clientHeight;
  if (maxScroll <= 0) return 1;
  return window.scrollY / maxScroll;
}

/**
 * Opens the book-counselling modal once the user has scrolled ~40% of the page
 * on NEET UG, MBBS in India (incl. state pages), and quota routes.
 * Closing the modal suppresses it for 5 minutes (sessionStorage TTL).
 */
export function BookCounsellingScrollPrompt() {
  const pathname = usePathname();
  const { openBookCounsellingModal, isBookCounsellingModalOpen } = useBookCounsellingModal();
  const openedRef = useRef(false);
  const isOpenRef = useRef(isBookCounsellingModalOpen);

  useEffect(() => {
    isOpenRef.current = isBookCounsellingModalOpen;
  }, [isBookCounsellingModalOpen]);

  useEffect(() => {
    if (!isScrollPromptRoute(pathname)) return;

    let cancelled = false;
    let expireTimer: ReturnType<typeof setTimeout> | undefined;
    let removeScrollListeners: (() => void) | undefined;

    const armScrollListeners = () => {
      openedRef.current = false;

      const maybeOpen = () => {
        if (cancelled || openedRef.current || isOpenRef.current || wasDismissedRecently()) {
          return;
        }
        if (getScrollProgress() < SCROLL_THRESHOLD) return;

        openedRef.current = true;
        openBookCounsellingModal(scrollPromptSource(pathname), {
          redirectToWhatsApp: false,
          onClose: () => {
            markDismissed();
            scheduleReArm();
          },
        });
      };

      maybeOpen();
      window.addEventListener("scroll", maybeOpen, { passive: true });
      window.addEventListener("resize", maybeOpen, { passive: true });
      removeScrollListeners = () => {
        window.removeEventListener("scroll", maybeOpen);
        window.removeEventListener("resize", maybeOpen);
      };
    };

    const scheduleReArm = () => {
      removeScrollListeners?.();
      removeScrollListeners = undefined;
      if (expireTimer) clearTimeout(expireTimer);

      const remaining = msUntilDismissExpires();
      if (remaining == null) {
        armScrollListeners();
        return;
      }

      expireTimer = setTimeout(() => {
        if (cancelled) return;
        clearDismissed();
        armScrollListeners();
      }, remaining);
    };

    if (wasDismissedRecently()) {
      scheduleReArm();
    } else {
      armScrollListeners();
    }

    return () => {
      cancelled = true;
      if (expireTimer) clearTimeout(expireTimer);
      removeScrollListeners?.();
    };
  }, [pathname, openBookCounsellingModal]);

  return null;
}

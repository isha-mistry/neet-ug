"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import type { LinkItem } from "@/types/core";
import { isNavLinkActive } from "@/lib/navigation/is-nav-link-active";
import { BookCounsellingTrigger } from "@/components/features/leads/BookCounsellingTrigger";
import { NEET_UG_2026_NAV_LINKS } from "@/lib/navigation/neet-ug-2026-nav";
import {
  navDropdownLinkClassName,
  navItemMobileRowClassName,
  navItemMobileUnderlineClass,
} from "@/components/layout/nav-styles";
import { cn } from "@/lib/utils";

const NAVBAR_HEIGHT_PX = 64;

interface MobileMenuProps {
  links: LinkItem[];
  quotaLinks?: LinkItem[];
  predictorLinks?: LinkItem[];
}

function getDropdownLinks(
  label: string,
  quotaLinks: LinkItem[],
  predictorLinks: LinkItem[],
): LinkItem[] | null {
  if (label === "Quota") return quotaLinks;
  if (label === "Predictors" || label === "Predictor") return predictorLinks;
  if (label === "NEET UG 2026") return NEET_UG_2026_NAV_LINKS;
  return null;
}

function MobileNavGroup({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: LinkItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  const groupActive = items.some((item) => isNavLinkActive(item.href, pathname));

  return (
    <details className="group" open={groupActive}>
      <summary
        className={cn(
          navItemMobileRowClassName(groupActive),
          "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
        )}
      >
        <span className="flex w-full items-center justify-between gap-2">
          <span className={navItemMobileUnderlineClass(groupActive)}>{label}</span>
          <FiChevronDown
            aria-hidden
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
          />
        </span>
      </summary>
      <div className="mb-2 mt-1 overflow-hidden rounded-[14px] border border-outline-variant bg-surface-container-lowest p-2 shadow-sm ring-1 ring-black/[0.04]">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={navDropdownLinkClassName(isNavLinkActive(item.href, pathname))}
            aria-current={isNavLinkActive(item.href, pathname) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export function MobileMenu({
  links,
  quotaLinks = [],
  predictorLinks = [],
}: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pathnameSnapshot, setPathnameSnapshot] = useState(pathname);

  // Close when the route changes (e.g. browser back) without an effect + setState.
  if (pathnameSnapshot !== pathname) {
    setPathnameSnapshot(pathname);
    if (open) {
      setOpen(false);
    }
  }

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      document.body.removeAttribute("data-mobile-nav-open");
      return;
    }

    document.body.setAttribute("data-mobile-nav-open", "");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.removeAttribute("data-mobile-nav-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="flex h-16 items-center lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface transition-colors hover:border-primary/40 hover:bg-primary-fixed/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {open ? <FiX className="h-5 w-5" aria-hidden /> : <FiMenu className="h-5 w-5" aria-hidden />}
      </button>

      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={close}
        className={cn(
          "fixed inset-0 z-[90] bg-on-surface/55 transition-opacity duration-200 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 z-[95] flex flex-col bg-surface shadow-level-2 transition-[opacity,transform] duration-200 ease-out lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
        style={{
          top: NAVBAR_HEIGHT_PX,
          height: `calc(100dvh - ${NAVBAR_HEIGHT_PX}px)`,
        }}
      >
        <nav
          aria-label="Mobile"
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pt-3"
        >
          {links.map((link) => {
            const dropdownLinks = getDropdownLinks(
              link.label,
              quotaLinks,
              predictorLinks,
            );

            if (dropdownLinks) {
              return (
                <MobileNavGroup
                  key={link.label}
                  label={link.label}
                  items={dropdownLinks}
                  pathname={pathname}
                  onNavigate={close}
                />
              );
            }

            const active = isNavLinkActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={navItemMobileRowClassName(active)}
                aria-current={active ? "page" : undefined}
              >
                <span className={navItemMobileUnderlineClass(active)}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-outline-variant bg-surface px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <BookCounsellingTrigger
            source="mobile_menu"
            fullWidth
            className="h-11 text-[15px] font-semibold"
            onAfterClick={close}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCalendar, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import type { LinkItem } from "@/types/core";
import { isNavLinkActive } from "@/lib/navigation/is-nav-link-active";
import { COUNSEL_BOOK_CALL_URL } from "@/lib/mbbs-state/constants";
import { NEET_UG_2026_NAV_LINKS } from "@/lib/navigation/neet-ug-2026-nav";
import {
  navDropdownLinkClassName,
  navItemBorderClass,
  navItemClassName,
} from "@/components/layout/nav-styles";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAVBAR_HEIGHT_PX = 64;

interface MobileMenuProps {
  links: LinkItem[];
  homeLinks?: LinkItem[];
  quotaLinks?: LinkItem[];
  predictorLinks?: LinkItem[];
}

function getDropdownLinks(
  label: string,
  homeLinks: LinkItem[],
  quotaLinks: LinkItem[],
  predictorLinks: LinkItem[],
): LinkItem[] | null {
  if (label === "Home") return homeLinks;
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
    <details className="group border-b border-outline-variant" open={groupActive}>
      <summary
        className={cn(
          navItemClassName(groupActive, navItemBorderClass),
          "w-full cursor-pointer list-none justify-between py-3.5 [&::-webkit-details-marker]:hidden",
        )}
      >
        <span className="inline-flex items-center gap-1">
          <span>{label}</span>
          <FiChevronDown
            aria-hidden
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
          />
        </span>
      </summary>
      <div className="flex flex-col gap-0.5 pb-3 pl-1">
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
  homeLinks = [],
  quotaLinks = [],
  predictorLinks = [],
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
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
          "fixed inset-0 z-40 bg-on-surface/40 transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ top: NAVBAR_HEIGHT_PX }}
      />

      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 z-40 flex flex-col border-t border-outline-variant bg-surface shadow-level-1 transition-[opacity,transform] duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        style={{
          top: NAVBAR_HEIGHT_PX,
          maxHeight: `calc(100dvh - ${NAVBAR_HEIGHT_PX}px)`,
        }}
      >
        <nav
          aria-label="Mobile"
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pt-1"
        >
          {links.map((link) => {
            const dropdownLinks = getDropdownLinks(
              link.label,
              homeLinks,
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
                className={cn(
                  navItemClassName(active, navItemBorderClass),
                  "border-b border-outline-variant py-3.5",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-outline-variant bg-surface px-4 py-4">
          <Button
            as="link"
            href={COUNSEL_BOOK_CALL_URL}
            variant="primary"
            size="sm"
            fullWidth
            leadingIcon={<FiCalendar aria-hidden />}
            onClick={close}
          >
            Book a Counselling
          </Button>
        </div>
      </div>
    </div>
  );
}

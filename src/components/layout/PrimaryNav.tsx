"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import type { LinkItem } from "@/types/core";
import { isNavLinkActive } from "@/lib/navigation/is-nav-link-active";
import { NEET_UG_2026_NAV_LINKS } from "@/lib/navigation/neet-ug-2026-nav";
import {
  navDropdownLinkClassName,
  navItemDesktopClassName,
} from "@/components/layout/nav-styles";
import { cn } from "@/lib/utils";

interface PrimaryNavProps {
  links: LinkItem[];
  quotaLinks: LinkItem[];
  predictorLinks: LinkItem[];
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

function NavDropdown({
  label,
  links,
  pathname,
}: {
  label: string;
  links: LinkItem[];
  pathname: string;
}) {
  const dropdownActive = links.some((item) => isNavLinkActive(item.href, pathname));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      className="relative flex h-16 shrink-0 items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={navItemDesktopClassName(dropdownActive)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>{label}</span>
        <FiChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 ease-out",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "absolute left-0 top-full z-40 w-64 pt-2",
          "transition-[opacity,transform] duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-[14px] border border-outline-variant bg-surface-container-lowest p-2 shadow-lg ring-1 ring-black/[0.04]">
          {links.map((item) => {
            const active = isNavLinkActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={navDropdownLinkClassName(active)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PrimaryNav({
  links,
  quotaLinks,
  predictorLinks,
}: PrimaryNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="hidden min-h-16 min-w-0 flex-1 items-center justify-center gap-3 lg:flex xl:gap-6 2xl:gap-8"
    >
      {links.map((link) => {
        const dropdownLinks = getDropdownLinks(
          link.label,
          quotaLinks,
          predictorLinks,
        );

        if (dropdownLinks) {
          return (
            <NavDropdown
              key={link.label}
              label={link.label}
              links={dropdownLinks}
              pathname={pathname}
            />
          );
        }

        const active = isNavLinkActive(link.href, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={navItemDesktopClassName(active)}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

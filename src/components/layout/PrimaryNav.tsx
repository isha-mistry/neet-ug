"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import type { LinkItem } from "@/types/core";
import { isNavLinkActive } from "@/lib/navigation/is-nav-link-active";
import { NEET_UG_2026_NAV_LINKS } from "@/lib/navigation/neet-ug-2026-nav";
import { cn } from "@/lib/utils";

function navItemClassName(active: boolean) {
  return cn(
    "flex items-center gap-1 whitespace-nowrap border-b-2 pb-1 font-label-md text-label-md leading-none transition-colors duration-200",
    active
      ? "border-primary font-bold text-primary"
      : "border-transparent font-medium text-on-surface-variant hover:border-primary hover:text-primary",
  );
}

interface PrimaryNavProps {
  links: LinkItem[];
  homeLinks: LinkItem[];
  quotaLinks: LinkItem[];
  predictorLinks: LinkItem[];
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

  return (
    <div className="group relative flex h-full items-center">
      <button
        type="button"
        className={navItemClassName(dropdownActive)}
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>{label}</span>
        <FiChevronDown
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </button>
      <div
        className={cn(
          "absolute left-0 top-full z-40 w-64 pt-2",
          "pointer-events-none translate-y-1 opacity-0",
          "transition-[opacity,transform] duration-200 ease-out",
          "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
      >
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-2 shadow-lg ring-1 ring-black/[0.04]">
          {links.map((item) => {
            const active = isNavLinkActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
                  active
                    ? "font-semibold text-primary"
                    : "font-medium text-on-surface-variant hover:text-primary",
                )}
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
  homeLinks,
  quotaLinks,
  predictorLinks,
}: PrimaryNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="hidden h-16 min-w-0 flex-1 items-center justify-center gap-6 md:flex lg:gap-8"
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
            className={navItemClassName(active)}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

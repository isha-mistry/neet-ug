"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import type { LinkItem } from "@/types/core";
import { isNavLinkActive } from "@/lib/navigation/is-nav-link-active";
import { NEET_UG_2026_NAV_LINKS } from "@/lib/navigation/neet-ug-2026-nav";
import { cn } from "@/lib/utils";

function navLinkClassName(active: boolean) {
  return cn(
    "inline-block border-b-2 pb-1 font-label-md text-label-md transition-colors duration-200",
    active
      ? "border-primary font-bold text-primary"
      : "border-transparent font-medium text-on-surface-variant hover:text-primary"
  );
}

const NAV_DROPDOWN_LABELS = ["Quota", "Predictors", "NEET UG 2026"] as const;

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
  predictorLinks: LinkItem[]
): LinkItem[] | null {
  if (label === "Home") return homeLinks;
  if (label === "Quota") return quotaLinks;
  if (label === "Predictors" || label === "Predictor") return predictorLinks;
  if (label === "NEET UG 2026") return NEET_UG_2026_NAV_LINKS;
  return null;
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
      className="hidden flex-1 items-center justify-center gap-6 md:flex lg:gap-8"
    >
      {links.map((link) => {
        const dropdownLinks = getDropdownLinks(
          link.label,
          homeLinks,
          quotaLinks,
          predictorLinks
        );

        if (dropdownLinks) {
          const dropdownActive = dropdownLinks.some((item) =>
            isNavLinkActive(item.href, pathname)
          );
          return (
            <div key={link.label} className="group relative">
              <button
                type="button"
                className={cn(
                  navLinkClassName(dropdownActive),
                  "inline-flex items-center gap-0.5"
                )}
              >
                <span>{link.label}</span>
                <FiChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
              </button>
              <div className="invisible absolute left-0 top-full z-40 mt-2 w-64 rounded-xl border border-outline-variant bg-surface-container-lowest p-2 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {dropdownLinks.map((item) => {
                  const active = isNavLinkActive(item.href, pathname);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary-fixed font-semibold text-primary"
                          : "font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={navLinkClassName(isNavLinkActive(link.href, pathname))}
            aria-current={
              isNavLinkActive(link.href, pathname) ? "page" : undefined
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

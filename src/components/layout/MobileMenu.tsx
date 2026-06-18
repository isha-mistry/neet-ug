
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import type { LinkItem } from "@/types/core";
import { isNavLinkActive } from "@/lib/navigation/is-nav-link-active";
import { NEET_UG_2026_NAV_LINKS } from "@/lib/navigation/neet-ug-2026-nav";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  links: LinkItem[];
  homeLinks?: LinkItem[];
  quotaLinks?: LinkItem[];
  predictorLinks?: LinkItem[];
}

function mobileLinkClass(active: boolean) {
  return cn(
    "rounded-lg px-3 py-2.5 text-sm transition-colors",
    active
      ? "border-l-2 border-primary bg-surface-container-low pl-[10px] font-bold text-primary"
      : "font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
  );
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

export function MobileMenu({
  links,
  homeLinks = [],
  quotaLinks = [],
  predictorLinks = [],
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface transition-colors hover:border-primary/40 hover:bg-primary-fixed/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 md:hidden"
      >
        {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      <div
        className={cn(
          "fixed inset-x-0 top-[64px] z-40 origin-top border-t border-outline-variant bg-surface-container-lowest shadow-level-1 transition-transform md:hidden",
          open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4">
          {links.map((link) => {
            const dropdownLinks = getDropdownLinks(
              link.label,
              homeLinks,
              quotaLinks,
              predictorLinks
            );

            if (dropdownLinks) {
              return (
                <div
                  key={link.label}
                  className="flex flex-col gap-1 rounded-2xl border border-outline-variant/35 bg-surface p-2"
                >
                  <span className="px-2 py-1 text-xs font-semibold uppercase tracking-widest text-outline">
                    {link.label}
                  </span>
                  {dropdownLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={mobileLinkClass(isNavLinkActive(item.href, pathname))}
                      aria-current={
                        isNavLinkActive(item.href, pathname) ? "page" : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={mobileLinkClass(isNavLinkActive(link.href, pathname))}
                aria-current={
                  isNavLinkActive(link.href, pathname) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

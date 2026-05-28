"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import type { LinkItem } from "@/types/core";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  links: LinkItem[];
  quotaLinks?: LinkItem[];
}

export function MobileMenu({ links, quotaLinks = [] }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

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
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-text transition-colors hover:border-brand-300 md:hidden"
      >
        {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      <div
        className={cn(
          "fixed inset-x-0 top-[64px] z-40 origin-top border-t border-border bg-background transition-transform md:hidden",
          open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4">
          {links.map((link) =>
            link.label === "Quota" ? (
              <div key={link.label} className="flex flex-col gap-1 rounded-md bg-surface p-2">
                <span className="px-2 py-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Quota
                </span>
                {quotaLinks.map((quota) => (
                  <Link
                    key={quota.href}
                    href={quota.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-semibold tracking-wide text-text transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {quota.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold tracking-wide text-text transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}

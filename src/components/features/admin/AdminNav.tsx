"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/admin/client-session";

const NAV_LINKS = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/plans", label: "Plans" },
  { href: "/admin/whatsapp", label: "WhatsApp" },
] as const;

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  function logout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/admin"
          className="flex items-baseline gap-1.5 text-on-surface"
        >
          <span className="text-base font-bold tracking-tight">Dravio</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Admin
          </span>
        </Link>

        <nav aria-label="Admin sections" className="flex flex-1 items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-xl bg-primary px-3.5 py-1.5 text-sm font-semibold text-on-primary"
                    : "rounded-xl px-3.5 py-1.5 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-outline-variant px-3.5 py-1.5 text-sm font-semibold text-on-surface transition hover:border-primary hover:bg-primary-fixed"
        >
          Log out
        </button>
      </div>
    </header>
  );
}

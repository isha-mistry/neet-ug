import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages);
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-16px_rgba(37,70,208,0.2)]"
    >
      <PageLink
        href={prevDisabled ? "#" : buildHref(currentPage - 1)}
        disabled={prevDisabled}
        ariaLabel="Previous page"
      >
        <FiChevronLeft aria-hidden="true" />
        <span>Previous</span>
      </PageLink>
      <ul className="flex flex-wrap items-center gap-1.5" role="list">
        {pages.map((entry, index) => (
          <li key={`${entry}-${index}`}>
            {entry === "..." ? (
              <span className="px-2 text-sm text-outline">...</span>
            ) : (
              <PageNumber
                page={entry}
                isActive={entry === currentPage}
                href={buildHref(entry)}
              />
            )}
          </li>
        ))}
      </ul>
      <PageLink
        href={nextDisabled ? "#" : buildHref(currentPage + 1)}
        disabled={nextDisabled}
        ariaLabel="Next page"
      >
        <span>Next</span>
        <FiChevronRight aria-hidden="true" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  ariaLabel,
  children,
}: {
  href: string;
  disabled?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
    disabled
      ? "cursor-not-allowed border-outline-variant bg-surface-container-low text-outline opacity-70"
      : "border-outline-variant bg-surface text-on-surface hover:border-primary/40 hover:bg-primary-fixed/40 hover:text-primary"
  );
  if (disabled) {
    return (
      <span aria-disabled="true" aria-label={ariaLabel} className={classes}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function PageNumber({
  page,
  href,
  isActive,
}: {
  page: number;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        isActive
          ? "border-primary bg-primary text-on-primary shadow-primary-button"
          : "border-outline-variant bg-surface text-on-surface hover:border-primary/40 hover:bg-primary-fixed/40 hover:text-primary"
      )}
    >
      {page}
    </Link>
  );
}

function buildPageList(
  currentPage: number,
  totalPages: number
): Array<number | "..."> {
  const delta = 1;
  const range: Array<number | "..."> = [];
  const start = Math.max(2, currentPage - delta);
  const end = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);
  if (start > 2) range.push("...");
  for (let i = start; i <= end; i += 1) range.push(i);
  if (end < totalPages - 1) range.push("...");
  if (totalPages > 1) range.push(totalPages);

  return range;
}

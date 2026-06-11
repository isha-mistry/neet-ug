import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  brandName: string;
  href?: string;
  tone?: "default" | "inverse";
  className?: string;
}

function MedSeatFlaskIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M9 3.25h6M10 3.25V8.85L6.15 17.9a1.15 1.15 0 001.05 1.72h9.6a1.15 1.15 0 001.05-1.72L14 8.85V3.25"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 13.25c1 .65 2.35.95 3.75.95s2.75-.3 3.75-.95"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandMark({
  brandName,
  href = "/",
  tone = "default",
  className,
}: BrandMarkProps) {
  const isInverse = tone === "inverse";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-tight",
        isInverse ? "text-text-inverse" : "text-primary",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-on-primary shadow-[var(--shadow-primary-button)]",
          isInverse ? "bg-surface text-primary" : "bg-primary",
        )}
      >
        <MedSeatFlaskIcon className="h-[18px] w-[18px]" />
      </span>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          isInverse ? "text-text-inverse" : "text-primary",
        )}
      >
        {brandName}
      </span>
    </Link>
  );
}

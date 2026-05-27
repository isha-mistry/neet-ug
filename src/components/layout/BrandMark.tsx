import Link from "next/link";
import { FiActivity } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  brandName: string;
  href?: string;
  tone?: "default" | "inverse";
  className?: string;
}

export function BrandMark({
  brandName,
  href = "/",
  tone = "default",
  className,
}: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        tone === "inverse" ? "text-text-inverse" : "text-text",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] ms-gradient-strong text-text-on-brand"
      >
        <FiActivity className="h-5 w-5" />
      </span>
      <span className="text-lg font-bold tracking-tight">{brandName}</span>
    </Link>
  );
}

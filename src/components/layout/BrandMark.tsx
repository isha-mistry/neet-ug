import Link from "next/link";
import { cn } from "@/lib/utils";
import { DravioWordmark } from "./DravioWordmark";

interface BrandMarkProps {
  brandName: string;
  href?: string;
  tone?: "default" | "inverse";
  /** Match 64px header bar height (navbar). Footer omits this. */
  inHeaderBar?: boolean;
  className?: string;
}

export function BrandMark({
  brandName,
  href = "/",
  inHeaderBar = false,
  className,
}: BrandMarkProps) {
  return (
    <Link
      href={href}
      aria-label={brandName}
      className={cn(
        "inline-flex shrink-0 items-center leading-none",
        inHeaderBar && "h-16 min-h-16",
        className,
      )}
    >
      <DravioWordmark
        className={cn(
          "h-[26px] w-auto sm:h-[34px]",
          "[&_svg]:block [&_svg]:h-full [&_svg]:w-auto",
        )}
      />
    </Link>
  );
}

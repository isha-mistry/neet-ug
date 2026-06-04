import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface MaterialSymbolProps extends HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols Outlined ligature name (e.g. `search`, `expand_more`). */
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeClass = {
  sm: "text-base",
  md: "text-[18px]",
  lg: "text-2xl",
} as const;

/**
 * Renders a Google Material Symbols Outlined icon (loaded in root layout).
 * @see https://fonts.google.com/icons
 */
export function MaterialSymbol({
  name,
  size = "md",
  className,
  ...rest
}: MaterialSymbolProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined inline-flex leading-none",
        sizeClass[size],
        className
      )}
      aria-hidden={rest["aria-label"] ? undefined : true}
      {...rest}
    >
      {name}
    </span>
  );
}

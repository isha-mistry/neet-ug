import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IconSize = "sm" | "md" | "lg" | "xl";

interface IconWrapperProps {
  size?: IconSize;
  className?: string;
  children: ReactNode;
  label?: string;
}

const sizeClasses: Record<IconSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export function IconWrapper({
  size = "md",
  className,
  children,
  label,
}: IconWrapperProps) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

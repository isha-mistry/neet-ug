import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "md" | "lg" | "xl" | "2xl" | "page";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `page` | `xl` | `2xl` — site content column (1200px max, centered, responsive gutters).
   * `md` / `lg` — narrower columns for prose or side content.
   */
  size?: ContainerSize;
  children: ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  md: "max-w-(--ms-container-md)",
  lg: "max-w-(--ms-container-lg)",
  xl: "ms-layout-page",
  "2xl": "ms-layout-page",
  page: "ms-layout-page",
};

const paddingClasses: Record<ContainerSize, string> = {
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-4 sm:px-6 lg:px-8",
  xl: "",
  "2xl": "",
  page: "",
};

export function Container({
  size = "page",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        paddingClasses[size],
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

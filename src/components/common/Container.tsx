import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "md" | "lg" | "xl" | "2xl" | "page";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  md: "max-w-(--ms-container-md)",
  lg: "max-w-(--ms-container-lg)",
  xl: "max-w-(--ms-container-xl)",
  "2xl": "max-w-(--ms-container-2xl)",
  page: "ms-layout-page",
};

const paddingClasses: Record<ContainerSize, string> = {
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-4 sm:px-6 lg:px-8",
  xl: "px-4 sm:px-6 lg:px-8",
  "2xl": "px-4 sm:px-6 lg:px-8",
  page: "",
};

export function Container({
  size = "xl",
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

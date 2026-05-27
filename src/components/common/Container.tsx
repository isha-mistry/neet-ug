import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "md" | "lg" | "xl" | "2xl";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  md: "max-w-(--ms-container-md)",
  lg: "max-w-(--ms-container-lg)",
  xl: "max-w-(--ms-container-xl)",
  "2xl": "max-w-(--ms-container-2xl)",
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
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

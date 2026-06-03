import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article";
  padded?: boolean;
  bordered?: boolean;
  elevated?: boolean;
  children: ReactNode;
}

export function Card({
  as: Component = "div",
  padded = true,
  bordered = true,
  elevated = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-lg bg-surface-elevated shadow-level-1 transition-shadow",
        padded && "p-5 md:p-6",
        bordered && "border border-border",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function CardHeader({
  title,
  description,
  actions,
  className,
  ...rest
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-b border-border pb-4 md:flex-row md:items-start md:justify-between",
        className
      )}
      {...rest}
    >
      <div className="flex flex-col gap-1">
        {title ? (
          <h3 className="text-lg font-semibold tracking-snug text-text">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="text-sm leading-relaxed text-text-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

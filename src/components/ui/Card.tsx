import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article";
  padded?: boolean;
  bordered?: boolean;
  elevated?: boolean;
  hover?: boolean;
  children: ReactNode;
}

export function Card({
  as: Component = "div",
  padded = true,
  bordered = true,
  elevated = false,
  hover = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-2xl bg-surface-container-lowest transition-all duration-200",
        padded && "p-5 md:p-6",
        bordered && "border border-outline-variant",
        elevated ? "shadow-[0_2px_6px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(37,70,208,0.28)]" : "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]",
        hover && "hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_2px_6px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(37,70,208,0.28)]",
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
        "flex flex-col gap-2 border-b border-outline-variant/40 pb-4 md:flex-row md:items-start md:justify-between",
        className
      )}
      {...rest}
    >
      <div className="flex flex-col gap-1">
        {title ? (
          <h3 className="text-lg font-bold tracking-tight text-on-surface">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="text-sm leading-relaxed text-on-surface-variant">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

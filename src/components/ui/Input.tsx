import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Input({
  label,
  hint,
  leadingIcon,
  trailingIcon,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </span>
      ) : null}
      <span
        className={cn(
          "flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-background px-3.5 py-2 text-sm text-text transition-colors focus-within:border-brand-500",
          className
        )}
      >
        {leadingIcon ? (
          <span className="text-text-muted">{leadingIcon}</span>
        ) : null}
        <input
          id={inputId}
          className="w-full bg-transparent text-sm leading-normal placeholder:text-text-muted focus:outline-none"
          {...rest}
        />
        {trailingIcon ? (
          <span className="text-text-muted">{trailingIcon}</span>
        ) : null}
      </span>
      {hint ? (
        <span className="text-xs text-text-muted">{hint}</span>
      ) : null}
    </label>
  );
}

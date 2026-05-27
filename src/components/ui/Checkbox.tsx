import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className, id, ...rest }: CheckboxProps) {
  const inputId = id ?? rest.name;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-text transition-colors hover:border-brand-300",
        className
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="h-4 w-4 accent-brand-700"
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}

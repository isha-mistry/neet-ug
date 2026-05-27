import type { ChangeEvent, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { OptionItem } from "@/types/core";

interface SelectProps<T extends string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  label?: string;
  options: OptionItem<T>[];
  placeholder?: string;
  onValueChange?: (value: T | "") => void;
  /** Controlled value — omit for native form GET submissions. */
  value?: T | "";
}

export function Select<T extends string = string>({
  label,
  options,
  placeholder,
  className,
  id,
  onValueChange,
  value,
  defaultValue,
  ...rest
}: SelectProps<T>) {
  const selectId = id ?? rest.name;
  const isControlled = value !== undefined;
  const handleChange = onValueChange
    ? (event: ChangeEvent<HTMLSelectElement>) =>
        onValueChange(event.target.value as T | "")
    : undefined;

  return (
    <label className="flex flex-col gap-1.5" htmlFor={selectId}>
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </span>
      ) : null}
      <select
        id={selectId}
        {...(isControlled ? { value } : { defaultValue })}
        onChange={handleChange}
        className={cn(
          "h-11 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 text-sm text-text transition-colors focus:border-brand-500 focus:outline-none",
          className
        )}
        {...rest}
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

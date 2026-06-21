import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, id, ...rest }: CheckboxProps) {
  const inputId = id ?? rest.name;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "lead-consent-field lead-consent-field--embedded rounded-[14px] border border-border bg-background px-3 py-2.5",
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        className="lead-consent-field__input"
        {...rest}
      />
      <span className="lead-consent-field__mark" aria-hidden="true" />
      <span className="lead-consent-field__text">{label}</span>
    </label>
  );
}

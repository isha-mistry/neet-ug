"use client";

import {
  INDIAN_STATES_AND_UTS,
  INDIAN_STATES_FOR_LEADS,
} from "@/lib/leads/indian-states";
import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

type LeadStateSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  placeholder?: string;
  /** When false, omits the trailing “Other” option. Default true. */
  withOther?: boolean;
};

export function LeadStateSelect({
  placeholder,
  withOther = true,
  className,
  ...props
}: LeadStateSelectProps) {
  const options = withOther ? INDIAN_STATES_FOR_LEADS : INDIAN_STATES_AND_UTS;

  return (
    <select className={cn("lead-native-select lead-select-chevron", className)} {...props}>
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {options.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

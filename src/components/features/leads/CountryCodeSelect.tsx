"use client";

import { useState } from "react";
import {
  COUNTRY_DIAL_CODES,
  countryDialOptionKey,
  DEFAULT_COUNTRY_DIAL_CODE,
  findCountryDialEntry,
  formatCountryDialOption,
  type CountryDialEntry,
} from "@/lib/leads/country-codes";
import { cn } from "@/lib/utils";

type CountryCodeSelectProps = {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (dialCode: string) => void;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  "aria-label"?: string;
};

function CountryCodeSelectFace({ entry }: { entry: CountryDialEntry }) {
  return (
    <>
      <span className="country-code-select__iso">{entry.code}</span>
      <strong className="country-code-select__dial">{entry.dial_code}</strong>
    </>
  );
}

export function CountryCodeSelect({
  id,
  name,
  value,
  defaultValue,
  onChange,
  required,
  autoComplete = "off",
  className,
  "aria-label": ariaLabel = "Country code",
}: CountryCodeSelectProps) {
  const isControlled = value !== undefined;
  const initial = defaultValue ?? DEFAULT_COUNTRY_DIAL_CODE;
  const [uncontrolledDial, setUncontrolledDial] = useState(initial);

  const dialCode = isControlled ? value : uncontrolledDial;
  const selected =
    findCountryDialEntry(dialCode) ??
    findCountryDialEntry(DEFAULT_COUNTRY_DIAL_CODE) ??
    COUNTRY_DIAL_CODES[0]!;

  function handleChange(nextDial: string) {
    if (!isControlled) setUncontrolledDial(nextDial);
    onChange?.(nextDial);
  }

  return (
    <div className={cn("country-code-select lead-select-chevron", className)}>
      <span className="country-code-select__face" aria-hidden="true">
        <span className="country-code-select__value">
          <CountryCodeSelectFace entry={selected} />
        </span>
      </span>
      <select
        id={id}
        name={name}
        {...(isControlled ? { value } : { defaultValue: initial })}
        required={required}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
        onChange={(event) => handleChange(event.target.value)}
        className="country-code-select__native"
      >
        {COUNTRY_DIAL_CODES.map((entry: CountryDialEntry) => (
          <option key={countryDialOptionKey(entry)} value={entry.dial_code}>
            {formatCountryDialOption(entry)}
          </option>
        ))}
      </select>
    </div>
  );
}

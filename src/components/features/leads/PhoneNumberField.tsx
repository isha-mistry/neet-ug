"use client";

import { CountryCodeSelect } from "@/components/features/leads/CountryCodeSelect";
import { DEFAULT_COUNTRY_DIAL_CODE } from "@/lib/leads/country-codes";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type PhoneNumberFieldLayout = "grid" | "stacked" | "verify" | "wa-row" | "inline-flex";

type PhoneNumberFieldProps = {
  layout?: PhoneNumberFieldLayout;
  countryCode?: string;
  onCountryCodeChange?: (dialCode: string) => void;
  phone?: string;
  onPhoneChange?: (value: string) => void;
  countryCodeName?: string;
  phoneName?: string;
  countrySelectId?: string;
  phoneInputId?: string;
  defaultCountryCode?: string;
  required?: boolean;
  phonePlaceholder?: string;
  className?: string;
  selectClassName?: string;
  inputClassName?: string;
  verifyLeadingIcon?: ReactNode;
  /** Minimum digit length for required phone fields (HTML `minLength`). */
  phoneMinLength?: number;
};

const defaultPhonePlaceholder = "10-digit number";

/** Country code ~30%, national number ~70%. */
const phoneSplitRowClass =
  "grid grid-cols-[minmax(0,3fr)_minmax(0,7fr)] items-center gap-2 [&>*]:min-w-0";

const phoneSplitResponsiveClass =
  "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] sm:items-center [&>*]:min-w-0";

export function PhoneNumberField({
  layout = "grid",
  countryCode,
  onCountryCodeChange,
  phone,
  onPhoneChange,
  countryCodeName = "countryCode",
  phoneName = "phone",
  countrySelectId,
  phoneInputId,
  defaultCountryCode = DEFAULT_COUNTRY_DIAL_CODE,
  required = true,
  phonePlaceholder = defaultPhonePlaceholder,
  phoneMinLength = 10,
  className,
  selectClassName,
  inputClassName,
  verifyLeadingIcon,
}: PhoneNumberFieldProps) {
  const countryControlled = countryCode !== undefined;
  const phoneControlled = phone !== undefined;

  const select = (
    <CountryCodeSelect
      id={countrySelectId}
      name={countryCodeName}
      {...(countryControlled
        ? { value: countryCode, onChange: onCountryCodeChange }
        : { defaultValue: defaultCountryCode, onChange: onCountryCodeChange })}
      required={required}
      className={selectClassName}
    />
  );

  const phoneInput = (
    <input
      id={phoneInputId}
      name={phoneName}
      type="tel"
      required={required}
      autoComplete="tel-national"
      inputMode="numeric"
      placeholder={phonePlaceholder}
      {...(phoneControlled
        ? { value: phone, onChange: (e) => onPhoneChange?.(e.target.value) }
        : {})}
      aria-label="Mobile number"
      minLength={required ? phoneMinLength : undefined}
      maxLength={15}
      className={inputClassName}
    />
  );

  if (layout === "verify") {
    return (
      <div className={cn("rp-verify-phone", className)}>
        <label className="rp-verify-phone-code">
          {verifyLeadingIcon}
          {select}
        </label>
        <label className="rp-verify-phone-number">{phoneInput}</label>
      </div>
    );
  }

  if (layout === "wa-row") {
    return (
      <div className={cn("wa-row lead-phone-row", phoneSplitRowClass, className)}>
        {select}
        {phoneInput}
      </div>
    );
  }

  if (layout === "stacked") {
    return (
      <div className={cn("grid grid-cols-1 gap-4", className)}>
        {select}
        {phoneInput}
      </div>
    );
  }

  if (layout === "inline-flex") {
    return (
      <div className={cn("lead-phone-row", phoneSplitResponsiveClass, className)}>
        {select}
        {phoneInput}
      </div>
    );
  }

  return (
    <div className={cn("lead-phone-row", phoneSplitRowClass, className)}>
      {select}
      {phoneInput}
    </div>
  );
}

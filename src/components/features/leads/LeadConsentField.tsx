"use client";

import Link from "next/link";
import { useCallback, useState, type ChangeEventHandler, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type LeadConsentFieldSkin = "surface" | "journey" | "embedded" | "dark";

type LeadConsentFieldProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  skin?: LeadConsentFieldSkin;
  className?: string;
  /** Appended after the standard consent sentence (e.g. predictor disclaimers). */
  disclaimer?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "disabled">;

export function LeadConsentField({
  id,
  name = "consent",
  checked,
  onChange,
  required = true,
  skin = "surface",
  className,
  disclaimer,
  disabled,
}: LeadConsentFieldProps) {
  return (
    <label
      htmlFor={id}
      className={cn("lead-consent-field", `lead-consent-field--${skin}`, className)}
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        value="on"
        className="lead-consent-field__input"
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      <span className="lead-consent-field__mark" aria-hidden="true" />
      <span className="lead-consent-field__text">
        I agree to the{" "}
        <Link href="/privacy" className="lead-consent-field__link">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="lead-consent-field__link">
          Terms of Service
        </Link>{" "}
        and consent to Dravio storing my details and contacting me about MBBS counselling.
        {disclaimer ? <> {disclaimer}</> : null}
      </span>
    </label>
  );
}

/** Read consent from a submitted `FormData` (checkbox name `consent`). */
export function consentFromFormData(data: FormData): boolean {
  return data.get("consent") === "on";
}

/** Track consent for disabling submit until the user opts in. */
export function useLeadConsent(initial = false) {
  const [consent, setConsent] = useState(initial);

  const onConsentChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setConsent(event.target.checked);
  }, []);

  const resetConsent = useCallback(() => setConsent(false), []);

  return {
    consent,
    setConsent,
    resetConsent,
    canSubmit: consent,
    fieldProps: {
      checked: consent,
      onChange: onConsentChange,
    },
  };
}

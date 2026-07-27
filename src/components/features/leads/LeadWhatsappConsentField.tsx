"use client";

import {
  useCallback,
  useState,
  type ChangeEventHandler,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import type { LeadConsentFieldSkin } from "@/components/features/leads/LeadConsentField";

type LeadWhatsappConsentFieldProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  skin?: LeadConsentFieldSkin;
  className?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "disabled">;

export function LeadWhatsappConsentField({
  id,
  name = "consentWhatsapp",
  checked,
  onChange,
  required = false,
  skin = "surface",
  className,
  disabled,
}: LeadWhatsappConsentFieldProps) {
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
        I agree to receive WhatsApp updates from Dravio about my counselling request.
      </span>
    </label>
  );
}

export function whatsappConsentFromFormData(data: FormData): boolean {
  return data.get("consentWhatsapp") === "on";
}

export function useLeadWhatsappConsent(initial = false) {
  const [consentWhatsapp, setConsentWhatsapp] = useState(initial);

  const onWhatsappConsentChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setConsentWhatsapp(event.target.checked);
    }, []);

  const resetWhatsappConsent = useCallback(() => setConsentWhatsapp(false), []);

  return {
    consentWhatsapp,
    setConsentWhatsapp,
    resetWhatsappConsent,
    whatsappFieldProps: {
      checked: consentWhatsapp,
      onChange: onWhatsappConsentChange,
    },
  };
}

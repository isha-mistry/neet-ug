"use client";

import {
  useCallback,
  useEffect,
  useState,
  type DependencyList,
  type RefObject,
} from "react";

type UseLeadFormSubmitGateOptions = {
  /** When false, submit stays disabled (e.g. modal closed or thank-you step). */
  active?: boolean;
  /** Extra checks not covered by native `required` (e.g. custom widgets). */
  validateExtras?: () => boolean;
  deps?: DependencyList;
};

/**
 * Enables submit only when consent is granted and the form passes native validation (+ extras).
 */
export function useLeadFormSubmitGate(
  formRef: RefObject<HTMLFormElement | null>,
  consentGranted: boolean,
  options?: UseLeadFormSubmitGateOptions,
): boolean {
  const active = options?.active ?? true;
  const [formValid, setFormValid] = useState(false);

  const evaluate = useCallback(() => {
    const form = formRef.current;
    if (!form || !active) {
      setFormValid(false);
      return;
    }
    const extras = options?.validateExtras?.() ?? true;
    setFormValid(form.checkValidity() && extras);
  }, [formRef, active, options?.validateExtras]);

  useEffect(() => {
    if (!active) {
      setFormValid(false);
      return;
    }

    const form = formRef.current;
    if (!form) {
      setFormValid(false);
      return;
    }

    evaluate();
    form.addEventListener("input", evaluate);
    form.addEventListener("change", evaluate);
    return () => {
      form.removeEventListener("input", evaluate);
      form.removeEventListener("change", evaluate);
    };
  }, [active, evaluate, formRef, ...(options?.deps ?? [])]);

  return active && consentGranted && formValid;
}

"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { usePathname } from "next/navigation";
import { submitLeadAction } from "@/app/actions/submit-lead";
import { reportAppError } from "@/lib/sentry/error-reporter";
import { LeadStateSelect } from "@/components/features/leads/LeadStateSelect";
import { LeadFormThankYouPanel } from "@/components/features/leads/LeadFormThankYouPanel";
import { useLeadRedirectCountdown } from "@/components/features/leads/useLeadRedirectCountdown";
import { LEAD_FORM_TYPES, type LeadFormType } from "@/lib/leads/types";
import { PhoneWithOtpField } from "@/components/features/leads/PhoneWithOtpField";
import { useLeadPhoneOtp } from "@/components/features/leads/useLeadPhoneOtp";
import { LeadConsentField, useLeadConsent } from "@/components/features/leads/LeadConsentField";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { useLeadFormSubmitGate } from "@/components/features/leads/useLeadFormSubmitGate";
import {
  buildFreeCounsellingWhatsAppMessage,
  openCounselWhatsApp,
} from "@/lib/leads/whatsapp";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { TurnstileCaptcha } from "@/components/common/TurnstileCaptcha";
import { DEFAULT_COUNTRY_DIAL_CODE } from "@/lib/leads/country-codes";

export const BOOK_COUNSELLING_FORM_INPUT_CLASS =
  "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function BookCounsellingThanksWhatsApp({
  titleId,
  onComplete,
}: {
  titleId: string;
  onComplete: () => void;
}) {
  const seconds = useLeadRedirectCountdown(onComplete);

  return (
    <LeadFormThankYouPanel
      titleId={titleId}
      skin="surface"
      redirectCountdown={seconds > 0 ? seconds : null}
      redirectPageLabel="WhatsApp"
    />
  );
}

export type BookCounsellingLeadFormProps = {
  /** Attribution for leads (e.g. quota page name, navbar). */
  source: string;
  redirectToWhatsApp?: boolean;
  /** Stored as `form_type`; defaults to free counselling. */
  formType?: LeadFormType;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  /** When false, form stays mounted but submit gate is off (modal closed). */
  active?: boolean;
  titleId?: string;
  fieldIdPrefix?: string;
  onReset?: () => void;
  /** Hide “Submit another request” after inline thank-you. */
  hideResetLink?: boolean;
  onPendingChange?: (pending: boolean) => void;
};

export function BookCounsellingLeadForm({
  source,
  redirectToWhatsApp = false,
  formType = LEAD_FORM_TYPES.freeCounselling,
  title = "Book a counselling session",
  description = "Enter your details and our counsellor team will call you on WhatsApp.",
  className,
  titleClassName,
  active = true,
  titleId: titleIdProp,
  fieldIdPrefix,
  onReset,
  hideResetLink = false,
  onPendingChange,
}: BookCounsellingLeadFormProps) {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [phase, setPhase] = useState<"form" | "thanks" | "thanks-whatsapp">("form");
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_DIAL_CODE);
  const [phone, setPhone] = useState("");
  const whatsAppLinesRef = useRef<string[] | null>(null);
  const generatedTitleId = useId();
  const titleId = titleIdProp ?? generatedTitleId;
  const fieldId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const fid = (name: string) =>
    `${fieldIdPrefix ?? fieldId}-${name}`.replace(/:/g, "");
  const { canSubmit, resetConsent, fieldProps: consentFieldProps } = useLeadConsent();
  const {
    otp,
    setOtp,
    otpSent,
    phoneVerified,
    otpSending,
    otpVerifying,
    sendOtp,
    verifyOtp,
    ensureVerified,
    resetPhoneOtp,
  } = useLeadPhoneOtp({ phone, countryCode, captchaToken, setError });

  const submitReady = useLeadFormSubmitGate(formRef, canSubmit, {
    active: active && phase === "form",
    validateExtras: () =>
      phone.replace(/\D/g, "").length >= 10 && phoneVerified,
    deps: [active, phase, canSubmit, phone, phoneVerified],
  });

  useEffect(() => {
    onPendingChange?.(pending);
  }, [pending, onPendingChange]);

  const completeWhatsAppRedirect = useCallback(() => {
    const lines = whatsAppLinesRef.current;
    if (lines?.length) {
      openCounselWhatsApp(lines);
    }
    setPhase("form");
    resetConsent();
    resetPhoneOtp();
    setPhone("");
    setCountryCode(DEFAULT_COUNTRY_DIAL_CODE);
    onReset?.();
  }, [onReset, resetConsent, resetPhoneOtp]);

  function handleResetForm() {
    setPhase("form");
    resetConsent();
    resetPhoneOtp();
    setPhone("");
    setCountryCode(DEFAULT_COUNTRY_DIAL_CODE);
    setError(null);
    onReset?.();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("fullName") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    const domicile = String(data.get("domicileState") ?? "").trim();

    if (name.length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (digits.length < 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!domicile) {
      setError("Select your domicile state.");
      return;
    }
    if (!phoneVerified) {
      setError("Verify your mobile number with OTP first.");
      return;
    }
    if (!submitReady) {
      setError(LEAD_CONSENT_ERROR);
      return;
    }

    startTransition(async () => {
      try {
        const verified = await ensureVerified();
        if (!verified) return;

        const saved = await submitLeadAction({
          formType,
          pagePath: pathname,
          pageLabel: `Book counselling — ${source}`,
          name,
          countryCode,
          phone: digits,
          domicileState: domicile,
          consent: canSubmit,
          captchaToken,
          rawPayload: {
            trigger: source,
            redirectToWhatsApp: redirectToWhatsApp === true,
          },
        });

        if (!saved.success) {
          setError(saved.error);
          return;
        }

        if (redirectToWhatsApp) {
          whatsAppLinesRef.current = buildFreeCounsellingWhatsAppMessage({
            name,
            countryCode,
            phone: digits,
            domicileState: domicile,
          });
          setPhase("thanks-whatsapp");
          return;
        }

        setPhase("thanks");
      } catch (transitionError) {
        reportAppError(transitionError, {
          module: "lead",
          feature: "book_counselling_form",
          action: "handleSubmit",
          route: pathname,
          metadata: { formType, source },
        });
        setError("Could not submit your request. Please try again.");
      }
    });
  }

  if (phase === "thanks-whatsapp") {
    return (
      <div className={className}>
        <BookCounsellingThanksWhatsApp titleId={titleId} onComplete={completeWhatsAppRedirect} />
      </div>
    );
  }

  if (phase === "thanks") {
    return (
      <div className={className}>
        <LeadFormThankYouPanel titleId={titleId} skin="surface" />
        {hideResetLink ? null : (
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-primary hover:underline"
            onClick={handleResetForm}
          >
            Submit another request
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <h2
        id={titleId}
        className={cn("text-lg font-bold tracking-tight text-on-surface", titleClassName)}
      >
        {title}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">{description}</p>
      <form
        ref={formRef}
        className="lead-modal-form mt-5 flex flex-col gap-3.5"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
            Full name
          </span>
          <input
            id={fid("name")}
            name="fullName"
            type="text"
            required
            minLength={2}

            className={BOOK_COUNSELLING_FORM_INPUT_CLASS}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
            Domicile state
          </span>
          <LeadStateSelect
            id={fid("dom")}
            name="domicileState"
            required
            defaultValue=""
            placeholder="Select state"
            className={BOOK_COUNSELLING_FORM_INPUT_CLASS}
          />
        </label>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
            Mobile number
          </span>
          <PhoneWithOtpField
            skin="compact"
            countrySelectId={fid("country")}
            phoneInputId={fid("phone")}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            phone={phone}
            onPhoneChange={setPhone}
            selectClassName={BOOK_COUNSELLING_FORM_INPUT_CLASS}
            inputClassName={BOOK_COUNSELLING_FORM_INPUT_CLASS}
            otp={otp}
            onOtpChange={setOtp}
            otpSent={otpSent}
            phoneVerified={phoneVerified}
            otpSending={otpSending}
            otpVerifying={otpVerifying}
            onSendOtp={() => void sendOtp()}
            onVerifyOtp={() => void verifyOtp()}
            disabled={pending}
          />
        </div>
        {error ? (
          <p
            className="rounded-xl bg-error-container px-3 py-2 text-xs text-on-error-container"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <TurnstileCaptcha onVerify={setCaptchaToken} />
        <LeadConsentField id={fid("consent")} disabled={pending} {...consentFieldProps} />
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={pending || !submitReady}
          className="lead-form-submit mt-1"
        >
          {pending ? "Saving…" : "Book counselling"}
        </Button>
      </form>
    </div>
  );
}

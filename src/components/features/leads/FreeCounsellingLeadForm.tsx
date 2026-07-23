"use client";

import { usePathname } from "next/navigation";
import { useId, useRef, useState, useTransition, type FormEvent } from "react";
import { FiArrowRight } from "react-icons/fi";
import { submitLeadAction } from "@/app/actions/submit-lead";
import { reportAppError } from "@/lib/sentry/error-reporter";
import { Button } from "@/components/ui/Button";
import { LEAD_FORM_TYPES, type LeadFormType } from "@/lib/leads/types";
import {
  FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE,
  openCounselWhatsApp,
} from "@/lib/leads/whatsapp";
import { PhoneWithOtpField } from "@/components/features/leads/PhoneWithOtpField";
import { useLeadPhoneOtp } from "@/components/features/leads/useLeadPhoneOtp";
import { LeadConsentField, useLeadConsent } from "@/components/features/leads/LeadConsentField";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { useLeadFormSubmitGate } from "@/components/features/leads/useLeadFormSubmitGate";
import { cn } from "@/lib/utils";
import { TurnstileCaptcha } from "@/components/common/TurnstileCaptcha";

interface FreeCounsellingLeadFormProps {
  /** Shown in the WhatsApp message for attribution (e.g. "MBBS in Gujarat"). */
  pageLabel: string;
  /** Card heading; defaults to "Get free counselling". */
  title?: string;
  /** Submit button label; defaults to "Submit". */
  submitLabel?: string;
  /** First line of the prefilled WhatsApp message. */
  whatsappIntro?: string;
  /** `name-phone-only`: name, country code, and mobile on separate rows (no email). */
  fields?: "default" | "name-phone-only";
  /** `embedded`: no card chrome — for rank-predictor-style hero panels. */
  variant?: "card" | "embedded";
  /** When true, parent supplies `rp-form-stack` wrapper (rank predictor FormPanel). */
  embeddedInPanel?: boolean;
  /** Stored as `form_type` on the lead row. */
  formType?: LeadFormType;
  /** Unique `id` for consent checkbox (required when multiple forms appear on one page). */
  consentFieldId?: string;
  /** When false, only persist the lead — no WhatsApp redirect after submit. */
  redirectToWhatsApp?: boolean;
  className?: string;
}

const inputClass =
  "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function FreeCounsellingLeadForm({
  pageLabel,
  title = "Get free counselling",
  submitLabel = "Submit",
  whatsappIntro = FREE_MBBS_COUNSELLING_REVIEW_WHATSAPP_MESSAGE,
  fields = "default",
  variant = "card",
  embeddedInPanel = false,
  formType = LEAD_FORM_TYPES.freeCounselling,
  consentFieldId: consentFieldIdProp,
  redirectToWhatsApp = true,
  className,
}: FreeCounsellingLeadFormProps) {
  const pathname = usePathname();
  const consentFieldIdFallback = useId();
  const consentFieldId =
    consentFieldIdProp ??
    `lead-consent-${formType.replace(/[^a-z0-9-]+/gi, "-")}-${consentFieldIdFallback.replace(/:/g, "")}`;
  const formFieldId = useId().replace(/:/g, "");
  const fid = (part: string) => `lead-${part}-${formFieldId}`;
  const [pending, startTransition] = useTransition();
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const { consent, canSubmit, resetConsent, fieldProps: consentFieldProps } = useLeadConsent();
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
  const showEmail = fields === "default";
  const stackedPhone = fields === "name-phone-only";
  const useRankPredictorFields = variant === "embedded" && stackedPhone;
  const formRef = useRef<HTMLFormElement>(null);
  const submitReady = useLeadFormSubmitGate(formRef, canSubmit, {
    active: !submitted,
    validateExtras: () => {
      const digits = phone.replace(/\D/g, "");
      const mail = email.trim();
      if (fullName.trim().length < 2 || digits.length < 10 || !phoneVerified) return false;
      if (showEmail && mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return false;
      return true;
    },
    deps: [submitted, canSubmit, fullName, phone, email, showEmail, phoneVerified],
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const name = fullName.trim();
    const digits = phone.replace(/\D/g, "");
    const mail = email.trim();

    if (name.length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (digits.length < 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (showEmail && mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!submitReady) {
      setError(phoneVerified ? LEAD_CONSENT_ERROR : "Verify your mobile number with OTP first.");
      return;
    }

    startTransition(async () => {
      try {
        const verified = await ensureVerified();
        if (!verified) return;

        const saved = await submitLeadAction({
          formType,
          pagePath: pathname,
          pageLabel,
          name,
          countryCode,
          phone: digits,
          email: mail || undefined,
          consent: canSubmit,
          captchaToken,
          rawPayload: { whatsappIntro },
        });

        if (!saved.success) {
          setError(saved.error);
          return;
        }

        if (redirectToWhatsApp) {
          openCounselWhatsApp([whatsappIntro]);
        }
        setSubmitted(true);
      } catch (transitionError) {
        reportAppError(transitionError, {
          module: "lead",
          feature: "free_counselling_form",
          action: "handleSubmit",
          route: pathname,
          metadata: { formType },
        });
        setError("Could not submit your request. Please try again.");
      }
    });
  }

  const thankYou = (
    <>
      <p className="text-lg font-bold text-on-surface">Thank you</p>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
        {redirectToWhatsApp
          ? "Continue in WhatsApp to connect with our counsellor team. You can close this tab after sending your message."
          : "We've saved your details. Our team will share NEET UG 2026 exam and counselling updates with you soon."}
      </p>
      <button
        type="button"
        className="mt-4 text-sm font-semibold text-primary hover:underline"
        onClick={() => {
          setSubmitted(false);
          resetConsent();
          resetPhoneOtp();
        }}
      >
        Submit another request
      </button>
    </>
  );

  if (submitted) {
    if (variant === "embedded") {
      return embeddedInPanel ? thankYou : <div className={className}>{thankYou}</div>;
    }
    return (
      <div
        className={cn(
          "rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)] md:p-8",
          className
        )}
      >
        {thankYou}
      </div>
    );
  }

  const form = (
    <form
      ref={formRef}
      className={cn(
        variant === "embedded"
          ? embeddedInPanel
            ? "flex flex-col gap-4"
            : "rp-form-stack flex flex-col gap-4"
          : "mt-6 space-y-4"
      )}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      {useRankPredictorFields ? (
        <>
          <label htmlFor={fid("full-name")} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-outline">
              Full name
            </span>
            <input
              id={fid("full-name")}
              name={fid("fullName")}
              type="text"
              required
              autoComplete="off"
              placeholder="Enter Your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-10 w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 text-[13px] text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-outline">
              Mobile number
            </span>
            <PhoneWithOtpField
              skin="embedded"
              layout="inline"
              countrySelectId={fid("country")}
              phoneInputId={fid("phone")}
              countryCodeName={fid("countryCode")}
              phoneName={fid("phone")}
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              phone={phone}
              onPhoneChange={setPhone}
              phoneMinLength={0}
              autoComplete="off"
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
        </>
      ) : (
        <>
          <div>
            <label htmlFor={fid("full-name")} className="sr-only">
              Full name
            </label>
            <input
              id={fid("full-name")}
              name={fid("fullName")}
              type="text"
              required
              autoComplete="off"
              placeholder="Full Name*"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>

          {showEmail ? (
            <div>
              <label htmlFor={fid("email")} className="sr-only">
                Email
              </label>
              <input
                id={fid("email")}
                name={fid("email")}
                type="email"
                autoComplete="off"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
          ) : null}

          <PhoneWithOtpField
            layout="inline"
            skin={variant === "embedded" ? "embedded" : "default"}
            countrySelectId={fid("country")}
            phoneInputId={fid("phone")}
            countryCodeName={fid("countryCode")}
            phoneName={fid("phone")}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            phone={phone}
            onPhoneChange={setPhone}
            phonePlaceholder={stackedPhone ? "Mobile number*" : "Enter contact number*"}
            phoneMinLength={0}
            autoComplete="off"
            otp={otp}
            onOtpChange={setOtp}
            otpSent={otpSent}
            phoneVerified={phoneVerified}
            otpSending={otpSending}
            otpVerifying={otpVerifying}
            onSendOtp={() => void sendOtp()}
            onVerifyOtp={() => void verifyOtp()}
            disabled={pending}
            buttonClassName="h-12!"
          />
        </>
      )}

      {error ? (
        <p
          className={cn(
            "text-on-error-container",
            variant === "embedded"
              ? "rounded-[10px] bg-error-container px-3.5 py-2.5 text-[12.5px]"
              : "rounded-xl bg-error-container px-4 py-3 text-sm"
          )}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <TurnstileCaptcha onVerify={setCaptchaToken} />

      <LeadConsentField
        id={consentFieldId}
        skin={variant === "embedded" ? "embedded" : "surface"}
        disabled={pending}
        {...consentFieldProps}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={pending || !submitReady}
        className="lead-form-submit"
        trailingIcon={variant === "card" ? <FiArrowRight className="text-lg" aria-hidden /> : undefined}
      >
        {pending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );

  if (variant === "embedded") {
    return embeddedInPanel ? form : <div className={className}>{form}</div>;
  }

  return (
    <div
      className={cn(
        "rounded-2xl gradient-border-panel bg-surface p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)] md:p-8",
        className
      )}
    >
      <h2 className="text-xl font-bold text-on-surface md:text-[1.35rem]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
        Fill below details to get a call from expert career counsellor
      </p>
      {form}
    </div>
  );
}

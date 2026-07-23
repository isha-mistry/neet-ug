"use client";

import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FiCheckCircle } from "react-icons/fi";

export type PhoneWithOtpSkin =
  | "default"
  | "compact"
  | "embedded"
  | "dark"
  | "modal"
  | "playbook";

type PhoneWithOtpFieldProps = {
  countryCode?: string;
  onCountryCodeChange?: (dialCode: string) => void;
  phone?: string;
  onPhoneChange?: (value: string) => void;
  countryCodeName?: string;
  phoneName?: string;
  countrySelectId?: string;
  phoneInputId?: string;
  phonePlaceholder?: string;
  phoneMinLength?: number;
  autoComplete?: string;
  layout?: "inline" | "wa-row";
  selectClassName?: string;
  inputClassName?: string;
  /** Override gap/margin above OTP actions (defaults follow each form skin). */
  actionsClassName?: string;
  /** Extra classes on Send/Verify buttons. */
  buttonClassName?: string;
  otp: string;
  onOtpChange: (value: string) => void;
  otpSent: boolean;
  phoneVerified: boolean;
  otpSending: boolean;
  otpVerifying: boolean;
  onSendOtp: () => void;
  onVerifyOtp?: () => void;
  disabled?: boolean;
  skin?: PhoneWithOtpSkin;
  className?: string;
};

type SkinUi = {
  /** Top spacing under the phone row — matches that form’s field stack. */
  actionsClassName: string;
  /** Gap between OTP input and Verify. */
  otpStackClassName: string;
  buttonClassName: string;
  buttonSize: "sm" | "md" | "lg";
  buttonVariant: "primary" | "inverse";
  /** Journey native `.btn` chrome (Seat Radar / playbook). */
  useJourneyBtn?: "blue" | "plain";
};

const SKIN_UI: Record<PhoneWithOtpSkin, SkinUi> = {
  // Free counselling card, contact, NEET magnets — `space-y-4` / `gap-5`
  default: {
    actionsClassName: "mt-4",
    otpStackClassName: "mt-4 flex flex-col gap-4",
    buttonClassName: "w-full",
    buttonSize: "lg",
    buttonVariant: "primary",
  },
  // Book counselling modal, callback — form `gap-3.5`
  compact: {
    actionsClassName: "mt-3.5",
    otpStackClassName: "mt-3.5 flex flex-col gap-3.5",
    buttonClassName: "w-full",
    buttonSize: "md",
    buttonVariant: "primary",
  },
  // Embedded magnets / predictor gate — `gap-4`
  embedded: {
    actionsClassName: "mt-4",
    otpStackClassName: "mt-4 flex flex-col gap-4",
    buttonClassName: "w-full h-10 rounded-[14px] text-[13px]",
    buttonSize: "md",
    buttonVariant: "primary",
  },
  // NEET dark panels — inverse Button matching submit
  dark: {
    actionsClassName: "mt-5",
    otpStackClassName: "mt-5 flex flex-col gap-5",
    buttonClassName: "w-full rounded-[14px]",
    buttonSize: "md",
    buttonVariant: "inverse",
  },
  // Journey Seat Radar modal — form `gap: 10px`, Continue is `.btn.btn-blue`
  modal: {
    actionsClassName: "mt-2.5",
    otpStackClassName: "mt-2.5 flex flex-col gap-2.5",
    buttonClassName: "btn btn-blue w-full",
    buttonSize: "md",
    buttonVariant: "primary",
    useJourneyBtn: "blue",
  },
  // Playbook banner — `.pb-form` gap 10px, CTA is white `.btn`
  playbook: {
    actionsClassName: "mt-2.5",
    otpStackClassName: "mt-2.5 flex flex-col gap-2.5",
    buttonClassName: "btn w-full",
    buttonSize: "md",
    buttonVariant: "inverse",
    useJourneyBtn: "plain",
  },
};

const defaultFieldClass =
  "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const defaultInputClass =
  "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function fieldClasses(
  skin: PhoneWithOtpSkin,
  selectClassName?: string,
  inputClassName?: string,
): { select: string; input: string; otp: string } {
  if (selectClassName || inputClassName) {
    return {
      select: selectClassName ?? defaultFieldClass,
      input: inputClassName ?? defaultInputClass,
      otp: inputClassName ?? defaultInputClass,
    };
  }

  switch (skin) {
    case "embedded":
      return {
        select:
          "h-10 w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 text-[13px] text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        input:
          "h-10 w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 text-[13px] text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        otp:
          "h-10 w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 text-[13px] text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
      };
    case "compact":
      return {
        select:
          "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        input:
          "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        otp:
          "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
      };
    case "modal":
    case "playbook":
      // Native journey / playbook field chrome comes from page CSS when classes are omitted.
      return { select: "", input: "", otp: "" };
    case "dark":
      return {
        select:
          "w-full rounded-[14px] border border-on-primary/20 bg-on-primary/10 px-3 py-3.5 text-sm text-on-primary focus:border-on-primary focus:outline-none focus:ring-4 focus:ring-on-primary/10",
        input:
          "w-full rounded-[14px] border border-on-primary/20 bg-on-primary/10 px-4 py-3.5 text-sm text-on-primary placeholder-on-primary/45 focus:border-on-primary focus:outline-none focus:ring-4 focus:ring-on-primary/10",
        otp:
          "w-full rounded-[14px] border border-on-primary/20 bg-on-primary/10 px-4 py-3.5 text-sm text-on-primary placeholder-on-primary/45 focus:border-on-primary focus:outline-none focus:ring-4 focus:ring-on-primary/10",
      };
    default:
      return {
        select: defaultFieldClass,
        input: defaultInputClass,
        otp: defaultInputClass,
      };
  }
}

function OtpActionButton({
  skin,
  disabled,
  onClick,
  children,
  buttonClassName,
}: {
  skin: PhoneWithOtpSkin;
  disabled: boolean;
  onClick: () => void;
  children: string;
  buttonClassName?: string;
}) {
  const ui = SKIN_UI[skin];
  const classes = cn(ui.buttonClassName, buttonClassName);

  if (ui.useJourneyBtn) {
    return (
      <button
        type="button"
        className={classes}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant={ui.buttonVariant}
      size={ui.buttonSize}
      fullWidth
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function PhoneWithOtpField({
  countryCode,
  onCountryCodeChange,
  phone,
  onPhoneChange,
  countryCodeName = "countryCode",
  phoneName = "phone",
  countrySelectId,
  phoneInputId,
  phonePlaceholder = "10-digit number",
  phoneMinLength = 10,
  autoComplete = "tel-national",
  layout = "inline",
  selectClassName,
  inputClassName,
  actionsClassName,
  buttonClassName,
  otp,
  onOtpChange,
  otpSent,
  phoneVerified,
  otpSending,
  otpVerifying,
  onSendOtp,
  onVerifyOtp,
  disabled = false,
  skin = "default",
  className,
}: PhoneWithOtpFieldProps) {
  const phoneLayout = layout === "wa-row" ? "wa-row" : "inline-flex";
  const ui = SKIN_UI[skin];
  const fields = fieldClasses(skin, selectClassName, inputClassName);
  const useNativeJourneyFields =
    (skin === "modal" || skin === "playbook") && !selectClassName && !inputClassName;

  const otpInputClass =
    fields.otp ||
    (skin === "playbook"
      ? "w-full rounded-[12px] border border-white/30 bg-white/12 px-4 py-2.5 text-sm text-white placeholder:text-white/55 focus:border-white focus:outline-none"
      : undefined);

  return (
    <div
      className={cn(
        "lead-phone-otp-stack flex flex-col",
        skin === "dark" && "lead-phone-otp-stack--dark",
        skin === "playbook" && "lead-phone-otp-stack--playbook",
        className,
      )}
    >
      <PhoneNumberField
        layout={phoneLayout}
        countrySelectId={countrySelectId}
        phoneInputId={phoneInputId}
        countryCodeName={countryCodeName}
        phoneName={phoneName}
        countryCode={countryCode}
        onCountryCodeChange={onCountryCodeChange}
        phone={phone}
        onPhoneChange={onPhoneChange}
        phonePlaceholder={phonePlaceholder}
        phoneMinLength={phoneMinLength}
        autoComplete={autoComplete}
        selectClassName={useNativeJourneyFields ? undefined : fields.select}
        inputClassName={useNativeJourneyFields ? undefined : fields.input}
      />

      {phoneVerified ? (
        <p
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold",
            actionsClassName ?? ui.actionsClassName,
            skin === "dark" || skin === "playbook" ? "text-emerald-300" : "text-primary",
          )}
          aria-live="polite"
        >
          <FiCheckCircle className="size-3.5 shrink-0" aria-hidden />
          Mobile number verified
        </p>
      ) : otpSent ? (
        <div className={cn(actionsClassName ? cn(actionsClassName, "flex flex-col gap-3") : ui.otpStackClassName)}>
          <input
            type="text"
            name="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={(e) =>
              onOtpChange(e.target.value.replace(/\D/g, "").slice(0, 8))
            }
            placeholder="Enter 6-digit OTP"
            disabled={disabled || otpVerifying}
            aria-label="Enter OTP"
            className={otpInputClass}
          />
          {onVerifyOtp ? (
            <OtpActionButton
              skin={skin}
              disabled={disabled || !otp.trim() || otpVerifying}
              onClick={onVerifyOtp}
              buttonClassName={buttonClassName}
            >
              {otpVerifying ? "Verifying…" : "Verify OTP"}
            </OtpActionButton>
          ) : null}
        </div>
      ) : (
        <div className={actionsClassName ?? ui.actionsClassName}>
          <OtpActionButton
            skin={skin}
            disabled={disabled || otpSending}
            onClick={onSendOtp}
            buttonClassName={buttonClassName}
          >
            {otpSending ? "Sending OTP…" : "Send OTP"}
          </OtpActionButton>
        </div>
      )}
    </div>
  );
}

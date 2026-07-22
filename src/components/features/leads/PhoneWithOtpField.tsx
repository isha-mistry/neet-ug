"use client";

import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FiCheckCircle } from "react-icons/fi";

export type PhoneWithOtpSkin = "default" | "compact" | "embedded" | "dark" | "modal";

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
    case "modal":
      return {
        select:
          "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        input:
          "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        otp:
          "w-full rounded-[14px] border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
      };
    case "dark":
      return {
        select:
          "w-full rounded-[14px] border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:border-white/45 focus:outline-none",
        input:
          "w-full rounded-[14px] border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-white/45 focus:outline-none",
        otp:
          "w-full rounded-[14px] border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-white/45 focus:outline-none",
      };
    default:
      return {
        select: defaultFieldClass,
        input: defaultInputClass,
        otp: defaultInputClass,
      };
  }
}

function SendOtpButton({
  skin,
  disabled,
  otpSending,
  otpSent,
  onClick,
}: {
  skin: PhoneWithOtpSkin;
  disabled: boolean;
  otpSending: boolean;
  otpSent: boolean;
  onClick: () => void;
}) {
  const label = otpSending ? "Sending OTP…" : otpSent ? "Resend OTP" : "Send OTP";

  if (skin === "modal" || skin === "dark") {
    return (
      <Button
        type="button"
        size="md"
        className={cn("btn btn-blue w-full", skin === "dark" && "mt-0")}
        disabled={disabled || otpSending}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={otpSent ? "secondary" : "primary"}
      size="md"
      fullWidth
      disabled={disabled || otpSending}
      className={skin === "embedded" ? "h-10 rounded-xl text-[13px]" : "rounded-[14px]"}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

function VerifyOtpButton({
  skin,
  disabled,
  otpVerifying,
  onClick,
}: {
  skin: PhoneWithOtpSkin;
  disabled: boolean;
  otpVerifying: boolean;
  onClick: () => void;
}) {
  if (skin === "modal" || skin === "dark") {
    return (
      <button
        type="button"
        className="btn btn-blue w-full"
        disabled={disabled || otpVerifying}
        onClick={onClick}
      >
        {otpVerifying ? "Verifying…" : "Verify OTP"}
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant="primary"
      size="md"
      fullWidth
      disabled={disabled || otpVerifying}
      className={skin === "embedded" ? "h-10 rounded-xl text-[13px]" : "rounded-[14px]"}
      onClick={onClick}
    >
      {otpVerifying ? "Verifying…" : "Verify OTP"}
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
  const fields = fieldClasses(skin, selectClassName, inputClassName);
  const useJourneyNativePhone = skin === "modal" && !selectClassName && !inputClassName;

  return (
    <div className={cn("lead-phone-otp-stack flex flex-col gap-2", className)}>
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
        selectClassName={useJourneyNativePhone ? undefined : fields.select}
        inputClassName={useJourneyNativePhone ? undefined : fields.input}
      />

      {phoneVerified ? (
        <p
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold",
            skin === "dark" ? "text-emerald-300" : "text-primary",
          )}
          aria-live="polite"
        >
          <FiCheckCircle className="size-3.5 shrink-0" aria-hidden />
          Mobile number verified
        </p>
      ) : otpSent ? (
        <>
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
            className={fields.otp}
          />
          {onVerifyOtp ? (
            <VerifyOtpButton
              skin={skin}
              disabled={disabled || !otp.trim()}
              otpVerifying={otpVerifying}
              onClick={onVerifyOtp}
            />
          ) : null}
        </>
      ) : (
        <SendOtpButton
          skin={skin}
          disabled={disabled}
          otpSending={otpSending}
          otpSent={otpSent}
          onClick={onSendOtp}
        />
      )}
    </div>
  );
}

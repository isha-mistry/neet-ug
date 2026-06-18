"use client";

import { useState, type FormEvent } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { cn } from "@/lib/utils";
import type { OptionItem } from "@/types/core";

const COUNTRY_CODES = [
  { label: "India (+91)", value: "+91" },
  { label: "Nepal (+977)", value: "+977" },
  { label: "UAE (+971)", value: "+971" },
  { label: "USA/Canada (+1)", value: "+1" },
] as const;

const COUNTRY_CODE_OPTIONS_COMPACT: OptionItem<string>[] = COUNTRY_CODES.map((c) => ({
  value: c.value,
  label: c.value,
}));

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
  className?: string;
}

const inputClass =
  "w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function FreeCounsellingLeadForm({
  pageLabel,
  title = "Get free counselling",
  submitLabel = "Submit",
  whatsappIntro = "Hi MedSeat, I'd like free MBBS counselling.",
  fields = "default",
  variant = "card",
  embeddedInPanel = false,
  className,
}: FreeCounsellingLeadFormProps) {
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const showEmail = fields === "default";
  const stackedPhone = fields === "name-phone-only";
  const useRankPredictorFields = variant === "embedded" && stackedPhone;

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

    const lines = [
      whatsappIntro,
      `Page: ${pageLabel}`,
      `Name: ${name}`,
      `Phone: ${countryCode} ${digits}`,
    ];
    if (showEmail && mail) lines.push(`Email: ${mail}`);

    const base = COUNSEL_WHATSAPP_URL.split("?")[0];
    const url = `${base}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  const thankYou = (
    <>
      <p className="text-lg font-bold text-on-surface">Thank you</p>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
        Continue in WhatsApp to connect with our counsellor team. You can close this tab after
        sending your message.
      </p>
      <button
        type="button"
        className="mt-4 text-sm font-semibold text-primary hover:underline"
        onClick={() => setSubmitted(false)}
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
      className={cn(
        variant === "embedded"
          ? embeddedInPanel
            ? "flex flex-col gap-4"
            : "rp-form-stack flex flex-col gap-4"
          : "mt-6 space-y-4"
      )}
      onSubmit={handleSubmit}
      noValidate
    >
      {useRankPredictorFields ? (
        <>
          <Input
            label="Full name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="As on NEET application"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            hint="We'll share exam and counselling updates on WhatsApp."
          />
          <div className="rp-phone-code-grid grid grid-cols-1 gap-4 sm:grid-cols-[minmax(7.5rem,0.32fr)_minmax(0,1fr)]">
            <Select
              label="Country code"
              name="countryCode"
              options={COUNTRY_CODE_OPTIONS_COMPACT}
              value={countryCode}
              onValueChange={(v) => setCountryCode(v || "+91")}
              required
            />
            <Input
              label="Mobile number"
              name="phone"
              type="tel"
              required
              autoComplete="tel-national"
              inputMode="numeric"
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11"
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="lead-full-name" className="sr-only">
              Full name
            </label>
            <input
              id="lead-full-name"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="Full Name*"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>

          {stackedPhone ? (
            <>
              <div>
                <label htmlFor="lead-country" className="sr-only">
                  Country code
                </label>
                <select
                  id="lead-country"
                  name="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={inputClass}
                  aria-label="Country code"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lead-phone" className="sr-only">
                  Mobile number
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel-national"
                  inputMode="numeric"
                  placeholder="Mobile number*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <label htmlFor="lead-country" className="sr-only">
                Country code
              </label>
              <select
                id="lead-country"
                name="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-[7.25rem] shrink-0 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Country code"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <label htmlFor="lead-phone" className="sr-only">
                Mobile number
              </label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel-national"
                inputMode="numeric"
                placeholder="Enter contact number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}

          {showEmail ? (
            <div>
              <label htmlFor="lead-email" className="sr-only">
                Email
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
          ) : null}
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        trailingIcon={variant === "card" ? <FiArrowRight className="text-lg" aria-hidden /> : undefined}
        className={variant === "embedded" ? "h-12 rounded-xl text-[15px] font-bold" : "rounded-full"}
      >
        {submitLabel}
      </Button>
    </form>
  );

  if (variant === "embedded") {
    return embeddedInPanel ? form : <div className={className}>{form}</div>;
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)] md:p-8",
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

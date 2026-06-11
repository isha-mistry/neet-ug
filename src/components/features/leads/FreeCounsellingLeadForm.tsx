"use client";

import { useState, type FormEvent } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = [{ label: "IN (91)", value: "+91" }] as const;

interface FreeCounsellingLeadFormProps {
  /** Shown in the WhatsApp message for attribution (e.g. "MBBS in Gujarat"). */
  pageLabel: string;
  className?: string;
}

export function FreeCounsellingLeadForm({
  pageLabel,
  className,
}: FreeCounsellingLeadFormProps) {
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setError("Enter a valid email address.");
      return;
    }

    const lines = [
      "Hi MedSeat, I'd like free MBBS counselling.",
      `Page: ${pageLabel}`,
      `Name: ${name}`,
      `Phone: ${countryCode} ${digits}`,
    ];
    if (mail) lines.push(`Email: ${mail}`);

    const base = COUNSEL_WHATSAPP_URL.split("?")[0];
    const url = `${base}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)] md:p-8",
          className
        )}
      >
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
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)] md:p-8",
        className
      )}
    >
      <h2 className="text-xl font-bold text-on-surface md:text-[1.35rem]">Get free counselling</h2>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
        Fill below details to get a call from expert career counsellor
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
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
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

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
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {error ? (
          <p className="rounded-xl bg-error-container px-4 py-3 text-sm text-on-error-container" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          trailingIcon={<FiArrowRight className="text-lg" aria-hidden />}
          className="rounded-full"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

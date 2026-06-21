"use client";

import React, { useRef, useState, useTransition, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { submitLeadAction } from "@/app/actions/submit-lead";
import { Container } from "@/components/common/Container";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { guideCardClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";
import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { LeadConsentField, useLeadConsent } from "@/components/features/leads/LeadConsentField";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { useLeadFormSubmitGate } from "@/components/features/leads/useLeadFormSubmitGate";
import { Button } from "@/components/ui/Button";
import { DEFAULT_COUNTRY_DIAL_CODE } from "@/lib/leads/country-codes";

const TIME_SLOTS = [
    "Morning (10:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 04:00 PM)",
    "Evening (04:00 PM - 07:00 PM)"
];

export function CallbackRequestForm() {
    const pathname = usePathname();
    const [pending, startTransition] = useTransition();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_DIAL_CODE);
    const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[0]);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const { canSubmit, resetConsent, fieldProps: consentFieldProps } = useLeadConsent();
    const formRef = useRef<HTMLFormElement>(null);
    const submitReady = useLeadFormSubmitGate(formRef, canSubmit, {
        active: !submitted,
        validateExtras: () =>
            name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10,
        deps: [submitted, canSubmit, name, phone],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedName = name.trim();
        const digits = phone.replace(/\D/g, "");

        if (trimmedName.length < 2) {
            setError("Please enter your name.");
            return;
        }
        if (digits.length < 10) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (!submitReady) {
            setError(LEAD_CONSENT_ERROR);
            return;
        }

        startTransition(async () => {
            const saved = await submitLeadAction({
                formType: LEAD_FORM_TYPES.callbackRequest,
                pagePath: pathname,
                pageLabel: "Contact callback",
                name: trimmedName,
                countryCode,
                phone: digits,
                preferredSlot,
                consent: canSubmit,
            });

            if (!saved.success) {
                setError(saved.error);
                return;
            }

            setSubmitted(true);
        });
    };

    return (
        <section id="callback-section" className="py-12 bg-surface">
            <Container size="page">
                <div className="rounded-[1.75rem] gradient-border-panel bg-linear-to-br from-primary/55 via-primary-fixed to-surface-container-low shadow-[0_20px_56px_-30px_color-mix(in_srgb,var(--color-primary)_52%,transparent)]">
                    <div className={cn(guideCardClass, "rounded-[calc(1.75rem-1px)] border-0 bg-surface-container-lowest p-6 md:p-10")}>
                        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                            {/* Context Text - Left Column */}
                            <div className="space-y-4 lg:col-span-5">
                                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                    <span className="material-symbols-outlined block text-sm leading-none">check</span>
                                    Quick Callback
                                </span>
                                <h2 className="text-3xl font-black text-on-surface tracking-tight">
                                    Prefer a phone call?
                                </h2>
                                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                                    Schedule a short counselling call when you want a direct conversation about college
                                    choice, quota eligibility or next steps after NEET result.
                                </p>
                            </div>

                            {/* Form - Right Column */}
                            <div className="lg:col-span-7">
                                {submitted ? (
                                    <div className="text-center py-8 bg-emerald-500/[0.02] border border-emerald-100 rounded-2xl p-6">
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 border border-emerald-100">
                                            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                        </span>
                                        <h3 className="text-base font-black text-on-surface mb-1">Callback Requested!</h3>
                                        <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                                            Thank you, {name}. We will call you on <b>{countryCode} {phone}</b> during the <b>{preferredSlot}</b> window.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setName("");
                                                setPhone("");
                                                setSubmitted(false);
                                                resetConsent();
                                            }}
                                            className="inline-flex items-center justify-center gap-1 rounded-[14px] border border-outline-variant bg-surface px-5 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-low transition-all cursor-pointer"
                                        >
                                            Schedule Another
                                        </button>
                                    </div>
                                ) : (
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <div>
                                                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    minLength={2}
                                                    placeholder="Enter your full name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-4 py-4 text-xs text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                                    Mobile Number *
                                                </label>
                                                <PhoneNumberField
                                                    countryCode={countryCode}
                                                    onCountryCodeChange={setCountryCode}
                                                    phone={phone}
                                                    onPhoneChange={setPhone}
                                                    selectClassName="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-2 py-4 text-[11px] text-on-surface transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                    inputClassName="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-3 py-4 text-xs text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                                    Preferred Time Slot *
                                                </label>
                                                <select
                                                    value={preferredSlot}
                                                    onChange={(e) => setPreferredSlot(e.target.value)}
                                                    className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-3 py-3.5 text-xs text-on-surface transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
                                                >
                                                    {TIME_SLOTS.map((slot) => (
                                                        <option key={slot} value={slot}>
                                                            {slot}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {error && (
                                            <p className="text-xs text-error bg-error-container border border-error/20 px-3.5 py-2.5 rounded-xl" role="alert">
                                                {error}
                                            </p>
                                        )}

                                        <LeadConsentField
                                            id="callback-consent"
                                            disabled={pending}
                                            {...consentFieldProps}
                                        />

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="lead-form-submit w-full"
                                            disabled={pending || !submitReady}
                                            trailingIcon={<span className="material-symbols-outlined text-sm">phone_callback</span>}
                                        >
                                            <span>{pending ? "Saving…" : "Request Callback"}</span>

                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}


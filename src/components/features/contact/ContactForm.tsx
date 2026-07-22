"use client";

import React, { useRef, useState, useTransition, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { submitLeadAction } from "@/app/actions/submit-lead";
import { Container } from "@/components/common/Container";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { PhoneWithOtpField } from "@/components/features/leads/PhoneWithOtpField";
import { useLeadPhoneOtp } from "@/components/features/leads/useLeadPhoneOtp";
import { LeadConsentField, useLeadConsent } from "@/components/features/leads/LeadConsentField";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { useLeadFormSubmitGate } from "@/components/features/leads/useLeadFormSubmitGate";
import { LeadStateSelect } from "@/components/features/leads/LeadStateSelect";
import { Button } from "@/components/ui/Button";
import { DEFAULT_COUNTRY_DIAL_CODE } from "@/lib/leads/country-codes";
import { TurnstileCaptcha } from "@/components/common/TurnstileCaptcha";

const QUERY_TYPES = [
    "Counselling Guidance",
    "Career Guidance",
    "College Selection",
    "Documentation Support",
    "Admission Query",
    "Technical Support",
    "Other"
];

export function ContactForm() {
    const pathname = usePathname();
    const [pending, startTransition] = useTransition();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_DIAL_CODE);
    const [score, setScore] = useState("");
    const [preferredState, setPreferredState] = useState("Maharashtra");
    const [queryType, setQueryType] = useState("Counselling Guidance");
    const [message, setMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | undefined>();
    const { canSubmit, fieldProps: consentFieldProps } = useLeadConsent();
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
    const formRef = useRef<HTMLFormElement>(null);
    const submitReady = useLeadFormSubmitGate(formRef, canSubmit, {
        active: !submitted,
        validateExtras: () => {
            const digits = phone.replace(/\D/g, "");
            const mail = email.trim();
            if (fullName.trim().length < 2 || digits.length < 10 || !phoneVerified) return false;
            if (message.trim().length < 5) return false;
            if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return false;
            return true;
        },
        deps: [submitted, canSubmit, fullName, phone, email, message, phoneVerified],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        const name = fullName.trim();
        const digits = phone.replace(/\D/g, "");
        const mail = email.trim();

        if (name.length < 2) {
            setError("Please enter your full name.");
            return;
        }
        if (digits.length < 10) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }
        if (message.trim().length < 5) {
            setError("Please enter a query message.");
            return;
        }
        if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            setError("Please enter a valid email address.");
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
            const verified = await ensureVerified();
            if (!verified) return;

            const saved = await submitLeadAction({
                formType: LEAD_FORM_TYPES.contactInquiry,
                pagePath: pathname,
                pageLabel: "Contact Us — detailed inquiry",
                name,
                countryCode,
                phone: digits,
                email: mail || undefined,
                neetScore: score ? Number(score) : null,
                domicileState: preferredState,
                queryType,
                message: message.trim(),
                consent: canSubmit,
                captchaToken,
                rawPayload: { source: "contact-us-detailed-inquiry" },
            });

            if (!saved.success) {
                setError(saved.error);
                return;
            }

            setSubmitted(true);
        });
    };

    if (submitted) {
        return (
            <section id="contact-form-section" className="relative z-10 py-12">
                <Container size="page" className="max-w-2xl">
                    <div className="rounded-3xl border border-primary/15 bg-primary-fixed/35 p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(37,70,208,0.18)]">
                        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary">
                            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </span>
                        <h3 className="text-xl font-black text-on-surface mb-2">Message Sent Successfully!</h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-6 max-w-md mx-auto">
                            Thank you, <b>{fullName}</b>. Your inquiry regarding <b>{queryType}</b> has been received. Our counselling desk will contact you on {countryCode} {phone} shortly.
                        </p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => {
                                    setFullName("");
                                    setEmail("");
                                    setPhone("");
                                    setScore("");
                                    setMessage("");
                                    setSubmitted(false);
                                    resetPhoneOtp();
                                }}
                                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[14px] border border-outline-variant bg-surface-container-lowest px-5 py-3 text-xs font-bold text-on-surface transition-all hover:bg-surface-container-low active:scale-[0.98]"
                            >
                                Send Another Message
                            </button>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section id="contact-form-section" className="relative z-10 py-12">
            <Container size="page">
                <div className="rounded-3xl gradient-border-panel bg-linear-to-br from-primary/60 via-primary-fixed to-surface-container-low shadow-[0_22px_60px_-30px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]">
                    <div className="grid gap-8 rounded-[calc(1.5rem-1px)] bg-surface-container-lowest p-5 md:p-7 lg:grid-cols-[320px_minmax(0,1fr)]">
                        <div className="rounded-2xl bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-5">
                            <span className="mb-1 block text-label-md font-label-md uppercase tracking-wider text-primary">
                                Detailed inquiry
                            </span>
                            <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
                                Send your profile for counselling review
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                                Use this form when your question depends on rank, score, preferred state, quota,
                                budget or documents. We save your profile here so our counselling desk can review
                                and respond with the right context.
                            </p>
                            <div className="mt-6 space-y-3">
                                {[
                                    "College selection and cutoff fit",
                                    "Quota, domicile and category checks",
                                    "Document and reporting doubts",
                                ].map((item) => (
                                    <div key={item} className="flex gap-2 text-sm font-semibold text-on-surface-variant">
                                        <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">check_circle</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="As on your NEET scorecard"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="e.g. name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                        Expected NEET Score (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={720}
                                        placeholder="e.g. 590"
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                        className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                        Query Type
                                    </label>
                                    <select
                                        value={queryType}
                                        onChange={(e) => setQueryType(e.target.value)}
                                        className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-3 py-3.5 text-sm text-on-surface transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        {QUERY_TYPES.map((q) => (
                                            <option key={q} value={q}>
                                                {q}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                        Preferred State
                                    </label>
                                    <LeadStateSelect
                                        value={preferredState}
                                        onChange={(e) => setPreferredState(e.target.value)}
                                        className="w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-3 py-3.5 text-sm text-on-surface transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                    Your Query Message *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Briefly describe what help you need..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full w-full rounded-[14px] border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                    Mobile Number *
                                </label>
                                <PhoneWithOtpField
                                    phonePlaceholder="10-digit mobile number"
                                    countryCode={countryCode}
                                    onCountryCodeChange={setCountryCode}
                                    phone={phone}
                                    onPhoneChange={setPhone}
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

                            {error && (
                                <p className="text-xs text-error bg-error-container border border-error/20 px-3.5 py-2.5 rounded-xl" role="alert">
                                    {error}
                                </p>
                            )}

                            <TurnstileCaptcha onVerify={setCaptchaToken} />

                            <LeadConsentField
                                id="contact-inquiry-consent"
                                disabled={pending}
                                {...consentFieldProps}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                className="lead-form-submit w-full"
                                disabled={pending || !submitReady}
                                trailingIcon={<span className="material-symbols-outlined text-sm">send</span>}
                            >
                                <span>{pending ? "Sending…" : "Send Message"}</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}

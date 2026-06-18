"use client";

import React, { useState, type FormEvent } from "react";
import { Container } from "@/components/common/Container";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

const QUERY_TYPES = [
    "Counselling Guidance",
    "Career Guidance",
    "College Selection",
    "Documentation Support",
    "Admission Query",
    "Technical Support",
    "Other"
];

const PREFERRED_STATES = [
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
    "Madhya Pradesh",
    "Other"
];

export function ContactForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [score, setScore] = useState("");
    const [preferredState, setPreferredState] = useState("Maharashtra");
    const [queryType, setQueryType] = useState("Counselling Guidance");
    const [message, setMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

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
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (message.trim().length < 5) {
            setError("Please write a query message (minimum 5 characters).");
            return;
        }

        // Prefilled WhatsApp message content for backup channel
        const whatsappText = [
            "Hi MedSeat, I have submitted an inquiry form.",
            `Name: ${name}`,
            `Email: ${mail || "N/A"}`,
            `WhatsApp: +91 ${digits}`,
            `Expected NEET Score: ${score || "N/A"}/720`,
            `Preferred State: ${preferredState}`,
            `Query Type: ${queryType}`,
            `Message: ${message}`
        ].join("\n");

        const base = COUNSEL_WHATSAPP_URL.split("?")[0];
        const url = `${base}?text=${encodeURIComponent(whatsappText)}`;

        // Store in WhatsApp redirect / trigger window
        window.open(url, "_blank", "noopener,noreferrer");
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section id="contact-form-section" className="relative z-10 py-12">
                <Container size="page" className="max-w-2xl">
                    <div className="rounded-3xl border border-primary/15 bg-primary-fixed/35 p-8 text-center shadow-clinical-soft">
                        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary">
                            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </span>
                        <h3 className="text-xl font-black text-on-surface mb-2">Message Sent Successfully!</h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-6 max-w-md mx-auto">
                            Thank you, <b>{fullName}</b>. Your inquiry regarding <b>{queryType}</b> has been received. Our counselling desk will contact you on +91 {phone} shortly.
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
                                }}
                                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-outline-variant bg-surface-container-lowest px-5 py-3 text-xs font-bold text-on-surface transition-all hover:bg-surface-container-low active:scale-[0.98]"
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
                <div className="rounded-3xl bg-linear-to-br from-primary/60 via-primary-fixed to-surface-container-low p-[1px] shadow-[0_22px_60px_-30px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]">
                    <div className="grid gap-8 rounded-[calc(1.5rem-1px)] bg-surface-container-lowest p-5 md:p-7 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <div className="rounded-2xl bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-5">
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                            Detailed inquiry
                        </span>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
                            Send your profile for counselling review
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                            Use this form when your question depends on rank, score, preferred state, quota,
                            budget or documents. We will open WhatsApp with a structured message so the team has
                            the right context.
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

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="10-digit mobile number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

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
                                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 py-3.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                                <select
                                    value={preferredState}
                                    onChange={(e) => setPreferredState(e.target.value)}
                                    className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 py-3.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    {PREFERRED_STATES.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
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
                                className="w-full resize-none rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {error && (
                            <p className="text-xs text-error bg-error-container border border-error/20 px-3.5 py-2.5 rounded-xl" role="alert">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-on-primary transition-all hover:bg-primary-hover active:scale-[0.98]"
                        >
                            <span>Send Message</span>
                            <span className="material-symbols-outlined text-sm">send</span>
                        </button>
                    </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}

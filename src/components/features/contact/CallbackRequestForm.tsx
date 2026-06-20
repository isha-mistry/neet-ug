"use client";

import React, { useState, type FormEvent } from "react";
import { Container } from "@/components/common/Container";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { guideCardClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const TIME_SLOTS = [
    "Morning (10:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 04:00 PM)",
    "Evening (04:00 PM - 07:00 PM)"
];

export function CallbackRequestForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[0]);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

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

        // Prefilled WhatsApp message content for scheduling the callback
        const whatsappText = [
            "Hi MedSeat, I would like to request a callback.",
            `Name: ${trimmedName}`,
            `Phone: +91 ${digits}`,
            `Preferred Slot: ${preferredSlot}`
        ].join("\n");

        const base = COUNSEL_WHATSAPP_URL.split("?")[0];
        const url = `${base}?text=${encodeURIComponent(whatsappText)}`;

        window.open(url, "_blank", "noopener,noreferrer");
        setSubmitted(true);
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
                                            Thank you, {name}. We will call you on <b>+91 {phone}</b> during the <b>{preferredSlot}</b> window.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setName("");
                                                setPhone("");
                                                setSubmitted(false);
                                            }}
                                            className="inline-flex items-center justify-center gap-1 rounded-xl border border-outline-variant bg-surface px-5 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-low transition-all cursor-pointer"
                                        >
                                            Schedule Another
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <div>
                                                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Enter your full name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-4 text-xs text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                                    Mobile Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="10-digit number"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-4 text-xs text-on-surface placeholder:text-outline transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                                    Preferred Time Slot *
                                                </label>
                                                <select
                                                    value={preferredSlot}
                                                    onChange={(e) => setPreferredSlot(e.target.value)}
                                                    className="w-full rounded-2xl border border-outline-variant bg-surface-container-low px-3 py-3.5 text-xs text-on-surface transition-colors focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
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

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            trailingIcon={<span className="material-symbols-outlined text-sm">phone_callback</span>}
                                        >
                                            <span>Request Callback</span>

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


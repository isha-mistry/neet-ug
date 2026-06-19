"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { summaryHighlightCardClass } from "@/lib/neet-ug-2026/section-styles";

const HERO_STATS = [
    { value: "12-24h", label: "Response window" },
    { value: "AIQ + State", label: "Counselling scope" },
    { value: "Free", label: "Initial callback" },
];

const SUPPORT_ROUTES = [
    {
        icon: "school",
        title: "College selection",
        body: "Shortlist colleges by rank, state, quota and budget.",
    },
    {
        icon: "fact_check",
        title: "Document readiness",
        body: "Check domicile, category, NRI and reporting documents.",
    },
    {
        icon: "account_balance",
        title: "Counselling route",
        body: "Understand MCC, state, deemed and private counselling paths.",
    },
];

const NEXT_STEPS = ["Share profile", "Review options", "Plan counselling"];

export function ContactHero() {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="rp-hero rp-bleed">
            <div className="rp-hero-inner">
                <div className="rp-hero-grid">
                    <div className="max-w-4xl">
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                            <span className="material-symbols-outlined block text-sm leading-none">support_agent</span>
                            Student support center
                        </span>

                        <h1 className="rp-hero-title">
                            Get clear answers for <em>NEET counselling</em>
                        </h1>

                        <p className="rp-hero-lede">
                            Ask about counselling rounds, quota eligibility, college shortlisting, document
                            readiness, fees, cutoffs and career options. Share your profile once and we will help
                            you choose the right support route.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => scrollToSection("contact-form-section")}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-primary-hover active:scale-[0.98]"
                            >
                                Submit an inquiry
                                <span className="material-symbols-outlined text-sm font-bold">mail</span>
                            </button>
                            <button
                                onClick={() => scrollToSection("callback-section")}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-6 py-3.5 text-sm font-bold text-on-surface-variant transition-all hover:border-primary hover:text-primary active:scale-[0.98]"
                            >
                                Request callback
                                <span className="material-symbols-outlined text-sm font-bold">call</span>
                            </button>
                        </div>

                        <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                            {HERO_STATS.map((stat) => (
                                <div key={stat.label} className={summaryHighlightCardClass}>
                                    <div className="text-lg font-black tracking-tight text-on-surface">{stat.value}</div>
                                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-4xl bg-linear-to-br from-primary/70 via-primary-fixed to-surface-container-low p-[1px] shadow-[0_24px_70px_-32px_color-mix(in_srgb,var(--color-primary)_60%,transparent)]">
                        <div className="rounded-[calc(2rem-1px)] bg-surface-container-lowest p-5">
                            <div className="rounded-3xl bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                                        Support dashboard
                                    </p>
                                    <h2 className="mt-2 text-xl font-black tracking-tight text-on-surface">
                                        Tell us what you need help with
                                    </h2>
                                </div>
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary">
                                    <span className="material-symbols-outlined text-[28px]">forum</span>
                                </span>
                            </div>

                            <div className="mt-5 space-y-3">
                                {SUPPORT_ROUTES.map((route) => (
                                    <div key={route.title} className="flex gap-3 rounded-2xl bg-surface-container-lowest/85 p-4">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                                            <span className="material-symbols-outlined text-[22px]">{route.icon}</span>
                                        </span>
                                        <div>
                                            <h3 className="text-sm font-black text-on-surface">{route.title}</h3>
                                            <p className="mt-0.5 text-xs font-medium leading-relaxed text-on-surface-variant">
                                                {route.body}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-2xl bg-primary px-4 py-4 text-on-primary">
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-on-primary/70">
                                    What happens next
                                </p>
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {NEXT_STEPS.map((step, index) => (
                                        <div key={step} className="rounded-xl bg-on-primary/10 p-3 text-center">
                                            <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-on-primary text-xs font-black text-primary">
                                                {index + 1}
                                            </div>
                                            <p className="text-[11px] font-bold leading-tight">{step}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </section>
    );
}

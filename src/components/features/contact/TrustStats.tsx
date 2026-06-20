"use client";

import React from "react";
import { Container } from "@/components/common/Container";

const STATS = [
    {
        value: "GJ, MP, MH, RJ",
        label: "Core Focused States",
        desc: "Exhaustive details for Gujarat, Madhya Pradesh, Maharashtra, and Rajasthan quota rules.",
        icon: "map",
        color: "text-primary bg-primary-fixed border border-primary/10"
    },
    {
        value: "700+",
        label: "Medical Colleges",
        desc: "Detailed fee structure, cutoff, and seat matrix databases.",
        icon: "account_balance",
        color: "text-secondary bg-secondary-fixed"
    },
    {
        value: "100% Free",
        label: "No-Cost Predictors",
        desc: "Open access college estimators, comparisons, and cutoff analytics at zero cost.",
        icon: "lock_open",
        color: "text-tertiary bg-tertiary-fixed"
    },
    {
        value: "Verified",
        label: "Official Sources",
        desc: "Admissions and seat data sourced directly from MCC and state CET/DME portals.",
        icon: "verified",
        color: "text-emerald-700 bg-emerald-50 border border-emerald-100"
    }
];

export function TrustStats() {
    return (
        <section className="relative z-10 py-12 bg-surface">
            <Container size="page">
                <div className="rounded-3xl gradient-border-panel bg-linear-to-br from-primary/55 via-primary-fixed to-surface-container-low shadow-[0_20px_56px_-30px_color-mix(in_srgb,var(--color-primary)_50%,transparent)]">
                <div className="overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface-container-lowest">
                    <div className="grid gap-0 lg:grid-cols-[300px_minmax(0,1fr)]">
                        {/* Left intro panel */}
                        <div className="bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-6 md:p-8 flex flex-col justify-center">
                            <span className="mb-1 block text-label-md font-label-md uppercase tracking-wider text-primary">
                                Why use MedSeat
                            </span>
                            <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
                                Data-led counselling, not guesswork
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant font-medium">
                                We combine official counselling datasets, state eligibility guidelines, and comparison tools to help families make decisions with more confidence.
                            </p>
                        </div>

                        {/* Right stats grid */}
                        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
                            {STATS.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="group flex flex-col justify-between border-b border-outline-variant p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0 hover:bg-surface-container-low/20 transition-colors duration-200"
                                >
                                    <div>
                                        <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                                            <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
                                        </div>
                                        {/* Size and letter spacing adjustment for the GJ, MP, MH, RJ stat value to fit cleanly */}
                                        <div className={`mb-1 font-black tracking-tight text-on-surface ${stat.value.includes(",") ? 'text-lg md:text-xl py-1' : 'text-3xl'}`}>
                                            {stat.value}
                                        </div>
                                        <h3 className="mb-2 text-sm font-black text-on-surface">{stat.label}</h3>
                                        <p className="text-xs font-medium leading-relaxed text-on-surface-variant">
                                            {stat.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </Container>
        </section>
    );
}

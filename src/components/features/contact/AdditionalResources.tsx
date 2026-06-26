"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { guideCardClass, hubCardHoverClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

const RESOURCES = [
    {
        title: "ReNEET Rank Predictor 2026",
        desc: "Calculate your expected All India Rank (AIR) and see your eligibility for state and deemed quotas.",
        icon: "query_stats",
        href: "/reneet-rank-predictor-2026",
        cta: "Predict Rank Now"
    },
    {
        title: "Medical College Directory",
        desc: "Browse fees, seat matrices, infrastructure details, and cutoff ranks for government and private colleges.",
        icon: "database",
        href: "/colleges",
        cta: "Search Colleges"
    },
    {
        title: "Quota & Reservation Guide",
        desc: "Understand All India Quota (AIQ), State Quota, Deemed, and NRI seats reservation rules.",
        icon: "menu_book",
        href: "/quota",
        cta: "Read Quota Guides"
    },
    {
        title: "Career Guidance Pathway",
        desc: "Confused about clinical, traditional, or allied healthcare paths? Explore non-MBBS medical careers.",
        icon: "psychology",
        href: "/career-guidance",
        cta: "Explore Careers"
    }
];

export function AdditionalResources() {
    return (
        <section className="relative z-10 py-12">
            <Container size="page">
                <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div>
                        <span className="mb-1 block text-label-md font-label-md uppercase tracking-wider text-primary">
                            Self-service tools
                        </span>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
                            Explore before speaking to a counsellor
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant">
                        Use these tools to prepare your rank, college and quota questions before submitting a
                        profile inquiry.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {RESOURCES.map((res, idx) => (
                        <Link
                            key={idx}
                            href={res.href}
                            className={cn(
                                guideCardClass,
                                hubCardHoverClass,
                                "group flex min-h-[220px] flex-col justify-between"
                            )}
                        >
                            <div>
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary transition group-hover:bg-primary group-hover:text-on-primary">
                                    <span className="material-symbols-outlined text-[22px]">{res.icon}</span>
                                </div>
                                <h3 className="mb-2 text-sm font-black text-on-surface">{res.title}</h3>
                                <p className="text-xs font-medium leading-relaxed text-on-surface-variant">
                                    {res.desc}
                                </p>
                            </div>

                            <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-black text-primary transition-colors group-hover:text-primary-hover">
                                <span>{res.cta}</span>
                                <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}


"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { guideCardClass, hubCardHoverClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

const CONTACT_CHANNELS = [
    {
        title: "Call support",
        value: "+91 96993 60370",
        label: "For urgent queries",
        icon: "call",
        iconColor: "text-primary bg-primary-fixed border border-primary/10",
        hoverColor: "hover:border-primary/40",
        action: "tel:+919699360370"
    },
    {
        title: "WhatsApp chat",
        value: "Start a guided chat",
        label: "Best for quick doubts",
        icon: "chat",
        iconColor: "text-emerald-700 bg-emerald-50 border border-emerald-100",
        hoverColor: "hover:border-emerald-400/50",
        action: COUNSEL_WHATSAPP_URL
    },
    {
        title: "Response window",
        value: "12-24 business hours",
        label: "For form submissions",
        icon: "schedule",
        iconColor: "text-indigo-600 bg-indigo-50 border border-indigo-100/30",
        hoverColor: "hover:border-indigo-400/30",
        action: null
    },
    {
        title: "What to share",
        value: "Rank, score, category, domicile and budget",
        label: "Helps us guide faster",
        icon: "fact_check",
        iconColor: "text-amber-700 bg-amber-50 border border-amber-100/30",
        hoverColor: "hover:border-amber-400/30",
        action: null
    }
];

export function ContactInfoGrid() {
    return (
        <section className="relative z-10 py-12 bg-surface">
            <Container size="page">
                {/* Header split layout */}
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <span className="mb-1 block text-label-md font-label-md uppercase tracking-wider text-primary">
                            Contact options
                        </span>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
                            Choose the fastest way to reach us
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant font-medium">
                        Use WhatsApp or phone for urgent doubts. Use the detailed form when you want profile
                        review based on rank, state preference, quota and budget.
                    </p>
                </div>

                {/* Separate Card Layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {CONTACT_CHANNELS.map((item, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                guideCardClass,
                                hubCardHoverClass,
                                "group flex min-h-[190px] flex-col justify-between",
                                item.hoverColor
                            )}
                        >
                            <div>
                                {/* Icon Container */}
                                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}>
                                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                </div>

                                <h3 className="mb-2 text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                                    {item.title}
                                </h3>

                                {item.action ? (
                                    <a
                                        href={item.action}
                                        target={item.action.startsWith("http") ? "_blank" : undefined}
                                        rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="block break-words text-sm font-black leading-relaxed text-on-surface transition-colors hover:text-primary"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="break-words text-sm font-black leading-relaxed text-on-surface">
                                        {item.value}
                                    </p>
                                )}
                            </div>

                            {/* Card Footer Tag */}
                            <div className="mt-6 border-t border-outline-variant pt-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-outline group-hover:text-primary transition-colors">
                                    {item.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

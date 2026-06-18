"use client";

import React from "react";
import { ContactHero } from "./ContactHero";
import { HelpServices } from "./HelpServices";
import { ContactInfoGrid } from "./ContactInfoGrid";
import { ContactForm } from "./ContactForm";
import { CallbackRequestForm } from "./CallbackRequestForm";
import { TrustStats } from "./TrustStats";
import { ContactFaqs } from "./ContactFaqs";
import { AdditionalResources } from "./AdditionalResources";
import { Container } from "@/components/common/Container";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

export function ContactView() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-on-surface before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[560px] before:bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-primary)_14%,transparent),transparent_42%),linear-gradient(180deg,color-mix(in_srgb,var(--color-primary-fixed)_42%,transparent),transparent)]">
            <ContactHero />
            <HelpServices />
            <ContactInfoGrid />
            <ContactForm />
            <CallbackRequestForm />
            <TrustStats />
            <ContactFaqs />
            <AdditionalResources />

            <section className="relative z-10 py-16 text-center">
                <Container size="page" className="max-w-3xl">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                        <span className="material-symbols-outlined text-[26px]">chat</span>
                    </div>
                    <h2 className="text-3xl font-black text-on-surface tracking-tight md:text-4xl">
                        Still need help choosing the right next step?
                    </h2>
                    <p className="mt-4 text-sm text-on-surface-variant leading-relaxed max-w-2xl mx-auto font-medium">
                        Send your rank, preferred state, category, budget and concern. The counselling team
                        can help you decide whether to start with a callback, WhatsApp chat or detailed inquiry.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <a
                            href={COUNSEL_WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-primary-hover active:scale-[0.98]"
                        >
                            <span>Chat with counsellor</span>
                            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                        </a>
                    </div>
                </Container>
            </section>
        </div>
    );
}

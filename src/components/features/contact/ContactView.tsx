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
import { useBookCounsellingModal } from "@/components/features/leads/BookCounsellingModalProvider";
import { NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { Button } from "@/components/ui/Button";

export function ContactView() {
    const { openBookCounsellingModal } = useBookCounsellingModal();

    return (
        <NeetUg2026Shell>
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
                        Share your rank, preferred state, category, budget and concern. Our counselling team
                        will review your details and help you choose the right next step — callback, detailed
                        inquiry, or a counselling call.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Button
                            type="button"
                            variant="primary"
                            trailingIcon={<span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>}
                            onClick={() =>
                                openBookCounsellingModal("contact:next-step", {
                                    redirectToWhatsApp: false,
                                })
                            }
                        >
                            <span>Talk to a counsellor</span>
                        </Button>
                    </div>
                </Container>
            </section>
        </NeetUg2026Shell>
    );
}

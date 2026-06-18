"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";

const FAQS = [
    {
        q: "What are the best alternative career options if I do not get MBBS?",
        a: "Top alternatives include Dentistry (BDS), Veterinary Science (BVSc & AH), Ayurveda (BAMS), Physiotherapy (BPT), and Allied Health Sciences (B.Sc Radiology, OTT, or BMLT) depending on whether you prefer clinical patient care or diagnostic technology."
    },
    {
        q: "Is NEET mandatory for Allied Health Sciences or B.Sc Nursing?",
        a: "No, NEET is not globally mandatory for all allied health courses. While some premier central universities use NEET UG scores, many state government and private institutions offer admissions based on Class 12 board marks (minimum 50% in PCB)."
    },
    {
        q: "What is the career scope after BAMS?",
        a: "BAMS graduates can practice as Ayurvedic doctors, join government AYUSH hospitals as Medical Officers, establish private clinics, or enter wellness consulting. They can also specialize through MD/MS in Ayurveda or transition to Healthcare Management (MBA)."
    },
    {
        q: "What are Allied Health Sciences, and are they in demand?",
        a: "Allied Health Sciences include technical healthcare fields such as Medical Lab Tech (BMLT), Radiology/Imaging Tech, and Operation Theatre Tech. These professionals operate critical diagnostic systems and assist in surgeries, and are in critical demand due to hospital expansion."
    }
];

export function CareerFaqs() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <section className="py-16 bg-surface-container-lowest border-t border-outline-variant/40">
            <Container size="page">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                        Find answers to common student inquiries regarding post-NEET options and career decisions.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {FAQS.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-outline-variant/60 bg-surface shadow-xs overflow-hidden transition-all"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full text-left px-5 py-4 flex items-center justify-between text-xs font-black text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                            >
                                <span>{faq.q}</span>
                                <span className="material-symbols-outlined transition-transform duration-200">
                                    {openFaq === idx ? "expand_less" : "expand_more"}
                                </span>
                            </button>
                            {openFaq === idx && (
                                <div className="px-5 pb-4.5 pt-1 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/30 bg-surface-container-lowest/30">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

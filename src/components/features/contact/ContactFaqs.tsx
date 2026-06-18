"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";

const FAQS = [
  {
    q: "How do I get counselling support from MedSeat?",
    a: "You can submit an inquiry through our Contact Form or schedule a callback. Our counsellor team will reach out on your mobile number to understand your NEET score, preferred budget, and state choices, then help you get started."
  },
  {
    q: "Do you support state quota counselling or only All India Quota (AIQ)?",
    a: "We support both! MedSeat provides comprehensive data, cutoff analysis, and choice-filling updates for MCC All India Quota (AIQ) counselling as well as individual state DME/CET counselling processes for all major states."
  },
  {
    q: "Can parents join the counselling consultation?",
    a: "Absolutely. We encourage parents to join the counselling sessions, as decisions regarding medical college budgets, state bond policies, and college selection are best made together."
  },
  {
    q: "Is there any charge for the initial counselling consultation?",
    a: "No, our initial counselling callback and query resolution is completely free of charge. We aim to help students understand the eligibility and counselling cycles without any upfront cost."
  },
  {
    q: "What is the typical response time after submitting an inquiry?",
    a: "We typically review all inquiries and respond within 12 to 24 business hours. If you need urgent assistance, you can also reach us via our WhatsApp support channel."
  }
];

export function ContactFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 py-12">
      <Container size="page">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
              Common questions
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
              Before you contact us
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
              Quick answers to common questions from NEET UG aspirants and parents about MedSeat
              counselling support.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-outline-variant/70 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-black text-on-surface transition-colors hover:bg-surface-container-low"
                  >
                    <span>{faq.q}</span>
                    <span className={`material-symbols-outlined text-lg text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[220px] border-t border-outline-variant/30" : "max-h-0"
                      }`}
                  >
                    <p className="p-5 text-sm font-medium leading-relaxed text-on-surface-variant">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

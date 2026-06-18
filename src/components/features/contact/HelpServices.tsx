"use client";

import React from "react";
import { Container } from "@/components/common/Container";

const SERVICES = [
  {
    title: "NEET Counselling Support",
    desc: "Step-by-step guidance regarding MCC AIQ and state counselling procedures, choice filling, and admission rounds.",
    icon: "account_balance"
  },
  {
    title: "College Selection Assistance",
    desc: "Identify suitable government, private, and deemed medical colleges based on rank, category, budget, and preferences.",
    icon: "school"
  },
  {
    title: "Career Guidance",
    desc: "Explore clinical (MBBS, BDS), traditional AYUSH, veterinary, nursing, and emerging healthcare career pathways after NEET.",
    icon: "psychology"
  },
  {
    title: "Documentation Support",
    desc: "Guidance regarding eligibility certificates, category documentation, NRI sponsorship papers, and physical verification rules.",
    icon: "folder_open"
  },
  {
    title: "Admission Queries",
    desc: "Get verified answers related to tuition fees, bond policies, seat matrices, reservation percentages, and domicile rules.",
    icon: "help"
  }
];

export function HelpServices() {
  return (
    <section className="relative z-10 py-12">
      <Container size="page">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
              Support areas
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
              What our counselling team can help with
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
              Keep the first conversation focused: share your score, category, domicile, preferred
              states and budget so the counsellor can guide you quickly.
            </p>
            <div className="mt-6 rounded-2xl bg-primary-fixed/55 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                Best prepared with
              </p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-on-primary-fixed">
                NEET scorecard, category certificate, domicile status, budget range and college
                preferences.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
            {SERVICES.map((s, idx) => (
              <div
                key={idx}
                className="group grid gap-4 border-b border-outline-variant/70 p-5 transition-colors hover:bg-surface-container-low/45 last:border-b-0 md:grid-cols-[44px_minmax(0,1fr)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed text-primary transition group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import React from "react";
import { Container } from "@/components/common/Container";

export function EmergingHealthcare() {
  return (
    <section className="py-16 bg-surface-container-lowest border-y border-outline-variant/40">
      <Container size="page">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
            Emerging Healthcare Frontiers
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
            Healthcare is evolving rapidly with technology and research. These specialized pathways are expected to lead job demand and offer high salaries over the next decade.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-surface border border-outline-variant p-6 rounded-3xl hover:border-primary/40 transition-colors shadow-clinical-soft">
            <span className="material-symbols-outlined text-[32px] text-primary mb-4">analytics</span>
            <h3 className="text-base font-black text-on-surface mb-2">Medical Data Analytics &amp; AI</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Analyzing electronic health records (EHR), medical imaging datasets, and genetic databases to optimize diagnostics and train healthcare machine learning engines.
            </p>
          </div>
          <div className="bg-surface border border-outline-variant p-6 rounded-3xl hover:border-primary/40 transition-colors shadow-clinical-soft">
            <span className="material-symbols-outlined text-[32px] text-primary mb-4">settings_remote</span>
            <h3 className="text-base font-black text-on-surface mb-2">Digital Health &amp; Telemedicine</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Developing smart wearables, health monitoring networks, remote consultation portals, and electronic prescription workflows to bridge rural medical divides.
            </p>
          </div>
          <div className="bg-surface border border-outline-variant p-6 rounded-3xl hover:border-primary/40 transition-colors shadow-clinical-soft">
            <span className="material-symbols-outlined text-[32px] text-primary mb-4">science</span>
            <h3 className="text-base font-black text-on-surface mb-2">Genomics &amp; Precision Medicine</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Customizing therapies based on individual patient genetic matrices. Involves molecular diagnostics, cancer oncology screening, and gene therapy research.
            </p>
          </div>
          <div className="bg-surface border border-outline-variant p-6 rounded-3xl hover:border-primary/40 transition-colors shadow-clinical-soft">
            <span className="material-symbols-outlined text-[32px] text-primary mb-4">public</span>
            <h3 className="text-base font-black text-on-surface mb-2">Public Health &amp; Epidemiology</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Drafting disease containment policies, tracking outbreak vectors, managing health initiatives, and serving in WHO, UNICEF, or national departments.
            </p>
          </div>
          <div className="bg-surface border border-outline-variant p-6 rounded-3xl hover:border-primary/40 transition-colors shadow-clinical-soft">
            <span className="material-symbols-outlined text-[32px] text-primary mb-4">supervised_user_circle</span>
            <h3 className="text-base font-black text-on-surface mb-2">Healthcare Management</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Directing administrative, financial, and logistical workflows in large-scale corporate hospital chains, pharmaceutical majors, and insurance networks.
            </p>
          </div>
          <div className="bg-surface border border-outline-variant p-6 rounded-3xl hover:border-primary/40 transition-colors shadow-clinical-soft">
            <span className="material-symbols-outlined text-[32px] text-primary mb-4">biotech</span>
            <h3 className="text-base font-black text-on-surface mb-2">Clinical Research &amp; Trials</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Conducting trials for new drugs or vaccines, drafting biological reports, ensuring regulatory compliance, and analyzing efficacy datasets.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

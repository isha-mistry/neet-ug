"use client";

import React from "react";
import { Container } from "@/components/common/Container";

export function CareerCategories() {
  return (
    <section className="py-16 bg-surface">
      <Container size="page">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
            Healthcare Career Classification
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
            Medical care operates as an ecosystem. Understand how different sectors complement each other and discover where your interests fit.
          </p>
        </div>

        <div className="space-y-12">
          {/* Category 1 */}
          <div className="rounded-3xl bg-linear-to-br from-primary/55 via-primary-fixed to-surface-container-low p-[1px] shadow-[0_20px_56px_-30px_color-mix(in_srgb,var(--color-primary)_50%,transparent)]">
          <div className="group grid md:grid-cols-12 gap-8 items-center bg-surface-container-lowest rounded-[calc(1.5rem-1px)] p-6 md:p-8 shadow-clinical-soft hover:shadow-clinical-hover transition-all duration-300">
            <div className="md:col-span-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <span className="material-symbols-outlined text-[24px]">healing</span>
              </div>
              <h3 className="text-xl font-black text-on-surface">Clinical Medical Careers</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct patient diagnostics, advanced medical treatment, surgeries, and specialized therapeutic prescription systems.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["MBBS", "BDS", "BAMS", "BHMS", "BUMS"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary font-bold text-[10px] tracking-wide border border-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-8 grid gap-4 sm:grid-cols-2">
              <div className="bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/50 hover:bg-surface hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-on-surface mb-2 flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Hospital &amp; Clinical Operations
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
                    Treat patients, perform life-saving emergency responses, manage healthcare operations, or start private multi-specialty practices.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/50 hover:bg-surface hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-on-surface mb-2 flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Future Specialization Scope
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
                    Post-graduate pathways like MD, MS, and MDS open avenues for super-specialty surgery, cardiology, pediatrics, and critical orthodontics.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Category 2 */}
          <div className="group grid md:grid-cols-12 gap-8 items-center bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 shadow-clinical-soft hover:shadow-clinical-hover hover:border-primary/25 transition-all duration-300">
            <div className="md:col-span-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <span className="material-symbols-outlined text-[24px]">settings_accessibility</span>
              </div>
              <h3 className="text-xl font-black text-on-surface">Allied Health Sciences</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                High-tech diagnostics, vision sciences, patient rehabilitation, physical therapy, and surgical assisting networks.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["Physiotherapy", "Optometry", "Radiology", "Lab Tech"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary font-bold text-[10px] tracking-wide border border-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-8 grid gap-4 sm:grid-cols-2">
              <div className="bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/50 hover:bg-surface hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-on-surface mb-2 flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Technical Diagnostic Excellence
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
                    Operate highly complex diagnostic instruments (MRI, CT scanners), manage pathology laboratories, or examine vision impairments.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/50 hover:bg-surface hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-on-surface mb-2 flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Rehabilitation &amp; Recovery
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
                    Guide post-surgical recoveries, treat sports injuries through physical therapy, and help neurologically impaired patients regain daily skills.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category 3 */}
          <div className="group grid md:grid-cols-12 gap-8 items-center bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 md:p-8 shadow-clinical-soft hover:shadow-clinical-hover hover:border-primary/25 transition-all duration-300">
            <div className="md:col-span-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <span className="material-symbols-outlined text-[24px]">science</span>
              </div>
              <h3 className="text-xl font-black text-on-surface">Research &amp; Public Health</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Clinical research, drug discovery, genomic analysis, epidemiological studies, and healthcare administrative policies.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["Biotechnology", "Clinical Research", "Genomics", "Public Health"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/5 text-primary font-bold text-[10px] tracking-wide border border-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-8 grid gap-4 sm:grid-cols-2">
              <div className="bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/50 hover:bg-surface hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-on-surface mb-2 flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Scientific Innovation
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
                    Investigate disease pathways, engineer vaccines, conduct trials for new medicines, and analyze genetic expressions.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-low/40 p-5 rounded-2xl border border-outline-variant/50 hover:bg-surface hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-on-surface mb-2 flex items-center gap-1.5 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Epidemiology &amp; Healthcare Policy
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
                    Formulate national healthcare policies, map outbreak vectors, and oversee large-scale hospital administration networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


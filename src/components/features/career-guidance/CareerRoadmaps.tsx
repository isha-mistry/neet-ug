"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { guideCardClass } from "@/lib/neet-ug-2026/section-styles";
import { cn } from "@/lib/utils";

export function CareerRoadmaps() {
  return (
    <section className="py-16 bg-surface-container-lowest border-y border-outline-variant/40">
      <Container size="page">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
            Progression Roadmaps
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
            Understand the timeline and milestones from qualification up to clinical expertise. Here is the realistic visual path for primary careers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* MBBS Roadmap */}
          <div className={guideCardClass}>
            <h3 className="text-lg font-black text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">healing</span>
              MBBS Specialization Timeline
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 1</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">NEET Qualification</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Qualify NEET UG and clear All India/State counselling.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 2 (4.5 Years)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Academic MBBS Program</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Pre-clinical, para-clinical, and clinical rotations at medical college.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 3 (1 Year)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Compulsory Rotatory Internship</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Practical training across medicine, surgery, OBG, and community health.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 4</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Registration &amp; Practice</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Register with National Medical Commission (NMC) as a licensed doctor.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 5 (3 Years)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">PG Specialization (MD/MS)</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Clear NEET PG/INI-CET for MD/MS specialization to become a Consultant/Surgeon.</p>
              </div>
            </div>
          </div>

          {/* BDS Roadmap */}
          <div className={guideCardClass}>
            <h3 className="text-lg font-black text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">masks</span>
              BDS Dentistry Timeline
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 1</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">NEET Qualification</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Clear the NEET UG qualification threshold for dental counselling.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 2 (4 Years)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Academic BDS Program</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Acquire dental sciences training, dental materials study, and clinical practice.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 3 (1 Year)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Compulsory Paid Internship</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Rotate through dental departments treating patients under professor guidance.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 4</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Practice &amp; MDS PG Route</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Register with State Dental Council. Start private clinic or clear NEET MDS for PG studies.</p>
              </div>
            </div>
          </div>

          {/* BAMS Roadmap */}
          <div className={guideCardClass}>
            <h3 className="text-lg font-black text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">spa</span>
              BAMS Ayurveda Timeline
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 1</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">NEET Qualification</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Clear minimum NEET qualifying criteria for AYUSH counselling portals.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 2 (4.5 Years)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Academic BAMS Program</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Learn traditional Ayurvedic texts alongside modern physiology, pathology, and surgery.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 3 (1 Year)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Clinical Internship</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Rotate through Ayurvedic dispensaries, Panchakarma centers, and modern general wards.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 4</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Clinical Practice &amp; MD Ayurveda</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Obtain practice license, join government AYUSH hospitals, or pursue MD Ayurveda PG specialization.</p>
              </div>
            </div>
          </div>

          {/* Nursing Roadmap */}
          <div className={guideCardClass}>
            <h3 className="text-lg font-black text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">medical_services</span>
              B.Sc Nursing Science Timeline
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 1</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Admissions Eligibility</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Qualify class 12 PCB. Some central universities require NEET UG scores for registration.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 2 (4 Years)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">B.Sc Nursing Coursework</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">In-depth training in biochemistry, community health nursing, nutrition, and pharmacology.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 3</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">Staff Nurse Placement</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Register with INC (Indian Nursing Council) and join hospitals as a Staff/Critical Care Nurse.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-white" />
                <span className="text-[9px] font-black uppercase text-primary">Step 4 (2 Years)</span>
                <h4 className="text-xs font-black text-on-surface mt-0.5">M.Sc Specialization</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Pursue M.Sc Nursing to become a Nurse Practitioner, Clinical Specialist, or nursing educator.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


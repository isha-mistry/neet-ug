"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface CounsellingStep {
  title: string;
  shortDesc: string;
  details: string;
  icon: string;
}

interface CounsellingTimelineProps {
  steps?: CounsellingStep[];
}

const defaultSteps: CounsellingStep[] = [
  {
    title: "Registration",
    shortDesc: "Sign up on the MCC portal.",
    details: "Aspirants must register on the official Medical Counselling Committee (MCC) portal (mcc.nic.in) for 15% All India Quota, Central Universities (AIIMS, JIPMER, BHU, AMU), and Deemed Universities. Ensure all NEET UG Roll Number, Registration details, and contact info are entered accurately.",
    icon: "app_registration",
  },
  {
    title: "Fee Payment",
    shortDesc: "Pay registration & security deposit.",
    details: "Payment of both a non-refundable registration fee and a refundable security deposit is mandatory. General Category: ₹1,000 + ₹10,000 security deposit for AIQ Govt seats; Deemed Universities: ₹5,000 + ₹2,00,000 security deposit. Ensure payment is done using a bank account that remains active for future refunds.",
    icon: "payments",
  },
  {
    title: "Choice Filling",
    shortDesc: "Select and rank college preferences.",
    details: "Browse available seats in the seat matrix and add your preferred medical/dental colleges in priority sequence. You can fill as many options as you want. Always place your dream colleges first, as the allotment algorithm processes choices from top to bottom.",
    icon: "list_alt",
  },
  {
    title: "Choice Locking",
    shortDesc: "Freeze choices before the deadline.",
    details: "Lock your final list of choices during the specified locking window. Locked choices cannot be modified. If you forget to lock them manually, the portal will automatically lock your last saved choices at the deadline.",
    icon: "lock",
  },
  {
    title: "Seat Allotment",
    shortDesc: "MCC processes and releases results.",
    details: "Seat allotment is processed based on your NEET UG All India Rank, category reservation, seat availability, and locked choice preferences. MCC first publishes a provisional seat allotment list to address discrepancies, followed by the final official allotment letter.",
    icon: "assignment_ind",
  },
  {
    title: "Physical Reporting",
    shortDesc: "Report to college with original papers.",
    details: "Download your official allotment letter. Report in person to the allotted medical college within the designated reporting window. You must carry all original documents for verification, undergo a basic physical fitness check, and submit the tuition fee to finalize your admission.",
    icon: "domain",
  },
];

export function CounsellingTimeline({ steps = defaultSteps }: CounsellingTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="flex flex-col gap-5">
      {/* 6-step pills grid */}
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 md:grid-cols-6">
        {steps.map((st, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`group flex w-[130px] shrink-0 flex-col gap-2 rounded-2xl border p-3.5 text-left transition-all sm:w-auto sm:shrink ${
                isActive
                  ? "border-primary/30 bg-primary-fixed/40 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)] ring-1 ring-primary/10"
                  : "border-outline-variant bg-surface-container-lowest hover:border-primary/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl text-xs font-extrabold transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-low text-on-surface-variant ring-1 ring-outline-variant group-hover:bg-primary-fixed/40"
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-outline">
                  Step {idx + 1}
                </span>
              </div>
              <h3
                className={`mt-1 text-xs font-extrabold leading-tight transition-colors ${
                  isActive ? "text-on-surface" : "text-on-surface group-hover:text-primary"
                }`}
              >
                {st.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-4 text-on-surface-variant">
                {st.shortDesc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Expanded detail card */}
      <Card
        padded={false}
        className="relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)]"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary ring-1 ring-primary/10">
            <MaterialSymbol name={steps[activeStep].icon} size="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-on-surface">
                Stage {activeStep + 1}: {steps[activeStep].title}
              </h3>
              <span className="inline-flex rounded-md bg-primary-fixed px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary ring-1 ring-primary/10">
                Official Step
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant">
              {steps[activeStep].details}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

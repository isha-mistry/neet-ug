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
    title: "Registration & Fee Payment",
    shortDesc: "Sign up on MCC/State portal and pay fees.",
    details: "Aspirants must register on the MCC portal (for 15% AIQ & Deemed Universities) or respective State portals. Registration fee (non-refundable) is ₹1,000 for general AIQ, and ₹5,000 for Deemed. Additionally, security deposit (refundable) of ₹10,000 (AIQ) or ₹2,00,000 (Deemed) is required.",
    icon: "app_registration",
  },
  {
    title: "Choice Filling & Locking",
    shortDesc: "Select and lock college preferences.",
    details: "Browse available colleges, courses, and fee structures. Add your preferred colleges in sequence of preference. You can modify choices until they are locked. Remember to lock choices before the deadline, or they will lock automatically.",
    icon: "list_alt",
  },
  {
    title: "Seat Allotment Results",
    shortDesc: "MCC processes choices & outputs list.",
    details: "Allotment logic runs based on your NEET All India Rank, category, seat availability, and locked choices. MCC releases provisional allotment results first for discrepancies, followed by the official final list.",
    icon: "assignment_ind",
  },
  {
    title: "College Reporting & Admission",
    shortDesc: "Report to college with original papers.",
    details: "Download your seat allotment letter from the portal. Visit the allotted medical college in person within the scheduled timeline. Carry all original documents for verification, undergo a physical fitness test, and pay tuition fees to secure your seat.",
    icon: "domain",
  },
];

export function CounsellingTimeline({ steps = defaultSteps }: CounsellingTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="flex flex-col gap-6">
      {/* Stepper Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((st, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeStep === idx
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                activeStep === idx
                  ? "bg-primary text-text-on-brand"
                  : "bg-slate-100 text-text-secondary"
              }`}>
                {idx + 1}
              </span>
              <h4 className="font-bold text-text text-sm leading-tight">{st.title}</h4>
            </div>
            <p className="text-xs text-text-muted mt-2 line-clamp-1">{st.shortDesc}</p>
          </button>
        ))}
      </div>

      {/* Step Detail Card */}
      <Card padded bordered className="bg-white/80 shadow-sm border border-brand-100/50 rounded-2xl animate-fadeIn">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-fixed text-on-primary-fixed rounded-2xl flex items-center justify-center shrink-0">
            <MaterialSymbol name={steps[activeStep].icon} size="lg" />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-text">{steps[activeStep].title}</h4>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              {steps[activeStep].details}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

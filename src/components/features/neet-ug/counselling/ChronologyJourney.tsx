"use client";

import React from "react";
import { FiCheckCircle, FiAlertTriangle, FiArrowRight, FiInfo, FiLayers, FiLock, FiLogOut, FiRefreshCw, FiAlertOctagon } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface TimelineStep {
  stepNumber: string;
  centerNumber: number;
  title: string;
  description: string;
  cardBadge: string;
  cardBadgeTone: "primary" | "emerald" | "amber" | "error" | "errorSolid";
  cardIcon: "layers" | "logout" | "warning" | "lock" | "info";
  bgIconName?: string;
}

const IconMap = {
  layers: FiLayers,
  logout: FiLogOut,
  warning: FiAlertTriangle,
  lock: FiLock,
  info: FiInfo,
};

const badgeClasses = {
  primary: "bg-primary-fixed text-primary",
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  error: "bg-error-container/10 text-error border border-error/20",
  errorSolid: "bg-error text-on-error",
};

const iconBgClasses = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  error: "bg-error-container/10 text-error",
  errorSolid: "bg-error text-on-error",
};

const timelineSteps: TimelineStep[] = [
  {
    stepNumber: "Step 01",
    centerNumber: 1,
    title: "Registration & Deposit",
    description: "Initial entry into the AIQ/Deemed counselling. Verification of NEET UG data and security deposit payment is mandatory to participate.",
    cardBadge: "Official Flow",
    cardBadgeTone: "primary",
    cardIcon: "layers",
    bgIconName: "folder_shared",
  },
  {
    stepNumber: "Step 02",
    centerNumber: 2,
    title: "Round 1: First Allotment",
    description: "The opening round of merit-based allocation. This round is unique due to the 'Free Exit' policy.",
    cardBadge: "Free Exit Allowed",
    cardBadgeTone: "emerald",
    cardIcon: "logout",
  },
  {
    stepNumber: "Step 03",
    centerNumber: 3,
    title: "Round 2: Security Forfeiture",
    description: "The stakes increase significantly. Exit rules become strict to prevent seat wasting.",
    cardBadge: "Penalty Zone",
    cardBadgeTone: "error",
    cardIcon: "warning",
  },
  {
    stepNumber: "Step 04",
    centerNumber: 4,
    title: "Round 3 (Mop-Up)",
    description: "Final general round for AIQ seats. Mandatory joining once allotted with no exit options.",
    cardBadge: "No Resignation",
    cardBadgeTone: "primary",
    cardIcon: "lock",
  },
  {
    stepNumber: "Step 05",
    centerNumber: 5,
    title: "Stray Vacancy Round",
    description: "The final institutional level-based allocation. Extreme penalties for non-compliance apply here.",
    cardBadge: "Disqualification Risk",
    cardBadgeTone: "errorSolid",
    cardIcon: "info",
  },
];

export function ChronologyJourney() {
  return (
    <div className="relative select-none py-6 md:py-8">
      {/* Central Dotted Line (Desktop only) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-primary/20 -translate-x-1/2 hidden md:block" />

      <div className="flex flex-col gap-10">
        {timelineSteps.map((step, index) => {
          const isLeft = index % 2 === 0; // Steps 1, 3, 5: info on left, card on right. Steps 2, 4: card on left, info on right.
          const IconComponent = IconMap[step.cardIcon];

          return (
            <div
              key={step.stepNumber}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Info Column */}
              <div
                className={cn(
                  "space-y-4",
                  isLeft ? "md:text-right pr-0 md:pr-12 order-1 md:order-1" : "pl-0 md:pl-12 order-1 md:order-2"
                )}
              >
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-primary text-on-primary uppercase tracking-wider">
                  {step.stepNumber}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-on-surface font-headline-md">
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "text-sm text-on-surface-variant leading-relaxed max-w-md",
                    isLeft && "md:ml-auto"
                  )}
                >
                  {step.description}
                </p>
              </div>

              {/* Center Circle Number */}
              <div className="absolute left-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-surface bg-primary text-sm font-bold text-on-primary md:flex">
                {step.centerNumber}
              </div>

              {/* Card Column */}
              <div
                className={cn(
                  isLeft ? "pl-0 md:pl-12 order-2 md:order-2" : "pr-0 md:pr-12 order-2 md:order-1 flex justify-end"
                )}
              >
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm w-full max-w-md relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/50">
                    <span className={cn("p-2 rounded-xl", iconBgClasses[step.cardBadgeTone])}>
                      <IconComponent className="text-lg" />
                    </span>
                    <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", badgeClasses[step.cardBadgeTone])}>
                      {step.cardBadge}
                    </span>
                  </div>

                  {/* STEP 1: Registration Card */}
                  {step.centerNumber === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2 text-xs text-on-surface-variant">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                          <span className="material-symbols-outlined text-sm text-primary">how_to_reg</span>
                          <span><strong>1. Registration:</strong> Submit NTA details on mcc.nic.in</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                          <span className="material-symbols-outlined text-sm text-primary">payments</span>
                          <span><strong>2. Fee Payment:</strong> Registration + Security Deposit</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant">
                          <span className="material-symbols-outlined text-sm text-primary">lock_open</span>
                          <span><strong>3. Choice Filling:</strong> Select & lock preferred colleges</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-on-surface-variant/70 italic">
                        * Use the mobile number & email registered with NTA for OTP verifications.
                      </p>
                    </div>
                  )}

                  {/* STEP 2: Round 1 Flowchart */}
                  {step.centerNumber === 2 && (
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Round 1 Decision Flowchart</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {/* Option A: Joined */}
                        <div className="border border-emerald-100 bg-emerald-50/20 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mb-1">
                              Option A: Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Report to allotted college and complete admission.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-emerald-100/50 flex items-center gap-1 text-[9px] font-bold text-emerald-700">
                            <FiRefreshCw className="animate-spin-slow" /> Will Upgrade to R2
                          </div>
                        </div>

                        {/* Option B: Not Joined */}
                        <div className="border border-blue-100 bg-blue-50/20 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mb-1">
                              Option B: Not Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Do not report or join the college.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-blue-100/50 flex items-center gap-1 text-[9px] font-bold text-blue-700">
                            <FiLogOut /> Free Exit (No Penalty)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Round 2 Flowchart */}
                  {step.centerNumber === 3 && (
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Round 2 Decision Flowchart</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {/* Option A: Joined */}
                        <div className="border border-emerald-100 bg-emerald-50/20 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mb-1">
                              Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Seat is locked. Willingness to Upgrade to R3 can be submitted.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-emerald-100/50 text-[9px] font-semibold text-emerald-700">
                            * Can upgrade to Round 3
                          </div>
                        </div>

                        {/* Option B: Not Joined */}
                        <div className="border border-rose-100 bg-rose-50/20 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded mb-1">
                              Not Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Fails to report or join the college.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-rose-100/50 flex items-center gap-1 text-[9px] font-bold text-rose-700">
                            <FiAlertTriangle /> Deposit Forfeited
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] bg-surface-container-low p-2 rounded-lg border border-outline-variant flex items-center gap-2">
                        <FiInfo className="text-primary shrink-0" />
                        <span><strong>Upgrade Rule:</strong> If upgraded, Relieving Letter from Round 1 is mandatory to join Round 2.</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Round 3 Flowchart */}
                  {step.centerNumber === 4 && (
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Round 3 Decision Flowchart</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {/* Option A: Joined */}
                        <div className="border border-emerald-100 bg-emerald-50/20 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mb-1">
                              Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Once joined, candidate CANNOT resign or upgrade further.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-emerald-100/50 flex items-center gap-1 text-[9px] font-bold text-emerald-700">
                            <FiLock /> Locked Seat
                          </div>
                        </div>

                        {/* Option B: Not Joined */}
                        <div className="border border-rose-150 bg-rose-50/30 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded mb-1">
                              Not Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Candidate fails to report to allotted seat.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-rose-150 flex items-center gap-1 text-[9px] font-bold text-rose-800">
                            <FiAlertOctagon /> Forfeited &amp; Eliminated
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] bg-surface-container-low p-2 rounded-lg border border-outline-variant flex items-center gap-2">
                        <FiInfo className="text-primary shrink-0" />
                        <span><strong>No Allotment:</strong> If not allotted in Round 3, candidate is eligible for Stray Round.</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Stray Round Flowchart */}
                  {step.centerNumber === 5 && (
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Final Stray Round Flowchart</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {/* Option A: Joined */}
                        <div className="border border-emerald-100 bg-emerald-50/20 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mb-1">
                              Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Joins seat at college. Once joined, cannot resign.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-emerald-100/50 text-[9px] font-semibold text-emerald-700">
                            * Admission Finalized
                          </div>
                        </div>

                        {/* Option B: Not Joined */}
                        <div className="border border-rose-200 bg-rose-50/40 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-900 bg-rose-200 px-1.5 py-0.5 rounded mb-1">
                              Not Joined
                            </span>
                            <p className="text-[10px] text-on-surface-variant leading-normal">
                              Fails to report to allotted stray vacancy seat.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-rose-200 flex items-center gap-1 text-[9px] font-bold text-rose-900">
                            <FiAlertOctagon /> 2-Yr NEET Exam Ban
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] bg-error-container/10 text-error border border-error/20 p-2.5 rounded-lg font-medium leading-relaxed">
                        ⚠️ <strong>Elimination Rule:</strong> Candidates holding a seat anywhere or listed as allotted in Round 3 (Centre/State) are automatically barred from Stray Round.
                      </div>
                    </div>
                  )}

                  {/* Decorative background icon */}
                  {step.bgIconName && (
                    <div className="absolute right-4 bottom-4 text-primary/10 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                      <span className="material-symbols-outlined text-5xl">{step.bgIconName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

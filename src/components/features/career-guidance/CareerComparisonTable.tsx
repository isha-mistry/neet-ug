"use client";

import React from "react";
import { Container } from "@/components/common/Container";

const COMPARISON_ROWS = [
    { name: "MBBS", duration: "5.5 Years", fees: "Govt: ₹50k-3L | Private: ₹40L-1.2Cr", govt: "Excellent", private: "Highly Profitable", balance: "Demanding", growth: "Outstanding" },
    { name: "BDS", duration: "5 Years", fees: "Govt: ₹40k-2L | Private: ₹12L-35L", govt: "Good", private: "Highly Feasible", balance: "Excellent", growth: "High" },
    { name: "BAMS", duration: "5.5 Years", fees: "Govt: ₹30k-1.5L | Private: ₹8L-22L", govt: "High", private: "Profitable", balance: "Very Good", growth: "High" },
    { name: "BVSc & AH", duration: "5.5 Years", fees: "Govt: ₹40k-2.5L | Private: ₹12L-28L", govt: "Excellent", private: "Feasible", balance: "Good", growth: "High" },
    { name: "B.Sc Nursing", duration: "4 Years", fees: "Govt: ₹20k-80k | Private: ₹3L-8L", govt: "High", private: "N/A (Staff Role)", balance: "Moderate", growth: "Good" },
    { name: "BPT (Physio)", duration: "4.5 Years", fees: "Govt: ₹20k-1L | Private: ₹4L-12L", govt: "Moderate", private: "Highly Feasible", balance: "Excellent", growth: "High" },
    { name: "B.Sc Radiology", duration: "3.5 Years", fees: "Govt: ₹15k-50k | Private: ₹2L-6L", govt: "Good", private: "N/A (Tech Role)", balance: "Very Good", growth: "Moderate" }
];

export function CareerComparisonTable() {
    return (
        <section className="py-16 bg-surface">
            <Container size="page">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl font-black text-on-surface md:text-4xl tracking-tight">
                        Interactive Career Comparison
                    </h2>
                    <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                        Compare duration, approximate tuition, work-life balance, and growth parameters across the primary medical paths in India.
                    </p>
                </div>

                {/* Interactive Table Wrapper */}
                <div className="overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-high border-b border-outline-variant">
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">Course</th>
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">Duration</th>
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">Est. Tuition Fees</th>
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">Govt Job Prospects</th>
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">Private Practice</th>
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">Work-Life Balance</th>
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">Career Growth</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                                {COMPARISON_ROWS.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-surface-container-low transition-colors even:bg-surface-bright">
                                        <td className="px-5 py-4.5 font-bold text-xs text-on-surface">{row.name}</td>
                                        <td className="px-5 py-4.5 text-xs text-on-surface-variant">{row.duration}</td>
                                        <td className="px-5 py-4.5 text-xs font-semibold text-primary">{row.fees}</td>
                                        <td className="px-5 py-4.5 text-xs text-on-surface-variant font-medium">{row.govt}</td>
                                        <td className="px-5 py-4.5 text-xs text-on-surface-variant font-medium">{row.private}</td>
                                        <td className="px-5 py-4.5 text-xs text-on-surface-variant font-medium">{row.balance}</td>
                                        <td className="px-5 py-4.5 text-xs font-bold text-on-surface">{row.growth}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </section>
    );
}

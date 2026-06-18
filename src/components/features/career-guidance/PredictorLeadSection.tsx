"use client";

import React, { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/common/Container";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

const CATEGORY_OPTIONS = ["General", "OBC", "SC", "ST", "EWS"];
const STATE_OPTIONS = [
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Other"
];

export function PredictorLeadSection() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [score, setScore] = useState("");
  const [category, setCategory] = useState("General");
  const [domicile, setDomicile] = useState("Maharashtra");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = fullName.trim();
    const digits = phone.replace(/\D/g, "");

    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }
    if (!score || Number(score) < 0 || Number(score) > 720) {
      setError("Please enter a valid NEET score between 0 and 720.");
      return;
    }

    // Prefilled WhatsApp message content
    const whatsappText = [
      "Hi MedSeat, I want to check my matching medical colleges.",
      `Name: ${name}`,
      `WhatsApp: +91 ${digits}`,
      `Expected NEET Score: ${score}/720`,
      `Category: ${category}`,
      `Domicile State: ${domicile}`,
      "Please guide me on safe, borderline, and reach colleges."
    ].join("\n");

    const base = COUNSEL_WHATSAPP_URL.split("?")[0];
    const url = `${base}?text=${encodeURIComponent(whatsappText)}`;

    // Open WhatsApp in a new tab
    window.open(url, "_blank", "noopener,noreferrer");

    // Redirect the current tab to the interactive college predictor
    router.push("/college-predictor");
  };

  return (
    <section className="py-16 bg-surface-container-lowest">
      <Container size="page">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Information Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary">
              <span className="material-symbols-outlined text-[14px]">query_stats</span>
              Seat &amp; Rank Matcher
            </div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-on-surface md:text-4xl">
              Preview Your College Options in <span className="text-primary">Real-Time</span>
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Don&apos;t guess your counselling list. Enter your expected NEET score, domicile, and category to check admission probabilities for government, private, and management seats.
            </p>
            <div className="space-y-4 text-xs font-semibold text-on-surface">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-black text-xs">Estimate Your All India Rank (AIR)</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Calculated from verified NTA trends across previous years.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-black text-xs">Unlock ball-park State Quota Cutoffs</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">See category-wise closing ranks for Maharashtra, Gujarat, Rajasthan, and MP.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-black text-xs">Avoid Counselling Guesswork</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Identify safe, borderline, and reach college matrix options instantly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form Column */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-linear-to-br from-primary/60 via-primary-fixed to-surface-container-low p-[1px] shadow-[0_22px_60px_-30px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]">
            <div className="rounded-[calc(1.5rem-1px)] bg-surface p-6 shadow-clinical-soft md:p-8">
              <h3 className="text-lg font-black text-on-surface mb-1">Check Matching Colleges</h3>
              <p className="text-xs text-on-surface-variant mb-6">Enter details to generate your score mapping and proceed to the predictor.</p>

              <form onSubmit={handleSubmit} className="space-y-4.5">
                <div>
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                    WhatsApp Number (For Alerts)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                      NEET Score
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={720}
                      placeholder="e.g. 580"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 text-xs text-on-surface focus:border-primary focus:outline-none"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                      Domicile State
                    </label>
                    <select
                      value={domicile}
                      onChange={(e) => setDomicile(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 text-xs text-on-surface focus:border-primary focus:outline-none"
                    >
                      {STATE_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-error bg-error-container px-3.5 py-2.5 rounded-xl border border-error/20" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary py-4 font-bold text-xs text-on-primary hover:bg-primary-hover active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Verify and Run Predictor</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

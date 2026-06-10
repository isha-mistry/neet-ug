"use client";

import React, { useState } from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

interface NeetLeadFormProps {
  type: "email-guide" | "phone-whatsapp" | "whatsapp-alerts";
  ctaText?: string;
  successTitle?: string;
  successDesc?: string;
  variant?: "default" | "dark";
}

export function NeetLeadForm({
  type,
  ctaText,
  successTitle,
  successDesc,
  variant = "default",
}: NeetLeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetState, setTargetState] = useState("");
  const [topics, setTopics] = useState<string[]>(["all-india"]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const toggleTopic = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics(topics.filter((t) => t !== topic));
    } else {
      setTopics([...topics, topic]);
    }
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center gap-2 rounded-2xl border p-6 text-center shadow-clinical-soft transition-opacity duration-200 ${
        variant === "dark" ? "bg-white/10 border-white/20 text-white" : "border-emerald-100 bg-emerald-50 text-emerald-800"
      }`}>
        <span className={variant === "dark" ? "text-emerald-400" : "text-clinical-green"}>
          <MaterialSymbol name="check_circle" size="lg" />
        </span>
        <h4 className={`mt-1 text-base font-bold ${variant === "dark" ? "text-white" : "text-clinical-navy"}`}>
          {successTitle || (type === "email-guide" ? "Guide Sent to Email!" : "Request Registered!")}
        </h4>
        <p className={`text-xs leading-relaxed ${variant === "dark" ? "text-white/80" : "text-clinical-muted"}`}>
          {successDesc || (
            type === "email-guide"
              ? `Check your inbox. We have sent the PDF download link to ${email}.`
              : `Awesome! You have been successfully registered under +${phone}.`
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
      <div className="flex flex-col">
        <label className={`mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider ${
          variant === "dark" ? "text-white/80" : "text-clinical-muted/75"
        }`}>
          Full Name
        </label>
        <div className="relative flex items-center">
          <span className={`pointer-events-none absolute left-4 flex items-center justify-center ${
            variant === "dark" ? "text-white/50" : "text-clinical-muted/60"
          }`}>
            <MaterialSymbol name="person" size="md" />
          </span>
          <input
            type="text"
            placeholder="e.g. Priyesh Patel"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full rounded-lg border py-3.5 pl-11 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
              variant === "dark" 
                ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white focus:ring-white/10" 
                : "bg-white/90 border-clinical-outline text-clinical-navy placeholder-clinical-muted/55 focus:border-clinical-blue focus:ring-clinical-blue/10"
            }`}
          />
        </div>
      </div>

      {type === "email-guide" && (
        <div className="flex flex-col">
          <label className={`mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider ${
            variant === "dark" ? "text-white/80" : "text-clinical-muted/75"
          }`}>
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className={`pointer-events-none absolute left-4 flex items-center justify-center ${
              variant === "dark" ? "text-white/50" : "text-clinical-muted/60"
            }`}>
              <MaterialSymbol name="mail" size="md" />
            </span>
            <input
              type="email"
              placeholder="e.g. name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border py-3.5 pl-11 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
                variant === "dark" 
                  ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white focus:ring-white/10" 
                  : "bg-white/90 border-clinical-outline text-clinical-navy placeholder-clinical-muted/55 focus:border-clinical-blue focus:ring-clinical-blue/10"
              }`}
            />
          </div>
        </div>
      )}

      {(type === "phone-whatsapp" || type === "whatsapp-alerts") && (
        <div className="flex flex-col">
          <label className={`mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider ${
            variant === "dark" ? "text-white/80" : "text-clinical-muted/75"
          }`}>
            WhatsApp Number
          </label>
          <div className="relative flex items-center">
            <span className={`pointer-events-none absolute left-4 flex items-center justify-center ${
              variant === "dark" ? "text-white/50" : "text-clinical-muted/60"
            }`}>
              <MaterialSymbol name="phone" size="md" />
            </span>
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full rounded-lg border py-3.5 pl-11 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
                variant === "dark" 
                  ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white focus:ring-white/10" 
                  : "bg-white/90 border-clinical-outline text-clinical-navy placeholder-clinical-muted/55 focus:border-clinical-blue focus:ring-clinical-blue/10"
              }`}
            />
          </div>
        </div>
      )}

      {type === "whatsapp-alerts" && (
        <>
          <div className="flex flex-col">
            <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-clinical-muted/75">
              State of Interest
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-4 flex items-center justify-center text-clinical-muted/60">
                <MaterialSymbol name="map" size="md" />
              </span>
              <input
                type="text"
                placeholder="e.g. Maharashtra, Gujarat"
                value={targetState}
                onChange={(e) => setTargetState(e.target.value)}
                className="w-full rounded-lg border border-clinical-outline bg-white/90 py-3.5 pl-11 pr-4 text-sm text-clinical-navy placeholder-clinical-muted/55 transition-all duration-200 focus:border-clinical-blue focus:outline-none focus:ring-4 focus:ring-clinical-blue/10"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-clinical-muted/75">
              Choose Alert Channels
            </span>
            <div className="flex flex-col gap-2.5 rounded-xl border border-clinical-outline bg-clinical-surface-low/70 p-4">
              <label className="flex cursor-pointer select-none items-center gap-2.5 text-xs font-semibold text-clinical-muted">
                <input
                  type="checkbox"
                  checked={topics.includes("all-india")}
                  onChange={() => toggleTopic("all-india")}
                  className="h-4 w-4 rounded border-clinical-outline text-clinical-blue transition-colors focus:ring-clinical-blue"
                />
                All India Counselling (MCC)
              </label>
              <label className="flex cursor-pointer select-none items-center gap-2.5 text-xs font-semibold text-clinical-muted">
                <input
                  type="checkbox"
                  checked={topics.includes("state")}
                  onChange={() => toggleTopic("state")}
                  className="h-4 w-4 rounded border-clinical-outline text-clinical-blue transition-colors focus:ring-clinical-blue"
                />
                State Counselling Alerts
              </label>
              <label className="flex cursor-pointer select-none items-center gap-2.5 text-xs font-semibold text-clinical-muted">
                <input
                  type="checkbox"
                  checked={topics.includes("results")}
                  onChange={() => toggleTopic("results")}
                  className="h-4 w-4 rounded border-clinical-outline text-clinical-blue transition-colors focus:ring-clinical-blue"
                />
                Result Announcements & Keys
              </label>
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-bold shadow-md transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
          variant === "dark"
            ? "bg-white text-blue-900 hover:bg-blue-50 shadow-white/10"
            : type === "phone-whatsapp" || type === "whatsapp-alerts"
            ? "bg-clinical-green text-white hover:bg-emerald-700 shadow-emerald-500/10"
            : "bg-clinical-blue text-white hover:bg-clinical-blue-bright shadow-clinical-blue/10"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center animate-spin">
            <MaterialSymbol name="sync" size="md" />
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <MaterialSymbol
              name={type === "email-guide" ? "download" : type === "whatsapp-alerts" ? "notifications" : "forum"}
              size="md"
            />
          </span>
        )}
        <span>
          {loading ? "Processing..." : ctaText || (type === "email-guide" ? "Download Free Guide" : "Subscribe Now")}
        </span>
      </button>
    </form>
  );
}

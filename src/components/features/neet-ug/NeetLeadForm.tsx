"use client";

import React, { useState } from "react";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { cn } from "@/lib/utils";

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
      <div className={cn("flex flex-col items-center gap-2 rounded-2xl border p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_26px_-16px_rgba(37,70,208,0.2)] transition-opacity duration-200", variant === "dark" ? "border-on-primary/20 bg-on-primary/10 text-on-primary" : "border-tertiary/25 bg-tertiary-fixed/30 text-on-surface")}>
        <span className={variant === "dark" ? "text-tertiary-fixed" : "text-tertiary"}>
          <MaterialSymbol name="check_circle" size="lg" />
        </span>
        <h4 className={`mt-1 text-base font-bold ${variant === "dark" ? "text-on-primary" : "text-on-surface"}`}>
          {successTitle || (type === "email-guide" ? "Guide Sent to Email!" : "Request Registered!")}
        </h4>
        <p className={`text-xs leading-relaxed ${variant === "dark" ? "text-on-primary/80" : "text-on-surface-variant"}`}>
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
        <label className={`mb-1.5 block text-[10.5px] font-bold uppercase leading-none tracking-[0.14em] ${
          variant === "dark" ? "text-on-primary/80" : "text-outline"
        }`}>
          Full Name
        </label>
        <div className="relative flex items-center">
          <span className={`pointer-events-none absolute left-4 flex items-center justify-center ${
            variant === "dark" ? "text-on-primary/55" : "text-outline"
          }`}>
            <MaterialSymbol name="person" size="md" />
          </span>
          <input
            type="text"
            placeholder="e.g. Priyesh Patel"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
              variant === "dark" 
                ? "border-on-primary/20 bg-on-primary/10 text-on-primary placeholder-on-primary/45 focus:border-on-primary focus:ring-on-primary/10" 
                : "border-outline-variant bg-surface-container-lowest text-on-surface placeholder-outline focus:border-primary focus:ring-primary/15"
            }`}
          />
        </div>
      </div>

      {type === "email-guide" && (
        <div className="flex flex-col">
          <label className={`mb-1.5 block text-[10.5px] font-bold uppercase leading-none tracking-[0.14em] ${
            variant === "dark" ? "text-on-primary/80" : "text-outline"
          }`}>
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className={`pointer-events-none absolute left-4 flex items-center justify-center ${
              variant === "dark" ? "text-on-primary/55" : "text-outline"
            }`}>
              <MaterialSymbol name="mail" size="md" />
            </span>
            <input
              type="email"
              placeholder="e.g. name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
                variant === "dark" 
                  ? "border-on-primary/20 bg-on-primary/10 text-on-primary placeholder-on-primary/45 focus:border-on-primary focus:ring-on-primary/10" 
                  : "border-outline-variant bg-surface-container-lowest text-on-surface placeholder-outline focus:border-primary focus:ring-primary/15"
              }`}
            />
          </div>
        </div>
      )}

      {(type === "phone-whatsapp" || type === "whatsapp-alerts") && (
        <div className="flex flex-col">
          <label className={`mb-1.5 block text-[10.5px] font-bold uppercase leading-none tracking-[0.14em] ${
            variant === "dark" ? "text-on-primary/80" : "text-outline"
          }`}>
            WhatsApp Number
          </label>
          <div className="relative flex items-center">
            <span className={`pointer-events-none absolute left-4 flex items-center justify-center ${
              variant === "dark" ? "text-on-primary/55" : "text-outline"
            }`}>
              <MaterialSymbol name="phone" size="md" />
            </span>
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${
                variant === "dark" 
                  ? "border-on-primary/20 bg-on-primary/10 text-on-primary placeholder-on-primary/45 focus:border-on-primary focus:ring-on-primary/10" 
                  : "border-outline-variant bg-surface-container-lowest text-on-surface placeholder-outline focus:border-primary focus:ring-primary/15"
              }`}
            />
          </div>
        </div>
      )}

      {type === "whatsapp-alerts" && (
        <>
          <div className="flex flex-col">
            <label className="mb-1.5 block text-[10.5px] font-bold uppercase leading-none tracking-[0.14em] text-outline">
              State of Interest
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-4 flex items-center justify-center text-outline">
                <MaterialSymbol name="map" size="md" />
              </span>
              <input
                type="text"
                placeholder="e.g. Maharashtra, Gujarat"
                value={targetState}
                onChange={(e) => setTargetState(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-3.5 pl-11 pr-4 text-sm text-on-surface placeholder-outline transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="block text-[10.5px] font-bold uppercase leading-none tracking-[0.14em] text-outline">
              Choose Alert Channels
            </span>
            <div className="flex flex-col gap-2.5 rounded-xl border border-outline-variant bg-surface-container-low p-4">
              <label className="flex cursor-pointer select-none items-center gap-2.5 text-xs font-semibold text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={topics.includes("all-india")}
                  onChange={() => toggleTopic("all-india")}
                  className="h-4 w-4 rounded border-outline-variant text-primary transition-colors focus:ring-primary"
                />
                All India Counselling (MCC)
              </label>
              <label className="flex cursor-pointer select-none items-center gap-2.5 text-xs font-semibold text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={topics.includes("state")}
                  onChange={() => toggleTopic("state")}
                  className="h-4 w-4 rounded border-outline-variant text-primary transition-colors focus:ring-primary"
                />
                State Counselling Alerts
              </label>
              <label className="flex cursor-pointer select-none items-center gap-2.5 text-xs font-semibold text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={topics.includes("results")}
                  onChange={() => toggleTopic("results")}
                  className="h-4 w-4 rounded border-outline-variant text-primary transition-colors focus:ring-primary"
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
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-150 hover:-translate-y-px active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${
          variant === "dark"
            ? "bg-on-primary text-primary hover:bg-primary-fixed"
            : type === "phone-whatsapp" || type === "whatsapp-alerts"
            ? "bg-primary text-on-primary shadow-primary-button hover:bg-primary-pressed hover:shadow-primary-button-hover"
            : "bg-primary text-on-primary shadow-primary-button hover:bg-primary-pressed hover:shadow-primary-button-hover"
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

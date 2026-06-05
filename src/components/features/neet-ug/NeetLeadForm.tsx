"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

interface NeetLeadFormProps {
  type: "email-guide" | "phone-whatsapp" | "whatsapp-alerts";
  ctaText?: string;
  successTitle?: string;
  successDesc?: string;
}

export function NeetLeadForm({
  type,
  ctaText,
  successTitle,
  successDesc,
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
      <div className="bg-brand-50 border border-brand-100 text-brand-800 p-6 rounded-2xl flex flex-col gap-2 items-center text-center animate-fadeIn">
        <MaterialSymbol name="check_circle" className="text-primary text-3xl" />
        <h4 className="font-bold text-base text-text">
          {successTitle || (type === "email-guide" ? "Guide Sent to Email!" : "Request Registered!")}
        </h4>
        <p className="text-xs text-text-secondary mt-1">
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
      <Input
        label="Full Name"
        type="text"
        placeholder="e.g. Priyesh Patel"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        leadingIcon={<MaterialSymbol name="person" />}
      />

      {type === "email-guide" && (
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leadingIcon={<MaterialSymbol name="mail" />}
        />
      )}

      {(type === "phone-whatsapp" || type === "whatsapp-alerts") && (
        <Input
          label="WhatsApp Number"
          type="tel"
          placeholder="e.g. +91 98765 43210"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          leadingIcon={<MaterialSymbol name="phone" />}
        />
      )}

      {type === "whatsapp-alerts" && (
        <>
          <Input
            label="State of Interest"
            type="text"
            placeholder="e.g. Maharashtra, Gujarat"
            value={targetState}
            onChange={(e) => setTargetState(e.target.value)}
            leadingIcon={<MaterialSymbol name="map" />}
          />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
              Choose Alert Channels
            </span>
            <div className="flex flex-col gap-2 bg-surface-muted/50 p-3 rounded-xl border border-border/50">
              <label className="flex items-center gap-2.5 text-xs text-text font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={topics.includes("all-india")}
                  onChange={() => toggleTopic("all-india")}
                  className="rounded text-primary border-border focus:ring-primary h-3.5 w-3.5"
                />
                All India Counselling (MCC)
              </label>
              <label className="flex items-center gap-2.5 text-xs text-text font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={topics.includes("state")}
                  onChange={() => toggleTopic("state")}
                  className="rounded text-primary border-border focus:ring-primary h-3.5 w-3.5"
                />
                State Counselling Alerts
              </label>
              <label className="flex items-center gap-2.5 text-xs text-text font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={topics.includes("results")}
                  onChange={() => toggleTopic("results")}
                  className="rounded text-primary border-border focus:ring-primary h-3.5 w-3.5"
                />
                Result Announcements & Keys
              </label>
            </div>
          </div>
        </>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={loading}
        className={type === "phone-whatsapp" || type === "whatsapp-alerts" ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none" : ""}
        leadingIcon={
          loading ? (
            <MaterialSymbol name="sync" className="animate-spin" />
          ) : (
            <MaterialSymbol
              name={type === "email-guide" ? "download" : type === "whatsapp-alerts" ? "notifications" : "whatsapp"}
            />
          )
        }
      >
        {loading ? "Processing..." : ctaText || (type === "email-guide" ? "Download Free Guide" : "Subscribe Now")}
      </Button>
    </form>
  );
}

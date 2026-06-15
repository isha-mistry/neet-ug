"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { DOMICILE_OPTIONS, STICKY_EXPERT_IMAGES } from "@/lib/home-04/content";
import {
  COUNSEL_BOOK_CALL_URL,
  COUNSEL_WHATSAPP_URL,
} from "@/lib/mbbs-state/constants";
import { cn } from "@/lib/utils";

export function Home04StrategySessionForm() {
  const [domicile, setDomicile] = useState<string>(DOMICILE_OPTIONS[0]);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    const country = String(data.get("country") ?? "+91");

    if (name.length < 2) {
      setError("Enter your full legal name.");
      return;
    }
    if (phone.length < 10) {
      setError("Enter a valid phone number.");
      return;
    }

    const text = encodeURIComponent(
      `Hi MedSeat, I'd like to book a strategy session.\nName: ${name}\nPhone: ${country} ${phone}\nPrimary domicile interest: ${domicile}`
    );
    window.open(`${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="home04-name"
          className="mb-1.5 block text-sm font-medium text-on-surface-variant"
        >
          Full Legal Name
        </label>
        <input
          id="home04-name"
          name="name"
          className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3.5 outline-none transition-all placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest focus:ring-4 focus:ring-primary/10"
          placeholder="Enter as per NEET form"
          type="text"
          autoComplete="name"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label
            htmlFor="home04-country"
            className="mb-1.5 block text-sm font-medium text-on-surface-variant"
          >
            Country
          </label>
          <select
            id="home04-country"
            name="country"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 py-3.5 outline-none focus:border-primary focus:bg-surface-container-lowest"
            defaultValue="+91"
          >
            <option value="+91">+91</option>
            <option value="+971">+971</option>
          </select>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="home04-phone"
            className="mb-1.5 block text-sm font-medium text-on-surface-variant"
          >
            Phone Number
          </label>
          <input
            id="home04-phone"
            name="phone"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3.5 outline-none transition-all placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest focus:ring-4 focus:ring-primary/10"
            placeholder="98765 43210"
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-on-surface-variant">
          Primary Domicile Interest
        </p>
        <div className="grid grid-cols-2 gap-2">
          {DOMICILE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setDomicile(option)}
              className={cn(
                "rounded-full border px-3 py-2.5 text-center text-sm font-medium transition-all",
                domicile === option
                  ? "border-primary bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "border-outline-variant bg-surface-container-low text-on-surface-variant hover:border-primary/50 hover:text-primary"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {error ? (
        <p className="rounded-lg bg-error-container/50 px-3 py-2 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="group ms-primary-glow flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-on-primary transition-all hover:-translate-y-0.5 hover:bg-primary-hover active:translate-y-0 active:bg-primary-pressed"
      >
        Connect with Expert Advisor
        <span className="material-symbols-outlined transition-transform group-hover:translate-x-0.5">
          chevron_right
        </span>
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-on-surface-variant">
        <span className="material-symbols-outlined text-sm text-secondary">lock</span>
        Clinical privacy standards compliant
      </p>
    </form>
  );
}

export function Home04StickyBookingStrip() {
  return (
    <div className="fixed bottom-0 left-0 z-[100] hidden w-full md:block">
      <div className="mx-2 mb-2 overflow-hidden rounded-2xl border border-white/15 bg-primary/95 px-6 py-3.5 text-on-primary shadow-[0_-8px_40px_rgba(37,70,208,0.35)] backdrop-blur-md">
        <div className="ms-layout-page flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {STICKY_EXPERT_IMAGES.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-primary object-cover ring-2 ring-white/20"
                  width={44}
                  height={44}
                />
              ))}
            </div>
            <div>
              <p className="font-semibold leading-tight">Senior counselors available now</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-secondary-container" />
                <span className="text-xs text-on-primary/80">
                  Gujarat & Rajasthan strategic window open
                </span>
              </div>
            </div>
          </div>
          <Link
            href={COUNSEL_BOOK_CALL_URL}
            className="flex items-center gap-2 rounded-xl bg-secondary px-6 py-2.5 font-bold text-on-secondary shadow-lg transition-transform hover:scale-[1.03] active:scale-100"
          >
            Secure Free Slot
            <span className="material-symbols-outlined text-lg">event_available</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Home04DownloadReportButton() {
  const text = encodeURIComponent(
    "Hi MedSeat, I'd like the 2025 Analytics Report."
  );
  const href = `${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary-fixed/50 px-6 py-3.5 font-label-md text-label-md text-primary transition-all hover:border-primary/40 hover:bg-primary-fixed"
    >
      Download 2025 Analytics Report
      <span className="material-symbols-outlined">download</span>
    </a>
  );
}

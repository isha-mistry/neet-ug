"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

export function Home01EligibilityForm() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/cutoff-analyser");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="home01-neet-score"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            NEET Score
          </label>
          <input
            id="home01-neet-score"
            name="score"
            className="w-full rounded-lg border border-outline-variant p-2 focus:border-primary focus:ring-2 focus:ring-primary"
            placeholder="0-720"
            type="number"
            min={0}
            max={720}
          />
        </div>
        <div>
          <label
            htmlFor="home01-category"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            Category
          </label>
          <select
            id="home01-category"
            name="category"
            className="w-full rounded-lg border border-outline-variant p-2 focus:ring-2 focus:ring-primary"
            defaultValue="General"
          >
            <option>General</option>
            <option>OBC-NCL</option>
            <option>EWS</option>
            <option>SC/ST</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="home01-state"
          className="mb-1 block font-label-md text-label-md text-on-surface-variant"
        >
          Target State
        </label>
        <select
          id="home01-state"
          name="state"
          className="w-full rounded-lg border border-outline-variant p-2 focus:ring-2 focus:ring-primary"
          defaultValue="gujarat"
        >
          <option value="gujarat">Gujarat (ACPUGMEC)</option>
          <option value="rajasthan">Rajasthan (RUHS)</option>
          <option value="madhya-pradesh">Madhya Pradesh (DMAT)</option>
          <option value="maharashtra">Maharashtra (CET Cell)</option>
        </select>
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-4 font-label-md text-label-md text-on-secondary hover:opacity-90"
      >
        See My College Options
        <span className="material-symbols-outlined">trending_up</span>
      </button>
    </form>
  );
}

export function Home01PlaybookForm() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");

    if (name.length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (phone.length < 10) {
      setError("Enter a valid WhatsApp number.");
      return;
    }

    const state = String(data.get("state") ?? "");
    const score = String(data.get("score") ?? "");
    const text = encodeURIComponent(
      `Hi MedSeat, I'd like the NEET 2026 Counseling Playbook.\nName: ${name}\nWhatsApp: ${phone}\nScore: ${score || "—"}\nHome state: ${state || "—"}`
    );
    window.open(`${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">
        Get Your Copy Instantly
      </h3>
      <input
        name="name"
        className="w-full rounded-lg border border-outline-variant p-2"
        placeholder="Full Name"
        type="text"
        autoComplete="name"
      />
      <input
        name="phone"
        className="w-full rounded-lg border border-outline-variant p-2"
        placeholder="WhatsApp Number"
        type="tel"
        autoComplete="tel"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          name="score"
          className="w-full rounded-lg border border-outline-variant p-2"
          placeholder="NEET Score"
          type="number"
          min={0}
          max={720}
        />
        <select
          name="state"
          className="w-full rounded-lg border border-outline-variant p-2"
          defaultValue=""
        >
          <option value="">Select Home State</option>
          <option>Gujarat</option>
          <option>Maharashtra</option>
          <option>Rajasthan</option>
          <option>Madhya Pradesh</option>
        </select>
      </div>
      {error ? (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-4 font-bold text-on-secondary"
      >
        Download Playbook (PDF)
        <span className="material-symbols-outlined">download</span>
      </button>
      <p className="mt-2 text-center text-[10px] text-on-surface-variant">
        By submitting, you agree to receive counseling updates via WhatsApp.
      </p>
    </form>
  );
}

export function Home01MobileFab() {
  return (
    <Link
      href={COUNSEL_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-secondary text-on-secondary shadow-2xl transition-transform active:scale-90 md:hidden"
      aria-label="Chat on WhatsApp"
    >
      <span className="material-symbols-outlined">chat</span>
    </Link>
  );
}

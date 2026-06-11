"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

export function Home05AdmissionForm() {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/college-predictor");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="home05-rank"
          className="mb-1.5 block font-label-md text-label-md text-on-surface-variant"
        >
          NEET All India Rank
        </label>
        <input
          id="home05-rank"
          name="rank"
          className="w-full rounded-xl border border-outline-variant/80 bg-surface-container-lowest px-4 py-3 font-body-md outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="e.g. 12500"
          type="number"
          min={1}
          inputMode="numeric"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="home05-category"
            className="mb-1.5 block font-label-md text-label-md text-on-surface-variant"
          >
            Category
          </label>
          <select
            id="home05-category"
            name="category"
            className="w-full rounded-xl border border-outline-variant/80 bg-surface-container-lowest px-3 py-3 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            defaultValue=""
          >
          <option value="">Select</option>
          <option>General</option>
          <option>OBC-NCL</option>
          <option>SC/ST</option>
          <option>EWS</option>
        </select>
        </div>
        <div>
          <label
            htmlFor="home05-state"
            className="mb-1.5 block font-label-md text-label-md text-on-surface-variant"
          >
            Domicile
          </label>
          <select
            id="home05-state"
            name="state"
            className="w-full rounded-xl border border-outline-variant/80 bg-surface-container-lowest px-3 py-3 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            defaultValue=""
          >
          <option value="">State</option>
          <option>Gujarat</option>
          <option>Maharashtra</option>
          <option>Rajasthan</option>
          <option>MP</option>
        </select>
        </div>
      </div>
      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container py-4 font-label-md text-label-md font-bold text-on-primary shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
      >
        Find Best Colleges
        <span className="material-symbols-outlined transition-transform group-hover:translate-x-0.5">
          arrow_forward
        </span>
      </button>
    </form>
  );
}

export function Home05PlaybookForm() {
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

    const text = encodeURIComponent(
      `Hi MedSeat, I'd like the NEET Counseling Playbook (2026).\nName: ${name}\nWhatsApp: ${phone}`
    );
    window.open(`${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block font-label-md text-label-md text-on-primary/90">
          Full Name
        </label>
        <input
          name="name"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-on-primary outline-none placeholder:text-white/50 focus:border-white/40 focus:bg-white/15"
          placeholder="Your name"
          type="text"
          autoComplete="name"
        />
      </div>
      <div>
        <label className="mb-1 block font-label-md text-label-md text-on-primary/90">
          WhatsApp Number
        </label>
        <input
          name="phone"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-on-primary outline-none placeholder:text-white/50 focus:border-white/40 focus:bg-white/15"
          placeholder="+91 00000 00000"
          type="tel"
          autoComplete="tel"
        />
      </div>
      {error ? (
        <p className="rounded-lg bg-white/10 px-3 py-2 text-sm text-error-container" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-fixed py-4 font-label-md text-label-md font-bold text-on-secondary-fixed transition-all hover:brightness-110"
      >
        Download Free PDF
        <span className="material-symbols-outlined">download</span>
      </button>
      <p className="text-center text-xs italic text-on-primary/60">
        Joined by 12,000+ medical aspirants this month.
      </p>
    </form>
  );
}

export function Home05WhitepaperButton({ topic }: { topic: string }) {
  const text = encodeURIComponent(`Hi MedSeat, I'd like the whitepaper: ${topic}`);
  const href = `${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl border border-primary py-2.5 text-center font-label-md text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary"
    >
      Download Analysis
    </a>
  );
}

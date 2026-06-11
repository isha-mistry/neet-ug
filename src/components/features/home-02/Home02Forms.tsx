"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

export function Home02ScoreCheckerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      router.push("/cutoff-analyser");
    }, 600);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="home02-score"
          className="mb-1 block font-label-md text-label-md text-on-surface-variant"
        >
          NEET Score (Expected/Actual)
        </label>
        <input
          id="home02-score"
          name="score"
          className="w-full rounded-lg border border-outline-variant p-4 focus:border-primary focus:ring-2 focus:ring-primary"
          placeholder="Enter Score (0-720)"
          type="number"
          min={0}
          max={720}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="home02-category"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            Category
          </label>
          <select
            id="home02-category"
            name="category"
            className="w-full rounded-lg border border-outline-variant p-4"
            defaultValue="General"
          >
            <option>General</option>
            <option>OBC-NCL</option>
            <option>SC/ST</option>
            <option>EWS</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="home02-domicile"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            Domicile State
          </label>
          <select
            id="home02-domicile"
            name="domicile"
            className="w-full rounded-lg border border-outline-variant p-4"
            defaultValue="Gujarat"
          >
            <option>Gujarat</option>
            <option>Rajasthan</option>
            <option>Maharashtra</option>
            <option>Madhya Pradesh</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-4 font-label-md text-label-md text-on-secondary transition-all hover:bg-on-secondary-container disabled:opacity-80"
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined animate-spin">sync</span>
            Analyzing Data...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">search</span>
            Check My Chances
          </>
        )}
      </button>
      <p className="text-center font-label-md text-label-md italic text-on-surface-variant">
        Updated with 2026 Seat Matrix Predictions
      </p>
    </form>
  );
}

export function Home02PlaybookForm() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    const state = String(data.get("state") ?? "");
    const score = String(data.get("score") ?? "");

    if (name.length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (phone.length < 10) {
      setError("Enter a valid WhatsApp number.");
      return;
    }

    const text = encodeURIComponent(
      `Hi MedSeat, I'd like the NEET 2026 Counseling Playbook (Home 2).\nName: ${name}\nWhatsApp: ${phone}\nTarget state: ${state}\nExpected score: ${score || "—"}`
    );
    window.open(`${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="home02-playbook-name"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            Full Name
          </label>
          <input
            id="home02-playbook-name"
            name="name"
            className="w-full rounded-lg border border-outline-variant p-4 focus:ring-primary"
            placeholder="Rahul Sharma"
            type="text"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor="home02-playbook-phone"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            WhatsApp Number
          </label>
          <input
            id="home02-playbook-phone"
            name="phone"
            className="w-full rounded-lg border border-outline-variant p-4 focus:ring-primary"
            placeholder="+91"
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="home02-playbook-state"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            Target State
          </label>
          <select
            id="home02-playbook-state"
            name="state"
            className="w-full rounded-lg border border-outline-variant p-4"
            defaultValue="Gujarat"
          >
            <option>Gujarat</option>
            <option>Rajasthan</option>
            <option>Maharashtra</option>
            <option>Madhya Pradesh</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="home02-playbook-score"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            Expected Score
          </label>
          <input
            id="home02-playbook-score"
            name="score"
            className="w-full rounded-lg border border-outline-variant p-4 focus:ring-primary"
            placeholder="0-720"
            type="number"
            min={0}
            max={720}
          />
        </div>
      </div>
      {error ? (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-6 font-label-md text-label-md text-on-secondary shadow-lg transition-all hover:bg-on-secondary-container"
      >
        <span className="material-symbols-outlined">download</span>
        Get the PDF Playbook Now
      </button>
      <p className="mt-4 text-center text-xs text-on-surface-variant">
        We respect your privacy. No spam, only crucial counseling updates.
      </p>
    </form>
  );
}

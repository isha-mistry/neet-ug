"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import { cn } from "@/lib/utils";

export function Home03MatchPredictorForm() {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/college-predictor");
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="home03-score"
          className="mb-1 block font-label-md text-label-md text-on-surface-variant"
        >
          NEET Score (Expected/Actual)
        </label>
        <input
          id="home03-score"
          name="score"
          className="w-full rounded-lg border border-outline px-4 py-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary-container"
          placeholder="e.g. 685"
          type="number"
          min={0}
          max={720}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="home03-category"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            Category
          </label>
          <select
            id="home03-category"
            name="category"
            className="w-full rounded-lg border border-outline px-4 py-4 outline-none focus:border-primary"
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
            htmlFor="home03-domicile"
            className="mb-1 block font-label-md text-label-md text-on-surface-variant"
          >
            State Domicile
          </label>
          <select
            id="home03-domicile"
            name="domicile"
            className="w-full rounded-lg border border-outline px-4 py-4 outline-none focus:border-primary"
            defaultValue="Maharashtra"
          >
            <option>Maharashtra</option>
            <option>Gujarat</option>
            <option>Rajasthan</option>
            <option>Madhya Pradesh</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-secondary py-4 font-label-md text-label-md text-on-secondary transition-transform hover:scale-[0.98]"
      >
        View Matching Colleges
      </button>
      <div className="border-t border-outline-variant pt-4">
        <p className="text-center text-xs text-on-surface-variant">
          <span className="font-bold text-secondary">4,200+</span> students matched
          their seats yesterday.
        </p>
      </div>
    </form>
  );
}

export function Home03FloatingLeadMagnet() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) {
    return null;
  }

  const text = encodeURIComponent(
    "Hi MedSeat, I'd like the 2026 Counseling Playbook PDF."
  );
  const playbookUrl = `${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${text}`;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 max-w-xs transition-transform duration-500 md:bottom-8 md:right-8",
        visible ? "translate-y-0" : "translate-y-[150%]"
      )}
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-primary bg-white/85 p-4 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          className="absolute top-2 right-2 text-on-surface-variant hover:text-primary"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
        <div className="flex gap-4">
          <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded bg-primary-fixed text-primary-container shadow-inner">
            <span className="material-symbols-outlined text-4xl">book</span>
          </div>
          <div>
            <p className="mb-1 font-label-md text-label-md uppercase text-primary">
              Free Resource
            </p>
            <p className="mb-4 text-xs leading-tight font-bold">
              Download 2026 Counseling Playbook
            </p>
            <a
              href={playbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-primary px-4 py-1.5 text-xs text-on-primary transition-colors hover:bg-primary-container"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

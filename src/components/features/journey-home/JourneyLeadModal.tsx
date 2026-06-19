"use client";

import { useEffect, useId, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import {
  SEAT_RADAR_CATEGORY_LABELS,
  SEAT_RADAR_DOMICILE_STATES,
} from "@/lib/journey-home/seat-radar-cta";

export type JourneyLeadModalVariant = "radar" | "essentials" | "expert" | "premium";

const QUOTA_INTEREST_OPTIONS = [
  "All India Quota (AIQ)",
  "State quota",
  "Management quota",
  "NRI quota",
  "Multiple / not sure yet",
] as const;

type JourneyLeadModalProps = {
  open: boolean;
  redirectTo: string;
  variant: JourneyLeadModalVariant;
  neetScore?: string;
  category?: string;
  onClose: () => void;
  introLine: string;
  lede: string;
};

export function JourneyLeadModal({
  open,
  redirectTo,
  variant,
  neetScore = "",
  category = "gen",
  onClose,
  introLine,
  lede,
}: JourneyLeadModalProps) {
  const router = useRouter();
  const titleId = useId();
  const fieldId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fid = (name: string) => `${fieldId}-${name}`.replace(/:/g, "");

  const showParent = variant === "radar" || variant === "expert";
  const showCategory = variant !== "premium";
  const showDomicile = variant !== "premium";
  const showTargetStates = variant === "expert" || variant === "premium";
  const showQuotaInterest = variant === "premium";
  const nameLabel =
    variant === "essentials" || variant === "premium" ? "Name" : "Student name";

  function finish() {
    onClose();
    router.push(redirectTo);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleDismiss() {
    finish();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const studentName = String(data.get("studentName") ?? "").trim();
    const parentName = String(data.get("parentName") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").replace(/\D/g, "");
    const countryCode = String(data.get("countryCode") ?? "+91");
    const score = String(data.get("neetScore") ?? "").trim();
    const categoryKey = String(data.get("category") ?? category);
    const categoryLabel =
      SEAT_RADAR_CATEGORY_LABELS[categoryKey] ?? categoryKey;
    const domicile = String(data.get("domicileState") ?? "").trim();
    const targetStates = String(data.get("targetStates") ?? "").trim();
    const quotaInterest = String(data.get("quotaInterest") ?? "").trim();

    if (studentName.length < 2 || whatsapp.length < 10) return;
    if (showParent && parentName.length < 2) return;
    if (showDomicile && !domicile) return;
    if (showTargetStates && targetStates.length < 2) return;
    if (showQuotaInterest && !quotaInterest) return;

    const lines = [introLine, `Name: ${studentName}`];
    if (showParent) lines.push(`Parent: ${parentName}`);
    lines.push(`WhatsApp: ${countryCode} ${whatsapp}`);
    if (score) lines.push(`NEET score: ${score}`);
    if (showCategory) lines.push(`Category: ${categoryLabel}`);
    if (showDomicile) lines.push(`Domicile state: ${domicile}`);
    if (showQuotaInterest) lines.push(`Quota interest: ${quotaInterest}`);
    if (showTargetStates) lines.push(`Target states: ${targetStates}`);

    const base = COUNSEL_WHATSAPP_URL.split("?")[0];
    window.open(
      `${base}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    finish();
  }

  return (
    <dialog
      ref={dialogRef}
      className="radar-modal"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        handleDismiss();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleDismiss();
      }}
    >
      <div className="radar-modal-panel">
        <button
          type="button"
          className="radar-modal-close"
          aria-label="Close"
          onClick={handleDismiss}
        >
          ×
        </button>
        <h3 id={titleId} className="radar-modal-title">
          Tell us a bit about you
        </h3>
        <p className="radar-modal-lede">{lede}</p>
        <form className="radar-modal-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor={fid("student")}>{nameLabel}</label>
            <input
              id={fid("student")}
              name="studentName"
              type="text"
              required
              autoComplete="name"
            />
          </div>
          {showParent ? (
            <div className="field">
              <label htmlFor={fid("parent")}>Parent name</label>
              <input id={fid("parent")} name="parentName" type="text" required />
            </div>
          ) : null}
          <div className="field">
            <label htmlFor={fid("wa")}>WhatsApp number</label>
            <div className="wa-row">
              <select
                id={fid("country")}
                name="countryCode"
                defaultValue="+91"
                aria-label="Country code"
              >
                <option value="+91">IND(+91)</option>
                <option value="+977">NPL(+977)</option>
                <option value="+971">UAE(+971)</option>
                <option value="+1">USA(+1)</option>
              </select>
              <input
                id={fid("wa")}
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel-national"
                inputMode="numeric"
                placeholder="10-digit mobile"
              />
            </div>
          </div>
          <div className="rrow">
            {showCategory ? (
              <>
                <div className="field">
                  <label htmlFor={fid("score")}>NEET score</label>
                  <input
                    id={fid("score")}
                    name="neetScore"
                    className="mono"
                    type="number"
                    min={0}
                    max={720}
                    defaultValue={neetScore}
                    inputMode="numeric"
                  />
                </div>
                <div className="field">
                  <label htmlFor={fid("cat")}>Category</label>
                  <select id={fid("cat")} name="category" defaultValue={category}>
                    {Object.entries(SEAT_RADAR_CATEGORY_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="field">
                <label htmlFor={fid("score")}>NEET score</label>
                <input
                  id={fid("score")}
                  name="neetScore"
                  className="mono"
                  type="number"
                  min={0}
                  max={720}
                  defaultValue={neetScore}
                  inputMode="numeric"
                />
              </div>
            )}
          </div>
          {showQuotaInterest ? (
            <div className="field">
              <label htmlFor={fid("quota")}>Quota interest</label>
              <select id={fid("quota")} name="quotaInterest" required defaultValue="">
                <option value="" disabled>
                  Select quota
                </option>
                {QUOTA_INTEREST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {showDomicile ? (
            <div className="field">
              <label htmlFor={fid("dom")}>Domicile state</label>
              <select id={fid("dom")} name="domicileState" required defaultValue="">
                <option value="" disabled>
                  Select state
                </option>
                {SEAT_RADAR_DOMICILE_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {showTargetStates ? (
            <div className="field">
              <label htmlFor={fid("targets")}>Target states</label>
              <input
                id={fid("targets")}
                name="targetStates"
                type="text"
                required
                placeholder="e.g. Gujarat, MCC AIQ"
              />
            </div>
          ) : null}
          <button type="submit" className="btn btn-blue">
            Continue
          </button>
        </form>
      </div>
    </dialog>
  );
}

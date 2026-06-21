"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { submitLeadAction } from "@/app/actions/submit-lead";
import { SEAT_RADAR_CATEGORY_LABELS } from "@/lib/journey-home/seat-radar-cta";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { LeadFocusStatesMultiSelect } from "@/components/features/leads/LeadFocusStatesMultiSelect";
import { LeadStateSelect } from "@/components/features/leads/LeadStateSelect";
import { LeadFormThankYouPanel, leadRedirectPageLabel } from "@/components/features/leads/LeadFormThankYouPanel";
import { LeadModalCloseButton } from "@/components/features/leads/LeadModalCloseButton";
import { LeadConsentField, useLeadConsent } from "@/components/features/leads/LeadConsentField";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { useLeadFormSubmitGate } from "@/components/features/leads/useLeadFormSubmitGate";
import { useLeadRedirectCountdown } from "@/components/features/leads/useLeadRedirectCountdown";
import { openCounselWhatsApp } from "@/lib/leads/whatsapp";

export type JourneyLeadModalVariant = "radar" | "essentials" | "expert" | "premium";

type ModalPhase = "form" | "thanks-redirect";

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
  /** Overrides saved `pagePath` (e.g. `/#playbook`). */
  pagePath?: string;
  /** Overrides default `Journey home — {variant}` lead label. */
  pageLabel?: string;
  /** Stored in `rawPayload.pageSection` (e.g. `playbook`). */
  pageSection?: string;
  /** Overrides `variant` on the saved lead row. */
  leadVariant?: string;
  /** After thank-you countdown, open WhatsApp with this message instead of `redirectTo`. */
  whatsappMessageAfterSubmit?: string;
  initialStudentName?: string;
  initialCountryCode?: string;
  initialPhone?: string;
  /** When true, modal lede uses primary ink (black) instead of muted grey. */
  ledeEmphasis?: boolean;
};

function JourneyLeadThanksRedirect({
  titleId,
  redirectPageLabel,
  onComplete,
}: {
  titleId: string;
  redirectPageLabel: string;
  onComplete: () => void;
}) {
  const seconds = useLeadRedirectCountdown(onComplete);

  return (
    <LeadFormThankYouPanel
      titleId={titleId}
      skin="journey"
      redirectCountdown={seconds > 0 ? seconds : null}
      redirectPageLabel={redirectPageLabel}
    />
  );
}

export function JourneyLeadModal({
  open,
  redirectTo,
  variant,
  neetScore = "",
  category = "gen",
  onClose,
  introLine,
  lede,
  pageLabel,
  pagePath: pagePathOverride,
  pageSection,
  leadVariant,
  whatsappMessageAfterSubmit,
  initialStudentName = "",
  initialCountryCode,
  initialPhone = "",
  ledeEmphasis = false,
}: JourneyLeadModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [phase, setPhase] = useState<ModalPhase>("form");
  const titleId = useId();
  const fieldId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fid = (name: string) => `${fieldId}-${name}`.replace(/:/g, "");
  const [modalCountryCode, setModalCountryCode] = useState(initialCountryCode ?? "+91");
  const [modalPhone, setModalPhone] = useState(initialPhone);
  const [formError, setFormError] = useState<string | null>(null);
  const { consent, canSubmit, resetConsent, fieldProps: consentFieldProps } = useLeadConsent();

  const isThanks = phase === "thanks-redirect";
  const submitReady = useLeadFormSubmitGate(formRef, canSubmit, {
    active: open && !isThanks,
    validateExtras: () => modalPhone.replace(/\D/g, "").length >= 10,
    deps: [open, isThanks, modalPhone, consent],
  });

  useEffect(() => {
    if (!open) return;
    setModalCountryCode(initialCountryCode ?? "+91");
    setModalPhone(initialPhone);
    resetConsent();
    setFormError(null);
  }, [open, initialCountryCode, initialPhone, resetConsent]);

  const completeRedirect = useCallback(() => {
    onClose();
    if (whatsappMessageAfterSubmit) {
      openCounselWhatsApp([whatsappMessageAfterSubmit]);
      return;
    }
    router.push(redirectTo);
  }, [onClose, redirectTo, router, whatsappMessageAfterSubmit]);

  const thanksRedirectLabel = whatsappMessageAfterSubmit
    ? "WhatsApp"
    : leadRedirectPageLabel(redirectTo);

  const showParent = variant === "radar" || variant === "expert";
  const showCategory = variant !== "premium";
  const showDomicile = variant !== "premium";
  const showTargetStates = variant === "expert" || variant === "premium";
  const showQuotaInterest = variant === "premium";
  const nameLabel =
    variant === "essentials" || variant === "premium" ? "Name" : "Student name";

  function handleDismiss() {
    if (pending) return;
    onClose();
  }

  useEffect(() => {
    if (open) setPhase("form");
  }, [open]);

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    if (!submitReady) {
      setFormError(LEAD_CONSENT_ERROR);
      return;
    }
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
    if (showTargetStates && !targetStates) return;
    if (showQuotaInterest && !quotaInterest) return;

    startTransition(async () => {
      const saved = await submitLeadAction({
        formType: LEAD_FORM_TYPES.journeyModal,
        pagePath: pagePathOverride ?? pathname,
        pageLabel: pageLabel ?? `Journey home — ${variant}`,
        variant: leadVariant ?? variant,
        name: studentName,
        countryCode,
        phone: whatsapp,
        neetScore: score ? Number(score) : null,
        neetCategory: showCategory ? categoryLabel : undefined,
        domicileState: showDomicile ? domicile : undefined,
        targetStates: showTargetStates ? targetStates : undefined,
        consent,
        rawPayload: {
          parentName: showParent ? parentName : undefined,
          quotaInterest: showQuotaInterest ? quotaInterest : undefined,
          redirectTo: whatsappMessageAfterSubmit ? "whatsapp" : redirectTo,
          introLine,
          pageSection,
          funnel:
            pageSection === "playbook"
              ? "playbook_counselling"
              : pageSection === "final-cta"
                ? "final_cta_counselling"
                : pageSection === "challenge-band"
                  ? "challenge_counselling"
                  : undefined,
          whatsappMessageAfterSubmit: whatsappMessageAfterSubmit ?? undefined,
        },
      });

      if (!saved.success) return;

      setPhase("thanks-redirect");
    });
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
        <LeadModalCloseButton
          onClick={handleDismiss}
          disabled={pending}
          skin="journey"
        />
        {isThanks ? (
          <JourneyLeadThanksRedirect
            titleId={titleId}
            redirectPageLabel={thanksRedirectLabel}
            onComplete={completeRedirect}
          />
        ) : (
          <>
            <h3 id={titleId} className="radar-modal-title">
              Tell us a bit about you
            </h3>
            <p
              className={
                ledeEmphasis ? "radar-modal-lede radar-modal-lede--ink" : "radar-modal-lede"
              }
            >
              {lede}
            </p>
            <form ref={formRef} className="radar-modal-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor={fid("student")}>{nameLabel}</label>
                <input
                  id={fid("student")}
                  name="studentName"
                  type="text"
                  required
                  minLength={2}

                  defaultValue={initialStudentName}
                />
              </div>
              {showParent ? (
                <div className="field">
                  <label htmlFor={fid("parent")}>Parent name</label>
                  <input id={fid("parent")} name="parentName" type="text" required minLength={2} />
                </div>
              ) : null}
              <div className="field">
                <label htmlFor={fid("wa")}>WhatsApp number</label>
                <PhoneNumberField
                  layout="wa-row"
                  countrySelectId={fid("country")}
                  phoneInputId={fid("wa")}
                  phoneName="whatsapp"
                  countryCode={modalCountryCode}
                  onCountryCodeChange={setModalCountryCode}
                  phone={modalPhone}
                  onPhoneChange={setModalPhone}
                />
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
                        required
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
                      required
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
                  <LeadStateSelect
                    id={fid("dom")}
                    name="domicileState"
                    required
                    defaultValue=""
                    placeholder="Select state"
                  />
                </div>
              ) : null}
              {showTargetStates ? (
                <div className="field">
                  <label htmlFor={fid("targets")}>Target states</label>
                  <LeadFocusStatesMultiSelect
                    id={fid("targets")}
                    name="targetStates"
                    required
                    skin="journey"
                  />
                </div>
              ) : null}
              <LeadConsentField
                id={fid("consent")}
                skin="journey"
                disabled={pending}
                {...consentFieldProps}
              />
              {formError ? (
                <p className="m-0 text-[12px] text-[var(--red,#c62828)]" role="alert">
                  {formError}
                </p>
              ) : null}
              <button
                type="submit"
                className="btn btn-blue lead-form-submit"
                disabled={pending || !submitReady}
              >
                {pending ? "Saving…" : "Continue"}
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useRef, useState, useTransition, type FormEvent, type KeyboardEvent } from "react";
import { submitLeadAction } from "@/app/actions/submit-lead";
import { JOURNEY_PLAYBOOK_AFTER_SUBMIT } from "@/lib/journey-home/content";
import { fmtIN, runSeatRadar } from "@/lib/journey-home/seat-radar";
import {
  getSeatRadarCtaContent,
  getSeatRadarCtaTier,
} from "@/lib/journey-home/seat-radar-cta";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { PhoneNumberField } from "@/components/features/leads/PhoneNumberField";
import { LeadConsentField, useLeadConsent } from "@/components/features/leads/LeadConsentField";
import { useLeadFormSubmitGate } from "@/components/features/leads/useLeadFormSubmitGate";
import { LEAD_CONSENT_ERROR } from "@/lib/leads/consent";
import { JourneyLeadModal } from "./JourneyLeadModal";
import { SeatRadarLeadModal } from "./SeatRadarLeadModal";
import { SeatRadarResultCta } from "./SeatRadarResultCta";

export function SeatRadarCard() {
  const [score, setScore] = useState("");
  const [cat, setCat] = useState("gen");
  const [result, setResult] = useState<ReturnType<typeof runSeatRadar> | null>(
    null,
  );
  const [hasScanned, setHasScanned] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadRedirect, setLeadRedirect] = useState("/counselling");

  function scan() {
    setHasScanned(true);
    setResult(runSeatRadar(parseInt(score, 10), cat));
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") scan();
  }

  const ctaTier =
    result !== null && hasScanned ? getSeatRadarCtaTier(result) : null;
  const ctaContent = ctaTier ? getSeatRadarCtaContent(ctaTier) : null;

  function openLeadModal(redirectTo: string) {
    setLeadRedirect(redirectTo);
    setLeadOpen(true);
  }

  function closeLeadModal() {
    setLeadOpen(false);
  }

  return (
    <div className="radar-card">
      <div className="radar-head">
        <span className="tt">Scan your chances</span>
        <span className="live">LIVE · 2026 DATA</span>
      </div>
      <div className="rrow">
        <div className="field">
          <label htmlFor="r-score">NEET 2026 score</label>
          <input
            className="mono"
            id="r-score"
            type="number"
            min={0}
            max={720}
            placeholder="e.g. 580"
            inputMode="numeric"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            onKeyDown={onKey}
          />
        </div>
        <div className="field">
          <label htmlFor="r-cat">Category</label>
          <select
            id="r-cat"
            value={cat}
            onChange={(e) => {
              setCat(e.target.value);
              if (score && hasScanned) scan();
            }}
          >
            <option value="gen">General</option>
            <option value="ews">EWS</option>
            <option value="obc">SEBC / OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>
        </div>
      </div>
      <button type="button" className="btn btn-blue" onClick={scan}>
        Run the scan →
      </button>
      <div className="rout" aria-live="polite">
        {result === null ? (
          <div className="rempty">
            <span className="blink">· · ·</span>
            Awaiting input. Enter your score to scan GJ · RJ · MP · MH.
          </div>
        ) : result.kind === "invalid" ? (
          <div className="rempty">
            <span className="blink">! ! !</span>
            Enter a valid NEET score between 0 and 720.
          </div>
        ) : result.kind === "below" ? (
          <>
            <div className="rempty">
              <span className="blink">· · ·</span>
              Below the qualifying range (137 for General). There are still paths —
              talk to us before assuming anything.
            </div>
            {hasScanned && ctaContent ? (
              <SeatRadarResultCta
                content={ctaContent}
                onAction={() => openLeadModal(ctaContent.redirectTo)}
              />
            ) : null}
          </>
        ) : (
          <>
            <SeatRadarOutput result={result} />
            {hasScanned && ctaContent ? (
              <SeatRadarResultCta
                content={ctaContent}
                onAction={() => openLeadModal(ctaContent.redirectTo)}
              />
            ) : null}
          </>
        )}
      </div>
      <p className="rnote">ESTIMATE · 2023–2025 TRENDS · NOT AN ALLOTMENT GUARANTEE</p>

      <SeatRadarLeadModal
        open={leadOpen}
        redirectTo={leadRedirect}
        neetScore={score}
        category={cat}
        onClose={closeLeadModal}
      />
    </div>
  );
}

function SeatRadarOutput({
  result,
}: {
  result: Extract<ReturnType<typeof runSeatRadar>, { kind: "ok" }>;
}) {
  const { rank, tS, tB, tR, rows } = result;
  const tot = tS + tB + tR || 1;

  return (
    <>
      <div className="rrank">
        <span className="l">Estimated AIR</span>
        <span className="v">~{fmtIN(rank)}</span>
      </div>
      <div className="rstack">
        <i style={{ width: `${(tS / tot) * 100}%`, background: "var(--safe-bg)" }} />
        <i style={{ width: `${(tB / tot) * 100}%`, background: "var(--warn-bg)" }} />
        <i style={{ width: `${(tR / tot) * 100}%`, background: "var(--risk-bg)" }} />
      </div>
      <div className="rkey">
        <span>
          <i style={{ background: "var(--safe)" }} />
          {tS} safe
        </span>
        <span>
          <i style={{ background: "var(--warn)" }} />
          {tB} borderline
        </span>
        <span>
          <i style={{ background: "var(--risk)" }} />
          {tR} reach
        </span>
      </div>
      {rows.map((row) => (
        <div className="rstate" key={row.code}>
          <span className="nm">
            <span className="nm-full">{row.label}</span>
            <span className="nm-abbr">{row.code}</span>
          </span>
          <div className="rchips">
            {row.sa ? <span className="chip c-safe">{row.sa} safe</span> : null}
            {row.bo ? (
              <span className="chip c-warn">{row.bo} borderline</span>
            ) : null}
            {row.re ? <span className="chip c-risk">{row.re} reach</span> : null}
          </div>
        </div>
      ))}
      {/* Verdict message — hidden for now
      <div
        className="rverdict"
        dangerouslySetInnerHTML={{ __html: result.verdict }}
      />
      */}
    </>
  );
}

export function PlaybookForm() {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [counselModalOpen, setCounselModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const { canSubmit, fieldProps: consentFieldProps } = useLeadConsent();
  const formRef = useRef<HTMLFormElement>(null);
  const submitReady = useLeadFormSubmitGate(formRef, canSubmit, {
    active: !sent,
    validateExtras: () =>
      name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10,
    deps: [sent, canSubmit, name, phone],
  });

  const playbookPagePath = `${pathname.split("#")[0] || "/"}#playbook`;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      setError("Enter your name.");
      return;
    }
    if (digits.length < 10) {
      setError("Enter a valid WhatsApp number.");
      return;
    }
    if (!submitReady) {
      setError(LEAD_CONSENT_ERROR);
      return;
    }

    startTransition(async () => {
      const saved = await submitLeadAction({
        formType: LEAD_FORM_TYPES.homePlaybook,
        pagePath: playbookPagePath,
        pageLabel: "Journey home — playbook section — playbook download",
        name: trimmedName,
        countryCode,
        phone: digits,
        consent: canSubmit,
        rawPayload: {
          pageSection: JOURNEY_PLAYBOOK_AFTER_SUBMIT.pageSection,
          funnel: "playbook_download",
        },
      });

      if (!saved.success) {
        setError(saved.error);
        return;
      }

      setSent(true);
    });
  }

  return (
    <>
      <form ref={formRef} className="pb-form" onSubmit={onSubmit} noValidate>
        {sent ? (
          <div className="pb-form-success">
            <p>{JOURNEY_PLAYBOOK_AFTER_SUBMIT.heading}</p>
            <p className="pb-form-success-sub">{JOURNEY_PLAYBOOK_AFTER_SUBMIT.subheading}</p>
            <button
              type="button"
              className="btn"
              onClick={() => setCounselModalOpen(true)}
            >
              {JOURNEY_PLAYBOOK_AFTER_SUBMIT.ctaLabel}
            </button>
          </div>
        ) : (
        <>
          <input
            type="text"
            className={`pb-form-field ${name.trim() === "" ? "is-empty" : ""}`}
            placeholder="Your name"
            required
            minLength={2}
            aria-label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={pending}
          />
          <PhoneNumberField
            layout="grid"
            className="phone-field-grid"
            phonePlaceholder="WhatsApp number"
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            phone={phone}
            onPhoneChange={setPhone}
            phoneName="whatsapp"
            inputClassName={phone.trim() === "" ? "is-empty" : ""}
          />
          {error ? (
            <p className="pb-form-error" role="alert">
              {error}
            </p>
          ) : null}
          <LeadConsentField
            id="playbook-consent"
            skin="dark"
            disabled={pending}
            {...consentFieldProps}
          />
          <button
            className="btn lead-form-submit"
            type="submit"
            disabled={pending || !submitReady}
          >
            {pending ? "Sending…" : "Send me the playbook →"}
          </button>
          <p className="pb-fine">
            FREE · SENT INSTANTLY · COUNSELLING UPDATES ONLY · UNSUBSCRIBE ANY TIME
          </p>
        </>
      )}
      </form>

      <JourneyLeadModal
        key={counselModalOpen ? `playbook-counsel-${name}-${phone}` : "playbook-counsel-closed"}
        open={counselModalOpen}
        variant="essentials"
        redirectTo="/counselling"
        introLine={JOURNEY_PLAYBOOK_AFTER_SUBMIT.modalIntroLine}
        lede={JOURNEY_PLAYBOOK_AFTER_SUBMIT.modalLede}
        ledeEmphasis
        pageLabel={JOURNEY_PLAYBOOK_AFTER_SUBMIT.pageLabel}
        pagePath={playbookPagePath}
        pageSection={JOURNEY_PLAYBOOK_AFTER_SUBMIT.pageSection}
        leadVariant={JOURNEY_PLAYBOOK_AFTER_SUBMIT.leadVariant}
        whatsappMessageAfterSubmit={JOURNEY_PLAYBOOK_AFTER_SUBMIT.whatsappMessage}
        initialStudentName={name}
        initialCountryCode={countryCode}
        initialPhone={phone}
        onClose={() => setCounselModalOpen(false)}
      />
    </>
  );
}

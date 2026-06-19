"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { fmtIN, runSeatRadar } from "@/lib/journey-home/seat-radar";
import {
  getSeatRadarCtaContent,
  getSeatRadarCtaTier,
} from "@/lib/journey-home/seat-radar-cta";
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
  const [leadRedirect, setLeadRedirect] = useState("/counseling");

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
        <div className="rstate" key={row.nm}>
          <span className="nm">{row.nm}</span>
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
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form className="pb-form" onSubmit={onSubmit}>
      {sent ? (
        <p style={{ fontSize: 16, fontWeight: 700 }}>
          Sent! Check your WhatsApp — the Playbook is on its way.
        </p>
      ) : (
        <>
          <input type="text" placeholder="Your name" required aria-label="Your name" />
          <input
            type="tel"
            placeholder="WhatsApp number"
            required
            aria-label="WhatsApp number"
          />
          <button className="btn" type="submit">
            Send it →
          </button>
          <p className="pb-fine">
            FREE · SENT INSTANTLY · COUNSELING UPDATES ONLY · UNSUBSCRIBE ANY TIME
          </p>
        </>
      )}
    </form>
  );
}

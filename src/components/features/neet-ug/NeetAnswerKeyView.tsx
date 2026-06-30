"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { GuidePageJumpNav } from "@/components/features/mbbs-india/GuidePageJumpNav";
import {
  GuideCard,
  GuideSection,
  GuideSteps,
  MetricGrid,
} from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { NeetUgUpdatesSidebar } from "@/components/features/neet-ug/NeetUgUpdatesParts";
import { NeetUgHubFinalCta, NeetUg2026Shell } from "@/components/features/neet-ug/NeetUg2026Parts";
import { DataTable } from "@/components/features/neet-ug/shared/DataTable";
import { RpMarketingHero } from "@/components/features/rank-predictor/RankPredictorParts";
import {
  NEET_UG_ANSWER_KEY_CHALLENGE_NOTE,
  NEET_UG_ANSWER_KEY_CUTOFF_TREND_FOOTNOTE,
  NEET_UG_ANSWER_KEY_CUTOFF_TREND_ROWS,
  NEET_UG_ANSWER_KEY_HERO,
  NEET_UG_ANSWER_KEY_JUMP_SECTIONS,
  NEET_UG_ANSWER_KEY_KEY_STATS,
  NEET_UG_ANSWER_KEY_LEAD_MAGNET,
  NEET_UG_ANSWER_KEY_OMR_STEPS,
  NEET_UG_ANSWER_KEY_QUALIFYING_ROWS,
  NEET_UG_ANSWER_KEY_RELATED_LINKS,
  NEET_UG_ANSWER_KEY_RESULT_STEPS,
  NEET_UG_ANSWER_KEY_SCORECARD_FIELDS,
  NEET_UG_ANSWER_KEY_TIE_BREAKING,
} from "@/lib/neet-ug-2026/answer-key-content";
import {
  guideCardClass,
  hubCardHoverClass,
} from "@/lib/neet-ug-2026/section-styles";
import { useState, useEffect, useMemo } from "react";
import { fetchNeetAnswerKeyAction, type AnswerKeyRow } from "@/app/actions/neet-answer-key";
import { cn } from "@/lib/utils";

export function NeetAnswerKeyView() {
  const qualifyingRows = NEET_UG_ANSWER_KEY_QUALIFYING_ROWS.map((row) => ({ ...row }));
  const trendRows = NEET_UG_ANSWER_KEY_CUTOFF_TREND_ROWS.map((row) => ({ ...row }));

  const [selectedPaper, setSelectedPaper] = useState<string>("50");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [answerKeys, setAnswerKeys] = useState<AnswerKeyRow[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoadingKeys, setIsLoadingKeys] = useState<boolean>(true);

  const [correctCount, setCorrectCount] = useState<string>("");
  const [incorrectCount, setIncorrectCount] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    fetchNeetAnswerKeyAction(selectedPaper).then((res) => {
      if (isMounted && res.success && res.data) {
        setAnswerKeys(res.data);
        setPdfUrl(res.pdfUrl || null);
      }
      if (isMounted) setIsLoadingKeys(false);
    });
    return () => {
      isMounted = false;
    };
  }, [selectedPaper]);

  const filteredKeys = useMemo(() => {
    return answerKeys.filter((item) => {
      if (selectedSubject !== "All" && item.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const qMatch = `q.${item.questionNo}`.includes(query) || `${item.questionNo}`.includes(query);
        const aMatch = item.answer.toLowerCase().includes(query);
        if (!qMatch && !aMatch) return false;
      }
      return true;
    });
  }, [answerKeys, selectedSubject, searchQuery]);

  const estimatedScore = useMemo(() => {
    const c = parseInt(correctCount, 10);
    const i = parseInt(incorrectCount, 10);
    if (isNaN(c) && isNaN(i)) return null;
    const validC = isNaN(c) ? 0 : Math.max(0, c);
    const validI = isNaN(i) ? 0 : Math.max(0, i);
    return Math.max(0, Math.min(720, validC * 4 - validI * 1));
  }, [correctCount, incorrectCount]);

  return (
    <NeetUg2026Shell>
      <RpMarketingHero
        id="top"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NEET UG 2026", href: "/neet-ug-2026" },
          { label: "Answer key & results" },
        ]}
        title={NEET_UG_ANSWER_KEY_HERO.title}
        titleEmphasis={NEET_UG_ANSWER_KEY_HERO.titleEmphasis}
        lede={NEET_UG_ANSWER_KEY_HERO.lede}
        trio={NEET_UG_ANSWER_KEY_HERO.trio}
        fine={NEET_UG_ANSWER_KEY_HERO.fine}
      >
        <NeetUgLeadMagnetPanel
          pageLabel="NEET UG 2026 Answer Key"
          content={NEET_UG_ANSWER_KEY_LEAD_MAGNET}
          formType={LEAD_FORM_TYPES.neetUgLiveUpdates}
          redirectToWhatsApp={false}
          consentFieldId="lead-neet-ug-2026-answer-key-consent"
        />
      </RpMarketingHero>

      <nav
        aria-label="Page sections"
        className="sticky top-16 z-30 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-lg lg:hidden"
      >
        <Container size="2xl" className="py-3">
          <GuidePageJumpNav variant="horizontal" jumpSections={NEET_UG_ANSWER_KEY_JUMP_SECTIONS} />
        </Container>
      </nav>

      <Container size="2xl" className="pb-4 pt-6 md:pt-8">
        <div className="mt-6 lg:hidden">
          <NeetUgUpdatesSidebar />
        </div>

        <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)_minmax(17rem,20rem)] lg:items-start lg:gap-8 xl:grid-cols-[12.5rem_minmax(0,1fr)_22rem] xl:gap-10">
          <aside
            className={cn(
              "sticky top-[4.25rem] z-20 hidden max-h-[calc(100dvh-4.5rem)] self-start overflow-y-auto overscroll-contain",
              "lg:col-start-1 lg:row-start-1 lg:block lg:w-full"
            )}
          >
            <GuidePageJumpNav variant="sidebar" jumpSections={NEET_UG_ANSWER_KEY_JUMP_SECTIONS} />
          </aside>

          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            <GuideSection embedded id="at-a-glance" eyebrow="Snapshot" title="At a glance">
              <MetricGrid
                items={NEET_UG_ANSWER_KEY_KEY_STATS.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))}
              />
            </GuideSection>

            <GuideSection
              embedded
              id="live-answer-key"
              eyebrow="Official Paper Sets"
              title="Provisional Answer Key & Score Checker"
              description="View the official NTA verified answer key for Paper Sets 50, 60, 70, and 80. Filter by subject or verify your marks using our live score calculator."
            >
              {/* Score Checker Calculator */}
              <div className="rounded-[1.5rem] p-[1.5px] bg-linear-to-r from-primary via-primary/30 to-tertiary shadow-md mb-8">
                <div className="rounded-[calc(1.5rem-1.5px)] bg-surface-container-lowest p-6 sm:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                        <span className="material-symbols-outlined text-sm">calculate</span>
                        Instant Score Checker
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-on-surface">
                        Estimate Your NEET UG 2026 Score
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
                        Enter your count of correct and incorrect attempts based on the official answer key. Marking scheme: <strong className="text-tertiary">+4 for correct</strong>, <strong className="text-error">-1 for incorrect</strong>.
                      </p>
                      <div className="mt-5 flex flex-wrap gap-4">
                        <div>
                          <label htmlFor="correct-input" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                            Correct Attempts (+4)
                          </label>
                          <input
                            id="correct-input"
                            type="number"
                            min="0"
                            max="180"
                            placeholder="e.g. 150"
                            value={correctCount}
                            onChange={(e) => setCorrectCount(e.target.value)}
                            className="w-36 rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-base font-bold text-on-surface focus:border-primary focus:outline-hidden transition"
                          />
                        </div>
                        <div>
                          <label htmlFor="incorrect-input" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                            Incorrect Attempts (-1)
                          </label>
                          <input
                            id="incorrect-input"
                            type="number"
                            min="0"
                            max="180"
                            placeholder="e.g. 15"
                            value={incorrectCount}
                            onChange={(e) => setIncorrectCount(e.target.value)}
                            className="w-36 rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-base font-bold text-on-surface focus:border-primary focus:outline-hidden transition"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-center justify-center rounded-2xl bg-surface-container-low p-6 ring-1 ring-outline-variant/60 min-w-[14rem]">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Estimated Score
                      </span>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="font-mono text-4xl font-extrabold text-primary">
                          {estimatedScore !== null ? estimatedScore : "—"}
                        </span>
                        <span className="text-sm font-semibold text-on-surface-variant">/ 720</span>
                      </div>
                      {/* {estimatedScore !== null && (
                        <span className={cn(
                          "mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
                          estimatedScore >= 620 ? "bg-tertiary-fixed text-tertiary" :
                          estimatedScore >= 500 ? "bg-secondary-fixed text-secondary" :
                          "bg-error-container text-error"
                        )}>
                          {estimatedScore >= 620 ? "🎉 High Government Chance" :
                           estimatedScore >= 500 ? "⚖️ Moderate / State Quota" :
                           "🎯 Focus on Private / Deemed"}
                        </span>
                      )} */}
                      <Link
                        href="/reneet-rank-predictor-2026"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary no-underline transition hover:bg-primary-pressed shadow-xs"
                      >
                        Predict AIR Rank &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paper Set & Subject Filter Controls */}
              <GuideCard className="p-6">
                <div className="flex flex-col gap-5 border-b border-outline-variant pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      Select Paper Set Code
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["50", "60", "70", "80"].map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => {
                            setSelectedPaper(code);
                            setIsLoadingKeys(true);
                          }}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition cursor-pointer",
                            selectedPaper === code
                              ? "bg-primary text-on-primary shadow-xs"
                              : "bg-surface text-on-surface-variant border border-outline-variant hover:border-primary hover:text-on-surface"
                          )}
                        >
                          <span className="material-symbols-outlined text-base">description</span>
                          Paper Set {code}
                        </button>
                      ))}
                      {pdfUrl && (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition ml-1"
                        >
                          <span className="material-symbols-outlined text-base">download</span>
                          <span>Official PDF</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-64">
                    <label htmlFor="search-q" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                      Search Question No.
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                        search
                      </span>
                      <input
                        id="search-q"
                        type="text"
                        placeholder="e.g. 45 or Bonus"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-outline-variant bg-surface pl-9 pr-4 py-2 text-sm text-on-surface focus:border-primary focus:outline-hidden transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "All Subjects (180)", value: "All", dot: "bg-on-surface-variant" },
                      { label: "Physics", value: "Physics", dot: "bg-primary" },
                      { label: "Chemistry", value: "Chemistry", dot: "bg-tertiary" },
                      { label: "Botany", value: "Botany", dot: "bg-secondary" },
                      { label: "Zoology", value: "Zoology", dot: "bg-outline" },
                    ].map((sub) => (
                      <button
                        key={sub.value}
                        type="button"
                        onClick={() => setSelectedSubject(sub.value)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer",
                          selectedSubject === sub.value
                            ? "bg-primary-fixed text-primary ring-1 ring-primary shadow-2xs"
                            : "bg-surface text-on-surface-variant hover:bg-surface-container-low border border-outline-variant/60"
                        )}
                      >
                        <span className={cn("h-2 w-2 rounded-full", sub.dot)} />
                        {sub.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-on-surface-variant">
                    Showing <strong className="font-bold text-on-surface">{filteredKeys.length}</strong> questions
                  </span>
                </div>

                {/* Legend Bar */}
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-surface-container-lowest px-4 py-2.5 text-xs text-on-surface-variant border border-outline-variant/60">
                  <span className="font-bold text-on-surface uppercase tracking-wider text-[10px]">Marking Scheme &amp; Key Legend:</span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary"></span>
                    <span>Standard Option (<strong className="text-tertiary font-bold">+4</strong> / <strong className="text-error font-bold">-1</strong>)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                    <span>Multiple Correct (Either option awards <strong className="text-tertiary font-bold">+4</strong>)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-error"></span>
                    <span>Dropped Question (<strong className="text-tertiary font-bold">+4 Bonus</strong> to all attempts)</span>
                  </span>
                </div>

                {/* Grid of Answer Keys */}
                <div className="mt-6">
                  {isLoadingKeys ? (
                    <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
                      <span className="material-symbols-outlined animate-spin text-3xl text-primary">progress_activity</span>
                      <p className="mt-2 text-sm font-medium">Loading Paper Set {selectedPaper} answer key...</p>
                    </div>
                  ) : filteredKeys.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-outline-variant p-8 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-3xl">search_off</span>
                      <p className="mt-2 text-sm font-semibold">No matching questions found.</p>
                      <p className="text-xs">Try clearing your filter or searching a different question number.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-[36rem] overflow-y-auto pr-1">
                      {filteredKeys.map((item) => {
                        const borderAccent =
                          item.subject === "Physics" ? "border-l-primary" :
                          item.subject === "Chemistry" ? "border-l-tertiary" :
                          item.subject === "Botany" ? "border-l-secondary" :
                          "border-l-outline";
                        const subBg =
                          item.subject === "Physics" ? "bg-primary-fixed text-primary" :
                          item.subject === "Chemistry" ? "bg-tertiary-fixed text-tertiary" :
                          item.subject === "Botany" ? "bg-secondary-fixed text-secondary font-bold" :
                          "bg-surface-container-low text-on-surface font-semibold";

                        const subAbbr =
                          item.subject === "Physics" ? "PHY" :
                          item.subject === "Chemistry" ? "CHEM" :
                          item.subject === "Botany" ? "BOT" :
                          "ZOO";

                        const isDrop = item.answer.toLowerCase().includes("drop") || item.answer.toLowerCase().includes("bonus");
                        const isMultiAnswer = item.answer.includes(",");

                        return (
                          <div
                            key={item.questionNo}
                            className={cn(
                              "flex flex-col justify-between gap-2.5 rounded-xl border border-outline-variant bg-surface p-3 transition hover:-translate-y-0.5 hover:shadow-xs border-l-4 overflow-hidden min-w-0",
                              borderAccent,
                              isDrop && "bg-error-container/10 border-error/40 ring-1 ring-error/20"
                            )}
                          >
                            <div className="flex items-center justify-between gap-1 w-full">
                              <span className="font-mono text-xs font-bold text-on-surface">
                                Q.{item.questionNo}
                              </span>
                              <span className="text-[10px] font-semibold text-on-surface-variant uppercase">
                                Ans
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1.5 w-full pt-1.5 border-t border-outline-variant/40">
                              <span className={cn("rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider", subBg)}>
                                {subAbbr}
                              </span>
                              <div className="flex items-center justify-end shrink-0">
                                {isDrop ? (
                                  <span className="inline-flex items-center gap-0.5 rounded-md bg-error px-1.5 py-0.5 text-[10px] font-extrabold text-on-error shadow-2xs">
                                    DROP
                                  </span>
                                ) : isMultiAnswer ? (
                                  <div className="flex items-center gap-1">
                                    {item.answer.split(",").map((ans) => (
                                      <span
                                        key={ans.trim()}
                                        className="flex h-6 min-w-6 px-1 items-center justify-center rounded-md bg-amber-500 text-xs font-extrabold text-amber-950 shadow-2xs"
                                      >
                                        {ans.trim()}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-extrabold text-on-primary shadow-2xs">
                                    {item.answer}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="download-key"
              eyebrow="Offline Access"
              title="Download Official NEET UG 2026 Answer Key"
              description="Download the complete NTA answer key compilation for Paper Sets 50, 60, 70, and 80 to verify your responses offline."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <GuideCard className="flex flex-col justify-between border-primary/20 bg-primary-fixed/20">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-sm">
                        <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                      </span>
                      <div>
                        <h3 className="font-bold text-on-surface">Official Answer Key (.pdf)</h3>
                        <p className="text-xs text-on-surface-variant">Includes all 4 paper sets (50, 60, 70, 80)</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                      Download the complete official NTA provisional answer key document (PDF) covering Paper Sets 50, 60, 70, and 80 for offline verification.
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/06/20260625208933797.pdf"
                      download="NEET_UG_2026_Official_Answer_Key.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition hover:bg-primary-pressed hover:shadow-md no-underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">download</span>
                      Download Official PDF Document
                    </a>
                  </div>
                </GuideCard>

                <GuideCard className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-low text-primary ring-1 ring-outline-variant">
                        <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                      </span>
                      <div>
                        <h3 className="font-bold text-on-surface">Printable OMR Checklist</h3>
                        <p className="text-xs text-on-surface-variant">Standard NTA verification guidelines</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                      Remember to cross-reference your recorded responses on the NTA website during the challenge window. Keep your login details handy.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="https://neet.nta.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface px-5 py-3 text-sm font-bold text-on-surface transition hover:border-primary hover:text-primary no-underline cursor-pointer"
                    >
                      Open NTA Portal &rarr;
                    </Link>
                  </div>
                </GuideCard>
              </div>
            </GuideSection>

            <GuideSection
              embedded
              id="omr-answer-key"
              eyebrow="Official answer key"
              title="OMR sheet & provisional answer key"
              description="NTA usually releases the provisional key 7–10 days after the exam. View your scanned OMR and challenge within the window."
            >
              <GuideCard>
                <GuideSteps size="compact" steps={[...NEET_UG_ANSWER_KEY_OMR_STEPS]} />
                <p className="mt-5 border-t border-outline-variant pt-4 text-sm leading-relaxed text-on-surface-variant">
                  Portal:{" "}
                  <Link
                    href="https://neet.nta.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    neet.nta.nic.in
                  </Link>
                </p>
              </GuideCard>
              <GuideCard className="mt-4 border-tertiary/25 bg-tertiary-fixed/30">
                <h3 className="flex items-center gap-2 text-sm font-bold text-on-surface">
                  <span className="material-symbols-outlined text-lg text-tertiary" aria-hidden>
                    gavel
                  </span>
                  Challenging an answer key
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  {NEET_UG_ANSWER_KEY_CHALLENGE_NOTE}
                </p>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="results"
              eyebrow="Results"
              title="NEET 2026 result & scorecard"
              description="Results are expected in late July 2026 on the NTA portal. Your scorecard includes the fields below."
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {NEET_UG_ANSWER_KEY_SCORECARD_FIELDS.map((field) => (
                  <GuideCard key={field.label} className="flex flex-col gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary"
                      aria-hidden
                    >
                      <span className="material-symbols-outlined text-[22px] leading-none">
                        {field.icon}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-semibold text-on-surface">{field.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
                        {field.desc}
                      </p>
                    </div>
                  </GuideCard>
                ))}
              </div>

              <GuideCard className="mt-6">
                <h3 className="text-sm font-bold text-on-surface">How to check your result</h3>
                <div className="mt-4">
                  <GuideSteps size="compact" steps={[...NEET_UG_ANSWER_KEY_RESULT_STEPS]} />
                </div>
              </GuideCard>

              <GuideCard className="mt-4">
                <h3 className="text-sm font-bold text-on-surface">Tie-breaking criteria</h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  When two or more candidates score identical marks, NTA applies these rules in order:
                </p>
                <div className="mt-4">
                  <GuideSteps size="compact" steps={[...NEET_UG_ANSWER_KEY_TIE_BREAKING]} />
                </div>
              </GuideCard>
            </GuideSection>

            <GuideSection
              embedded
              id="cutoffs"
              eyebrow="Cut-off & qualification"
              title="Qualifying cut-off 2026 by category"
              description="Minimum qualifying percentiles per NTA rules. Below these thresholds you cannot join counselling."
            >
              <DataTable
                theme="guide"
                columns={[
                  { key: "category", label: "Category" },
                  { key: "percentile", label: "Required percentile" },
                  {
                    key: "score",
                    label: "Expected score range",
                    badge: true,
                    badgeVariant: "blue",
                  },
                  {
                    key: "intensity",
                    label: "Competition",
                    align: "right",
                    badge: true,
                    badgeColorKey: "statusColor",
                  },
                ]}
                rows={qualifyingRows}
              />

              <div className="mt-8">
                <h3 className="text-base font-bold text-on-surface">
                  Year-wise qualifying score trend (2019–2025)
                </h3>
                <p className="mt-1.5 text-sm text-on-surface-variant">
                  Score range (highest – qualifying threshold) for each category across years.
                </p>
                <div className="mt-4">
                  <DataTable
                    theme="guide"
                    columns={[
                      { key: "year", label: "Year" },
                      { key: "general", label: "General (UR/EWS)" },
                      { key: "obc", label: "OBC-NCL" },
                      { key: "scSt", label: "SC / ST" },
                      { key: "pwd", label: "PwBD (UR)" },
                    ]}
                    rows={trendRows}
                    highlightLastRow
                    scrollable
                    footnote={NEET_UG_ANSWER_KEY_CUTOFF_TREND_FOOTNOTE}
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-linear-to-br from-primary to-primary-pressed rp-brand-elevated relative overflow-hidden rounded-[1.75rem] px-6 py-8 text-on-primary ring-1 ring-on-primary/15 md:px-8">
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-on-primary/80">
                        ReNEET Rank Predictor 2026
                      </p>
                      <h3 className="mt-1 font-headline-md text-lg font-bold">
                        Know your rank from your score
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-on-primary/85">
                        Estimate your All India Rank before results and shortlist MBBS colleges by
                        category and state.
                      </p>
                    </div>
                    <Link
                      href="/reneet-rank-predictor-2026"
                      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-on-primary px-5 py-3 text-sm font-bold text-primary no-underline transition hover:bg-on-primary/90"
                    >
                      Predict your rank
                    </Link>
                  </div>
                </div>
              </div>
            </GuideSection>

            <GuideSection embedded id="related" eyebrow="More on Dravio" title="Related guides">
              <div className="grid gap-3 sm:grid-cols-2">
                {NEET_UG_ANSWER_KEY_RELATED_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(guideCardClass, hubCardHoverClass, "group block no-underline")}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="material-symbols-outlined text-2xl text-primary"
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-on-surface group-hover:text-primary">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </GuideSection>

            <GuideSection embedded id="tools-cta" eyebrow="Plan ahead" title="Start with your score or rank">
              <NeetUgHubFinalCta />
            </GuideSection>
          </div>

          <div className="hidden lg:col-start-3 lg:row-start-1 lg:mt-0 lg:block">
            <NeetUgUpdatesSidebar />
          </div>
        </div>
      </Container>
    </NeetUg2026Shell>
  );
}

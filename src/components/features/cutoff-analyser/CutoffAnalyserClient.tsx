"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type DragEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Container } from "@/components/common/Container";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import { ToolCallout } from "@/components/features/predictors/PredictorToolParts";
import { CutoffComparisonTable } from "./CutoffComparisonTable";
import { TrendChart } from "./TrendChart";
import {
  AnalyserInputChip,
  AnalyserMetricCard,
  AnalyserSectionBlock,
  AnalyserSectionBody,
  CutoffAnalyserBanner,
  CutoffAnalyserCollegeCard,
  CutoffAnalyserHero,
  CutoffAnalyserLeadMagnet,
  CutoffAnalyserResultHeader,
  CollegePredictorQuotaField,
  FilterPill,
  gapDisplay,
  GlossaryGrid,
  RankPredictorFaqSection,
  RankPredictorShell,
} from "./CutoffAnalyserParts";
import { EligibilityGlancePanel } from "./EligibilityGlancePanel";
import { CounselingTimelinePanel } from "./CounselingTimelinePanel";
import { STATUS_LABEL } from "./section-styles";
import {
  CUTOFF_ANALYSER_HERO,
  CUTOFF_ANALYSER_LEAD_MAGNET_CHOICE,
  CUTOFF_ANALYSER_LEAD_MAGNET_ROUNDS,
  CUTOFF_ANALYSER_LEAD_MAGNET_SUMMARY,
} from "@/lib/cutoff-analyser/page-content";
import {
  ANALYSER_DISCLAIMER,
  FOCUS_STATE_OPTIONS,
  NEET_SCORE_MAX,
  NEET_SCORE_MIN,
  QUOTA_OPTIONS,
} from "@/lib/cutoff-analyser/constants";
import {
  DEMO_FEE_BY_STATE,
  DEMO_INITIAL_PREFERENCE_LIST,
  DEMO_SCORE,
  filterDemoRowsByQuota,
  getDemoCutoffAnalysis,
} from "@/lib/cutoff-analyser/demo-data";
import type { FocusStateSlug, PreferenceListItem } from "@/lib/cutoff-analyser/types";
import {
  COUNSELING_SESSION_YEAR,
  COUNSELING_TIMELINE_DISCLAIMER,
  CUTOFF_FAQ,
  GLOSSARY,
  getCounselingTimeline,
} from "@/lib/cutoff-analyser/content";
import { compareCutoffStatus, statusToPreferenceTag } from "@/lib/cutoff-analyser/status";
import { getListingCategoryShortLabel } from "@/lib/colleges/listing-options";
import { cn, formatINR, formatNumber } from "@/lib/utils";
import type { NeetCategory } from "@/lib/rank-predictor/types";
import type { ListingQuota } from "@/types/filters";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

const CATEGORY_OPTIONS: { value: NeetCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "ews", label: "EWS" },
];

const DOMICILE_OPTIONS = FOCUS_STATE_OPTIONS.map((s) => ({
  value: s.slug,
  label: s.label,
}));

export function CutoffAnalyserClient() {
  const [score, setScore] = useState(DEMO_SCORE);
  const [category, setCategory] = useState<NeetCategory>("general");
  const [domicileState, setDomicileState] = useState<FocusStateSlug>("gujarat");
  const [quota, setQuota] = useState<ListingQuota>("state");
  const [collegeTypeFilter, setCollegeTypeFilter] = useState<
    "government" | "private" | "all"
  >("government");
  const [quotaTableFilter, setQuotaTableFilter] = useState<
    ListingQuota | "all"
  >("all");
  const [sortKey, setSortKey] = useState<
    "state" | "closing" | "gap" | "status"
  >("status");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [feeState, setFeeState] = useState<FocusStateSlug>("gujarat");
  const [preferenceList, setPreferenceList] = useState<PreferenceListItem[]>(
    () => [...DEMO_INITIAL_PREFERENCE_LIST]
  );
  const [analysing, setAnalysing] = useState(false);

  useEffect(() => {
    setAnalysing(true);
    const t = setTimeout(() => setAnalysing(false), 180);
    return () => clearTimeout(t);
  }, [score, category, domicileState, quota, collegeTypeFilter]);

  const result = useMemo(
    () => getDemoCutoffAnalysis({ collegeTypeFilter }),
    [collegeTypeFilter]
  );

  const counselingTimeline = useMemo(() => getCounselingTimeline(), []);

  const filteredRows = useMemo(
    () => filterDemoRowsByQuota(result.stateQuotaRows, quotaTableFilter),
    [result.stateQuotaRows, quotaTableFilter]
  );

  const mutedStateSlugs = useMemo(() => {
    if (domicileState === "maharashtra") {
      return ["gujarat"] as FocusStateSlug[];
    }
    return ["maharashtra"] as FocusStateSlug[];
  }, [domicileState]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const addToPreference = useCallback(
    (match: (typeof result.collegeMatches)[number]) => {
      setPreferenceList((prev) => {
        if (prev.some((p) => p.collegeSlug === match.college.slug)) return prev;
        return [
          ...prev,
          {
            id: match.college.slug,
            collegeSlug: match.college.slug,
            name: match.college.name,
            city: match.college.city,
            stateSlug: match.college.stateSlug,
            affiliation:
              match.college.collegeType === "government"
                ? "Government"
                : match.college.collegeType === "deemed"
                  ? "Deemed"
                  : "Private",
            closingRank: match.closingRank,
            gapToUser: match.gapToUser,
            tag: statusToPreferenceTag(match.status),
          },
        ];
      });
    },
    []
  );

  function exportCsv() {
    const rows = [...filteredRows].sort((a, b) => {
      const byStatus = compareCutoffStatus(a.status, b.status);
      if (byStatus !== 0) return byStatus;
      return a.stateName.localeCompare(b.stateName);
    });
    const header = "State,Quota,Opening,Closing,Gap,Status\n";
    const body = rows
      .map(
        (r) =>
          `${r.stateName},${r.quotaLabel},${r.openingRank ?? ""},${r.closingRank ?? ""},${r.gapToUser ?? ""},${STATUS_LABEL[r.status]}`
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cutoff-analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onDragStart(e: DragEvent, id: string) {
    e.dataTransfer.setData("text/plain", id);
  }

  function onDrop(e: DragEvent, targetId: string) {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;
    setPreferenceList((prev) => {
      const from = prev.findIndex((p) => p.id === sourceId);
      const to = prev.findIndex((p) => p.id === targetId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  const feeColleges = DEMO_FEE_BY_STATE[feeState];

  const listWarnings = useMemo(() => {
    const w: string[] = [];
    if (preferenceList.length > 0 && preferenceList.length < 5) {
      w.push("Add at least 5 colleges to reduce round risk.");
    }
    if (!preferenceList.some((p) => p.tag === "safe")) {
      w.push("No Safe colleges tagged — consider adding safer options.");
    }
    const top10 = preferenceList.slice(0, 10);
    const byState = new Map<string, number>();
    for (const p of top10) {
      byState.set(p.stateSlug, (byState.get(p.stateSlug) ?? 0) + 1);
    }
    for (const [, count] of byState) {
      if (count > 5) {
        w.push("More than 5 picks from one state in your top 10 — diversify.");
        break;
      }
    }
    return w;
  }, [preferenceList]);

  const domicileLabel =
    FOCUS_STATE_OPTIONS.find((s) => s.slug === domicileState)?.label ??
    domicileState;

  const faqItems = useMemo(
    () => CUTOFF_FAQ.map((item) => ({ q: item.question, a: item.answer })),
    []
  );

  return (
    <RankPredictorShell className="ca-page">
      <CutoffAnalyserHero>
        <div className="rp-form-stack flex flex-col gap-4">
          <Input
            label="NEET score"
            type="number"
            min={NEET_SCORE_MIN}
            max={NEET_SCORE_MAX}
            placeholder="e.g. 580"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            hint={CUTOFF_ANALYSER_HERO.submitHint}
            aria-label="NEET score"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Category"
              options={CATEGORY_OPTIONS}
              value={category}
              onValueChange={(v) => v && setCategory(v as NeetCategory)}
            />
            <Select
              label="Domicile state"
              options={DOMICILE_OPTIONS}
              value={domicileState}
              onValueChange={(v) => v && setDomicileState(v as FocusStateSlug)}
            />
          </div>
          <p className="rp-field-hint">
            Home state for counseling. Analysis still shows cutoffs for GJ, RJ, MP & MH.
          </p>
          <CollegePredictorQuotaField value={quota} onChange={setQuota} />
        </div>
      </CutoffAnalyserHero>

      <CutoffAnalyserBanner />

      <Container size="page">
        <div className="ca-results-head pt-6 md:pt-8">
          <CutoffAnalyserResultHeader referenceYear={result.referenceYear} />

          <ToolCallout variant="warn">
            <span className="font-bold text-on-surface">Sample preview.</span> Figures match the
            product spec (score {DEMO_SCORE}, AIR {formatNumber(result.userRank)}, General).
            Domicile: {domicileLabel}. All four focus states are shown in the analysis below.
          </ToolCallout>

          <div className="ca-metric-block">
            <AnalyserInputChip
              score={score}
              categoryLabel={getListingCategoryShortLabel(category)}
              statesLabel={`Domicile ${domicileLabel} · Comparing GJ, RJ, MP, MH`}
            />

            <div
              aria-live="polite"
              className={cn(
                "rp-metric-grid",
                analysing && "opacity-60 transition-opacity duration-200",
              )}
            >
              <AnalyserMetricCard
                label="Your chances"
                value={`${result.admissionProbabilityPercent}%`}
                context={result.probabilityLabel}
                progress={result.admissionProbabilityPercent}
              />
              <AnalyserMetricCard
                label="Estimated rank"
                value={formatNumber(result.userRank)}
                context={`Band ${formatNumber(result.rankRange.min)} – ${formatNumber(result.rankRange.max)}`}
              />
              <AnalyserMetricCard
                label="Safe colleges"
                value={String(result.safeCollegeCount)}
                context="Per college-type filter below"
              />
              <AnalyserMetricCard
                label="States eligible"
                value={`${result.statesEligibleCount} / ${result.statesSelectedCount}`}
                context={result.eligibleStateAbbrevs || "—"}
              />
            </div>

            {/* <CutoffAnalyserLeadMagnet
              className="ca-lead-band"
              content={CUTOFF_ANALYSER_LEAD_MAGNET_SUMMARY}
            /> */}
          </div>
        </div>

        <div className="ca-page-stack">
          <AnalyserSectionBlock
            title="How you compare"
            className="pt-8"
            description="Opening and closing ranks for Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra — all quotas (sample data)."
            actions={
              <Button
                type="button"
                variant="outline"
                size="sm"
                leadingIcon={<FiDownload aria-hidden />}
                onClick={exportCsv}
                className="rounded-xl"
              >
                Export CSV
              </Button>
            }
          >
            <AnalyserSectionBody toolbar>
              <div className="flex flex-wrap gap-2">
                {(["all", ...QUOTA_OPTIONS.map((q) => q.value)] as const).map(
                  (q) => (
                    <FilterPill
                      key={q}
                      active={quotaTableFilter === q}
                      onClick={() => setQuotaTableFilter(q)}
                    >
                      {q === "all"
                        ? "All quotas"
                        : QUOTA_OPTIONS.find((o) => o.value === q)?.label}
                    </FilterPill>
                  )
                )}
              </div>
            </AnalyserSectionBody>
            <AnalyserSectionBody flush>
              <CutoffComparisonTable
                rows={filteredRows}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={toggleSort}
              />
            </AnalyserSectionBody>
          </AnalyserSectionBlock>

          <AnalyserSectionBlock
            title="Which colleges can you get?"
            description="Ranked by likelihood at your score. Filter by institution type — quota follows your selection above."
            actions={
              <div className="flex flex-wrap gap-2">
                {(["government", "private", "all"] as const).map((t) => (
                  <FilterPill
                    key={t}
                    active={collegeTypeFilter === t}
                    onClick={() => setCollegeTypeFilter(t)}
                  >
                    {t === "all" ? "All types" : t}
                  </FilterPill>
                ))}
              </div>
            }
          >
            <AnalyserSectionBody>
              <div className="rp-tool-card-grid">
                {result.collegeMatches.slice(0, 12).map((match) => {
                  const selected = preferenceList.some(
                    (p) => p.collegeSlug === match.college.slug
                  );
                  return (
                    <CutoffAnalyserCollegeCard
                      key={match.college.slug}
                      college={match.college}
                      closingRank={match.closingRank}
                      gapToUser={match.gapToUser}
                      likelihoodPercent={match.likelihoodPercent}
                      status={match.status}
                      selected={selected}
                      onAdd={() => addToPreference(match)}
                    />
                  );
                })}
              </div>
            </AnalyserSectionBody>
          </AnalyserSectionBlock>

          <AnalyserSectionBlock
            id="college-list"
            title="Build your preference order"
            description="Drag to reorder on desktop. Tag Safe, Target, or Reach, then export or save locally."
          >
            <AnalyserSectionBody className="space-y-4">
              <p className="rp-field-hint italic">
                MCC limits AIQ choices to 20 colleges. State counseling may differ.
              </p>
              {listWarnings.map((w) => (
                <ToolCallout key={w} variant="safe">
                  {w}
                </ToolCallout>
              ))}
              <ul className="space-y-2">
                {preferenceList.map((item, index) => {
                  const gap = gapDisplay(item.gapToUser);
                  return (
                    <li
                      key={item.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => onDrop(e, item.id)}
                      className="rp-pref-row"
                    >
                      <div className="flex items-center gap-2">
                        <FiMenu
                          className="hidden h-4 w-4 text-outline sm:block"
                          aria-hidden
                        />
                        <span className="rp-pref-rank">{index + 1}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={
                            item.collegeSlug.startsWith("demo-")
                              ? "#college-list"
                              : `/colleges/${item.collegeSlug}`
                          }
                          className="font-semibold text-on-surface hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-on-surface-variant">
                          {item.city}, {item.affiliation}
                        </p>
                        <p className={cn("text-xs", gap.className)}>
                          Closing {formatNumber(item.closingRank)} · {gap.text}
                        </p>
                      </div>
                      <select
                        value={item.tag}
                        onChange={(e) =>
                          setPreferenceList((prev) =>
                            prev.map((p) =>
                              p.id === item.id
                                ? {
                                  ...p,
                                  tag: e.target.value as PreferenceListItem["tag"],
                                }
                                : p
                            )
                          )
                        }
                        className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-xs font-semibold"
                        aria-label={`Tag for ${item.name}`}
                      >
                        <option value="safe">Safe</option>
                        <option value="target">Target</option>
                        <option value="reach">Reach</option>
                      </select>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-outline transition hover:bg-error-container hover:text-error"
                        aria-label={`Remove ${item.name}`}
                        onClick={() =>
                          setPreferenceList((prev) =>
                            prev.filter((p) => p.id !== item.id)
                          )
                        }
                      >
                        <FiX />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => window.print()}
                >
                  Export / Print
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => {
                    const blob = new Blob(
                      [JSON.stringify(preferenceList, null, 2)],
                      { type: "application/json" }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "college-preferences.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Save JSON
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setPreferenceList([])}
                >
                  Clear list
                </Button>
              </div>
            </AnalyserSectionBody>
          </AnalyserSectionBlock>

          <CutoffAnalyserLeadMagnet
            className="ca-lead-band"
            content={CUTOFF_ANALYSER_LEAD_MAGNET_CHOICE}
          />

          <AnalyserSectionBlock
            title="How competition has changed"
            description="Closing rank movement across five years (illustrative aggregates — verify against official bulletins)."
          >
            <AnalyserSectionBody>
              <TrendChart />
            </AnalyserSectionBody>
          </AnalyserSectionBlock>

          <AnalyserSectionBlock
            title="Your options at a glance"
            description="Chances in Gujarat, Rajasthan, Madhya Pradesh, and Maharashtra at your estimated rank. Compare the map with the state cards."
          >
            <AnalyserSectionBody flush className="p-0">
              <EligibilityGlancePanel
                eligibility={result.stateEligibility}
                mutedStateSlugs={mutedStateSlugs}
              />
            </AnalyserSectionBody>
          </AnalyserSectionBlock>

          <CutoffAnalyserLeadMagnet
            className="ca-lead-band"
            content={CUTOFF_ANALYSER_LEAD_MAGNET_ROUNDS}
          />

          <AnalyserSectionBlock
            title="Don't miss your round"
            description="Key counseling milestones for your focus states and MCC AIQ—dates update as portals publish notices."
          >
            <AnalyserSectionBody flush className="p-0">
              <CounselingTimelinePanel
                events={counselingTimeline}
                sessionYear={COUNSELING_SESSION_YEAR}
                disclaimer={COUNSELING_TIMELINE_DISCLAIMER}
              />
            </AnalyserSectionBody>
          </AnalyserSectionBlock>



          <AnalyserSectionBlock
            title="Understand the cost"
            description="Annual fees from our catalog for each focus state."
          >
            <AnalyserSectionBody toolbar>
              <div className="flex flex-wrap gap-2">
                {FOCUS_STATE_OPTIONS.map((s) => (
                  <FilterPill
                    key={s.slug}
                    active={feeState === s.slug}
                    onClick={() => setFeeState(s.slug)}
                  >
                    {s.label}
                  </FilterPill>
                ))}
              </div>
            </AnalyserSectionBody>
            <AnalyserSectionBody flush>
              <div className="quota-table-wrap">
                <table className="quota-table">
                  <thead>
                    <tr>
                      <th className="p-3">College</th>
                      <th className="p-3">Type</th>
                      <th className="p-3 text-right">Annual fee</th>
                      <th className="p-3 text-right">Seats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeColleges.map((c) => (
                      <tr
                        key={c.slug}
                        className="border-b border-outline-variant hover:bg-surface-container-low/80"
                      >
                        <td className="p-3">
                          {c.slug.startsWith("demo-") ? (
                            <span className="font-semibold text-on-surface">
                              {c.name}
                            </span>
                          ) : (
                            <Link
                              href={`/colleges/${c.slug}`}
                              className="font-semibold text-primary hover:underline"
                            >
                              {c.name}
                            </Link>
                          )}
                        </td>
                        <td className="p-3 capitalize text-on-surface-variant">
                          {c.collegeType}
                        </td>
                        <td className="p-3 text-right tabular-nums font-semibold text-on-surface">
                          {formatINR(c.totalAnnualFee)}
                        </td>
                        <td className="p-3 text-right tabular-nums">{c.seatCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnalyserSectionBody>
          </AnalyserSectionBlock>

          <RankPredictorFaqSection items={faqItems} />
        </div>

        <section className="py-12 md:py-16">
          <span className="rp-eyebrow">Reference</span>
          <h2 className="rp-section-title">Glossary of terms</h2>
          <div className="mt-10">
            <GlossaryGrid terms={GLOSSARY} />
          </div>
        </section>

        <p className="pb-8 text-center text-xs leading-relaxed text-outline">
          {ANALYSER_DISCLAIMER}
        </p>

        <DataSourceNotice />
      </Container>
    </RankPredictorShell>
  );
}

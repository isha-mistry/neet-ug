"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import {
  featuredStateCounsellingDetails,
  stateCounsellingAuthorities,
  type StateCounsellingAuthority,
  type StateCounsellingDetail,
} from "@/lib/data/state-counselling";
import { cn } from "@/lib/utils";

const detailByStateName = new Map(
  featuredStateCounsellingDetails.map((state) => [state.name, state])
);

const typeTone = {
  Central: "bg-primary-fixed text-primary",
  State: "bg-[#dff7e8] text-[#0f7a3a]",
  UT: "bg-[#fff5cc] text-[#7a5a00]",
  Institutional: "bg-[#f1e6ff] text-[#6b21a8]",
} as const;

export function StateCounsellingView() {
  const stateCount = stateCounsellingAuthorities.filter((item) => item.type === "State").length;
  const utCount = stateCounsellingAuthorities.filter((item) => item.type === "UT").length;

  return (
    <StateCounsellingShell current="State counselling">
      <DirectoryHero authorityCount={stateCounsellingAuthorities.length} stateCount={stateCount} utCount={utCount} />
      <AuthorityTable authorities={stateCounsellingAuthorities} />
      <FeaturedStateCards />
    </StateCounsellingShell>
  );
}

export function StateCounsellingDetailView({ state }: { state: StateCounsellingDetail }) {
  return (
    <StateCounsellingShell current={state.name}>
      <DetailHero state={state} />
      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px] xl:items-start">
        <main className="flex min-w-0 flex-col gap-8">
          <OverviewBand state={state} />
          <EligibilityReservation state={state} />
          <CoursesAndSeats state={state} />
          <DocumentsMatrix state={state} />
          <ProcessTimeline state={state} />
          <RoundsAndAllotment state={state} />
          <RulesGrid state={state} />
        </main>
        <aside className="flex flex-col gap-4 xl:sticky xl:top-24">
          <FreeCounsellingLeadForm
            pageLabel={`State counselling: ${state.name}`}
            title={`Book ${state.shortName} counselling`}
            submitLabel="Book counselling"
            fields="name-phone-only"
            className="p-5 shadow-clinical-soft md:p-6"
          />
          <DetailNav currentState={state} />
          <ConnectedTools state={state} />
        </aside>
      </div>
    </StateCounsellingShell>
  );
}

function StateCounsellingShell({
  current,
  children,
}: {
  current: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-on-surface before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[520px] before:bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-primary)_14%,transparent),transparent_42%),linear-gradient(180deg,color-mix(in_srgb,var(--color-primary-fixed)_44%,transparent),transparent)]">
      <Container size="page" className="relative z-10 py-8 md:py-10">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              current === "State counselling"
                ? { label: "State counselling" }
                : { label: "State counselling", href: "/state-counselling" },
              ...(current === "State counselling" ? [] : [{ label: current }]),
            ]}
          />
        </div>
        {children}
      </Container>
    </div>
  );
}

function DirectoryHero({
  authorityCount,
  stateCount,
  utCount,
}: {
  authorityCount: number;
  stateCount: number;
  utCount: number;
}) {
  return (
    <header className="relative overflow-hidden py-4 md:py-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-label-sm font-bold uppercase tracking-wider text-primary">
            <MaterialSymbol name="map" className="text-sm" />
            NEET UG 2026 authority directory
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-on-surface md:text-6xl">
            Find the right <span className="text-primary">state counselling authority</span> before registration opens
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Use this directory to identify the counselling body for every state and UT, check
            whether the route is central, state, UT or institutional, and open detailed guides for
            Gujarat, Maharashtra, Rajasthan and Madhya Pradesh.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#authority-table" className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition hover:bg-primary-hover">
              View authority table
              <MaterialSymbol name="arrow_downward" className="text-lg" />
            </a>
            <Link href="/rank-predictor" className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-outline-variant bg-surface-container-lowest px-5 py-3 text-sm font-bold text-on-surface-variant transition hover:border-primary hover:text-primary">
              Check rank fit
              <MaterialSymbol name="query_stats" className="text-lg" />
            </Link>
          </div>
        </div>
        <div className="rounded-4xl bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-5 shadow-clinical-soft">
          <div className="flex items-center justify-between gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-on-primary">
              <MaterialSymbol name="account_balance" className="text-[30px]" />
            </span>
            <span className="rounded-full bg-surface-container-lowest px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary">
              Updated for NEET UG
            </span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <HeroStat label="Rows mapped" value={`${authorityCount}`} />
            <HeroStat label="State bodies" value={`${stateCount}`} />
            <HeroStat label="UT entries" value={`${utCount}`} />
            <HeroStat label="Full guides" value="4" />
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-container-lowest p-4">
      <div className="text-2xl font-black tracking-tight text-on-surface">{value}</div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </div>
    </div>
  );
}

function AuthorityTable({ authorities }: { authorities: readonly StateCounsellingAuthority[] }) {
  const router = useRouter();

  function openDetail(detail: StateCounsellingDetail | undefined) {
    if (!detail) return;
    router.push(`/state-counselling/${detail.key}`);
  }

  return (
    <section id="authority-table" className="mt-8 scroll-mt-28 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
      <div className="border-b border-outline-variant bg-surface-container-lowest px-5 py-4 md:px-6">
        <p className="text-[11px] font-semibold text-on-surface-variant">
          Updated for NEET UG 2026 | Sources: NMC, NTA, MCC & State Counselling Bodies
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <TypeBadge type="Central" />
          <TypeBadge type="State" />
          <TypeBadge type="UT" />
          <TypeBadge type="Institutional" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#123766] text-xs font-black uppercase tracking-[0.08em] text-white">
              <th className="w-16 px-4 py-4">S.No.</th>
              <th className="px-4 py-4">State / UT</th>
              <th className="px-4 py-4">NEET UG Counselling Authority</th>
              <th className="w-36 px-4 py-4">Type</th>
              <th className="w-44 px-4 py-4 text-right">Official Website</th>
            </tr>
          </thead>
          <tbody>
            {authorities.map((row, index) => {
              const detail = detailByStateName.get(row.state_ut);
              return (
                <tr
                  key={`${row.state_ut}-${index}`}
                  role={detail ? "button" : undefined}
                  tabIndex={detail ? 0 : undefined}
                  onClick={() => openDetail(detail)}
                  onKeyDown={(event) => {
                    if (!detail) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openDetail(detail);
                    }
                  }}
                  className={cn(
                    "border-b border-outline-variant/70 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
                    index % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low/45",
                    detail ? "cursor-pointer hover:bg-primary-fixed/55" : "hover:bg-surface-container-low"
                  )}
                >
                  <td className="px-4 py-3 font-bold text-on-surface-variant">{index + 1}</td>
                  <td className="px-4 py-3 font-extrabold text-on-surface">
                    <div className="flex items-center gap-2">
                      <span>{row.state_ut}</span>
                      {detail ? (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-on-primary">
                          Guide
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 leading-relaxed text-on-surface-variant">
                    {row.counselling_authority}
                  </td>
                  <td className="px-4 py-3">
                    <TypeBadge type={row.type} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={row.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center justify-end gap-1 font-bold text-[#24547a] hover:underline"
                    >
                      Website Link
                      <MaterialSymbol name="open_in_new" className="text-base" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TypeBadge({ type }: { type: StateCounsellingAuthority["type"] }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
        typeTone[type]
      )}
    >
      {type}
    </span>
  );
}

function FeaturedStateCards() {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {featuredStateCounsellingDetails.map((state) => (
        <Link
          key={state.key}
          href={`/state-counselling/${state.key}`}
          className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-clinical-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-clinical-hover"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary-fixed text-primary transition group-hover:bg-primary group-hover:text-on-primary">
            {state.shortName}
          </span>
          <h2 className="mt-4 text-lg font-black tracking-tight text-on-surface">
            {state.name}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
            {state.introduction}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
            Open guide
            <MaterialSymbol name="arrow_forward" className="text-base" />
          </span>
        </Link>
      ))}
    </section>
  );
}

function DetailHero({ state }: { state: StateCounsellingDetail }) {
  return (
    <header className="relative overflow-hidden py-4 md:py-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <span className="rp-eyebrow">{state.shortName} state counselling</span>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-on-surface md:text-4xl">
            {state.name} NEET UG counselling guide
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-on-surface-variant md:text-base">
            {state.introduction} This guide brings together the authority, eligible courses,
            domicile expectations, reservation signals, document groups, counselling rounds and
            reporting rules so you can plan registration and choice filling without jumping across
            multiple official notices.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={state.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition hover:bg-primary-hover">
              Official portal
              <MaterialSymbol name="open_in_new" className="text-lg" />
            </a>

          </div>
        </div>
        <div className="rounded-4xl bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-5 shadow-clinical-soft">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
            Authority
          </div>
          <p className="mt-2 text-base font-black leading-snug text-on-surface">
            {state.authority}
          </p>
          <div className="mt-6 grid gap-3">
            {state.quickOverview.slice(1).map((item) => (
              <div key={item.label} className="rounded-xl bg-surface-container-lowest p-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                  {item.label}
                </span>
                <p className="mt-1 text-sm font-extrabold text-on-surface">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function OverviewBand({ state }: { state: StateCounsellingDetail }) {
  return (
    <section id="overview" className="scroll-mt-28 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {state.quickOverview.map((item) => (
        <MetricTile key={item.label} label={item.label} value={item.value} />
      ))}
    </section>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-clinical-soft">
      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-on-surface-variant">
        {label}
      </span>
      <p className="mt-2 text-sm font-extrabold leading-relaxed text-on-surface">{value}</p>
    </div>
  );
}

function EligibilityReservation({ state }: { state: StateCounsellingDetail }) {
  const rows = [
    ["Academic", state.eligibility.academic],
    ["NEET", state.eligibility.neet],
    ["Age", state.eligibility.age],
    ["Domicile", state.eligibility.domicile],
    ["Other-state", state.eligibility.otherState],
    ["NRI", state.eligibility.nri],
  ];

  return (
    <section id="eligibility" className="scroll-mt-28 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <Panel icon="rule" title="Eligibility criteria" subtitle="Academic, NEET, age, domicile, other-state and NRI conditions.">
        <div className="overflow-hidden rounded-xl border border-outline-variant/70">
          {rows.map(([label, value], index) => (
            <div key={label} className={cn("grid gap-2 p-4 md:grid-cols-[130px_minmax(0,1fr)]", index % 2 ? "bg-surface-container-low/45" : "bg-surface-container-lowest")}>
              <div className="text-xs font-black uppercase tracking-wider text-primary">{label}</div>
              <p className="text-sm leading-relaxed text-on-surface-variant">{value}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel id="reservation" icon="category" title="Reservation policy" subtitle="State-specific category signals to verify.">
        <div className="relative border-l-2 border-primary/30 pl-5">
          {state.reservation.map((item) => (
            <div key={item.label} className="relative pb-5 last:pb-0">
              <span className="absolute left-[-27px] top-0 h-3 w-3 rounded-full bg-primary" />
              <h3 className="text-sm font-black text-on-surface">{item.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{item.value}</p>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function CoursesAndSeats({ state }: { state: StateCounsellingDetail }) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <Panel icon="school" title="Courses offered" subtitle="Course availability depends on the annual notification.">
        <div className="grid gap-3">
          {state.coursesOffered.map((course) => (
            <div key={course.title} className="rounded-2xl border border-outline-variant/60 bg-surface-container-low/45 p-4">
              <h3 className="text-sm font-black text-on-surface">{course.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{course.details}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel icon="event_seat" title="Seat categories" subtitle="Govt, state, management and NRI quota signals.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {state.seatCategories.map((category) => (
            <div key={category.label} className="rounded-[14px] bg-primary-fixed/45 p-4">
              <h3 className="text-sm font-black text-on-surface">{category.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{category.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function DocumentsMatrix({ state }: { state: StateCounsellingDetail }) {
  return (
    <section id="documents" className="scroll-mt-28">
      <Panel icon="folder_copy" title="Documents required" subtitle="Grouped into academic, NEET, identity, category, domicile and NRI docs.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {state.documents.map((group) => (
            <div key={group.group} className="rounded-2xl border border-outline-variant/60 bg-surface-container-low/45 p-4">
              <h3 className="text-sm font-black text-on-surface">{group.group}</h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-on-surface-variant">
                    <MaterialSymbol name="check" className="mt-0.5 shrink-0 text-base text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function ProcessTimeline({ state }: { state: StateCounsellingDetail }) {
  return (
    <section id="process" className="scroll-mt-28">
      <Panel icon="route" title="Counselling process" subtitle="Eight steps from registration to reporting.">
        <div className="grid gap-4 md:grid-cols-2">
          {state.process.map((step) => (
            <div key={step.step} className="flex gap-4 rounded-2xl border border-outline-variant/60 bg-surface-container-low/45 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-on-primary">
                {step.step}
              </span>
              <div>
                <h3 className="text-sm font-black text-on-surface">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function RoundsAndAllotment({ state }: { state: StateCounsellingDetail }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <Panel icon="calendar_month" title="Counselling rounds" subtitle="Round 1, Round 2, Mop-Up and Stray Vacancy.">
        <div className="space-y-3">
          {state.rounds.map((round, index) => (
            <div key={round.name} className="flex gap-3 rounded-xl bg-surface-container-low/55 p-3">
              <span className="text-sm font-black text-primary">{index + 1}</span>
              <div>
                <h3 className="text-sm font-black text-on-surface">{round.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{round.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel icon="filter_alt" title="Seat allotment factors" subtitle="What drives allotment order.">
        <div className="flex flex-wrap gap-2">
          {state.allotmentFactors.map((item) => (
            <span key={item} className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-2 text-xs font-bold text-on-surface-variant">
              {item}
            </span>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function RulesGrid({ state }: { state: StateCounsellingDetail }) {
  return (
    <section id="rules" className="scroll-mt-28 grid gap-5 lg:grid-cols-3">
      <Panel icon="payments" title="Fee structure" subtitle="Verify from the official notification.">
        <Checklist items={state.feeStructure} />
      </Panel>
      <Panel icon="gavel" title="Admission rules" subtitle="Acceptance, upgradation, exit, refund and reporting.">
        <Checklist items={state.admissionRules} />
      </Panel>
      <Panel icon="assignment_turned_in" title="Instructions" subtitle="Candidate checklist reminders.">
        <Checklist items={state.instructions} />
      </Panel>
    </section>
  );
}

function Panel({
  id,
  icon,
  title,
  subtitle,
  children,
}: {
  id?: string;
  icon: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-outline-variant pt-7">
      <div className="mb-5 flex items-start gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-primary text-on-primary">
          <MaterialSymbol name={icon} className="text-[22px]" />
        </span>
        <div>
          <h2 className="text-xl font-black tracking-tight text-on-surface md:text-2xl">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-on-surface-variant">
          <MaterialSymbol name="check_circle" className="mt-0.5 shrink-0 text-lg text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailNav({ currentState }: { currentState: StateCounsellingDetail }) {
  const items = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Eligibility" },
    { id: "reservation", label: "Reservation" },
    { id: "documents", label: "Documents" },
    { id: "process", label: "Process" },
    { id: "rules", label: "Rules" },
  ];
  const otherStates = featuredStateCounsellingDetails.filter((state) => state.key !== currentState.key);

  return (
    <nav aria-label="State counselling sections" className="rounded-2xl border border-outline-variant bg-surface-container-low p-3 shadow-clinical-soft">
      <span className="px-2 pb-1 text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
        On this page
      </span>
      <div className="mt-1 flex flex-col gap-0.5">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="rounded-xl px-3 py-2 text-sm font-bold text-on-surface-variant transition hover:bg-surface-container-lowest hover:text-primary">
            {item.label}
          </a>
        ))}
      </div>
      <div className="mt-4 border-t border-outline-variant pt-3">
        <span className="px-2 pb-1 text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
          Other states
        </span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {otherStates.map((state) => (
            <Link
              key={state.key}
              href={`/state-counselling/${state.key}`}
              className="rounded-xl bg-surface-container-lowest px-3 py-2 text-center text-sm font-black text-primary transition hover:bg-primary hover:text-on-primary"
              title={`${state.name} counselling guide`}
            >
              {state.shortName}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function ConnectedTools({ state }: { state: StateCounsellingDetail }) {
  const tools = [
    { icon: "query_stats", title: "Rank Predictor", body: "Estimate AIR and state fit before counselling starts.", href: "/rank-predictor" },
    { icon: "analytics", title: "College Predictor", body: `Shortlist ${state.name} colleges by rank and quota.`, href: "/college-predictor" },
    { icon: "table", title: "All authorities", body: "Return to the national counselling authority table.", href: "/state-counselling" },
  ];

  return (
    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-clinical-soft">
      <h2 className="text-base font-black text-on-surface">Connected tools</h2>
      <div className="mt-4 flex flex-col gap-3">
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href} className="group flex gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low/45 p-3 transition hover:border-primary/40 hover:bg-surface-container-lowest">
            <MaterialSymbol name={tool.icon} className="mt-0.5 shrink-0 text-xl text-primary" />
            <span>
              <span className="block text-sm font-extrabold text-on-surface group-hover:text-primary">{tool.title}</span>
              <span className="text-xs leading-relaxed text-on-surface-variant">{tool.body}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import {
  CHART_BARS,
  EXPERT_PANEL,
  HERO_STATS,
  LIFECYCLE_PHASES,
  METHODOLOGY_ROWS,
  SUCCESS_REGISTRY,
} from "@/lib/home-04/content";
import {
  COUNSEL_BOOK_CALL_URL,
  COUNSEL_WHATSAPP_URL,
} from "@/lib/mbbs-state/constants";
import {
  Home04DownloadReportButton,
  Home04StickyBookingStrip,
  Home04StrategySessionForm,
} from "./Home04Forms";

const sectionPad = "py-16 md:py-20 lg:py-24";
const container = "mx-auto max-w-container-max px-gutter";

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-block font-label-md text-label-md uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  );
}

export function Home04Landing() {
  return (
    <>
      <div className="overflow-x-hidden bg-surface pb-24 text-on-surface md:pb-28">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--color-outline-variant) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl" />

          <div className={`${container} relative py-14 md:py-20 lg:py-24`}>
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
              <div className="space-y-8 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-fixed/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                  </span>
                  <span className="font-label-md text-[13px] uppercase tracking-widest text-on-primary-fixed">
                    2026 Academic Advisory Phase Open
                  </span>
                </div>

                <div className="space-y-5">
                  <h1 className="font-headline-xl text-headline-xl leading-[1.08] tracking-tight md:text-[52px] lg:text-[56px]">
                    Precision Counseling for{" "}
                    <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                      Clinical Excellence
                    </span>
                  </h1>
                  <p className="max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                    Moving beyond generic advice. MedSeat provides institutional-grade
                    data analytics and strategic counseling to secure your MBBS seat in
                    high-clinical-load government institutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {HERO_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest/90 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
                    >
                      <span className="block font-stats-lg text-[28px] leading-none text-primary md:text-[32px]">
                        {stat.value}
                      </span>
                      <span className="mt-2 block text-sm text-on-surface-variant">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/cutoff-analyser"
                    className="ms-primary-glow inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-label-md text-label-md text-on-primary transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
                  >
                    Explore Seat Analytics
                    <span className="material-symbols-outlined text-lg">north_east</span>
                  </Link>
                  <Link
                    href="/mbbs-in-india"
                    className="inline-flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-6 py-3.5 font-label-md text-label-md text-primary transition-colors hover:bg-surface-container-low"
                  >
                    State Guides
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-[1.25rem] bg-gradient-to-br from-primary/30 via-surface-tint/20 to-secondary/25 opacity-80 blur-sm" />
                  <div className="relative overflow-hidden rounded-2xl border border-outline-variant/80 bg-surface-container-lowest/95 p-8 shadow-2xl backdrop-blur-md md:p-10">
                    <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary via-primary-container to-secondary" />
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                          Book Strategy Session
                        </h2>
                        <p className="mt-1 text-sm text-on-surface-variant">
                          15-minute clinical intake with a senior counselor
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-secondary-container px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-on-secondary-container">
                        Limited Slots
                      </span>
                    </div>
                    <Home04StrategySessionForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lifecycle */}
        <section className={`${sectionPad} border-y border-outline-variant/70 bg-surface-container-low`}>
          <div className={container}>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <SectionEyebrow>End-to-end roadmap</SectionEyebrow>
              <h2 className="mb-4 font-headline-lg text-headline-lg">
                The 12-Month Counseling Lifecycle
              </h2>
              <p className="text-on-surface-variant">
                A systematic approach to allotment. Every phase requires distinct data
                points and strategic interventions.
              </p>
            </div>

            <div className="relative">
              <div className="absolute top-14 right-8 left-8 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {LIFECYCLE_PHASES.map((phase, index) => (
                  <article
                    key={phase.step}
                    className="group relative flex flex-col rounded-2xl border border-outline-variant/80 border-t-4 border-t-primary bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                        <span className="material-symbols-outlined text-2xl">
                          {phase.icon}
                        </span>
                      </div>
                      <span className="font-stats-lg text-stats-lg text-primary/25">
                        {phase.step}
                      </span>
                    </div>
                    <h3 className="mb-2 font-headline-md text-[20px]">{phase.title}</h3>
                    <p className="mb-4 flex-grow text-sm leading-relaxed text-on-surface-variant">
                      {phase.body}
                    </p>
                    <ul className="space-y-1.5 border-t border-outline-variant/60 pt-4">
                      {phase.bullets.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-[13px] font-medium text-primary"
                        >
                          <span className="material-symbols-outlined text-base text-secondary">
                            check_small
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Data transparency */}
        <section className={sectionPad}>
          <div className={`${container} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
            <div className="space-y-8">
              <div>
                <SectionEyebrow>Seat-flow intelligence</SectionEyebrow>
                <h2 className="font-headline-lg text-headline-lg">
                  Clinical Data Transparency
                </h2>
              </div>
              <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                We process millions of data points from MCC and State Portals. Our
                proprietary Seat-Flow algorithm predicts closing ranks with 98%
                historical accuracy, accounting for seat increments and migration
                patterns.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-error/20 bg-error-container/30 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-lowest text-error">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <span className="block text-sm font-label-md text-on-surface-variant">
                    State Rank Inflation Index
                  </span>
                  <span className="mt-1 block font-stats-lg text-stats-lg text-error">
                    +4.2%
                  </span>
                  <p className="mt-1 text-xs text-on-surface-variant">v/s 2024 trends</p>
                </div>
                <div className="rounded-2xl border border-secondary/25 bg-secondary-container/15 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-lowest text-secondary">
                    <span className="material-symbols-outlined">water_drop</span>
                  </div>
                  <span className="block text-sm font-label-md text-on-surface-variant">
                    Private Quota Liquidity
                  </span>
                  <span className="mt-1 block font-stats-lg text-stats-lg text-secondary">
                    High
                  </span>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    Round 2 availability
                  </p>
                </div>
              </div>
              <Home04DownloadReportButton />
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary-fixed/50 to-surface-container-high/80 blur-xl" />
              <div className="relative rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-xl md:p-10">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 font-headline-md text-headline-md">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
                    Govt. seat closing rank trends
                  </h3>
                  <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-on-surface-variant">
                    AIQ vs State
                  </span>
                </div>
                <div className="relative flex h-72 items-end gap-3 rounded-xl bg-surface-container-low/80 px-4 pb-6 pt-8">
                  <div className="pointer-events-none absolute inset-x-4 top-8 bottom-16 flex flex-col justify-between">
                    {[0, 1, 2, 3].map((line) => (
                      <div key={line} className="border-t border-dashed border-outline-variant/50" />
                    ))}
                  </div>
                  {CHART_BARS.map((bar) => (
                    <div
                      key={bar.year}
                      className="relative z-10 flex flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div
                        className={`w-full max-w-[52px] rounded-t-lg shadow-sm transition-all duration-500 ${
                          bar.projected
                            ? "bg-gradient-to-t from-primary to-primary-container ring-2 ring-primary/30 ring-offset-2 ring-offset-surface-container-low"
                            : "bg-gradient-to-t from-primary-container to-primary-fixed"
                        }`}
                        style={{ height: bar.height }}
                      />
                      <span
                        className={`text-xs font-bold ${bar.projected ? "text-primary" : "text-on-surface-variant"}`}
                      >
                        {bar.year}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-on-surface-variant">
                  <span>Y-axis: AIR cut-off density</span>
                  <span className="text-primary">*Projected, inflation-adjusted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className={`${sectionPad} bg-inverse-surface text-inverse-on-surface`}>
          <div className={container}>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <SectionEyebrow>Why MedSeat</SectionEyebrow>
              <h2 className="font-headline-lg text-headline-lg">
                Value Methodology Framework
              </h2>
              <p className="mt-3 text-inverse-on-surface/75">
                MedSeat Clinical Standards vs industry norms
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04]">
                      <th className="px-6 py-5 font-headline-md text-headline-md">
                        Key attribute
                      </th>
                      <th className="px-6 py-5 font-headline-md text-headline-md text-white/50">
                        Generic agency
                      </th>
                      <th className="bg-secondary/10 px-6 py-5 font-headline-md text-headline-md text-secondary-fixed">
                        MedSeat Clinical
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {METHODOLOGY_ROWS.map((row, i) => (
                      <tr
                        key={row.attribute}
                        className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}
                      >
                        <td className="px-6 py-5 font-semibold">{row.attribute}</td>
                        <td className="px-6 py-5 text-white/55">{row.generic}</td>
                        <td className="bg-secondary/5 px-6 py-5 font-medium text-inverse-on-surface">
                          <span className="inline-flex items-start gap-2">
                            <span className="material-symbols-outlined mt-0.5 text-lg text-secondary-fixed">
                              verified
                            </span>
                            {row.clinical}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Expert panel */}
        <section className={`${sectionPad} bg-gradient-to-b from-surface to-surface-container-low`}>
          <div className={container}>
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <SectionEyebrow>Advisory board</SectionEyebrow>
                <h2 className="font-headline-lg text-headline-lg">The Expert Panel</h2>
                <p className="mt-2 text-on-surface-variant">
                  Institutional veterans and senior counselors who have managed
                  thousands of successful allotments.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 rounded-xl border border-primary/20 bg-primary-fixed/40 px-5 py-2.5 font-label-md text-label-md text-primary transition-colors hover:bg-primary-fixed"
              >
                Full panel directory
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {EXPERT_PANEL.map((expert) => (
                <article
                  key={expert.name}
                  className="group overflow-hidden rounded-2xl border border-outline-variant/80 bg-surface-container-lowest shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative h-28 bg-gradient-to-br from-primary-fixed to-surface-container-high" />
                  <div className="relative px-6 pb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={expert.image}
                      alt=""
                      className="-mt-14 mb-4 h-24 w-24 rounded-2xl border-4 border-surface-container-lowest object-cover shadow-lg grayscale transition-all duration-500 group-hover:grayscale-0"
                      width={96}
                      height={96}
                    />
                    <h3 className="font-headline-md text-[18px]">{expert.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary">
                      {expert.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                      {expert.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Success registry */}
        <section className={`${sectionPad} bg-surface-container-lowest`}>
          <div className={container}>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <SectionEyebrow>Verified outcomes</SectionEyebrow>
              <h2 className="mb-3 font-headline-lg text-headline-lg">
                2025 Success Registry
              </h2>
              <p className="text-on-surface-variant">
                Real placements, verified by institutional allotment letters.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SUCCESS_REGISTRY.map((item) => (
                <div
                  key={item.rank}
                  className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface p-6 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <span className="pointer-events-none absolute -top-4 -right-2 font-stats-lg text-[64px] leading-none text-primary/[0.06]">
                    #
                  </span>
                  <div className="relative font-stats-lg text-stats-lg text-primary">
                    {item.rank}
                  </div>
                  <div className="relative mt-2 text-base font-bold">{item.institute}</div>
                  <div className="relative mt-3 inline-flex rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-on-primary-fixed-variant">
                    {item.quota}
                  </div>
                  <div className="relative mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-secondary-container/40 text-secondary transition-colors group-hover:bg-secondary-container">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pb-8 md:pb-12">
          <div className={container}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-primary px-8 py-12 text-on-primary shadow-2xl md:px-14 md:py-16">
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="relative mx-auto max-w-2xl text-center">
                <h2 className="font-headline-lg text-headline-lg md:text-headline-xl">
                  Ready for a clinical-grade counseling strategy?
                </h2>
                <p className="mt-4 text-on-primary/85">
                  Pair live seat-matrix data with an advisor who understands state
                  quotas, bonds, and round dynamics.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    href={COUNSEL_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    WhatsApp an advisor
                  </Link>
                  <Link
                    href={COUNSEL_BOOK_CALL_URL}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-bold backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    Book a free call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Home04StickyBookingStrip />
    </>
  );
}

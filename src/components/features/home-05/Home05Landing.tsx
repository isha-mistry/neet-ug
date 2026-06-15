import type { ReactNode } from "react";
import Link from "next/link";
import {
  DIY_PAIN_POINTS,
  EXPERT_PATH_POINTS,
  HERO_TRUST_STATS,
  HOME_05_HERO_IMAGE,
  MILESTONES,
  NEWS_UPDATES,
  PREDICTOR_METRICS,
  STATE_NUANCES,
  STRATEGY_PILLARS,
  WHITEPAPERS,
} from "@/lib/home-05/content";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import {
  Home05AdmissionForm,
  Home05PlaybookForm,
  Home05WhitepaperButton,
} from "./Home05Forms";
import { Home05StateHub } from "./Home05StateHub";

const sectionPad = "py-16 md:py-20 lg:py-24";
const container = "ms-layout-page";

const dotGridStyle = {
  backgroundImage:
    "radial-gradient(circle at 1px 1px, var(--color-outline-variant) 1px, transparent 0)",
  backgroundSize: "28px 28px",
} as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-block font-label-md text-label-md uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  );
}

function MilestoneDot({ active }: { active: boolean }) {
  return (
    <div
      className={`h-4 w-4 shrink-0 rounded-full border-4 border-surface ${
        active ? "bg-primary shadow-[0_0_0_4px] shadow-primary/20" : "bg-outline-variant"
      }`}
    />
  );
}

export function Home05Landing() {
  return (
    <div className="overflow-x-hidden bg-surface pb-20 text-on-surface md:pb-24">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.32]"
          style={dotGridStyle}
        />
        <div className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 h-[360px] w-[360px] rounded-full bg-secondary/10 blur-3xl" />

        <div className={`${container} relative py-14 md:py-20 lg:py-24`}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-8 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary-container/35 px-4 py-2 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                <span className="font-label-md text-[13px] uppercase tracking-widest text-secondary">
                  2026 admissions open
                </span>
              </div>

              <div className="space-y-5">
                <h1 className="font-headline-xl text-headline-xl leading-[1.08] tracking-tight md:text-[48px] lg:text-[52px]">
                  Predict Your{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                    Medical Future
                  </span>{" "}
                  with Precision.
                </h1>
                <p className="max-w-xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                  Ditch the guesswork. Use India&apos;s most advanced AI-driven NEET 2026
                  predictor to map your path to top Government and Private colleges.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {HERO_TRUST_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest/90 p-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
                  >
                    <p className="font-stats-lg text-stats-lg text-primary">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium text-on-surface-variant">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="max-w-md rounded-2xl border border-outline-variant/70 bg-surface-container-lowest/95 p-6 shadow-lg shadow-primary/5 ring-1 ring-primary/5 backdrop-blur-md">
                <h2 className="mb-1 font-headline-md text-headline-md">
                  Check admission chances
                </h2>
                <p className="mb-4 text-sm text-on-surface-variant">
                  Takes under a minute — opens the full college predictor.
                </p>
                <Home05AdmissionForm />
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-outline-variant/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HOME_05_HERO_IMAGE}
                  alt="Medical professional in clinical setting"
                  className="aspect-[4/5] h-auto w-full object-cover md:aspect-auto"
                  width={640}
                  height={720}
                />
                <div className="absolute top-4 right-4 max-w-[200px] rounded-2xl border border-primary/15 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                  <p className="mb-1 text-sm text-on-surface-variant">
                    2026 prediction accuracy
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-stats-lg text-stats-lg text-primary">99.8%</span>
                    <span className="text-xs font-bold text-secondary">+2.1% YoY</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-primary/95 p-4 text-on-primary shadow-xl backdrop-blur-sm">
                  <div className="rounded-xl bg-white/20 p-2">
                    <span className="material-symbols-outlined text-2xl">groups</span>
                  </div>
                  <div>
                    <p className="font-stats-lg text-stats-lg leading-none">45k+</p>
                    <p className="text-sm opacity-90">Students guided</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State hub */}
      <section className={`${sectionPad} border-y border-outline-variant/50 bg-surface-container-low`}>
        <div className={container}>
          <Home05StateHub />
        </div>
      </section>

      {/* Nuances */}
      <section className={sectionPad}>
        <div className={container}>
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Regulatory depth</Eyebrow>
            <h2 className="font-headline-lg text-headline-lg">State-Specific Nuances</h2>
            <p className="mt-2 text-on-surface-variant">
              Critical regulatory differences that impact your choice beyond the rank.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STATE_NUANCES.map((block) => (
              <div
                key={block.state}
                className="group rounded-2xl border border-outline-variant/80 bg-gradient-to-b from-surface-container to-surface-container-low p-6 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-headline-md text-headline-md text-primary">
                    {block.state}
                  </h3>
                  <span className="material-symbols-outlined text-primary/40 transition-colors group-hover:text-primary">
                    map
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  {block.items.map((item) => (
                    <li key={item.label} className="flex gap-2">
                      <span className="shrink-0 font-bold text-secondary">
                        {item.label}:
                      </span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy framework */}
      <section className={`${sectionPad} bg-surface-container-highest`}>
        <div className={`${container} flex flex-col items-center gap-12 lg:flex-row lg:gap-16`}>
          <div className="w-full space-y-8 lg:w-1/2">
            <div>
              <Eyebrow>Institutional value</Eyebrow>
              <h2 className="font-headline-xl text-headline-xl leading-tight">
                Beyond the Rank:
                <br />
                <span className="text-primary">Our Strategic Framework</span>
              </h2>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Rank is just one variable. Our algorithm weights four critical pillars to
              determine institutional value for your specific career path.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STRATEGY_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-outline-variant/70 bg-surface p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-2 font-bold text-primary">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                      <span className="material-symbols-outlined text-lg">
                        {pillar.icon}
                      </span>
                    </span>
                    {pillar.title}
                  </div>
                  <p className="text-xs leading-relaxed text-on-surface-variant">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-primary p-8 shadow-2xl md:p-10">
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="font-label-md text-on-primary">Predictor multiplier</span>
                  <span className="font-stats-lg text-stats-lg text-secondary-fixed">
                    x1.42
                  </span>
                </div>
                {PREDICTOR_METRICS.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-secondary-fixed transition-all"
                        style={{ width: metric.width }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-on-primary/70">
                      <span>{metric.label}</span>
                      <span className="font-semibold text-on-primary">{metric.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={sectionPad}>
        <div className={container}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow>2026 schedule</Eyebrow>
            <h2 className="font-headline-lg text-headline-lg">2026 Counseling Milestones</h2>
            <p className="mt-2 text-on-surface-variant">
              Estimated interactive schedule based on 5-year trends.
            </p>
          </div>

          <div className="relative space-y-0 md:hidden">
            {MILESTONES.map((m, index) => (
              <div
                key={m.title}
                className="relative flex gap-4 pb-10 last:pb-0"
              >
                {index < MILESTONES.length - 1 ? (
                  <div className="absolute top-5 left-[7px] h-[calc(100%-12px)] w-0.5 bg-outline-variant" />
                ) : null}
                <div className="relative z-10 pt-0.5">
                  <MilestoneDot active={m.active} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm font-bold text-primary">{m.period}</p>
                  <h3 className="mt-0.5 font-headline-md text-headline-md">{m.title}</h3>
                  {"body" in m && m.body ? (
                    <p className="mt-2 text-sm text-on-surface-variant">{m.body}</p>
                  ) : null}
                  {"badge" in m && m.badge ? (
                    <span className="mt-2 inline-block rounded-full bg-tertiary-container/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tertiary">
                      {m.badge}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="relative hidden grid-cols-5 gap-4 md:grid">
            <div className="absolute top-8 right-4 left-4 h-0.5 bg-outline-variant" />
            {MILESTONES.map((m) => (
              <div key={m.title} className="relative pt-8 text-center">
                <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2">
                  <MilestoneDot active={m.active} />
                </div>
                <p className="text-sm font-bold text-primary">{m.period}</p>
                <h3 className="mt-1 font-headline-md text-headline-md">{m.title}</h3>
                {"body" in m && m.body ? (
                  <p className="mt-2 text-xs text-on-surface-variant">{m.body}</p>
                ) : null}
                {"badge" in m && m.badge ? (
                  <span className="mt-2 inline-block rounded-full bg-tertiary-container/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tertiary">
                    {m.badge}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepapers */}
      <section className={`${sectionPad} bg-surface-container`}>
        <div className={container}>
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Research library</Eyebrow>
              <h2 className="font-headline-lg text-headline-lg">Premium Whitepapers</h2>
              <p className="mt-1 text-on-surface-variant">
                Peer-reviewed strategy guides for serious aspirants.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 font-label-md text-primary hover:underline"
            >
              View all resources
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {WHITEPAPERS.map((paper, index) => (
              <article
                key={paper.title}
                className="group flex flex-col rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined">{paper.icon}</span>
                </div>
                <p className="mb-1 text-xs font-bold text-outline">0{index + 1}</p>
                <h3 className="mb-2 font-headline-md text-headline-md">{paper.title}</h3>
                <p className="mb-6 flex-grow text-sm text-on-surface-variant">
                  {paper.body}
                </p>
                <Home05WhitepaperButton topic={paper.topic} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage */}
      <section className={sectionPad}>
        <div className={container}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow>Compare paths</Eyebrow>
            <h2 className="font-headline-lg text-headline-lg">The MedSeat Advantage</h2>
            <p className="mt-2 text-on-surface-variant">
              Why thousands of parents and students trust our analytical precision over
              guesswork.
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div className="hidden w-px bg-outline-variant md:absolute md:top-0 md:bottom-0 md:left-1/2 md:block" />
            <div className="space-y-6 rounded-2xl border border-error/15 bg-error-container/10 p-6 md:p-8">
              <div className="flex items-center gap-3 text-error">
                <span className="material-symbols-outlined text-3xl">warning</span>
                <h3 className="font-headline-md text-headline-md">DIY Counseling</h3>
              </div>
              <ul className="space-y-3">
                {DIY_PAIN_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 rounded-xl border-l-4 border-error/40 bg-surface/60 p-4"
                  >
                    <span className="material-symbols-outlined shrink-0 text-error">
                      close
                    </span>
                    <p className="text-sm text-on-surface-variant">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 rounded-2xl border border-secondary/20 bg-secondary-container/15 p-6 md:p-8 md:shadow-md">
              <div className="flex items-center gap-3 text-secondary">
                <span className="material-symbols-outlined text-3xl">verified</span>
                <h3 className="font-headline-md text-headline-md">Expert MedSeat Path</h3>
              </div>
              <ul className="space-y-3">
                {EXPERT_PATH_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 rounded-xl border-l-4 border-secondary bg-surface/70 p-4"
                  >
                    <span className="material-symbols-outlined shrink-0 text-secondary">
                      check_circle
                    </span>
                    <p className="text-sm text-on-surface">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust pledge */}
      <section className="border-y border-outline-variant bg-surface-container-low py-16 md:py-20">
        <div className={`${container} mx-auto max-w-3xl text-center`}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-fixed text-primary shadow-sm">
            <span className="material-symbols-outlined text-4xl">shield_lock</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg">The Ethical Counseling Pledge</h2>
          <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
            We believe in absolute transparency. Your data is encrypted with
            enterprise-grade security, and our counselors follow a strict no hidden
            commissions policy. Every recommendation is purely data-driven.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 rounded-full border border-outline-variant/60 bg-surface px-4 py-2">
              <span className="material-symbols-outlined text-primary">gpp_good</span>
              <span className="font-label-md">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-outline-variant/60 bg-surface px-4 py-2">
              <span className="material-symbols-outlined text-primary">policy</span>
              <span className="font-label-md">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Updates + playbook */}
      <section className={`${sectionPad} bg-surface-container`}>
        <div className={`${container} grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12`}>
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                <span className="material-symbols-outlined">campaign</span>
              </span>
              <h2 className="font-headline-lg text-headline-lg">Latest 2026 Updates</h2>
            </div>
            <div className="space-y-4">
              {NEWS_UPDATES.map((item) => (
                <Link
                  key={item.title}
                  href="/blog"
                  className="flex gap-5 rounded-2xl border border-outline-variant/80 bg-surface-container-lowest p-5 transition-all hover:border-primary/30 hover:shadow-md md:hover:translate-x-0.5"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-fixed text-primary">
                    <span className="text-xs font-bold">{item.month}</span>
                    <span className="font-headline-md text-headline-md leading-none">
                      {item.day}
                    </span>
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary-container/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-headline-md text-headline-md">{item.title}</h3>
                    <p className="mt-1 text-sm text-on-surface-variant">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-primary p-8 text-on-primary shadow-2xl lg:sticky lg:top-24 lg:h-fit">
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <h3 className="relative mb-3 font-headline-lg text-headline-lg leading-tight">
              NEET Counseling Playbook
            </h3>
            <p className="relative mb-8 text-sm text-on-primary/90">
              Get the 2026 Edition: 150+ pages of college rankings, bond details, and a
              step-by-step preference filling guide.
            </p>
            <Home05PlaybookForm />
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
                Ready to predict your seat with clinical precision?
              </h2>
              <p className="mt-4 text-on-primary/85">
                Start with the college predictor, then layer in state nuance and counselor
                support when rounds go live.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/college-predictor"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined">analytics</span>
                  Run college predictor
                </Link>
                <Link
                  href={COUNSEL_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-bold backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Talk to an advisor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

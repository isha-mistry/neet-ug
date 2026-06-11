import Link from "next/link";
import {
  ANALYTICAL_TOOLS,
  COMPARISON_ROWS,
  HERO_STATS,
  PLAYBOOK_BULLETS,
  PROBLEM_CARDS,
  TESTIMONIALS,
} from "@/lib/home-02/content";
import {
  COUNSEL_BOOK_CALL_URL,
  COUNSEL_WHATSAPP_URL,
} from "@/lib/mbbs-state/constants";
import { Home02PlaybookForm, Home02ScoreCheckerForm } from "./Home02Forms";

const sectionPad = "py-stack-lg";
const container = "mx-auto max-w-container-max px-gutter";

function GoldStars() {
  return (
    <div className="flex text-[#FFD700]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-base"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export function Home02Landing() {
  return (
    <div className="overflow-x-hidden bg-background text-on-surface">
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-stack-lg">
        <div
          className={`${container} grid grid-cols-1 items-center gap-12 lg:grid-cols-2`}
        >
          <div className="z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-container px-2 py-1 font-label-md text-label-md text-on-secondary-container">
              <span className="material-symbols-outlined text-base">verified</span>
              NEET 2026 Counseling Authority
            </div>
            <h1 className="mb-4 font-headline-xl text-headline-xl text-on-background">
              The Data-Driven Path to Your{" "}
              <span className="text-primary">Dream Medical College</span>
            </h1>
            <p className="mb-12 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              Navigate ACPUGMEC, RUHS, DMER, and more with clinical precision. We
              replace counseling anxiety with 2026-updated seat matrix data and
              expert choice-filling strategies.
            </p>
            <div className="mb-12 flex flex-wrap items-center gap-6">
              {HERO_STATS.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {index > 0 ? (
                    <div className="hidden h-10 w-px self-center bg-outline-variant sm:block" />
                  ) : null}
                  <div className="flex flex-col">
                    <span className="font-stats-lg text-stats-lg text-primary">
                      {stat.value}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/cutoff-analyser"
                className="group ms-primary-glow inline-flex items-center gap-2 rounded-lg bg-primary px-12 py-4 font-label-md text-label-md text-on-primary transition-all hover:bg-primary-hover"
              >
                Check My Chances
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/home/1"
                className="rounded-lg border border-outline bg-white px-12 py-4 font-label-md text-label-md text-on-surface transition-all hover:bg-surface-container-low"
              >
                View Packages
              </Link>
            </div>
          </div>
          <div className="relative z-10">
            <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md">
                  2026 Score Checker
                </h2>
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>
              </div>
              <Home02ScoreCheckerForm />
            </div>
            <div className="absolute -top-10 -right-10 -z-10 h-full w-full rounded-full bg-primary-container/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className={`${sectionPad} bg-surface-container-low`}>
        <div className={container}>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-headline-lg text-headline-lg">
              Why a Good Rank Isn&apos;t Enough
            </h2>
            <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              Getting the score is only half the battle. The counseling process is
              designed to be complex; a single error can cost you a year.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROBLEM_CARDS.map((card) => (
              <div
                key={card.title}
                className={`rounded-xl border-t-4 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${card.borderClass}`}
              >
                <span
                  className={`material-symbols-outlined mb-4 text-4xl ${card.iconClass}`}
                >
                  {card.icon}
                </span>
                <h3 className="mb-2 font-headline-md text-headline-md">
                  {card.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className={sectionPad}>
        <div className={container}>
          <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-4 font-headline-lg text-headline-lg">
                Clinical-Grade Analytical Tools
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Empower your decision-making with the same data engine used by
                professional medical consultants.
              </p>
            </div>
            <Link
              href="/cutoff-analyser"
              className="flex items-center gap-2 font-bold text-primary hover:underline"
            >
              View All Tools
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ANALYTICAL_TOOLS.map((tool) => (
              <div
                key={tool.title}
                className="group flex h-full flex-col justify-between rounded-xl border border-outline-variant bg-white p-6 transition-all hover:border-primary"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container transition-colors group-hover:bg-primary-fixed">
                    <span className="material-symbols-outlined text-primary">
                      {tool.icon}
                    </span>
                  </div>
                  <h3 className="mb-2 font-label-md text-label-md font-bold">
                    {tool.title}
                  </h3>
                  <p className="mb-4 text-sm text-on-surface-variant">
                    {tool.body}
                  </p>
                </div>
                <Link
                  href={tool.href}
                  className="w-full rounded bg-surface-container py-2 text-center font-bold text-primary transition-all group-hover:bg-primary group-hover:text-white"
                >
                  {tool.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet — bg on section (not negative z) so it isn’t hidden behind layout main */}
      <section
        className={`${sectionPad} relative overflow-hidden bg-primary text-on-primary`}
      >
        <div
          className={`${container} relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2`}
        >
          <div>
            <h2 className="mb-4 font-headline-xl text-headline-xl text-on-primary">
              Free Download: NEET 2026 Counseling Playbook
            </h2>
            <p className="mb-12 font-body-lg text-body-lg text-on-primary/90">
              A 45-page comprehensive guide covering state-wise eligibility, bond
              structures, and seat increment predictions for 2026.
            </p>
            <ul className="space-y-4">
              {PLAYBOOK_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="material-symbols-outlined shrink-0 text-secondary-fixed">
                    check_circle
                  </span>
                  <span className="text-on-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-12 shadow-2xl">
            <Home02PlaybookForm />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={sectionPad}>
        <div className={container}>
          <h2 className="mb-12 text-center font-headline-lg text-headline-lg">
            Students We&apos;ve Guided to Success
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm transition-all hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    className="h-16 w-16 rounded-full border-2 border-primary-fixed object-cover"
                    width={64}
                    height={64}
                  />
                  <div>
                    <p className="font-label-md text-label-md font-bold">
                      {item.name}
                    </p>
                    <GoldStars />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="rounded bg-surface-container px-2 py-1 text-xs font-bold text-primary">
                    {item.allotted}
                  </span>
                </div>
                <p className="font-body-md text-body-md italic text-on-surface-variant">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold text-on-surface">
                  {item.score}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className={`${sectionPad} bg-surface-container-lowest`}>
        <div className={container}>
          <h2 className="mb-12 text-center font-headline-lg text-headline-lg">
            The MedSeat Advantage
          </h2>
          <div className="overflow-x-auto rounded-xl border border-outline-variant bg-white shadow-lg">
            <table className="w-full border-collapse text-left">
              <thead className="bg-surface-container">
                <tr>
                  <th className="p-6 font-label-md text-label-md text-on-surface-variant">
                    Feature
                  </th>
                  <th className="p-6 font-label-md text-label-md text-on-surface-variant">
                    Counseling Alone
                  </th>
                  <th className="p-6 font-label-md text-label-md font-bold text-primary">
                    With MedSeat Guidance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-6 font-bold">{row.feature}</td>
                    <td className="p-6 text-on-surface-variant">{row.alone}</td>
                    <td className="bg-primary/5 p-6 font-medium text-primary">
                      {row.expert}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={sectionPad}>
        <div className={container}>
          <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-primary p-12 text-center text-on-primary shadow-[var(--shadow-primary-glow)]">
            <div className="relative z-10">
              <h2 className="mb-4 font-headline-xl text-headline-xl">
                Your NEET Rank Deserves the Right College
              </h2>
              <p className="mx-auto mb-12 max-w-2xl font-body-lg text-body-lg text-on-primary/90">
                Don&apos;t let procedural complexity stand between you and your white
                coat. Speak to an expert today.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href={COUNSEL_BOOK_CALL_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-12 py-6 font-label-md text-label-md font-bold text-primary shadow-xl transition-all hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">call</span>
                  Book Free 15-Min Call
                </Link>
                <Link
                  href={COUNSEL_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-12 py-6 font-label-md text-label-md font-bold text-white shadow-xl transition-all hover:opacity-90"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Message on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import {
  COMPARISON_ROWS,
  CREDIBILITY_STATS,
  FREE_TOOLS,
  HOME_01_FAQ,
  NEWS_ITEMS,
  PRICING_PLANS,
  PROBLEM_CARDS,
  PROCESS_STEPS,
  STATE_COVERAGE,
  STATE_HUBS,
  TESTIMONIALS,
} from "@/lib/home-01/content";
import {
  COUNSEL_BOOK_CALL_URL,
  COUNSEL_WHATSAPP_URL,
} from "@/lib/mbbs-state/constants";
import {
  Home01EligibilityForm,
  Home01MobileFab,
  Home01PlaybookForm,
} from "./Home01Forms";

const sectionPad = "py-stack-lg";
const container = "mx-auto max-w-container-max px-gutter";

function StarRow() {
  return (
    <div className="mb-2 flex gap-1 text-tertiary">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export function Home01Landing() {
  return (
    <>
      <div className="overflow-x-hidden bg-background text-on-surface">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-surface to-surface-container-low pt-12 pb-stack-lg">
          <div
            className={`${container} relative z-10 grid items-center gap-12 md:grid-cols-2`}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary-container/10 px-2 py-1 text-primary">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  NEET 2026 Ready
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface">
                Don&apos;t Let a Good NEET Rank{" "}
                <span className="text-primary">Go to Waste</span>
              </h1>
              <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
                We help NEET students navigate ACPUGMEC, RUHS, DMAT, and CET Cell
                counseling to secure the best possible MBBS seat across Gujarat,
                Rajasthan, MP, and Maharashtra.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/cutoff-analyser"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-12 py-4 font-label-md text-label-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-95"
                >
                  Start Predictor
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link
                  href="/mbbs-in-india"
                  className="rounded-lg border-2 border-primary px-12 py-4 font-label-md text-label-md text-primary transition-all hover:bg-primary/5"
                >
                  View State Guides
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-outline-variant/80 border-t-4 border-t-primary bg-white/80 p-12 shadow-[0_4px_20px_-4px_rgba(0,82,204,0.08)] backdrop-blur-md">
              <h2 className="mb-6 font-headline-md text-headline-md text-on-surface">
                Instant Eligibility Check
              </h2>
              <Home01EligibilityForm />
            </div>
          </div>
        </section>

        {/* State coverage */}
        <section className="bg-surface-container py-12">
          <div className={container}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATE_COVERAGE.map((state) => (
                <div
                  key={state.code}
                  className={`rounded-xl border-l-4 bg-white p-6 shadow-sm ${state.borderClass}`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className={`font-headline-md text-headline-md ${state.codeClass}`}
                    >
                      {state.code}
                    </span>
                    <span
                      className={`rounded px-1 py-0.5 text-xs font-bold uppercase ${state.badgeClass}`}
                    >
                      {state.authority}
                    </span>
                  </div>
                  <p className="mb-1 text-sm text-on-surface-variant">
                    Total MBBS Seats
                  </p>
                  <p className="font-stats-lg text-stats-lg text-on-surface">
                    {state.seats}
                  </p>
                  <p className="mt-2 text-xs text-on-surface-variant">
                    {state.colleges}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className={sectionPad}>
          <div className={container}>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-headline-lg text-headline-lg text-on-surface">
                A Good NEET Rank Is Not Enough
              </h2>
              <p className="mx-auto max-w-2xl text-on-surface-variant">
                Thousands of students miss out on better colleges every year due
                to avoidable errors in the counseling process.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {PROBLEM_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-outline-variant bg-white p-6 transition-colors hover:border-error/30"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-error">
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <h3 className="mb-2 font-headline-md text-headline-md">
                    {card.title}
                  </h3>
                  <p className="text-on-surface-variant">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className={`${sectionPad} bg-surface-container-low`}>
          <div className={container}>
            <div className="mb-12 text-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                How We Help You Get the Right Seat
              </h2>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-outline-variant lg:block" />
              <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="z-10 flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
                      {step.step}
                    </div>
                    <h3 className="mb-2 font-headline-md text-headline-md">
                      {step.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Free tools */}
        <section className={sectionPad}>
          <div className={container}>
            <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Free Tools for 2026 Aspirants
                </h2>
                <p className="text-on-surface-variant">
                  Empowering you with data from MCC and state authorities.
                </p>
              </div>
              <Link
                href="/cutoff-analyser"
                className="inline-flex items-center gap-1 font-label-md text-label-md text-primary"
              >
                View All Tools
                <span className="material-symbols-outlined">open_in_new</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {FREE_TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group cursor-pointer rounded-xl border border-outline-variant p-6 transition-all hover:bg-surface-container-low hover:shadow-lg"
                >
                  <span
                    className="material-symbols-outlined mb-4 text-primary"
                    style={{ fontSize: 32 }}
                  >
                    {tool.icon}
                  </span>
                  <h3 className="mb-2 font-headline-md text-headline-md text-on-surface transition-colors group-hover:text-primary">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant">{tool.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* State hubs */}
        <section className={`${sectionPad} bg-surface-container`}>
          <div className={container}>
            <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-on-surface">
              State Admission Insights
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {STATE_HUBS.map((hub) => (
                <div key={hub.code} className="rounded-xl bg-white p-12 shadow-sm">
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-lg bg-surface-container text-2xl font-bold ${hub.codeClass}`}
                    >
                      {hub.code}
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md">
                        {hub.title}
                      </h3>
                      <p className="text-sm uppercase tracking-wide text-on-surface-variant">
                        {hub.authority}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {hub.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded bg-surface-container-low p-2"
                      >
                        <span className="block font-bold">{stat.value}</span>
                        <span className="text-on-surface-variant">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={hub.href}
                    className={`mt-6 block w-full rounded-lg border py-2 text-center transition-colors ${hub.ctaClass}`}
                  >
                    {hub.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={sectionPad}>
          <div className={container}>
            <div className="mb-12 text-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Expert Counseling That Pays for Itself
              </h2>
              <p className="mx-auto max-w-xl text-on-surface-variant">
                Avoiding one mistake in college selection can save you lakhs in
                tuition fees or bond penalties.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border bg-white p-12 ${
                    plan.featured
                      ? "scale-105 border-2 border-primary shadow-xl shadow-primary/10"
                      : "border-outline-variant"
                  }`}
                >
                  {plan.featured ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-1 text-xs font-bold uppercase text-on-primary">
                      Most Popular
                    </div>
                  ) : null}
                  <h3 className="mb-1 font-headline-md text-headline-md">
                    {plan.name}
                  </h3>
                  <p className="mb-6 text-sm text-on-surface-variant">
                    {plan.subtitle}
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-on-surface-variant">{plan.period}</span>
                  </div>
                  <ul className="mb-12 flex-grow space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-1 text-sm ${index === 0 && plan.featured ? "font-bold" : ""}`}
                      >
                        <span className="material-symbols-outlined text-sm text-secondary">
                          check_circle
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.primary ? COUNSEL_WHATSAPP_URL : COUNSEL_BOOK_CALL_URL}
                    target={plan.primary ? "_blank" : undefined}
                    rel={plan.primary ? "noopener noreferrer" : undefined}
                    className={`w-full rounded-lg py-4 text-center font-bold ${
                      plan.primary
                        ? "bg-primary text-on-primary hover:opacity-90"
                        : "border-2 border-primary text-primary hover:bg-primary/5"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead magnet */}
        <section className={`${sectionPad} bg-primary text-on-primary`}>
          <div className={container}>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 font-headline-xl text-headline-xl">
                  Free Download: NEET 2026 Counseling Playbook
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1">book</span>
                    <div>
                      <h3 className="font-bold">The Golden Choice List</h3>
                      <p className="text-on-primary/80">
                        Sample lists for 450, 550, and 650+ score brackets.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1">
                      description
                    </span>
                    <div>
                      <h3 className="font-bold">Document Checklist</h3>
                      <p className="text-on-primary/80">
                        Every original paper needed for physical verification.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-white p-12 text-on-surface shadow-2xl">
                <Home01PlaybookForm />
              </div>
            </div>
          </div>
        </section>

        {/* Credibility & testimonials */}
        <section className={`${sectionPad} overflow-hidden`}>
          <div className={container}>
            <div className="mb-20 grid gap-6 text-center md:grid-cols-4">
              {CREDIBILITY_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-headline-xl text-headline-xl text-primary">
                    {stat.value}
                  </p>
                  <p className="text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </div>
            <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-on-surface">
              Success Stories
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl bg-surface-container-low p-6"
                >
                  <StarRow />
                  <p className="mb-6 italic text-on-surface-variant">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className={`${sectionPad} bg-white`}>
          <div className={container}>
            <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-on-surface">
              Why Trust an Expert?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container">
                    <th className="border-b border-outline-variant p-6 font-bold">
                      Feature
                    </th>
                    <th className="border-b border-outline-variant p-6 font-bold text-on-surface-variant">
                      Counseling Alone
                    </th>
                    <th className="border-b border-outline-variant p-6 font-bold text-primary">
                      With MedSeat Expert
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={
                        index % 2 === 1 ? "bg-surface-container-lowest" : undefined
                      }
                    >
                      <td className="border-b border-outline-variant p-6 font-bold">
                        {row.feature}
                      </td>
                      <td className="border-b border-outline-variant p-6 text-on-surface-variant">
                        {row.alone}
                      </td>
                      <td className="border-b border-outline-variant p-6 font-bold text-primary">
                        {row.expert}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* News */}
        <section className={`${sectionPad} bg-surface-container-low`}>
          <div className={container}>
            <div className="mb-12 flex items-center justify-between">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Latest 2026 Updates
              </h2>
              <Link href="/blog" className="font-label-md text-label-md text-primary">
                View News Hub
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {NEWS_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href="/blog"
                  className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <div className="h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase text-secondary">
                      {item.tag}
                    </span>
                    <h3 className="mt-2 mb-4 font-headline-md text-headline-md transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={sectionPad}>
          <div className={container}>
            <h2 className="mb-12 text-center font-headline-lg text-headline-lg text-on-surface">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {HOME_01_FAQ.map((item, index) => (
                <details
                  key={item.question}
                  className="group cursor-pointer rounded-xl bg-surface-container-low p-6"
                  open={index === 0}
                >
                  <summary className="flex list-none items-center justify-between font-headline-md text-headline-md [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-4 text-on-surface-variant">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-12 py-12">
          <div className={container}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-container p-12 text-center text-on-primary">
              <div className="relative z-10 space-y-6 py-12">
                <h2 className="font-headline-xl text-headline-xl">
                  Your NEET Rank Deserves
                  <br />
                  the Right College
                </h2>
                <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-primary/90">
                  Don&apos;t risk your career on guesswork. Get professional advice
                  from experts who have managed 10,000+ successful admissions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href={COUNSEL_BOOK_CALL_URL}
                    className="rounded-lg bg-white px-12 py-4 font-bold text-primary shadow-xl transition-all hover:bg-surface-bright"
                  >
                    Book Free Call
                  </Link>
                  <Link
                    href={COUNSEL_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-secondary px-12 py-4 font-bold text-on-secondary hover:opacity-90"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    WhatsApp Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Home01MobileFab />
    </>
  );
}

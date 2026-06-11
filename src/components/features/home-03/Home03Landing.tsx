import Link from "next/link";
import {
  COUNSELING_UPDATES,
  PRICING_PLANS,
  PROBLEM_CARDS,
  PROCESS_STEPS,
  STATE_HUBS,
} from "@/lib/home-03/content";
import {
  COUNSEL_BOOK_CALL_URL,
  COUNSEL_WHATSAPP_URL,
  mbbsStatePath,
} from "@/lib/mbbs-state/constants";
import {
  Home03FloatingLeadMagnet,
  Home03MatchPredictorForm,
} from "./Home03Forms";

const sectionPad = "py-stack-lg";
const container = "mx-auto max-w-container-max px-gutter";

export function Home03Landing() {
  return (
    <>
      <div className="overflow-x-hidden bg-background text-on-surface">
        {/* Hero */}
        <section className="relative overflow-hidden bg-surface-container-low pt-12 pb-20">
          <div className={`${container} relative z-10`}>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-secondary-container px-4 py-1 font-label-md text-label-md text-on-secondary-container">
                  2026 Admissions Live
                </span>
                <h1 className="mb-6 font-headline-xl text-headline-xl text-on-surface">
                  Secure Your MBBS Seat with{" "}
                  <span className="text-primary">Real-Time Data</span>
                </h1>
                <p className="mb-12 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
                  Stop guessing your future. Our AI-powered 2026 predictor analyzes
                  5 years of cut-offs to find your perfect medical college in
                  seconds.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/college-predictor"
                    className="ms-primary-glow inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-4 font-label-md text-label-md text-on-primary transition-all hover:bg-primary-hover"
                  >
                    Start College Matching
                    <span className="material-symbols-outlined">trending_flat</span>
                  </Link>
                  <Link
                    href="/blog"
                    className="rounded-lg border border-primary bg-surface px-6 py-4 font-label-md text-label-md text-primary transition-all hover:bg-surface-container"
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>
              <div className="rounded-xl border border-outline-variant/50 bg-white/85 p-12 shadow-xl backdrop-blur-md">
                <h2 className="mb-6 flex items-center gap-2 font-headline-md text-headline-md">
                  <span className="material-symbols-outlined text-primary">
                    analytics
                  </span>
                  Match Predictor
                </h2>
                <Home03MatchPredictorForm />
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className={`${sectionPad} bg-background`}>
          <div className={container}>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-headline-lg text-headline-lg">
                Are You Facing These Problems?
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-primary" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {PROBLEM_CARDS.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-xl border-t-4 bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md ${card.borderClass}`}
                >
                  <span
                    className={`material-symbols-outlined mb-4 text-4xl ${card.iconClass}`}
                  >
                    {card.icon}
                  </span>
                  <h3
                    className={`mb-2 font-headline-md text-headline-md ${card.titleClass}`}
                  >
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
            <h2 className="mb-12 text-center font-headline-lg text-headline-lg">
              4 Steps to Your Right Seat
            </h2>
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row">
              <div className="absolute top-12 left-0 z-0 hidden h-0.5 w-full bg-outline-variant md:block" />
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.title}
                  className="relative z-10 flex max-w-[240px] flex-col items-center text-center"
                >
                  <div
                    className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-surface shadow-lg ${
                      step.accent === "secondary"
                        ? "bg-secondary text-on-secondary"
                        : "bg-primary text-on-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="mb-1 font-headline-md text-headline-md">
                    {step.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State hub */}
        <section className={`${sectionPad} bg-background`}>
          <div className={container}>
            <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
              <div>
                <h2 className="mb-1 font-headline-lg text-headline-lg">
                  State Counseling Hub 2026
                </h2>
                <p className="text-on-surface-variant">
                  Dedicated tracking for state-specific quotas and seat matrices.
                </p>
              </div>
              <Link
                href="/mbbs-in-india"
                className="flex items-center gap-1 font-label-md text-label-md text-primary"
              >
                View All States
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATE_HUBS.map((state) => (
                <div
                  key={state.slug}
                  className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-all hover:border-primary"
                >
                  <div
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url('${state.image}')` }}
                    role="img"
                    aria-label={state.name}
                  />
                  <div className="p-4">
                    <h3 className="mb-4 font-headline-md text-headline-md">
                      {state.name}
                    </h3>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-on-surface-variant">Govt Seats:</span>
                      <span className="font-bold">{state.govtSeats}</span>
                    </div>
                    <div className="mb-4 flex justify-between text-sm">
                      <span className="text-on-surface-variant">Avg Fee:</span>
                      <span className="font-bold">{state.avgFee}</span>
                    </div>
                    <Link
                      href={mbbsStatePath(state.slug)}
                      className="block w-full rounded bg-surface-container py-2 text-center font-label-md text-label-md text-primary transition-colors hover:bg-primary-fixed"
                    >
                      Read Guide
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className={`${sectionPad} bg-surface-container-high`}>
          <div className={container}>
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-headline-lg text-headline-lg">
                Expert Guidance Packages
              </h2>
              <p className="text-on-surface-variant">
                Choose the level of support you need for your medical journey.
              </p>
            </div>
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl p-12 ${
                    plan.featured
                      ? "relative z-10 scale-105 border-4 border-secondary-container bg-primary text-on-primary shadow-2xl"
                      : "border border-outline-variant bg-surface-container-lowest"
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 rounded-full bg-secondary px-4 py-1 font-label-md text-label-md text-on-secondary shadow-lg">
                      Most Popular
                    </span>
                  ) : null}
                  <h3 className="mb-2 font-headline-md text-headline-md">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span
                      className={`font-bold ${plan.featured ? "text-4xl" : "text-3xl"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={
                        plan.featured ? "text-primary-fixed" : "text-on-surface-variant"
                      }
                    >
                      {plan.period}
                    </span>
                  </div>
                  <ul className="mb-12 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <span
                          className={`material-symbols-outlined ${
                            plan.featured ? "text-secondary-fixed" : "text-secondary"
                          }`}
                        >
                          check_circle
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.primaryCta ? COUNSEL_WHATSAPP_URL : COUNSEL_BOOK_CALL_URL}
                    target={plan.primaryCta ? "_blank" : undefined}
                    rel={plan.primaryCta ? "noopener noreferrer" : undefined}
                    className={`block w-full rounded-lg py-4 text-center font-label-md text-label-md transition-all ${
                      plan.featured
                        ? "bg-secondary text-on-secondary hover:brightness-110"
                        : "border border-primary text-primary hover:bg-primary-fixed"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className={`${sectionPad} bg-background`}>
          <div className={container}>
            <h2 className="mb-12 font-headline-lg text-headline-lg">
              Latest Counseling Updates
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {COUNSELING_UPDATES.map((item) => (
                <Link
                  key={item.title}
                  href="/blog"
                  className="flex cursor-pointer items-center gap-4 rounded-xl border border-transparent bg-surface-container-low p-4 transition-all hover:border-primary hover:bg-surface-container"
                >
                  <div
                    className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg ${item.badgeClass}`}
                  >
                    <span className="text-xs font-bold uppercase">{item.month}</span>
                    <span className="text-2xl font-bold">{item.day}</span>
                  </div>
                  <div>
                    <p
                      className={`mb-1 font-label-md text-label-md uppercase ${item.tagClass}`}
                    >
                      {item.tag}
                    </p>
                    <h3 className="font-headline-md text-headline-md leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12">
          <div className={container}>
            <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-primary p-12 text-on-primary shadow-2xl md:flex-row">
              <div className="relative z-10 mb-8 max-w-lg md:mb-0">
                <h2 className="mb-4 font-headline-xl text-headline-xl leading-tight">
                  Don&apos;t Gamble with Your Future.
                </h2>
                <p className="mb-12 font-body-lg text-body-lg text-primary-fixed">
                  Speak with a clinical-grade counselor today and finalize your 2026
                  choice list.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={COUNSEL_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-4 font-bold text-on-secondary transition-all hover:scale-105"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      chat
                    </span>
                    WhatsApp Us
                  </Link>
                  <Link
                    href={COUNSEL_BOOK_CALL_URL}
                    className="inline-flex items-center gap-2 rounded-lg bg-on-primary px-6 py-4 font-bold text-primary transition-all hover:scale-105"
                  >
                    <span className="material-symbols-outlined">call</span>
                    Call 1800-MED-SEAT
                  </Link>
                </div>
              </div>
              <div className="relative z-10 hidden lg:block motion-safe:animate-[home03-float_6s_ease-in-out_infinite]">
                <div className="flex h-64 w-64 items-center justify-center rounded-full bg-primary-container p-4 shadow-inner">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-surface-container text-primary">
                    <span
                      className="material-symbols-outlined text-[120px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      stethoscope
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Home03FloatingLeadMagnet />
    </>
  );
}

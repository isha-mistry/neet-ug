"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import "@/styles/counselling.css";
import {
  CounsellingDecisionIconSvg,
  CounsellingMistakeWarningIcon,
  CounsellingWhyIconSvg,
} from "@/components/features/counselling/counselling-icons";
import { RankPredictorShell } from "@/components/features/rank-predictor/RankPredictorParts";
import {
  COUNSELLING_BANNER,
  COUNSELLING_CHECKLIST,
  COUNSELLING_DECISIONS,
  COUNSELLING_FAQ,
  COUNSELLING_FINAL,
  COUNSELLING_FIT_ROWS,
  COUNSELLING_HERO,
  COUNSELLING_INCLUDED,
  COUNSELLING_INTRO,
  COUNSELLING_MISTAKES,
  COUNSELLING_PLANS,
  COUNSELLING_STEPS,
  COUNSELLING_WHY,
} from "@/lib/counselling/content";
import { CounsellingBookCounsellingButton } from "@/components/features/counselling/CounsellingBookCounsellingButton";
import { CounsellingPlansPostPricingNotes } from "@/components/features/counselling/CounsellingPlansPostPricingNotes";

const CONTACT_SECTION_ID = "contact";

function useCounsellingPageEffects(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = root.querySelectorAll<HTMLElement>(".reveal");

    if (reduceMotion) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => io.observe(el));

    const spots = root.querySelectorAll<HTMLElement>(".spot");
    const onMove = (event: MouseEvent) => {
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    spots.forEach((card) => card.addEventListener("mousemove", onMove));

    return () => {
      io.disconnect();
      spots.forEach((card) => card.removeEventListener("mousemove", onMove));
    };
  }, [rootRef]);
}

export function CounsellingPageView() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCounsellingPageEffects(rootRef);

  return (
    <RankPredictorShell className="counselling-page pb-0 md:pb-0">
      <div ref={rootRef}>
        <header className="rp-hero rp-bleed csl-hero" id="top">
          <div className="rp-hero-inner">
            <div className="csl-hero-in">
              <nav className="rp-crumb justify-center" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="rp-crumb-sep">/</span>
                <span style={{ color: "var(--color-primary)" }}>Counselling</span>
              </nav>

              <h1 className="t">
                {COUNSELLING_HERO.title}
                <em>{COUNSELLING_HERO.titleEmphasis}</em>
              </h1>
              <p className="lede">{COUNSELLING_HERO.lede}</p>
              <p className="lede-sub">{COUNSELLING_HERO.ledeSub}</p>
              <div className="csl-hero-ctas">
                <CounsellingBookCounsellingButton source="hero">
                  Book free counselling call →
                </CounsellingBookCounsellingButton>
                <a className="btn btn-line" href="#plans">
                  Compare plans
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="intro" aria-labelledby="counselling-intro-heading">
          <div className="wrap intro-grid">
            <div className="intro-left">
              <span className="eyebrow">{COUNSELLING_INTRO.eyebrow}</span>
              <h2 id="counselling-intro-heading" className="t">
                {COUNSELLING_INTRO.title}
                <em>{COUNSELLING_INTRO.titleEmphasis}</em>
              </h2>
              <p className="lede">{COUNSELLING_INTRO.lede}</p>
              {COUNSELLING_INTRO.paragraphs.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
              <div className="intro-cta">
                <CounsellingBookCounsellingButton source="intro">
                  Review my options
                </CounsellingBookCounsellingButton>
              </div>
            </div>
            <div className="intro-list">
              <div className="label">{COUNSELLING_INTRO.checklistLabel}</div>
              <ul>
                {COUNSELLING_INTRO.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="decisions" aria-labelledby="counselling-decisions-heading">
          <div className="wrap">
            <div className="dec-head">
              <span className="eyebrow">{COUNSELLING_DECISIONS.eyebrow}</span>
              <h2 id="counselling-decisions-heading" className="t">
                {COUNSELLING_DECISIONS.title}
                <em>{COUNSELLING_DECISIONS.titleEmphasis}</em>
              </h2>
              <p className="lede" style={{ marginTop: 14 }}>
                {COUNSELLING_DECISIONS.lede}
              </p>
            </div>
            <div className="dec-grid">
              {COUNSELLING_DECISIONS.items.map((item) => (
                <article key={item.title} className="card spot dec reveal">
                  <div className="dec-ico">
                    <CounsellingDecisionIconSvg name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="dec-foot">
              <CounsellingBookCounsellingButton source="decisions">
                Plan my counselling route →
              </CounsellingBookCounsellingButton>
            </div>
          </div>
        </section>

        <section className="mistakes" aria-labelledby="counselling-mistakes-heading">
          <div className="wrap mst-grid">
            <div className="mst-left">
              <span className="eyebrow">{COUNSELLING_MISTAKES.eyebrow}</span>
              <h2 id="counselling-mistakes-heading" className="t">
                {COUNSELLING_MISTAKES.title}
                <em>{COUNSELLING_MISTAKES.titleEmphasis}</em>
              </h2>
              <p>{COUNSELLING_MISTAKES.body}</p>
              <CounsellingBookCounsellingButton source="mistakes">
                Avoid these mistakes →
              </CounsellingBookCounsellingButton>
            </div>
            <div className="mst-card">
              <div className="mst-label">
                <span className="ico">
                  <CounsellingMistakeWarningIcon />
                </span>
                {COUNSELLING_MISTAKES.cardLabel}
              </div>
              <ul className="mst-list">
                {COUNSELLING_MISTAKES.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="included" aria-labelledby="counselling-included-heading">
          <div className="wrap">
            <div className="inc-head">
              <span className="eyebrow">{COUNSELLING_INCLUDED.eyebrow}</span>
              <h2 id="counselling-included-heading" className="t">
                {COUNSELLING_INCLUDED.title}
                <em>{COUNSELLING_INCLUDED.titleEmphasis}</em>
              </h2>
              <p className="lede" style={{ marginTop: 14 }}>
                {COUNSELLING_INCLUDED.lede}
              </p>
            </div>
            <div className="inc-grid">
              {COUNSELLING_INCLUDED.items.map((item) => (
                <article key={item.num} className="inc reveal">
                  <span className="num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="inc-foot">
              <a className="btn btn-blue" href="#plans">
                See plans →
              </a>
            </div>
          </div>
        </section>

        <section className="how" id="how-it-works" aria-labelledby="counselling-how-heading">
          <div className="wrap">
            <div className="how-head">
              <span className="eyebrow c">{COUNSELLING_STEPS.eyebrow}</span>
              <h2 id="counselling-how-heading" className="t">
                {COUNSELLING_STEPS.title}
                <em>{COUNSELLING_STEPS.titleEmphasis}</em>
              </h2>
            </div>
            <div className="how-steps">
              {COUNSELLING_STEPS.items.map((step) => (
                <article key={step.n} className="step reveal">
                  <div className="step-num">
                    <div className="step-n">{step.n}</div>
                    <span className="step-k">{step.key}</span>
                  </div>
                  <div className="step-body">
                    <h3>{step.title}</h3>
                    {step.paragraphs.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="how-foot">
              <CounsellingBookCounsellingButton source="how-it-works">
                Start with a free review →
              </CounsellingBookCounsellingButton>
            </div>
          </div>
        </section>

        <section className="plans" id="plans" aria-labelledby="counselling-plans-heading">
          <div className="wrap">
            <div className="plans-head">
              <span className="eyebrow c">{COUNSELLING_PLANS.eyebrow}</span>
              <h2 id="counselling-plans-heading" className="t">
                {COUNSELLING_PLANS.title}
                <em>{COUNSELLING_PLANS.titleEmphasis}</em>
              </h2>
              <p className="lede" style={{ margin: "14px auto 0" }}>
                {COUNSELLING_PLANS.lede}
              </p>
            </div>
            <div className="plans-grid">
              {COUNSELLING_PLANS.plans.map((plan) => (
                <article
                  key={plan.id}
                  className={`plan reveal${plan.popular ? " pop" : ""}`}
                >
                  {plan.popular ? <span className="plan-flag">Most popular</span> : null}
                  <div className="plan-name">{plan.name}</div>
                  <p className="plan-tag">{plan.tag}</p>
                  <div className="plan-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                    {plan.per ? <span className="per">{plan.per}</span> : null}
                  </div>
                  <ul className="plan-list">
                    {plan.features.map((feature) =>
                      feature.type === "head" ? (
                        <li key={feature.text} className="head">
                          {feature.text}
                        </li>
                      ) : (
                        <li key={feature.text}>{feature.text}</li>
                      )
                    )}
                  </ul>
                  <CounsellingBookCounsellingButton
                    source={`plan-${plan.id}`}
                    className={`btn btn-${plan.ctaVariant}`}
                  >
                    {plan.cta}
                  </CounsellingBookCounsellingButton>
                </article>
              ))}
            </div>
            <CounsellingPlansPostPricingNotes noteClassName="plans-note" />
          </div>
        </section>

        <section className="fit" aria-labelledby="counselling-fit-heading">
          <div className="wrap">
            <div className="fit-head">
              <span className="eyebrow">Plan picker</span>
              <h2 id="counselling-fit-heading" className="t">
                Which plan <em>fits you?</em>
              </h2>
              <p className="lede" style={{ marginTop: 14 }}>
                A quick reference for the most common situations. Anything in between — book a free
                call and we&apos;ll figure it out together.
              </p>
            </div>
            <div className="fit-table">
              <div className="fit-th">
                <div>Your situation</div>
                <div>Suggested plan</div>
              </div>
              {COUNSELLING_FIT_ROWS.map((row) => (
                <div key={row.situation} className="fit-tr">
                  <div className="l">{row.situation}</div>
                  <div className="r">
                    {row.badges.map((badge, index) => (
                      <span key={badge.label} className="contents">
                        {index > 0 ? " or " : null}
                        <span className={`badge${badge.free ? " free" : ""}`}>{badge.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="fit-foot">
              <CounsellingBookCounsellingButton source="fit">
                Help me choose →
              </CounsellingBookCounsellingButton>
            </div>
          </div>
        </section>

        <section className="banner" id={CONTACT_SECTION_ID}>
          <div className="wrap">
            <div className="banner-card">
              <div className="body">
                <span className="eyebrow">{COUNSELLING_BANNER.eyebrow}</span>
                <h2 className="t">
                  {COUNSELLING_BANNER.title}
                  <em>{COUNSELLING_BANNER.titleEmphasis}</em>
                </h2>
                {COUNSELLING_BANNER.bodyParagraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <div className="cta">
                <CounsellingBookCounsellingButton source="banner" className="btn">
                  Book free counselling call →
                </CounsellingBookCounsellingButton>
              </div>
            </div>
          </div>
        </section>

        <section className="why" aria-labelledby="counselling-why-heading">
          <div className="wrap">
            <div className="why-head">
              <span className="eyebrow">{COUNSELLING_WHY.eyebrow}</span>
              <h2 id="counselling-why-heading" className="t">
                {COUNSELLING_WHY.title}
                <em>{COUNSELLING_WHY.titleEmphasis}</em>
              </h2>
              <p className="lede" style={{ marginTop: 14 }}>
                {COUNSELLING_WHY.lede}
              </p>
            </div>
            <div className="why-grid">
              {COUNSELLING_WHY.items.map((item) => (
                <article key={item.title} className="why-item reveal">
                  <div className="why-ico">
                    <CounsellingWhyIconSvg name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="why-foot">
              <CounsellingBookCounsellingButton source="why">
                Talk to a counsellor →
              </CounsellingBookCounsellingButton>
            </div>
          </div>
        </section>

        <section className="checklist" aria-labelledby="counselling-checklist-heading">
          <div className="wrap chk-grid">
            <div className="chk-left">
              <span className="eyebrow">{COUNSELLING_CHECKLIST.eyebrow}</span>
              <h2 id="counselling-checklist-heading" className="t">
                {COUNSELLING_CHECKLIST.title}
                <em>{COUNSELLING_CHECKLIST.titleEmphasis}</em>
              </h2>
              <p>{COUNSELLING_CHECKLIST.body}</p>
              <CounsellingBookCounsellingButton source="checklist">
                Book free counselling call →
              </CounsellingBookCounsellingButton>
            </div>
            <div className="chk-card">
              <div className="chk-label">Quick checklist</div>
              <ul className="chk-list">
                {COUNSELLING_CHECKLIST.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="counselling-faq-heading">
          <div className="wrap">
            <div className="faq-head">
              <span className="eyebrow c">Common questions</span>
              <h2 id="counselling-faq-heading" className="t">
                Asked all the <em>time.</em>
              </h2>
            </div>
            <div className="faq-list">
              {COUNSELLING_FAQ.map((item, index) => (
                <details key={item.question} className="faq" open={index === 0}>
                  <summary>
                    {item.question} <span className="pm">+</span>
                  </summary>
                  <div className="ans">
                    {item.answerParagraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
            <div className="faq-foot">
              <CounsellingBookCounsellingButton source="faq">
                Book free counselling call →
              </CounsellingBookCounsellingButton>
            </div>
          </div>
        </section>

        <section className="final" aria-labelledby="counselling-final-heading">
          <div className="wrap">
            <h2 id="counselling-final-heading">
              {COUNSELLING_FINAL.title}
              <em>{COUNSELLING_FINAL.titleEmphasis}</em>
            </h2>
            <p>{COUNSELLING_FINAL.body}</p>
            <div className="final-ctas">
              <CounsellingBookCounsellingButton source="final">
                Book free counselling call →
              </CounsellingBookCounsellingButton>
              <a className="btn btn-line" href="#plans">
                Compare plans
              </a>
            </div>
            <p className="final-meta" id="final-meta">{COUNSELLING_FINAL.meta}</p>
          </div>
        </section>
      </div>
    </RankPredictorShell>
  );
}

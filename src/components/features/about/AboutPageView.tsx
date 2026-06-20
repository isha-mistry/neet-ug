"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "@/styles/about-us.css";
import { RankPredictorShell } from "@/components/features/rank-predictor/RankPredictorParts";
import {
  ABOUT_FINAL_CTA,
  ABOUT_GEOGRAPHY,
  ABOUT_GLANCE_STATS,
  ABOUT_HERO,
  ABOUT_LETTER,
  ABOUT_POSITION,
  ABOUT_PRINCIPLES,
} from "@/lib/about/content";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";

const BOOK_CALL_HREF = `${COUNSEL_WHATSAPP_URL.split("?")[0]}?text=${encodeURIComponent(
  "Hi MedSeat, I'd like to book a free 15-minute counseling call about NEET UG MBBS admissions."
)}`;

export function AboutPageView() {
  const rootRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const letterBeforePull = ABOUT_LETTER.paragraphs.slice(0, 4);
  const letterAfterPull = ABOUT_LETTER.paragraphs.slice(4);

  return (
    <RankPredictorShell className="about-page pb-0 md:pb-0">
      <div ref={rootRef}>
        <header className="rp-hero rp-bleed au-hero" id="top">
          <div className="rp-hero-inner">
            <div className="au-hero-in">
              <nav className="rp-crumb justify-center" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="rp-crumb-sep">/</span>
                <span style={{ color: "var(--color-primary)" }}>About MedSeat</span>
              </nav>

              <h1 className="t">
                {ABOUT_HERO.title}
                <em>{ABOUT_HERO.titleEmphasis}</em>
                {ABOUT_HERO.titleSuffix}
              </h1>
              <p className="lede">{ABOUT_HERO.lede}</p>
            </div>
            <div className="au-hero-glance reveal in" aria-label="MedSeat coverage">
              <div className="au-glance-card">
                {ABOUT_GLANCE_STATS.map((stat) => (
                  <div key={stat.key} className="au-gcell">
                    <div className="k">{stat.key}</div>
                    <div className="v">
                      {stat.value}
                      <small>{stat.hint}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="au-letter" aria-labelledby="about-letter-heading">
          <div className="wrap-read">
            <span className="eyebrow">{ABOUT_LETTER.eyebrow}</span>
            <h2 id="about-letter-heading" className="t">
              {ABOUT_LETTER.title}
              <em>{ABOUT_LETTER.titleEmphasis}</em>
            </h2>

            <div className="au-letter-body">
              {letterBeforePull.map((para, index) => (
                <p key={para.slice(0, 32)} className={index === 0 ? "au-first" : undefined}>
                  {para}
                </p>
              ))}

              <div className="au-pull">
                <p>
                  {ABOUT_LETTER.pullQuote}{" "}
                  <em>{ABOUT_LETTER.pullQuoteEmphasis}</em>
                </p>
              </div>

              {letterAfterPull.map((para) => {
                if (para === "What we found was surprising.") {
                  return (
                    <p key={para}>
                      <strong>{para}</strong>
                    </p>
                  );
                }
                return <p key={para.slice(0, 32)}>{para}</p>;
              })}

              <p>
                Our mission is straightforward: <strong>{ABOUT_LETTER.mission}</strong>
              </p>

              {ABOUT_LETTER.closingParagraphs.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}

              <p>
                Because a NEET score should not be the only factor that determines a
                student&apos;s future. <em>{ABOUT_LETTER.closingEmphasis}</em>
              </p>
            </div>

            <div className="au-letter-sig">
              <span className="dash" aria-hidden />
              <span>{ABOUT_LETTER.signature}</span>
            </div>
          </div>
        </section>

        <section className="au-principles" aria-labelledby="about-principles-heading">
          <div className="wrap">
            <div className="au-princ-head">
              <span className="eyebrow">Our principles</span>
              <h2 id="about-principles-heading" className="t">
                Four things we <em>won&apos;t compromise on.</em>
              </h2>
            </div>
            <div className="au-princ-grid">
              {ABOUT_PRINCIPLES.map((item) => (
                <article key={item.num} className="card spot au-princ reveal">
                  <span className="au-princ-num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="au-states" aria-labelledby="about-states-heading">
          <div className="wrap">
            <div className="au-states-intro">
              <span className="eyebrow">Our geography</span>
              <h2 id="about-states-heading" className="t">
                Four states. <em>By choice.</em>
              </h2>
              <p className="lede" style={{ marginTop: 14 }}>
                {ABOUT_GEOGRAPHY.body}
              </p>
            </div>
            <div className="au-states-grid">
              {ABOUT_GEOGRAPHY.stateCards.map((state) => (
                <Link
                  key={state.code}
                  href={state.href}
                  className="au-scard spot reveal no-underline"
                >
                  <div className="code">{state.code}</div>
                  <h3>{state.name}</h3>
                  <div className="auth">{state.auth}</div>
                  <div className="nums">
                    <div>
                      <b>{state.seats}</b>
                      <span>seats</span>
                    </div>
                    <div>
                      <b>{state.colleges}</b>
                      <span>colleges</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="au-aiq">
              Plus full guidance for <b>MCC All India Quota</b> counseling — the route into our
              four states from anywhere in India.
            </p>
          </div>
        </section>

        <section className="au-position" aria-labelledby="about-position-heading">
          <div className="wrap">
            <div className="au-pos-head">
              <span className="eyebrow">Our position</span>
              <h2 id="about-position-heading" className="t">
                Things we want you to know — <em>before you book.</em>
              </h2>
            </div>
            <div className="au-pos-grid">
              {ABOUT_POSITION.map((item) => (
                <div key={item.label} className="au-pos-item reveal">
                  <div className="label">{item.label}</div>
                  <div className="body">
                    {item.label === "On your personal data" ? (
                      <>
                        We collect your phone number to send counseling reminders and answer your
                        questions. We don&apos;t sell it, share it with coaching brands, or use it
                        for unrelated marketing. Full details are in our{" "}
                        <Link href="/privacy">Privacy Policy</Link>.
                      </>
                    ) : (
                      item.body
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="au-final" aria-labelledby="about-final-heading">
          <div className="wrap">
            <h2 id="about-final-heading">
              {ABOUT_FINAL_CTA.title}
              <em>{ABOUT_FINAL_CTA.titleEmphasis}</em>
            </h2>
            <p>{ABOUT_FINAL_CTA.body}</p>
            <div className="au-final-ctas">
              <a
                className="btn btn-blue"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a free call →
              </a>
              <Link className="btn btn-line" href="/rank-predictor">
                Browse our predictors first →
              </Link>
            </div>
            <p className="about-final-meta" id="about-final-meta">{ABOUT_FINAL_CTA.meta}</p>
          </div>
        </section>
      </div>
    </RankPredictorShell>
  );
}

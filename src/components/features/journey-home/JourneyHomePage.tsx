import Link from "next/link";
import type { HomeHeroContent } from "@/types/site";
import type { FaqContent } from "@/types/content";
import {
  COUNSEL_WHATSAPP_URL,
} from "@/lib/mbbs-state/constants";
import {
  JOURNEY_CHALLENGE_BAND,
  JOURNEY_COMPARISON_ROWS,
  JOURNEY_PROBLEM_CARDS,
  JOURNEY_RESOURCES,
  JOURNEY_AIQ_CARD,
  JOURNEY_STATE_CARDS,
  JOURNEY_STATES_SECTION,
  JOURNEY_TESTIMONIALS,
} from "@/lib/journey-home/content";
import { HeroVisualPanel } from "./HeroVisualPanel";
import { ScrollJourney } from "./ScrollJourney";
import { JourneyHomeEffects } from "./JourneyHomeEffects";
import { SeatRadarCard, PlaybookForm } from "./SeatRadarCard";
import { RoundsPanel } from "./RoundsPanel";
import { JourneyStateHub } from "./JourneyStateCard";

type JourneyHomePageProps = {
  hero: HomeHeroContent;
  faq: FaqContent;
  brandName: string;
};

function ProblemIcon({ name }: { name: string }) {
  switch (name) {
  case "portals":
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  case "order":
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  case "upgrade":
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 16V8M8.5 11.5L12 8l3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  default:
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

export function JourneyHomePage({ hero, faq, brandName }: JourneyHomePageProps) {
  return (
    <div className="journey-home">
      <JourneyHomeEffects />

      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-badge">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 1l2 4.2 4.6.6-3.3 3.2.8 4.6L8 11.4 3.9 13.6l.8-4.6L1.4 5.8 6 5.2 8 1z"
                  fill="currentColor"
                />
              </svg>
              {hero.eyebrow}
            </span>
            <h1>
              {hero.title.split(".").length > 1 ? (
                <>
                  {hero.title.replace(/\.$/, "")} — <em>with a plan.</em>
                </>
              ) : (
                <>
                  {hero.title} — <em>with a plan.</em>
                </>
              )}
            </h1>
            <p className="lede">{hero.subtitle}</p>
            <div className="hero-ctas">
              <a href="#radar" className="btn btn-blue">
                Scan my chances — free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#cta" className="btn btn-line">
                Talk to a counselor
              </a>
            </div>
            <div className="hero-mini">
              <div>
                <b>200+</b>
                <span>Colleges covered</span>
              </div>
              <div>
                <b>33,000+</b>
                <span>Seats mapped</span>
              </div>
              <div>
                <b>3 yrs</b>
                <span>Verified cutoff data</span>
              </div>
            </div>
          </div>
          <HeroVisualPanel />
        </div>
      </header>

      <div className="ticker">
        <div className="wrap ticker-in">
          <div className="tick">
            <b data-count="2279743">0</b>
            <span>NEET 2026 applicants</span>
          </div>
          <div className="tick">
            <b data-count="128875">0</b>
            <span>MBBS seats in India</span>
          </div>
          <div className="tick">
            <b data-count="33000" data-suffix="+">
              0
            </b>
            <span>seats in our 4 states</span>
          </div>
          <div className="tick">
            <b>
              <span className="u">2.88</span>%
            </b>
            <span>get a government seat</span>
          </div>
        </div>
      </div>

      <ScrollJourney>
        <section className="section jstop" id="radar">
          <span className="jnode jn-l" data-jnode>
            01
          </span>
          <div className="wrap radar-grid">
            <div>
              <span className="eyebrow">Step 01 · Your score</span>
              <h2 className="t">
                Start with the <em>Seat Radar.</em>
              </h2>
              <p className="lede" style={{ marginBottom: 24 }}>
                Type your NEET 2026 score. In two seconds you&apos;ll see your estimated rank
                and how many colleges across all four states sit in your Safe, Borderline and
                Reach zones.
              </p>
              <p className="lede" style={{ fontSize: 15 }}>
                It runs on three years of ACPUGMEC, RUHS, DMAT and CET Cell allotment trends —
                the same data our counselors use.
              </p>
            </div>
            <SeatRadarCard />
          </div>
        </section>

        <section className="section jstop" id="states" style={{ background: "var(--alt)" }}>
          <span className="jnode jn-r" data-jnode>
            02
          </span>
          <div className="wrap">
            <span className="eyebrow">{JOURNEY_STATES_SECTION.eyebrow}</span>
            <h2 className="t">
              {JOURNEY_STATES_SECTION.title}
              <em>{JOURNEY_STATES_SECTION.titleEmphasis}</em>
            </h2>
            <p className="lede">{JOURNEY_STATES_SECTION.lede}</p>
            <JourneyStateHub states={JOURNEY_STATE_CARDS} aiq={JOURNEY_AIQ_CARD} />
          </div>
        </section>

        <section className="section jstop" id="funnel">
          <span className="jnode jn-l" data-jnode>
            03
          </span>
          <div className="wrap">
            <span className="eyebrow">Step 03 · The reality</span>
            <h2 className="t">
              Know the <em>funnel</em> you&apos;re in.
            </h2>
            <p className="lede">
              Qualifying NEET is not getting a seat. Here is what 2026 actually looks like.
            </p>
            <div className="fun">
              <div className="card frow reveal" data-w="100">
                <div className="fl">
                  Registered for NEET 2026
                  <small>The starting line — the largest exam on Earth</small>
                </div>
                <div className="fbarw">
                  <i />
                </div>
                <div className="fv">22,79,743</div>
              </div>
              <div className="card frow reveal" data-w="53">
                <div className="fl">
                  Will qualify NEET
                  <small>Crossing the percentile only earns the right to compete</small>
                </div>
                <div className="fbarw">
                  <i />
                </div>
                <div className="fv">~12,00,000</div>
              </div>
              <div className="card frow reveal" data-w="5.7">
                <div className="fl">
                  MBBS seats in India
                  <small>Government + GMERS + private + deemed, combined</small>
                </div>
                <div className="fbarw">
                  <i />
                </div>
                <div className="fv">1,28,875</div>
              </div>
              <div className="card frow gold reveal" data-w="2.9">
                <div className="fl">
                  Government seats
                  <small>₹25K/yr instead of ₹12L/yr — the seat worth fighting for</small>
                </div>
                <div className="fbarw">
                  <i />
                </div>
                <div className="fv">63,682</div>
              </div>
            </div>
            <p className="fun-note">
              The difference between students who get these seats is rarely rank.{" "}
              <b>It&apos;s strategy.</b>
            </p>
          </div>
        </section>

        <section className="section jstop" id="challenge" style={{ background: "var(--alt)" }}>
          <span className="jnode jn-r" data-jnode>
            04
          </span>
          <div className="wrap">
            <span className="eyebrow">Step 04 · The real challenge</span>
            <h2 className="t">
              A good NEET rank is not enough. <em>Strategy is.</em>
            </h2>
            <p className="lede">
              Every season, students with ranks good enough for government seats end up in
              management quota — or with no seat at all. Here&apos;s where it goes wrong.
            </p>
            <div className="chgrid">
              {JOURNEY_PROBLEM_CARDS.map((card) => (
                <article key={card.title} className="card spot pcard reveal">
                  <div className="pico">
                    <ProblemIcon name={card.icon} />
                  </div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="chband reveal">
              <span className="big">{JOURNEY_CHALLENGE_BAND.stat}</span>
              <p>
                In Gujarat alone, <b>~50,000 students qualify NEET</b> each year competing for{" "}
                <b>~3,675 state-quota government seats</b>. Getting the right seat is not just
                about rank — it&apos;s about what you do with it.
              </p>
              <a className="btn" href={JOURNEY_CHALLENGE_BAND.href}>
                {JOURNEY_CHALLENGE_BAND.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="section jstop" id="tools">
          <span className="jnode jn-l" data-jnode>
            05
          </span>
          <div className="wrap">
            <span className="eyebrow">Step 05 · Your toolkit</span>
            <h2 className="t">
              Five tools. <em>Zero guesswork.</em>
            </h2>
            <p className="lede">
              Built for one job: NEET 2026 MBBS counseling in our four states. All free on{" "}
              {brandName}.
            </p>
            <div className="tools-grid">
              <article className="card spot tool big reveal">
                <span className="badge">Most used</span>
                <div className="tico">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 20V10M10 20V4M16 20v-8M22 20H2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3>Cutoff Analyser</h3>
                <p>
                  Every government, GMERS and private college in your target states — color-coded
                  Safe, Borderline or Reach against your score.
                </p>
                <ul>
                  <li>Opening &amp; closing ranks, all categories</li>
                  <li>Year-wise trend per college</li>
                  <li>Filter by state, tier and quota</li>
                </ul>
                <Link className="go" href="/cutoff-analyser">
                  Analyse my score →
                </Link>
              </article>
              <article className="card spot tool big reveal">
                <span className="badge">Most accurate</span>
                <div className="tico">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="1.3" fill="currentColor" />
                  </svg>
                </div>
                <h3>College Predictor</h3>
                <p>
                  A ranked list of colleges where your admission chance is High, Moderate or Low —
                  then compare up to four side-by-side.
                </p>
                <ul>
                  <li>AIQ + state + management quota</li>
                  <li>4-college comparison view</li>
                  <li>Exportable choice list</li>
                </ul>
                <Link className="go" href="/college-predictor">
                  Predict my college →
                </Link>
              </article>
              <article className="card spot tool reveal">
                <div className="tico">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Rank Predictor</h3>
                <p>Marks → estimated AIR plus state rank trends from 2022–2025 NTA data.</p>
                <Link className="go" href="/rank-predictor">
                  Predict my rank →
                </Link>
              </article>
              <article className="card spot tool reveal">
                <div className="tico">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M3 10h18M8 3v4M16 3v4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3>Round Tracker</h3>
                <p>Counseling deadlines across ACPUGMEC, RUHS, DMAT, CET Cell and MCC.</p>
                <Link className="go" href="/neet-ug-2026/updates">
                  Track my rounds →
                </Link>
              </article>
              <article className="card spot tool reveal">
                <div className="tico">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect
                      x="5"
                      y="3"
                      width="14"
                      height="18"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M9 8h6M9 12h6M9 16h3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3>Document Checklist</h3>
                <p>State-specific checklist from your category and quota — including NCL traps.</p>
                <a className="go" href="#playbook">
                  Get my checklist →
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section jstop" id="rounds" style={{ background: "var(--alt)" }}>
          <span className="jnode jn-r" data-jnode>
            06
          </span>
          <div className="wrap">
            <span className="eyebrow">Step 06 · The game</span>
            <h2 className="t">
              Counseling is played in <em>rounds.</em>
            </h2>
            <p className="lede">
              Each round is a different decision. Click through to see what happens — and what we
              do for you at each stage.
            </p>
            <RoundsPanel />
          </div>
        </section>

        <section className="section jstop" id="difference">
          <span className="jnode jn-l" data-jnode>
            07
          </span>
          <div className="wrap">
            <span className="eyebrow">Step 07 · The difference</span>
            <h2 className="t">
              What changes with <em>expert guidance.</em>
            </h2>
            <div className="cmpwrap reveal">
              <table className="cmp">
                <thead>
                  <tr>
                    <th>Situation</th>
                    <th className="alone">Going alone</th>
                    <th className="withus">With our counseling</th>
                  </tr>
                </thead>
                <tbody>
                  {JOURNEY_COMPARISON_ROWS.map((row) => (
                    <tr key={row.situation}>
                      <td className="sit">{row.situation}</td>
                      <td className="alone">{row.alone}</td>
                      <td className="withus">{row.withUs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="cmp-note">
              The right guidance doesn&apos;t change your rank.{" "}
              <b>It changes what you do with it.</b>
            </p>
          </div>
        </section>

        <section className="section jstop" id="packages" style={{ background: "var(--alt)" }}>
          <span className="jnode jn-r" data-jnode>
            08
          </span>
          <div className="wrap">
            <span className="eyebrow">Step 08 · Your expert</span>
            <h2 className="t">
              Counseling that <em>pays for itself.</em>
            </h2>
            <p className="lede">
              A government seat instead of management quota saves over ₹60 lakh across the course.
              Strategy costs a fraction of that.
            </p>
            <div className="packs">
              <article className="card spot pack reveal">
                <h3>Essentials</h3>
                <p className="for">
                  For confident students who want every tool unlocked and the data to decide
                  themselves.
                </p>
                <div className="pr">
                  ₹2,999<small> /season</small>
                </div>
                <ul>
                  <li>Cutoff Analyser — full unlock</li>
                  <li>College Predictor + exportable choice list</li>
                  <li>Rank Predictor, all 4 state ranks</li>
                  <li>Personalized document checklist</li>
                  <li>Round Tracker with alerts</li>
                  <li>Counseling Playbook PDF</li>
                </ul>
                <a href="#cta" className="btn btn-line">
                  Get started
                </a>
              </article>
              <article className="card spot pack pop reveal">
                <span className="pflag">Most popular</span>
                <h3>Expert</h3>
                <p className="for">
                  End-to-end support through every round, with a counselor who knows your case.
                </p>
                <div className="pr">
                  ₹9,999<small> /season</small>
                </div>
                <ul>
                  <li className="up">Everything in Essentials +</li>
                  <li>1-on-1 session with an MBBS expert (60 min)</li>
                  <li>Choice list for every state &amp; round</li>
                  <li>Strategy note before each round</li>
                  <li>Upgrade-or-lock call after each allotment</li>
                  <li>Priority WhatsApp support, Aug–Nov</li>
                  <li>Written domicile &amp; quota eligibility report</li>
                </ul>
                <a href="#cta" className="btn btn-blue">
                  Book now — seats limited
                </a>
              </article>
              <article className="card spot pack reveal">
                <h3>Premium</h3>
                <p className="for">
                  Maximum attention, multi-state strategy and NRI quota guidance for the family.
                </p>
                <div className="pr">
                  ₹19,999<small> /season</small>
                </div>
                <ul>
                  <li className="up">Everything in Expert +</li>
                  <li>Unlimited counselor calls all season</li>
                  <li>Separate parent briefing (30 min)</li>
                  <li>NRI quota eligibility &amp; documentation</li>
                  <li>Parallel strategy across all 4 states</li>
                  <li>Post-admission: bond, hostel, joining</li>
                </ul>
                <a href="#cta" className="btn btn-line">
                  Contact us
                </a>
              </article>
            </div>
            <p className="pfoot">
              Not sure which fits?{" "}
              <a href="#cta">Talk to us free — 15 minutes</a>, no obligation.
            </p>
          </div>
        </section>

        <section className="final jstop" id="cta">
          <span className="jnode jn-l fin" data-jnode>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10.5l4 4L16 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="wrap">
            <h2>
              22 lakh wrote the exam.
              <br />
              <em>You came with a plan.</em>
            </h2>
            <p className="lede" style={{ maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Free, honest, specific to your score, category and target states. That&apos;s the first
              call.
            </p>
            <div className="final-ctas">
              <a className="btn btn-blue" href={COUNSEL_WHATSAPP_URL}>
                Book free counseling call
              </a>
              <a className="btn btn-line" href="#radar">
                Run the Seat Radar first →
              </a>
            </div>
            <p className="final-meta">
              RESPONDS IN 2 HOURS · MON–SAT 9AM–8PM · GJ · RJ · MP · MH · MCC AIQ
            </p>
          </div>
        </section>
      </ScrollJourney>

      <section className="section" style={{ paddingBottom: 70 }}>
        <div className="wrap">
          <span className="eyebrow">Proof</span>
          <h2 className="t">
            Students who got the <em>right seat.</em>
          </h2>
        </div>
        <div className="mq">
          <div className="mtrack" id="mtrack">
            {JOURNEY_TESTIMONIALS.map((t) => (
              <article key={t.who} className="card tst">
                <div className="tst-top">
                  <span className="sc">{t.score}</span>
                  <span className="st">★★★★★</span>
                </div>
                <p>{t.quote}</p>
                <div className="who">
                  <b>{t.who}</b>
                  <span>{t.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="mq-note wrap">
          Sample stories for layout — replace with verified, consented testimonials before launch.
        </p>
      </section>

      <section className="section" id="playbook" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="pb reveal">
            <div className="tx">
              <span className="eyebrow">Free download</span>
              <h2>The NEET 2026 Counseling Playbook</h2>
              <p>
                Seat matrices, cutoff tables, document checklists, round timelines and the 10 most
                common counseling mistakes — all four states, one PDF, sent to your WhatsApp.
              </p>
            </div>
            <PlaybookForm />
          </div>
        </div>
      </section>

      <section className="section" id="resources" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <span className="eyebrow">Go deeper</span>
          <h2 className="t">
            Guides &amp; <em>resources.</em>
          </h2>
          <p className="lede">
            Everything around the exam and counselling season — researched, verified and kept
            current.
          </p>
          <div className="resgrid">
            {JOURNEY_RESOURCES.map((res) => (
              <article key={res.href} className="card spot rescard reveal">
                <h3>{res.title}</h3>
                <p>{res.body}</p>
                <Link className="go" href={res.href}>
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <span className="eyebrow">Questions</span>
          <h2 className="t">{faq.title}</h2>
          <div className="faq-cols">
            {faq.items.map((item, i) => (
              <details key={item.question} className="faq" open={i === 0}>
                <summary>
                  {item.question} <span className="pm">+</span>
                </summary>
                <div className="ans">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <a className="fab" href={COUNSEL_WHATSAPP_URL} aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 117 3.8zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4 0-.6.2-.8l.4-.5c.1-.2.2-.3.1-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.4 3.7a12 12 0 004.6 4.4c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.1z" />
        </svg>
      </a>
    </div>
  );
}

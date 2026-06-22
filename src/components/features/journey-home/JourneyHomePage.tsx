import Link from "next/link";
import type { HomeHeroContent } from "@/types/site";
import type { FaqContent } from "@/types/content";
import {
  JOURNEY_CHALLENGE_BAND,
  JOURNEY_CHALLENGE_COUNSELLING_CTA,
  JOURNEY_COMPARISON_ROWS,
  JOURNEY_COUNSELING_MISTAKES,
  JOURNEY_PROBLEM_CARDS,
  JOURNEY_RESOURCES,
  JOURNEY_AIQ_CARD,
  JOURNEY_STATE_CARDS,
  JOURNEY_STATES_SECTION,
} from "@/lib/journey-home/content";
import { JourneyTestimonialMarquee } from "./JourneyTestimonialMarquee";
import { HeroVisualPanel } from "./HeroVisualPanel";
import { HeroCounselorCta } from "./HeroCounselorCta";
import { ScrollJourney } from "./ScrollJourney";
import { JourneyHomeEffects } from "./JourneyHomeEffects";
import { SeatRadarCard, PlaybookForm } from "./SeatRadarCard";
import { RoundsPanel } from "./RoundsPanel";
import { JourneyStateHub } from "./JourneyStateCard";
import { JourneyComparisonCta } from "./JourneyComparisonCta";
import { JourneyCounsellingLeadTrigger } from "./JourneyCounsellingLeadTrigger";
import { JourneyFinalCounsellingCta } from "./JourneyFinalCounsellingCta";
import { JourneyPackagePacks } from "./JourneyPackagePacks";
import Image from "next/image";

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

function MistakeMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
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
              {hero.title.replace(/\s*and a clear plan\.\s*$/, "")}{" "}
              <em>and a clear plan.</em>
            </h1>
            <p className="lede">{hero.subtitle}</p>
            <div className="hero-ctas">
              <a href="#radar" className="btn btn-blue">
                Check my MBBS seat chances
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
              <HeroCounselorCta />
            </div>
            <div className="hero-mini">
              <div>
                <b>500+</b>
                <span>Colleges covered</span>
              </div>
              <div>
                <b>43,000+</b>
                <span>Seats mapped</span>
              </div>
              <div>
                <b>2025</b>
                <span>Verified cutoff data (1 year)</span>
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
            <b data-count="129753">0</b>
            <span>MBBS seats in India</span>
          </div>
          <div className="tick">
            <b data-count="33405">0</b>
            <span>seats in our 4 states</span>
          </div>
          <div className="tick">
            <b>
              <span className="u">2.89</span>%
            </b>
            <span>get a government seat</span>
          </div>
        </div>
      </div>
      <p className="ticker-note wrap">
        Your score decides where you enter this funnel. Start by checking your seat
        chances.
      </p>

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
              Know the <em>funnel</em> &nbsp;you&apos;re in.
            </h2>
            <p className="lede">
              Qualifying NEET is not getting a seat. Here is what 2026 actually looks like.
            </p>
            <div className="hero-ctas" style={{ marginTop: 24 }}>
              <Link href="/cutoff-analyser" className="btn btn-blue">
                Check where I stand
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/neet-ug-2026/counselling-guide" className="btn btn-line">
                Understand the counselling process
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
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
              <div className="card frow reveal" data-w="59">
                <div className="fl">
                  Will qualify NEET
                  <small>Crossing the percentile only earns the right to compete</small>
                </div>
                <div className="fbarw">
                  <i />
                </div>
                <div className="fv">~13,50,000</div>
              </div>
              <div className="card frow reveal" data-w="5.7">
                <div className="fl">
                  MBBS seats in India
                  <small>Government + GMERS + private + deemed, combined</small>
                </div>
                <div className="fbarw">
                  <i />
                </div>
                <div className="fv">1,29,753</div>
              </div>
              <div className="card frow gold reveal" data-w="2.9">
                <div className="fl">
                  Government seats
                  <small>₹25K/yr instead of ₹12L/yr — the seat worth fighting for</small>
                </div>
                <div className="fbarw">
                  <i />
                </div>
                <div className="fv">63,860</div>
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
                In Gujarat alone, <b>roughly half of aspirants qualify NEET</b> each year,
                competing for <b>7,500+ state quota seats </b> across 43 colleges. Getting the
                right seat is not just about rank — it&apos;s about what you do with it.
              </p>
              <JourneyCounsellingLeadTrigger
                label={JOURNEY_CHALLENGE_BAND.cta}
                className="btn btn-line"
                pageHash="challenge"
                config={JOURNEY_CHALLENGE_COUNSELLING_CTA}
              />
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
                <Link className="btn btn-blue" href="/cutoff-analyser">
                  Analyse my score
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                <Link className="btn btn-blue" href="/college-predictor">
                  Predict my college
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                <p className="pb-5">Marks → estimated AIR plus state rank trends from 2022–2025 NTA data.</p>
                <Link className="btn btn-blue" href="/rank-predictor">
                  Predict my rank
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                <p className="pb-5">Counseling deadlines across ACPUGMEC, RUHS, DMAT, CET Cell and MCC.</p>
                <Link className="btn btn-blue" href="/neet-ug-2026/updates">
                  Track my rounds
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                <p className="pb-5">State-specific checklist from your category and quota — including NCL traps.</p>
                <Link className="btn btn-blue" href="#playbook">
                  Get my checklist
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section jstop rounds-section" id="rounds">
          <span className="jnode jn-r" data-jnode>
            06
          </span>
          <div className="wrap">
            <span className="eyebrow" id="rounds-eyebrow">
              Step 06 · The game
            </span>
            <h2 className="t" id="rounds-heading">
              Counselling is played in <em>rounds.</em>
            </h2>
            <p className="lede">
              Each round is a different decision. Scroll to see what happens — and what we
              do for you at each stage.
            </p>
            <RoundsPanel />
            <div className="rounds-footer">
              <h3>
                Each round changes your options.
              </h3>
              <p className="lede">
                A good choice list for Round 1 may not be the right strategy for Round 2, mop-up, or stray vacancy. Plan your rounds before the counselling window opens.
              </p>
              <div className="final-ctas">
                <Link href="/counselling" className="btn btn-blue">
                  Plan my rounds
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link href="/neet-ug-2026/updates" className="btn btn-line">
                  Track counselling rounds
                </Link>
              </div>
            </div>
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
            <JourneyComparisonCta />
            {/* <p className="cmp-note">
              The right guidance doesn&apos;t change your rank.{" "}
              <b>It changes what you do with it.</b>
            </p> */}
          </div>
        </section>

        <section className="section jstop" id="mistakes" style={{ background: "var(--alt)" }}>
          <span className="jnode jn-r" data-jnode>
            08
          </span>
          <div className="wrap">
            <span className="eyebrow">{JOURNEY_COUNSELING_MISTAKES.eyebrow}</span>
            <h2 className="t">
              {JOURNEY_COUNSELING_MISTAKES.title}
              <em>{JOURNEY_COUNSELING_MISTAKES.titleEmphasis}</em>
            </h2>
            <p className="lede">{JOURNEY_COUNSELING_MISTAKES.lede}</p>
            <div className="mistwrap reveal">
              <ul className="mistgrid">
                {JOURNEY_COUNSELING_MISTAKES.items.map((item) => (
                  <li key={item} className="mist-item">
                    <span className="mist-ico">
                      <MistakeMark />
                    </span>
                    <span className="mist-label">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="fun-note mist-close">
              {JOURNEY_COUNSELING_MISTAKES.closingBefore}{" "}
              <b>{JOURNEY_COUNSELING_MISTAKES.closingEmphasis}</b>
            </p>
          </div>
        </section>

        <section className="section jstop" id="packages">
          <span className="jnode jn-l" data-jnode>
            09
          </span>
          <div className="wrap">
            <span className="eyebrow">Step 09 · Your expert</span>
            <h2 className="t">
              Counseling that <em>pays for itself.</em>
            </h2>
            <p className="lede">
              A government seat instead of management quota saves over ₹60 lakh across the course.
              Strategy costs a fraction of that.
            </p>
            <JourneyPackagePacks />
          </div>
        </section>

        <section className="final jstop" id="cta">
          <span className="jnode jn-r fin" data-jnode>
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
              <em>You need a plan.</em>
            </h2>
            <p className="lede" style={{ maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Start with a free 15-minute review of your score, category, domicile, and target states.
            </p>
            <div className="final-ctas">
              <JourneyFinalCounsellingCta />
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

      <JourneyTestimonialMarquee />

      <section className="section" id="playbook" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="pb reveal">
            <div className="tx">
              <span className="eyebrow">Free download</span>
              <h2>Get the NEET 2026 Counselling Playbook</h2>
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
                <Link className="go flex items-center" href={res.href}>
                  {res.cta}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
    </div>
  );
}

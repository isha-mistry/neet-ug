import {
  JOURNEY_TESTIMONIALS,
  type JourneyTestimonial,
} from "@/lib/journey-home/content";
import { TestimonialVideoPlayer } from "./TestimonialVideoPlayer";

function testimonialKey(t: JourneyTestimonial): string {
  if (t.kind === "video") return t.video;
  return `${t.who}-${t.score}`;
}

function TextTestimonialCard({ t }: { t: Extract<JourneyTestimonial, { kind: "text" }> }) {
  return (
    <article className="card tst">
      <div className="tst-top">
        <span className="sc">{t.score}</span>
        <span className="st" aria-hidden="true">
          ★★★★★
        </span>
      </div>
      <p>{t.quote}</p>
      <div className="who">
        <img src={t.avatar} alt="" className="who-img" />
        <div className="who-info">
          <b>{t.who}</b>
          <span>{t.meta}</span>
        </div>
      </div>
    </article>
  );
}

function VideoTestimonialCard({ t }: { t: Extract<JourneyTestimonial, { kind: "video" }> }) {
  return (
    <article className="card tst tst--video">
      <div className="tst-video-shell">
        <TestimonialVideoPlayer src={t.video} label={`Video testimonial from ${t.who}`} />
        <div className="tst-video-meta">
          <span className="tst-video-tag">Video story</span>
          <span className="st" aria-hidden="true">
            ★★★★★
          </span>
        </div>
      </div>
    </article>
  );
}

function TestimonialCard({ t }: { t: JourneyTestimonial }) {
  if (t.kind === "video") return <VideoTestimonialCard t={t} />;
  return <TextTestimonialCard t={t} />;
}

export function JourneyTestimonialMarquee() {
  const items = [...JOURNEY_TESTIMONIALS, ...JOURNEY_TESTIMONIALS];

  return (
    <section className="section" style={{ paddingBottom: 70 }}>
      <div className="wrap">
        <span className="eyebrow">Proof</span>
        <h2 className="t">
          Students who got the <em>right seat.</em>
        </h2>
      </div>
      <div className="mq">
        <div
          className="mtrack"
          id="mtrack"
          data-marquee-items={JOURNEY_TESTIMONIALS.length}
        >
          {items.map((t, index) => (
            <TestimonialCard key={`${testimonialKey(t)}-${index}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { home, gallery as galleryContent } from "@/lib/content";
import { business, telHref } from "@/lib/config";
import { flags } from "@/lib/config";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";
import { CurbBlock } from "@/components/CurbBlock";
import { ServiceTags } from "@/components/ServiceTags";
import { CTABanner } from "@/components/CTABanner";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
};

const callHref = () => telHref() || home.hero.primary.href;

export default function HomePage() {
  return (
    <div className="page-fade">
      <Hero />
      <TrustStrip />
      {flags.showTestimonials && <SocialProof />}
      <HowItWorks />
      <WorkTeaser />
      <Benefits />
      <AboutTeaser />
      <Hiring />
      <CTABanner />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  const h = home.hero;
  const areas = [...business.serviceAreas.slice(0, 3), business.serviceAreaLabel];
  return (
    <section className="section" style={{ paddingTop: "clamp(40px, 6vw, 84px)", paddingBottom: "clamp(48px,6vw,90px)" }}>
      <div
        className="wrap stack-mobile"
        style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}
      >
        <div>
          <Reveal><Eyebrow>Address curb painting · Oregon</Eyebrow></Reveal>
          <Reveal delay={60}>
            <h1 className="display h1" style={{ marginTop: 22 }}>
              {h.headlineLead.trim()}<br />{h.headlineAccent}<br />
              <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                {h.headlineTail.trim()}
                <svg viewBox="0 0 320 18" preserveAspectRatio="none" style={{ position: "absolute", left: "-2%", bottom: "-0.18em", width: "104%", height: "0.34em", color: "var(--accent)" }}>
                  <path d="M2 12 C 80 4, 240 4, 318 9" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead" style={{ marginTop: 26 }}>{h.sub}</p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
              <Button kind="primary" size="lg" href={callHref()} arrow>{h.primary.label}</Button>
              <Button kind="ghost" size="lg" href={h.secondary.href}>{h.secondary.label}</Button>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ marginTop: 34 }}><ServiceTags items={areas} /></div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div style={{ position: "relative" }}>
            <Placeholder
              ratio="4:3"
              purpose="Hero — fresh curb job"
              photoStyle="Bright natural daylight, shallow depth of field, crisp shadows"
              composition="Low angle on a freshly painted white curb panel with bold black house numbers; suburban Portland home softly blurred behind"
              src="/images/homepage_hero_new.png"
            />
            <div style={{ position: "absolute", left: "-6%", bottom: "-7%" }}>
              <CurbBlock number="1247" reflective tag width="206px" numSize="2.5rem" rotate={-3} style={{ boxShadow: "var(--shadow-lg)" }} />
            </div>
            <div className="pin" style={{ top: "9%", right: "-4%" }}>
              <span style={{ color: "var(--accent-ink)", display: "inline-flex" }}>{Icon.clock({ s: 15 })}</span> Done in 20 min
            </div>
            <div className="pin" style={{ bottom: "18%", right: "-6%" }}>
              <span className="dot" style={{ width: 9, height: 9, borderRadius: "50%", background: "oklch(0.78 0.16 150)" }} /> Pay after you&apos;re happy
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Trust strip (marquee) ────────────────────────────── */
function TrustStrip() {
  const items: [string, typeof Icon.pin][] = [
    ["Door-to-door since 2020", Icon.pin],
    ["15–20 minutes per address", Icon.clock],
    ["Pay only when you're happy", Icon.wallet],
    ["Same-day across Oregon", Icon.shield],
    ["Standard & reflective", Icon.spark],
  ];
  const row = items.map(([t, I], i) => (
    <span className="marquee__item" key={i}>
      <span style={{ color: "var(--accent-ink)", display: "inline-flex" }}>{I({ s: 17 })}</span>{t}
    </span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{row}{row}</div>
    </div>
  );
}

/* ── Social proof ─────────────────────────────────────── */
function SocialProof() {
  const r = home.reviews;
  return (
    <section className="section">
      <div className="wrap">
        <Reveal><SectionHead eyebrow={r.eyebrow} title={r.heading} /></Reveal>
        <div className="cols-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 44 }}>
          {r.items.map((t, i) => (
            <Reveal key={t.quote} delay={i * 90}>
              <figure className="card card--hover" style={{ margin: 0, height: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", gap: 2, color: "var(--accent-2)" }}>
                  {[0, 1, 2, 3, 4].map((s) => <span key={s}>{Icon.star({ s: 17 })}</span>)}
                </div>
                <blockquote className="display" style={{ margin: 0, fontSize: "1.3rem", fontWeight: 750, letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--ink)" }}>“{t.quote}”</blockquote>
                <figcaption className="muted" style={{ marginTop: "auto", fontWeight: 600, fontSize: "0.92rem", display: "inline-flex", alignItems: "center", gap: 8 }}>{Icon.pin({ s: 14 })} {t.where}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────── */
function HowItWorks() {
  const p = home.process;
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <Reveal><SectionHead eyebrow={p.eyebrow} title={p.heading} intro="No app, no scheduling window, no waiting around. Three steps and you're done." /></Reveal>
        <Reveal delay={100}>
          <div className="steps" style={{ marginTop: 44, gridTemplateColumns: "1fr 1fr 1fr" }}>
            {p.steps.map((s) => (
              <div className="step" key={s.n} style={{ gridTemplateColumns: "1fr", gap: 22 }}>
                <CurbBlock number={s.n} width="118px" numSize="2.3rem" />
                <div>
                  <h3 className="h3">{s.title}</h3>
                  <p className="body-p" style={{ marginTop: 10, marginBottom: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Work teaser ──────────────────────────────────────── */
function WorkTeaser() {
  const g = home.galleryTeaser;
  const shots = galleryContent.jobs.slice(0, 4);
  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
          <Reveal><SectionHead eyebrow={g.eyebrow} title={g.heading} /></Reveal>
          <Reveal delay={80}>
            <a className="tlink" href={g.cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>{g.cta.label} {Icon.arrow({ s: 16 })}</a>
          </Reveal>
        </div>
        <div className="cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40 }}>
          {shots.map((s, i) => (
            <Reveal key={`${s.city}-${s.neighborhood}`} delay={i * 70}>
              <Placeholder ratio="3:4" purpose={`${s.neighborhood}, ${s.city}`} photoStyle="Daylight, straight-on" composition="Painted curb panel, clean street context" src={s.src} />
              <div className="gal-cap">
                <span className="loc" style={{ fontSize: "0.86rem" }}>{s.neighborhood}, {s.city}</span>
                <span className="typ">{s.type}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Benefits (why reflective) ────────────────────────── */
function Benefits() {
  const b = home.benefits;
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap stack-mobile" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.92fr) minmax(0,1.08fr)", gap: "clamp(28px,5vw,60px)", alignItems: "center" }}>
        <Reveal>
          <SectionHead eyebrow={b.eyebrow} title={b.heading} intro={b.body} />
          <div style={{ marginTop: 24 }}>
            {b.points.map((pt) => (
              <div className="feat" key={pt}>{Icon.check({ s: 16 })}<span>{pt}</span></div>
            ))}
          </div>
          <div style={{ marginTop: 26 }}>
            <Button kind="primary" href={home.galleryTeaser.cta.href} arrow>See the work</Button>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ position: "relative" }}>
            <Placeholder
              ratio="4:3"
              purpose="Reflective curb at night"
              photoStyle="Dusk / night photo, headlight glow on reflective paint"
              composition="Reflective house number lit up on a dim street"
              src="/images/homepage_benefits_new.png?v=2"
            />
            <div style={{ position: "absolute", left: "-6%", bottom: "-7%" }}>
              <CurbBlock number="824" reflective tag width="180px" numSize="2.2rem" style={{ boxShadow: "var(--shadow-lg)" }} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── About teaser ─────────────────────────────────────── */
function AboutTeaser() {
  const a = home.about;
  return (
    <section className="section">
      <div className="wrap stack-mobile" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,0.8fr)", gap: "clamp(28px,5vw,72px)", alignItems: "center" }}>
        <Reveal>
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <blockquote className="display" style={{ margin: "22px 0 0", fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)", fontWeight: 750, lineHeight: 1.18, letterSpacing: "-0.02em" }}>
            “{a.quote}”
          </blockquote>
          <div className="tags" style={{ marginTop: 28 }}>
            {a.credentials.map((t) => (
              <span className="tag" key={t}><span className="dot" />{t}</span>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Button kind="ghost" href={a.cta.href} arrow>{a.cta.label}</Button>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ position: "relative" }}>
            <Placeholder ratio="3:4" purpose="On the job in Oregon" photoStyle="Warm natural light, environmental" composition="Painter kneeling beside a freshly painted curb, kit in frame" src="/images/about_hero_new.png" />
            <div className="pin" style={{ bottom: "6%", left: "-5%" }}><span className="dot" style={{ width: 9, height: 9, borderRadius: "50%", background: "oklch(0.78 0.16 150)" }} /> Started with a knock</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Hiring / recruitment teaser ──────────────────────── */
function Hiring() {
  const h = home.hiring;
  return (
    <section className="section--tight">
      <div className="wrap">
        <Reveal>
          <div className="card stack-mobile" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 30, alignItems: "center", background: "oklch(1 0 0 / 0.55)" }}>
            <div>
              <Eyebrow>{h.eyebrow}</Eyebrow>
              <h2 className="display h2" style={{ marginTop: 16 }}>{h.heading}</h2>
              <p className="body-p" style={{ marginTop: 14 }}>{h.body}</p>
            </div>
            <div style={{ justifySelf: "start" }}>
              <Button kind="primary" href={h.cta.href} arrow>{h.cta.label}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

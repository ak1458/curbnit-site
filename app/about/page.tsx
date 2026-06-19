import type { Metadata } from "next";
import { about } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: about.seo.title,
  description: about.seo.description,
};

export default function AboutPage() {
  return (
    <div className="page-fade">
      <section className="section--tight" style={{ paddingTop: "clamp(40px,5vw,80px)" }}>
        <div className="wrap">
          <Reveal>
            <div style={{ position: "relative", borderRadius: "calc(var(--radius) + 8px)", overflow: "hidden" }}>
              <Placeholder
                ratio="16:9"
                h="clamp(360px, 48vw, 580px)"
                bare
                purpose="About hero — on the job"
                photoStyle="Cinematic golden-hour, wide"
                composition="Walking a Portland street with the paint kit, houses receding behind"
                style={{ borderRadius: "calc(var(--radius) + 8px)" }}
                src="/images/about_hero_new.png"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, oklch(0.21 0.01 66 / 0.72), transparent 58%)", display: "flex", alignItems: "flex-end", padding: "clamp(24px,4vw,52px)" }}>
                <div>
                  <blockquote className="display" style={{ margin: 0, color: "var(--paper)", fontSize: "clamp(1.7rem,3.4vw,2.9rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.025em", maxWidth: "20ch" }}>“{about.heroQuote}”</blockquote>
                  <div style={{ marginTop: 14, color: "oklch(0.97 0.006 84 / 0.8)", fontWeight: 600 }}>{about.heroAttribution}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <div className="wrap stack-mobile" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.15fr)", gap: "clamp(28px,5vw,72px)", alignItems: "start" }}>
          <div>
            <Reveal><SectionHead eyebrow="About" title={about.story.heading} /></Reveal>
            <Reveal delay={120}>
              <div style={{ marginTop: 28, maxWidth: "340px", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
                <img
                  src="/images/profile.png"
                  alt="Jimmy Li headshot"
                  style={{ width: "100%", height: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div style={{ fontSize: "1.18rem", lineHeight: 1.62, color: "var(--ink-2)", display: "grid", gap: "1.1em" }}>
              {about.story.paragraphs.map((p, i) => (
                <p key={p.slice(0, 24)} style={{ margin: 0, ...(i === about.story.paragraphs.length - 1 ? { color: "var(--ink)", fontWeight: 600 } : {}) }}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cols-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {about.story.stats.map((s) => (
                <div className="card" key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <b className="display" style={{ fontWeight: 800, fontSize: "clamp(1.5rem,2.4vw,2.1rem)", letterSpacing: "-0.03em" }}>{s}</b>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}

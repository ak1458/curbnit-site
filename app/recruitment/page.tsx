import type { Metadata } from "next";
import { recruitment } from "@/lib/content";
import { telHref } from "@/lib/config";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: recruitment.seo.title,
  description: recruitment.seo.description,
};

const COLUMNS = ["whatYouDo", "whoWeWant", "perks"] as const;

export default function RecruitmentPage() {
  const callHref = telHref() || "/contact/";

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="section--tight" style={{ paddingTop: "clamp(48px,6vw,96px)" }}>
        <div className="wrap stack-mobile" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Reveal><Eyebrow>{recruitment.hero.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={50}><h1 className="display h1" style={{ marginTop: 18 }}>{recruitment.hero.heading}</h1></Reveal>
            <Reveal delay={110}><p className="lead" style={{ marginTop: 22 }}>{recruitment.hero.sub}</p></Reveal>
            <Reveal delay={170}>
              <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
                <Button kind="primary" size="lg" href={callHref} arrow>Call Now</Button>
                <Button kind="ghost" size="lg" href="/contact/?type=join">Apply</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Placeholder ratio="4:3" purpose="Painter on the job, door-to-door" photoStyle="Bright daylight, candid, full color" composition="Painter walking up to a house with kit in hand" src="/images/recruitment_hero_new.png" />
          </Reveal>
        </div>
      </section>

      {/* What it is / who fits / why */}
      <section className="section" style={{ background: "var(--paper-2)", paddingTop: "clamp(48px,6vw,90px)" }}>
        <div className="wrap">
          <div className="cols-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "stretch" }}>
            {COLUMNS.map((key, i) => {
              const col = recruitment[key];
              return (
                <Reveal key={key} delay={i * 90}>
                  <div className="card" style={{ height: "100%" }}>
                    <h3 className="h3">{col.heading}</h3>
                    <div style={{ marginTop: 14 }}>
                      {col.items.map((item) => (
                        <div className="feat" key={item}>{Icon.check({ s: 16 })}<span>{item}</span></div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--tight" style={{ paddingBottom: "clamp(56px,7vw,96px)" }}>
        <div className="wrap">
          <Reveal>
            <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "calc(var(--radius) + 8px)", padding: "clamp(34px,5vw,68px)", textAlign: "center" }}>
              <h2 className="display h2" style={{ color: "var(--paper)" }}>{recruitment.cta.heading}</h2>
              <p style={{ color: "oklch(0.97 0.006 84 / 0.72)", fontSize: "1.1rem", marginTop: 14, maxWidth: "56ch", marginInline: "auto" }}>{recruitment.cta.sub}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
                <Button kind="accent" size="lg" href={callHref} arrow>Call Now</Button>
                <Button kind="ghost" size="lg" href="/contact/?type=join"><span style={{ color: "var(--paper)" }}>Apply via contact form</span></Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

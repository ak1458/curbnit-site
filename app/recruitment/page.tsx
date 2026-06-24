import type { Metadata } from "next";
import { recruitment } from "@/lib/content";
import { telHref } from "@/lib/config";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";
import { Icon } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";

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
                <Button kind="ghost" size="lg" href="#apply-form">Apply</Button>
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

      {/* Form Section */}
      <section id="apply-form" className="section--tight" style={{ paddingBottom: "clamp(56px,7vw,96px)", paddingTop: "clamp(24px,4vw,48px)" }}>
        <div className="wrap" style={{ maxWidth: 680 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 className="display h2">{recruitment.cta.heading}</h2>
              <p className="muted" style={{ marginTop: 10 }}>{recruitment.cta.sub}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card" style={{ background: "oklch(1 0 0 / 0.6)", boxShadow: "var(--shadow-card)" }}>
              <ContactForm defaultMode="join" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

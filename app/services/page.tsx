import type { Metadata } from "next";
import { services } from "@/lib/content";
import { telHref } from "@/lib/config";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CurbBlock } from "@/components/CurbBlock";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: services.seo.title,
  description: services.seo.description,
};

const CURBS: Record<string, { number: string; reflective?: boolean } | null> = {
  Standard: { number: "612" },
  Reflective: { number: "612", reflective: true },
  Custom: null,
};

export default function ServicesPage() {
  const callHref = telHref() || "/contact/";

  return (
    <div className="page-fade">
      <PageHero eyebrow="Services" title={services.hero.heading} sub={services.hero.sub} />

      <section className="section--tight" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="cols-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
            {services.tiers.map((t, i) => {
              const popular = t.name === "Reflective";
              const curb = CURBS[t.name];
              return (
                <Reveal key={t.name} delay={i * 90}>
                  <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 20, borderColor: popular ? "var(--ink)" : "var(--line)", boxShadow: popular ? "var(--shadow)" : "none" }}>
                    <div style={{ minHeight: 132 }}>
                      {curb ? (
                        <CurbBlock number={curb.number} reflective={curb.reflective} width="124px" numSize="2rem" />
                      ) : (
                        <div style={{ width: 120, height: 96, borderRadius: 10, border: "1.5px dashed var(--line-2)", display: "grid", placeItems: "center", color: "var(--ink-3)", fontFamily: "var(--font-paint)", fontSize: "2rem" }}>?</div>
                      )}
                    </div>
                    <div>
                      <h2 className="h3" style={{ fontSize: "1.45rem" }}>{t.name}</h2>
                      <p className="muted" style={{ marginTop: 6, fontWeight: 600 }}>{t.blurb}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      {t.features.map((f) => (
                        <div className="feat" key={f}>{Icon.check({ s: 16 })}<span>{f}</span></div>
                      ))}
                    </div>
                    <Button kind={popular ? "primary" : "ghost"} block href={callHref} arrow>Call Now</Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="muted" style={{ textAlign: "center", fontSize: "0.92rem", marginTop: 26 }}>
            Price depends on size, location, and number of digits — Curb&apos;n IT confirms it before any paint touches the curb.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="wrap stack-mobile" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.7fr) minmax(0,1.3fr)", gap: "clamp(28px,5vw,72px)", alignItems: "start" }}>
          <Reveal><SectionHead eyebrow={services.faq.eyebrow} title={services.faq.heading} /></Reveal>
          <Reveal delay={100}><FAQAccordion items={services.faq.items} /></Reveal>
        </div>
      </section>

      <CTABanner />

      <JsonLd data={serviceSchema()} />
      <JsonLd data={faqSchema()} />
    </div>
  );
}

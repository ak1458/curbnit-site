import type { Metadata } from "next";
import { contact } from "@/lib/content";
import { business, telHref, venmoHandle } from "@/lib/config";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: contact.seo.title,
  description: contact.seo.description,
};

export default function ContactPage() {
  const tel = telHref();
  const phoneShown = business.phone.includes("[") ? "Phone coming soon" : business.phone;
  const hasVenmo = !business.venmo.includes("[");

  const rows: [typeof Icon.phone, string, string][] = [
    [Icon.phone, "Phone", `${phoneShown}${tel ? " — text works too" : ""}`],
    ...(hasVenmo ? ([[Icon.wallet, "Venmo", `@${venmoHandle()}`]] as [typeof Icon.phone, string, string][]) : []),
    [Icon.pin, "Service area", `Oregon-wide — ${business.serviceAreas.slice(0, 3).join(" · ")} · + more`],
    [Icon.clock, "Response time", business.responseTime],
  ];

  return (
    <div className="page-fade">
      <PageHero eyebrow="Contact" title={contact.hero.heading} sub={contact.hero.sub} />

      <section className="section--tight" style={{ paddingTop: 8 }}>
        <div className="wrap stack-mobile" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(0,0.75fr)", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
          <Reveal>
            <div className="card" style={{ background: "oklch(1 0 0 / 0.6)" }}>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "grid", gap: 16 }}>
              <div className="card">
                <h3 className="h3" style={{ fontSize: "1.2rem" }}>{contact.sidePanel.heading}</h3>
                <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
                  {rows.map(([I, label, value]) => (
                    <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ flex: "none", width: 36, height: 36, borderRadius: 10, background: "var(--paper-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--accent-ink)" }}>{I({ s: 17 })}</span>
                      <div>
                        <div style={{ fontWeight: 650, fontSize: "0.92rem" }}>{label}</div>
                        <div className="muted" style={{ fontSize: "0.9rem" }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {tel && (
                <a href={tel} className="card card--hover" style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--ink)", color: "var(--paper)" }}>
                  <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: "var(--accent)", color: "var(--on-accent)", display: "grid", placeItems: "center" }}>{Icon.phone({ s: 20 })}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>Rather just call?</div>
                    <div style={{ opacity: 0.7, fontSize: "0.9rem" }}>{phoneShown}</div>
                  </div>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

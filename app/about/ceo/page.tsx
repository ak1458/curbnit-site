import type { Metadata } from "next";
import Link from "next/link";
import { ceoProfile } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: ceoProfile.seo.title,
  description: ceoProfile.seo.description,
};

export default function CeoProfilePage() {
  const { story } = ceoProfile;

  return (
    <div className="page-fade">
      {/* Back button and page intro */}
      <section className="section--tight" style={{ paddingTop: "clamp(32px,4vw,56px)", paddingBottom: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: 20 }}>
              <Link
                href="/about/"
                className="tlink"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "var(--ink-2)",
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to About
              </Link>
            </div>
            <SectionHead eyebrow={story.eyebrow} title={story.heading} />
          </Reveal>
        </div>
      </section>

      {/* Main descriptive profile section */}
      <section className="section" style={{ paddingTop: "clamp(24px,3vw,44px)" }}>
        <div
          className="wrap stack-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.15fr)",
            gap: "clamp(28px,5vw,72px)",
            alignItems: "start",
          }}
        >
          {/* Left column: photo & executive profile card */}
          <div>
            <Reveal delay={60}>
              <div className="photo-mask" style={{ maxWidth: "360px" }}>
                <div className="photo-mask__backdrop" aria-hidden="true" />
                <div className="photo-mask__frame">
                  <img
                    src={story.image}
                    alt="Jimmy Li — Chief Executive Officer"
                    className="photo-mask__img"
                  />
                </div>
                <div
                  className="pin"
                  style={{
                    position: "absolute",
                    bottom: "6%",
                    right: "-3%",
                    zIndex: 5,
                    boxShadow: "var(--shadow)",
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    className="dot"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "oklch(0.78 0.16 150)",
                      display: "inline-block",
                    }}
                  />
                  Founder & CEO
                </div>
              </div>

              <div
                className="card"
                style={{
                  marginTop: 24,
                  maxWidth: "360px",
                  padding: "18px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  background: "var(--paper-2)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--ink-2)",
                  }}
                >
                  {story.executiveProfile.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.93rem" }}>
                  {story.executiveProfile.items.map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        className="dot"
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "oklch(0.78 0.16 150)",
                          flexShrink: 0,
                        }}
                      />
                      <span>
                        <strong>{item.label}:</strong> {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column: detailed story paragraphs */}
          <Reveal delay={100}>
            <div
              style={{
                fontSize: "1.14rem",
                lineHeight: 1.72,
                color: "var(--ink-2)",
                display: "grid",
                gap: "1.25em",
              }}
            >
              {story.paragraphs.map((p, i) => (
                <p key={i} style={{ margin: 0, textWrap: "pretty" }}>
                  {p}
                </p>
              ))}

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 20,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span className="display" style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--ink)" }}>
                  {story.signoff}
                </span>
                <span style={{ fontSize: "0.92rem", color: "var(--ink-2)", fontWeight: 600 }}>
                  {story.signoffTitle}
                </span>
              </div>

              <div className="tags" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {story.badges.map((b) => (
                  <span className="tag" key={b}>
                    <span className="dot" />
                    {b}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
                <Button kind="primary" href="/contact/">
                  Get a Quote
                </Button>
                <Button kind="ghost" href="/about/" arrow>
                  Back to About
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats row */}
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cols-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {story.stats.map((s) => (
                <div className="card" key={s} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <b
                    className="display"
                    style={{
                      fontWeight: 800,
                      fontSize: "clamp(1.5rem,2.4vw,2.1rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s}
                  </b>
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

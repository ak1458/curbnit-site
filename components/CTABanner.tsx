import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { CurbBlock } from "./CurbBlock";
import { home } from "@/lib/content";
import { telHref } from "@/lib/config";

/** Dark closing call-to-action banner with a faint oversized curb number. */
export function CTABanner() {
  const c = home.finalCta;
  const callHref = telHref() || c.primary.href;
  return (
    <section className="section--tight" style={{ paddingBottom: "clamp(56px,7vw,96px)" }}>
      <div className="wrap">
        <Reveal>
          <div
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              borderRadius: "calc(var(--radius) + 8px)",
              padding: "clamp(34px,5vw,68px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="cta-grid stack-mobile" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 30, alignItems: "center" }}>
              <div>
                <h2 className="display h2" style={{ color: "var(--paper)" }}>{c.heading}</h2>
                <p style={{ color: "oklch(0.97 0.006 84 / 0.72)", fontSize: "1.15rem", marginTop: 14 }}>{c.sub}</p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button kind="accent" size="lg" href={callHref} arrow>{c.primary.label}</Button>
                <Button kind="ghost" size="lg" href={c.secondary.href}>
                  <span style={{ color: "var(--paper)" }}>{c.secondary.label}</span>
                </Button>
              </div>
            </div>
            <div style={{ position: "absolute", right: "-3%", top: "50%", transform: "translateY(-50%) rotate(-6deg)", opacity: 0.14 }}>
              <CurbBlock number="503" width="320px" numSize="5rem" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

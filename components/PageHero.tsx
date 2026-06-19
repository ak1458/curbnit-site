import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

/** Compact page hero: eyebrow + display H1 + lead sub. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="section--tight" style={{ paddingTop: "clamp(48px,6vw,96px)", paddingBottom: "clamp(28px,3vw,44px)" }}>
      <div className="wrap">
        {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
        <Reveal delay={50}><h1 className="display h1" style={{ marginTop: 18, maxWidth: "16ch" }}>{title}</h1></Reveal>
        {sub && <Reveal delay={110}><p className="lead" style={{ marginTop: 22, maxWidth: "52ch" }}>{sub}</p></Reveal>}
        {children}
      </div>
    </section>
  );
}

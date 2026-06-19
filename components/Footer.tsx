import Link from "next/link";
import { business, telHref, venmoHandle } from "@/lib/config";
import { nav, footer } from "@/lib/content";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Footer() {
  const tel = telHref();
  const phoneShown = business.phone.includes("[") ? "Phone coming soon" : business.phone;
  const venmo = venmoHandle();
  const hasVenmo = !business.venmo.includes("[");

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Logo light />
            <p style={{ marginTop: 16, maxWidth: "34ch", color: "oklch(0.97 0.006 84 / 0.66)", lineHeight: 1.55 }}>
              {footer.tagline} Door-to-door, same-day, fair price across Oregon.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {tel ? (
                <a className="btn btn--accent btn--sm" href={tel}>{Icon.phone({ s: 16 })} Call / text us</a>
              ) : (
                <Link className="btn btn--accent btn--sm" href="/contact/">{Icon.phone({ s: 16 })} Get in touch</Link>
              )}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5, marginBottom: 14 }}>Pages</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 11 }}>
              {nav.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="tlink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5, marginBottom: 14 }}>Get in touch</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 11, fontSize: "0.95rem" }}>
              <li>{tel ? <a href={tel}>{phoneShown}</a> : <span style={{ color: "oklch(0.97 0.006 84 / 0.66)" }}>{phoneShown}</span>}</li>
              {hasVenmo && <li>Venmo · @{venmo}</li>}
              <li style={{ color: "oklch(0.97 0.006 84 / 0.66)" }}>{business.serviceAreas.slice(0, 3).join(" · ")}</li>
              <li style={{ color: "oklch(0.97 0.006 84 / 0.66)" }}>{business.serviceAreaLabel}</li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5, marginBottom: 14 }}>Legal</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 11, fontSize: "0.95rem" }}>
              <li><Link href="/privacy" className="tlink">Privacy Policy</Link></li>
              <li><Link href="/terms" className="tlink">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="tlink">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span>© {new Date().getFullYear()} {business.name} · Oregon</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, opacity: 0.7 }}>
              {Icon.pin({ s: 14 })} {business.responseTime}
            </span>
          </div>
          <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            Created by <a href="https://smilefotilo.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>Smile Fotilo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

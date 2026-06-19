"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { telHref } from "@/lib/config";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function Nav() {
  const ctaHref = telHref() || nav.cta.href;
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="wrap nav__inner">
          <Logo />
          <nav className="nav__links">
            {nav.links.map((l) => (
              <Link key={l.href} href={l.href} className={"nav__link" + (isActive(l.href) ? " active" : "")}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__cta">
            <Button kind="primary" size="sm" href={ctaHref}>{nav.cta.label}</Button>
            <button className="nav__burger" aria-label="Menu" onClick={() => setMenu(true)}>
              {Icon.menu({})}
            </button>
          </div>
        </div>
      </header>

      <div className={"mnav" + (menu ? " open" : "")}>
        <div className="mnav__top">
          <Logo />
          <button
            className="ai-x"
            style={{ background: "var(--paper-2)", color: "var(--ink)" }}
            onClick={() => setMenu(false)}
            aria-label="Close"
          >
            {Icon.x({})}
          </button>
        </div>
        <div className="mnav__links">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)}>
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <Button kind="primary" size="lg" block href={ctaHref} arrow>{nav.cta.label}</Button>
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Transform-only entrance on scroll (ported from the prototype).
 * Opacity is NEVER animated, so content can't get stranded invisible — a
 * throttled transition just leaves it a few px low. `delay` is in ms.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setSeen(true);
      }
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.94 && r.bottom > 0) reveal();
    };
    check();
    let io: IntersectionObserver | undefined;
    if (!done && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              reveal();
              io && io.disconnect();
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -6% 0px" },
      );
      io.observe(el);
    }
    const onScroll = () => {
      check();
      if (done && io) io.disconnect();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const t = setTimeout(reveal, 1400); // safety net
    return () => {
      io && io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`.trim()}
      style={{ transitionDelay: seen ? `${delay}ms` : "0ms", ...style }}
    >
      {children}
    </div>
  );
}

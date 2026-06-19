"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export type QA = { q: string; a: string };

/** One-open-at-a-time accordion (prototype .faq). */
export function FAQAccordion({ items }: { items: readonly QA[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={"faq__item" + (isOpen ? " open" : "")} key={f.q}>
            <button className="faq__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              {f.q}
              <span className="faq__icon">{Icon.plus({ s: 14 })}</span>
            </button>
            <div className="faq__a" style={{ maxHeight: isOpen ? 280 : 0 }}>
              <div className="faq__a-inner">{f.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

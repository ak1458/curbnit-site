import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "./Icon";

type Kind = "primary" | "accent" | "ghost";
type Size = "lg" | "sm";

type CommonProps = {
  kind?: Kind;
  size?: Size;
  block?: boolean;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

function classes(kind: Kind, size?: Size, block?: boolean, extra = "") {
  return [
    "btn",
    `btn--${kind}`,
    size ? `btn--${size}` : "",
    block ? "btn--block" : "",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

/** Renders as <a> for tel/mailto/external, <Link> for internal routes, else <button>. */
export function Button(
  props: CommonProps &
    (
      | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">)
      | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
    ),
) {
  const { kind = "primary", size, block, arrow, className = "", children, href, ...rest } = props as {
    kind?: Kind;
    size?: Size;
    block?: boolean;
    arrow?: boolean;
    className?: string;
    children: React.ReactNode;
    href?: string;
  } & Record<string, unknown>;

  const cls = classes(kind, size, block, className);
  const inner = (
    <>
      {children}
      {arrow && <span className="arr">{Icon.arrow({ s: 18 })}</span>}
    </>
  );

  if (href) {
    const isExternal = /^(tel:|mailto:|https?:)/.test(href);
    if (isExternal) {
      return (
        <a href={href} className={cls} {...(rest as ComponentPropsWithoutRef<"a">)}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">)}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {inner}
    </button>
  );
}

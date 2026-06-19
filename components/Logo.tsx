import Link from "next/link";

/** Curb'n IT wordmark — "Curb'n" + a painted "IT" panel. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={"logo" + (light ? " logo--light" : "")} aria-label="Curb'n IT — home">
      <img 
        src="/images/logo_transparent.png" 
        alt="Curb'n IT Logo" 
        style={{ height: "40px", width: "auto", objectFit: "contain", filter: light ? "brightness(0) invert(1)" : "none" }} 
      />
    </Link>
  );
}

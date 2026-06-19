import type { CSSProperties } from "react";
import { Eyebrow } from "./Eyebrow";

/** Eyebrow + display H2 (+ optional lead intro). */
export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  max,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  max?: string;
}) {
  const style: CSSProperties = {
    textAlign: align,
    maxWidth: max || (align === "center" ? "640px" : undefined),
    marginInline: align === "center" ? "auto" : undefined,
  };
  return (
    <div style={style}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display h2" style={{ marginTop: 18 }}>{title}</h2>
      {intro && (
        <p className="lead" style={{ marginTop: 18, marginInline: align === "center" ? "auto" : undefined }}>
          {intro}
        </p>
      )}
    </div>
  );
}

import type { CSSProperties } from "react";

/** The signature motif: a concrete curb face with a painted address panel. */
export function CurbBlock({
  number = "1247",
  reflective = false,
  width,
  numSize,
  tag = false,
  rotate = 0,
  style,
}: {
  number?: string;
  reflective?: boolean;
  width?: string;
  numSize?: string;
  tag?: boolean;
  rotate?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className={"curb" + (reflective ? " curb--reflect" : "")}
      style={{
        ["--cw" as string]: width || "220px",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      {tag && <span className="curb__tag">{reflective ? "Reflective" : "Standard"}</span>}
      <div className="curb__panel">
        <span className="curb__num" style={{ ["--num-size" as string]: numSize || "3.4rem" }}>
          {number}
        </span>
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import { Icon } from "./Icon";

/**
 * Labeled image placeholder (ported from the prototype's ImagePlaceholder).
 * Describes the photo that belongs in each slot. Pass `src` to drop in a real
 * image later — same box, same dimensions, no layout shift.
 */
const PAD: Record<string, string> = {
  "16:9": "56.25%",
  "4:3": "75%",
  "1:1": "100%",
  "3:4": "133%",
  "3:2": "66.6%",
};

export function Placeholder({
  purpose,
  photoStyle,
  composition,
  ratio = "16:9",
  h,
  src,
  alt,
  bare = false,
  className = "",
  style,
  priority = false,
}: {
  purpose: string;
  photoStyle?: string;
  composition?: string;
  ratio?: string;
  /** Fixed height instead of an aspect ratio (e.g. "clamp(360px,48vw,580px)"). */
  h?: string;
  src?: string;
  alt?: string;
  bare?: boolean;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  const pad = PAD[ratio] ?? "75%";
  return (
    <div
      className={("ph " + className).trim()}
      style={{ paddingTop: h ? undefined : pad, minHeight: h || undefined, ...style }}
      role="img"
      aria-label={alt ?? purpose}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? purpose}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="ph__img"
          style={{ position: "absolute", inset: 0 }}
        />
      ) : (
        <>
          <span className="ph__chip">Image · {purpose}</span>
          <span className="ph__ratio">{ratio}</span>
          <span className="ph__icon">{Icon.image({})}</span>
          {!bare && (
            <div className="ph__meta">
              {photoStyle && <div><b>Style:</b> {photoStyle}</div>}
              {composition && <div><b>Shot:</b> {composition}</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

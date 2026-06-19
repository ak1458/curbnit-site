import { telHref } from "@/lib/config";
import { Button } from "./Button";
import { Icon } from "./Icon";

/** Fixed bottom call / quote bar — mobile only (shown via CSS at <=760px). */
export function MobileStickyBar() {
  const tel = telHref();
  return (
    <div className="sticky-bar">
      <a className="btn btn--ghost" href={tel || "/contact/"} style={{ background: "oklch(1 0 0 / 0.6)" }}>
        {Icon.phone({ s: 17 })} Call
      </a>
      <Button kind="primary" href="/contact/">Get a Quote</Button>
    </div>
  );
}

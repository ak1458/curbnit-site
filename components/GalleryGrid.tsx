"use client";

import { useMemo, useState } from "react";
import { gallery } from "@/lib/content";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { Button } from "./Button";

const KNOWN = ["Portland", "Beaverton", "Tigard", "Tualatin", "Lake Oswego"];

export function GalleryGrid() {
  const [filter, setFilter] = useState<string>("All");
  const jobs = gallery.jobs;

  const shown = useMemo(() => {
    if (filter === "All") return jobs;
    if (filter === "Other") return jobs.filter((j) => !KNOWN.includes(j.city));
    return jobs.filter((j) => j.city === filter);
  }, [filter, jobs]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <div className="filterbar">
          {gallery.filters.map((f) => (
            <button key={f} className={"filter" + (filter === f ? " active" : "")} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <span className="muted" style={{ fontSize: "0.9rem", fontWeight: 600, whiteSpace: "nowrap" }}>
          Showing {shown.length} {shown.length === 1 ? "job" : "jobs"}
        </span>
      </div>

      {shown.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "64px 24px" }}>
          <h3 className="h3">{gallery.empty.heading}</h3>
          <p className="body-p" style={{ margin: "10px auto 20px" }}>{gallery.empty.body}</p>
          <Button kind="primary" href="/contact/" arrow>Contact Curb&apos;n IT</Button>
        </div>
      ) : (
        <div className="grid-gal">
          {shown.map((g, i) => (
            <Reveal key={`${g.neighborhood}-${g.city}-${i}`} delay={(i % 3) * 70} className="gal-item">
              <Placeholder ratio="4:3" purpose={g.neighborhood} photoStyle="Daylight, straight-on" composition={`${g.type} curb panel, ${g.neighborhood} street`} src={g.src} />
              <div className="gal-cap">
                <span className="loc">{g.neighborhood}, {g.city}, OR</span>
                <span className="typ">{g.type}</span>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

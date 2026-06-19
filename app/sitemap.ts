import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "services", "gallery", "about", "recruitment", "contact"];
  const now = new Date();
  return routes.map((r) => ({
    url: `${siteUrl}/${r}${r ? "/" : ""}`,
    lastModified: now,
    changeFrequency: r === "gallery" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}

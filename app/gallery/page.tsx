import type { Metadata } from "next";
import { gallery } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: gallery.seo.title,
  description: gallery.seo.description,
};

export default function GalleryPage() {
  return (
    <div className="page-fade">
      <PageHero
        eyebrow="The work"
        title={gallery.hero.heading}
        sub={gallery.hero.sub}
      />
      <section className="section--tight" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <GalleryGrid />
        </div>
      </section>
      <CTABanner />
    </div>
  );
}

/** JSON-LD structured-data builders. Kept data-only so pages stay clean. */
import { business, siteUrl } from "./config";
import { services } from "./content";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description:
      "Curb address painting service serving Portland, Beaverton, Tigard, Tualatin, Lake Oswego, and surrounding areas. Door-to-door, same-day service.",
    url: siteUrl,
    areaServed: "Oregon",
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressRegion: "OR", addressCountry: "US" },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Curb address number painting",
    provider: { "@type": "LocalBusiness", name: business.name },
    areaServed: "Oregon",
    offers: services.tiers.map((t) => ({
      "@type": "Offer",
      name: t.name,
      description: t.blurb,
    })),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: services.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

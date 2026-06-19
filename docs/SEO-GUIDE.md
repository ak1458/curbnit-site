# SEO Guide

The site is built for **local SEO** — the goal is that when someone in Oregon searches "curb
painting Portland" (or looks up "Curb'n IT" after Jimmy knocks), the site ranks and reads as
trustworthy. Here's what's already in place and what to do over time.

---

## What's already implemented

| Feature | Where | Notes |
|---|---|---|
| Unique title + meta description per page | each `app/*/page.tsx` (`metadata`) | Pulled from `lib/content.ts` |
| Open Graph + Twitter tags | `app/layout.tsx` | For link previews when shared |
| `LocalBusiness` structured data | `app/layout.tsx` (every page) | Name, area served (Oregon), founder, price range |
| `Service` structured data | `/services` | The three tiers with prices |
| `FAQPage` structured data | `/` and `/services` | Can earn FAQ rich results in Google |
| `sitemap.xml` | auto-generated (`app/sitemap.ts`) | Lists all 5 pages |
| `robots.txt` | auto-generated (`app/robots.ts`) | Allows all, points to sitemap |
| Semantic headings (one `h1`/page) | all pages | Clear hierarchy for crawlers |
| Fast, static, mobile-first | whole build | Core Web Vitals friendly |
| Self-hosted fonts | `app/layout.tsx` | No render-blocking font request |

---

## Do these after launch (high impact, off-site)

1. **Google Business Profile** — the single biggest local SEO lever. Create/claim a profile for
   Curb'n IT: service-area business covering Portland/Salem/Eugene, add the website URL, post real
   job photos, and **ask happy customers for Google reviews**. This feeds the map pack.
2. **Google Search Console** — add `curbnit.us`, verify, and submit `https://curbnit.us/sitemap.xml`.
3. **Consistent NAP** — keep Name / phone / area identical everywhere (site, Google, any directories).
4. **Real reviews** — replace the placeholder testimonials with genuine quotes, and turn the
   `showTestimonials` flag on. Review signals matter for local trust + ranking.

---

## Keyword focus (already reflected in copy)

Primary: *curb address painting Oregon*, *curb number painting Portland*, *paint house numbers on curb*.
Secondary: city names (Salem, Eugene, Lake Oswego), *reflective curb numbers*, *curb painting near me*.

These appear naturally in headings, body copy, and meta — don't keyword-stuff; the current balance is good.

---

## Updating SEO text

- Page titles/descriptions: edit the `seo` blocks in [`lib/content.ts`](../lib/content.ts).
- Business facts in structured data: [`lib/config.ts`](../lib/config.ts) + [`lib/schema.ts`](../lib/schema.ts).
- After edits: `npm run build`, re-upload, then in Search Console "Request indexing" for changed pages.

---

## Verifying

- Test structured data: <https://search.google.com/test/rich-results> (paste the live URL).
- Check Core Web Vitals / performance: run Lighthouse in Chrome DevTools against the **live** site
  (local dev numbers are lower than production).
- Confirm `https://curbnit.us/sitemap.xml` and `/robots.txt` load.

# Placeholder Image Guide

No real images are generated for this build. Every photo slot renders a **labeled placeholder box**
describing the exact photo that belongs there. This guide lists every slot and how to drop in real
photos with zero layout changes.

---

## How swapping works

The `<Placeholder>` component takes a `src`. When `src` is set, the labeled box is replaced by the
real image at the **same dimensions** (no layout shift).

- **Put files in** `public/images/` (e.g. `public/images/hero.jpg`).
- **Reference them as** `/images/hero.jpg` (the `/public` part is dropped in the URL).
- Use **WebP or optimized JPEG**, keep files reasonably small (< ~300 KB each) for speed.
- After adding photos: `npm run build` → re-upload `out/`.

There are two kinds of slots:

1. **Gallery jobs** — swap by editing data only (`lib/content.ts`). Easiest.
2. **Fixed page slots** (hero, about, benefits) — add a `src=""` to the `<Placeholder>` in the named component.

---

## 1. Gallery jobs (data-only swap)

Open [`lib/content.ts`](../lib/content.ts) → `gallery.jobs`. Add `beforeSrc` and `afterSrc` to each job:

```ts
jobs: [
  {
    city: "Portland", neighborhood: "Alberta", type: "Reflective",
    beforeSrc: "/images/portland-alberta-before.jpg",
    afterSrc:  "/images/portland-alberta-after.jpg",
  },
  ...
]
```

These photos appear on the **Gallery page**, the **lightbox**, and the **home "Recent work" teaser**
(first 3 jobs). Aspect ratio: **4:3**. "Before" auto-renders in grayscale.

| Need | Count | Aspect | Notes |
|---|---|---|---|
| Before photo per job | 1 each | 4:3 | Faded/worn curb, daylight |
| After photo per job | 1 each | 4:3 | Fresh number, full color, crisp edges |

Aim for **5–8 real jobs** total.

---

## 2. Fixed page slots

Add `src="/images/your-file.jpg"` to the `<Placeholder ... />` in the listed file.

### Home — `app/page.tsx`
| Slot | Aspect | Composition |
|---|---|---|
| **Hero signature card** (the tilted photo) | 4:3 | Crisp painted house number on a clean curb, house softly behind. Daylight, shot slightly low. *This is the first thing visitors see — make it the best photo.* |
| Hero "before" chip | 1:1 | Worn, hard-to-read curb number |
| Hero "after" chip | 1:1 | Same curb, freshly painted |
| Benefits / "Found in the dark" | 4:3 | Reflective number glowing under headlights at dusk/night |
| About teaser (black section) | 3:4 | Jimmy crouched mid-job, focused, kit beside him |

### About — `app/about/page.tsx`
| Slot | Aspect | Composition |
|---|---|---|
| Full-bleed hero | 16:9 | Jimmy painting on a real Oregon street; leave room bottom-left for the quote card |
| Story headshot | 3:4 | Casual head-and-shoulders, natural light, friendly |

---

## Photography style (keep it consistent)

- **Real photos only** — phone photos are great. Do **not** use stock imagery (the old site's stock
  hero is exactly what made it feel untrustworthy).
- Natural daylight, true colors, slightly warm.
- Show the actual work and, where possible, Jimmy himself — authenticity is the whole point.
- Before/after pairs should be the **same curb from the same angle** for an honest comparison.

---

## Optional: social share image

Add `public/images/og.jpg` (1200×630) and set it in `app/layout.tsx` under
`openGraph.images` for a branded preview when the site is shared on social/text.

# Configuration Guide

Almost everything you'll ever change lives in **one file**: [`lib/config.ts`](../lib/config.ts).
Secrets (API keys, SMTP password) live in `.env.local` (local) and `config.php` (on the server).
After any change you must rebuild (`npm run build`) and re-upload `out/`.

---

## 1. Business details — `lib/config.ts`

Open `lib/config.ts` and edit the `business` block:

```ts
export const business = {
  name: "Curb'n IT",
  owner: "Jimmy Li",
  sinceYear: 2020,
  phone: env("NEXT_PUBLIC_PHONE", "[Number]"),   // ← real phone
  venmo: env("NEXT_PUBLIC_VENMO", "[handle]"),    // ← real Venmo handle
  email: env("NEXT_PUBLIC_EMAIL", "hello@curbnit.us"),
  domain: "curbnit.us",
  serviceAreas: ["Portland", "Salem", "Eugene", "Lake Oswego"],
  serviceAreaLabel: "All Oregon",
  responseTime: "Same day, usually within hours",
};
```

You can either:
- **Edit the fallback string** directly (e.g. change `"[Number]"` to `"(503) 555-0123"`), or
- **Set it in `.env.local`** (preferred — keeps real values out of the code):
  ```
  NEXT_PUBLIC_PHONE=(503) 555-0123
  NEXT_PUBLIC_VENMO=curb-n-it
  NEXT_PUBLIC_EMAIL=jimmy@curbnit.us
  ```

The phone automatically becomes a tappable `tel:` link everywhere once it's a real number
(the `[Number]` placeholder shows "Phone coming soon" and stays non-clickable).

---

## 2. Words / copy — `lib/content.ts`

Headlines, button labels, pricing descriptions, the About story, FAQ answers — all of it is in
[`lib/content.ts`](../lib/content.ts), organized by page. Change text there; never edit it inside
components. Example — change a price tier description:

```ts
tiers: [
  { name: "Standard", price: "$35–$45", features: ["Black numbers on white background", ...] },
  ...
]
```

To change the FAQ the chat assistant uses for instant answers, edit [`lib/faq.ts`](../lib/faq.ts).

---

## 3. Feature flags — `lib/config.ts`

```ts
export const flags = {
  showTestimonials: true,  // set false to hide the reviews section until you have real quotes
  showChat: true,          // set false to remove the AI chat bubble entirely
};
```

---

## 4. Contact form mode — `lib/config.ts` + `.env.local`

```ts
export const form = {
  mode: env("NEXT_PUBLIC_FORM_MODE", "php"),       // "php" or "formspree"
  phpEndpoint: env("NEXT_PUBLIC_FORM_PHP_ENDPOINT", "/submit.php"),
  formspreeEndpoint: env("NEXT_PUBLIC_FORMSPREE_ENDPOINT"),
};
```

- **`php`** (default): leads go through `public/submit.php` → Jimmy's Titan inbox. Configure SMTP in
  `config.php` (see DEPLOY-HOSTINGER.md).
- **`formspree`**: set `NEXT_PUBLIC_FORM_MODE=formspree` and
  `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxx`.
- If you set **both** a PHP endpoint and a Formspree endpoint, the PHP handler will automatically
  fall back to Formspree if SMTP ever fails.

---

## 5. AI assistant — see [AI-INTEGRATION.md](AI-INTEGRATION.md)

Quick version: leave the key blank and the assistant answers from the built-in FAQ only (free, no
account needed). Add a key to enable free-form answers.

---

## Where secrets live (summary)

| Secret | File | Committed to git? |
|---|---|---|
| Phone / Venmo / email | `.env.local` or `lib/config.ts` | `.env.local` is **not** committed |
| AI API key | `.env.local` (`NEXT_PUBLIC_*_API_KEY`) | not committed |
| Titan SMTP password | `config.php` on the server | **never** committed (only `config.example.php` is) |

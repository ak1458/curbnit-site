# Maintenance Guide

This site needs almost no upkeep — it's static files. Here's how to make the common changes.
**Every change follows the same loop:** edit → `npm run build` → upload the new `out/` to `public_html`.

---

## Common edits — where to go

| I want to change… | File | 
|---|---|
| Phone, Venmo, email, service areas | `lib/config.ts` (`business`) or `.env.local` |
| Any headline, button text, body copy | `lib/content.ts` |
| Prices / service tier features | `lib/content.ts` (`services.tiers`) |
| FAQ questions & answers (page) | `lib/content.ts` (`services.faq`) |
| FAQ the chat answers instantly | `lib/faq.ts` |
| Show/hide reviews or chat | `lib/config.ts` (`flags`) |
| Real photos | `public/images/` + see PLACEHOLDER-IMAGE-GUIDE.md |
| Brand colors / fonts | `tailwind.config.ts` + `app/globals.css` |
| Where leads are emailed | `config.php` on the server (SMTP `to`) |

You rarely need to touch anything in `components/` or `app/` for content changes.

---

## The update loop (step by step)

```bash
# 1. edit a file (e.g. lib/content.ts)
# 2. preview locally
npm run dev            # open http://localhost:3000

# 3. build for upload
npm run build          # regenerates ./out

# 4. upload the contents of ./out to public_html (overwrite)
#    leave config.php in place — it isn't part of out/
```

---

## Examples

**Change a price:** in `lib/content.ts`, find `services.tiers`, edit `price: "$35–$45"`. Rebuild + upload.

**Add a real testimonial:** in `lib/content.ts` → `home.reviews.items`, replace a placeholder quote.
Once you have real ones, you can delete the "Sample quotes" disclaimer line in `app/page.tsx`
(`Reviews` section) and it stays honest.

**Add real photos:** drop files in `public/images/`, then wire them per PLACEHOLDER-IMAGE-GUIDE.md.

**Turn off the chat bubble:** `lib/config.ts` → `flags.showChat = false`. Rebuild + upload.

---

## Keeping it secure & healthy

- **Dependencies:** every few months run `npm outdated` and update Next.js if a security release lands
  (`npm install next@latest` within the same major, then `npm run build` to confirm it still builds).
  This project was built on a patched Next 15.5.x for that reason.
- **AI key:** if you enabled live AI with a browser key, keep its spend cap low (see AI-INTEGRATION.md).
- **`config.php`:** never commit it or paste its contents anywhere. It holds the SMTP password.
- **Backups:** keep a copy of `config.php` somewhere safe — it's the one file that isn't in the repo.

---

## Troubleshooting quick table

| Problem | Likely cause | Fix |
|---|---|---|
| Build fails with a type error | a typo in `lib/*.ts` | read the error's file:line, fix, rebuild |
| Form works locally but not live | `config.php` missing/wrong | recheck SMTP creds (DEPLOY-HOSTINGER.md) |
| Form "works" locally always | dev mode **simulates** success on purpose | real send only happens on the live PHP server |
| Chat won't answer free-form questions | no AI key set | expected; add a key (AI-INTEGRATION.md) or rely on FAQ |
| Page styling broke after upload | `_next/` folder partially uploaded | re-upload the whole `_next/` folder |
| Changes don't show live | browser cache or stale upload | hard-refresh; confirm new files uploaded |

---

## Who built what (for the next developer)

- **Design source of truth:** `docs/superpowers/specs/2026-06-13-curbnit-website-design.md`
  (and the agency files it references).
- **Implementation plan:** `docs/superpowers/plans/2026-06-13-curbnit-website.md`.
- Architecture in one line: Next.js static export + central `lib/config.ts` + PHP handlers in
  `public/` for form/AI — no backend server, runs on plain shared hosting.

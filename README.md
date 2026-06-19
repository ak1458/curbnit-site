# Curb'n IT — Website

Static marketing site for **Curb'n IT** — curb address painting across Oregon
(Portland, Beaverton, Tigard, Tualatin, Lake Oswego and surrounding areas).

Fast, conversion-focused, and deployable to **Hostinger shared hosting** with no
server framework to manage. Live at **https://curbit.us**.

- **Pages:** Home · Services · Gallery · About · Recruitment · Contact (+ privacy/terms/disclaimer)
- **Contact + recruitment form:** submits to **Web3Forms** (no backend) — leads land in an email inbox
- **AI assistant:** FAQ-first chat with a live LLM, proxied through `chat.php` so the **API key never reaches the browser**

---

## Tech stack

| Layer | What |
|---|---|
| Framework | Next.js 15 (App Router), static export (`output: 'export'`) |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v3 (tokens in `tailwind.config.ts`) |
| Forms | [Web3Forms](https://web3forms.com) — client-side POST, no server |
| AI chat | `public/chat.php` proxy → OpenRouter (key server-side in `config.php`) |
| Hosting | Hostinger shared hosting — upload the `out/` folder to `public_html/` |

Almost everything you'd change lives in **one file**: [`lib/config.ts`](lib/config.ts).
Site copy lives in [`lib/content.ts`](lib/content.ts).

---

## Quick start (local)

```bash
npm install
cp .env.example .env.local   # optional; sensible defaults already in lib/config.ts
npm run dev                  # http://localhost:3000
npm run build                # static export → ./out
```

> In `npm run dev` the contact form **simulates** success (no live send) and the chat
> answers from the built-in FAQ. Real submissions + live AI only run on the deployed site.

---

## How the two integrations work

### Contact form — Web3Forms
- The form POSTs JSON (including a **public** `access_key`) to `https://api.web3forms.com/submit`.
- Web3Forms emails the submission to the inbox tied to that key.
- **Change the destination inbox:** log in at [app.web3forms.com](https://app.web3forms.com) →
  Email Configuration → **Recipient Emails** → Save.
- **Change the key:** set `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (or edit the default in
  [`lib/config.ts`](lib/config.ts)), then rebuild.

### AI chat — server-side proxy (key stays hidden)
- The browser only ever calls `/chat.php` on our own domain.
- `chat.php` reads the API key from `config.php` (git-ignored, blocked from the web by
  `.htaccess`) and forwards the request to the LLM provider.
- The key is **never** in the JavaScript bundle.
- Toggle modes with `NEXT_PUBLIC_AI_PROVIDER`: `proxy` (default, secure) · `openrouter`/`grok`
  (direct calls — local testing only, exposes the key).

---

## Deploy to Hostinger

This site is a static export plus two PHP files. Build locally, upload `out/`.

```bash
npm run build        # → ./out  (includes chat.php, config.php, .htaccess, images)
```

Then upload **the contents of `out/`** into `public_html/` on Hostinger. Over SSH:

```bash
# from the project root, after `npm run build`
scp -r out/* hostinger-us:~/domains/curbit.us/public_html/
```

(Adjust the remote path to wherever `curbit.us` is rooted in hPanel.)

**Server secrets:** `config.php` carries the AI key and is **git-ignored**. The build copies your
local `public/config.php` into `out/`, so uploading `out/` deploys it. If you ever deploy without it,
copy `config.example.php` → `config.php` on the server and paste the real key.

After deploy, verify on the live domain:
- A contact-form submission arrives in the Web3Forms inbox
- The chat answers a real question (e.g. "how much does it cost?")
- `https://curbit.us/sitemap.xml` and `/robots.txt` load

---

## Security notes

- **No secrets in the repo.** `config.php`, `.env`, and `.env*.local` are git-ignored.
- The Web3Forms `access_key` in client code is **public by design** — safe to expose.
- The LLM API key lives only in `config.php` (server) — never in the bundle.
- `.htaccess` forces HTTPS, sets security headers, and denies web access to `config.php`.
- If a key was ever committed or shipped in a bundle, **rotate it** at the provider.

---

## Project structure

```
app/            # routes (one folder per page) + layout, sitemap.ts, robots.ts, icon
components/     # UI building blocks (Nav, ContactForm, ChatAssistant, GalleryGrid…)
lib/            # config.ts (central config), content.ts (copy), faq.ts, validate.ts, schema.ts
public/         # chat.php, config.example.php, .htaccess, images/  → copied verbatim into out/
docs/           # configuration / deploy / SEO / maintenance guides
```

---

## Before going live — checklist

- [x] Domain set to `curbit.us` (`lib/config.ts`)
- [x] Contact form wired to Web3Forms
- [x] AI key moved server-side (proxy mode)
- [ ] Web3Forms recipient inbox confirmed in the dashboard
- [ ] Real OpenRouter key rotated if the old one was ever exposed
- [ ] Real phone / Venmo confirmed in `lib/config.ts`
- [ ] Real testimonials in `lib/content.ts` (or set `flags.showTestimonials = false`)
- [ ] `npm run build` → upload `out/` → test the form + a chat question on the live domain

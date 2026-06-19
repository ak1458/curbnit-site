# Deploy to Hostinger Shared Hosting

No server management, no Node, no Docker. You build the site on your computer and upload plain
files. PHP (already on Hostinger) handles the contact form.

---

## Step 1 — Build the site

On your computer, in the project folder:

```bash
npm install      # first time only
npm run build
```

This creates an **`out/`** folder containing the entire website as static files plus the PHP handlers.

---

## Step 2 — Upload to `public_html`

1. Log in to **hPanel** (Hostinger control panel).
2. Open **Files → File Manager**.
3. Go into **`public_html`**.
4. If the old WordPress site is there, delete its contents first (back up anything you want to keep —
   you do **not** need `wp-config.php`, `wp-content`, etc. for this site).
5. Upload **everything inside your local `out/` folder** into `public_html`.
   - Easiest: zip the *contents* of `out/`, upload the zip, then "Extract" in File Manager.
   - Make sure files land directly in `public_html/` (so you have `public_html/index.html`,
     `public_html/submit.php`, `public_html/_next/…`), **not** inside a nested `out/` folder.

> The hidden `.htaccess` file matters (HTTPS redirect, caching, 404). In File Manager enable
> "Show hidden files" (dotfiles) so it uploads/extracts too.

---

## Step 3 — Configure the contact form (Titan SMTP)

1. In `public_html`, find **`config.example.php`**.
2. **Copy it** and rename the copy to **`config.php`**.
3. Edit `config.php` and fill in Jimmy's Titan Mail details:

```php
'smtp' => [
  'host'   => 'smtp.titan.email',
  'port'   => 465,
  'secure' => 'ssl',
  'user'   => 'jimmy@curbnit.us',   // the real mailbox
  'pass'   => 'the-mailbox-password',
  'from'   => 'jimmy@curbnit.us',
  'to'     => 'jimmy@curbnit.us',   // where leads arrive
],
```

That's it — the form now emails leads to that inbox. (`config.php` is protected by `.htaccess`
and is never publicly readable.)

> **Don't have Titan SMTP yet?** Skip this and use Formspree instead: create a form at
> formspree.io, then before building set `NEXT_PUBLIC_FORM_MODE=formspree` and
> `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxx` in `.env.local`, rebuild, re-upload.

---

## Step 4 — Point the domain

If the domain is already on Hostinger and pointing at `public_html`, you're done. Otherwise:

- **hPanel → Domains** → make sure `curbnit.us` points to this hosting's `public_html`.
- DNS changes can take up to a few hours to propagate.

---

## Step 5 — Test live

Visit `https://curbnit.us` and check:

- [ ] Site loads, HTTPS padlock shows
- [ ] All 5 pages open (Home, Services, Gallery, About, Contact)
- [ ] Submit the contact form with a real address → the lead lands in Jimmy's inbox
- [ ] Open the chat bubble, ask "how much?" → instant answer
- [ ] On a phone, the bottom "Call / Get a Quote" bar appears when you scroll

---

## Updating the site later

1. Make your change locally (usually in `lib/config.ts` or `lib/content.ts`).
2. `npm run build`
3. Re-upload the new `out/` contents to `public_html` (overwrite).
   - You can leave `config.php` in place — it isn't part of `out/`, so it won't be overwritten.
     (If you re-extract a zip, just don't delete `config.php` first.)

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Form says "something went wrong" live | `config.php` missing or wrong SMTP creds. Re-check Step 3. Confirm port 465 + `secure=ssl`. |
| Pages 404 on refresh | `.htaccess` didn't upload, or files are nested in an extra folder. Ensure `index.html` is directly in `public_html`. |
| Chat only gives FAQ answers | Expected unless an AI key is configured. See AI-INTEGRATION.md. |
| Styles look broken | The `_next/` folder didn't upload fully. Re-upload it. |

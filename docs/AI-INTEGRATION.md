# AI Assistant Integration Guide

The site ships with a branded chat assistant ("Jimmy's helper"). It works in three layers:

1. **FAQ-first (always on, free):** common questions — pricing, areas, timing, payment, custom work,
   weather, "what if I don't like it" — are answered instantly from `lib/faq.ts`. No account, no key,
   no cost, no network call.
2. **Live AI (optional):** anything not in the FAQ is sent to an AI provider (Grok or OpenRouter) for
   a short, on-brand answer. Only runs if you add a key.
3. **Lead capture:** when someone signals they want a quote, the assistant shows a "Get a quote from
   Jimmy →" button that deep-links to the contact form.

If no key is set, layer 2 is skipped and the assistant politely points people to the contact form.
**This is a perfectly good way to ship** — the FAQ covers the vast majority of real questions.

---

## Turning on live AI

### Option A — xAI Grok
1. Get a key at <https://console.x.ai/>.
2. In `.env.local`:
   ```
   NEXT_PUBLIC_AI_PROVIDER=grok
   NEXT_PUBLIC_GROK_API_KEY=xai-xxxxxxxx
   NEXT_PUBLIC_GROK_MODEL=grok-2-latest
   ```

### Option B — OpenRouter (access many models, incl. Grok)
1. Get a key at <https://openrouter.ai/keys>.
2. In `.env.local`:
   ```
   NEXT_PUBLIC_AI_PROVIDER=openrouter
   NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-xxxxxxxx
   NEXT_PUBLIC_OPENROUTER_MODEL=x-ai/grok-2-1212
   ```

Then `npm run build` and re-upload `out/`.

---

## ⚠️ Important security note (read this)

In the current setup the AI call happens **in the browser**, which means a `NEXT_PUBLIC_*` key is
**visible in the site's JavaScript**. Anyone technical can read it. That's the trade-off for keeping
the site fully static. To use it safely:

- Use a **separate, spend-capped key** dedicated to this site (set a low monthly limit in the
  provider dashboard).
- Never reuse a key you use for anything else.
- The FAQ layer already absorbs most traffic, so live-AI usage (and cost) stays low.

### Hiding the key completely (recommended once there's budget)

A ready-made server proxy is included: `public/chat.php`. It keeps the key on the server so it never
reaches the browser.

1. Add an `ai` block to `config.php` (on Hostinger):
   ```php
   'ai' => [
     'endpoint' => 'https://api.x.ai/v1/chat/completions',
     'model'    => 'grok-2-latest',
     'key'      => 'xai-your-real-key',
   ],
   ```
2. In `.env.local`, point the endpoint at the proxy and leave the public key blank:
   ```
   NEXT_PUBLIC_GROK_ENDPOINT=/chat.php
   NEXT_PUBLIC_GROK_API_KEY=
   ```
3. `npm run build` → re-upload. The browser now talks only to `chat.php`; the key stays private.

---

## Tuning the assistant's personality

Edit `ai.systemPrompt` in [`lib/config.ts`](../lib/config.ts). Keep it short and factual — it tells
the model Jimmy's prices, areas, and rules (pay-after, no false guarantees). Also adjust
`maxTokens` (answer length) and `temperature` (0 = predictable, 1 = chattier) there.

## Adding / editing instant FAQ answers

Edit [`lib/faq.ts`](../lib/faq.ts). Each entry has `keywords` (groups of words that trigger it) and
an `answer`. Add a new entry to teach the assistant a new instant answer — no AI key required.

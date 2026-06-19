/**
 * ─────────────────────────────────────────────────────────────
 * Curb'n IT — CENTRAL CONFIG
 * ─────────────────────────────────────────────────────────────
 * This is the ONE file a non-developer edits to change the site's
 * business details, contact info, and feature behavior.
 *
 * Secrets (API keys, SMTP) come from environment variables
 * (.env.local) — never hardcode them here.
 *
 * Placeholders below in [brackets] are intentional. Replace them
 * with the business's real details before going live (see CONFIGURATION.md).
 */

export const business = {
  name: "Curb'n IT",
  sinceYear: 2020,
  // Replace these placeholders with real values (or set them in .env.local).
  phone: process.env.NEXT_PUBLIC_PHONE || "503-528-6342",
  venmo: process.env.NEXT_PUBLIC_VENMO || "[handle]",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@curbit.us",
  domain: "curbit.us",
  serviceAreas: ["Portland", "Beaverton", "Tigard", "Tualatin", "Lake Oswego"],
  serviceAreaLabel: "Portland Area",
  responseTime: "Same day, usually within hours",
} as const;

/** Phone digits only, for tel: links. Empty if still a placeholder. */
export const telHref = (): string => {
  const digits = business.phone.replace(/[^\d+]/g, "");
  return digits && !business.phone.includes("[") ? `tel:${digits}` : "";
};

export const venmoHandle = (): string => business.venmo.replace(/^@/, "");

// ── AI assistant -------------------------------------------------
// "proxy" (default): the browser calls /chat.php, which holds the API key
//   server-side (public/config.php). The key NEVER ships in the JS bundle.
// "openrouter" / "grok": direct browser → provider calls. Only use for local
//   testing; these expose the key in the client bundle.
type AiProvider = "proxy" | "grok" | "openrouter";

const aiProvider = (process.env.NEXT_PUBLIC_AI_PROVIDER || "proxy") as AiProvider;

// Direct-mode key. Empty in proxy mode — the server supplies the key instead.
const aiKey =
  aiProvider === "openrouter"
    ? process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ""
    : aiProvider === "grok"
      ? process.env.NEXT_PUBLIC_GROK_API_KEY || ""
      : "";

export const ai = {
  enabled: true,
  provider: aiProvider,
  /**
   * Proxy mode is always "live" (key sits on the server). Direct modes are
   * live only when a client key exists; otherwise the assistant runs FAQ-only.
   */
  hasKey: aiProvider === "proxy" ? true : aiKey.length > 0,
  apiKey: aiProvider === "proxy" ? "" : aiKey,
  endpoint:
    aiProvider === "proxy"
      ? "/chat.php"
      : aiProvider === "openrouter"
        ? process.env.NEXT_PUBLIC_OPENROUTER_ENDPOINT || "https://openrouter.ai/api/v1/chat/completions"
        : process.env.NEXT_PUBLIC_GROK_ENDPOINT || "https://api.x.ai/v1/chat/completions",
  model:
    aiProvider === "openrouter"
      ? process.env.NEXT_PUBLIC_OPENROUTER_MODEL || "x-ai/grok-2-1212"
      : process.env.NEXT_PUBLIC_GROK_MODEL || "grok-2-latest",
  maxTokens: 160,
  temperature: 0.6,
  systemPrompt:
    "You are an autonomous AI agent for Curb'n IT, a curb address painting service in " +
    "Oregon (Portland, Beaverton, Tigard, Tualatin, Lake Oswego). Your goal is to secure jobs. " +
    "Never quote a fixed price. When users ask for a quote or want to book, politely ask for their Name, Address, and Phone Number. " +
    "Once the user has provided ALL THREE (Name, Address, Phone), you MUST append exactly '[ACTION: SUBMIT]' " +
    "at the end of your response, and confirm that you have passed their details to Jimmy. Do not output this tag until you have all 3.",
} as const;

// ── Contact form -------------------------------------------------
type FormMode = "web3forms" | "php" | "formspree";

export const form = {
  mode: (process.env.NEXT_PUBLIC_FORM_MODE || "web3forms") as FormMode,
  // Web3Forms access key is PUBLIC by design (client-side). Safe to expose.
  // Leads land in the inbox tied to this key at web3forms.com.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "e920bd9a-dc5c-4cd5-9df6-0eae5091845f",
  web3formsEndpoint: "https://api.web3forms.com/submit",
  phpEndpoint: process.env.NEXT_PUBLIC_FORM_PHP_ENDPOINT || "/submit.php",
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "",
} as const;

// ── Feature flags ------------------------------------------------
export const flags = {
  /** Testimonials are placeholders until real quotes are supplied. */
  showTestimonials: true,
  showChat: true,
} as const;

export const siteUrl = `https://${business.domain}`;

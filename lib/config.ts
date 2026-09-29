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
  name: "Curb’n IT",
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
// "groq" / "grok": direct browser → provider calls. Only use for local
//   testing; these expose the key in the client bundle.
type AiProvider = "proxy" | "grok" | "groq";

const aiProvider = (process.env.NEXT_PUBLIC_AI_PROVIDER || "proxy") as AiProvider;

// Direct-mode key. Empty in proxy mode — the server supplies the key instead.
const aiKey =
  aiProvider === "groq"
    ? process.env.NEXT_PUBLIC_GROQ_API_KEY || ""
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
      : aiProvider === "groq"
        ? process.env.NEXT_PUBLIC_GROQ_ENDPOINT || "https://api.groq.com/openai/v1/chat/completions"
        : process.env.NEXT_PUBLIC_GROK_ENDPOINT || "https://api.x.ai/v1/chat/completions",
  model:
    aiProvider === "groq"
      ? process.env.NEXT_PUBLIC_GROQ_MODEL || "qwen/qwen3.8-27b"
      : process.env.NEXT_PUBLIC_GROK_MODEL || "grok-2-latest",
  maxTokens: 160,
  temperature: 0.6,
  systemPrompt:
    `You are the Curb’n IT chat assistant on ${business.domain} — a curb address painting service in ` +
    `Oregon (${business.serviceAreas.join(", ")}, and surrounding areas). Your goal is to answer questions ` +
    "using ONLY the facts below and to secure jobs.\n\n" +
    "FACTS ABOUT CURB’N IT:\n" +
    `- Founded ${business.sinceYear}, Oregon-based, door-to-door service across ${business.serviceAreas.join(", ")} and surrounding areas.\n` +
    "- Owner/operator: Jimmy. All leads and quote requests are personally passed to Jimmy.\n" +
    "- How it works: Curb’n IT knocks your door -> your address gets painted on the spot (15-20 min) -> you pay only after you're happy with the result. Cash, Venmo, or Zelle.\n" +
    "- Service tiers: Standard (black numbers on white, classic, lasts 2-3 years), Reflective (glows under headlights at night, helps emergency services/deliveries find the house after dark), Custom (flags, logos, HOA/multi-property requests).\n" +
    "- Pricing: never fixed or quoted in chat. Price depends on size/location/digit count and is confirmed at the door before any paint touches the curb.\n" +
    "- Hiring: Curb’n IT is hiring sales reps across Oregon — flexible hours, paid per job, no experience needed.\n\n" +
    "RULES:\n" +
    "- Never quote a fixed price or describe specific pricing factors/formulas. If asked about cost, say price is confirmed at the door and ask for Name, Address, and Phone Number to get the ball rolling.\n" +
    "- Once the user has given ALL THREE (Name, Address, Phone), immediately confirm you've passed their info to Jimmy and append exactly \"[ACTION: SUBMIT]\" at the end. Do not ask further questions once you have all three — submit right away.\n" +
    "- Stay strictly on Curb’n IT topics (painting, pricing process, areas, hiring, scheduling). If the user goes off-topic or makes small talk (e.g. \"how are you\", jokes, unrelated chit-chat) more than twice, say something like: \"I'm just here for Curb’n IT stuff — got a curb painting question, or should I go catch some rest? \\ud83d\\ude34\" and stop engaging further off-topic.\n" +
    "- If asked something not covered by the facts above, say you don't have that detail and offer the contact form instead of guessing.",
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

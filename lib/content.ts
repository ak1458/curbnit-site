/**
 * All site copy, lifted from curbnit-site-content-new.md (content truth).
 * Edit words here; components never hardcode copy.
 *
 * Voice: de-personalized brand voice — "Curb'n IT" and second person ("you").
 * No personal owner name, no fixed pricing (call for a quote instead).
 */

export const nav = {
  links: [
    { label: "Services", href: "/services/" },
    { label: "Gallery", href: "/gallery/" },
    { label: "About", href: "/about/" },
    { label: "Join Us", href: "/recruitment/" },
    { label: "Contact", href: "/contact/" },
  ],
  // CTA renders as a "Call Now" button (tel: link) in the Nav.
  cta: { label: "Call Now", href: "/contact/" },
} as const;

export const footer = {
  tagline: "Painting Oregon curbs since 2020.",
  note: "Made with care",
} as const;

// ── HOME ---------------------------------------------------------
export const home = {
  seo: {
    title: "Curb'n IT — Curb Address Painting in Portland & All of Oregon",
    description:
      "Curb'n IT paints house address numbers on curbs across Oregon. Portland, Beaverton, Tigard, Tualatin, Lake Oswego and surrounding areas. Fast, affordable, done the same day.",
  },
  hero: {
    headlineLead: "Your address, ",
    headlineAccent: "clearly painted.",
    headlineTail: " Every time.",
    sub: "Oregon's go-to Address curb painter — door-to-door across Portland, Beaverton, Tigard, Tualatin, Lake Oswego and surrounding areas since 2020. Fast, fair, done on the spot.",
    // primary renders as a Call Now button; href is the fallback when no phone is set.
    primary: { label: "Call Now", href: "/contact/" },
    secondary: { label: "See the Work", href: "/gallery/" },
  },
  reviews: {
    eyebrow: "What people say",
    heading: "Real jobs, real neighbors.",
    items: [
      { quote: "Highly recommend Curb'n IT’s service’s to everyone. Handled very professionally and you can see the quality in the work.", where: "Paul B." },
      { quote: "Now the ambulance will always be able to find our house thanks to the work of Curb'n IT.", where: "Doug I." },
      { quote: "Used to always get the neighbors Amazon packages but now with our neighborhood curbs painted, there should be no issue.", where: "Christine W." },
    ],
  },
  process: {
    eyebrow: "The process",
    heading: "Simple as it gets.",
    steps: [
      { n: "01", title: "Curb'n IT knocks your door", body: "Give a yes or a no. No pressure, no obligation." },
      { n: "02", title: "Your address gets painted on the spot", body: "Takes 15–20 minutes. You watch the whole thing." },
      { n: "03", title: "Pay when you're happy", body: "Cash or Venmo/Zelle. Your call, after you see the result." },
    ],
  },
  galleryTeaser: {
    eyebrow: "Recent work",
    heading: "What it looks like.",
    cta: { label: "See all work", href: "/gallery/" },
  },
  benefits: {
    eyebrow: "Why reflective",
    heading: "Found in the dark, fast.",
    body: "Reflective numbers glow under headlights — so delivery drivers, guests, and emergency services spot your home at night without circling the block.",
    points: [
      "Easier for 911 and ambulances to find you",
      "No more missed deliveries after dark",
      "Lasts longer than standard paint",
    ],
  },
  hiring: {
    eyebrow: "Now hiring",
    heading: "Paint curbs with Curb'n IT.",
    body: "Curb'n IT is bringing on sales reps across Oregon. Flexible hours, outdoor work, paid per job. No experience needed.",
    cta: { label: "See the role", href: "/recruitment/" },
  },
  about: {
    eyebrow: "Who's painting your curb",
    quote:
      "Curb'n IT has been knocking doors and painting curbs across Oregon since 2020. No corporate runaround — just a fair price and clean work, done while you watch.",
    credentials: ["Oregon-based", "Door-to-Door Since 2020", "Pay When It's Done"],
    cta: { label: "About Curb'n IT", href: "/about/" },
  },
  finalCta: {
    heading: "Ready to get your address painted?",
    sub: "Takes 20 minutes. Pay when it's done.",
    primary: { label: "Call Now", href: "/contact/" },
    secondary: { label: "Get a Quote", href: "/contact/" },
  },
} as const;

// ── SERVICES ----------------------------------------------------
export const services = {
  seo: {
    title: "Services — Curb'n IT Oregon Curb Painting",
    description:
      "Standard, reflective, and custom curb address painting across Oregon. Call Curb'n IT for a fast, no-obligation quote on your address.",
  },
  hero: {
    heading: "Curb address painting, done right.",
    sub: "Standard, reflective, or custom — call for a quick quote and Curb'n IT confirms the price before any paint touches the curb.",
  },
  tiers: [
    {
      name: "Standard",
      blurb: "The everyday classic.",
      features: [
        "Black numbers on white background",
        "Clean, classic look",
        "Lasts 2–3 years",
        "Most popular for everyday homes",
      ],
    },
    {
      name: "Reflective",
      blurb: "Glows at night.",
      features: [
        "Reflective material — glows under headlights at night",
        "Helps drivers, guests, deliveries, and emergency services after dark",
        "Lasts longer than standard paint",
        "Worth it if your street is dim at night",
      ],
    },
    {
      name: "Custom",
      blurb: "Anything else.",
      features: [
        "Flags, logos, shapes, custom designs",
        "HOA or multi-property requests",
        "Anything outside the standard sizes",
      ],
    },
  ],
  faq: {
    eyebrow: "Common questions",
    heading: "Frequently asked questions",
    items: [
      { q: "What areas do you cover?", a: "Curb'n IT paints curbs across Oregon — Portland, Beaverton, Tigard, Tualatin, Lake Oswego, and surrounding areas. If you're not sure your area is covered, just ask." },
      { q: "How much does it cost?", a: "Price depends on size, location, and number of digits. Call Curb'n IT and you'll get a quick, no-obligation quote — the price quoted at your door is the price you pay." },
      { q: "How long does the job take?", a: "About 15–20 minutes per address. It's done while you watch, so there's no waiting around or scheduling a return visit." },
      { q: "What if it rains right after painting?", a: "The paint is designed to handle Oregon weather, but you'll be told on the day if conditions aren't ideal, and the job can be rescheduled if needed." },
      { q: "Do you paint the whole block or just my house?", a: "Just your address, unless you'd like to coordinate with neighbors — Curb'n IT is happy to do multiple houses on the same street in one visit." },
      { q: "Can I pay after it's done?", a: "Yes. You watch the work happen, and you pay once you're happy with the result. Cash or Venmo/Zelle." },
      { q: "What if I don't like the result?", a: "Curb'n IT makes it right. The price isn't due until you're satisfied with the work." },
    ],
  },
} as const;

// ── GALLERY (spec "Work") ---------------------------------------
export const gallery = {
  seo: {
    title: "Curb Painting Photos — Before & After | Curb'n IT Oregon",
    description:
      "See real before-and-after curb address painting jobs from Portland, Beaverton, Tigard, Tualatin, Lake Oswego and surrounding areas.",
  },
  hero: { heading: "Every job, done right.", sub: "Real photos from real jobs across Oregon." },
  filters: ["All", "Portland", "Beaverton", "Tigard", "Tualatin", "Lake Oswego", "Other"],
  empty: {
    heading: "No photos here yet",
    body: "New jobs are added all the time. Check back soon, or contact Curb'n IT for a quote on your address.",
  },
  // Placeholder job set — replace captions/cities when real photos arrive.
  jobs: [
    { city: "Portland", neighborhood: "Alberta", type: "Reflective", src: "/images/WhatsApp_Image_2026-06-15_at_10.42.28_PM.jpeg" },
    { city: "Beaverton", neighborhood: "Central", type: "Standard", src: "/images/WhatsApp_Image_2026-06-15_at_10.45.10_PM22.jpeg" },
    { city: "Lake Oswego", neighborhood: "First Addition", type: "Reflective", src: "/images/WhatsApp_Image_2026-06-15_at_10.45.51_PM22.jpeg" },
    { city: "Tigard", neighborhood: "Bull Mountain", type: "Standard", src: "/images/WhatsApp_Image_2026-06-15_at_10.45.32_PM21.jpeg" },
    { city: "Portland", neighborhood: "Sellwood", type: "Standard", src: "/images/WhatsApp_Image_2026-06-16_at_9.33.38_PM.jpeg" },
    { city: "Tualatin", neighborhood: "Nyberg Woods", type: "Standard", src: "/images/WhatsApp_Image_2026-06-16_at_9.33.38_PM_1.jpeg" },
  ],
} as const;

// ── ABOUT --------------------------------------------------------
export const about = {
  seo: {
    title: "About Curb'n IT — Oregon Curb Painting",
    description:
      "Curb'n IT paints house address numbers on curbs across Oregon. Door-to-door since 2020, serving Portland, Beaverton, Tigard, Tualatin, Lake Oswego and surrounding areas.",
  },
  heroQuote: "Started with a knock. Still knocking.",
  heroAttribution: "— Curb'n IT, Oregon",
  story: {
    heading: "The short version.",
    paragraphs: [
      "Curb'n IT isn't a corporation. The name's a joke — kind of.",
      "The name gets attention. The work gets referrals.",
      "It started in 2020: knocking doors across Oregon, painting faded curb numbers fresh again. People liked the work, liked the price, and kept calling back.",
      "Now it's a full-time operation across the state — Portland, Beaverton, Tigard, Tualatin, Lake Oswego, wherever the next address needs painting.",
      "You pay after it's done. If you don't like it, you say so, and it gets made right.",
    ],
    stats: ["6 years in", "Oregon-wide", "Cash or Venmo, always"],
  },
} as const;

// ── RECRUITMENT --------------------------------------------------
export const recruitment = {
  seo: {
    title: "Join Curb'n IT — Sales Rep Jobs in Oregon",
    description:
      "Curb'n IT is hiring sales reps across Oregon. Flexible hours, outdoor work, paid per job. No experience needed — apply today.",
  },
  hero: {
    eyebrow: "Now hiring",
    heading: "Join the Curb’n IT Team",
    sub: "We’re looking for motivated, outgoing people to help grow our curb painting business. Flexible schedule, training provided, and unlimited earning potential. No experience necessary. Complete the form below and we’ll reach out with more information.",
  },
  whatYouDo: {
    heading: "What the work is",
    items: [
      "Knock doors in Oregon neighborhoods and offer Address curb painting",
      "Paint house numbers on curbs — quick training, simple kit",
      "Set your own hours and the areas you want to cover",
      "Get paid per job, no cap on how much you take on",
    ],
  },
  whoWeWant: {
    heading: "Who fits",
    items: [
      "Comfortable talking to people face-to-face",
      "Reliable — you show up and finish the job",
      "Has a way to get around your service area",
      "Takes pride in clean, careful work",
    ],
  },
  perks: {
    heading: "Why do it",
    items: [
      "Flexible schedule — work when you want",
      "Outdoor, hands-on work, not a desk",
      "Paid per job — your effort sets your pay",
      "Simple to learn, quick to start",
    ],
  },
  cta: {
    heading: "Ready to start?",
    sub: "Call Curb'n IT to ask anything, or send your info through the contact form and you'll get a callback — usually within a few hours.",
  },
} as const;

// ── CONTACT ------------------------------------------------------
export const contact = {
  seo: {
    title: "Contact Curb'n IT — Get a Curb Painting Quote in Oregon",
    description:
      "Get in touch with Curb'n IT for curb address painting anywhere in Oregon. Same-day response, no obligation quotes.",
  },
  hero: { heading: "Get in touch.", sub: "Call now, or fill this out and Curb'n IT will respond same day, usually within a few hours." },
  labels: {
    name: "Your Name",
    address: "Your Address (where you want the curb painted)",
    contact: "Phone or Email",
    message: "Anything else? (optional)",
    submit: "Send Message",
    helper: "Usually responds within a few hours.",
  },
  success: { heading: "Got it. Curb'n IT will reach out soon.", subPrefix: "In the meantime — you can also text directly: " },
  sidePanel: { heading: "Other ways to get in touch" },
} as const;

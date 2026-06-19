/**
 * AI assistant knowledge base + matcher.
 * The assistant answers these instantly client-side ($0, no network).
 * Only questions that miss every entry fall through to the live AI provider.
 */

export type FaqEntry = {
  id: string;
  /** Lowercase keyword groups. An entry matches if ANY group fully appears. */
  keywords: string[][];
  answer: string;
};

export const knowledgeBase: FaqEntry[] = [
  {
    id: "areas",
    keywords: [["area"], ["areas"], ["cover"], ["where"], ["location"], ["portland"], ["beaverton"], ["tigard"], ["tualatin"], ["lake", "oswego"], ["oregon"], ["near", "me"]],
    answer:
      "Curb'n IT paints curbs across Oregon — Portland, Beaverton, Tigard, Tualatin, Lake Oswego, and surrounding areas. Not sure you're covered? Just ask.",
  },
  {
    id: "price",
    keywords: [["price"], ["cost"], ["how", "much"], ["pricing"], ["rate"], ["charge"], ["$"]],
    answer:
      "Price depends on the job — size, location, and number of digits. Call Curb'n IT for a quick, no-obligation quote. The price quoted at your door is the price you pay.",
  },
  {
    id: "time",
    keywords: [["how", "long"], ["time"], ["minutes"], ["fast"], ["quick"], ["take"]],
    answer: "About 15–20 minutes per address — it's done while you watch, no return visit needed.",
  },
  {
    id: "pay",
    keywords: [["pay"], ["payment"], ["venmo"], ["cash"], ["zelle"], ["after"]],
    answer: "You watch the work, then pay once you're happy with it. Cash or Venmo/Zelle.",
  },
  {
    id: "custom",
    keywords: [["custom"], ["logo"], ["logos"], ["flag"], ["flags"], ["design"], ["shape"], ["hoa"]],
    answer:
      "Yes — flags, logos, shapes, HOA or multi-property jobs are all doable. Tell Curb'n IT what you have in mind and you'll get a quote.",
  },
  {
    id: "weather",
    keywords: [["rain"], ["weather"], ["wet"], ["cold"], ["snow"]],
    answer:
      "The paint handles Oregon weather. If conditions aren't right on the day, you'll be told and the job gets rescheduled — no charge.",
  },
  {
    id: "dislike",
    keywords: [["don't", "like"], ["dont", "like"], ["guarantee"], ["warranty"], ["unhappy"], ["redo"], ["bad"]],
    answer: "Curb'n IT makes it right — the price isn't due until you're satisfied with the result.",
  },
  {
    id: "reflective",
    keywords: [["reflective"], ["glow"], ["night"], ["dark"]],
    answer:
      "Reflective numbers glow under headlights, so drivers, deliveries, and emergency services find your home after dark — and they last longer than standard paint. Call for a quote.",
  },
  {
    id: "what",
    keywords: [["what", "do"], ["what", "is"], ["curb", "paint"], ["address", "number"], ["service"]],
    answer:
      "Curb'n IT paints your house address numbers onto your curb so your home is easy to spot. Standard or reflective, done on the spot.",
  },
];

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9$' ]/g, " ");

/**
 * Returns the best FAQ answer for a user message, or null if nothing matches.
 * A keyword group matches when every word in it appears in the message.
 */
export function matchFaq(input: string): string | null {
  const text = normalize(input);
  if (!text.trim()) return null;

  let best: { id: string; score: number; answer: string } | null = null;

  for (const entry of knowledgeBase) {
    for (const group of entry.keywords) {
      const hit = group.every((word) => text.includes(word));
      if (hit) {
        const score = group.join("").length; // longer/more-specific group wins
        if (!best || score > best.score) {
          best = { id: entry.id, score, answer: entry.answer };
        }
      }
    }
  }

  return best ? best.answer : null;
}

/** Detect "I want a quote / book me" intent → route to contact form. */
export function isQuoteIntent(input: string): boolean {
  const text = normalize(input);
  return [["quote"], ["book"], ["schedule"], ["sign", "up"], ["get", "started"], ["come", "out"], ["yes", "please"]].some(
    (group) => group.every((w) => text.includes(w)),
  );
}

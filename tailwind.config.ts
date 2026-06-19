import type { Config } from "tailwindcss";

/**
 * Tailwind is kept only for its base reset (Preflight). The visual design
 * system lives in app/globals.css as semantic CSS (ported from the approved
 * Claude Design prototype). No bespoke theme tokens are needed here.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

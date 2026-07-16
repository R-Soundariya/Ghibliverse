import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#1f4d3a", light: "#2f6b4f", dark: "#123526" },
        moss: { DEFAULT: "#6a8f5c", light: "#93b384" },
        sakura: { DEFAULT: "#f3b6c2", light: "#fbdee4" },
        cloud: { DEFAULT: "#f7f5ef", dark: "#e9e5d8" },
        dusk: { DEFAULT: "#4b3f66", light: "#6f5f8f", dark: "#241f38" },
        sunlight: { DEFAULT: "#f0b429", light: "#f8d477" },
        night: { sky: "#0d1b2e", canopy: "#081712", deep: "#050a08" },
        firefly: { DEFAULT: "#d9f56d", glow: "#f4ffb0" },
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

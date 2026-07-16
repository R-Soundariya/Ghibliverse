"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isNight ? "Switch to day (Day in the Forest)" : "Switch to night (Moonlit Forest)"}
      className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/20 text-lg backdrop-blur-md transition-colors hover:bg-white/30 dark:border-white/10 dark:bg-black/30 dark:hover:bg-black/40"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        {isNight ? "🌙" : "☀️"}
      </motion.span>
    </button>
  );
}

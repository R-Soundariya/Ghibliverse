"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "day" | "night";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

const STORAGE_KEY = "ghibliverse-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("day");
  // Guards against writing the "day" default back over a stored "night" preference
  // before the read-from-localStorage effect below has had a chance to run.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
    setTheme(stored ?? preferred);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme === "night" ? "dark" : "light");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, hydrated]);

  const toggleTheme = () => setTheme((t) => (t === "day" ? "night" : "day"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

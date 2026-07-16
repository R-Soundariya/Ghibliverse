import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { HomeButton } from "@/components/nav/HomeButton";
import { Footer } from "@/components/layout/Footer";

const display = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "GhibliVerse — Studio Ghibli Analytics",
  description:
    "An AI-powered Studio Ghibli analytics platform: explore every film through interactive dashboards and original, nature-inspired storytelling.",
};

// Applies the stored/preferred theme before paint, so there's no flash of the wrong theme.
const NO_FLASH_THEME_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem("ghibliverse-theme");
    var preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
    var theme = stored || preferred;
    document.documentElement.setAttribute("data-theme", theme === "night" ? "dark" : "light");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <HomeButton />
          <ThemeToggle />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

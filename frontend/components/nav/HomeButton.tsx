"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeButton() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      aria-label="Back to welcome page"
      className="fixed right-20 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/20 text-lg backdrop-blur-md transition-colors hover:bg-white/30 dark:border-white/10 dark:bg-black/30 dark:hover:bg-black/40"
    >
      🏠
    </Link>
  );
}

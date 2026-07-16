"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/explorer", label: "Explorer" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/executive", label: "Executive" },
];

export function PageNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex gap-2">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-forest text-cloud dark:bg-firefly dark:text-night-deep"
                : "text-forest/60 hover:bg-forest/10 dark:text-cloud/60 dark:hover:bg-cloud/10"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

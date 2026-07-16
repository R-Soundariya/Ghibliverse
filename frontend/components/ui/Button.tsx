import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";

type BaseProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = BaseProps & { href: string };

const VARIANT_CLASSES: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary: "bg-forest text-cloud hover:bg-forest-light",
  secondary: "bg-cloud text-forest border border-forest/20 hover:bg-sakura-light",
};

const BASE =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors shadow-sm";

export function Button({ variant = "primary", className = "", children, href, ...props }: ButtonProps | LinkProps) {
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

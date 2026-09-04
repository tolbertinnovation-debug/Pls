import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "green" | "outline" | "outlineLight";
type Size = "md" | "lg";

const BASE =
  "group inline-flex items-center justify-center gap-2.5 font-semibold tracking-tight " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.9375rem]",
  lg: "min-h-13 px-7 py-3.5 text-base",
};

/* `btn-sheen` gives the filled buttons a light sweep on hover; the sweep
   element always exists, only its animation is behind the motion query. */
const VARIANTS: Record<Variant, string> = {
  gold:
    "btn-sheen bg-gold-400 text-peak-950 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] " +
    "hover:bg-gold-300 hover:shadow-[0_8px_24px_-8px_rgba(228,171,8,0.65)]",
  green:
    "btn-sheen bg-peak-800 text-white hover:bg-peak-700 " +
    "hover:shadow-[0_8px_24px_-10px_rgba(6,70,42,0.7)]",
  outline:
    "border border-peak-900/25 text-peak-900 hover:border-peak-800 hover:bg-peak-50",
  outlineLight:
    "border border-white/35 text-white hover:border-gold-400 hover:text-gold-300",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function ButtonLink({
  children,
  variant = "gold",
  size = "md",
  className = "",
  ...rest
}: Props & ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "gold",
  size = "md",
  className = "",
  ...rest
}: Props & ComponentProps<"button">) {
  return (
    <button
      {...rest}
      className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

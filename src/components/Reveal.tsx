"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Shared observer so a page with dozens of revealed elements still only
 * creates one IntersectionObserver.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-reveal", "shown");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return observer;
}

/**
 * How the element arrives.
 *
 * - `up`    lift and fade — the default, used for text and cards
 * - `left`  / `right` — for the two halves of a split layout
 * - `scale` a small settle, for panels that should feel placed
 * - `clip`  a wipe up from the baseline, for photographs, where a fade
 *           reads as an image still loading
 * - `fade`  opacity only, where movement would fight a neighbour
 */
export type RevealVariant = "up" | "left" | "right" | "scale" | "clip" | "fade";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  variant?: RevealVariant;
  as?: ElementType;
};

/**
 * Brings its children into view once, on scroll.
 *
 * The hidden state lives in CSS behind `.js` and a `prefers-reduced-motion`
 * query, so this degrades to plain visible content when either JavaScript or
 * motion is unavailable.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.setAttribute("data-reveal", "shown");
      return;
    }

    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-variant={variant}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </Tag>
  );
}

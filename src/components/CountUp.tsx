"use client";

import { useEffect, useRef } from "react";

/**
 * Splits a display figure into an optional prefix, one integer and a suffix,
 * so "500+" counts and "24/7" — which is two numbers and means neither — is
 * left alone.
 */
function parse(value: string) {
  const match = /^([^\d]*)(\d+)([^\d]*)$/.exec(value.trim());
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return { prefix, target: Number(digits), suffix };
}

/* Quartic rather than exponential: exponential reaches 99% of the target in
   the first half and then visibly crawls, which reads as a stall. */
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts a figure up to its value the first time it scrolls into view.
 *
 * The finished value is what renders on the server, so the figure is correct
 * with JavaScript off, with reduced motion on, and for anything reading the
 * markup rather than the animation. The count is written straight to the DOM
 * node rather than through state, so a four-figure band is one paint per
 * frame rather than four React renders.
 *
 * An invisible copy of the final string holds the width, so the surrounding
 * layout does not shuffle while the digits change.
 */
export default function CountUp({
  value,
  className = "",
  duration = 1500,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parse(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || !parsed) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const { prefix, target, suffix } = parsed;
    let frame = 0;
    node.textContent = `${prefix}0${suffix}`;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const shown = Math.round(easeOutQuart(progress) * target);
          node.textContent = `${prefix}${shown}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // `parsed` is derived from `value` and stable for a given one.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span className={`relative inline-grid ${className}`}>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={ref} className="col-start-1 row-start-1 justify-self-center">
        {value}
      </span>
    </span>
  );
}

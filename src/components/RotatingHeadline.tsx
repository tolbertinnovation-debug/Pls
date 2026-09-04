"use client";

import { useEffect, useState } from "react";

/**
 * Cycles the second line of the hero headline.
 *
 * Every phrase is rendered, stacked in one grid cell, so the block is always
 * as tall as its longest line and the headline never resizes mid-cycle —
 * which would push the buttons below it up and down as it ran.
 *
 * The first phrase is the only one visible until JavaScript runs: the hidden
 * state is a plain `opacity: 0` outside the motion query, not something the
 * script has to undo. So with JavaScript off, or under reduced motion, the
 * headline is simply the tagline, sitting still.
 *
 * The rotation is decoration, so the whole block is hidden from assistive
 * technology and the caller supplies the real second line as screen-reader
 * text. Nothing announces itself every few seconds.
 */
export default function RotatingHeadline({
  phrases,
  interval = 3400,
  className = "",
}: {
  phrases: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      timer ??= setInterval(
        () => setIndex((i) => (i + 1) % phrases.length),
        interval,
      );
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    // No point cycling a headline nobody is looking at.
    const onVisibility = () =>
      document.visibilityState === "visible" ? start() : stop();

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [phrases.length, interval]);

  // Only ever advances by one, so the outgoing phrase is the previous index.
  const leaving = (index - 1 + phrases.length) % phrases.length;

  return (
    <span aria-hidden className={`grid ${className}`}>
      {phrases.map((phrase, i) => (
        <span
          key={phrase}
          data-phrase={i === index ? "in" : i === leaving ? "out" : "idle"}
          className="col-start-1 row-start-1"
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}

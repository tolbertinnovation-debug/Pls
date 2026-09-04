"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cycles the second line of the hero headline, once, and then rests.
 *
 * Three decisions worth stating, because each is deliberate:
 *
 * It settles rather than loops. The phrases run through one pass on arrival —
 * where movement earns a visitor's attention — and stop on the tagline, which
 * is the line the company actually trades under and so the right thing to
 * leave on screen. A permanent carousel would mean the tagline is showing a
 * quarter of the time, and would put movement beside a paragraph people are
 * trying to read.
 *
 * It stops when unwatched. The cycle only runs while the hero is on screen
 * and the tab is in front. Scroll past during the pass and it holds; there is
 * no point animating a headline nobody is looking at.
 *
 * It checks the layout rather than trusting it. Every phrase shares one grid
 * cell, so the headline cannot resize mid-cycle and shove the buttons below
 * it around. That only works while the phrases wrap to the same number of
 * lines: one that wrapped shorter would leave a blank line under the headline
 * while it showed. The phrases in site.ts are chosen to match, but rather
 * than trust that holds for every width, font and future edit, this measures
 * the rendered line boxes and simply declines to rotate when they disagree —
 * so the failure is a still headline, never a broken one.
 *
 * With JavaScript off or motion reduced the index never moves, and the
 * resting `opacity: 0` on the other phrases is plain CSS rather than
 * something a script has to undo, so the headline is just the tagline.
 *
 * The rotation is decoration: the block is hidden from assistive technology
 * and the caller supplies the real second line as screen-reader text, so
 * nothing announces itself every few seconds.
 */
export default function RotatingHeadline({
  phrases,
  interval = 4200,
  className = "",
}: {
  phrases: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    let onScreen = false;
    let ticks = 0;
    let settled = false;

    /** Do all the phrases occupy the same number of line boxes right now? */
    function uniform() {
      const spans = host!.querySelectorAll<HTMLElement>("[data-phrase]");
      let lines = -1;
      for (const span of spans) {
        const range = document.createRange();
        range.selectNodeContents(span);
        const count = range.getClientRects().length;
        if (lines === -1) lines = count;
        else if (count !== lines) return false;
      }
      return true;
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function tick() {
      if (!uniform()) {
        // A width this wording does not survive. Fall back to the tagline.
        setIndex(0);
        return;
      }
      ticks += 1;
      setIndex(ticks % phrases.length);
      if (ticks % phrases.length === 0) {
        // Back on the tagline, one full pass done. Leave it there.
        settled = true;
        stop();
      }
    }

    function sync() {
      const shouldRun =
        !settled && onScreen && document.visibilityState === "visible";
      if (shouldRun && !timer) timer = setInterval(tick, interval);
      else if (!shouldRun) stop();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.3 },
    );

    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [phrases, interval]);

  // Only ever advances by one, so the outgoing phrase is the previous index.
  const leaving = (index - 1 + phrases.length) % phrases.length;

  return (
    <span aria-hidden ref={hostRef} className={`grid ${className}`}>
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

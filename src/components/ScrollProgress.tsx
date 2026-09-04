"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline along the top of the header showing how far down the page the
 * visitor is. Decorative — the scrollbar carries the same information for
 * anyone who needs it — so it is hidden from assistive technology.
 *
 * Scaled rather than resized, and read inside a rAF, so scrolling never
 * triggers layout.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      node.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
      <div
        ref={ref}
        className="h-full origin-left scale-x-0 rule-gold"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

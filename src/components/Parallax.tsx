"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Drifts its child a few percent against the scroll, so a large photograph
 * has some depth as it passes.
 *
 * Deliberately conservative: the shift is small, it only runs on pointer-fine
 * screens wide enough for a split layout, it is skipped entirely under
 * reduced motion, and the work happens in a rAF driven by an
 * IntersectionObserver so nothing is computed while the figure is off screen.
 *
 * The child must be taller than its container (the container clips) or the
 * drift will expose an edge.
 */
export default function Parallax({
  children,
  /** Total travel as a share of the element's height. */
  strength = 0.08,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 1024px)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      // -1 when the element sits below the fold, +1 when it has passed above.
      const travelled =
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) /
        ((window.innerHeight + rect.height) / 2);
      const shift = travelled * strength * rect.height;
      node.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: "20% 0px" },
    );

    io.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

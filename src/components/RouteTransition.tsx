"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Re-keys the page on navigation so its content settles in rather than
 * snapping. The animation itself is a single CSS rule behind `.js` and a
 * reduced-motion query; this only supplies the key that restarts it.
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} data-enter>
      {children}
    </div>
  );
}

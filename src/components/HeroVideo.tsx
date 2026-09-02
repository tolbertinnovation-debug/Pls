"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/site";

/**
 * Ambient hero footage: a container ship under way at sunset.
 *
 * Two encodes exist so neither orientation is badly cropped, and which one to
 * use is decided before any src is set, so only one file is ever fetched. The
 * clip is silent, and its tail is cross-faded into its head so the loop point
 * is invisible.
 */
const SOURCES = {
  wide: {
    webm: "/media/hero-wide.webm",
    mp4: "/media/hero-wide.mp4",
    poster: "/media/hero-wide.jpg",
  },
  tall: {
    webm: "/media/hero-tall.webm",
    mp4: "/media/hero-tall.mp4",
    poster: "/media/hero-tall.jpg",
  },
} as const;

type Choice = keyof typeof SOURCES | "poster-only";

type Connection = { saveData?: boolean; effectiveType?: string };

/**
 * Decided once per page load and cached, so that resizing across the
 * breakpoint cannot trigger a second video download.
 */
let cachedChoice: Choice | null = null;

function decide(): Choice {
  // Motion preference and metered or slow connections both mean "poster only".
  // Mobile data is expensive in the markets this site serves, so a visitor who
  // has asked their browser to save data never pays for the video.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "poster-only";
  }

  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  if (connection?.saveData) return "poster-only";
  if (connection?.effectiveType && /2g$/.test(connection.effectiveType)) {
    return "poster-only";
  }

  return window.matchMedia("(min-width: 768px)").matches ? "wide" : "tall";
}

const subscribe = () => () => {};
const getSnapshot = (): Choice => (cachedChoice ??= decide());
const getServerSnapshot = (): Choice => "poster-only";

export default function HeroVideo() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const source = choice === "poster-only" ? null : SOURCES[choice];

  useEffect(() => {
    const video = ref.current;
    if (!video || !source) return;
    // Some browsers only honour autoplay when muted is set on the element
    // itself, and may refuse regardless — in which case the poster stays.
    video.muted = true;
    void video.play().catch(() => {});
  }, [source]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
    >
      {/* Server-rendered, so the hero is never blank while the clip loads. */}
      <picture>
        <source media="(min-width: 768px)" srcSet={asset(SOURCES.wide.poster)} />
        <img
          src={asset(SOURCES.tall.poster)}
          alt=""
          className="h-full w-full object-cover"
        />
      </picture>

      {source && (
        <video
          ref={ref}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          poster={asset(source.poster)}
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* VP9 first — roughly a third smaller than the H.264 fallback that
              Safari needs. */}
          <source src={asset(source.webm)} type="video/webm" />
          <source src={asset(source.mp4)} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

import type { NextConfig } from "next";

/**
 * The deployment target is GitHub Pages, which serves static files from a
 * repository subpath (…github.io/Pls). Both the base path and the canonical
 * origin come from one variable so they can never disagree: point
 * NEXT_PUBLIC_SITE_URL at a custom domain and the base path becomes empty.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://tolbertinnovation-debug.github.io/Pls";

const basePath = new URL(siteUrl).pathname.replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Static HTML export — GitHub Pages cannot run a Node server.
  output: "export",
  basePath,
  // Emit /about/index.html rather than /about.html, so a plain file server
  // resolves routes without extensionless-HTML fallbacks.
  trailingSlash: true,
  // No image optimizer on a static host; the assets in /public are pre-sized
  // to the dimensions they are actually rendered at.
  images: { unoptimized: true },
};

export default nextConfig;

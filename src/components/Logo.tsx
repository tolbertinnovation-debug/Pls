import Image from "next/image";
import Link from "next/link";
import { asset, company } from "@/lib/site";

type LogoProps = {
  /** "horizontal" for bars, "mark" for tight spaces. */
  variant?: "horizontal" | "mark";
  /**
   * Knockout colorway for dark green backgrounds: the illustration is
   * untouched, the wordmark is reversed out in white.
   */
  tone?: "dark" | "light";
  className?: string;
  /** Rendered height in px; width follows the asset's aspect ratio. */
  height?: number;
  priority?: boolean;
};

/**
 * Image optimization is off for the static export, so these files are stored at
 * roughly twice their largest rendered size — no more, no less.
 *
 * `next/image` only prefixes basePath through its optimizer, which is disabled
 * here, so every src goes through `asset()` explicitly.
 */
const ASSETS = {
  dark: {
    horizontal: { src: asset("/brand/logo-horizontal.webp"), w: 548, h: 120 },
    mark: { src: asset("/brand/logo-mark.webp"), w: 278, h: 130 },
  },
  light: {
    horizontal: { src: asset("/brand/logo-horizontal-light.webp"), w: 548, h: 120 },
    mark: { src: asset("/brand/logo-mark.webp"), w: 278, h: 130 },
  },
} as const;

/** The supplied Peak Logistics logo, unmodified, at three lockups. */
export function LogoImage({
  variant = "horizontal",
  tone = "dark",
  className = "",
  height = 44,
  priority = false,
}: LogoProps) {
  const asset = ASSETS[tone][variant];
  const width = Math.round((asset.w / asset.h) * height);

  return (
    <Image
      src={asset.src}
      alt={`${company.name} logo`}
      width={asset.w}
      height={asset.h}
      priority={priority}
      sizes={`${width}px`}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}

/** Logo wrapped in a link home, for the header and footer. */
export default function Logo({
  variant = "horizontal",
  tone = "dark",
  height = 44,
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${company.name} — home`}
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <LogoImage
        variant={variant}
        tone={tone}
        height={height}
        priority={priority}
      />
    </Link>
  );
}

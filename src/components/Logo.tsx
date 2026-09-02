import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/site";

type LogoProps = {
  /** "horizontal" for bars, "mark" for tight spaces, "stacked" for hero/footer. */
  variant?: "horizontal" | "mark" | "stacked";
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

const ASSETS = {
  dark: {
    horizontal: { src: "/brand/logo-horizontal.png", w: 1279, h: 280 },
    mark: { src: "/brand/logo-mark.png", w: 910, h: 425 },
    stacked: { src: "/brand/logo-full.png", w: 942, h: 720 },
  },
  light: {
    horizontal: { src: "/brand/logo-horizontal-light.png", w: 1279, h: 280 },
    mark: { src: "/brand/logo-mark.png", w: 910, h: 425 },
    stacked: { src: "/brand/logo-full-light.png", w: 760, h: 609 },
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

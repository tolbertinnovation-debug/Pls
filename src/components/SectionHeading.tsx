import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Heading level — sections on a page below the H1 should stay at 2. */
  as?: "h2" | "h3";
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Eyebrow + gold rule + title + optional lead, used by every section. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  align = "left",
  tone = "dark",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <Reveal
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_0_5px_rgba(244,197,49,0.12)]" />
          <span
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              tone === "light" ? "text-gold-400" : "text-gold-ink"
            }`}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <Tag
        className={`mt-5 text-3xl font-extrabold leading-[1.04] sm:text-4xl lg:text-[3rem] ${
          tone === "light" ? "text-white" : "text-peak-950"
        }`}
      >
        {title}
      </Tag>

      {lead && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            tone === "light" ? "text-white/70" : "text-peak-950/70"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

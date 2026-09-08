import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="grain logistics-grid relative overflow-hidden bg-peak-950 pt-28 lg:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_90%_at_88%_15%,rgba(228,171,8,0.18),transparent_58%),radial-gradient(55%_75%_at_0%_100%,rgba(15,118,67,0.32),transparent_62%)]"
      />
      <div aria-hidden className="absolute -right-24 bottom-8 hidden h-56 w-[28rem] rotate-[-8deg] rounded-full border border-white/10 lg:block" />
      <div aria-hidden className="absolute -right-12 bottom-3 hidden h-56 w-[28rem] rotate-[-8deg] rounded-full border border-gold-400/20 lg:block" />

      <Container className="relative">
        <div className="max-w-3xl py-14 lg:py-24">
          {crumbs.length > 0 && (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="flex w-fit flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-white/55 backdrop-blur-sm">
                  <li>
                    <Link href="/" className="transition-colors hover:text-gold-300">
                      Home
                    </Link>
                  </li>
                  {crumbs.map((crumb) => (
                    <li key={crumb.label} className="flex items-center gap-1">
                      <ChevronRight aria-hidden className="size-3.5" />
                      {crumb.href ? (
                        <Link
                          href={crumb.href}
                          className="transition-colors hover:text-gold-300"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span aria-current="page" className="text-white/70">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          )}

          {eyebrow && (
            <Reveal delay={60} className="mt-8 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_0_5px_rgba(244,197,49,0.12)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal delay={120}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.01] text-white sm:text-5xl lg:text-[4rem]">
              {title}
            </h1>
          </Reveal>

          {lead && (
            <Reveal delay={180}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                {lead}
              </p>
            </Reveal>
          )}
        </div>
      </Container>

      <div aria-hidden className="h-1.5 rule-gold" />
    </section>
  );
}

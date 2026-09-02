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
    <section className="grain relative overflow-hidden bg-peak-950 pt-28 lg:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_65%_at_80%_0%,rgba(228,171,8,0.14),transparent_62%),radial-gradient(60%_70%_at_0%_100%,rgba(15,118,67,0.3),transparent_60%)]"
      />

      <Container className="relative">
        <div className="max-w-3xl py-14 lg:py-20">
          {crumbs.length > 0 && (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1 text-xs text-white/45">
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
              <span className="h-px w-10 rule-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal delay={120}>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.03] text-white sm:text-5xl lg:text-[3.5rem]">
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

      <div aria-hidden className="h-1 rule-gold" />
    </section>
  );
}

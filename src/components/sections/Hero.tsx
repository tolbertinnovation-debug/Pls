import { ArrowRight, Plane, Ship, Truck, TrainFront } from "lucide-react";

import Container from "@/components/Container";
import HeroVideo from "@/components/HeroVideo";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

const MODES = [
  { name: "Air", Icon: Plane },
  { name: "Sea", Icon: Ship },
  { name: "Road", Icon: Truck },
  { name: "Rail", Icon: TrainFront },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[38rem] flex-col overflow-hidden bg-peak-950 pt-28 lg:min-h-[42rem] lg:pt-32">
      <HeroVideo />

      {/*
        Scrim. The footage is bright gold, so the copy needs a dark ground to
        sit on: a flat wash everywhere (heavier on mobile, where the text runs
        the full width), a left-weighted gradient on wider screens where the
        text column is, and a fade into the section colour at the bottom.
      */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-peak-950/62 lg:bg-peak-950/42" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-peak-950/90 via-peak-950/60 to-transparent lg:block"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-peak-950 via-peak-950/70 to-transparent"
      />

      <Container className="relative flex flex-1 items-center">
        <div className="max-w-2xl py-16 lg:py-24">
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-10 rule-gold" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              Logistics &amp; Transportation · Monrovia, Liberia
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.375rem] font-extrabold leading-[0.98] text-white drop-shadow-[0_2px_24px_rgba(3,32,19,0.55)] min-[400px]:text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
              Your Cargo.
              <span className="block text-gold-400">Our Commitment.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
              Reliable, efficient and client-focused logistics solutions across
              Liberia.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              From freight forwarding and customs clearance to warehousing,
              transportation and final delivery, we help keep your cargo moving.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/quote" variant="gold" size="lg">
                Request a Quote
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </ButtonLink>
              <ButtonLink href="/services" variant="outlineLight" size="lg">
                Explore Our Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* -------------------------- transport modes -------------------------- */}
      <div className="relative border-t border-white/15 bg-peak-950/70 backdrop-blur-sm">
        <Container>
          <ul className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
            {MODES.map(({ name, Icon }) => (
              <li key={name}>
                <div className="flex items-center justify-center gap-3 px-3 py-5 sm:px-6">
                  <Icon aria-hidden className="size-5 shrink-0 text-gold-400" />
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-white">
                    {name} Freight
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

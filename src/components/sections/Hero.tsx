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
        Scrim. Weighted to the left, where the copy sits, so the footage stays
        legible on the right instead of disappearing under a flat wash. Mobile
        gets a vertical version because the copy runs the full width there.
        Contrast is measured against the rendered result, not assumed.
      */}
      {/*
        Multi-stop scrims, shaped around where the copy actually sits so the
        footage stays open everywhere else. Desktop darkens the left column and
        releases to almost nothing on the right; mobile darkens the middle band
        the text occupies and leaves the sky above and the containers below
        clear. Both are measured against the rendered pixels, not estimated.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(3,32,19,0.74)_0%,rgba(3,32,19,0.62)_13%,rgba(3,32,19,0.90)_24%,rgba(3,32,19,0.90)_76%,rgba(3,32,19,0.45)_88%,rgba(3,32,19,0.94)_100%)] lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(3,32,19,0.97)_0%,rgba(3,32,19,0.90)_30%,rgba(3,32,19,0.48)_62%,rgba(3,32,19,0.05)_100%)] lg:block"
      />
      {/* Keeps the navigation readable over the brightest part of the sky. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 hidden h-24 bg-gradient-to-b from-peak-950/70 to-transparent lg:block"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-peak-950 via-peak-950/55 to-transparent"
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

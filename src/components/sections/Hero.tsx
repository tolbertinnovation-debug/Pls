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
    <section className="relative isolate flex min-h-[44rem] flex-col overflow-hidden bg-peak-950 pt-28 lg:min-h-[42rem] lg:pt-32">
      <HeroVideo />

      {/*
        Scrim. On desktop the copy sits in a left column, so a left-weighted
        gradient keeps it legible while the right half of the footage stays
        open. On mobile the copy runs the full width, so scrimming behind it
        would mean scrimming the whole frame — which hid the footage almost
        entirely. There the overlay stays light and the copy carries its own
        translucent panel instead, leaving the ship visible above and below.
        Every ratio below is measured against the rendered video, sampled
        across the loop, not assumed.
      */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-peak-950/28 lg:hidden" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(3,32,19,0.97)_0%,rgba(3,32,19,0.90)_30%,rgba(3,32,19,0.48)_62%,rgba(3,32,19,0.05)_100%)] lg:block"
      />
      {/* Keeps the navigation readable over the brightest part of the sky. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-peak-950/85 via-peak-950/45 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-peak-950 via-peak-950/55 to-transparent"
      />

      <Container className="relative flex flex-1 items-center">
        <div className="max-w-2xl py-14 lg:py-24">
          {/* Full-bleed within the gutter on mobile, so it reads as a band
              rather than a floating card. Dissolves entirely at lg. */}
          <div className="relative -mx-5 border-y border-white/12 bg-peak-950/66 px-5 py-9 backdrop-blur-[3px] sm:-mx-8 sm:px-8 lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 rule-gold" />
              {/* gold-300 rather than the usual gold-400: this is the one place
                  small gold text sits over moving footage, and the lighter tone
                  buys real contrast headroom on the brightest frames. */}
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
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
                Reliable, efficient and client-focused logistics solutions
                across Liberia.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                From freight forwarding and customs clearance to warehousing,
                transportation and final delivery, we help keep your cargo
                moving.
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

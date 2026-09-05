import { ArrowRight, Plane, Ship, Truck, TrainFront } from "lucide-react";

import Container from "@/components/Container";
import HeroVideo from "@/components/HeroVideo";
import RotatingHeadline from "@/components/RotatingHeadline";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { heroHeadlines } from "@/lib/site";

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
        Scrim. Neutral rather than green: a green wash tinted the whole frame
        and the ship read as murk rather than a ship.

        It also follows the footage instead of covering it evenly. Measuring
        the raw video down the frame, the sun blows out to pure white from
        roughly 40px to 260px and then falls away to about half that for the
        rest of the hero. So the scrim is heavy only across the narrow band
        the eyebrow sits in — 12px text needing 4.5:1 is what sets the
        ceiling — and drops to 50% from 300px down, where the ship and the
        containers are. Desktop keeps the same neutral tone, weighted left
        where the copy column sits.

        The hero text is close to solid white for the same reason: a faded
        white needs a heavier scrim to reach the same ratio, which costs
        footage. Every figure here is measured against the rendered video
        across the loop, never assumed.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(6,10,12,0.86)_0,rgba(6,10,12,0.26)_78px,rgba(6,10,12,0.28)_118px,rgba(6,10,12,0.72)_150px,rgba(6,10,12,0.72)_195px,rgba(6,10,12,0.55)_300px,rgba(6,10,12,0.55)_86%,rgba(3,32,19,0.98)_100%)] lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(6,10,12,0.92)_0%,rgba(6,10,12,0.84)_30%,rgba(6,10,12,0.42)_62%,rgba(6,10,12,0.04)_100%)] lg:block"
      />
      {/* Keeps the navigation readable over the brightest part of the sky. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 hidden h-28 bg-gradient-to-b from-peak-950/85 via-peak-950/45 to-transparent lg:block"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-40 bg-gradient-to-t from-peak-950 via-peak-950/55 to-transparent lg:block"
      />

      <Container className="relative flex flex-1 items-center">
        <div className="max-w-2xl py-10 lg:py-24">
          <div className="relative">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 rule-gold" />
              {/* gold-300 rather than the usual gold-400: this is the one place
                  small gold text sits over moving footage, and the lighter tone
                  buys real contrast headroom on the brightest frames. */}
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">
                Logistics &amp; Transportation · Monrovia, Liberia
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-5 text-[clamp(1.75rem,9.4vw,2.75rem)] font-extrabold leading-[1.02] text-white drop-shadow-[0_2px_24px_rgba(3,32,19,0.55)] sm:text-6xl sm:leading-[0.98] lg:text-[4.25rem]">
                Your Cargo.
                {/* The rotation is decoration; the tagline is what assistive
                    technology is given, once, and it does not change. */}
                <span className="sr-only"> {heroHeadlines[0]}</span>
                <RotatingHeadline
                  phrases={heroHeadlines}
                  className="text-gold-400"
                />
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white">
                Reliable, efficient and client-focused logistics solutions
                across Liberia.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
                From freight forwarding and customs clearance to warehousing,
                transportation and final delivery, we help keep your cargo
                moving.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

        {/* Scroll cue. Decorative — the page scrolls the same without it — and
            it sits in the open right-hand third, which only exists at lg. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 right-0 hidden flex-col items-center gap-3 lg:flex"
        >
          <span className="font-display text-[0.625rem] font-bold uppercase tracking-[0.28em] text-white/60 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative block h-14 w-px bg-white/25">
            <span className="animate-cue absolute -left-[3px] top-0 block size-[7px] rounded-full bg-gold-400" />
          </span>
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

import {
  ArrowRight,
  Check,
  FileCheck2,
  MapPin,
  PackageCheck,
  Plane,
  Ship,
  Truck,
  TrainFront,
  Warehouse,
} from "lucide-react";

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

const JOURNEY = [
  { label: "Port handling", Icon: Ship },
  { label: "Customs clearance", Icon: FileCheck2 },
  { label: "Secure storage", Icon: Warehouse },
  { label: "Final delivery", Icon: PackageCheck },
];

export default function Hero() {
  return (
    <section className="logistics-grid relative isolate flex min-h-[44rem] flex-col overflow-hidden bg-peak-950 pt-24 lg:min-h-[49rem] lg:pt-28">
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

      <Container className="relative flex flex-1 items-center py-10 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.72fr)] lg:gap-16">
        <div className="max-w-2xl">
          <div className="relative">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 rule-gold" />
              {/* gold-300 rather than the usual gold-400: this is the one place
                  small gold text sits over moving footage, and the lighter tone
                  buys real contrast headroom on the brightest frames. */}
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">
                Liberia&rsquo;s full-service logistics partner
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[clamp(2.65rem,11vw,4.2rem)] font-extrabold leading-[0.94] text-white drop-shadow-[0_2px_24px_rgba(3,32,19,0.55)] sm:text-6xl lg:text-[4.8rem]">
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
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/92 sm:text-xl">
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

            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/85">
                <span className="inline-flex items-center gap-2">
                  <Check aria-hidden className="size-4 rounded-full bg-gold-400 p-0.5 text-peak-950" />
                  Local expertise
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check aria-hidden className="size-4 rounded-full bg-gold-400 p-0.5 text-peak-950" />
                  End-to-end coordination
                </span>
              </div>
            </Reveal>

            <Reveal delay={320} className="lg:hidden">
              <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-3xl border border-white/15 bg-peak-950/55 shadow-[0_24px_55px_-28px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="border-r border-white/10 p-4">
                  <p className="font-display text-2xl font-extrabold text-gold-300">
                    6
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-white/65">
                    Core services
                  </p>
                </div>
                <div className="p-4">
                  <p className="font-display text-2xl font-extrabold text-gold-300">
                    4
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-white/65">
                    Transport modes
                  </p>
                </div>
                <div className="col-span-2 flex items-center gap-3 border-t border-white/10 px-4 py-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-400 text-peak-950">
                    <MapPin aria-hidden className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Strategically located
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">
                      Opposite the Freeport of Monrovia
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={220} variant="right" className="hidden lg:block">
          <aside className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-peak-950/62 p-3 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.07] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                    One coordinated journey
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    Origin to destination
                  </h2>
                </div>
                <span className="flex size-10 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300">
                  <Truck aria-hidden className="size-5" />
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/75">
                  <span className="size-2 rounded-full bg-gold-400 shadow-[0_0_0_4px_rgba(244,197,49,0.12)]" />
                  Every stage covered
                </span>
                <span className="text-xs font-semibold text-gold-300">
                  01—04
                </span>
              </div>

              <div className="relative mt-5">
                <span aria-hidden className="absolute bottom-7 left-5 top-7 w-px bg-gradient-to-b from-gold-400 via-white/25 to-gold-400" />
                <ol className="space-y-1">
                {JOURNEY.map(({ label, Icon }, index) => (
                  <li key={label} className="relative flex items-center gap-4 rounded-2xl px-1 py-3.5">
                    <span className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border ${index === JOURNEY.length - 1 ? "border-gold-400 bg-gold-400 text-peak-950" : "border-white/20 bg-peak-900 text-white"}`}>
                      <Icon aria-hidden className="size-4.5" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="mt-0.5 text-xs text-white/55">Managed by Peak Logistics</p>
                    </div>
                    <span className="font-display text-xs font-bold tabular-nums text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
                </ol>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-gold-400/20 bg-gold-400/[0.08] p-4">
                <MapPin aria-hidden className="size-5 shrink-0 text-gold-300" />
                <p className="text-sm leading-snug text-white/80">
                  Based opposite the Freeport of Monrovia
                </p>
              </div>
            </div>
          </aside>
        </Reveal>
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
      <div className="relative border-t border-white/12 bg-peak-950/75 backdrop-blur-xl">
        <Container>
          <ul className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
            {MODES.map(({ name, Icon }) => (
              <li key={name}>
                <div className="group flex items-center justify-center gap-3 px-3 py-5 sm:px-6">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/[0.06] text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-peak-950">
                    <Icon aria-hidden className="size-4.5 shrink-0" />
                  </span>
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

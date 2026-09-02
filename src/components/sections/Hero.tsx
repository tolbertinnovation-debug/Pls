import Image from "next/image";
import { ArrowRight, Plane, Ship, Truck, TrainFront } from "lucide-react";

import Container from "@/components/Container";
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
    <section className="grain relative isolate overflow-hidden bg-peak-950 pt-28 lg:pt-32">
      {/* Depth: a warm gold bloom behind the image column, a green wash left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_78%_18%,rgba(228,171,8,0.16),transparent_62%),radial-gradient(70%_70%_at_8%_92%,rgba(15,118,67,0.28),transparent_60%)]"
      />
      {/* Faint route-grid motif echoing the globe in the logo. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[38rem] w-[38rem] text-gold-400/[0.07]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="199" stroke="currentColor" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" />
        <circle cx="200" cy="200" r="100" stroke="currentColor" />
        <ellipse cx="200" cy="200" rx="199" ry="70" stroke="currentColor" />
        <ellipse cx="200" cy="200" rx="199" ry="140" stroke="currentColor" />
        <path d="M200 1v398M1 200h398" stroke="currentColor" />
      </svg>

      <Container className="relative">
        <div className="grid items-center gap-12 pb-14 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-16">
          {/* ------------------------------ copy ------------------------------ */}
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 rule-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
                Logistics &amp; Transportation · Monrovia, Liberia
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.375rem] font-extrabold leading-[0.98] text-white min-[400px]:text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
                Your Cargo.
                <span className="block text-gold-400">Our Commitment.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
                Reliable, efficient and client-focused logistics solutions
                across Liberia.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
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

          {/* ------------------------------ image ------------------------------ */}
          <Reveal delay={200} className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Offset gold frame. */}
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 hidden h-full w-full border border-gold-400/40 sm:block"
              />
              <div className="relative overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
                <Image
                  src="/images/port-monrovia.jpg"
                  alt="A container ship, gantry crane and cargo truck at a container terminal at sunrise"
                  width={1148}
                  height={942}
                  priority
                  sizes="(max-width: 1023px) 88vw, 40vw"
                  className="h-[22rem] w-full object-cover sm:h-[26rem] lg:h-[32rem]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-peak-950/55 via-transparent to-transparent"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 rule-gold" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* -------------------------- transport modes -------------------------- */}
      <div className="relative border-t border-white/10 bg-peak-950/40">
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

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import CTABand from "@/components/CTABand";
import Container from "@/components/Container";
import Icon, { type IconKey } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import HowWeHelp from "@/components/sections/HowWeHelp";
import { absolute, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freight forwarding, customs brokerage, documentation services, supply chain management, specialized logistics and transportation services across Liberia.",
  alternates: { canonical: absolute("/services/") },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Our services"
        title="Six services, one accountable partner"
        lead="Everything your cargo needs between origin and destination — freight, clearance, paperwork, storage and delivery, coordinated by a single team."
      />

      {/* Quick index */}
      <section className="border-b border-peak-950/10 bg-white">
        <Container>
          <ul className="grid gap-px bg-peak-950/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug} className="bg-white">
                <a
                  href={`#${service.slug}`}
                  className="group flex min-h-16 items-center gap-4 px-4 py-4 transition-colors hover:bg-peak-50"
                >
                  <span className="font-display text-xs font-bold tabular-nums text-gold-ink">
                    {service.number}
                  </span>
                  <span className="text-sm font-semibold text-peak-950 transition-colors group-hover:text-peak-700">
                    {service.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Detailed sections, alternating background */}
      {services.map((service, index) => {
        const alt = index % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 py-16 lg:py-24 ${alt ? "bg-stone-canvas" : "bg-white"}`}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal
                  className={`lg:col-span-5 ${alt ? "lg:order-2" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 items-center justify-center bg-peak-800 text-gold-400">
                      <Icon name={service.icon as IconKey} className="size-7" />
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-4xl font-extrabold tabular-nums text-peak-950/55"
                    >
                      {service.number}
                    </span>
                  </div>
                  <h2 className="mt-6 text-3xl font-extrabold leading-tight text-peak-950 lg:text-[2.25rem]">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-peak-950/70 lg:text-lg">
                    {service.intro}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-7 inline-flex items-center gap-2 border-b-2 border-gold-400 pb-1 font-semibold text-peak-900 transition-colors hover:text-peak-700"
                  >
                    Read more about {service.title.toLowerCase()}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </Reveal>

                <Reveal
                  delay={100}
                  className={`lg:col-span-7 ${alt ? "lg:order-1" : ""}`}
                >
                  <ul className="h-full border border-peak-950/12 bg-white">
                    {service.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-start gap-4 border-b border-peak-950/10 p-6 last:border-b-0 lg:p-7"
                      >
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-peak-50 text-peak-700">
                          <Check aria-hidden className="size-3.5" strokeWidth={3} />
                        </span>
                        <span className="leading-relaxed text-peak-950/80">
                          {capability}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <HowWeHelp />
      <CTABand />
    </>
  );
}

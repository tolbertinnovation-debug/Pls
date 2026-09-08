"use client";

import Link from "next/link";
import { ArrowRight, Check, Compass } from "lucide-react";
import { useState } from "react";

import Container from "@/components/Container";
import Icon, { type IconKey } from "@/components/Icon";
import { services } from "@/lib/site";

const needs = [
  {
    id: "move",
    label: "Move cargo",
    description: "International freight or dependable transport within Liberia.",
    slugs: ["freight-forwarding", "transportation-services"],
  },
  {
    id: "clear",
    label: "Clear customs",
    description: "Import or export clearance with the right paperwork in place.",
    slugs: ["customs-brokerage", "documentation-services"],
  },
  {
    id: "manage",
    label: "Plan & store",
    description: "Inventory, warehousing and coordinated supply-chain support.",
    slugs: ["supply-chain-management", "specialized-logistics"],
  },
  {
    id: "deliver",
    label: "Complete delivery",
    description: "Last-mile and tailored delivery arrangements for your cargo.",
    slugs: ["specialized-logistics", "transportation-services"],
  },
] as const;

export default function ServiceFinder() {
  const [selected, setSelected] = useState<(typeof needs)[number]["id"]>("move");
  const activeNeed = needs.find((need) => need.id === selected) ?? needs[0];
  const matches = activeNeed.slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service) => service !== undefined);

  return (
    <section className="relative overflow-hidden bg-peak-950 py-20 text-white lg:py-28">
      <div aria-hidden className="absolute inset-0 logistics-grid opacity-40" />
      <div aria-hidden className="absolute -right-40 -top-40 size-[32rem] rounded-full bg-peak-600/20 blur-3xl" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-sm font-semibold text-gold-300">
              <Compass aria-hidden className="size-4" />
              Service finder
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              What does your cargo need next?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
              Choose the job you need handled. We’ll point you to the services
              that fit that stage of the journey.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1" role="list" aria-label="Cargo needs">
              {needs.map((need) => {
                const active = need.id === selected;
                return (
                  <button
                    key={need.id}
                    type="button"
                    onClick={() => setSelected(need.id)}
                    aria-pressed={active}
                    className={`group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                      active
                        ? "border-gold-400 bg-gold-400 text-peak-950"
                        : "border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span>
                      <span className="block text-base font-bold">{need.label}</span>
                      <span className={`mt-1 block text-sm leading-snug ${active ? "text-peak-950/70" : "text-white/60"}`}>
                        {need.description}
                      </span>
                    </span>
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${active ? "bg-peak-950 text-gold-400" : "border border-white/20 text-white/60"}`}>
                      {active ? <Check aria-hidden className="size-4" /> : <ArrowRight aria-hidden className="size-4" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-live="polite" className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-sm sm:p-5">
            <div className="flex items-center justify-between gap-4 px-3 pb-4 pt-2 sm:px-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
                Recommended services
              </p>
              <span className="rounded-full bg-peak-700/70 px-3 py-1 text-sm font-semibold text-peak-100">
                {matches.length} matches
              </span>
            </div>
            <div className="grid gap-3">
              {matches.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-[1.4rem] bg-white p-5 text-peak-950 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-peak-50 text-peak-800">
                      <Icon name={service.icon as IconKey} className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-bold">{service.title}</h3>
                        <ArrowRight aria-hidden className="mt-1 size-5 shrink-0 text-peak-700 transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-peak-950/65">
                        {service.summary}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {service.capabilities.slice(0, 2).map((capability) => (
                          <li key={capability} className="rounded-full bg-stone-canvas px-3 py-1.5 text-xs font-semibold text-peak-800">
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3 rounded-[1.4rem] border border-white/10 bg-peak-900/60 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-white/70">
                Need more than one service? We can coordinate the full journey.
              </p>
              <Link href="/quote" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-gold-300 hover:text-gold-200">
                Request a quote <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";

import CTABand from "@/components/CTABand";
import Container from "@/components/Container";
import Icon, { type IconKey } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import HowWeHelp from "@/components/sections/HowWeHelp";
import LiberiaFocus from "@/components/sections/LiberiaFocus";
import { absolute, coreValues, strategicAdvantages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Peak",
  description:
    "A one-stop logistics provider with deep understanding of Liberia's logistics landscape, customs expertise, integrated multi-modal solutions and efficient handling of complex operations.",
  alternates: { canonical: absolute("/why-peak/") },
};

export default function WhyPeakPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Why Peak" }]}
        eyebrow="Why Peak"
        title="Why Businesses Choose Peak"
        lead="As a one-stop logistics provider, we bring the local knowledge, regulatory expertise and multi-modal reach that complex shipments require."
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Strategic advantage"
            title="Four reasons cargo moves better with us"
            lead="Our approach allows clients to focus on their core business while we manage the logistics complexities."
          />

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {strategicAdvantages.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 70} className="flex">
                <article className="group relative flex w-full gap-6 border border-peak-950/12 bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-peak-800/30 hover:shadow-[0_20px_44px_-30px_rgba(3,32,19,0.5)] lg:p-9">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 rule-gold transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <span className="flex size-12 shrink-0 items-center justify-center bg-peak-800 text-gold-400">
                    <Icon name={item.icon as IconKey} className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-peak-950">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-peak-950/70">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          {/* Core values restated as the standard behind the advantages. */}
          <div className="mt-16 border-t border-peak-950/10 pt-16">
            <SectionHeading
              eyebrow="Our standard"
              align="center"
              title="Excellence, Integrity, Reliability"
            />
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {coreValues.map((value, i) => (
                <Reveal key={value.name} as="li" delay={i * 80}>
                  <article className="h-full border border-peak-950/12 bg-stone-canvas p-7 text-center">
                    <h3 className="font-display text-xl font-bold text-peak-950">
                      {value.name}
                    </h3>
                    <span
                      aria-hidden
                      className="mx-auto mt-4 block h-px w-10 rule-gold"
                    />
                    <p className="mt-4 text-sm leading-relaxed text-peak-950/70">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <HowWeHelp />
      <LiberiaFocus />
      <CTABand />
    </>
  );
}

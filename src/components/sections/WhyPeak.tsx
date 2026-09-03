import Image from "next/image";

import Container from "@/components/Container";
import Icon, { type IconKey } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { asset, strategicAdvantages } from "@/lib/site";

export default function WhyPeak() {
  return (
    <section className="grain relative overflow-hidden bg-peak-950 py-20 text-white lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(228,171,8,0.12),transparent_60%)]"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Image column */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -left-4 -top-4 hidden h-full w-full border border-gold-400/35 sm:block"
              />
              <figure className="relative m-0 overflow-hidden">
                <Image
                  src={asset("/images/fleet-lineup.webp")}
                  alt="Container trucks lined up at a yard with port cranes behind and a team in discussion"
                  width={1200}
                  height={675}
                  loading="lazy"
                  sizes="(max-width: 1023px) 90vw, 38vw"
                  className="h-80 w-full object-cover sm:h-[26rem] lg:h-[34rem]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-peak-950 via-peak-950/30 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-peak-950/55 p-6 backdrop-blur-sm lg:p-7">
                  <p className="text-sm leading-relaxed text-white/85">
                    Our approach allows clients to focus on their core business
                    while we manage the logistics complexities.
                  </p>
                </figcaption>
              </figure>
            </div>
          </Reveal>

          {/* Copy column */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Strategic advantage"
              tone="light"
              title="Why Businesses Choose Peak"
              lead="As a one-stop logistics provider, Peak Logistics Services brings together the local knowledge, regulatory expertise and multi-modal reach that complex shipments require."
            />

            <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
              {strategicAdvantages.map((item, i) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={i * 70}
                  className="bg-peak-950 p-6 lg:p-7"
                >
                  <span className="inline-flex size-11 items-center justify-center border border-gold-400/30 bg-gold-400/10 text-gold-400">
                    <Icon name={item.icon as IconKey} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

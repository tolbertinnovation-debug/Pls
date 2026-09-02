import type { Metadata } from "next";
import Image from "next/image";

import CTABand from "@/components/CTABand";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import MissionVision from "@/components/sections/MissionVision";
import WhoWeServe from "@/components/sections/WhoWeServe";
import { absolute, asset, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Peak Logistics Services is a full-service logistics company delivering efficient, reliable and client-focused solutions across Liberia by air, sea, road and rail.",
  alternates: { canonical: absolute("/about/") },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About us"
        title="A full-service logistics partner in Liberia"
        lead={company.descriptor}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Introduction"
                title="Moving goods by air, sea, road and rail"
              />
              <Reveal delay={80}>
                <div className="mt-7 space-y-5 text-base leading-relaxed text-peak-950/70 sm:text-lg">
                  <p>
                    Peak Logistics Services is a full-service logistics company
                    committed to delivering efficient, reliable and
                    client-focused solutions across Liberia. We specialise in
                    facilitating the seamless movement of goods through air,
                    sea, road and rail, while ensuring full compliance with
                    customs regulations and documentation requirements.
                  </p>
                  <p>
                    Our operations cover the entire logistics value chain — from
                    freight coordination and customs clearance to warehousing
                    and final delivery. By combining industry expertise with
                    local market knowledge, we ensure smooth cargo flow from
                    origin to destination, prioritising efficiency, compliance
                    and timeliness.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -bottom-4 -right-4 hidden h-full w-full border border-gold-500/50 sm:block"
                />
                <Image
                  src={asset("/images/port-monrovia.jpg")}
                  alt="Cargo being handled at a container terminal — ship, gantry crane and haulage truck"
                  width={1148}
                  height={942}
                  loading="lazy"
                  sizes="(max-width: 1023px) 92vw, 40vw"
                  className="relative h-72 w-full object-cover sm:h-96 lg:h-[26rem]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <MissionVision />
      <WhoWeServe />

      {/* Looking ahead — quoted from the company profile. */}
      <section className="grain relative overflow-hidden bg-peak-950 py-20 text-white lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(228,171,8,0.13),transparent_60%)]"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow="Looking ahead"
            tone="light"
            align="center"
            title="Expanding our services, entering new markets"
          />
          <Reveal delay={100}>
            <p className="mx-auto mt-7 max-w-3xl text-center text-lg leading-relaxed text-white/65">
              We are focused on expanding our service offerings and entering new
              markets. Our goal is to continuously innovate and deliver logistics
              solutions that improve efficiency, reduce costs and enhance client
              satisfaction.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTABand />
    </>
  );
}

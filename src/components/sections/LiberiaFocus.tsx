import Image from "next/image";
import { ExternalLink, MapPin, Mail, Phone } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { LogoImage } from "@/components/Logo";
import { asset, company } from "@/lib/site";

/**
 * Opens Google Maps searching for the published address. No coordinates are
 * asserted here — the profile does not provide any.
 */
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.address.oneLine,
)}`;

export default function LiberiaFocus() {
  return (
    <section className="grain relative overflow-hidden bg-peak-900 py-20 text-white lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_60%_at_15%_10%,rgba(228,171,8,0.13),transparent_60%)]"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Our market"
              tone="light"
              title="Logistics Expertise in Liberia"
              lead="We combine industry expertise with local market knowledge to keep cargo flowing smoothly from origin to destination — with the customs and compliance work handled along the way."
            />

            <Reveal delay={100}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
                Our team operates from Bushrod Island in Monrovia, directly
                across from the Freeport of Monrovia — the point through which
                most of the country&rsquo;s import and export cargo passes.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <figure className="relative m-0 mt-10 overflow-hidden border border-white/15">
                <Image
                  src={asset("/images/monrovia-freeport.webp")}
                  alt="Aerial view over Bushrod Island and the Freeport of Monrovia, with container terminal, cranes and the city beyond"
                  width={1500}
                  height={844}
                  loading="lazy"
                  sizes="(max-width: 1023px) 92vw, 46vw"
                  className="h-64 w-full object-cover sm:h-80"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-peak-950/80 via-transparent to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block h-px w-8 rule-gold" />
                  <span className="mt-2.5 block text-sm font-semibold text-white">
                    The Freeport of Monrovia and Bushrod Island
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Location panel */}
          <Reveal delay={140} className="lg:col-span-6">
            <div className="relative border border-white/15 bg-peak-950/60 backdrop-blur-sm">
              <div aria-hidden className="h-1 rule-gold" />

              <div className="flex items-center justify-between gap-6 border-b border-white/10 px-7 py-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                    Our office
                  </p>
                  <p className="mt-2 font-display text-lg font-bold">
                    Bushrod Island, Monrovia
                  </p>
                </div>
                <LogoImage variant="mark" height={44} />
              </div>

              {/* Each term/definition pair sits in exactly one <div>, as the
                  HTML spec requires for a <dl>. */}
              <dl className="divide-y divide-white/10">
                <div className="px-7 py-5">
                  <dt className="sr-only">Address</dt>
                  <dd className="flex items-start gap-4">
                    <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-400" />
                    <address className="not-italic leading-relaxed text-white/75">
                      {company.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>

                <div className="px-7 py-5">
                  <dt className="sr-only">Phone</dt>
                  <dd className="flex items-start gap-4">
                    <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-400" />
                    <a
                      href={company.phone.href}
                      className="text-white/75 transition-colors hover:text-gold-300"
                    >
                      {company.phone.display}
                    </a>
                  </dd>
                </div>

                <div className="px-7 py-5">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex min-w-0 items-start gap-4">
                    <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-400" />
                    <a
                      href={company.email.href}
                      className="break-all text-white/75 transition-colors hover:text-gold-300"
                    >
                      {company.email.display}
                    </a>
                  </dd>
                </div>
              </dl>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-between gap-3 border-t border-white/10 bg-white/[0.04] px-7 text-sm font-semibold text-gold-300 transition-colors hover:bg-white/[0.08]"
              >
                Find us on Google Maps
                <ExternalLink aria-hidden className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

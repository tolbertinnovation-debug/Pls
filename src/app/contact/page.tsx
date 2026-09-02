import type { Metadata } from "next";
import { AtSign, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import CTABand from "@/components/CTABand";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import { LogoImage } from "@/components/Logo";
import { absolute, company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Peak Logistics Services in Monrovia, Liberia — call ${company.phone.display}, email ${company.email.display}, or visit us opposite the Freeport of Monrovia on Bushrod Island.`,
  alternates: { canonical: absolute("/contact/") },
};

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.address.oneLine,
)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact us"
        title="Talk to our team in Monrovia"
        lead="Call, email or visit the office. We will take your shipment details and advise on the right route, mode and clearance path."
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <a
                href={company.phone.href}
                className="group flex h-full flex-col border border-peak-950/12 bg-white p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-peak-800/30"
              >
                <span className="flex size-12 items-center justify-center bg-peak-800 text-gold-400">
                  <Phone aria-hidden className="size-6" />
                </span>
                <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-peak-950/70">
                  Phone
                </h2>
                <p className="mt-2 font-display text-lg font-bold text-peak-950 transition-colors group-hover:text-peak-700">
                  {company.phone.display}
                </p>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <a
                href={company.email.href}
                className="group flex h-full flex-col border border-peak-950/12 bg-white p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-peak-800/30"
              >
                <span className="flex size-12 items-center justify-center bg-peak-800 text-gold-400">
                  <Mail aria-hidden className="size-6" />
                </span>
                <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-peak-950/70">
                  Email
                </h2>
                <p className="mt-2 break-all font-display text-lg font-bold text-peak-950 transition-colors group-hover:text-peak-700">
                  {company.email.display}
                </p>
              </a>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex h-full flex-col border border-peak-950/12 bg-white p-8">
                <span className="flex size-12 items-center justify-center bg-peak-800 text-gold-400">
                  <AtSign aria-hidden className="size-6" />
                </span>
                <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-peak-950/70">
                  Social
                </h2>
                <p className="mt-2 font-display text-lg font-bold text-peak-950">
                  {company.socialHandle}
                </p>
                <p className="mt-2 text-sm text-peak-950/70">
                  Find us under this handle on social media.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Address + quote prompt */}
          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Visit us"
                title="Bushrod Island, Monrovia"
                lead="Our office sits directly opposite the Freeport of Monrovia — the point through which most of Liberia's import and export cargo passes."
              />

              <Reveal delay={100}>
                <div className="mt-8 border border-peak-950/12 bg-stone-canvas">
                  <div aria-hidden className="h-1 rule-gold" />
                  <div className="flex items-start gap-4 p-7">
                    <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-gold-ink" />
                    <address className="not-italic text-lg font-medium leading-relaxed text-peak-950">
                      {company.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-14 items-center justify-between gap-3 border-t border-peak-950/10 px-7 text-sm font-semibold text-peak-800 transition-colors hover:bg-peak-50"
                  >
                    Open in Google Maps
                    <ExternalLink aria-hidden className="size-4" />
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:col-span-6">
              <div className="grain relative flex h-full flex-col justify-between overflow-hidden bg-peak-950 p-8 text-white lg:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_10%,rgba(228,171,8,0.16),transparent_62%)]"
                />
                <div className="relative">
                  <LogoImage variant="mark" height={56} />
                  <h2 className="mt-7 text-2xl font-extrabold leading-tight lg:text-3xl">
                    Have cargo to move?
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/65">
                    Send us the shipment details — origin, destination, cargo
                    type and timing — and we will prepare a quote around them.
                  </p>
                </div>
                <div className="relative mt-9">
                  <ButtonLink href="/quote" variant="gold" size="lg">
                    Request a Quote
                  </ButtonLink>
                  <p className="mt-6 border-t border-white/10 pt-6 font-display text-sm font-semibold text-gold-300">
                    {company.tagline}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}

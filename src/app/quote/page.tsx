import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { absolute, company, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us about your shipment and Peak Logistics Services will prepare a logistics solution — freight forwarding, customs clearing, documentation, warehousing and delivery across Liberia.",
  alternates: { canonical: absolute("/quote/") },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Request a Quote" }]}
        eyebrow="Request a quote"
        title="Tell us about your cargo"
        lead="Share the essentials of your shipment and we will come back to you with a logistics solution built around it."
      />

      <section className="bg-stone-canvas py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Form */}
            <Reveal className="lg:col-span-8">
              <div className="border border-peak-950/12 bg-white p-6 sm:p-9 lg:p-11">
                <h2 className="sr-only">Quote request form</h2>
                <QuoteForm />
              </div>
            </Reveal>

            {/* Aside */}
            <Reveal delay={120} className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="border border-peak-950/12 bg-white">
                  <div aria-hidden className="h-1 rule-gold" />
                  <div className="p-7">
                    <h2 className="font-display text-lg font-bold text-peak-950">
                      Prefer to speak with us?
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-peak-950/70">
                      Reach the office directly and we will take your shipment
                      details over the phone or by email.
                    </p>

                    <ul className="mt-6 space-y-4 text-sm">
                      <li>
                        <a
                          href={company.phone.href}
                          className="flex items-start gap-3 font-medium text-peak-900 transition-colors hover:text-peak-700"
                        >
                          <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
                          {company.phone.display}
                        </a>
                      </li>
                      <li>
                        <a
                          href={company.email.href}
                          className="flex items-start gap-3 break-all font-medium text-peak-900 transition-colors hover:text-peak-700"
                        >
                          <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
                          {company.email.display}
                        </a>
                      </li>
                      <li className="flex items-start gap-3 text-peak-950/70">
                        <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
                        <address className="not-italic leading-relaxed">
                          {company.address.lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border border-peak-950/12 bg-peak-950 p-7 text-white">
                  <Clock aria-hidden className="size-5 text-gold-400" />
                  <h2 className="mt-4 font-display text-base font-bold">
                    What helps us quote faster
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                    <li>· Cargo description, weight and dimensions</li>
                    <li>· Origin and final delivery point</li>
                    <li>· Whether customs clearing is required</li>
                    <li>· Your target shipment window</li>
                  </ul>
                </div>

                <div className="mt-6 border border-peak-950/12 bg-white p-7">
                  <h2 className="font-display text-base font-bold text-peak-950">
                    Services you can request
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm text-peak-950/70">
                    {services.map((service) => (
                      <li key={service.slug}>· {service.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

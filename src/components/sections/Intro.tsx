import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const VALUE_CHAIN = [
  "Freight coordination",
  "Customs clearance",
  "Documentation",
  "Warehousing",
  "Transportation",
  "Final delivery",
];

export default function Intro() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Who we are"
              title="Logistics That Keep Your Business Moving"
            />

            <Reveal delay={80}>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-peak-950/70 sm:text-lg">
                <p>
                  Peak Logistics Services is a full-service logistics company
                  committed to delivering efficient, reliable and client-focused
                  solutions across Liberia. We specialise in facilitating the
                  seamless movement of goods through{" "}
                  <strong className="font-semibold text-peak-900">
                    air, sea, road and rail
                  </strong>
                  , while ensuring full compliance with customs regulations and
                  documentation requirements.
                </p>
                <p>
                  Our operations cover the entire logistics value chain — from
                  freight coordination and customs clearance to warehousing and
                  final delivery. By combining industry expertise with local
                  market knowledge, we ensure smooth cargo flow from origin to
                  destination, prioritising efficiency, compliance and
                  timeliness.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 border-b-2 border-gold-400 pb-1 font-semibold text-peak-900 transition-colors hover:text-peak-700"
              >
                More about Peak Logistics
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* Value chain panel */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative border border-peak-950/10 bg-stone-canvas p-8 lg:p-10">
              <div aria-hidden className="absolute inset-x-0 top-0 h-1 rule-gold" />
              <h3 className="font-display text-lg font-bold text-peak-950">
                The full logistics value chain
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-peak-950/70">
                One provider across every stage, so your shipment is never
                handed between disconnected vendors.
              </p>

              <ol className="mt-8 space-y-0">
                {VALUE_CHAIN.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-4 border-t border-peak-950/10 py-3.5 first:border-t-0 first:pt-0"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-peak-800 text-white">
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="font-medium text-peak-950/85">{step}</span>
                    <span
                      aria-hidden
                      className="ml-auto font-display text-xs font-bold tabular-nums text-gold-ink"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import CTABand from "@/components/CTABand";
import Container from "@/components/Container";
import Icon, { type IconKey } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import {
  absolute,
  asset,
  company,
  howWeHelp,
  serviceBySlug,
  services,
} from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: absolute(`/services/${service.slug}/`) },
    openGraph: {
      type: "website",
      siteName: company.name,
      title: `${service.metaTitle} | ${company.name}`,
      description: service.metaDescription,
      url: absolute(`/services/${service.slug}/`),
      // Defining openGraph here replaces the layout's object wholesale, so the
      // shared card image has to be restated.
      images: [
        {
          url: absolute("/brand/og-image.jpg"),
          width: 1200,
          height: 630,
          alt: `${company.name} — ${service.title}`,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        eyebrow={`Service ${service.number}`}
        title={service.title}
        lead={service.intro}
      />

      {/* Each service leads with its own photograph, so the six detail pages
          are visually distinct rather than six identical text layouts. */}
      <section className="bg-white pt-10 lg:pt-14">
        <Container>
          <Reveal>
            <figure className="relative m-0 overflow-hidden border border-peak-950/12">
              <Image
                src={asset(service.image.src)}
                alt={service.image.alt}
                width={1000}
                height={563}
                priority
                sizes="(max-width: 1279px) 92vw, 1200px"
                className="h-56 w-full object-cover sm:h-72 lg:h-96"
              />
            </figure>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center bg-peak-800 text-gold-400">
                  <Icon name={service.icon as IconKey} className="size-7" />
                </span>
                <h2 className="text-2xl font-bold text-peak-950">
                  What this covers
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <ul className="mt-8 border-t border-peak-950/10">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-4 border-b border-peak-950/10 py-5"
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

              <Reveal delay={140}>
                <h2 className="mt-14 text-2xl font-bold text-peak-950">
                  How we help
                </h2>
                <p className="mt-3 text-peak-950/70">
                  An illustration of how a typical engagement runs — the detail
                  is shaped around your cargo.
                </p>
                <ol className="mt-8 space-y-0">
                  {howWeHelp.map((stage) => (
                    <li
                      key={stage.step}
                      className="flex gap-5 border-l border-peak-950/12 pb-8 pl-6 last:pb-0"
                    >
                      <div className="-ml-[2.05rem] flex size-9 shrink-0 items-center justify-center border border-peak-800/25 bg-white font-display text-xs font-bold tabular-nums text-peak-800">
                        {stage.step}
                      </div>
                      <div className="-mt-0.5">
                        <h3 className="font-bold text-peak-950">{stage.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-peak-950/70">
                          {stage.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            {/* Sidebar */}
            <Reveal delay={120} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="border border-peak-950/12 bg-peak-950 p-8 text-white">
                  <div aria-hidden className="h-px w-10 rule-gold" />
                  <h2 className="mt-5 font-display text-xl font-bold">
                    Need {service.title.toLowerCase()}?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    Send us your shipment details and we will come back with a
                    solution built around them.
                  </p>
                  <div className="mt-7 flex flex-col gap-3">
                    <ButtonLink href="/quote" variant="gold" className="w-full">
                      Request a Quote
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </ButtonLink>
                    <a
                      href={company.phone.href}
                      className="flex min-h-11 items-center justify-center border border-white/25 text-sm font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-300"
                    >
                      {company.phone.display}
                    </a>
                  </div>
                </div>

                <nav aria-label="Other services" className="mt-6 border border-peak-950/12 bg-white">
                  <h2 className="border-b border-peak-950/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-peak-950/70">
                    Other services
                  </h2>
                  <ul>
                    {others.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/services/${other.slug}`}
                          className="group flex items-center justify-between gap-3 border-b border-peak-950/10 px-6 py-4 transition-colors last:border-b-0 hover:bg-peak-50"
                        >
                          <span className="flex items-center gap-3">
                            <span className="font-display text-xs font-bold tabular-nums text-gold-ink">
                              {other.number}
                            </span>
                            <span className="text-sm font-semibold text-peak-950">
                              {other.title}
                            </span>
                          </span>
                          <ArrowRight
                            aria-hidden
                            className="size-4 shrink-0 text-peak-950/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-peak-700"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}

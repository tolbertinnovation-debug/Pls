import Image from "next/image";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { asset, gallery } from "@/lib/site";

export default function Gallery() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="In the field"
          align="center"
          title="Cargo on the Move"
          lead="Freight, clearance and delivery — the work behind every shipment."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((shot, i) => (
            <Reveal key={shot.src} as="li" delay={i * 60} variant="clip">
              <figure className="group relative m-0 overflow-hidden border border-peak-950/12">
                <Image
                  src={asset(shot.src)}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] lg:h-64"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-peak-950/85 via-peak-950/10 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block h-px w-8 origin-left rule-gold transition-transform duration-500 group-hover:scale-x-[2.5]" />
                  <span className="mt-2.5 block text-sm font-semibold text-white transition-transform duration-500 group-hover:-translate-y-0.5">
                    {shot.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

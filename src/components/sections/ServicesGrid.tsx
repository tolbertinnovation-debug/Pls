import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { ButtonLink } from "@/components/Button";
import { services } from "@/lib/site";

export default function ServicesGrid({
  showCta = true,
}: {
  showCta?: boolean;
}) {
  return (
    <section className="bg-stone-canvas py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Six services, one accountable partner"
            lead="Everything your cargo needs between origin and destination — coordinated by a single team."
          />
          {showCta && (
            <Reveal delay={100} className="shrink-0">
              <ButtonLink href="/services" variant="outline">
                View all services
              </ButtonLink>
            </Reveal>
          )}
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} as="li" delay={i * 60} className="flex">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

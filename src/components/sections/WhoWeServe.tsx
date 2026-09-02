import Container from "@/components/Container";
import Icon, { type IconKey } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { targetMarket } from "@/lib/site";

export default function WhoWeServe() {
  return (
    <section className="bg-stone-canvas py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who we serve"
          title="Built for Businesses of Every Size"
          lead="We serve businesses of all sizes, and our solutions are tailored to meet diverse logistics needs across industries."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {targetMarket.map((item, i) => (
            <Reveal key={item.title} as="li" delay={i * 70} className="flex">
              <article className="group relative flex w-full flex-col border border-peak-950/12 bg-white p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-peak-800/30">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rule-gold transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="inline-flex size-12 items-center justify-center bg-peak-800 text-gold-400">
                  <Icon name={item.icon as IconKey} className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug text-peak-950">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-peak-950/70">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

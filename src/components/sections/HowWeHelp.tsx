import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { howWeHelp } from "@/lib/site";

export default function HowWeHelp() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we help"
          title="From first conversation to final delivery"
          lead="An illustration of how a typical engagement runs with us. Every shipment is different, so the detail is shaped around your cargo."
        />

        <ol className="mt-16 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
          {howWeHelp.map((stage, i) => (
            <Reveal key={stage.step} as="li" delay={i * 80} className="relative">
              {/* Connector rail — desktop only. */}
              <span
                aria-hidden
                className={`absolute left-0 top-5 hidden h-px bg-peak-950/12 lg:block ${
                  i === howWeHelp.length - 1 ? "w-0" : "w-full"
                }`}
              />
              <div className="relative flex items-center gap-4 lg:block">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center border border-peak-800/25 bg-white font-display text-sm font-bold tabular-nums text-peak-800">
                  {stage.step}
                </span>
                <h3 className="text-lg font-bold text-peak-950 lg:mt-6">
                  {stage.title}
                </h3>
              </div>
              <p className="mt-3 pl-14 text-sm leading-relaxed text-peak-950/70 lg:pl-0 lg:pr-6">
                {stage.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

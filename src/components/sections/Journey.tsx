import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { milestones } from "@/lib/site";

export default function Journey() {
  // The dated rail only appears once real years are filled in.
  const hasYears = milestones.some((m) => m.year);

  return (
    <section className="bg-stone-canvas py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our journey"
          align="center"
          title="A Decade of Growth"
        />

        <ol className="mt-16 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
          {milestones.map((stage, i) => (
            <Reveal
              key={stage.title}
              as="li"
              delay={i * 80}
              className="group relative"
            >
              {/* Dashed rail between markers, desktop only. Draws as the
                  milestone is revealed, so the timeline reads left to right. */}
              <span
                aria-hidden
                data-rail
                className={`absolute left-0 top-5 hidden h-px border-t border-dashed border-peak-950/25 lg:block ${
                  i === milestones.length - 1 ? "w-0" : "w-full"
                }`}
              />
              <div className="relative flex items-center gap-4 lg:block">
                <span
                  data-pop
                  className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-peak-900 font-display text-xs font-bold tabular-nums text-gold-400 ring-0 ring-gold-400/30 transition-[box-shadow] duration-300 group-hover:ring-8"
                >
                  {stage.year || i + 1}
                </span>
                <h3 className="font-display text-lg font-bold leading-snug text-peak-950 lg:mt-6">
                  {hasYears ? stage.title : `${i + 1}. ${stage.title}`}
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

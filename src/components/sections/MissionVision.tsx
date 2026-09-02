import { Compass, Target } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { coreValues, mission, vision } from "@/lib/site";

export default function MissionVision() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What guides us"
          align="center"
          title="Mission, Vision &amp; Values"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            { label: "Mission", body: mission, Icon: Target },
            { label: "Vision", body: vision, Icon: Compass },
          ].map(({ label, body, Icon: Ico }, i) => (
            <Reveal key={label} delay={i * 90}>
              <article className="relative h-full border border-peak-950/12 bg-stone-canvas p-8 lg:p-10">
                <div aria-hidden className="absolute inset-y-0 left-0 w-1 rule-gold" />
                <div className="flex items-center gap-3">
                  <Ico aria-hidden className="size-5 text-gold-ink" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-peak-950/70">
                    {label}
                  </h3>
                </div>
                <p className="mt-6 font-display text-xl font-semibold leading-relaxed text-peak-950 lg:text-[1.375rem]">
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {coreValues.map((value, i) => (
            <Reveal key={value.name} delay={i * 80}>
              <article className="h-full border border-peak-950/12 bg-white p-7 transition-colors duration-300 hover:border-gold-400">
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold-ink">
                  Core value
                </span>
                <h3 className="mt-3 text-xl font-bold text-peak-950">
                  {value.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-peak-950/70">
                  {value.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/Container";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { headlineStats, performanceStats } from "@/lib/site";

const SETS = {
  headline: headlineStats,
  performance: performanceStats,
} as const;

/**
 * A band of figures. Used twice: under the hero, where it answers the first
 * question an importer has, and again after the case for choosing Peak.
 *
 * The figures count up the first time the band is reached. The final value is
 * what the markup contains, so it is correct without JavaScript and for
 * anyone who has asked for reduced motion.
 */
export default function StatsBand({
  set = "headline",
  label,
}: {
  set?: keyof typeof SETS;
  label: string;
}) {
  const stats = SETS[set];

  return (
    <section
      aria-label={label}
      className="relative border-y border-white/10 bg-peak-900"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              as="li"
              delay={i * 70}
              className="group relative bg-peak-900 px-5 py-8 text-center transition-colors duration-300 hover:bg-peak-800/70 lg:py-10"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rule-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              <p className="font-display text-4xl font-extrabold tabular-nums text-gold-400 lg:text-5xl">
                <CountUp value={stat.value} duration={1400 + i * 120} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

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
      className="relative z-20 -mt-px bg-peak-950 pb-8 lg:-mt-8 lg:bg-transparent lg:pb-0"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_24px_70px_-30px_rgba(3,32,19,0.72)] lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              as="li"
              delay={i * 70}
              className="group relative bg-peak-900 px-5 py-7 text-center transition-colors duration-300 hover:bg-peak-800 lg:py-9"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rule-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              <p className="font-display text-3xl font-extrabold tabular-nums text-gold-400 sm:text-4xl lg:text-[2.75rem]">
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

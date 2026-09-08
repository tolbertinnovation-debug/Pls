import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { containerTypes } from "@/lib/site";

/**
 * Side elevation of a dry container, drawn from plain rects so the proportions
 * stay exact. `scale` sizes each box against the largest in the set, so the
 * three cards read as a true comparison rather than three identical drawings.
 */
function ContainerDrawing({
  length,
  height,
  label,
}: {
  length: number;
  height: number;
  label: string;
}) {
  const W = 260;
  const H = 90;
  const w = W * length;
  const h = H * height;
  const x = (W - w) / 2;
  const y = H - h;
  // Corrugation every 10px across the body.
  const ribs = Math.max(1, Math.floor(w / 10));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      className="h-auto w-full"
    >
      <rect x={x} y={y} width={w} height={h} fill="#06462a" />
      <g stroke="#0a5c36" strokeWidth="1.5">
        {Array.from({ length: ribs }, (_, i) => {
          const rx = x + 6 + i * 10;
          return rx < x + w - 16 ? (
            <line key={i} x1={rx} y1={y + 4} x2={rx} y2={y + h - 4} />
          ) : null;
        })}
      </g>
      {/* Door end, picked out in gold. */}
      <rect x={x + w - 14} y={y} width={14} height={h} fill="#c89000" />
      <line
        x1={x + w - 7}
        y1={y + 4}
        x2={x + w - 7}
        y2={y + h - 4}
        stroke="#8a6000"
        strokeWidth="1.5"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke="#032013"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function ContainerGuide() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Container reference"
          title="Which Container Do You Need?"
          lead="The three dry-container sizes that cover most cargo moving through the Freeport. Not sure which fits your consignment? Tell us what you are shipping and we will advise."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {containerTypes.map((type, i) => (
            <Reveal key={type.code} as="li" delay={i * 80} className="flex">
              <article className="flex w-full flex-col border border-peak-950/12 bg-stone-canvas p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-peak-950">
                    {type.name}
                  </h3>
                  <span className="font-display text-xs font-bold tracking-widest text-gold-ink">
                    {type.code}
                  </span>
                </div>

                <div className="mt-6 px-2">
                  <ContainerDrawing
                    length={type.scale.length}
                    height={type.scale.height}
                    label={`Scale drawing of a ${type.name} shipping container`}
                  />
                </div>

                <dl className="mt-7 space-y-2.5 border-t border-peak-950/10 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-peak-950/70">Dimensions</dt>
                    <dd className="text-right font-medium tabular-nums text-peak-950">
                      {type.metric}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-peak-950/70">Imperial</dt>
                    <dd className="text-right font-medium tabular-nums text-peak-950">
                      {type.imperial}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-peak-950/70">Capacity</dt>
                    <dd className="text-right font-medium tabular-nums text-peak-950">
                      {type.capacity}
                    </dd>
                  </div>
                </dl>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-peak-950/70">
                  <span className="font-semibold text-peak-900">Best for: </span>
                  {type.bestFor}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-peak-950/70">
            Nominal external dimensions to the ISO standard, which is what a
            carrier quotes against. Internal capacity and permitted payload vary
            by container build and shipping line — we confirm the exact figures
            for your booking before cargo is committed.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

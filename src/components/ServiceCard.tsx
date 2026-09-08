import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import Icon, { type IconKey } from "@/components/Icon";
import { asset, type Service } from "@/lib/site";

export default function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-peak-950/10 bg-white shadow-[0_12px_36px_-26px_rgba(3,32,19,0.38)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-peak-800/20 hover:shadow-[0_30px_65px_-32px_rgba(3,32,19,0.5)]"
    >
      {/* Gold edge wipes across the top on hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 rule-gold transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="relative overflow-hidden">
        <Image
          src={asset(service.image.src)}
          alt={service.image.alt}
          width={1000}
          height={563}
          loading="lazy"
          sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
          className={`${featured ? "h-60 lg:h-72" : "h-52"} w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]`}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-peak-950/70 via-peak-950/5 to-transparent"
        />
        {/* Icon and number sit on the photo, as the reference build does. */}
        <span className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-full border border-white/15 bg-peak-900/90 text-gold-400 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-peak-950">
          <Icon name={service.icon as IconKey} className="size-5" />
        </span>
        <span className="absolute bottom-5 right-4 font-display text-sm font-bold tabular-nums tracking-widest text-white/80">
          {service.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="w-fit rounded-full bg-peak-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-peak-700">
            Logistics service
          </span>
          {!featured && (
            <span className="text-xs font-semibold text-peak-950/55">
              {service.capabilities.length} capabilities
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-peak-950">{service.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-peak-950/70">
          {service.summary}
        </p>

        {featured && (
          <ul className="mt-6 grid gap-3 border-t border-peak-950/10 pt-5 sm:grid-cols-2">
            {service.capabilities.slice(0, 2).map((capability) => (
              <li
                key={capability}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-peak-950/75"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-peak-50 text-peak-700">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {capability}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-peak-800">
          Learn more
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

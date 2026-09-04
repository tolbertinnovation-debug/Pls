import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Icon, { type IconKey } from "@/components/Icon";
import { asset, type Service } from "@/lib/site";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full w-full flex-col overflow-hidden border border-peak-950/12 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-peak-800/30 hover:shadow-[0_24px_50px_-28px_rgba(3,32,19,0.45)]"
    >
      {/* Gold edge wipes across the top on hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 rule-gold transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="relative overflow-hidden">
        <Image
          src={asset(service.image.src)}
          alt={service.image.alt}
          width={1000}
          height={563}
          loading="lazy"
          sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
          className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-peak-950/70 via-peak-950/5 to-transparent"
        />
        {/* Icon and number sit on the photo, as the reference build does. */}
        <span className="absolute bottom-4 left-4 flex size-11 items-center justify-center bg-peak-900/90 text-gold-400 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-peak-950">
          <Icon name={service.icon as IconKey} className="size-5" />
        </span>
        <span className="absolute bottom-5 right-4 font-display text-sm font-bold tabular-nums tracking-widest text-white/80">
          {service.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-bold text-peak-950">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-peak-950/70">
          {service.summary}
        </p>
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

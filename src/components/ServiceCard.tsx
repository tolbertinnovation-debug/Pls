import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Icon, { type IconKey } from "@/components/Icon";
import type { Service } from "@/lib/site";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full w-full flex-col border border-peak-950/12 bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-peak-800/30 hover:shadow-[0_24px_50px_-28px_rgba(3,32,19,0.45)] lg:p-8"
    >
      {/* Gold rule that draws in on hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rule-gold transition-transform duration-300 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center bg-peak-50 text-peak-700 transition-colors duration-300 group-hover:bg-peak-800 group-hover:text-gold-400">
          <Icon name={service.icon as IconKey} className="size-6" />
        </span>
        <span className="font-display text-sm font-bold tabular-nums tracking-widest text-gold-ink transition-colors duration-300 group-hover:text-peak-800">
          {service.number}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold text-peak-950">{service.title}</h3>
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
    </Link>
  );
}

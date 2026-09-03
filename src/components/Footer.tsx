import Link from "next/link";
import { Mail, MapPin, Phone, AtSign } from "lucide-react";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { company, navigation, services } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-peak-950 text-white">
      {/* Gold hairline across the top edge. */}
      <div className="h-1 rule-gold" />

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tone="light" height={54} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">
              {company.descriptor} We move goods by air, sea, road and rail —
              from freight coordination and customs clearance through to
              warehousing and final delivery.
            </p>
            <p className="mt-6 max-w-xs font-display text-base font-semibold leading-snug text-gold-300">
              {company.tagline}
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="text-sm text-white/70 transition-colors hover:text-gold-300"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-gold-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={company.phone.href}
                  className="group flex items-start gap-3 text-white/70 transition-colors hover:text-gold-300"
                >
                  <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-400" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={company.email.href}
                  className="group flex items-start gap-3 break-all text-white/70 transition-colors hover:text-gold-300"
                >
                  <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-400" />
                  {company.email.display}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <AtSign aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{company.socialHandle}</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <address className="not-italic leading-relaxed">
                  {company.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Monrovia, Liberia · Freight Forwarding · Customs Clearing · Supply
            Chain Management
          </p>
        </div>
      </Container>
    </footer>
  );
}

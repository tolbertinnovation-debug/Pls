import Link from "next/link";

import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { services } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden bg-peak-950 pt-28 text-white lg:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(228,171,8,0.14),transparent_62%)]"
      />
      <Container className="relative">
        <div className="max-w-2xl py-24 lg:py-32">
          <span aria-hidden className="block h-px w-10 rule-gold" />
          <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.22em] text-gold-400">
            404
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            This page has gone off route
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            The page you were looking for does not exist. Head back to the
            homepage, or pick up from one of our services below.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" variant="gold" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="outlineLight" size="lg">
              Contact us
            </ButtonLink>
          </div>

          <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug} className="bg-peak-950">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex min-h-14 items-center gap-3 px-5 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-gold-300"
                >
                  <span className="font-display text-xs font-bold tabular-nums text-gold-400">
                    {service.number}
                  </span>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

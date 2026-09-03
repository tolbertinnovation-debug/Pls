import { ArrowRight, Mail, Phone } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { company } from "@/lib/site";

export default function CTABand() {
  return (
    <section className="grain relative overflow-hidden bg-peak-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(228,171,8,0.20),transparent_65%)]"
      />
      <div aria-hidden className="h-1 rule-gold" />

      <Container className="relative py-16 lg:py-24">
        <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
              Ready to Move Your Cargo?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Let&rsquo;s build a reliable logistics solution around your
              business needs.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote" variant="gold" size="lg">
                Request a Quote
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outlineLight" size="lg">
                Contact Us
              </ButtonLink>
            </div>
          </div>

          {/* Direct lines, for the visitor who would rather not fill in a form. */}
          <div className="w-full border-t border-white/20 pt-8 lg:w-auto lg:min-w-80 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Speak to us directly
            </p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={company.phone.href}
                  className="group flex items-center gap-3 text-white transition-colors hover:text-gold-300"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center border border-white/25 text-gold-400 transition-colors group-hover:border-gold-400">
                    <Phone aria-hidden className="size-4" />
                  </span>
                  <span className="font-display text-lg font-bold">
                    {company.phone.display}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={company.email.href}
                  className="group flex items-center gap-3 text-white transition-colors hover:text-gold-300"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center border border-white/25 text-gold-400 transition-colors group-hover:border-gold-400">
                    <Mail aria-hidden className="size-4" />
                  </span>
                  <span className="break-all text-sm font-medium">
                    {company.email.display}
                  </span>
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-white/70">
              {company.address.locality}, {company.address.country} · Opposite
              the Freeport of Monrovia
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

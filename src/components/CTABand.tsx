import { ArrowRight } from "lucide-react";

import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-peak-800">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(228,171,8,0.18),transparent_65%)]"
      />
      <div aria-hidden className="h-1 rule-gold" />

      <Container className="relative py-16 lg:py-20">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
              Ready to Move Your Cargo?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Let&rsquo;s build a reliable logistics solution around your
              business needs.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
        </Reveal>
      </Container>
    </section>
  );
}

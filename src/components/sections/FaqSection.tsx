import { ChevronDown, MessageCircleQuestion } from "lucide-react";

import Container from "@/components/Container";
import { company } from "@/lib/site";

const faqs = [
  {
    question: "Which transport modes can Peak Logistics coordinate?",
    answer:
      "We coordinate cargo movement by air, sea, road and rail, selecting and connecting the modes that fit the shipment and route.",
  },
  {
    question: "Can you handle customs documents and clearance together?",
    answer:
      "Yes. Our customs brokerage and documentation services cover import and export paperwork, duties and taxes, bills of lading, certificates of origin, packing lists and related compliance requirements.",
  },
  {
    question: "Do you provide warehousing and last-mile delivery?",
    answer:
      "Yes. Our specialized logistics and supply-chain services include bonded warehousing, inventory coordination, distribution and last-mile delivery solutions.",
  },
  {
    question: "Can services be combined for one shipment?",
    answer:
      "Yes. Peak Logistics can coordinate multiple stages—from freight and customs clearance through warehousing and final delivery—under one accountable team.",
  },
  {
    question: "Where is your office located?",
    answer: `We are located ${company.address.oneLine}.`,
  },
  {
    question: "How do I request a quote?",
    answer:
      "Use the quote form and share your cargo type, origin, destination and preferred timeline. The team can then review the requirements and respond with the next steps.",
  },
] as const;

export default function FaqSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-peak-50 px-4 py-2 text-sm font-semibold text-peak-800">
              <MessageCircleQuestion aria-hidden className="size-4" />
              Common questions
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-peak-950 sm:text-4xl">
              Helpful answers before your shipment moves
            </h2>
            <p className="mt-5 text-base leading-relaxed text-peak-950/65 lg:text-lg">
              A quick guide to our coverage, capabilities and quote process.
            </p>
          </div>

          <div className="divide-y divide-peak-950/10 border-y border-peak-950/10">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-base font-bold text-peak-950 marker:content-none sm:text-lg">
                  {faq.question}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-peak-50 text-peak-800 transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-12 text-base leading-relaxed text-peak-950/65">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

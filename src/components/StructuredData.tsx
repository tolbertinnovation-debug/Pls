import { absolute, company, services, siteUrl } from "@/lib/site";

/**
 * schema.org LocalBusiness markup. Only fields backed by the company profile
 * are emitted — no coordinates, ratings, founding date or price data.
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    slogan: company.tagline,
    description:
      "Peak Logistics Services provides freight forwarding, customs brokerage, documentation, transportation and supply chain solutions across Liberia.",
    url: siteUrl,
    logo: absolute("/brand/icon-512.png"),
    image: absolute("/brand/og-image.jpg"),
    telephone: company.phone.display,
    email: company.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Opposite Freeport of Monrovia, Behind CONEX Gas Station, Bushrod Island",
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      addressCountry: "LR",
    },
    areaServed: { "@type": "Country", name: "Liberia" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Logistics Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: absolute(`/services/${service.slug}/`),
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import type { MetadataRoute } from "next";

// Required for `output: "export"`.
export const dynamic = "force-static";

import { services, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Trailing slashes match the exported directory-style URLs.
  const staticRoutes: [string, number][] = [
    ["/", 1],
    ["/about/", 0.8],
    ["/services/", 0.9],
    ["/why-peak/", 0.8],
    ["/contact/", 0.8],
    ["/quote/", 0.9],
  ];

  return [
    ...staticRoutes.map(([path, priority]) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

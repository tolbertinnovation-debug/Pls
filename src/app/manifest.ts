import type { MetadataRoute } from "next";
import { company } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: "Peak Logistics",
    description:
      "Freight forwarding, customs brokerage, documentation, transportation and supply chain solutions across Liberia.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#032013",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

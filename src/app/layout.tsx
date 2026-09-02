import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Peak Logistics Services | Reliable Logistics Solutions in Liberia",
    template: "%s | Peak Logistics Services",
  },
  description:
    "Peak Logistics Services provides freight forwarding, customs brokerage, documentation, transportation and supply chain solutions across Liberia.",
  applicationName: company.name,
  keywords: [
    "logistics Liberia",
    "freight forwarding Monrovia",
    "customs clearing Liberia",
    "customs brokerage Liberia",
    "Freeport of Monrovia logistics",
    "shipping documentation Liberia",
    "supply chain management Liberia",
    "cargo transportation Liberia",
    "bonded warehousing Liberia",
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_LR",
    url: siteUrl,
    siteName: company.name,
    title:
      "Peak Logistics Services | Reliable Logistics Solutions in Liberia",
    description:
      "Freight forwarding, customs brokerage, documentation, transportation and supply chain solutions across Liberia.",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Peak Logistics Services — transportation and logistics in Liberia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Peak Logistics Services | Reliable Logistics Solutions in Liberia",
    description:
      "Freight forwarding, customs brokerage, documentation, transportation and supply chain solutions across Liberia.",
    images: ["/brand/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/icon-192.png", sizes: "192x192" }],
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#032013",
  width: "device-width",
  initialScale: 1,
};

/**
 * Marks the document as JavaScript-capable before first paint, so the
 * scroll-reveal styles only hide content when they can also un-hide it.
 */
const JS_FLAG = `document.documentElement.classList.add('js')`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body className="min-h-dvh bg-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-peak-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

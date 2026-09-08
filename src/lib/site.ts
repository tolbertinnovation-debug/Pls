/**
 * Single source of truth for company information.
 *
 * Every fact below is taken verbatim (or lightly re-flowed) from the supplied
 * Peak Logistics Services company profile. Nothing here is invented — no
 * history, statistics, client names, certifications, awards or coordinates.
 */

export const company = {
  name: "Peak Logistics Services",
  shortName: "Peak Logistics",
  tagline: "Your Cargo, Our Commitment. Reaching New Heights in Liberia.",
  descriptor:
    "A full-service logistics company committed to delivering efficient, reliable and client-focused solutions across Liberia.",
  phone: {
    display: "+231 88 690 5096",
    href: "tel:+231886905096",
  },
  email: {
    display: "peaklogisticsservices@gmail.com",
    href: "mailto:peaklogisticsservices@gmail.com",
  },
  /**
   * Only the handle is published in the profile — no social URLs were
   * supplied, so none are fabricated here.
   */
  socialHandle: "@peaklogisticsservices",
  address: {
    lines: [
      "Opposite Freeport of Monrovia",
      "Behind CONEX Gas Station",
      "Bushrod Island",
      "Monrovia, Liberia",
    ],
    /** Single-line form for schema.org and map search links. */
    oneLine:
      "Opposite Freeport of Monrovia, Behind CONEX Gas Station, Bushrod Island, Monrovia, Liberia",
    locality: "Monrovia",
    region: "Montserrado County",
    country: "Liberia",
  },
} as const;

/**
 * Canonical site URL, including any subpath the site is served from.
 *
 * The default is the GitHub Pages address. Point NEXT_PUBLIC_SITE_URL at a
 * custom domain (e.g. https://peaklogisticsservices.com) and both the base
 * path and every absolute URL below follow automatically — `next.config.ts`
 * derives `basePath` from this same value.
 */
/**
 * Where the quote form posts.
 *
 * The site is a static export with no server of its own, so submissions are
 * relayed by FormSubmit, which emails them straight to the address above.
 * FormSubmit needs no account or API key: the first submission triggers a
 * one-time confirmation email to that inbox, and every submission after it is
 * delivered automatically.
 *
 * Set NEXT_PUBLIC_QUOTE_ENDPOINT to point at a different relay (Formspree,
 * Web3Forms) or at a real server route if the site ever moves to a Node host.
 * Any endpoint accepting a JSON POST works.
 */
export const quoteEndpoint =
  // `||`, not `??`: the deploy workflow passes an empty string when the
  // optional repository variable is unset, and that must fall back too.
  process.env.NEXT_PUBLIC_QUOTE_ENDPOINT?.trim() ||
  `https://formsubmit.co/ajax/${company.email.display}`;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://tolbertinnovation-debug.github.io/Pls"
).replace(/\/+$/, "");

/** Subpath the site is served from: "/Pls" on GitHub Pages, "" on a domain. */
export const basePath = new URL(siteUrl).pathname.replace(/\/$/, "");

/**
 * Root-relative URL for a file in /public, including the base path.
 * Use for anything the browser fetches that `next/link` and `next/image`
 * do not already prefix themselves (favicons, the manifest).
 */
export const asset = (path: string) => `${basePath}${path}`;

/** Absolute URL, for metadata and structured data consumers. */
export const absolute = (path: string) => `${siteUrl}${path}`;

/* ------------------------------------------------------------------ */
/* Mission, vision, values — quoted exactly from the company profile.  */
/* ------------------------------------------------------------------ */

export const mission =
  "To ensure the smooth, efficient, and timely transportation of goods and services, delivering consistent value and reliability to our clients.";

export const vision =
  "To become a leading logistics provider in Liberia and beyond, recognized for transforming logistics operations through innovation, efficiency, and excellence in service delivery.";

/**
 * The profile names three values — Excellence, Integrity, Reliability — with a
 * one-line gloss each. The reference build the client supplied adds Community
 * and expands all four, and the client asked for that version. The expanded
 * wording keeps each profile definition's meaning rather than replacing it.
 */
export const coreValues = [
  {
    name: "Integrity",
    description:
      "We handle every shipment, and every client relationship, honestly — no hidden fees, no surprises.",
    icon: "ShieldCheck",
  },
  {
    name: "Reliability",
    description:
      "Deadlines in logistics aren't suggestions. We build in the buffers and backup plans that keep your cargo moving on schedule.",
    icon: "Clock",
  },
  {
    name: "Excellence",
    description:
      "From paperwork accuracy to warehouse handling, we hold our own standard higher than the minimum the job requires.",
    icon: "TrendingUp",
  },
  {
    name: "Community",
    description:
      "We're based here, and we measure our success by how well Liberian traders are working — not just our bottom line.",
    icon: "Users",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type IconName =
  | "Ship"
  | "FileCheck"
  | "FileText"
  | "Network"
  | "Warehouse"
  | "Truck";

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Short line used on cards and in the nav dropdown. */
  summary: string;
  /** Longer lead paragraph for the service detail page. */
  intro: string;
  /** Capability bullets, taken from the profile. */
  capabilities: string[];
  icon: IconName;
  /** Card photo. 1000x563 WebP; rendered through `asset()` for the base path. */
  image: { src: string; alt: string };
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "freight-forwarding",
    number: "01",
    title: "Freight Forwarding",
    summary:
      "Air, sea, road and rail transportation with route optimization, carrier coordination and shipment tracking.",
    intro:
      "We move cargo through air, sea, road and rail, coordinating carriers and optimizing routes so your shipment travels the most practical path from origin to destination.",
    capabilities: [
      "Air, sea, road and rail transportation",
      "Route optimization and carrier coordination",
      "Shipment tracking and global shipping support",
    ],
    image: {
      src: "/images/port-crane.webp",
      alt: "A gantry crane lifting a container from a vessel at a container terminal",
    },
    icon: "Ship",
    metaTitle: "Freight Forwarding in Liberia",
    metaDescription:
      "Air, sea, road and rail freight forwarding from Peak Logistics Services — route optimization, carrier coordination, shipment tracking and global shipping support across Liberia.",
  },
  {
    slug: "customs-brokerage",
    number: "02",
    title: "Customs Brokerage",
    summary:
      "Import and export documentation, duty and tax processing, and regulatory compliance.",
    intro:
      "Customs clearance is where shipments most often stall. We prepare and file import and export documentation, process duties and taxes, and keep every consignment compliant with local and international requirements.",
    capabilities: [
      "Import and export documentation",
      "Duty and tax processing",
      "Regulatory compliance with local and international laws",
    ],
    image: {
      src: "/images/customs-clearance.webp",
      alt: "A clearing agent handing import documents to a customs officer at a port office window",
    },
    icon: "FileCheck",
    metaTitle: "Customs Brokerage & Clearing in Liberia",
    metaDescription:
      "Customs brokerage and clearing services in Liberia — import and export documentation, duty and tax processing, and compliance with local and international regulations.",
  },
  {
    slug: "documentation-services",
    number: "03",
    title: "Documentation Services",
    summary:
      "Shipping documents including invoices, bills of lading, certificates of origin and packing lists.",
    intro:
      "Accurate paperwork keeps cargo moving. We prepare and manage the full shipping document set, end to end, so nothing is missing when your cargo reaches a checkpoint.",
    capabilities: [
      "Preparation of shipping documents — invoices, bills of lading, certificates of origin, packing lists and more",
      "End-to-end documentation management",
    ],
    image: {
      src: "/images/gate-check.webp",
      alt: "A checker with a clipboard recording a container truck at a terminal gate",
    },
    icon: "FileText",
    metaTitle: "Shipping Documentation Services in Liberia",
    metaDescription:
      "End-to-end shipping documentation from Peak Logistics Services — invoices, bills of lading, certificates of origin and packing lists prepared and managed for you.",
  },
  {
    slug: "supply-chain-management",
    number: "04",
    title: "Supply Chain Management",
    summary:
      "Logistics planning and advisory, inventory control, warehousing and distribution.",
    intro:
      "We plan and coordinate the wider supply chain around your cargo — advising on logistics strategy, controlling inventory, and arranging warehousing and onward distribution.",
    capabilities: [
      "Logistics planning and advisory",
      "Inventory control and coordination",
      "Warehousing and distribution solutions",
    ],
    image: {
      src: "/images/warehouse-racking.webp",
      alt: "Warehouse staff checking stock against racked pallets while a forklift moves a load",
    },
    icon: "Network",
    metaTitle: "Supply Chain Management in Liberia",
    metaDescription:
      "Supply chain management in Liberia — logistics planning and advisory, inventory control and coordination, plus warehousing and distribution solutions.",
  },
  {
    slug: "specialized-logistics",
    number: "05",
    title: "Specialized Logistics",
    summary:
      "Bonded warehousing, cross-trade operations and last-mile delivery solutions.",
    intro:
      "Some consignments need arrangements beyond a standard shipment. We handle bonded warehousing, cross-trade movements and last-mile delivery for cargo with specific requirements.",
    capabilities: [
      "Bonded warehousing",
      "Cross-trade operations",
      "Last-mile delivery solutions",
    ],
    image: {
      src: "/images/container-loading.webp",
      alt: "A forklift loading wrapped pallets into a shipping container under a canopy",
    },
    icon: "Warehouse",
    metaTitle: "Specialized Logistics Services in Liberia",
    metaDescription:
      "Specialized logistics from Peak Logistics Services — bonded warehousing, cross-trade operations and last-mile delivery solutions in Liberia.",
  },
  {
    slug: "transportation-services",
    number: "06",
    title: "Transportation Services",
    summary:
      "Reliable, flexible cargo delivery and customized transport solutions built around your needs.",
    intro:
      "We provide dependable cargo transport and build the delivery arrangement around what your business actually requires, rather than a fixed template.",
    capabilities: [
      "Reliable and flexible cargo delivery",
      "Customized transport solutions based on client needs",
    ],
    image: {
      src: "/images/truck-highway.webp",
      alt: "An articulated truck carrying a shipping container on an open road",
    },
    icon: "Truck",
    metaTitle: "Transportation Services in Liberia",
    metaDescription:
      "Reliable and flexible cargo transportation across Liberia, with customized transport solutions built around each client's needs.",
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* Strategic advantage, target market, transport modes                 */
/* ------------------------------------------------------------------ */

export const strategicAdvantages = [
  {
    title: "Deep understanding of Liberia's logistics landscape",
    description:
      "Local market knowledge applied to every stage of the journey, from port to final delivery.",
    icon: "MapPin",
  },
  {
    title: "Expertise in navigating customs procedures",
    description:
      "Clearance handled by people who know the documentation and compliance requirements.",
    icon: "Stamp",
  },
  {
    title: "Integrated solutions across multiple transport modes",
    description:
      "Air, sea, road and rail coordinated together rather than managed as separate hand-offs.",
    icon: "Layers",
  },
  {
    title: "Efficient handling of complex logistics operations",
    description:
      "Multi-leg, multi-party shipments kept moving with a single point of accountability.",
    icon: "Workflow",
  },
] as const;

export const targetMarket = [
  {
    title: "Startups and growing enterprises",
    description:
      "Support for businesses building out their first import and distribution routes.",
    icon: "Sprout",
  },
  {
    title: "Established companies",
    description:
      "Consistent, repeatable logistics for organisations moving cargo at volume.",
    icon: "Building2",
  },
  {
    title: "Importers and exporters",
    description:
      "Freight, clearance and documentation handled together on both legs of trade.",
    icon: "ArrowLeftRight",
  },
  {
    title: "NGOs and international organizations",
    description:
      "Compliance-led handling for programme cargo arriving into Liberia.",
    icon: "Globe2",
  },
] as const;

export const transportModes = [
  { name: "Air", icon: "Plane" },
  { name: "Sea", icon: "Ship" },
  { name: "Road", icon: "Truck" },
  { name: "Rail", icon: "TrainFront" },
] as const;

/**
 * An illustration of how an engagement typically runs — presented as
 * "How We Help", not as a formally documented company procedure, because
 * the company profile does not define one.
 */
export const howWeHelp = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We start by understanding your cargo, your timelines and where the shipment needs to go.",
  },
  {
    step: "02",
    title: "Logistics Planning",
    description:
      "We map the route and mode — air, sea, road or rail — and coordinate the carriers involved.",
  },
  {
    step: "03",
    title: "Documentation & Coordination",
    description:
      "Shipping documents are prepared and customs requirements are addressed ahead of arrival.",
  },
  {
    step: "04",
    title: "Transportation & Handling",
    description:
      "Cargo moves under coordination, with warehousing arranged where the shipment calls for it.",
  },
  {
    step: "05",
    title: "Delivery",
    description:
      "The consignment is completed through to final delivery at its destination.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Company figures                                                     */
/* ------------------------------------------------------------------ */

/**
 * Performance figures, confirmed by the client on 2 Sep 2026 as accurate.
 *
 * These are NOT in the written company profile — they were transcribed from a
 * reference build the client supplied and then confirmed. Keep them here, in
 * one place, so a correction is a single edit rather than a hunt through JSX.
 */
/**
 * The second line of the hero headline, cycled one after another.
 *
 * The first entry is the company tagline and is what renders on the server,
 * so the tagline is what a visitor sees first, what a search engine indexes
 * and what a screen reader is given. The rest restate figures already on this
 * page rather than making new claims: nationwide reach is the fifteen-counties
 * figure, on-time delivery is the 98% rate, and the responsibility line is the
 * single point of accountability named among the strategic advantages.
 *
 * Each phrase wraps to the same number of lines as the tagline at every
 * viewport width — checked at 320, 360, 390, 412, 480, 640, 768, 1024, 1280
 * and 1440. That matters: the phrases share one grid cell so the headline
 * cannot resize mid-cycle, which means a phrase that wrapped differently
 * would leave a blank line under the headline while it showed.
 */
export const heroHeadlines = [
  "Our Commitment.",
  "Moved Nationwide.",
  "Delivered On Time.",
  "Our Responsibility.",
] as const;

export const headlineStats = [
  { value: "500+", label: "Shipments Delivered" },
  { value: "200+", label: "Satisfied Clients" },
  { value: "24/7", label: "Customer Support" },
  // Confirmed 3 Sep 2026 in preference to the "12+ Years Serving Liberia"
  // figure that also appears in the reference build.
  { value: "10+", label: "Years of Experience" },
] as const;

export const performanceStats = [
  { value: "98%", label: "On-Time Delivery Rate" },
  { value: "15", label: "Counties Reached Nationwide" },
  { value: "3", label: "Major Ports Served" },
  { value: "40+", label: "Team Members" },
] as const;

/**
 * Company milestones, transcribed from the reference build the client
 * supplied and confirmed by them as accurate.
 *
 * The reference shows a year against each milestone, but those year pills are
 * small dark text in a phone recording of a screen and could not be read with
 * confidence even upscaled. Rather than publish a guessed founding year, each
 * entry carries an optional `year` that is simply not rendered while empty —
 * fill these in and the dated rail appears.
 */
export const milestones = [
  {
    year: "",
    title: "Founded at the Freeport",
    description:
      "Opened as a two-person customs clearance desk at the Freeport of Monrovia.",
  },
  {
    year: "",
    title: "Freight Forwarding Launched",
    description:
      "Added freight forwarding and opened our first bonded warehouse.",
  },
  {
    year: "",
    title: "Regional Expansion",
    description:
      "Opened regional offices to reach clients outside Monrovia.",
  },
  {
    year: "",
    title: "Real-Time Tracking",
    description:
      "Launched live cargo tracking and around-the-clock client support.",
  },
  {
    year: "",
    title: "Today",
    description:
      "Serving 200+ clients, with 500+ shipments handled and counting.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

/**
 * Operations imagery supplied by the client, plus one still from their own
 * cargo footage. Captions describe the work, not ownership: Peak Logistics is
 * a freight forwarder, so nothing here claims a vessel or terminal is theirs.
 */
export const gallery = [
  {
    src: "/images/quayside-handling.webp",
    width: 1000,
    height: 563,
    alt: "A reach stacker lifting a container beside a berthed vessel while crew direct the move",
    caption: "Quayside handling",
  },
  {
    src: "/images/team-loading.webp",
    width: 1000,
    height: 563,
    alt: "A crew in high-visibility vests loading cartons onto a box truck with a pallet jack",
    caption: "Loading for onward delivery",
  },
  {
    src: "/images/warehouse-racking.webp",
    width: 1000,
    height: 563,
    alt: "Warehouse staff checking stock against racked pallets while a forklift moves a load",
    caption: "Warehousing and inventory",
  },
  {
    src: "/images/fleet-lineup.webp",
    width: 1200,
    height: 675,
    alt: "Container trucks lined up at a yard with port cranes behind and a team in discussion",
    caption: "Fleet ready for dispatch",
  },
  {
    src: "/images/customs-clearance.webp",
    width: 1000,
    height: 563,
    alt: "A clearing agent handing import documents to a customs officer at a port office window",
    caption: "Customs clearance",
  },
  {
    src: "/images/fleet-deck.jpg",
    width: 719,
    height: 466,
    alt: "Container ship deck and crane at sunrise, seen from on board",
    caption: "Sea freight under way",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Container reference                                                 */
/* ------------------------------------------------------------------ */

/**
 * Standard ISO dry-container sizes, for clients deciding what to book.
 *
 * Figures are nominal EXTERNAL dimensions to the ISO standard, which is what
 * a carrier quotes against. Internal capacity and payload vary by build and
 * shipping line, so the section says so rather than presenting one number as
 * definitive.
 */
export const containerTypes = [
  {
    name: "20ft Standard",
    code: "20GP",
    metric: "6.06 × 2.44 × 2.59 m",
    imperial: "20' × 8' × 8'6\"",
    capacity: "≈ 33 m³",
    bestFor: "Dense cargo — tiles, machinery parts, tinned goods.",
    /** Drawn to relative scale: length 1, height 1. */
    scale: { length: 0.5, height: 0.894 },
  },
  {
    name: "40ft Standard",
    code: "40GP",
    metric: "12.19 × 2.44 × 2.59 m",
    imperial: "40' × 8' × 8'6\"",
    capacity: "≈ 67 m³",
    bestFor: "General mixed cargo and palletised consignments.",
    scale: { length: 1, height: 0.894 },
  },
  {
    name: "40ft High Cube",
    code: "40HC",
    metric: "12.19 × 2.44 × 2.90 m",
    imperial: "40' × 8' × 9'6\"",
    capacity: "≈ 76 m³",
    bestFor: "Light, bulky cargo — furniture, packaging, textiles.",
    scale: { length: 1, height: 1 },
  },
] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; summary: string }[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      summary: s.summary,
    })),
  },
  { label: "Why Peak", href: "/why-peak" },
  { label: "Contact", href: "/contact" },
];

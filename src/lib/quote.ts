import { services } from "@/lib/site";

export const QUOTE_FIELDS = [
  "fullName",
  "companyName",
  "email",
  "phone",
  "service",
  "cargoType",
  "origin",
  "destination",
  "shipmentDate",
  "message",
] as const;

export type QuoteField = (typeof QUOTE_FIELDS)[number];
export type QuoteRequest = Record<QuoteField, string>;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const emptyQuote: QuoteRequest = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  service: "",
  cargoType: "",
  origin: "",
  destination: "",
  shipmentDate: "",
  message: "",
};

export const serviceOptions = services.map((s) => s.title);

/** Deliberately permissive: catches typos without rejecting valid addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates a quote request in the browser before it is sent anywhere.
 * Kept separate from the form so the same rules can be reused if the site
 * ever gains a server-side endpoint of its own.
 */
export function validateQuote(values: Partial<QuoteRequest>): QuoteErrors {
  const errors: QuoteErrors = {};
  const get = (k: QuoteField) => (values[k] ?? "").trim();

  if (get("fullName").length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  const email = get("email");
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";

  const digits = get("phone").replace(/\D/g, "");
  if (!digits) errors.phone = "Please enter a phone number.";
  else if (digits.length < 7) errors.phone = "Please enter a complete phone number.";

  const service = get("service");
  if (!service) errors.service = "Please choose the service you need.";
  else if (!serviceOptions.includes(service)) {
    errors.service = "Please choose one of the listed services.";
  }

  if (!get("origin")) errors.origin = "Please enter the origin.";
  if (!get("destination")) errors.destination = "Please enter the destination.";

  const date = get("shipmentDate");
  if (date) {
    const parsed = Date.parse(date);
    if (Number.isNaN(parsed)) {
      errors.shipmentDate = "Please enter a valid date.";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (parsed < today.getTime()) {
        errors.shipmentDate = "Please choose today or a future date.";
      }
    }
  }

  if (get("message").length > 4000) {
    errors.message = "Please keep your message under 4000 characters.";
  }

  return errors;
}

/** Plain-text rendering used for the prefilled email. */
export function formatQuoteText(v: QuoteRequest): string {
  const rows: [string, string][] = [
    ["Name", v.fullName],
    ["Company", v.companyName],
    ["Email", v.email],
    ["Phone", v.phone],
    ["Service needed", v.service],
    ["Cargo type", v.cargoType],
    ["Origin", v.origin],
    ["Destination", v.destination],
    ["Estimated shipment date", v.shipmentDate],
  ];

  const lines = rows
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`);

  if (v.message.trim()) {
    lines.push("", "Message:", v.message.trim());
  }

  return lines.join("\n");
}

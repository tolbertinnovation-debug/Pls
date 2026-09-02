import { NextResponse } from "next/server";

import { company } from "@/lib/site";
import {
  emptyQuote,
  formatQuoteText,
  validateQuote,
  type QuoteRequest,
} from "@/lib/quote";

/**
 * Quote request endpoint.
 *
 * No email provider is wired up in this repository, so by default this route
 * validates the submission and reports `not_configured` — it does NOT silently
 * pretend the message was delivered. The browser form then offers the visitor
 * a prefilled email and the office phone number instead.
 *
 * To turn on delivery, set RESEND_API_KEY (and optionally QUOTE_FROM_EMAIL /
 * QUOTE_TO_EMAIL) in the environment. Swap `sendEmail` for any other provider
 * — the rest of the route does not change.
 */

const FROM = process.env.QUOTE_FROM_EMAIL ?? "quotes@peaklogisticsservices.com";
const TO = process.env.QUOTE_TO_EMAIL ?? company.email.display;

async function sendEmail(values: QuoteRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: values.email,
      subject: `Quote request — ${values.service} — ${values.fullName}`,
      text: formatQuoteText(values),
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider responded ${response.status}`);
  }
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Malformed request." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { status: "error", message: "Malformed request." },
      { status: 400 },
    );
  }

  // Normalise to the known field set; ignore anything else that was posted.
  const raw = body as Record<string, unknown>;
  const values = { ...emptyQuote };
  for (const key of Object.keys(emptyQuote) as (keyof QuoteRequest)[]) {
    values[key] = typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
  }

  const errors = validateQuote(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "invalid", errors }, { status: 422 });
  }

  try {
    const sent = await sendEmail(values);
    if (!sent) {
      return NextResponse.json(
        {
          status: "not_configured",
          message:
            "Online delivery is not connected yet. Please send your request by email or phone.",
        },
        { status: 501 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message:
          "We could not send your request just now. Please email or call us instead.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ status: "sent" });
}

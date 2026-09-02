# Peak Logistics Services — Website

Marketing site for **Peak Logistics Services**, a full-service logistics company
operating across Liberia.

> Your Cargo, Our Commitment. Reaching New Heights in Liberia.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (design tokens declared in `src/app/globals.css`)
- **lucide-react** for iconography
- `next/font` (Manrope for display, Inter for body text)

No other runtime dependencies.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Project structure

```
src/
  app/
    layout.tsx              root layout, fonts, global SEO metadata
    page.tsx                home
    about/                  about us
    services/               services overview
    services/[slug]/        one page per service (statically generated)
    why-peak/               strategic advantage
    contact/                contact details
    quote/                  request a quote
    api/quote/route.ts      quote submission endpoint
    sitemap.ts robots.ts manifest.ts
  components/
    Header, Footer, PageHero, CTABand, QuoteForm, ServiceCard, …
    sections/               composable homepage sections
  lib/
    site.ts                 all company content (single source of truth)
    quote.ts                quote validation, shared by client and server
```

## Content

**`src/lib/site.ts` is the single source of truth** for company information —
services, mission, vision, core values, target market, strategic advantages,
contact details and navigation. Editing it updates every page, the footer, the
navigation dropdown, the sitemap and the structured data together.

Everything in that file comes from the supplied company profile. The site
deliberately makes **no claims that the profile does not support** — there are no
invented founding dates, staff or fleet counts, client names, certifications,
awards, testimonials or GPS coordinates.

Two related notes:

- The logistics workflow on the site is presented as **"How We Help"**, an
  illustration of a typical engagement — not as a formally defined company
  procedure, because the profile does not define one.
- Only the social **handle** (`@peaklogisticsservices`) is published, since no
  social media URLs were supplied. Add real links in `site.ts` when available.

## The quote form

`/quote` validates on the client and again on the server using the same rules in
`src/lib/quote.ts`, so the API can never accept a submission the form would have
rejected.

**Email delivery is not configured by default, and the form does not pretend
otherwise.** With no provider set, `POST /api/quote` returns `not_configured` and
the form shows the visitor a clear notice plus two working alternatives: a
prefilled email containing everything they typed, and the office phone number.

To turn on delivery, set `RESEND_API_KEY` (see `.env.example`). To use a
different provider, replace the `sendEmail` function in
`src/app/api/quote/route.ts` — nothing else needs to change.

## Brand assets

`public/brand/` and `public/images/` are derived from the supplied logo, banner
and flyer:

| File | Notes |
| --- | --- |
| `logo-horizontal.png` | Mark + wordmark lockup, used in the header |
| `logo-full.png` | Stacked lockup |
| `logo-mark.png` | Illustration only |
| `logo-*-light.png` | Knockout colorway for dark green backgrounds — the illustration is untouched, the wordmark is reversed out in white |
| `og-image.jpg` | Social card, from the supplied brand banner |
| `icon-192/512.png`, `favicon-32.png` | App icons |
| `images/port-monrovia.jpg`, `images/containers.jpg` | Photography from the supplied marketing material |

The logo itself has not been redesigned.

## Before going live

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain — it drives canonical URLs,
   Open Graph tags, `sitemap.xml` and `robots.txt`.
2. Configure quote-form email delivery, or leave the honest fallback in place.
3. Add social media URLs to `site.ts` if the accounts are public.

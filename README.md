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
npm run dev     # http://localhost:3000/Pls/
npm run build   # static export into ./out
npm run lint
```

The site is built as a **static export** (`output: "export"`), because it is
hosted on GitHub Pages, which serves files and cannot run a Node server. The
build writes plain HTML into `out/`.

`NEXT_PUBLIC_SITE_URL` carries the deployment subpath (`/Pls`), so the dev
server serves from `/Pls/` too. To drop the prefix locally, put
`NEXT_PUBLIC_SITE_URL=http://localhost:3000` in a `.env.local` file.

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

`/quote` validates every important field in the browser (`src/lib/quote.ts`)
before anything is sent.

A static site has no server of its own, so there is nothing here to receive a
form post — **and the form does not pretend otherwise.** With no endpoint
configured it tells the visitor plainly that nothing was transmitted, then
offers two working alternatives: a prefilled email containing everything they
typed, and the office phone number.

To accept submissions online, set `NEXT_PUBLIC_QUOTE_ENDPOINT` to any URL that
accepts a JSON POST — Formspree, Web3Forms, a Google Apps Script — as a
repository variable of that name. The browser then posts straight to it. If the
site later moves to a Node host (Vercel, a VPS), a server route can be added
back and pointed at the same shared validation.

## Brand assets

`public/brand/` and `public/images/` are derived from the supplied logo, banner
and flyer:

| File | Notes |
| --- | --- |
| `logo-horizontal.webp` | Mark + wordmark lockup, used in the header |
| `logo-mark.webp` | Illustration only |
| `logo-*-light.webp` | Knockout colorway for dark green backgrounds — the illustration is untouched, the wordmark is reversed out in white |
| `og-image.jpg` | Social card, from the supplied brand banner |
| `icon-192/512.png`, `favicon-32.png` | App icons |
| `images/port-monrovia.jpg`, `images/containers.jpg` | Photography from the supplied marketing material |

The logo itself has not been redesigned.

Because a static export has no image optimizer, these files are stored at
roughly twice the size they are actually rendered at, rather than at full
resolution. `next/image` only applies the base path through that optimizer, so
every image `src` goes through the `asset()` helper in `src/lib/site.ts`.

## Deployment

`.github/workflows/deploy.yml` builds the export and publishes it to GitHub
Pages on every push to `main`.

**One-time setup:** in the repository, go to **Settings → Pages** and set
**Source** to **GitHub Actions**. Until that is changed, Pages runs its default
branch-based Jekyll build, which publishes the README instead of the site.

The deployed URL is `https://tolbertinnovation-debug.github.io/Pls/`.

### Moving to a custom domain

1. Add the domain under **Settings → Pages**.
2. Change `NEXT_PUBLIC_SITE_URL` in `.github/workflows/deploy.yml` to
   `https://peaklogisticsservices.com` — the base path becomes empty
   automatically, and canonical URLs, Open Graph tags, the sitemap and
   `robots.txt` all follow.

## Also worth doing

- Set `NEXT_PUBLIC_QUOTE_ENDPOINT` as a repository variable to accept quote
  requests online, or leave the honest email fallback in place.
- Add social media URLs to `site.ts` if the accounts are public.

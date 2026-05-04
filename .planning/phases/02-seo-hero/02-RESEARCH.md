# Phase 2: SEO + Hero - Research

**Researched:** 2026-05-04
**Domain:** Next.js 16 App Router metadata API, LocalBusiness JSON-LD, Open Graph image generation, static export constraints, Tailwind v4 hero layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Background**
- D-01: Use brand-green solid background (`primary` token: `#2E7D32`). No hero image, no gradient.
- D-02: White logo on green is the primary above-the-fold brand mark. SVG logo (`/public/Sask Garage Glow-up logo.svg`) renders inverted/white on green background.

**Hero Copy**
- D-03: Claude drafts the headline. Punchy, local-search-aware copy. Legible at 32–40px on 375px screen.
- D-04: Claude drafts the tagline (1–2 sentences max). Focus: local (Regina SK), fast (same day), satisfaction guarantee. Benefit-focused.
- D-05: Headline and tagline feel like the owner wrote them — conversational, direct, no corporate jargon.

**OG Image**
- D-06: Branded 1200×630 PNG generated at build time — brand-green background, white logo, business name, short tagline. Approach: Node canvas script or Next.js route that renders to PNG at build time.
- D-07: OG image MUST use absolute URL in `<meta og:image>` via `metadataBase` in `app/layout.tsx`. Placeholder domain `https://saskgarageglow.ca` until real domain confirmed.
- D-08: Do NOT use `FB cover.jpg` as OG image — wrong dimensions (820×312).

**Trust Badges**
- D-09: Three badges: "Same Day Clean-Up", "100% Local Regina", "Satisfaction Guarantee".
- D-10: Icon + label stacked card style — clock / map pin / shield SVG icons above text label.
- D-11: Compact badge cards — no full border boxes. Icon centered above label, gold accent (`accent` token) for icon, white label text on green background.

**SEO Infrastructure**
- D-12: LocalBusiness JSON-LD in `app/layout.tsx` as `<script type="application/ld+json">`. Schema type: `HomeAndConstructionBusiness`. Include: name, address (placeholder Regina SK street), telephone E.164 (`+13069421617`), url, `areaServed`.
- D-13: `sitemap.ts` and `robots.ts` using Next.js App Router conventions (`MetadataRoute.Sitemap` / `MetadataRoute.Robots`).
- D-14: Canonical URL via Next.js `alternates.canonical` in page metadata.

**Typography**
- Keep system font stack from Phase 1. For headline punch: `font-weight: 800` or `900` and `letter-spacing: -0.02em`. NO Google Fonts or external font requests.

### Claude's Discretion

- Hero layout ordering (mobile): Logo → Headline → Tagline → CTA buttons (primary then secondary) → Trust badges. Stack vertically, full-width, center-aligned on mobile.
- CTA button styling: Primary "Call Now" uses `bg-accent text-white` (gold), secondary "Message on Facebook" uses outlined white border with white text.
- Section padding: Adequate vertical padding so full hero (including badges) is visible above fold on 375px screen — test at 667px viewport height (iPhone SE).

### Deferred Ideas (OUT OF SCOPE)

- Truck photo as hero background (deferred to Phase 5)
- Typography webfont (Google Fonts) — still deferred
- Visible site header/nav with logo — not in Phase 2 scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-01 | Page title and meta description optimized for Regina local search | Next.js `metadata` object in `app/page.tsx`; title already set in layout, can be confirmed/extended |
| SEO-02 | LocalBusiness JSON-LD structured data in `app/layout.tsx` (HomeAndConstructionBusiness, Regina SK, E.164 phone) | JSON-LD `<script>` tag pattern verified in generate-metadata docs |
| SEO-03 | `sitemap.ts` and `robots.ts` generated at build time | Both file conventions verified in bundled Next.js 16 docs |
| SEO-04 | Open Graph tags — title, description, absolute URL OG image (1200×630 branded graphic) | `openGraph` metadata field + `opengraph-image.tsx` pattern verified; static export compatible |
| SEO-05 | Canonical URL set correctly for the domain | `alternates.canonical` metadata field verified in docs |
| HERO-01 | Bold headline visible above fold on 375px mobile without scrolling | Tailwind v4 token-based sizing; system font weight 800/900 |
| HERO-02 | Short supporting tagline (1–2 sentences max) | Copy decision — Claude discretion |
| HERO-03 | Primary CTA "Call Now" → `tel:306-942-1617` prominently placed | `lib/contact.ts` PHONE_HREF already exports correct `tel:` href |
| HERO-04 | Secondary CTA "Message on Facebook" → Facebook profile URL | `lib/contact.ts` FACEBOOK_URL already exports correct URL |
| HERO-05 | Hero background/image WebP <100KB with `fetchpriority="high"` — LCP <2.5s | Background is solid CSS color (no image) — LCP risk eliminated by D-01 |
| HERO-06 | Trust badges: "100% Satisfaction Guarantee", "Same Day Clean-Up", "100% Local Regina" | Three inline SVG icon + label cards per D-09/D-10/D-11 |
</phase_requirements>

---

## Summary

Phase 2 adds SEO instrumentation and the hero section to the working Phase 1 scaffold. The project runs **Next.js 16.2.4** with React 19.2.4 and Tailwind CSS v4, configured with `output: 'export'` for fully static output. This version is newer than training data covers — the bundled docs were read directly and are authoritative for this research.

The SEO work is entirely additive to `app/layout.tsx` (JSON-LD script tag, openGraph metadata extension, alternates canonical) plus two new App Router file conventions: `app/sitemap.ts` and `app/robots.ts`. Both are supported in static export and generate their output files at build time. The OG image can be generated via `app/opengraph-image.tsx` using `ImageResponse` from `next/og` — this IS statically optimized at build time and IS compatible with `output: 'export'`.

The hero section replaces the boilerplate `app/page.tsx` with a purpose-built component tree: green background, logo, headline, tagline, two CTA buttons (gold "Call Now", outlined "Message on Facebook"), and three trust badge cards. No animation libraries (per CLAUDE.md). All contact references import from `lib/contact.ts`. The entire above-the-fold experience uses zero external requests — solid color background, inline SVG icons, system font, and local logo PNG.

**Primary recommendation:** Use `app/opengraph-image.tsx` with `ImageResponse` for the OG image (generates a static PNG at build time, auto-injects correct `<meta og:image>` tags). For the logo in the OG image, read the PNG from `public/` via `readFile` + base64 since the SVG is a raster embed. Keep all metadata additions in `app/layout.tsx` and `app/page.tsx` — do not reach for third-party SEO libraries.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| SEO metadata (title, description, OG, canonical) | Frontend Server (SSR/Build) | — | `metadata` exports run at build time; baked into static HTML |
| LocalBusiness JSON-LD | Frontend Server (Build) | — | `<script>` tag in layout renders at build time into static HTML |
| sitemap.xml, robots.txt | Frontend Server (Build) | — | App Router file conventions, rendered at `next build` |
| OG image generation | Frontend Server (Build) | — | `opengraph-image.tsx` with `ImageResponse` — statically optimized |
| Hero UI component | Browser / Client | — | Pure presentational React component, no server state |
| CTA `tel:` / Facebook links | Browser / Client | — | Standard anchor tags, no JS needed |
| Brand tokens (CSS) | CDN / Static | Browser | Tailwind v4 `@theme` compiled into static CSS at build |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.4 | Framework — App Router, metadata API, static export, ImageResponse | Already installed; all APIs verified in bundled docs |
| react | 19.2.4 | UI rendering | Already installed |
| tailwindcss | v4 (^4) | Utility-first CSS with `@theme` token system | Already installed and wired |

[VERIFIED: package.json in project root]

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/og (`ImageResponse`) | built into next@16 | Build-time OG PNG generation via JSX | Use in `app/opengraph-image.tsx` to generate the 1200×630 branded graphic |
| node:fs/promises + node:path | built into Node.js 24 | Read local logo PNG for embedding in OG image | Use inside `opengraph-image.tsx` async function at build time |

[VERIFIED: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/image-response.md`]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `app/opengraph-image.tsx` (ImageResponse) | Static `public/og-image.png` created by a separate script | Manual script is simpler but requires running it separately before build; `opengraph-image.tsx` is self-contained and auto-refreshes on brand changes |
| `app/opengraph-image.tsx` (ImageResponse) | `@vercel/og` standalone | Redundant — `next/og` IS `@vercel/og` bundled |
| Next.js `metadata.openGraph` object | Manual `<Head>` tags | `metadata` API is the App Router convention; manual `<Head>` is Pages Router / legacy |

**Installation:** No new packages required — everything needed is bundled with Next.js 16.

---

## Architecture Patterns

### System Architecture Diagram

```
next build
    │
    ├── app/layout.tsx          ──► baked into every page's <head>
    │   ├── metadata.openGraph       og:title, og:description, og:image (absolute URL)
    │   ├── metadata.alternates      <link rel="canonical" href="...">
    │   └── JSON-LD <script>         LocalBusiness structured data
    │
    ├── app/page.tsx            ──► out/index.html
    │   ├── metadata (page-level)    SEO-01: page title + description
    │   └── <HeroSection>            renders to static HTML
    │         ├── logo img
    │         ├── h1 headline
    │         ├── p tagline
    │         ├── <CallNowButton>     href={PHONE_HREF}
    │         ├── <FacebookButton>    href={FACEBOOK_URL}
    │         └── <TrustBadges>       3× icon + label
    │
    ├── app/opengraph-image.tsx ──► out/opengraph-image.png (+ auto <meta og:image>)
    │   └── ImageResponse(JSX)       1200×630 green + logo PNG + text
    │         └── readFile(public/Sask Garage Glow-up logo.png) as base64
    │
    ├── app/sitemap.ts          ──► out/sitemap.xml
    │   └── MetadataRoute.Sitemap    single URL entry for homepage
    │
    └── app/robots.ts           ──► out/robots.txt
        └── MetadataRoute.Robots     allow all + sitemap reference
```

### Recommended Project Structure

```
app/
├── layout.tsx          # Extend with openGraph, alternates, JSON-LD script
├── page.tsx            # Replace boilerplate with Hero section + page metadata
├── sitemap.ts          # New: MetadataRoute.Sitemap
├── robots.ts           # New: MetadataRoute.Robots
├── opengraph-image.tsx # New: ImageResponse OG PNG generator
└── globals.css         # Unchanged — brand tokens already in place

lib/
└── contact.ts          # Unchanged — PHONE_HREF and FACEBOOK_URL already exported

components/             # New directory
└── hero/
    ├── HeroSection.tsx
    ├── CallNowButton.tsx     (or inline in HeroSection)
    ├── FacebookButton.tsx    (or inline in HeroSection)
    └── TrustBadges.tsx

public/
└── Sask Garage Glow-up logo.png   # Must be copied from root to public/
```

**Critical note:** The brand assets (`Sask Garage Glow-up logo.svg`, `Sask Garage Glow-up logo.png`, `FB cover.jpg`, `truck.png`) currently live in the project root, NOT in `public/`. Phase 2 must copy the logo PNG to `public/` so it is (a) served to browsers and (b) readable by `opengraph-image.tsx` via `readFile(join(process.cwd(), 'public/Sask Garage Glow-up logo.png'))`.

[VERIFIED: `ls` of project root and `public/` directory]

---

### Pattern 1: Extending layout.tsx with openGraph + alternates + JSON-LD

**What:** Add OG metadata and canonical link to the existing `metadata` export in `app/layout.tsx`. Add a JSON-LD script tag to the layout JSX.

**When to use:** Once, in `app/layout.tsx` — applies to all routes.

**Example:**
```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md
import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://saskgarageglow.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sask Garage Glow-Up | Garage Cleanout Regina SK",
    template: "%s | Sask Garage Glow-Up",
  },
  description:
    "Professional garage cleanout, deep clean, and junk hauling in Regina, SK. Same-day service. 100% local. Call 306-942-1617.",
  openGraph: {
    title: "Sask Garage Glow-Up | Garage Cleanout Regina SK",
    description:
      "Professional garage cleanout, deep clean, and junk hauling in Regina, SK. Same-day service. 100% local.",
    url: SITE_URL,
    siteName: "Sask Garage Glow-Up",
    images: [
      {
        url: "/opengraph-image.png", // relative — metadataBase makes it absolute
        width: 1200,
        height: 630,
        alt: "Sask Garage Glow-Up — Regina SK garage cleanout service",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Sask Garage Glow-Up",
  url: SITE_URL,
  telephone: "+13069421617",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Regina",
    addressRegion: "SK",
    addressCountry: "CA",
    // streetAddress: placeholder until owner confirms
  },
  areaServed: [
    { "@type": "City", name: "Regina" },
    { "@type": "City", name: "White City" },
    { "@type": "City", name: "Emerald Park" },
    { "@type": "City", name: "Pilot Butte" },
  ],
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-text bg-bg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

**Important:** The current `app/layout.tsx` imports `PHONE` from `lib/contact.ts` and uses `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"` for `metadataBase`. Phase 2 should harden this: use the hardcoded placeholder `https://saskgarageglow.ca` (per D-07, not an env var) so the OG image URL is always correct in the static build regardless of environment variables. The PHONE import should move to the JSON-LD `telephone` field or be removed from layout if not needed there.

[VERIFIED: `app/layout.tsx` current state; `node_modules/next/dist/docs/...generate-metadata.md`]

---

### Pattern 2: OG Image generation with `opengraph-image.tsx`

**What:** App Router file convention that generates a static PNG at build time. Automatically injects `<meta og:image>` tags. Compatible with `output: 'export'`.

**When to use:** One file at `app/opengraph-image.tsx` covers the entire site.

**Example:**
```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Sask Garage Glow-Up — Regina SK garage cleanout";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/Sask Garage Glow-up logo.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2E7D32",
          padding: "60px",
        }}
      >
        <img src={logoSrc} width={180} height={180} />
        <div
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 800,
            marginTop: 32,
            textAlign: "center",
          }}
        >
          Sask Garage Glow-Up
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 32,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Regina's Garage Cleanout Crew
        </div>
      </div>
    ),
    { ...size }
  );
}
```

**Important:** `ImageResponse` uses Satori under the hood — only **flexbox** layout is supported. `display: grid` and most other advanced CSS layouts will not work. Keep the OG image layout to flexbox column/row only.

[VERIFIED: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/image-response.md`]

---

### Pattern 3: sitemap.ts and robots.ts

**What:** Two new files in `app/` using App Router file conventions.

**Example:**
```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://saskgarageglow.ca",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://saskgarageglow.ca/sitemap.xml",
  };
}
```

[VERIFIED: bundled Next.js 16 docs]

---

### Pattern 4: Hero section — Tailwind v4 token usage

**What:** Full-bleed green hero section using brand tokens.

**Key insight:** In Tailwind v4, semantic tokens defined in `@theme` are available as utility classes using the CSS variable name without `--color-` prefix. So `--color-primary` → `bg-primary`, `--color-accent` → `bg-accent`, `text-accent`, etc.

**Example structure:**
```tsx
// Source: [ASSUMED] based on Tailwind v4 @theme conventions verified in Phase 1 globals.css
<section className="min-h-screen bg-primary flex flex-col items-center justify-center px-6 py-12">
  {/* Logo */}
  <img
    src="/Sask Garage Glow-up logo.png"
    alt="Sask Garage Glow-Up logo"
    className="w-24 h-24 object-contain invert brightness-0 invert"
    width={96}
    height={96}
  />

  {/* Headline */}
  <h1 className="text-white text-4xl font-black tracking-tight text-center mt-6 leading-tight">
    Regina's Garage Cleanout Crew
  </h1>

  {/* Tagline */}
  <p className="text-white/85 text-lg text-center mt-3 max-w-xs leading-snug">
    Same-day service. Local Regina team. Satisfaction guaranteed.
  </p>

  {/* CTAs */}
  <div className="flex flex-col gap-3 mt-8 w-full max-w-xs">
    <a href={PHONE_HREF} className="bg-accent text-white text-center font-bold py-4 rounded-lg text-lg">
      Call Now
    </a>
    <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
       className="border-2 border-white text-white text-center font-bold py-4 rounded-lg text-lg">
      Message on Facebook
    </a>
  </div>

  {/* Trust Badges */}
  <div className="flex gap-6 mt-10 justify-center">
    {/* Each badge: icon (text-accent) + label (text-white) */}
  </div>
</section>
```

---

### Anti-Patterns to Avoid

- **Using `<Head>` from `next/head` for metadata:** That is the Pages Router pattern. In App Router (Next.js 13+), use the `metadata` export object or file conventions like `opengraph-image.tsx`. [VERIFIED: docs]
- **Hardcoded contact values in JSX:** All phone/Facebook references MUST import from `lib/contact.ts`. [VERIFIED: CLAUDE.md + existing lib/contact.ts]
- **Using `next/image` for the hero logo without a custom loader:** `output: 'export'` does not support the default Next.js image optimization loader. Either use a plain `<img>` tag or configure a custom loader. For the hero logo, use a plain `<img>` tag. [VERIFIED: static-exports.md — "Image Optimization with the default loader" is listed as unsupported]
- **Using `display: grid` inside `opengraph-image.tsx` ImageResponse:** Satori (the rendering engine) only supports flexbox. [VERIFIED: image-response.md]
- **Setting `metadataBase` to `http://localhost:3000` in the static build:** The current `app/layout.tsx` uses `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"`. If `NEXT_PUBLIC_SITE_URL` is not set at build time, OG image URLs resolve to `http://localhost:3000/opengraph-image.png` in the static HTML — which is wrong. Phase 2 must fix this to always use the placeholder domain. [VERIFIED: current app/layout.tsx]
- **Placing the JSON-LD script in `<head>`:** The `<body>` placement used in the pattern above is intentional — placing it in `<head>` requires `suppressHydrationWarning` workarounds in App Router. Google accepts JSON-LD in `<body>`. [ASSUMED]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG image generation | Custom canvas/sharp build script | `app/opengraph-image.tsx` with `ImageResponse` | Built into Next.js 16; auto-injects correct meta tags; statically optimized; no extra build step |
| sitemap XML | Manual string concatenation | `app/sitemap.ts` with `MetadataRoute.Sitemap` | Framework-native; auto-served at `/sitemap.xml`; type-safe |
| robots.txt | Manual string concatenation | `app/robots.ts` with `MetadataRoute.Robots` | Framework-native; auto-served at `/robots.txt`; type-safe |
| SEO meta tags in `<head>` | Manual `<meta>` tags via custom `<head>` component | Next.js `metadata` export | Framework-native; deduplication, cascading, and proper rendering handled automatically |
| SVG icons for trust badges | Separate icon library (lucide-react, etc.) | Inline SVG paths | No extra dependency; simple shapes (clock, map-pin, shield); avoids bundle bloat |

**Key insight:** Next.js 16's metadata API handles the entire SEO instrumentation layer. The only external concern is getting the OG image's absolute URL correct — which is solved by ensuring `metadataBase` is the production domain.

---

## Common Pitfalls

### Pitfall 1: `metadataBase` falls back to localhost in static build

**What goes wrong:** `app/layout.tsx` currently sets `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")`. If the env var is not set at build time (likely on a local machine with no `.env.local`), all OG image URLs and canonical links resolve to `http://localhost:3000/...` in the generated HTML. The Facebook Sharing Debugger will show the wrong URL.

**Why it happens:** `NEXT_PUBLIC_*` env vars are embedded at build time. Without a `.env.local` or CI variable, the fallback is `localhost`.

**How to avoid:** Replace the env var approach with a hardcoded constant for the placeholder domain. Phase 2 should change `metadataBase` to `new URL("https://saskgarageglow.ca")` directly.

**Warning signs:** Run `grep og:image out/index.html` after build — if it shows `localhost`, the fix is needed.

[VERIFIED: current app/layout.tsx]

---

### Pitfall 2: Logo file not in `public/` — OG image generation fails at build

**What goes wrong:** `opengraph-image.tsx` uses `readFile(join(process.cwd(), 'public/Sask Garage Glow-up logo.png'))`. The logo PNG (`Sask Garage Glow-up logo.png`) currently sits in the project root, not in `public/`. The build will throw a file-not-found error.

**Why it happens:** Phase 1 did not copy brand assets to `public/` (they weren't needed yet). Phase 2 needs them for the OG image and the hero `<img>` tag.

**How to avoid:** Early in Phase 2 execution, copy `Sask Garage Glow-up logo.png` to `public/`. Also copy the SVG if needed. The space in the filename requires quoting in bash but is valid in Node.js `path.join`.

**Warning signs:** Build error mentioning `ENOENT: no such file or directory` on the logo path.

[VERIFIED: `ls` of root and `public/` directory]

---

### Pitfall 3: `next/image` `<Image>` component fails in static export for local images

**What goes wrong:** Using `<Image src="/Sask Garage Glow-up logo.png" ...>` from `next/image` causes a build error with `output: 'export'` because the default image optimization loader requires a server. The build may silently succeed but the image may not optimize correctly, or fail outright.

**Why it happens:** Next.js image optimization is listed as unsupported in static exports unless a custom loader is configured.

**How to avoid:** Use a plain `<img>` tag for the hero logo. Since the background is solid color and the logo is a static asset, `<img>` with explicit width/height is sufficient and avoids the loader requirement.

**Warning signs:** Build error mentioning "next/image" and "output: export" or "custom loader".

[VERIFIED: `static-exports.md` — "Image Optimization with the default loader" listed as unsupported feature]

---

### Pitfall 4: `opengraph-image.tsx` overrides `metadata.openGraph.images` in layout

**What goes wrong:** According to the docs, "File-based metadata has the higher priority and will override the `metadata` object and `generateMetadata` function." If both `app/opengraph-image.tsx` AND `metadata.openGraph.images` are defined in `app/layout.tsx`, the file-based one takes precedence. This is actually the desired behavior — but it means you should NOT manually set `openGraph.images` in the metadata object if using the file convention, or you'll create a confusing situation where one overrides the other.

**How to avoid:** Choose one approach. For this project: use `app/opengraph-image.tsx` for the image, and omit `openGraph.images` from the `metadata` object in `layout.tsx`. The file convention auto-injects the correct absolute URL.

[VERIFIED: `generate-metadata.md` — "File-based metadata has the higher priority"]

---

### Pitfall 5: Filename with spaces in `public/` on some systems

**What goes wrong:** `Sask Garage Glow-up logo.png` has spaces and a hyphen in the filename. While Node.js handles this fine with `path.join`, some static hosts and build tools choke on spaces in public asset names.

**How to avoid:** When copying to `public/`, rename to `logo.png` or `sask-garage-glow-up-logo.png` (no spaces). Update all references in the codebase to the new filename. This is a clean housekeeping step for Phase 2.

[ASSUMED — based on general web hosting best practice; specific behavior of this deployment target not confirmed]

---

## Code Examples

Verified patterns from official sources:

### sitemap.ts
```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://saskgarageglow.ca",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

### robots.ts
```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://saskgarageglow.ca/sitemap.xml",
  };
}
```

### opengraph-image.tsx (OG image generation)
```typescript
// Source: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Sask Garage Glow-Up — Regina SK garage cleanout";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo.png"), // logo must be in public/ with no spaces
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#2E7D32", padding: "60px",
      }}>
        <img src={logoSrc} width={160} height={160} style={{ objectFit: "contain" }} />
        <div style={{ color: "white", fontSize: 60, fontWeight: 800, marginTop: 24, textAlign: "center" }}>
          Sask Garage Glow-Up
        </div>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 30, marginTop: 12, textAlign: "center" }}>
          Regina's Garage Cleanout Crew
        </div>
      </div>
    ),
    { ...size }
  );
}
```

### LocalBusiness JSON-LD in layout.tsx
```typescript
// Source: schema.org/HomeAndConstructionBusiness + generate-metadata.md (script placement)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Sask Garage Glow-Up",
  url: "https://saskgarageglow.ca",
  telephone: "+13069421617",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Regina",
    addressRegion: "SK",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Regina" },
  ],
};

// In RootLayout JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/head` `<Head>` for SEO tags | `metadata` export object in layout/page | Next.js 13 App Router | Must use `metadata` — `next/head` is Pages Router only |
| `next export` CLI command | `output: 'export'` in next.config.ts | v13.3 (removed in v14) | Already correct in this project |
| `@vercel/og` separate package | `next/og` built in | v14 (`ImageResponse` moved) | Already available with no extra install |
| `params` as plain object in route handlers | `params` is now a **Promise** | v16.0.0 | `opengraph-image.tsx` with `params` must `await params` — not relevant for root-level OG image without params |

**Deprecated/outdated:**
- `next/head` `<Head>` component: Do not use in App Router. Use `metadata` exports.
- `next export` command: Removed. Use `output: 'export'` config (already in place).

[VERIFIED: bundled docs version history tables]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | JSON-LD `<script>` placement in `<body>` is acceptable to Google (not just `<head>`) | Pattern 1, Anti-Patterns | Google's structured data guidelines are authoritative here; if wrong, move script to a `<head>` injection approach via a custom metadata approach |
| A2 | Filename with spaces in `public/` may cause issues on some static hosts | Pitfall 5 | Low risk — Node.js handles it fine; only affects certain hosting environments; safe to rename proactively |
| A3 | Tailwind v4 `invert brightness-0 invert` CSS filter chain renders a PNG white on green — SVG-based white rendering not needed since logo is a raster PNG embed | Pattern 4 (Hero) | If wrong, the logo appears as original colors on green; fix is to use a white-version logo or CSS filter `filter: brightness(0) invert(1)` |

---

## Open Questions

1. **Street address for JSON-LD**
   - What we know: D-12 specifies "placeholder street address until owner confirms"
   - What's unclear: No street address is known — schema.org allows `HomeAndConstructionBusiness` without `streetAddress` (only `addressLocality` required for local SEO)
   - Recommendation: Omit `streetAddress` from the schema for now; add a comment `// TODO: Add streetAddress once owner confirms`

2. **Logo filename — spaces in `public/`**
   - What we know: Logo PNG is at project root as `Sask Garage Glow-up logo.png` with spaces
   - What's unclear: Whether the deployment target (likely GitHub Pages or Netlify static) will handle spaces in filenames in `public/`
   - Recommendation: Rename to `logo.png` when copying to `public/` — simpler, no ambiguity

3. **`metadataBase` hardcode vs env var**
   - What we know: Current layout uses env var fallback to `localhost:3000`; D-07 says use `https://saskgarageglow.ca`
   - What's unclear: Whether future CI/CD will want to inject the real domain via env var
   - Recommendation: Hardcode `https://saskgarageglow.ca` for Phase 2 per D-07. Leave a `// TODO: update to real domain before launch` comment.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | OG image generation (`readFile`), `next build` | Yes | v24.13.0 | — |
| next@16.2.4 | All Next.js features | Yes | 16.2.4 | — |
| `next/og` (ImageResponse) | OG image generation | Yes (bundled) | same as next | — |
| Logo PNG (`public/logo.png`) | OG image + hero `<img>` | Needs copy | — | Skip logo in OG image; use text only |
| `.env.local` with `NEXT_PUBLIC_SITE_URL` | metadataBase | No (not present) | — | Hardcode domain per D-07 |

**Missing dependencies with no fallback:** None that block execution.

**Missing dependencies with fallback:**
- Logo in `public/` — must be copied from root before OG image works; fallback is text-only OG image.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no test config files found |
| Config file | None — Wave 0 must create or confirm no framework needed |
| Quick run command | `npm run build` (build verification as smoke test) |
| Full suite command | `npm run build && node -e "require('fs').existsSync('out/index.html') && require('fs').existsSync('out/sitemap.xml') && require('fs').existsSync('out/robots.txt') && console.log('OUTPUTS OK')"` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | Title tag contains "Regina" and "SK" in `out/index.html` | smoke | `grep -c "Regina" out/index.html` | ❌ Wave 0 (manual verification) |
| SEO-02 | JSON-LD script present in `out/index.html` with `HomeAndConstructionBusiness` | smoke | `grep -c "HomeAndConstructionBusiness" out/index.html` | ❌ Wave 0 |
| SEO-03 | `out/sitemap.xml` and `out/robots.txt` exist after build | smoke | `npm run build && ls out/sitemap.xml out/robots.txt` | ❌ Wave 0 |
| SEO-04 | `out/index.html` contains `og:image` with absolute `https://saskgarageglow.ca` URL | smoke | `grep "og:image" out/index.html \| grep "saskgarageglow.ca"` | ❌ Wave 0 |
| SEO-05 | `out/index.html` contains `<link rel="canonical"` with correct domain | smoke | `grep "canonical" out/index.html \| grep "saskgarageglow.ca"` | ❌ Wave 0 |
| HERO-01 | Headline `<h1>` exists in `out/index.html` | smoke | `grep -c "<h1" out/index.html` | ❌ Wave 0 |
| HERO-03 | `tel:3069421617` link present in `out/index.html` | smoke | `grep -c "tel:3069421617" out/index.html` | ❌ Wave 0 |
| HERO-04 | Facebook URL present in `out/index.html` | smoke | `grep -c "facebook.com" out/index.html` | ❌ Wave 0 |
| HERO-06 | All three trust badge texts present in `out/index.html` | smoke | `grep -c "Same Day\|100% Local\|Satisfaction" out/index.html` | ❌ Wave 0 |

All tests are grep-based smoke tests on the static build output — no test framework required. Each verifies a specific HTML artifact in `out/index.html` or the presence of output files.

### Sampling Rate
- **Per task commit:** `npm run build` exits 0
- **Per wave merge:** Full smoke test suite (all grep checks above)
- **Phase gate:** All smoke tests pass green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] No test config or test directory exists — all validation is build-output grep checks, no framework needed
- [ ] Logo PNG must be in `public/` before OG image build step can succeed

---

## Security Domain

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static site, no auth |
| V3 Session Management | No | Static site, no sessions |
| V4 Access Control | No | Static site, all public |
| V5 Input Validation | No | No user input in Phase 2 |
| V6 Cryptography | No | No crypto in Phase 2 |

### Known Threat Patterns for Static Export + SEO

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| JSON-LD injection via `dangerouslySetInnerHTML` | Tampering | All JSON-LD values are compile-time constants — no user input reaches this path; no mitigation needed |
| Placeholder domain in OG tags (`http://localhost:3000`) | Information Disclosure | Fix `metadataBase` to hardcode production domain per D-07 |

---

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` — openGraph, alternates, metadataBase metadata fields
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md` — OG image file convention, ImageResponse usage, static optimization note
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` — sitemap.ts MetadataRoute.Sitemap
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md` — robots.ts MetadataRoute.Robots
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/image-response.md` — ImageResponse constructor, Satori CSS constraints, flexbox-only layout
- `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` — Supported and unsupported features with output: 'export'; confirmed opengraph-image.tsx is NOT in unsupported list; confirmed next/image default loader IS unsupported

### Secondary (MEDIUM confidence)
- `app/layout.tsx`, `lib/contact.ts`, `app/globals.css`, `package.json` — Current codebase state verification
- `.planning/phases/01-scaffold/01-02-SUMMARY.md` — Phase 1 completion confirmation

### Tertiary (LOW confidence — needs validation)
- JSON-LD `<body>` placement acceptability by Google [ASSUMED — A1]
- Spaces in public/ filename behavior on deployment targets [ASSUMED — A2]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package.json verified, next@16.2.4 confirmed
- Architecture: HIGH — all file conventions verified in bundled Next.js 16 docs
- Pitfalls: HIGH for metadataBase/static export pitfalls (code-verified); MEDIUM for JSON-LD body placement (assumed)
- OG image compatibility with static export: HIGH — static-exports.md does not list opengraph-image.tsx as unsupported; image-response.md documents it as "statically optimized"

**Research date:** 2026-05-04
**Valid until:** 2026-06-04 (Next.js 16 is actively developed; check for patch releases affecting static export behavior)

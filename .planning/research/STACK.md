# Technology Stack

**Project:** Sask Garage Glow-Up — Local Service Business Marketing Website
**Researched:** 2026-05-03
**Sources:** Next.js official docs (v16.2.4 docs, last updated 2026-04-10), Tailwind CSS official docs (v4.2), Vercel official docs (last updated 2026-03-02)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15 (latest stable) | React framework, SSG, routing | App Router + `output: 'export'` produces fully static HTML/CSS/JS — zero server required, deploys to any CDN, free tier on Netlify/Vercel. React 19 included. |
| React | 19 | UI rendering | Bundled with Next.js 15. No separate install decision needed. |
| TypeScript | 5.x (bundled) | Type safety | `next.config.ts` is now natively supported. Use it. Catches prop errors at build time, not in production. |

**Router decision: App Router, not Pages Router.**

The App Router is the current default and receives all new Next.js investment. Pages Router is in maintenance mode. For a static site, App Router Server Components run at build time — they produce zero client-side JS by default. That means the hero, services section, and contact section ship as pure HTML with no React hydration overhead unless you opt in with `'use client'`. This is the right choice for a performance-critical mobile landing page.

**Static export configuration:**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // recommended for static hosts
  images: {
    unoptimized: true, // required for static export (see Images section)
    formats: ['image/webp'], // pre-process images at build time instead
  },
}

export default nextConfig
```

**Static export limitations to know:** No ISR, no server actions, no cookies/headers at runtime, no rewrites/redirects via config. None of these matter for this project — it has no backend, no auth, no dynamic routes.

---

### CSS

**Recommendation: Tailwind CSS v4.2**

Tailwind v4 (current stable: 4.2) is the right choice over CSS Modules for this project.

**Why Tailwind over CSS Modules:**

1. **Speed of iteration.** A marketing site's layout changes frequently during design iteration. Tailwind utility classes let you adjust spacing, color, and layout directly in JSX without context-switching to a CSS file. CSS Modules are excellent for component isolation in large apps — they are overhead for a single-page marketing site.

2. **Mobile-first is built in.** Tailwind's `sm:`, `md:`, `lg:` breakpoint prefixes enforce mobile-first thinking in markup. The primary traffic source is Facebook ads to mobile — every responsive decision should be made in markup, not scattered across CSS files.

3. **Consistent design tokens.** The brand has a specific green/gold palette (`#2E7D32`, gold/orange accents). Define these once in `@theme` (v4 syntax) and they become utility classes throughout the project. CSS Modules would require a shared variables file plus disciplined imports.

4. **v4 is simpler than v3.** Tailwind v4 removes `tailwind.config.js` in favor of CSS-native `@theme {}` blocks. No PostCSS plugin complexity beyond `@tailwindcss/postcss`. Installation is 3 lines.

**Why not CSS Modules:**
- Fine for scoped component styles, but requires a separate `.module.css` file per component
- No built-in design token system — you'd replicate what Tailwind gives for free
- More files to maintain for a site that will likely never exceed 5 components

**Installation (v4.2):**

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-green: #2e7d32;
  --color-brand-green-dark: #1b5e20;
  --color-brand-gold: #f59e0b;
  --color-brand-gold-dark: #d97706;
  --font-heading: 'your-heading-font', sans-serif;
}
```

---

### Image Optimization

**The core challenge:** `output: 'export'` disables Next.js's runtime image optimization API (`/_next/image`). The default `next/image` loader requires a server to resize and convert images on demand. In a static export, that server does not exist.

**Decision: `unoptimized: true` in `next.config.ts` + manual WebP/AVIF pre-processing.**

This is the correct approach for this project because:

1. The before/after photo gallery is the most critical performance element.
2. Photos come from the owner's phone — they will be large JPEGs (3–6 MB each).
3. Pre-processing at build time is better than runtime optimization for a static site — images are already optimized before the CDN caches them.

**Pre-processing workflow:**

Use `sharp` as a local dev dependency to batch-convert and resize owner photos:

```bash
npm install -D sharp
```

Write a one-time `scripts/optimize-images.js` script that:
- Converts JPEGs to WebP at 85% quality
- Generates two sizes per image: 800px wide (mobile) and 1200px wide (desktop)
- Outputs to `public/gallery/` with a consistent naming convention

**In components, still use `next/image`** with `unoptimized` set globally. Benefits retained:
- `loading="lazy"` (default) — defers off-screen images
- `width`/`height` props prevent Cumulative Layout Shift (CLS)
- `sizes` prop allows the browser to pick the right pre-processed size
- `placeholder="blur"` with a tiny `blurDataURL` for gallery images

**Hero image handling:**

The hero image (or hero background) should use `loading="eager"` (set `loading="eager"` on the `<Image>`) and be the only preloaded image. This is the LCP element on mobile.

```tsx
// Hero — above the fold, load immediately
<Image
  src="/hero-bg.webp"
  alt="Regina garage cleanout and organization"
  width={1200}
  height={800}
  loading="eager"
  sizes="100vw"
  className="..."
/>

// Gallery images — lazy load, multiple sizes
<Image
  src="/gallery/job-1-after-800.webp"
  alt="Garage cleanout before and after in Regina"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // tiny placeholder
  sizes="(max-width: 768px) 100vw, 50vw"
  className="..."
/>
```

**Format recommendation:** Pre-process everything to WebP. AVIF is 20% smaller but encodes 50% slower and has slightly lower browser support. For a gallery of ~10–20 photos, WebP is the right tradeoff — excellent compression, universal support, fast encoding.

---

### Fonts

**Recommendation: `next/font/google` with a variable font.**

`next/font` self-hosts fonts at build time. No requests go to Google's servers at runtime. Zero layout shift via CSS `size-adjust`. Zero extra config needed on Vercel or Netlify.

For the badge/illustrated brand style (bold, clean, Saskatchewan blue-collar aesthetic), recommended pairing:

- **Headings:** `Oswald` or `Barlow Condensed` — bold, condensed, high impact. Works well for "GARAGE GLOW-UP" style headings.
- **Body:** `Inter` or `Barlow` — clean, readable at 14–16px on mobile.

Both are variable fonts available from Google Fonts via `next/font/google`.

```tsx
// app/layout.tsx
import { Oswald, Inter } from 'next/font/google'

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Then in `globals.css` `@theme`:
```css
--font-heading: var(--font-heading), sans-serif;
--font-body: var(--font-body), sans-serif;
```

**Do not** use `@next/font` (the old package) — it was removed in Next.js 15. Use `next/font` directly.

**Do not** load fonts via a `<link>` tag to Google Fonts CDN — this adds a render-blocking external request and hurts mobile LCP. `next/font` eliminates this entirely.

---

### SEO and Metadata

**Recommendation: Native Next.js Metadata API — do not install `next-seo`.**

The Next.js App Router has a complete, first-party metadata API that covers everything this project needs: title, description, Open Graph, Twitter cards, canonical URLs, robots, and verification tags. It generates correct `<head>` output with no additional packages.

`next-seo` was the standard solution for Pages Router. It is unnecessary in App Router — it adds a dependency with no benefit.

**Implementation:**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://saskgarageglow-up.ca'), // replace with real domain
  title: {
    default: 'Sask Garage Glow-Up | Regina Garage Cleanout & Junk Removal',
    template: '%s | Sask Garage Glow-Up',
  },
  description: 'Regina\'s garage cleanout, junk removal, deep cleaning, and organization experts. Call or message for a free quote. Serving Regina, SK.',
  keywords: ['garage cleanout Regina', 'junk removal Regina SK', 'garage organization Regina', 'Saskatchewan junk removal'],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Sask Garage Glow-Up',
    images: [
      {
        url: '/og-image.jpg', // 1200x630, shows a compelling before/after
        width: 1200,
        height: 630,
        alt: 'Sask Garage Glow-Up — Regina Garage Cleanout',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

**Open Graph image note:** The OG image matters enormously for this project — Facebook ad clicks will check the link preview. Use a real before/after photo cropped to 1200x630 with the business name and phone number overlaid. Pre-create this as a static file in `public/` — no need for dynamic OG image generation for a single-page site.

---

### Schema.org Structured Data

**Recommendation: Inline JSON-LD in the root layout, no library needed.**

Schema.org JSON-LD for LocalBusiness should be implemented as a `<script type="application/ld+json">` tag injected via a Server Component in the root layout. No library (`schema-dts`, `next-seo`'s schema support, etc.) is needed — the JSON object is small and static.

Google uses LocalBusiness structured data to populate the Knowledge Panel and local search results. For a Regina service business, this is high-value for local SEO.

```tsx
// app/components/LocalBusinessSchema.tsx
// Server Component — no 'use client' directive

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sask Garage Glow-Up',
    description: 'Garage cleanout, junk removal, deep cleaning, and organization services in Regina, Saskatchewan.',
    telephone: '+13069421617',
    url: 'https://saskgarageglow-up.ca',
    sameAs: ['https://www.facebook.com/profile.php?id=100079123135328'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Regina',
      addressRegion: 'SK',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.4452,  // Regina, SK approximate
      longitude: -104.6189,
    },
    areaServed: {
      '@type': 'City',
      name: 'Regina',
    },
    serviceType: ['Garage Cleanout', 'Junk Removal', 'Deep Cleaning', 'Garage Organization'],
    priceRange: 'Call for quote',
    openingHoursSpecification: [], // omit until hours are confirmed
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

Add `<LocalBusinessSchema />` inside the `<head>` or `<body>` of the root layout. Because this is a Server Component, it renders at build time and produces a static `<script>` tag — zero client JS.

---

### Animation

**Recommendation: CSS only — no animation library.**

The PROJECT.md explicitly states: "Fast load — no unnecessary animations, no heavy libraries." This is the right call for a Facebook-ads-to-mobile funnel.

**Do not install Framer Motion.** Its core bundle is approximately 45–60 KB gzipped. For a site where the JS bundle should be near zero (App Router Server Components produce no client JS by default), adding an animation library immediately negates the primary performance advantage of the stack.

**What to use instead:**

Tailwind CSS includes transition and animation utilities that cover everything a marketing site needs:

```css
/* Tailwind utilities sufficient for this site */
transition-all duration-200 ease-in-out   /* hover states on buttons, cards */
hover:scale-105                            /* subtle gallery image hover */
animate-pulse                              /* loading skeletons if needed */
```

For the before/after gallery, if a swipe/slider interaction is needed on mobile, use the native CSS `scroll-snap` approach with Tailwind:

```tsx
<div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
  {photos.map(photo => (
    <div key={photo.id} className="snap-center shrink-0 w-[90vw] sm:w-[45vw]">
      ...
    </div>
  ))}
</div>
```

This requires zero JS, works perfectly on mobile, and performs at 60 fps because it uses GPU-composited scrolling.

**If a single interactive element genuinely needs JS animation** (e.g., a before/after image slider with a draggable divider), use a lightweight purpose-built library like `react-compare-slider` (~8 KB) rather than a general-purpose animation framework.

---

### Deployment

**Recommendation: Vercel — primary recommendation with clear rationale.**

**Vercel (strongly recommended):**
- Created by the same team as Next.js. Zero configuration deployment for all Next.js features.
- For `output: 'export'` (static), Vercel serves from a global CDN with automatic cache headers.
- Free tier is sufficient for a static marketing site: unlimited bandwidth on hobby plan, automatic HTTPS, preview deployments on pull requests.
- Image Optimization works natively on Vercel without `unoptimized: true` — if you want to avoid manual pre-processing, deploy to Vercel and remove `unoptimized` from config. Vercel handles WebP/AVIF conversion on demand.
- Confidence: HIGH (official docs verified 2026-03-02)

**Netlify (viable alternative):**
- Netlify supports static Next.js exports via their standard static site hosting.
- The `@netlify/plugin-nextjs` adapter exists and handles non-static Next.js features (SSR, API routes), but for `output: 'export'` it is not required — just deploy the `out/` folder.
- Free tier: 100 GB bandwidth/month, sufficient for a local service business.
- Key difference vs Vercel: Netlify does not provide Next.js image optimization. With `output: 'export'`, this is irrelevant since the images are pre-optimized anyway.
- Confidence: MEDIUM (Netlify docs returned 404 during research; based on known adapter architecture and static hosting behavior)

**Decision matrix for this project:**

| Factor | Vercel | Netlify |
|--------|--------|---------|
| Static export support | Native | Works via `out/` deploy |
| image optimization (if no static export) | Built-in, free | Requires Cloudinary or similar |
| Free tier limits | Generous | Generous |
| Next.js version compatibility | Always current | Lags slightly |
| Deployment simplicity | Push-to-deploy, zero config | Push-to-deploy, minimal config |
| Owner familiarity | Either works | Either works |

**Use Vercel.** If the owner already has a Netlify account or preference, Netlify works fine with `output: 'export'`. There is no functional difference for a fully static site.

---

## Alternatives Considered and Rejected

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Router | App Router | Pages Router | Pages Router is in maintenance mode; App Router produces less client JS by default, which is the primary performance requirement |
| CSS | Tailwind v4 | CSS Modules | CSS Modules require more files, no built-in design token system, slower iteration for a marketing site |
| CSS | Tailwind v4 | styled-components / Emotion | CSS-in-JS adds runtime overhead and complicates SSR; Tailwind is pure CSS at build time |
| SEO library | Native metadata API | next-seo | next-seo is designed for Pages Router; native API in App Router covers 100% of needed functionality |
| Animation | CSS only | Framer Motion | ~50 KB gzipped; violates the explicit "no heavy libraries" constraint; CSS transitions cover all needed use cases |
| Animation | CSS only | GSAP | Same reasoning as Framer Motion; overkill for hover states and scroll reveal |
| Image hosting | Local `public/` with pre-processing | Cloudinary | Adds external dependency; pre-processing at build time is simpler and free for a static gallery of 10–20 photos |
| Structured data | Inline JSON-LD | schema-dts / next-seo schema | Adds a package to generate a single static JSON object; not worth the dependency |
| Fonts | next/font/google | Google Fonts `<link>` tag | External request, render-blocking, layout shift risk; `next/font` eliminates all of these |

---

## Final Package List

```bash
# Core (included with create-next-app)
npm install next@latest react@latest react-dom@latest typescript

# CSS
npm install tailwindcss @tailwindcss/postcss postcss

# Dev tools (image pre-processing)
npm install -D sharp

# That's it. No other runtime dependencies needed.
```

**Total runtime dependencies: 3 packages** (next, react, react-dom).
Tailwind is a PostCSS plugin — it produces a static CSS file at build time with zero runtime footprint.

---

## Confidence Assessment

| Area | Confidence | Source | Notes |
|------|------------|--------|-------|
| Next.js 15 + App Router + `output: 'export'` | HIGH | nextjs.org/docs, version 16.2.4 docs (updated 2026-04-10) | Static export behavior fully documented; limitations verified |
| Tailwind CSS v4.2 | HIGH | tailwindcss.com official install guide | v4.2 confirmed current; PostCSS-based installation verified |
| `next/font` behavior | HIGH | nextjs.org/docs/app/getting-started/fonts (updated 2026-04-10) | Self-hosting at build time confirmed; zero layout shift via `size-adjust` confirmed |
| Native Metadata API | HIGH | nextjs.org/docs/app/api-reference/functions/generate-metadata (updated 2026-04-10) | Full openGraph, twitter, robots, canonical support confirmed |
| `next/image` with `unoptimized: true` | HIGH | nextjs.org/docs/app/api-reference/components/image (updated 2026-04-10) | Static export image limitation confirmed; `unoptimized` workaround confirmed |
| Vercel deployment | HIGH | vercel.com/docs/frameworks/nextjs (updated 2026-03-02) | Zero-config static deployment confirmed; free tier confirmed |
| Netlify deployment | MEDIUM | Netlify docs returned 404 during research | Based on known static hosting behavior; `@netlify/plugin-nextjs` adapter existence known but not verified against current version |
| Framer Motion bundle size | MEDIUM | Based on training data / known package characteristics | Could not verify with WebSearch (denied); estimate of ~50 KB gzipped is consistent with documented knowledge |
| Schema.org LocalBusiness fields | MEDIUM | Schema.org spec (WebFetch denied); Google structured data docs (WebFetch denied) | JSON-LD structure based on well-established LocalBusiness spec; field recommendations from training knowledge |
| CSS-only animation sufficiency | HIGH | Tailwind docs + standard CSS scroll-snap | No library research needed; browser-native scroll-snap is fully verified |

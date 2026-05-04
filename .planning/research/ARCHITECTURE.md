# Architecture Patterns

**Project:** Sask Garage Glow-Up marketing website
**Researched:** 2026-05-03
**Confidence:** HIGH — all patterns verified against Next.js official docs (v16.2.4, last updated 2026-04-10)

---

## Recommended Architecture

A single-route static export. One page (`/`), all sections rendered server-side at build time, shipped as a flat HTML/CSS/JS bundle to Netlify or Vercel. No server, no API routes that require a runtime, no dynamic rendering at request time.

```
Browser (mobile, Facebook in-app)
  └── Static HTML shell (pre-rendered at build)
        ├── <head>  ← metadata, OG tags, structured data JSON-LD, preload hints
        └── <body>
              ├── <Header>       (sticky nav, phone CTA)
              ├── <HeroSection>  (headline, tagline, dual CTA buttons)
              ├── <GallerySection> (before/after pairs, lazy-loaded)
              ├── <ServicesSection> (four service cards)
              ├── <ContactSection>  (phone + Facebook DM buttons)
              └── <Footer>       (address, copyright, social link)
```

---

## Static Export vs SSR vs ISR

**Decision: Static Export (`output: 'export'`)**

Rationale:
- No backend, no form handling, no personalization, no ISR candidates. There is nothing a server adds.
- `output: 'export'` produces a pure `/out` folder of HTML/CSS/JS assets deployable to any CDN.
- Netlify and Vercel free tiers serve static assets with global CDN and zero cold starts.
- All metadata (OG, structured data) resolves fully at build time — no streaming delay when Facebook's crawler (`facebookexternalhit`) hits the page. Facebook's bot is HTML-limited; it cannot execute JavaScript, so streaming metadata would fall back to blocking anyway. Static export sidesteps this entirely.
- ISR requires a server runtime. SSR requires a server runtime. Neither is justified here.

**Important constraint:** `next/image` default loader does NOT work with static export. You must either use `unoptimized: true` in `next.config.js` or supply a custom loader (e.g., Cloudinary). See the Image section below.

```js
// next.config.js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,   // use this for simplicity; images optimized manually at source
  },
  trailingSlash: true,   // recommended for static hosts: /index.html not /index
}
```

---

## File and Folder Structure

```
sask-garage-glowup/
├── app/
│   ├── layout.tsx            ← Root layout: HTML shell, metadata export, JSON-LD script
│   ├── page.tsx              ← Single page: assembles all section components
│   ├── globals.css           ← Tailwind base + brand CSS variables
│   ├── favicon.ico           ← File-based metadata (auto-picked up by Next.js)
│   ├── icon.png              ← PWA icon (file-based metadata)
│   ├── apple-icon.png        ← Apple touch icon (file-based metadata)
│   ├── opengraph-image.jpg   ← OG image, 1200×630 (file-based metadata, auto-wired)
│   ├── sitemap.ts            ← Generates sitemap.xml at build
│   └── robots.ts             ← Generates robots.txt at build
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx        ← Logo + sticky nav + phone button
│   │   └── Footer.tsx        ← Address, copyright, Facebook link
│   └── sections/
│       ├── HeroSection.tsx
│       ├── GallerySection.tsx
│       ├── ServicesSection.tsx
│       └── ContactSection.tsx
│
├── data/
│   └── gallery.ts            ← Typed array of before/after image pairs
│
├── lib/
│   └── structured-data.ts    ← LocalBusiness JSON-LD object, imported into layout.tsx
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo.png
│   │   ├── og-image.jpg       ← 1200×630, same file referenced in metadata
│   │   └── gallery/
│   │       ├── job-01-before.jpg
│   │       ├── job-01-after.jpg
│   │       ├── job-02-before.jpg
│   │       ├── job-02-after.jpg
│   │       └── ...
│   └── fonts/                 ← Self-hosted fonts if not using next/font
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Why this structure:**
- `app/` contains only Next.js file-convention files (layout, page, metadata files). No business logic leaks in.
- `components/sections/` maps 1:1 to page sections, making the build order obvious.
- `data/gallery.ts` separates content from presentation. When the owner provides real photos, only this file changes.
- `lib/structured-data.ts` keeps the JSON-LD blob out of layout.tsx, which would otherwise become unreadable.
- `public/images/gallery/` uses a flat naming convention (`job-NN-before.jpg`) that is easy to add to without restructuring.

---

## Component Boundaries

| Component | Responsibility | Receives | Emits / Side Effects |
|-----------|---------------|----------|---------------------|
| `app/layout.tsx` | HTML shell, `<head>` metadata, JSON-LD script injection | — | Renders all children inside `<body>` |
| `Header` | Logo display, sticky nav anchors, top-of-page phone CTA | — | `tel:` link click → phone call |
| `HeroSection` | First impression above the fold, primary CTAs | — | `tel:` link, `https://facebook.com/...` link |
| `GallerySection` | Before/after photo grid, per-pair label | `galleryItems[]` from `data/gallery.ts` | None |
| `BeforeAfterCard` | Single before/after image pair with label | `{ before, after, label }` | None |
| `ServicesSection` | Four service cards (icon + name + short description) | — | None |
| `ContactSection` | Repeated CTAs, address, hours if needed | — | `tel:` link, Facebook DM link |
| `Footer` | Copyright, address, social link | — | None |

**No component talks to any other component.** All communication goes through `page.tsx` (data down) or direct `<a>` / `<Link>` elements (user navigation). There is no shared state. This is correct for a static marketing site.

---

## Data Flow

```
data/gallery.ts  (static typed array)
      │
      ▼
app/page.tsx     (imports gallery data, passes to GallerySection)
      │
      ▼
GallerySection   (maps over array, renders BeforeAfterCard per pair)
      │
      ▼
BeforeAfterCard  (renders two <Image> tags with before/after labels)
```

All other sections are self-contained with zero props. They contain their own copy (services list, contact details, tagline). When copy needs to change, edit the component directly — there is no CMS layer to route through.

If the owner later wants to update gallery photos without touching code, the upgrade path is: move `data/gallery.ts` content to a JSON file in `public/`, then have the owner edit that JSON. That is a one-phase migration, not a rewrite.

---

## Local SEO Architecture

### Where Metadata Lives

**`app/layout.tsx`** — static `metadata` export:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://saskgarageglow-up.ca'),  // replace with real domain
  title: 'Sask Garage Glow-Up | Garage Cleanout & Junk Removal Regina SK',
  description: 'Regina\'s garage cleanout experts. Junk removal, deep cleaning, and organization. Call or message for a free quote.',
  keywords: ['garage cleanout Regina', 'junk removal Regina SK', 'garage cleaning Saskatchewan'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sask Garage Glow-Up | Garage Cleanout Regina SK',
    description: 'Before & after transformations. Call 306-942-1617 or message on Facebook.',
    url: 'https://saskgarageglow-up.ca',
    siteName: 'Sask Garage Glow-Up',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Garage cleanout before and after — Regina SK' }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sask Garage Glow-Up | Regina Garage Cleanout',
    description: 'Before & after transformations. Call 306-942-1617.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}
```

**Why `metadataBase` matters:** OG image URLs must be absolute. Setting `metadataBase` in the root layout lets all child metadata use relative paths safely. Without it, the build will error on OG image references.

**`app/opengraph-image.jpg`** — place a 1200×630 JPEG here. Next.js file-based metadata auto-generates the correct `og:image` meta tags without any config. This file takes precedence over the `openGraph.images` array in the metadata export. Use whichever approach, not both.

**Recommendation:** Use the file-based approach (drop `opengraph-image.jpg` in `app/`). It is simpler and guaranteed correct. Remove the `openGraph.images` array from the metadata export if you use the file.

### Structured Data (JSON-LD)

Inject a `LocalBusiness` schema into the `<head>` via a `<script>` tag in `app/layout.tsx`. Next.js does not have a native structured data API — this is standard practice.

**`lib/structured-data.ts`:**

```typescript
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sask Garage Glow-Up',
  description: 'Garage cleanout, junk removal, deep cleaning, and organization services in Regina, Saskatchewan.',
  telephone: '+13069421617',
  url: 'https://saskgarageglow-up.ca',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Regina',
    addressRegion: 'SK',
    addressCountry: 'CA',
  },
  areaServed: {
    '@type': 'City',
    name: 'Regina',
  },
  sameAs: ['https://www.facebook.com/profile.php?id=100079123135328'],
  image: 'https://saskgarageglow-up.ca/og-image.jpg',
  priceRange: '$$',
}
```

**In `app/layout.tsx`:**

```tsx
import { localBusinessSchema } from '@/lib/structured-data'

// inside <head> via layout return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
/>
```

This is fully compatible with static export. The JSON-LD is baked into the HTML at build time.

### `app/sitemap.ts`

```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://saskgarageglow-up.ca',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

Single URL. `changeFrequency: 'monthly'` is honest for a mostly-static site that will get gallery updates occasionally.

### `app/robots.ts`

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://saskgarageglow-up.ca/sitemap.xml',
  }
}
```

Nothing to disallow on a single-page marketing site.

---

## Image Asset Organization

### OG Image

- **File:** `app/opengraph-image.jpg` (file-based metadata, auto-wired)
- **Dimensions:** 1200×630 px (Facebook requirement for link previews)
- **Content:** Logo + brand colors + tagline. Must look good in a Facebook ad preview. Create this in Canva or Figma using the brand palette. Do not use a garage photo — use a branded graphic so it reads clearly at small sizes.
- **Also place** in `public/images/og-image.jpg` as a canonical reference for the JSON-LD schema's `image` field.

### Logo

- `public/images/logo.svg` — used in `<Header>` and `<Footer>` via `<Image>` or inline SVG
- `public/images/logo.png` — fallback, also used as `app/icon.png` (file-based favicon metadata)
- `app/favicon.ico` — 32×32 ICO for browser tab
- `app/apple-icon.png` — 180×180 PNG for iOS home screen bookmark

### Gallery Photos

```
public/images/gallery/
  job-01-before.jpg    (compress to ≤150KB each at 1080px wide)
  job-01-after.jpg
  job-02-before.jpg
  job-02-after.jpg
  ...
```

**Format:** JPEG, not WebP — the owner will supply phone photos. Accept JPEG, run them through Squoosh or Sharp at build time to produce ≤150KB copies. Do not rely on `next/image` optimization in static export mode.

**Naming convention:** `job-NN-before.jpg` / `job-NN-after.jpg`. The `NN` is a zero-padded sequence number. This makes `data/gallery.ts` trivial to generate and easy for the owner to understand when handing off photos.

---

## Before/After Gallery Component Architecture

### Data Shape

```typescript
// data/gallery.ts
export interface GalleryItem {
  id: string            // 'job-01'
  label: string         // 'Basement Garage Cleanout'
  before: {
    src: string         // '/images/gallery/job-01-before.jpg'
    alt: string         // 'Cluttered garage before cleanout'
    width: number       // 1080
    height: number      // 1440
  }
  after: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export const galleryItems: GalleryItem[] = [...]
```

Always store explicit `width` and `height` per image. This prevents layout shift (CLS) and is required by `next/image` when not using `fill`. For static export with `unoptimized: true`, dimensions still matter for the browser's aspect-ratio reservation.

### Component Hierarchy

```
GallerySection
  └── BeforeAfterCard (×N, one per galleryItems entry)
        ├── <figure> (before)
        │     ├── <Image> (loading="lazy", placeholder="blur")
        │     └── <figcaption> "Before"
        └── <figure> (after)
              ├── <Image> (loading="lazy", placeholder="blur")
              └── <figcaption> "After"
```

### Lazy Loading Strategy

- All gallery images: `loading="lazy"` (default for `next/image`)
- First gallery pair (`job-01`): consider `loading="eager"` if it sits above the fold on most phones, but with a typical Hero section above it, lazy is fine
- Hero image (if any): `loading="eager"` or `preload` — it is the LCP element
- Logo in Header: `loading="eager"` — small SVG, above the fold

Since static export disables the default Next.js image optimizer, `placeholder="blur"` requires a `blurDataURL`. Generate a 10px-wide base64 JPEG placeholder for each image at build time (using Sharp or a one-time script), store in `data/gallery.ts` alongside the image metadata. This provides a perceived-performance improvement (blurred placeholder while image loads) without relying on the Next.js image optimization pipeline.

If blur placeholders add complexity in the first build, omit them and add in a later pass. The loading speed gain from proper `sizes` attributes is more important.

### Sizes Attribute

For a 2-column grid on desktop, single-column on mobile:

```tsx
<Image
  src={item.before.src}
  alt={item.before.alt}
  width={item.before.width}
  height={item.before.height}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

This tells the browser: on phones, this image is full viewport width; on wider screens, it is half. Without `sizes`, the browser downloads the full-width version for all devices — a common performance killer on gallery-heavy sites.

### No Swipe Library Needed

The PROJECT.md mentions "swipeable" as an option. Recommendation: skip it. A responsive 2-column masonry or CSS grid layout performs better on mobile than a JS-powered swipe carousel, has zero JS weight, and has no accessibility debt. If the owner insists on swipe, add it in a later phase — it does not belong in the initial build.

---

## Performance Architecture

### Code Splitting

Next.js App Router automatically code-splits per route. Since this is a single route, all section components are in one bundle. This is correct — there is nothing to split.

Do not dynamically import sections. Dynamic imports add a waterfall: the HTML loads, JS parses, then the dynamic import fires. For sections visible on initial scroll, this increases LCP. For a single short page, eager loading of all sections is the right call.

**Exception:** If the gallery grows beyond 12 pairs and the component becomes large, `GallerySection` could be dynamically imported with `{ ssr: true }` to keep it in the server render but split the client JS. This is a future optimization, not an initial concern.

### What to Keep Off the Main Thread

- No animation libraries (Framer Motion, GSAP) — PROJECT.md explicitly forbids heavy libraries
- No carousel/swipe JS for gallery
- No Google Analytics in the initial build — add only if the owner requests it, and use `next/script` with `strategy="lazyOnload"` when you do
- No chat widgets, pop-ups, or scroll-tracking scripts

### Font Loading

Use `next/font` with a system font stack as the fallback. If a custom font is specified by the brand:
- Use `next/font/google` for Google Fonts (zero layout shift, self-hosted automatically)
- Set `display: 'swap'` for body text, `display: 'block'` for the hero headline (prevents flash of unstyled text on LCP element)

### CSS

Use Tailwind CSS. It purges unused styles at build time, keeping the CSS bundle minimal. Do not add a full CSS framework on top of Tailwind.

---

## Build Order Dependencies

This is the recommended implementation sequence, reflecting what must exist before each piece can be built:

**Phase 1: Foundation** (everything else depends on this)
1. `next.config.js` — static export config, `unoptimized: true` for images
2. `tailwind.config.ts` — brand colors (`#2E7D32` green, gold/orange accent) as CSS variables
3. `app/globals.css` — Tailwind base, brand variables
4. `app/layout.tsx` — HTML shell only, no metadata yet (just renders children)

**Phase 2: SEO Infrastructure** (no visible UI, but must be in place before any content)
5. `lib/structured-data.ts` — LocalBusiness JSON-LD
6. `app/layout.tsx` — add static `metadata` export, inject JSON-LD `<script>`
7. `app/sitemap.ts`
8. `app/robots.ts`
9. `app/opengraph-image.jpg` — place file, verify OG tags generate correctly

**Phase 3: Shell Components** (needed before sections can render inside them)
10. `Header` — logo + nav anchors + phone CTA button
11. `Footer` — address + Facebook link

**Phase 4: Above-the-Fold Content** (highest priority for perceived performance)
12. `HeroSection` — headline, tagline, two CTA buttons (phone + Facebook DM)
13. `app/page.tsx` — assemble layout + hero, do a Lighthouse run at this point

**Phase 5: Core Content**
14. `data/gallery.ts` — populate with placeholder entries pointing to placeholder images
15. `BeforeAfterCard` — single card component, get the layout right with placeholders
16. `GallerySection` — grid layout, maps over gallery data
17. `ServicesSection` — four service cards

**Phase 6: Conversion Section**
18. `ContactSection` — phone button + Facebook DM button, address

**Phase 7: Real Assets**
19. Replace placeholder gallery images with real owner photos
20. Set `blurDataURL` values if implementing blur placeholders
21. Compress all gallery images to ≤150KB
22. Final Lighthouse audit, fix any CLS/LCP issues

**Dependency rules:**
- `Header` and `Footer` have no dependencies on any section components
- `GallerySection` depends on `data/gallery.ts` and `BeforeAfterCard`
- `BeforeAfterCard` depends on the `GalleryItem` type from `data/gallery.ts`
- All section components are independent of each other
- `app/layout.tsx` metadata depends on `lib/structured-data.ts` and having a real domain set in `metadataBase`
- The OG image file and the `og:image` reference in metadata must stay in sync — using file-based metadata (`app/opengraph-image.jpg`) eliminates this sync requirement

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Using `next/image` default loader with static export
**What goes wrong:** Build fails at `next build`. The default image optimization API requires a server runtime.
**Instead:** Set `images: { unoptimized: true }` in `next.config.js`. Optimize images manually at the source (Squoosh, Sharp script, or image editing tool) to ≤150KB before committing.

### Anti-Pattern 2: Forgetting `metadataBase` in layout.tsx
**What goes wrong:** Build error on OG image URLs. Next.js requires absolute URLs for OG images; `metadataBase` lets you use relative paths safely.
**Instead:** Always set `metadataBase: new URL('https://your-real-domain.ca')` in the root layout metadata. Use a placeholder domain during development and replace before first deploy.

### Anti-Pattern 3: Metadata export in a Client Component
**What goes wrong:** The `metadata` export and `generateMetadata` function are Server Component-only. Adding `'use client'` to `layout.tsx` or `page.tsx` silently drops all metadata.
**Instead:** Keep `app/layout.tsx` and `app/page.tsx` as Server Components (no `'use client'` directive). Push any client interactivity (scroll handlers, swipe logic) into dedicated sub-components.

### Anti-Pattern 4: Hardcoding phone number and Facebook URL in multiple components
**What goes wrong:** Owner changes phone number (or Facebook URL). Now it is wrong in 3+ places.
**Instead:** Define contact constants once:

```typescript
// lib/contact.ts
export const PHONE_NUMBER = '306-942-1617'
export const PHONE_HREF = 'tel:+13069421617'
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100079123135328'
```

Import into `Header`, `HeroSection`, and `ContactSection`. One change propagates everywhere.

### Anti-Pattern 5: Inline styles and magic color values
**What goes wrong:** Brand colors drift across components. The green in the hero is slightly different from the green in the contact section.
**Instead:** Define brand colors in `tailwind.config.ts` as named tokens (`brand-green`, `brand-gold`). Use only those tokens in components. Never hardcode hex values in JSX.

### Anti-Pattern 6: Relative image paths without `public/` prefix
**What goes wrong:** Images resolve correctly in dev but break in the static export `/out` folder.
**Instead:** All image `src` values in `<Image>` components must start with `/` (absolute from `public/`). Example: `/images/gallery/job-01-before.jpg`.

---

## Scalability Considerations

| Concern | Now (launch) | Later (if needed) |
|---------|-------------|-------------------|
| Gallery growth | Flat array in `data/gallery.ts` | Move to JSON file owner edits, or Contentlayer, or a headless CMS |
| Multiple pages | Single `app/page.tsx` | Add `app/services/page.tsx`, etc. — App Router handles this without restructuring |
| Blog / SEO content | Out of scope | `app/blog/[slug]/page.tsx` with markdown files or a CMS |
| Analytics | None | `next/script strategy="lazyOnload"` for any tracking script |
| Contact form | Out of scope | Add a separate Netlify Form or Formspree endpoint in a later phase |
| Image CDN | None (unoptimized static) | Point a Cloudinary loader at the gallery images for automated WebP/AVIF |

---

## Sources

- Next.js static export docs: https://nextjs.org/docs/app/guides/static-exports (verified, v16.2.4, 2026-04-10)
- Next.js Image component: https://nextjs.org/docs/app/api-reference/components/image (verified, v16.2.4, 2026-04-10)
- Next.js metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata (verified, v16.2.4, 2026-04-10)
- Next.js metadata OG images guide: https://nextjs.org/docs/app/getting-started/metadata-and-og-images (verified, v16.2.4, 2026-04-10)
- Next.js sitemap file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap (verified, v16.2.4, 2026-04-10)
- Next.js robots.txt file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots (verified, v16.2.4, 2026-04-10)

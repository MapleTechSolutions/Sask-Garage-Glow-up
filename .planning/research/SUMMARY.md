# Research Summary: Sask Garage Glow-Up Website

**Synthesized:** 2026-05-03
**Sources:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md
**Confidence:** HIGH overall. All four research files agree tightly. Stack is well-documented. Feature recommendations are grounded in established CRO and local SEO literature. Architecture patterns are verified against Next.js official docs. Pitfalls are battle-tested.

---

## Executive Summary

This is a single-page, mobile-first marketing site whose sole job is converting Facebook ad traffic (cold, mobile, aged 30-65) into phone calls and Facebook DMs. There is no backend, no auth, no dynamic data -- static export is the correct and complete architecture. The entire technical stack can be bootstrapped in an afternoon with three runtime dependencies.

The highest-impact element on the site is the before/after photo gallery. Everything else supports it or drives the visitor toward it. The conversion funnel is: land on hero, see transformation proof, tap to call. Every technical and design decision should be evaluated against whether it helps or hurts that funnel.

The primary execution risks are performance (a slow hero image will tank Facebook ad ROI immediately) and SEO infrastructure (missing LocalBusiness schema and malformed OG tags are invisible errors that silently hurt both paid and organic performance). Both are easy to eliminate if addressed in the first two phases before any real content is built.

---

## 1. Recommended Stack (Definitive Choices)

| Technology | Version | Role | Rationale |
|------------|---------|------|-----------|
| Next.js | 15 (App Router) | Framework + SSG | output: export produces pure static HTML/CSS/JS. Server Components ship zero client JS by default. Pages Router is in maintenance mode. |
| React | 19 | UI | Bundled with Next.js 15. No separate install decision. |
| TypeScript | 5.x (bundled) | Type safety | Catches prop errors at build time. next.config.ts natively supported. |
| Tailwind CSS | v4.2 | Styling | Mobile-first utilities built in. CSS-native @theme tokens for brand palette. Zero runtime footprint. |
| next/font/google | built-in | Fonts | Self-hosts at build time. Zero layout shift. No external requests. |
| Native Metadata API | built-in | SEO / OG tags | Full OG, Twitter, robots, canonical. next-seo is unnecessary in App Router. |
| sharp | Latest (dev dep) | Image pre-processing | Batch converts owner iPhone photos to WebP at <=150KB before commit. |
| Vercel | Free tier | Deployment | Zero-config static deploy. Global CDN. Automatic HTTPS. |

**Deliberately excluded:** Framer Motion, GSAP, CSS-in-JS, next-seo, schema-dts, Cloudinary, chat widgets, contact forms, Google Analytics (unless owner requests), any carousel library.

**Font pairing:** Oswald (headings) + Inter (body) via next/font/google. Bold blue-collar Saskatchewan aesthetic.

**Animation policy:** CSS only. Tailwind transition utilities. CSS scroll-snap for gallery. No JS animation libraries.

---

## 2. Table Stakes Features (Must-Haves)

Every item below is a conversion failure if missing.

- Above-fold phone number or primary CTA -- tap-to-call on mobile, impossible to miss
- Business name + service type in hero -- Regina garage cleanout specialists, not just a logo
- Service area stated explicitly -- Serving Regina and surrounding area visible without scrolling
- Before/after visual proof -- the single highest-impact conversion element on the page
- Mobile tap-to-call button -- E.164 tel: link, 54-60px tall touch target
- Fast first paint -- LCP under 2.5s on throttled mobile; hero image WebP under 100KB with priority prop
- HTTPS -- Vercel provides automatically
- Legible at 375px width -- test on iPhone SE; no horizontal scroll
- Open Graph meta tags -- og:title, og:description, og:image (1200x630 JPEG absolute URL), og:url
- Sticky bottom CTA bar on mobile -- phone + Facebook DM buttons always visible after hero scrolls off

---

## 3. Top Differentiators to Include

Ordered by impact. Items 1-4 belong in the core build; 5-7 are a second pass.

1. **Hero comparison slider + scroll-snap gallery grid** -- one featured job with draggable/swipeable divider, then 4-8 labeled job pairs below. More visceral than a static grid. No lightbox.
2. **LocalBusiness structured data (JSON-LD)** -- HomeAndConstructionBusiness type in head. Enables Google rich results and local pack. Validate with Rich Results Test before launch.
3. **Free-quote / no-obligation micro-copy on CTAs** -- validated across thousands of A/B tests for trades/home services. Primary: Get a Free Quote - No Obligation. Secondary: Message Us on Facebook.
4. **Local visual signals** -- real truck, real jobs, Regina context. No stock photos. Owner photos are the strongest trust signal.
5. **Explicit service-area text list** -- Regina, White City, Emerald Park, Pilot Butte, etc. Removes hesitation from homeowners outside the city center.
6. **Service guarantee / promise statement** -- one or two sentences near the contact section. Stated standard, not a legal guarantee. Reduces perceived risk.
7. **Facebook Pixel** -- loaded afterInteractive. Enables retargeting from ad traffic. High ad efficiency gain over time.

---

## 4. Anti-Features to Avoid

| Anti-Feature | Why | Instead |
|---|---|---|
| Entry/exit-intent popups | Increases bounce 20-40% for Facebook ad traffic | Hero CTA + sticky bar |
| Multi-field contact form | Each field is a drop-off; demographic prefers phone | Phone + Facebook DM only |
| Auto-advancing testimonials carousel | Users do not read them; owner already decided to skip | Static quotes or none |
| Pricing page | Enables self-disqualification | Direct all pricing to call/message |
| Video autoplay with sound | Destroys mobile experience | Muted autoplay only if video used |
| Multiple competing CTAs in hero | Decision paralysis reduces conversions | One primary (call), one secondary (FB DM) |
| Heavy JS animations or scroll effects | Delays first meaningful paint | CSS transitions only |
| Stock photography of people | Cognitive dissonance for sole operator | Real owner photos only |
| Third-party chat widget | 50-150KB+ JS, wrong channel for demographic | Phone + Facebook Messenger |
| Lightbox gallery | JS overhead, traps user away from CTA | Scroll-snap grid + hero slider |
| Large top navigation | Gives ad traffic escape routes | Logo + phone only in header |

---

## 5. Build Order (Phase Sequence)

Derived from hard architectural dependencies. Each phase produces a shippable artifact.

**Phase 1 -- Scaffold and Infrastructure** (no visible UI; everything else depends on this)
- next.config.ts: output: export, images: { unoptimized: true }, trailingSlash: true
- lib/contact.ts: single source of truth for phone (E.164 + display + href) and Facebook URL
- lib/structured-data.ts: HomeAndConstructionBusiness JSON-LD object
- tailwind.config.ts and globals.css: brand tokens (#2E7D32 green, #f59e0b gold), font variables
- app/layout.tsx: HTML shell, font setup, metadata export, JSON-LD injection, viewport meta
- app/sitemap.ts and app/robots.ts
- app/opengraph-image.jpg placeholder at 1200x630, verify OG tag generation
- Run next build to confirm static export works before writing any section component

**Phase 2 -- Shell Components**
- Header: logo + phone CTA button, imports from lib/contact.ts
- Footer: address, Facebook link, copyright

**Phase 3 -- Hero Section** (highest priority for perceived performance)
- HeroSection: headline, tagline, service area statement, tap-to-call + Facebook DM CTAs
- Assemble in app/page.tsx, run Lighthouse mobile
- Hero image: WebP under 100KB, priority prop, not lazy loaded
- Must hit LCP under 2.5s on throttled mobile before proceeding to Phase 4

**Phase 4 -- Gallery Section** (primary conversion proof)
- data/gallery.ts: typed GalleryItem[] interface, placeholder entries
- BeforeAfterCard: fixed aspect-ratio container (prevents CLS), next/image with explicit dimensions
- GallerySection: hero comparison slider (1 featured job) + scroll-snap grid (4-8 pairs)
- If using react-compare-slider: lazy load via next/dynamic with ssr: false
- Image prep script: run owner photos through sharp, output WebP at <=150KB

**Phase 5 -- Services and Contact Sections**
- ServicesSection: four service cards (icon + name + short description)
- ContactSection: phone button + Facebook DM button + service guarantee copy
- Sticky bottom CTA bar (mobile, fixed position, 60-64px tall)
- Facebook Pixel via next/script strategy=afterInteractive

**Phase 6 -- Real Assets and Launch Prep**
- Replace placeholder gallery images with owner photos
- Add blurDataURL to gallery images
- Final next build + Lighthouse audit, fix CLS/LCP issues
- Verify OG tags with Facebook Sharing Debugger
- Validate structured data with Google Rich Results Test
- Update Google Business Profile website URL to new domain

---

## 6. Critical Pitfalls (Top 5)

**Pitfall 1 -- Hero image too large (kills Facebook ad ROI)**
Raw iPhone JPEGs (3-8MB) without optimization produce LCP of 4-6s on mobile. Facebook scores the page Below Average, increasing cost-per-result 30-50%. Fix: WebP under 100KB, priority prop, tested on Slow 4G throttle before every deploy.

**Pitfall 2 -- next/image default loader incompatible with static export**
Without images: { unoptimized: true } the build either throws an error or silently serves full-resolution images. Fix: Set unoptimized: true in next.config.ts in Phase 1 before any images are added. Pre-optimize everything with sharp.

**Pitfall 3 -- OG image with a relative URL breaks Facebook link previews**
Facebook requires an absolute URL for og:image. A relative path produces a broken preview on every Facebook share and ad link preview. Fix: Set metadataBase in app/layout.tsx. Use file-based metadata (app/opengraph-image.jpg) for auto-generated absolute URLs. Verify with Facebook Sharing Debugger after first deploy.

**Pitfall 4 -- Missing LocalBusiness structured data**
Without HomeAndConstructionBusiness JSON-LD the site cannot rank for local intent queries and will not appear in Google rich results or the local pack. Silent failure. Fix: Implement in lib/structured-data.ts in Phase 1. Validate with Google Rich Results Test before launch.

**Pitfall 5 -- NAP data hardcoded in multiple components**
Phone number typed manually in multiple components will diverge when changed, and inconsistent NAP (Name, Address, Phone) is a local SEO negative signal. Fix: Create lib/contact.ts in Phase 1 before writing any component. Every component imports from it -- never hardcodes contact info.

---

## 7. Open Questions (Owner Input Required)

| Question | Blocks | Notes |
|---|---|---|
| What is the real domain name? | Phase 1 metadataBase, structured data URL, sitemap | Use placeholder during dev; must be set before first public deploy |
| Which cities/towns are served beyond Regina? | Phase 3 hero text, Phase 5 contact section | White City, Emerald Park, Pilot Butte are assumptions -- confirm |
| What are business hours, if fixed? | Structured data openingHoursSpecification | Omit from schema if hours are flexible |
| Which jobs featured in gallery, in what order? | Phase 4 gallery data | Owner supplies photos; need to identify the hero comparison job |
| What is the service guarantee/promise statement? | Phase 5 ContactSection | Owner must approve exact language -- it carries their name near the CTA |
| Does the owner want Facebook Pixel retargeting? | Phase 5 | Requires access to their Facebook Business Manager account |
| Is CASL cookie consent required for Facebook Pixel? | Phase 5 | Research flagged this unresolved. Consult gov.gc.ca/casl before adding the Pixel. |
| What is the OG image graphic? | Phase 1 (needed before first deploy) | Recommended: branded graphic at 1200x630 -- logo + tagline + brand colors. Not a photo -- must read clearly at small sizes in a Facebook ad preview. |

---

## Confidence Assessment

| Area | Confidence | Notes |
|---|---|---|
| Stack | HIGH | All choices verified against current official docs. No contested decisions. |
| Features | HIGH | Table stakes and anti-features cross-validated in CRO literature. Gallery slider vs grid preference is MEDIUM. |
| Architecture | HIGH | Verified against Next.js 15 App Router docs (v16.2.4, 2026-04-10). Build order dependency rules are definitive. |
| Pitfalls | HIGH | All critical pitfalls are documented Next.js behavior or well-established local SEO / Core Web Vitals patterns. |
| CASL / cookie consent | LOW | Requires legal confirmation. Do not assume the Pixel is consent-exempt for Canadian visitors. |

---

## Sources (Aggregated)

- Next.js official docs v16.2.4 (2026-04-10): static exports, App Router, Image, metadata API, Script, font, sitemap, robots
- Tailwind CSS official docs v4.2: installation, @theme syntax, content configuration
- Vercel official docs (2026-03-02): static deployment, free tier
- CRO research: CXL/ConversionXL, Unbounce, Nielsen Norman Group (through 2025)
- Google Core Web Vitals and mobile UX documentation
- Facebook Business Help Center: landing page experience, OG tag requirements
- Schema.org LocalBusiness specification

# Requirements — Sask Garage Glow-Up Website

## v1 Requirements

### Foundation & Infrastructure

- [ ] **FOUND-01**: Next.js 15 project initialized with App Router, `output: 'export'`, and Tailwind CSS v4
- [ ] **FOUND-02**: Brand design tokens configured in Tailwind (`primary` green, `accent` gold/orange, `neutral` whites/grays)
- [ ] **FOUND-03**: Global layout shell (`app/layout.tsx`) with `metadataBase` set (placeholder domain until launch)
- [ ] **FOUND-04**: Contact constants centralized in `lib/contact.ts` (phone: 306-942-1617, Facebook URL) — no hardcoded values in components
- [ ] **FOUND-05**: `next build` produces a working static export with zero errors before any section is built

### SEO & Social

- [ ] **SEO-01**: Page title and meta description optimized for Regina local search (e.g. "Garage Cleanout Regina SK | Sask Garage Glow-Up")
- [ ] **SEO-02**: LocalBusiness JSON-LD structured data in `app/layout.tsx` (HomeAndConstructionBusiness schema, Regina SK address, E.164 phone)
- [ ] **SEO-03**: `sitemap.ts` and `robots.ts` generated at build time
- [ ] **SEO-04**: Open Graph tags — title, description, absolute URL OG image (1200×630px branded graphic) — baked into static HTML
- [ ] **SEO-05**: Canonical URL set correctly for the domain

### Hero Section

- [ ] **HERO-01**: Bold headline visible above the fold on a 375px wide mobile screen without scrolling
- [ ] **HERO-02**: Short supporting tagline (1–2 sentences max)
- [ ] **HERO-03**: Primary CTA button ("Call Now" → `tel:306-942-1617`) prominently placed
- [ ] **HERO-04**: Secondary CTA button ("Message on Facebook" → Facebook profile URL)
- [ ] **HERO-05**: Hero background/image is WebP, under 100KB, with `fetchpriority="high"` — Lighthouse LCP under 2.5s on throttled mobile
- [ ] **HERO-06**: Trust badges visible in or near hero: "100% Satisfaction Guarantee", "Same Day Clean-Up", "100% Local Regina"

### Before & After Gallery

- [ ] **GAL-01**: Hero comparison slider — one showcase job at top of gallery, swipeable before/after on mobile
- [ ] **GAL-02**: Scrollable grid of before/after photo pairs below the hero slider (6–10 job pairs)
- [ ] **GAL-03**: Each gallery card has explicit dimensions / `aspect-ratio` CSS to prevent Cumulative Layout Shift
- [ ] **GAL-04**: Gallery images lazy-loaded with `loading="lazy"` — only hero slider images are eager
- [ ] **GAL-05**: Gallery data sourced from `data/gallery.ts` (structured array of job pairs with labels) — swappable without touching components
- [ ] **GAL-06**: Real owner-supplied before/after photos integrated (placeholders used during build, swapped before launch)
- [ ] **GAL-07**: Photos pre-compressed to WebP, ≤150KB each, before being placed in `/public/gallery/`

### Services Section

- [ ] **SVC-01**: Four services displayed — Garage Cleanout, Deep Clean, Junk Hauling, Organization
- [ ] **SVC-02**: Each service has a short description (1–2 sentences) and an icon or visual element
- [ ] **SVC-03**: Section includes a CTA directing users to call/message for a quote

### Contact Section

- [ ] **CONT-01**: "Call Now" button → `tel:306-942-1617` (triggers native phone dialer on mobile)
- [ ] **CONT-02**: "Message on Facebook" button → opens Facebook profile in new tab
- [ ] **CONT-03**: Phone number displayed as visible text (not just a button) for users who want to dial manually
- [ ] **CONT-04**: Service area statement: "Serving all of Regina & surrounding area"
- [ ] **CONT-05**: No contact form — phone and Facebook DM only

### Sticky CTA Bar

- [ ] **STICK-01**: Fixed bottom bar appears after hero scrolls off screen
- [ ] **STICK-02**: Bar contains two buttons: "Call Now" and "Message Us" (Facebook DM)
- [ ] **STICK-03**: Bar does not overlap content on desktop — only active on mobile (< 768px)
- [ ] **STICK-04**: Bar is visually consistent with brand colors (green primary, gold accent)

### Performance & Quality

- [ ] **PERF-01**: Lighthouse mobile performance score ≥ 85 before launch
- [ ] **PERF-02**: No JavaScript animation libraries — CSS transitions only
- [ ] **PERF-03**: Google Rich Results Test passes for LocalBusiness structured data
- [ ] **PERF-04**: Facebook Sharing Debugger confirms OG preview renders correctly (image + title + description)
- [ ] **PERF-05**: Site renders correctly on iPhone SE (375px), standard mobile (390px), and desktop (1280px)

---

## v2 Requirements (Deferred)

- Facebook Pixel integration (CASL consent banner required for Canadian sites — needs legal confirmation)
- Blog/tips section (e.g. "How to declutter your garage")
- Google Business Profile embedded map
- Photo upload / CMS for owner to add gallery jobs without code changes
- Neighbourhood-specific landing pages for local SEO
- Online quote request form

---

## Out of Scope

- Pricing page — all leads directed to call/message for a quote
- Testimonials / review section — replaced by trust badges and strong CTA
- E-commerce or online booking system
- Multi-language support
- Backend / API routes (entire site is static)
- Cookie consent banner (deferred to v2 with Facebook Pixel decision)

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| SEO-01 | Phase 2 | Pending |
| SEO-02 | Phase 2 | Pending |
| SEO-03 | Phase 2 | Pending |
| SEO-04 | Phase 2 | Pending |
| SEO-05 | Phase 2 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| HERO-05 | Phase 2 | Pending |
| HERO-06 | Phase 2 | Pending |
| GAL-01 | Phase 3 | Pending |
| GAL-02 | Phase 3 | Pending |
| GAL-03 | Phase 3 | Pending |
| GAL-04 | Phase 3 | Pending |
| GAL-05 | Phase 3 | Pending |
| GAL-06 | Phase 5 | Pending |
| GAL-07 | Phase 5 | Pending |
| SVC-01 | Phase 4 | Pending |
| SVC-02 | Phase 4 | Pending |
| SVC-03 | Phase 4 | Pending |
| CONT-01 | Phase 4 | Pending |
| CONT-02 | Phase 4 | Pending |
| CONT-03 | Phase 4 | Pending |
| CONT-04 | Phase 4 | Pending |
| CONT-05 | Phase 4 | Pending |
| STICK-01 | Phase 4 | Pending |
| STICK-02 | Phase 4 | Pending |
| STICK-03 | Phase 4 | Pending |
| STICK-04 | Phase 4 | Pending |
| PERF-01 | Phase 5 | Pending |
| PERF-02 | Phase 5 | Pending |
| PERF-03 | Phase 5 | Pending |
| PERF-04 | Phase 5 | Pending |
| PERF-05 | Phase 5 | Pending |

*Traceability updated 2026-05-03 after roadmap creation. 40/40 v1 requirements mapped.*

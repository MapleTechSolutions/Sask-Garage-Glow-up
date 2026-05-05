# Roadmap: Sask Garage Glow-Up Website

## Overview

A five-phase build that delivers a mobile-first static marketing site. The project starts with a clean Next.js scaffold (the foundation everything else depends on), then layers in SEO infrastructure and the hero section (the above-the-fold conversion surface), then builds the gallery (the primary persuasion asset), then completes the remaining sections and sticky CTA bar, and finally swaps in real owner photos and passes all launch-readiness audits. Each phase ships a coherent, verifiable capability before the next begins.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Scaffold** - Next.js 15 project initialized, brand tokens configured, static export verified
- [ ] **Phase 2: SEO + Hero** - LocalBusiness schema, OG tags, and hero section live with passing LCP
- [ ] **Phase 3: Gallery** - Before/after gallery with hero comparison slider and scroll-snap grid
- [ ] **Phase 4: Services, Contact + Sticky Bar** - All remaining sections and persistent mobile CTA bar
- [ ] **Phase 5: Real Photos + Launch Prep** - Owner photos integrated, audits passed, site launch-ready

## Phase Details

### Phase 1: Scaffold
**Goal**: The project builds cleanly as a static export with brand identity in place — every subsequent phase can start building on a verified foundation
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. `next build` completes with zero errors and produces a valid static export in `/out`
  2. Brand design tokens (primary green, accent gold, neutral grays) are available as Tailwind utilities and visible in a dev preview
  3. `lib/contact.ts` is the single source of truth — no phone number or Facebook URL appears hardcoded anywhere else
  4. The global layout shell renders with correct `metadataBase` and the HTML `<head>` includes a valid title tag
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Initialize Next.js 15 with App Router, Tailwind v4, and static export; verify `next build` produces `/out`
- [ ] 01-02-PLAN.md — Configure Tailwind v4 brand tokens, create `lib/contact.ts`, complete root layout shell

### Phase 2: SEO + Hero
**Goal**: A visitor landing from a Facebook ad sees a compelling above-the-fold hero with clear CTAs, and the page is fully instrumented for local search and social sharing
**Depends on**: Phase 1
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06
**Success Criteria** (what must be TRUE):
  1. The hero headline, tagline, trust badges, and both CTA buttons are fully visible on a 375px wide screen without scrolling
  2. Tapping "Call Now" triggers the native phone dialer with 306-942-1617 on a real mobile device
  3. Lighthouse mobile performance score shows LCP under 2.5s when throttled to Slow 4G
  4. Google Rich Results Test returns a valid LocalBusiness result for the page
  5. Facebook Sharing Debugger renders the correct OG title, description, and 1200x630 branded image preview
**Plans**: TBD
**UI hint**: yes

### Phase 3: Gallery
**Goal**: A visitor can see real before/after transformation proof — the primary conversion asset loads fast, looks stunning on a phone, and contains no layout shift
**Depends on**: Phase 2
**Requirements**: GAL-01, GAL-02, GAL-03, GAL-04, GAL-05
**Success Criteria** (what must be TRUE):
  1. The hero comparison slider at the top of the gallery section is swipeable/draggable on a mobile screen
  2. A grid of before/after job pairs renders below the slider with no visible layout shift as images load
  3. Gallery images below the hero slot are lazy-loaded — only the hero comparison images load eagerly
  4. Swapping gallery content requires only editing `data/gallery.ts` — no component changes needed
**Plans**: TBD
**UI hint**: yes

### Phase 4: Services, Contact + Sticky Bar
**Goal**: Every service is described and every visitor has a persistent, frictionless path to contact the business regardless of where they are on the page
**Depends on**: Phase 3
**Requirements**: SVC-01, SVC-02, SVC-03, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, STICK-01, STICK-02, STICK-03, STICK-04
**Success Criteria** (what must be TRUE):
  1. All four services (Garage Cleanout, Deep Clean, Junk Hauling, Organization) are visible with descriptions and icons
  2. The contact section shows a tappable phone number as visible text, a "Call Now" button, and a "Message on Facebook" button — no contact form present
  3. After scrolling past the hero, a fixed bottom bar appears on screens narrower than 768px with "Call Now" and "Message Us" buttons using brand colors
  4. The sticky bar is not visible on a 1280px desktop viewport
**Plans**: TBD
**UI hint**: yes

### Phase 5: Real Photos + Launch Prep
**Goal**: The site is ready to receive live traffic — real owner photos replace all placeholders, all Core Web Vitals pass, and every external validator returns clean results
**Depends on**: Phase 4
**Requirements**: GAL-06, GAL-07, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. Real owner before/after photos appear in the gallery — no placeholder images remain
  2. Lighthouse mobile performance score is 85 or higher on the production build
  3. Google Rich Results Test passes for LocalBusiness structured data with zero errors
  4. Facebook Sharing Debugger confirms the OG image, title, and description preview render correctly after final deploy
  5. The site renders without horizontal scroll or layout issues on iPhone SE (375px), standard mobile (390px), and desktop (1280px)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold | 0/2 | Not started | - |
| 2. SEO + Hero | 0/? | Not started | - |
| 3. Gallery | 0/? | Not started | - |
| 4. Services, Contact + Sticky Bar | 0/? | Not started | - |
| 5. Real Photos + Launch Prep | 0/? | Not started | - |

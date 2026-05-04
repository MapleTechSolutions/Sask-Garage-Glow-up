# Phase 2: SEO + Hero - Context

**Gathered:** 2026-05-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver two interrelated capabilities on top of the Phase 1 scaffold:

1. **SEO head instrumentation** — LocalBusiness JSON-LD schema, Open Graph tags (including a 1200×630 branded OG image), sitemap.ts, robots.ts, and canonical URL — all baked into the static export.
2. **Hero section** — The above-the-fold conversion surface: bold headline, short tagline, "Call Now" + "Message on Facebook" CTAs, trust badges, and a hero background — fully visible on a 375px mobile screen without scrolling.

New capabilities (gallery, services section, sticky bar) belong in Phases 3–4, not here.

</domain>

<decisions>
## Implementation Decisions

### Hero Background
- **D-01:** Use the **brand-green solid** background (`primary` token: `#2E7D32`). No hero image, no gradient. Zero LCP risk — no image to fetch or optimize. Clean, fast, and immediately on-brand.
- **D-02:** White logo on green will be the primary above-the-fold brand mark. Ensure the SVG logo (`/public/Sask Garage Glow-up logo.svg`) renders correctly inverted/white on the green background.

### Hero Copy
- **D-03:** Claude drafts the headline. Aim for punchy, local-search-aware copy (e.g. "Your Garage, Transformed." or "Regina's Garage Cleanout Crew"). Headline must be legible at 32–40px on a 375px screen.
- **D-04:** Claude drafts the tagline (1–2 sentences max). Focus on: local (Regina SK), fast (same day), and the satisfaction guarantee. Benefit-focused for the Facebook ad → mobile landing audience.
- **D-05:** Both headline and tagline should feel like the owner wrote them — conversational, direct, no corporate jargon.

### OG Image
- **D-06:** Generate a **branded 1200×630 PNG at build time** — brand-green background, white logo, business name, and a short tagline. No dependency on real photos. Approach: generate via a Node canvas script or a Next.js route handler that renders to PNG at build time.
- **D-07:** The generated OG image must use an **absolute URL** in the `<meta og:image>` tag (per `metadataBase` in `app/layout.tsx`). Use the placeholder domain `https://saskgarageglow.ca` until real domain is confirmed.
- **D-08:** Do NOT use `FB cover.jpg` as the OG image — wrong dimensions (820×312) and wrong aspect ratio.

### Trust Badges
- **D-09:** Three badges displayed in a horizontal row below the CTAs: "Same Day Clean-Up", "100% Local Regina", "Satisfaction Guarantee".
- **D-10:** Each badge uses the **icon + label stacked card** style — a small icon (SVG/inline: clock for Same Day, map pin for Local, shield for Guarantee) above a short text label. This matches the "badge/illustrated" brand style from the logo.
- **D-11:** Badge cards should be compact — no full border boxes. Icon centered above label, gold accent (`accent` token) for the icon, white label text on the green background.

### SEO Infrastructure
- **D-12:** LocalBusiness JSON-LD goes in `app/layout.tsx` as a `<script type="application/ld+json">` tag. Schema type: `HomeAndConstructionBusiness`. Include: name, address (Regina SK — use placeholder street address until owner confirms), telephone in E.164 format (+13069421617), url, and `areaServed`.
- **D-13:** `sitemap.ts` and `robots.ts` generated using Next.js App Router conventions (return `MetadataRoute.Sitemap` / `MetadataRoute.Robots`).
- **D-14:** Canonical URL set via Next.js `alternates.canonical` in page metadata.

### Typography
- **Claude's Discretion:** Keep the system font stack established in Phase 1. If the headline needs more visual punch, apply `font-weight: 800` or `900` and generous `letter-spacing: -0.02em`. Do NOT add Google Fonts or any external font request — preserves LCP.

### Claude's Discretion
- **Hero layout ordering (mobile):** Logo → Headline → Tagline → CTA buttons (primary then secondary) → Trust badges. Stack vertically, full-width, center-aligned on mobile.
- **CTA button styling:** Primary "Call Now" uses `bg-accent text-white` (gold), secondary "Message on Facebook" uses outlined white border with white text — reversed hierarchy from what might be expected, but gold CTA pops on green background.
- **Section padding:** Adequate vertical padding so the full hero (including badges) is visible above the fold on a 375px screen — test at 667px viewport height (iPhone SE).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` §SEO & Social — SEO-01 through SEO-05 define all SEO acceptance criteria
- `.planning/REQUIREMENTS.md` §Hero Section — HERO-01 through HERO-06 define all hero acceptance criteria

### Brand Assets
- `public/Sask Garage Glow-up logo.svg` — Primary logo; use white/inverted version on the green hero background
- `public/FB cover.jpg` — Secondary brand reference for color palette and composition feel (do NOT use as OG image — wrong dimensions)
- `public/truck.png` — Available for future phases; not used in Phase 2

### Contact Constants
- `lib/contact.ts` — ALL CTA buttons and phone references MUST import from here (PHONE_HREF for tel: links, FACEBOOK_URL for DM links)

### Project Rules
- `CLAUDE.md` — Critical: no hardcoded contact info, no animation libraries, OG image must use absolute URL, hero WebP < 100KB (no hero image in Phase 2, so this is moot — but canonical rule for Phase 3+)

### Previous Context
- `.planning/phases/01-scaffold/01-CONTEXT.md` — Established brand tokens and system font decisions that Phase 2 inherits

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/layout.tsx` — Already has `metadataBase`, title template, and meta description. Phase 2 extends this with OG tags, JSON-LD, and canonical. Do NOT rewrite from scratch.
- `lib/contact.ts` — Exports `PHONE`, `PHONE_HREF`, `FACEBOOK_URL`. All hero CTAs import from here.
- `app/globals.css` — Brand tokens already defined: `--color-primary`, `--color-primary-dark`, `--color-accent`, `--color-text`, `--color-bg`, `--color-bg-muted`. Use these Tailwind utilities.

### Established Patterns
- Tailwind v4 `@theme` semantic tokens — no shade scales, use token names directly (e.g. `bg-primary`, `text-accent`)
- `output: 'export'` static build — no server-side rendering, no API routes that run at request time. OG image generation must happen at build time or be a static file.
- System font stack via `--font-sans` — no external font requests

### Integration Points
- `app/page.tsx` — Currently the boilerplate Next.js template. Phase 2 replaces its content with the Hero section component.
- `app/layout.tsx` — Receives new `openGraph`, `alternates`, and JSON-LD additions.
- `public/` — OG image PNG goes here as a static asset (e.g. `public/og-image.png`) if generated at build time.

</code_context>

<specifics>
## Specific Ideas

- Hero background: brand-green solid (not an image) — user's explicit choice for LCP safety and clean aesthetic
- Trust badges: icon + label stacked cards (clock / map pin / shield icons), matching the badge/illustrated brand style
- OG image: generated branded graphic (green + white logo + text), NOT the FB cover or truck photo
- Copy: Claude drafts both headline and tagline — conversational, local, direct tone

</specifics>

<deferred>
## Deferred Ideas

- Truck photo as hero background — deferred to Phase 5 when real photos arrive; could revisit then if owner wants photo-forward hero
- Typography webfont (Google Fonts) — deferred from Phase 1, still deferred; system font + heavy weight is sufficient
- Visible site header/nav with logo — not in Phase 2 scope; logo only appears in hero area for now

</deferred>

---

*Phase: 02-seo-hero*
*Context gathered: 2026-05-04*

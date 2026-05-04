# Phase 1: Scaffold - Context

**Gathered:** 2026-05-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize the Next.js 15 project with App Router and `output: 'export'`, configure Tailwind v4 brand tokens, centralize contact constants, and verify a clean static build — so every subsequent phase can build on a confirmed foundation.

New capabilities (hero, SEO, gallery, sections) belong in Phases 2–5, not here.

</domain>

<decisions>
## Implementation Decisions

### Brand Tokens

- **D-01:** Use **semantic-only token structure** in Tailwind v4 `@theme` CSS — no shade scales. Tokens: `primary`, `primary-dark`, `accent`, `text`, `bg`, `bg-muted`.
- **D-02:** Extract exact hex values from `Sask Garage Glow-up logo.svg` — do not guess or use approximate values. Read the SVG `fill` attributes to pull the canonical green and gold/orange.
- **D-03:** Reference values: primary green ~`#2E7D32`, accent gold/orange ~`#F59E0B` — these are starting approximations only; the SVG read is authoritative.

### Claude's Discretion

- **Typography**: Choose a performant system font stack (no Google Fonts) to avoid any render-blocking external requests that would affect LCP from Phase 2 onward. Revisit in Phase 2 if brand feel needs refinement.
- **Layout shell scope**: Phase 1 layout (`app/layout.tsx`) should be a structural wrapper only — correct `metadataBase`, valid `<title>`, `<html lang="en">`, and a `<main>` wrapper. No visible header/nav — those belong in content phases.
- **Placeholder domain**: Use `https://saskgarageglow.ca` as the `metadataBase` placeholder until the real domain is confirmed. This is a plausible production URL that keeps OG and structured data paths realistic in dev.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` §Foundation & Infrastructure — FOUND-01 through FOUND-05 define all Phase 1 acceptance criteria

### Brand Assets
- `Sask Garage Glow-up logo.svg` — Read to extract canonical hex values for primary and accent tokens (see D-02)
- `FB cover.jpg` — Secondary brand reference for color palette validation

### Project Rules
- `CLAUDE.md` — Critical rules: no hardcoded contact info, no animation libraries, hero WebP < 100KB (future phases), OG image must use absolute URL

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Sask Garage Glow-up logo.svg` — Available for import in layout/header once shell is built
- `Sask Garage Glow-up logo.png` — PNG fallback if SVG has rendering issues in Next.js Image
- `truck.png` — Potential hero background candidate (Phase 2)
- `FB cover.jpg` — OG image starting point (Phase 2)

### Established Patterns
- No existing Next.js code — this phase creates all conventions that Phases 2–5 will follow

### Integration Points
- `lib/contact.ts` created here → imported by every CTA button in Phases 2–4
- `app/layout.tsx` created here → SEO metadata and JSON-LD added in Phase 2
- Tailwind `@theme` tokens defined here → used by all component styling in Phases 2–5

</code_context>

<specifics>
## Specific Ideas

- No specific "I want it like X" moments — Phase 1 is infrastructure. Standard Next.js App Router scaffold conventions apply.

</specifics>

<deferred>
## Deferred Ideas

- Typography revisit (Google Fonts / custom webfont) — defer to Phase 2 if system stack doesn't achieve the brand feel after hero is built
- Visible header/nav with logo — deferred to Phase 2 or later content phase
- Real domain in `metadataBase` — update when domain is registered (noted as blocker in STATE.md)

</deferred>

---

*Phase: 01-scaffold*
*Context gathered: 2026-05-03*

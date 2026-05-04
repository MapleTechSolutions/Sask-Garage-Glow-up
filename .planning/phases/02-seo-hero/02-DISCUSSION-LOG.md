# Phase 2: SEO + Hero - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-04
**Phase:** 02-seo-hero
**Areas discussed:** Hero background, Hero copy, OG image, Trust badge style

---

## Hero Background

| Option | Description | Selected |
|--------|-------------|----------|
| Truck photo + dark overlay | truck.png with semi-transparent overlay for text readability. Strong visual impact, needs WebP optimization under 100KB. | |
| Brand-green solid | Deep green (#2E7D32) solid background. Clean, fast, zero LCP risk. | ✓ |
| Dark gradient | Near-black to dark-green gradient. Placeholder feel until real photos. | |

**User's choice:** Brand-green solid
**Notes:** User prioritized speed and cleanliness over photo-forward hero. Truck photo and real before/after photos deferred to Phase 5.

---

## Hero Copy

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts it | Conversion-focused copy based on brand voice; user reviews before shipping. | ✓ |
| I have specific wording | User provides exact headline text. | |

**User's choice (Headline):** Claude drafts
**User's choice (Tagline):** Claude drafts
**Notes:** Tone guidance captured in CONTEXT.md D-05: conversational, direct, no jargon — "like the owner wrote it." Focus on local (Regina SK), speed (same day), and guarantee.

---

## OG Image

| Option | Description | Selected |
|--------|-------------|----------|
| Branded text graphic — generated | 1200×630 PNG: green background, white logo, business name, tagline. Generated at build time via Node canvas or Next.js route. | ✓ |
| Placeholder — revisit in Phase 5 | Solid-color placeholder now, swap when real photos arrive. | |
| Truck.png cropped to 1200×630 | Pad/crop truck.png to correct ratio. May look awkward at crop point. | |

**User's choice:** Branded text graphic — generated
**Notes:** No photo dependency for Phase 2. FB cover.jpg explicitly ruled out (wrong dimensions: 820×312).

---

## Trust Badge Style

| Option | Description | Selected |
|--------|-------------|----------|
| Checkmark + text pills | ✓ Same Day • ✓ 100% Local • ✓ Guarantee — minimal horizontal row. | |
| Icon + label stacked cards | Clock / map pin / shield icon above label. Matches illustrated/badge brand style. | ✓ |
| Gold accent text — bold highlights | Key words in accent gold (SAME DAY, 100% LOCAL, GUARANTEED). Text-only. | |

**User's choice:** Icon + label stacked cards
**Notes:** Three badges: clock (Same Day Clean-Up), map pin (100% Local Regina), shield (Satisfaction Guarantee). Icon in accent gold, white label text on green background.

---

## Claude's Discretion

- Typography: Keep system font stack from Phase 1; apply heavy weight (800/900) for headline punch. No Google Fonts.
- Hero layout order (mobile): Logo → Headline → Tagline → CTA buttons → Trust badges
- CTA button hierarchy: Gold "Call Now" (primary), outlined white "Message on Facebook" (secondary)
- Section padding: Tune so full hero visible above fold at 375×667px (iPhone SE)

## Deferred Ideas

- Truck photo hero background — revisit in Phase 5 when real before/after photos arrive
- Typography webfont — deferred from Phase 1, still deferred
- Site header/nav — not in Phase 2 scope

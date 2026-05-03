# Sask Garage Glow-Up Website

## What This Is

A mobile-first marketing website for Sask Garage Glow-Up, a garage cleanout, junk removal, deep cleaning, and organization business based in Regina, Saskatchewan. Built in Next.js, the site targets Regina homeowners via Facebook ads and organic local search, converting visitors into phone calls or Facebook DM leads.

## Core Value

Before & after photo gallery that makes the transformation tangible — this is the single most persuasive element and must load fast and look stunning on a phone screen.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with bold headline, short tagline, and prominent CTA (call or Facebook DM)
- [ ] Before & after gallery — swipeable/grid layout, real job photos, mobile-optimized
- [ ] Services section — cleanout, deep clean, junk hauling, organization
- [ ] Contact section — phone button (306-942-1617) and Facebook DM button, no form
- [ ] Local SEO — meta tags, title tags, structured data for Regina SK
- [ ] Open Graph tags — Facebook preview with image, title, description
- [ ] Responsive, mobile-first layout (primary traffic: Facebook ads → mobile)
- [ ] Fast load — no unnecessary animations, no heavy libraries
- [ ] Brand assets integrated — SVG logo, green + gold color palette, illustrated/badge style

### Out of Scope

- Pricing page — directing all visitors to call/message for a quote
- Testimonials/reviews section — replaced by strong call-to-action contact section
- CMS or admin dashboard — static content, owner updates code directly
- E-commerce / online booking system — phone + Facebook DM only
- Multi-language support — English only

## Context

- **Brand**: Badge/illustrated style with Saskatchewan Legislative Building, green primary (#2E7D32 range), gold/orange accents. Logo available as SVG + PNG.
- **Phone**: 306-942-1617 (shown on truck wrap — primary contact)
- **Facebook**: https://www.facebook.com/profile.php?id=100079123135328
- **Real before/after photos**: Owner has them — will be provided for gallery during build (placeholders used initially)
- **Traffic source**: Facebook ads → mobile landing, so above-the-fold mobile experience is critical
- **Target audience**: Regina homeowners aged 30–65

## Constraints

- **Tech stack**: Next.js + React — chosen by owner for future scaling
- **Hosting**: Netlify or Vercel (free tier static/SSG deployment)
- **Performance**: Must score well on mobile PageSpeed — no heavy JS bundles, images optimized
- **No backend**: Contact is phone + Facebook link only, no server-side form handling needed
- **Brand fidelity**: Must match the clean illustrated brand style from the logo and FB cover assets

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No pricing page | Owner wants all leads to call/DM — avoids price shopping | — Pending |
| No testimonials section | Owner wants clean CTA over social proof quotes | — Pending |
| Next.js over plain HTML | Owner preference, enables future additions (blog, gallery CMS) | — Pending |
| Netlify/Vercel hosting | Free, fast CDN, perfect for static Next.js export | — Pending |
| Phone + Facebook DM only | Simplest contact path for target demographic | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-03 after initialization*

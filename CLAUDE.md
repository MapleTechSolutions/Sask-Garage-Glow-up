# Sask Garage Glow-Up — Project Guide

## Project

Mobile-first Next.js marketing website for a garage cleanout business in Regina, SK. Static export deployed to Vercel. Primary traffic: Facebook ads → mobile users.

## GSD Workflow

This project uses the GSD planning system. Planning artifacts live in `.planning/`.

- **Current state**: `.planning/STATE.md`
- **Roadmap**: `.planning/ROADMAP.md`
- **Requirements**: `.planning/REQUIREMENTS.md`
- **Project context**: `.planning/PROJECT.md`

### Phase commands
- `/gsd-discuss-phase N` — gather context before planning
- `/gsd-plan-phase N` — create execution plan
- `/gsd-execute-phase N` — execute the plan
- `/gsd-verify-work` — verify phase deliverables

## Key Facts

- **Phone**: 306-942-1617 (single source of truth: `lib/contact.ts`)
- **Facebook**: https://www.facebook.com/profile.php?id=100079123135328
- **Domain**: TBD (use placeholder until registered — update `metadataBase` in `app/layout.tsx`)

## Stack

- Next.js 15 + App Router + `output: 'export'`
- Tailwind CSS v4
- Deployed to Vercel (handles image optimization — no `unoptimized: true` needed)
- No animation libraries — CSS transitions only
- No backend, no API routes, no contact form

## Critical Rules

1. **No hardcoded contact info** — all phone/Facebook values must come from `lib/contact.ts`
2. **No JS animation libraries** — Framer Motion and equivalents are banned
3. **Hero image must be WebP < 100KB** — LCP directly affects Facebook ad ROI
4. **OG image URL must be absolute** — relative URLs silently break Facebook previews
5. **Gallery images need explicit dimensions** — prevents Cumulative Layout Shift
6. **LocalBusiness JSON-LD required** — no structured data = no Local Pack ranking

## Brand

- Primary: Green (~#2E7D32)
- Accent: Gold/orange
- Style: Clean, badge-style, illustrated — match the logo and FB cover assets
- Logo files: `Sask Garage Glow-up logo.svg`, `Sask Garage Glow-up logo.png`
- FB cover reference: `FB cover.jpg`

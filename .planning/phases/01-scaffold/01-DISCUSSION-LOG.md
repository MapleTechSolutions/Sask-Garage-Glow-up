# Phase 1: Scaffold - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-03
**Phase:** 1-scaffold
**Areas discussed:** Brand token depth

---

## Brand Token Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Semantic only | 4–6 named tokens: primary, primary-dark, accent, text, bg, bg-muted | ✓ |
| Shade scale | Full green-100 through green-900 scale (like Tailwind built-ins) | |
| Both | Shade scale + semantic aliases on top | |

**User's choice:** Semantic only

**Notes:** Chose semantic tokens over a shade scale — appropriate for a marketing site where components will always reference the same brand colors by name rather than needing flexibility across many shades.

---

## Token Value Source

| Option | Description | Selected |
|--------|-------------|----------|
| Extract from logo SVG | Read SVG fill attributes for canonical hex values | ✓ |
| Use CLAUDE.md values as-is | #2E7D32 green + #F59E0B amber-500 | |
| User-specified | Custom hex values typed by user | |

**User's choice:** Extract from logo SVG

**Notes:** Planner should read `Sask Garage Glow-up logo.svg` to pull exact values rather than approximating. Ensures pixel-perfect brand match.

---

## Claude's Discretion

- Typography: System font stack (user skipped this area — Claude decides)
- Layout shell scope: Structural only, no header/nav (user skipped this area — Claude decides)
- Placeholder domain: `https://saskgarageglow.ca` (user skipped this area — Claude decides)

## Deferred Ideas

- None surfaced during discussion

---
phase: 2
slug: seo-hero
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-04
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no test framework detected; all validation is grep-based smoke tests on static build output |
| **Config file** | None — Wave 0 not needed (no framework install required) |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && grep -c "HomeAndConstructionBusiness" out/index.html && grep -c "tel:3069421617" out/index.html && grep -c "facebook.com" out/index.html && grep -c "Same Day" out/index.html && grep "canonical" out/index.html | grep -c "saskgarageglow.ca" && ls out/sitemap.xml out/robots.txt && echo "ALL CHECKS PASSED"` |
| **Estimated runtime** | ~30–60 seconds (next build) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (exits 0)
- **After every plan wave:** Run full smoke test suite (all grep checks on `out/index.html`)
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 1 | SEO-01 | — | N/A | smoke | `grep -c "Regina" out/index.html` | ❌ W0 | ⬜ pending |
| 2-01-02 | 01 | 1 | SEO-02 | T-02-01 | JSON-LD values are compile-time constants only | smoke | `grep -c "HomeAndConstructionBusiness" out/index.html` | ❌ W0 | ⬜ pending |
| 2-01-03 | 01 | 1 | SEO-03 | — | N/A | smoke | `ls out/sitemap.xml out/robots.txt` | ❌ W0 | ⬜ pending |
| 2-01-04 | 01 | 1 | SEO-04 | T-02-02 | OG image URL uses absolute production domain (not localhost) | smoke | `grep "og:image" out/index.html \| grep -c "saskgarageglow.ca"` | ❌ W0 | ⬜ pending |
| 2-01-05 | 01 | 1 | SEO-05 | — | N/A | smoke | `grep "canonical" out/index.html \| grep -c "saskgarageglow.ca"` | ❌ W0 | ⬜ pending |
| 2-02-01 | 02 | 2 | HERO-01 | — | N/A | smoke | `grep -c "<h1" out/index.html` | ❌ W0 | ⬜ pending |
| 2-02-02 | 02 | 2 | HERO-03 | — | N/A | smoke | `grep -c "tel:3069421617" out/index.html` | ❌ W0 | ⬜ pending |
| 2-02-03 | 02 | 2 | HERO-04 | — | N/A | smoke | `grep -c "facebook.com" out/index.html` | ❌ W0 | ⬜ pending |
| 2-02-04 | 02 | 2 | HERO-06 | — | N/A | smoke | `grep -c "Same Day" out/index.html && grep -c "100% Local" out/index.html && grep -c "Satisfaction" out/index.html` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No test framework installation required. All verifications are grep-based checks on the static build output (`out/index.html`, `out/sitemap.xml`, `out/robots.txt`).

**Pre-conditions that must be true before Wave 1 executes:**
- [ ] `public/logo.png` exists (logo PNG copied from project root — required by `opengraph-image.tsx`)
- [ ] `npm run build` exits 0 on the Phase 1 scaffold baseline

*Both can be verified with: `ls public/logo.png && npm run build && echo "W0 OK"`*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| "Call Now" triggers native phone dialer | HERO-03 | Requires real mobile device | Tap "Call Now" on iPhone/Android; verify native dialer opens with 306-942-1617 pre-filled |
| Hero content fully above fold on 375px screen | HERO-01 | Requires browser/DevTools | Open DevTools → set viewport to 375×667 (iPhone SE); confirm headline, tagline, CTAs, and badges all visible without scrolling |
| LCP under 2.5s on Slow 4G | HERO-05 | Requires Lighthouse run | Run Lighthouse mobile audit with Slow 4G throttling on `out/index.html` served locally; check LCP ≤ 2.5s |
| Google Rich Results Test returns valid LocalBusiness | SEO-02 | External validator | After deploy (or serve `out/` locally via `npx serve out`), submit URL to Rich Results Test |
| Facebook Sharing Debugger renders correct OG preview | SEO-04 | External validator / requires deployed URL | After deploy, submit URL to Facebook Sharing Debugger; verify title, description, 1200×630 image |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending

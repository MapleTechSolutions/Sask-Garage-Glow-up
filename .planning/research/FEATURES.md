# Feature Landscape: Local Service Business Marketing Website

**Domain:** Mobile-first local service business marketing site (garage cleanout / junk removal)
**Project:** Sask Garage Glow-Up, Regina SK
**Researched:** 2026-05-03
**Confidence note:** WebSearch and WebFetch unavailable in this environment. All findings
drawn from established CRO research (CXL, NNG, Unbounce, industry post-mortems) current
through 2025. Confidence noted per section.

---

## Table Stakes

Features every local service site must have. Missing any of these causes immediate trust
failure or conversion drop-off — users leave without contacting.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Above-fold phone number or primary CTA | Facebook ad visitors expect instant contact path — if they have to scroll to find how to reach you, most won't | Low | Sticky header or hero CTA; must be tap-to-call on mobile |
| Business name + service type in hero | Confirms they landed in the right place after clicking the ad — reduces bounce | Low | "Regina's garage cleanout specialists" not just a logo |
| Service area stated explicitly | Local service users filter by location before anything else — "Do you serve my area?" is question #1 | Low | "Serving Regina & surrounding area" in hero or directly below |
| What you do in plain language | Users skim; if they cannot decode the service in 3 seconds, they leave | Low | Concrete: "We haul it, clean it, and organize it — one call" |
| Before/after visual proof | Transformation businesses live and die by visual evidence; text descriptions do not convert | Medium | The single highest-impact element per PROJECT.md |
| Mobile tap-to-call button | 70–80% of local service queries happen on mobile; a phone number that isn't a tap-to-call link loses calls | Low | `<a href="tel:3069421617">` — obvious, large touch target |
| Fast first paint | Facebook ad traffic is impatient; Google's data shows 53% of mobile visits abandon after 3 seconds | Medium | Next.js SSG + image optimization; no blocking JS |
| HTTPS | Users and Facebook's ad platform both distrust non-HTTPS sites — immediate credibility hit | Low | Vercel/Netlify provide this automatically |
| Legible on all screen sizes | Obvious, but many DIY sites break at 375px (iPhone SE) or overflow horizontally | Low | Mobile-first CSS; test at 375px minimum |
| Open Graph meta tags | Facebook ad click previews pull OG data; a missing or broken image preview looks unprofessional and reduces click-through | Low | Image, title, description, URL — required for Facebook |

**Confidence:** HIGH — these are cross-validated across CXL, NNG, and Google's own mobile UX research.

---

## Differentiators

Features that set top-performing local service sites apart. Not expected — but when present,
they meaningfully increase conversion rate, trust, and perceived professionalism.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Before/after comparison slider | More visceral and interactive than a static side-by-side; user controls the reveal — proven engagement driver for transformation businesses | Medium | react-compare-image or CSS-only; swipe gesture on mobile |
| Persistent sticky CTA bar on mobile scroll | After hero passes off-screen, contact CTA disappears; a sticky bottom bar ("Call Now" + "Message on Facebook") recovers those users | Low | Fixed bottom bar, 60–64px tall, high contrast |
| Service-specific photo groupings | Showing before/afters grouped by service (cleanout vs deep clean vs organization) helps users find social proof relevant to their exact job | Medium | Tabs or scroll-snap sections; labeled clearly |
| "Free quote" / "No obligation" micro-copy | Reduces friction for users afraid of a hard sell; particularly important for an older demographic (30–65) | Low | Add to CTA button: "Get a Free Quote — No Obligation" |
| Local visual signals | Saskatchewan-specific imagery (the truck wrap, the Legislative Building in the logo) signals legitimacy to Regina locals — generic stock photos reduce trust | Low | Show real truck, real jobs, real local context |
| Service-area map or explicit city list | Homeowners outside Regina proper worry they won't be served; showing "Regina, White City, Emerald Park, Pilot Butte" removes hesitation | Low | Text list or simple static map image |
| Structured data (LocalBusiness schema) | Rich results in Google Search showing phone number, service area, hours — organic traffic trust signal | Medium | JSON-LD in Next.js `<Head>`; not visible on page but critical for SEO |
| Fast-loading progressive image gallery | Competitors often have galleries that feel slow or clunky on mobile; a snappy, well-optimized gallery is a perceptible differentiator | Medium | next/image with blur placeholders; WebP; lazy load below fold |
| Facebook Pixel integration | Enables retargeting audiences from ad traffic; allows "people who visited my site" campaign targeting — significant ad efficiency gain over time | Low | One script tag in `_app.tsx` or Next.js Script component |
| Visible service guarantees / promise | Something like "We leave the space broom-clean or we come back" — not a legal guarantee, just a stated standard — increases trust significantly | Low | 1–2 sentences near contact section |

**Confidence:** HIGH for sticky CTA, schema, pixel, OG tags. MEDIUM for comparison slider
vs grid preference (depends on specific audience; both perform well). LOW for service-area
map specifically (best practice inference from local SEO literature, not split-test data).

---

## Anti-Features

Things that actively hurt conversions for this type of site. Deliberately NOT building these
is as important as building the right things.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Entry popups / exit-intent popups | For Facebook ad traffic especially, any popup that fires immediately or on first scroll destroys the experience — bounce rates increase 20–40%; users feel trapped | Let the hero CTA and sticky bar do the work |
| Contact form with many fields | Each field is a conversion drop-off point; for trades/home services the phone is faster and more trusted by the target demographic (30–65) | Phone button + Facebook DM button only — this is already in PROJECT.md |
| Navigation with many links | Ad landing traffic should be funneled, not free to wander; a large nav gives users escape routes before they've seen the pitch | Minimal or no nav on the landing page; maybe just logo + phone |
| Video autoplaying with sound | Destroys mobile experience; users on public transit or with data limits will immediately close the tab | If video is used: autoplay muted, user-initiated sound |
| Pricing page | Kills calls by enabling price comparison and self-disqualification; owner has correctly scoped this out | Direct all price questions to call/message |
| Testimonials carousels | Auto-advancing carousels are a known conversion killer (NNG research); users don't read them | Static testimonial quotes if added, not a carousel |
| Multiple competing CTAs in hero | "Call us OR book online OR fill this form OR email us" — decision paralysis reduces conversions vs a single clear action | One primary CTA (call), one secondary (Facebook DM) |
| Heavy JavaScript animations / scroll effects | Parallax, scroll-triggered reveals, entrance animations all add JS weight and delay first meaningful paint; on a slow mobile connection they feel broken before they feel impressive | CSS transitions only; no heavy animation libraries |
| Stock photography of smiling people | Local service users distrust generic stock; a smiling stock-photo team when this is a one-person operation creates cognitive dissonance | Real photos of real jobs and real people from the business |
| Chat widget (third-party) | Adds 50–150KB+ of JS, fires a popup-style bubble, and the target demographic is more likely to call than chat; adds maintenance burden | Phone + Facebook Messenger covers the same use case |
| Cookie consent banners (if avoidable) | For a static site with no tracking beyond a Facebook Pixel, GDPR/CASL consent may not be required for Canadian visitors; an unnecessary banner adds friction | Confirm with owner; if only Facebook Pixel is used, banner may not be legally required for Canadian-only traffic |
| Testimonials section (per owner decision) | Owner has explicitly scoped this out in favour of stronger CTA — this is the right call for a new business without a large review base | Let the before/after photos do the social proof work |

**Confidence:** HIGH for popup, form, autoplaying video, stock photo anti-patterns —
well-documented in CRO literature. MEDIUM for cookie banner (CASL specifics should be
confirmed). LOW for chat widget specifically (some demographics do use chat, but for
this audience/context the risk/benefit is unfavorable).

---

## Before/After Gallery: UX Pattern Recommendation

This is the highest-stakes UX decision for this site. Three main patterns exist:

### Pattern 1: Comparison Slider (Recommended for hero/featured jobs)
**How it works:** Single image split by a draggable/swipeable divider. User drags to reveal
before vs after.
**Why it wins on mobile:** Tactile, interactive, creates an "aha" moment when the
transformation is revealed. Drives engagement time. Works naturally with swipe gesture.
**Limitations:** Works best for a single "hero" job. Breaks down as a browsing pattern
for 10+ photos.
**Recommendation:** Use one comparison slider for the single most dramatic transformation
as a hero element in the gallery section. This is the "proof" moment.

### Pattern 2: Scroll-snap Grid (Recommended for browsing multiple jobs)
**How it works:** CSS grid of before/after pairs (side by side on desktop, stacked on
mobile). Users scroll through jobs.
**Why it works:** Fast to scan, no interaction required, every job gets equal visibility.
**Limitations:** Less emotionally engaging than a slider; users don't "earn" the reveal.
**Recommendation:** Use below the hero slider for 4–8 additional job pairs. Label each
with service type.

### Pattern 3: Lightbox Gallery
**How it works:** Thumbnails open to full-screen overlay with prev/next navigation.
**Why NOT for this use case:** Adds JS complexity, breaks native scroll behavior on mobile,
traps the user away from the CTA. Good for portfolio sites, poor for conversion pages.
**Recommendation:** Skip unless the owner explicitly wants full-screen viewing of
specific photos.

**Summary recommendation:** Hero comparison slider (1 job) + scrollable grid of labeled
job pairs below. No lightbox.

**Confidence:** MEDIUM — slider vs grid preference is context-dependent; both are valid.
The anti-lightbox recommendation is HIGH confidence for a conversion-focused page.

---

## CTA Placement and Copy Patterns

### Placement (in order of conversion priority)

1. **Hero section** — Primary CTA above the fold, every time. For mobile Facebook traffic,
   this is where the highest-intent users convert. Make it impossible to miss.
2. **After the gallery** — Users who've just seen the before/afters are at peak
   emotional interest. Place a CTA immediately after the last photo.
3. **After the services section** — Users considering "do they do what I need?" convert
   here once the answer is yes.
4. **Sticky bottom bar (mobile)** — Always-visible fallback for users who've scrolled
   past all CTAs. Essential for mobile.
5. **Footer** — Low-intent final fallback; phone number and Facebook link minimum.

### Copy patterns that work for trades/home services

**DO use:**
- "Get a Free Quote" — removes financial commitment anxiety
- "Call Now — 306-942-1617" — specificity (actual number visible) builds trust
- "Message Us on Facebook" — matches the channel they came from
- "No obligation, no hassle" — reduces fear of hard sell
- Verbs first: "Call", "Get", "Message" not "You can contact us at..."

**DO NOT use:**
- "Learn More" — too passive; doesn't tell user what happens next
- "Submit" — clinical; discourages form fills
- "Contact Us" alone — vague; doesn't specify the action
- "Book Now" — implies commitment before a quote; premature for this service type

**Confidence:** HIGH — these copy patterns are validated across thousands of A/B tests
published by Unbounce, VWO, and CXL through 2024.

---

## Contact Section Patterns

### Phone vs Form vs Chat for Trades/Home Services

**Phone wins for this use case.** Reasons:
- Target demographic is 30–65 — this group strongly prefers phone for service businesses
- Garage cleanout requires a site visit or at least a conversation to quote — the phone
  call IS the first step in the sales process, not an obstacle to it
- Form submissions for trades frequently go to spam, get missed, or create a 24-hour
  lag that loses the job to a competitor who answers the phone
- Facebook Messenger covers the "I prefer text" demographic without adding a form

**Recommended contact section structure:**
1. Bold headline: "Ready to Reclaim Your Garage?"
2. One sentence of reassurance: "We'll give you a straight answer on price — no
   runaround."
3. Large tap-to-call button: "Call 306-942-1617"
4. Secondary button: "Message Us on Facebook"
5. Optional: "We typically respond within [X hours]" — sets expectations, reduces
   uncertainty

**What to skip:**
- Email address — creates a slow channel and splits attention from phone/FB
- Multi-field contact form — adds server-side complexity for no conversion gain
- Live chat widget — adds JS weight and is ignored by this demographic

**Confidence:** HIGH for phone-first recommendation. MEDIUM for the specific copy
patterns (directionally correct, not A/B tested against this exact audience).

---

## Trust Signals: What's Effective

### High-impact for local service businesses

| Signal | Impact | Implementation |
|--------|--------|----------------|
| Real before/after photos (their own jobs) | Highest — authenticity is irreplaceable | Owner-provided photos; no stock |
| Stated service guarantee / promise | High — reduces perceived risk of hiring | 1–2 sentences near contact CTA |
| Local specificity (Regina, SK; their truck; their logo) | High — "they're from here" is a trust proxy | Show truck, mention neighborhoods, use local logo |
| Explicit service area statement | Medium-high — removes the "do you serve me?" friction | Text in hero or just below |
| Phone number visible (not buried) | Medium-high — "real businesses have real phone numbers" | In header, hero, and footer minimum |
| Facebook page link (with real reviews/posts) | Medium — links back to their established social presence | Facebook button links to actual business page |
| Years in business / jobs completed | Medium — only if numbers are real and meaningful | "50+ garages transformed in Regina" if accurate |
| Certifications / insurance badges | Low-medium for cleanout (higher for electrical/HVAC) | Only add if actually insured and it differentiates |
| BBB badge or local awards | Low — users don't look at these closely; adds visual clutter | Skip unless specifically requested |

### What to avoid in trust signals
- Fake review widget (copied Google reviews displayed in a carousel) — legally grey and users increasingly recognize them as fake
- Stock "5 gold stars" graphics without context — meaningless
- "100% Satisfaction Guaranteed!" in large bold text without explanation — reads as a sales cliche, not a real commitment

**Confidence:** HIGH for real photos and phone number. MEDIUM for guarantee copy.
LOW for the relative ranking of certifications vs other signals (industry-specific variance).

---

## Mobile-First Patterns for Facebook Ad Traffic

Facebook ad traffic has specific characteristics that differ from organic search:

1. **Cold traffic** — user did not search for this service; the ad created the interest.
   The page must earn trust from zero, not build on existing intent.
2. **Mobile-dominant** — 80–90% of Facebook ad clicks come from mobile devices.
3. **Short attention** — average session from paid social is 30–60 seconds before bounce
   decision is made. The above-fold experience is everything.
4. **Context-aware** — user just saw an ad (likely with a photo). The landing page should
   feel like a direct continuation of that ad. Headline, offer, and visual should match.

### Specific implementations for this site

| Pattern | Implementation |
|---------|---------------|
| Ad scent / message match | If the ad shows a cluttered garage, the hero image should also show a cluttered-to-clean transformation — not a logo or abstract graphic |
| Above-fold social proof | At least one before/after photo or a "50+ garages transformed" stat visible without scrolling |
| Single-column layout | No sidebars, no multi-column above-fold content; single column for full-width readability on 375–430px screens |
| Touch target sizing | All buttons minimum 44x44px; CTAs ideally 54–60px tall; phone number links fat enough to tap without zooming |
| Reduced top nav weight | A large sticky header eats above-fold space on mobile; either hide it or make it thin (logo + phone number only) |
| Preloaded hero image | The before/after or hero image should be in the `<head>` as a preload or use `priority` on next/image to avoid layout shift |
| No horizontal scroll | Common failure mode for mobile-first builds; test at 375px width aggressively |

**Confidence:** HIGH for mobile layout patterns and Facebook ad traffic behavior. These
are well-documented in Facebook's own Business Help Center and Google's mobile UX guidelines.

---

## Feature Dependencies

```
Facebook Pixel → Requires Facebook ad account (owner has this)
Structured data (LocalBusiness schema) → Requires accurate NAP (Name, Address, Phone)
Before/after slider → Requires real photos from owner
Service-area text → Requires owner confirmation of served areas
Open Graph tags → Requires a specific OG image (recommend creating one from logo assets)
Sticky CTA bar → Depends on hero section height (must appear after hero scrolls off)
```

---

## MVP Recommendation

Based on the project context (Facebook ad traffic, phone/DM conversion goal, owner has
real photos, no backend needed):

**Build first (phase 1 — converts immediately):**
1. Hero with headline, service area, and tap-to-call + Facebook DM buttons
2. Before/after gallery (1 comparison slider + grid of pairs)
3. Services section (4 services, brief descriptions)
4. Contact section (phone + Facebook, with reassurance copy)
5. Open Graph tags (Facebook preview)
6. Sticky bottom CTA bar (mobile)
7. LocalBusiness structured data

**Build second (phase 2 — retention and discovery):**
1. Facebook Pixel
2. Service-area statement (text or map)
3. Guarantee / promise statement near contact
4. Performance optimization pass (WebP, blur placeholders, Core Web Vitals)

**Defer indefinitely:**
- Testimonials carousel: owner preference, and before/afters do this job better
- Pricing page: owner preference, strategically correct
- Contact form: adds complexity with no conversion gain for this use case
- Chat widget: wrong channel for demographic, adds JS weight
- Lightbox gallery: JS overhead without conversion benefit

---

## Sources

**Confidence note:** WebSearch and WebFetch were unavailable during this research session.
All findings are synthesized from:
- Established CRO research from CXL/ConversionXL, Unbounce, and Nielsen Norman Group
  (published through 2025, drawn from training knowledge)
- Google's Core Web Vitals and mobile UX documentation
- Facebook's Business Help Center guidance on landing pages for paid social
- Industry pattern analysis for home services / trades verticals
- Direct alignment with decisions already documented in PROJECT.md

**Where to verify before building:**
- CASL cookie consent requirements for Facebook Pixel on Canadian sites
  (gov.gc.ca/casl or a Canadian privacy lawyer for definitive answer)
- Facebook Pixel current implementation syntax (Meta for Developers docs)
- next/image `priority` prop behavior in current Next.js version
  (nextjs.org/docs/api-reference/next/image)

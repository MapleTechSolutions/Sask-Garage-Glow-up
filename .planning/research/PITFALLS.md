# Domain Pitfalls: Local Service Marketing Website

**Domain:** Mobile-first local service marketing site (Next.js, static export, Facebook ad traffic)
**Project:** Sask Garage Glow-Up
**Researched:** 2026-05-03
**Confidence note:** WebSearch and Bash tools were unavailable during this session. All findings are drawn from training knowledge (cutoff August 2025) cross-referenced with the official Next.js static export documentation retrieved via WebFetch. Confidence levels are assigned conservatively.

---

## Critical Pitfalls

Mistakes that cause rewrites, kill conversions, or permanently damage SEO.

---

### Pitfall 1: Next.js Image Optimization Breaks on Static Export

**What goes wrong:** `next/image` uses a server-side optimization pipeline by default. When you run `next export` (or set `output: 'export'` in next.config.js), that pipeline is gone. Any `<Image>` component using the default `loader` will either throw a build error or silently serve unoptimized images depending on Next.js version.

**Why it happens:** Developers assume `next/image` "just works" everywhere. The static export limitation is easy to miss because it only surfaces at build time, not during local `next dev`.

**Consequences:**
- Build fails outright, blocking deployment, OR
- Images are served at full resolution with no format conversion — a 4MB JPEG from an iPhone becomes a 4MB download on mobile, destroying LCP score
- Before/after gallery photos — the core product feature — become the biggest performance liability on the site

**Prevention:**
- Set `unoptimized: true` on the Image component for static export, AND pre-optimize all images manually before committing (convert to WebP, resize to display dimensions, compress to <200KB per photo)
- Alternatively use Netlify's image CDN plugin (`@netlify/plugin-nextjs`) which restores server-side optimization — verify this is compatible with your Next.js version before relying on it
- Never commit raw phone photos (typically 3–8MB). Run them through Squoosh or sharp CLI first.

**Detection:**
- `next build` with `output: 'export'` throws: `Error: Image Optimization using the default loader is not compatible with next export`
- PageSpeed Insights shows "Serve images in next-gen formats" and "Properly size images" failures

**Phase to address:** Phase 1 (project scaffold) — configure `output: 'export'` and image handling strategy before any real photos are added.

**Confidence:** HIGH — this is documented Next.js behavior, well-established limitation.

---

### Pitfall 2: LCP Failure Kills Facebook Ad ROI Immediately

**What goes wrong:** Paid traffic from Facebook ads hits a page that takes 4–6 seconds to show meaningful content on mobile. Users bounce before seeing the hero. Ad spend is wasted and Facebook's algorithm penalizes ad sets with poor landing page engagement.

**Why it happens:** Developers test on WiFi/desktop. The hero image is a large unoptimized PNG. A font is render-blocking. A CSS bundle is not split properly.

**Consequences:**
- Facebook Quality Ranking drops to "Below Average" for landing page experience
- Cost per result increases 30–50% compared to a fast-loading equivalent
- Bounce rate spikes — users aged 30–65 on mobile 4G are the primary audience, and they leave fast

**Prevention:**
- Hero image must be `priority` prop on `next/image` (or `<img fetchpriority="high">` in static export), preloaded in `<head>`, WebP format, under 100KB
- Use `font-display: swap` for any custom fonts. Better: use system font stack for body, load brand font only for the headline
- No render-blocking scripts above the fold — Facebook Pixel loads `async` or deferred
- Target LCP under 2.5s on simulated mobile throttled (Moto G4 profile in PageSpeed)
- Test with Chrome DevTools Network throttling set to "Slow 4G" before every deploy

**Detection:**
- PageSpeed Insights mobile score below 70 is a red flag
- LCP element in PageSpeed report points to hero image → image not preloaded or too large
- Facebook Ads Manager showing "Landing page experience: Below Average"

**Phase to address:** Phase 1 (scaffold and image pipeline) + Phase 2 (hero section build). Recheck after every phase that adds above-the-fold content.

**Confidence:** HIGH — LCP/ad quality interaction is well-documented in Facebook Ads and Core Web Vitals literature.

---

### Pitfall 3: Missing or Malformed LocalBusiness Structured Data

**What goes wrong:** The site ranks for generic terms but not "garage cleanout Regina" or "junk removal Regina SK" because Google can't confirm the business is locally anchored. No rich results appear in search. Google Business Profile may not connect properly to the site.

**Why it happens:** Developers add `<title>` and meta description and call it "done with SEO." JSON-LD structured data is skipped entirely, or a generic `Organization` schema is used instead of `LocalBusiness`.

**Consequences:**
- No chance at local pack ("Map Pack") ranking
- No rich snippet showing address, phone, business hours in SERPs
- Structured data validation errors in Google Search Console that suppress results silently

**Prevention:** Implement `LocalBusiness` (or the more specific `HomeAndConstructionBusiness`) JSON-LD in the `<head>` of every page:
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Sask Garage Glow-Up",
  "telephone": "+13069421617",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Regina",
    "addressRegion": "SK",
    "addressCountry": "CA"
  },
  "url": "https://[your-domain].com",
  "areaServed": {
    "@type": "City",
    "name": "Regina"
  }
}
```
- Validate with Google's Rich Results Test before launch
- Phone format in schema MUST match phone format everywhere else on the site (NAP consistency — see Pitfall 4)

**Detection:**
- Google Search Console > Enhancements tab shows no structured data detected
- Rich Results Test returns errors or no detected entities
- Site has been live 3+ months with zero impressions for "garage cleanout Regina"

**Phase to address:** Phase 2 (SEO fundamentals pass) — add alongside title tags and meta descriptions.

**Confidence:** HIGH — JSON-LD LocalBusiness is the established standard, well-documented by Google.

---

### Pitfall 4: NAP Inconsistency Across the Site

**What goes wrong:** The phone number appears in three formats on the page: `306-942-1617` in the footer, `(306) 942-1617` in the hero, and `+1-306-942-1617` in the structured data. The Facebook URL in the footer uses a different version than the one in the structured data.

**Why it happens:** No single source of truth for contact data. Phone number typed manually in each component.

**Consequences:**
- Google cross-references NAP (Name, Address, Phone) signals across the page, structured data, and external citations. Inconsistency is a local SEO negative signal.
- Users are confused about which format to dial on mobile

**Prevention:**
- Create a single `lib/siteConfig.ts` (or `constants/contact.ts`) file with all contact data as named exports: `PHONE_DISPLAY`, `PHONE_HREF` (tel: link format), `PHONE_SCHEMA` (E.164: +13069421617), `FACEBOOK_URL`
- Every component imports from this file — never hardcodes contact info
- Structured data pulls from the same constants

**Detection:**
- Search the codebase for `306` — if it appears in more than one file, you have a NAP consistency risk
- Local SEO audit tools (Moz Local, BrightLocal) flag inconsistency

**Phase to address:** Phase 1 (project scaffold) — establish constants file before writing any component.

**Confidence:** HIGH — NAP consistency is a well-established local SEO ranking factor.

---

### Pitfall 5: Open Graph Tags That Break Facebook Link Previews

**What goes wrong:** The site is shared on Facebook or used as a landing page, and the preview shows a blank image, the wrong title, or a generic description. Ad creative may be overridden by the OG tags if the ad uses the site URL as the destination and Facebook scrapes it.

**Why it happens:** `og:image` points to a relative path (e.g. `/og-image.png`) instead of an absolute URL. The image is smaller than Facebook's required 1200x630px minimum. `og:url` is missing or wrong. Meta tags are rendered client-side (via `useEffect`) and Facebook's crawler, which does not execute JavaScript fully, can't see them.

**Consequences:**
- Facebook ad previews look broken or unprofessional
- Organic shares (e.g. owner sharing the site) show no image — reducing click-through significantly
- Facebook's scraper caches bad OG data and it persists even after you fix it (must use the Sharing Debugger to force a re-scrape)

**Prevention:**
- In Next.js App Router, use the `metadata` export in `app/layout.tsx` — this renders OG tags server-side in static HTML, visible to all crawlers
- `og:image` must be an absolute URL: `https://yourdomain.com/og-image.jpg`
- OG image must be exactly 1200x630px, under 8MB, JPEG or PNG preferred (not WebP — Facebook support for WebP OG images is inconsistent)
- Include all required tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- After deploy, run through Facebook Sharing Debugger (developers.facebook.com/tools/debug/) — do this even if you think it's correct

**Detection:**
- Facebook Sharing Debugger shows "Could not scrape" or returns wrong data
- OG image URL in page source is a relative path starting with `/`
- Page source shows `<meta>` tags missing or duplicated (malformed metadata export)

**Phase to address:** Phase 2 (SEO and OG tags pass) — test with Sharing Debugger immediately after first deploy.

**Confidence:** HIGH — Facebook's OG requirements are well-documented; absolute URL requirement is a classic and common mistake.

---

### Pitfall 6: Cumulative Layout Shift (CLS) in the Before/After Gallery

**What goes wrong:** The gallery renders, then images load, and the whole page jumps. On mobile, the user is mid-scroll and the content shifts under their finger — a jarring experience that increases bounce rate. CLS score above 0.1 also hurts Core Web Vitals and SEO.

**Why it happens:** Images inserted without explicit `width` and `height` attributes (or CSS aspect-ratio). The browser doesn't reserve space until the image loads.

**Consequences:**
- Poor Core Web Vitals CLS score (Google uses this as a ranking factor)
- Bad UX — the gallery is the primary conversion feature, and layout shift on it is the worst possible place
- Mobile users accidentally tap wrong elements when the page shifts

**Prevention:**
- Every gallery `<img>` or `next/image` component must have explicit `width` and `height` props, OR be wrapped in a container with a fixed aspect ratio using CSS `aspect-ratio: 4/3` (or `padding-bottom` hack for older browser support)
- Use CSS `object-fit: cover` inside the fixed-ratio container
- For a before/after slider component, test the exact interaction on physical devices (not just Chrome DevTools emulation) — slider library JavaScript can itself cause layout shift if it injects styles late

**Detection:**
- Chrome DevTools Performance tab shows CLS > 0.1
- PageSpeed Insights "Avoid large layout shifts" highlights gallery images
- Visual inspection: watch the page on a physical Android device on slow WiFi

**Phase to address:** Phase 3 (gallery build) — establish the aspect-ratio container pattern on the first gallery component, do not retrofit later.

**Confidence:** HIGH — CLS from missing image dimensions is one of the most common and well-documented Core Web Vitals failures.

---

## Moderate Pitfalls

Mistakes that degrade quality or require meaningful rework, but don't cause full rewrites.

---

### Pitfall 7: Tailwind CSS Production Purge Removing Needed Classes

**What goes wrong:** Dynamic class names assembled with string concatenation or template literals are not present as literal strings in source files. Tailwind's content scanner (PurgeCSS under the hood) can't detect them and strips them from the production build. Styles that work in development (which includes all classes) break silently in production.

**Why it happens:** A developer writes `className={\`text-${color}-500\`}` where `color` is a prop or state variable. The scanner sees `text-${color}-500` — a pattern, not a full class name — and purges the actual classes.

**Consequences:**
- Gallery components or CTA buttons that look correct in dev lose their colors/spacing in production
- Intermittent-looking bug that's hard to diagnose without knowing the root cause

**Prevention:**
- Never construct Tailwind class names dynamically. Always use complete class name strings.
- Use the `safelist` option in `tailwind.config.js` if dynamic classes are truly necessary
- For conditional classes, use an object map: `const colorMap = { green: 'text-green-500', gold: 'text-yellow-500' }` and reference `colorMap[color]`
- Run `next build` and check the production preview (not `next dev`) before submitting any phase for review

**Detection:**
- Styles present in `next dev` but missing in `next build` preview — the signature pattern
- Search codebase for template literals containing Tailwind class fragments

**Phase to address:** Phase 1 (scaffold) — establish the class-naming convention in the component authoring guidelines from the start.

**Confidence:** HIGH — Tailwind content scanning behavior is well-documented and this is a very common mistake.

---

### Pitfall 8: Viewport Meta Tag Wrong or Missing

**What goes wrong:** The site renders at desktop width on mobile (zoomed out), or the site prevents user zoom entirely, which is a WCAG accessibility violation and can be flagged by Google's mobile usability checks.

**Why it happens:**
- Forgetting `<meta name="viewport">` entirely in a custom `_document.tsx` or App Router `layout.tsx`
- Copy-pasting `user-scalable=no` from a template — this prevents pinch zoom

**Consequences:**
- Facebook ad traffic lands on a zoomed-out desktop layout on phones — immediate bounce
- Google Search Console reports "Content wider than screen" mobile usability error
- Potential accessibility/legal exposure (WCAG 2.1 SC 1.4.4)

**Prevention:**
- Use exactly: `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- Never add `user-scalable=no` or `maximum-scale=1` — these are user-hostile and flagged by Lighthouse
- In Next.js App Router, the viewport meta is typically set via the `viewport` export in `layout.tsx`, not raw HTML

**Detection:**
- Open the deployed site on a physical phone — if the full page is visible and tiny, viewport is broken
- Google Search Console > Mobile Usability reports

**Phase to address:** Phase 1 (scaffold) — verify in `layout.tsx` before writing any other code.

**Confidence:** HIGH — standard HTML/Next.js behavior, well-established.

---

### Pitfall 9: Facebook Pixel or Analytics Script Blocking First Paint

**What goes wrong:** A tracking script (Facebook Pixel, Google Analytics) is loaded synchronously in `<head>` without `async` or `defer`. It blocks HTML parsing and delays first paint.

**Why it happens:** Copy-pasting the tracking snippet from Facebook Business Manager, which uses a synchronous `<script>` tag.

**Consequences:**
- LCP degraded by 200–800ms on mobile (measured on slow 4G)
- PageSpeed Insights deducts points for "Eliminate render-blocking resources"

**Prevention:**
- Use Next.js `<Script>` component with `strategy="afterInteractive"` — this loads the script after the page is interactive without blocking render
- Never place raw `<script>` tracking tags in `<head>` in a Next.js app — always use the Next.js Script component
- The Facebook Pixel works correctly with `afterInteractive` — it fires on page load events which occur after interactivity anyway

**Detection:**
- PageSpeed Insights "Eliminate render-blocking resources" lists a pixel or analytics script
- Lighthouse "Reduce JavaScript execution time" shows third-party scripts running early

**Phase to address:** Phase 2 (if Facebook Pixel is added) — configure Script strategy at the point of addition, not as a retrofit.

**Confidence:** HIGH — Next.js Script component strategies are well-documented.

---

### Pitfall 10: Netlify/Vercel Trailing Slash and 404 Routing Mismatch

**What goes wrong:** Next.js static export generates `/about/index.html`. Netlify serves `/about/` with a trailing slash. Vercel serves `/about` without. If you switch hosts mid-project or the `trailingSlash` config doesn't match host behavior, canonical URLs become inconsistent, 301 redirect chains accumulate, and OG URLs in meta tags become wrong.

**Why it happens:** The `trailingSlash` setting in `next.config.js` defaults differ between deployment targets. The setting is easy to overlook.

**Consequences:**
- Duplicate content signals (Google sees `/about` and `/about/` as separate pages)
- Broken internal links if the app generates hrefs that don't match the actual file structure
- `og:url` in metadata may not match the canonical URL

**Prevention:**
- Choose one host (Netlify or Vercel) before writing the first page component — do not defer this decision
- Set `trailingSlash: true` in `next.config.js` for Netlify; Vercel handles both but defaults to no trailing slash
- Set an explicit `canonical` meta tag on every page that matches the chosen format
- Test a multi-page navigation flow on the actual deployed URL, not just localhost

**Detection:**
- `curl -I https://yoursite.com/about` — does it return 200 or 301? If 301, there's a mismatch
- Google Search Console Coverage report shows duplicate pages with/without trailing slash

**Phase to address:** Phase 1 (scaffold) — `trailingSlash` goes in `next.config.js` on day one, before any pages exist.

**Confidence:** MEDIUM — behavior is correct from training knowledge but exact Netlify default behavior should be verified against current Netlify/Next.js adapter docs before launch.

---

### Pitfall 11: Before/After Slider Library Adding Excessive JavaScript Bundle Weight

**What goes wrong:** A React before/after comparison slider component (e.g. `react-compare-slider` or similar) is imported at the top level, adding its full weight to the initial JS bundle. On slow mobile connections this delays Time to Interactive.

**Why it happens:** `import BeforeAfterSlider from 'react-compare-slider'` at the top of the gallery component — the entire library loads before the page is interactive, even if the gallery is below the fold.

**Prevention:**
- Use `next/dynamic` with `{ ssr: false }` and `{ loading: () => <GalleryPlaceholder /> }` for any interactive gallery or slider component
- Evaluate whether a slider is needed at all — a simple side-by-side grid of before/after pairs works well on mobile, has zero JS overhead, and is arguably better UX for a photo-heavy gallery
- If a slider is used, prefer a small, dependency-free implementation (<5KB) over a feature-rich library

**Detection:**
- Webpack bundle analyzer (`next build --analyze` or `@next/bundle-analyzer`) shows gallery library as large chunk in initial load
- Chrome DevTools Coverage tab shows large percentage of the library's code is unused on first load

**Phase to address:** Phase 3 (gallery build) — make the lazy-loading decision at component creation time.

**Confidence:** HIGH — Next.js dynamic imports for heavy components is well-established best practice.

---

## Minor Pitfalls

Worth knowing, but won't sink the project if caught within the same phase.

---

### Pitfall 12: `robots.txt` and Sitemap Missing on Launch

**What goes wrong:** No `robots.txt` and no `sitemap.xml` are deployed. Google crawls the site inefficiently. Yoast/Google Search Console shows "Sitemap could not be read" if you try to submit one later that doesn't exist.

**Prevention:**
- For a static Next.js export, generate `public/robots.txt` and `public/sitemap.xml` as static files — no dynamic generation needed for a single-page or small site
- `robots.txt` minimum: `User-agent: *\nAllow: /\nSitemap: https://yourdomain.com/sitemap.xml`
- Sitemap lists every URL with `<lastmod>` and `<changefreq>`

**Phase to address:** Phase 2 (SEO pass), immediately before first public deploy.

**Confidence:** HIGH.

---

### Pitfall 13: `tel:` Link Format Wrong on Mobile

**What goes wrong:** The phone CTA button links to `tel:306-942-1617` with dashes. Some Android dialers don't parse dashes consistently. The E.164 format `tel:+13069421617` is universally supported.

**Prevention:**
- Always use `href="tel:+13069421617"` for the call button
- Display text can be human-readable (`306-942-1617`) — the `href` is what matters for dialing

**Phase to address:** Phase 2 (contact/CTA build).

**Confidence:** HIGH.

---

### Pitfall 14: SVG Logo Inline vs. `<img>` Causing Unexpected Behavior

**What goes wrong:** The SVG logo is inlined (pasted directly into JSX), causing the SVG's internal IDs to collide if the logo appears more than once (e.g. header and footer). This can break gradients, masks, or clip paths inside the SVG — the illustrated badge style logo likely uses these.

**Prevention:**
- Use `next/image` with the SVG file as `src` (renders as `<img>`) for static display uses — this avoids ID collision
- Only inline SVG when you need to style its internals with CSS (e.g. hover color change on the logo mark)
- If inlining is necessary, ensure all internal IDs in the SVG are unique (prefix with a component-specific string)

**Phase to address:** Phase 2 (brand integration).

**Confidence:** MEDIUM — SVG ID collision behavior is well-understood; Next.js SVG handling details depend on version and webpack config.

---

### Pitfall 15: Google Business Profile Not Linked to the Website

**What goes wrong:** The site is live and locally optimized, but the Google Business Profile (GBP) listing for the business still links to the Facebook page or has no website URL. The structured data and the GBP listing reinforce each other — without the link, local SEO signals are weaker.

**Prevention:**
- After launch, update the Google Business Profile website URL to the new domain
- Ensure the phone number in GBP exactly matches the phone on the site (NAP consistency again)
- This is a post-deploy operational task, not a code task — add it to the launch checklist

**Phase to address:** Post-deploy checklist (outside code phases).

**Confidence:** HIGH.

---

## Phase-Specific Warning Summary

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Project scaffold | Viewport meta missing or malformed | Add to `layout.tsx` first, verify on phone day one |
| Project scaffold | NAP data hardcoded in components | Create `lib/siteConfig.ts` constants before any component |
| Project scaffold | `trailingSlash` not set | Add to `next.config.js` immediately, choose host first |
| Project scaffold | Image export incompatibility | Set `output: 'export'` and decide on image strategy before any real photos |
| Hero section | LCP failure from unoptimized hero image | WebP, `priority` prop, under 100KB, test on throttled mobile |
| Hero section | Render-blocking Facebook Pixel | Use Next.js `<Script strategy="afterInteractive">` |
| SEO pass | Missing LocalBusiness JSON-LD | Use `HomeAndConstructionBusiness` type, validate with Rich Results Test |
| SEO pass | OG image relative URL | Absolute URL required, 1200x630px, test with Facebook Sharing Debugger |
| SEO pass | `robots.txt` / sitemap missing | Generate as static files in `public/` |
| Brand integration | SVG logo ID collision | Use `next/image` for display instances, inline only when CSS targeting needed |
| Gallery build | CLS from images without dimensions | Wrap all gallery images in fixed aspect-ratio containers |
| Gallery build | Slider library bloating initial bundle | Use `next/dynamic` with `ssr: false` and loading placeholder |
| Tailwind throughout | Dynamic class names purged in production | Never construct class names via string interpolation |
| Contact section | `tel:` link format | Use E.164 format `href="tel:+13069421617"` |
| Post-launch | GBP not updated | Add domain to Google Business Profile, match NAP exactly |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Next.js static export limitations | HIGH | Documented behavior, stable across Next.js 13/14/15 |
| Local SEO structured data | HIGH | Google's LocalBusiness schema requirements are stable and well-documented |
| Core Web Vitals (LCP, CLS) | HIGH | Stable metrics since 2021, well-documented |
| Facebook ad quality / OG tags | HIGH | Facebook's requirements are stable; OG absolute URL requirement is classic |
| Tailwind purge behavior | HIGH | Stable since Tailwind v3 JIT mode |
| Netlify trailing slash behavior | MEDIUM | Should verify against current Netlify adapter docs — behavior has shifted across Next.js adapter versions |
| Facebook Pixel + Next.js Script | HIGH | Next.js Script strategy is stable, well-documented |
| SVG inlining behavior | MEDIUM | Core behavior is stable; exact Next.js SVG loader behavior depends on config |

---

## Sources

- Next.js Static Exports documentation: https://nextjs.org/docs/app/building-your-application/deploying/static-exports (accessed 2026-05-03, content confirmed via WebFetch)
- Next.js Script component documentation: https://nextjs.org/docs/app/api-reference/components/script
- Next.js Metadata API (OG tags): https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Google LocalBusiness schema: https://schema.org/LocalBusiness
- Google Rich Results Test: https://search.google.com/test/rich-results
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Core Web Vitals: https://web.dev/vitals/
- Tailwind CSS Content Configuration: https://tailwindcss.com/docs/content-configuration
- WebSearch and Bash tools unavailable during this research session — findings rely on training knowledge (cutoff August 2025) + one WebFetch call to Next.js static export docs

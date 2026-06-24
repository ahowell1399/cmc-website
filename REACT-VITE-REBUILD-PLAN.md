# Creative Modular Construction (cmcmod.com) â€” Final Rebuild Implementation Plan

**Status:** Ready to execute. Supersedes the unified draft. All blocker/high findings from adversarial review have been verified against the live site and folded in.
**Date:** 2026-06-24

---

## 1. Executive Summary (plain language for the owner)

We are rebuilding cmcmod.com from scratch as a fast, modern website that you actually own and can keep up to date. Three things matter to you:

1. **No more 502 errors.** Today's crash is caused by Namecheap's "Supersonic CDN" being stacked in front of your Duda site â€” an unsupported setup (documented in `502-duda-namecheap-fix.md`, and confirmed live: your web address currently round-robins about 1 in 3 visitors through the Supersonic IP). The new site lives on **Netlify**, which has its own built-in speed layer and security certificate. We permanently remove Supersonic and never put any second proxy in front of the new site.
2. **Your Google rankings carry over.** Every existing web address stays the same. Importantly, your live site has **ten** indexed pages, not six â€” there are also `/projects`, `/partners`, `/community-partners`, and `/news`. We preserve all ten (rebuild or redirect), so you keep the search traffic you already have. Search engines see fully-built pages.
3. **You can edit it yourself â€” once the CMS is live.** We are committing to a simple admin login at `cmcmod.com/admin` as part of launch (not optional). You fill in forms, drag in photos, click Publish, and the site updates about a minute later â€” no developer call needed. (Until that admin is live, content changes go through the developer; we will not ask a non-technical owner to edit code on GitHub.)

You keep your domain. Hosting is effectively free. The brown-and-white puppy photo is placeholder content and gets replaced with real building / 7 Brew photography â€” **which you need to supply** (see Section 9 and Section 15).

**Honest timeline:** roughly **2â€“3 developer-weeks of elapsed work**, and the true critical path is **you delivering photos and the full text** (the 14 FAQ answers, the six C.H.R.I.S.T. value descriptions, project copy). The build cannot finish until that content is in hand.

---

## 2. Recommended Tech Stack (with rationale)

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **React 18 + TypeScript** | Requested. Typed content/props catch broken copy and dead links at build time. |
| Build / dev | **Vite 5** | Requested. Fast dev; Rollup production build. |
| Rendering | **`vite-react-ssg`** (SSG, not plain SPA) | Real HTML per route on first byte â†’ reliable SEO + Core Web Vitals + correct social-scraper previews. Avoids the flaky puppeteer-prerender step a bolt-on approach needs. |
| Routing | **react-router-dom v6** | One route table feeds the router, the SSG renderer, and the sitemap. |
| Styling | **Tailwind CSS 3 + `@tailwindcss/typography`** | One brand-token config re-skins the whole site; purges to a few KB; predictable for the next developer. |
| Head / meta | **react-helmet-async** | Per-route title/description/canonical/OG baked into pre-rendered head. |
| Accessible UI | **Radix UI** (`navigation-menu`, `accordion`, `dialog`) | WCAG-AA nav submenus, FAQ accordion, and focus-trapped mobile drawer out of the box. Removes hand-rolled-a11y risk. |
| Forms | **react-hook-form + zod** | Accessible, validated contact form. |
| Icons | **lucide-react** | Lightweight SVG icons (phone, socials, C.H.R.I.S.T. values). |
| Images | **`vite-imagetools` + sharp** | Build-time responsive AVIF/WebP. |
| Sitemap | **`vite-plugin-sitemap`** | Auto `sitemap.xml` + `robots.txt` from an explicit URL list (host pinned to `www`). |
| CMS | **Decap CMS 3** (launch requirement) | Git-backed visual editor at `/admin` so the owner can self-serve. |
| Host | **Netlify** (free/Starter) | Bundles hosting + global CDN + auto SSL + Forms + Identity + Git Gateway + deploy-on-push. Single vendor = simplest for a non-technical owner. |
| Analytics | **Plausible (recommended)** or GA4 | Plausible is cookieless â†’ **no consent banner required**. GA4 is free but sets cookies and triggers consent obligations. |
| Quality gates | **ESLint + Prettier**, **Vitest + Testing Library**, **Playwright + `@axe-core/playwright`** | Right-sized for a brochure site; includes automated title-parity and form tests (Section 13). |
| Package manager | **pnpm** | Fast, disk-efficient. |

**Conflict decisions:** Netlify over Vercel (Forms + Identity + Git Gateway in one place). SSG over SPA (SEO). Tailwind over CSS Modules (single-token re-skin). Decap promoted from "optional Phase 9" to a **launch requirement** (the owner is escaping a no-code tool â€” shipping without self-service editing would leave them worse off). Decap auth via Netlify Identity + Git Gateway, with **Sveltia CMS + GitHub OAuth** named as the migration target if Netlify Identity is sunset (content files are identical, so migration is config-only).

---

## 3. Project Structure (file tree)

```
cmc-website/
â”œâ”€ public/
â”‚  â”œâ”€ admin/                      # Decap CMS (launch requirement)
â”‚  â”‚  â”œâ”€ index.html               # loads decap-cms-app
â”‚  â”‚  â””â”€ config.yml               # CMS collections/fields/media + required alt-text fields
â”‚  â”œâ”€ favicon.svg                 # generated from CMC logo
â”‚  â”œâ”€ favicon.ico                 # legacy fallback
â”‚  â”œâ”€ apple-touch-icon.png        # 180x180
â”‚  â”œâ”€ site.webmanifest            # name/short_name/theme-color = brand blue
â”‚  â”œâ”€ og/                         # 1200x630 social cards per page
â”‚  â”œâ”€ __forms.html                # hidden static form: Netlify Forms field blueprint
â”‚  â””â”€ robots.txt                  # augmented by sitemap plugin
â”œâ”€ content/                       # owner-editable content (managed by Decap)
â”‚  â”œâ”€ settings/global.json        # address, phone, emails, socials, maps place URL, applyUrl
â”‚  â”œâ”€ settings/nav.json           # nav labels/order
â”‚  â”œâ”€ pages/{home,services,about,careers,contact,projects,partners,community-partners,news}.md
â”‚  â”œâ”€ projects/*.md               # repeatable portfolio items
â”‚  â””â”€ faq/careers-faq.json        # 14 Q&A pairs (full text)
â”œâ”€ src/
â”‚  â”œâ”€ main.tsx                    # vite-react-ssg entry + router
â”‚  â”œâ”€ routes.tsx                  # SINGLE SOURCE OF TRUTH: path â†’ component
â”‚  â”œâ”€ App.tsx                     # Layout + <Outlet/>
â”‚  â”œâ”€ content/
â”‚  â”‚  â”œâ”€ loader.ts                # import.meta.glob over /content â†’ typed data
â”‚  â”‚  â”œâ”€ types.ts                 # TS types mirroring CMS schema
â”‚  â”‚  â””â”€ seo.ts                   # per-route title/description/canonical/OG (verbatim from live)
â”‚  â”œâ”€ components/
â”‚  â”‚  â”œâ”€ layout/ (Header, Nav, MobileNav, Footer, CallNowButton, SkipLink)
â”‚  â”‚  â”œâ”€ seo/ (Seo.tsx, JsonLd.tsx)
â”‚  â”‚  â”œâ”€ ui/ (Button, ExternalLink, Card, Section, Container, Accordion, Picture)
â”‚  â”‚  â”œâ”€ forms/ContactForm.tsx
â”‚  â”‚  â”œâ”€ SocialLinks.tsx
â”‚  â”‚  â””â”€ media/MapEmbed.tsx       # click-to-load Google Maps (consent + perf)
â”‚  â”œâ”€ pages/ (Home, Services, About, Careers, CareersFaq, Contact,
â”‚  â”‚          Projects, Partners, CommunityPartners, News, Privacy, NotFound)
â”‚  â”œâ”€ assets/                     # source images (optimized at build)
â”‚  â”œâ”€ styles/ (index.css, tokens.css)
â”‚  â””â”€ lib/ (scrollToHash.ts, schema.ts, analytics.ts)
â”œâ”€ tests/ (e2e/*.spec.ts, unit/*.test.tsx, fixtures/titles.json)
â”œâ”€ design-assets/                 # archived Duda originals (NOT deployed)
â”œâ”€ tailwind.config.ts, vite.config.ts, tsconfig.json
â”œâ”€ netlify.toml
â”œâ”€ .env.example                   # documented env var inventory
â”œâ”€ .nvmrc                         # Node version (matches netlify.toml)
â”œâ”€ EDITING.md                     # plain-English owner editing guide
â””â”€ package.json
```

---

## 4. Routing & Page Map (URL paths preserved exactly)

`src/routes.tsx` is the single source of truth, consumed by the router, `vite-react-ssg`, and the sitemap plugin. **All titles below are transcribed verbatim from the live origin** (captured via the Host-header technique, because the public URL returns the Supersonic 502 page). The brief's claim that Home is titled "Creative Modular Construction" is **wrong** â€” verified live, Home is "Offsite Volumetric Construction | â€¦". Several pages legitimately share that title; this is the live state and is preserved as-is for parity.

| URL path | Page component | Existing `<title>` to preserve (verbatim) |
|---|---|---|
| `/` | Home | `Offsite Volumetric Construction \| Creative Modular Construction` |
| `/services` | Services | `Offsite Volumetric Construction \| Creative Modular Construction` |
| `/about` | About | `Modular Construction \| Creative Modular Construction` |
| `/careers` | Careers | `Careers in Offsite Volumetric Construction \| Creative Modular Construction` |
| `/careers-faq` | CareersFaq | `Career FAQ \| Creative Modular Construction` |
| `/contact` | Contact | `Offsite Volumetric Construction \| Creative Modular Construction` |
| `/projects` | Projects | `Creative Modular Projects \| Creative Modular Construction` |
| `/partners` | Partners | `Partnerships in Offsite Construction \| Creative Modular Construction` |
| `/community-partners` | CommunityPartners | `Community Partners in Offsite Construction \| Creative Modular Construction` |
| `/news` | News | `News on Offsite Volumetric Construction \| Creative Modular Construction` |
| `/privacy` | Privacy | `Privacy Policy \| Creative Modular Construction` (new page) |
| `*` | NotFound | branded 404, emitted as `404.html` served with HTTP 404 |

**Notes:**
- **The 4 "extra" pages are real and indexed.** Live `sitemap.xml` (pulled from the origin) lists all ten URLs; each returns 200 with a unique canonical and meta description. They must NOT 404 after cutover. Default decision: **rebuild `/projects`, `/partners`, `/community-partners`, `/news` as real lightweight routes** (content captured during rescue). If the owner decides any should fold into another page (e.g., `/projects` into the Home portfolio), replace the route with a **301 redirect** in `netlify.toml` â€” never a 404.
- **`/about#Ministry`:** the Ministry block is `<section id="Ministry">` (case-sensitive, confirmed on live `/about`). `lib/scrollToHash.ts` scrolls after layout settles (rAF/`load` + a small timeout, since react-router v6 does not auto-scroll to hash and the long page reflows as images load); `scroll-margin-top` = sticky-header height so the section isn't hidden.
- **External Apply portal** (`https://creativemodularconstructionllc.easyapply.co/`) is **NOT a route** â€” it is an `<ExternalLink>` (`target="_blank" rel="noopener noreferrer"`) in the Careers submenu and on the "SEE OUR JOB OPENINGS HERE" / "Apply Here" buttons. Its URL is stored once in `global.json` as `applyUrl`.
- **`/projects` has no detail sub-pages** on the live site (verified: only nav links present), so no `/projects/:slug` routes are needed and no project-detail URLs are at risk.
- **Canonical host = `www`** (verified: every live canonical and `og:url` is `https://www.cmcmod.com/...`, and apex 301s to www today). All routes emit `www` canonicals; `netlify.toml` force-redirects apex â†’ www to match.
- **Redirect precedence in `netlify.toml`:** (1) apexâ†’www, (2) explicit legacy 301s, (3) `.html`/trailing-slash normalization, (4) genuine 404 via `404.html` with `status = 404`. **No blanket `/* â†’ /index.html 200` SPA fallback** (it would mask 404s); the site is fully pre-rendered.

---

## 5. Component Architecture

**Global / layout**
- `Layout` â€” `SkipLink` + `Header` + `<Outlet/>` + `Footer`; injects site-wide JSON-LD once; sets `<html lang="en">`.
- `Header` â€” CMC blue logo (â†’ `/`), desktop `Nav`, persistent `CallNowButton`, `MobileNav` trigger; sticky.
- `Nav` â€” Radix NavigationMenu: Home | Careers (submenu: Career FAQ â†’ `/careers-faq`, Apply â†’ external) | Services | About (submenu: Ministry â†’ `/about#Ministry`) | Contact. Driven by `nav.json`; reads `applyUrl` from `global.json`.
- `MobileNav` â€” Radix Dialog hamburger drawer, focus-trapped, closes on navigation. **Submenus render as accordion-style expandable sections**; the external Apply link opens in a new tab and closes the drawer. `CallNowButton` z-index sits above content but below the open drawer so they never overlap.
- `CallNowButton` â€” `tel:+14178321160` (E.164), visible text "1-417-832-1160", `aria-label="Call CMC now"`, always visible, sticky on mobile.
- `Footer` â€” address, `tel:` phone, `mailto:` both emails, `SocialLinks`, Google Maps link; all from `global.json`, identical on every page; includes a footer link to `/privacy`.
- `Seo` / `JsonLd` â€” Helmet wrapper reading `seo.ts`; Organization + LocalBusiness schema.

**UI primitives**
- `Button` (primary/outline/link; renders `<a>` or `<button>`).
- `ExternalLink` â€” single shared component that applies `target="_blank" rel="noopener noreferrer"` uniformly to **all** external hrefs (Apply portal, socials, WhatsApp, Maps link). Carries an `aria-label` for icon-only variants.
- `Card`, `Section`, `Container`.
- `Picture` â€” AVIF/WebP `<picture>` with explicit width/height (no layout shift); hero gets `fetchpriority="high"`, below-fold lazy.
- `Accordion` (Radix) â€” FAQ.
- `SocialLinks` â€” icon links via `ExternalLink`, each with accessible name.
- `MapEmbed` â€” **click-to-load** placeholder (static map image + "Load map" button); injects the iframe only on click, with a `title` attribute. No third-party request until the user opts in.

**Pages**
- `Home` â€” Hero (tagline + company description) â†’ Vision statement â†’ Portfolio grid (`ProjectCard`s from `content/projects`, each "View more") â†’ features/column-graphic section. **"View more" behavior is an owner decision** (Section 15) â€” default: scroll/expand in place, no new route.
- `Services` â€” "SERVICES" heading, intro, core statement, four `ServiceCard`s (Design Assistance, In-House Fabrication, Direct-to-Client Workflow, 7BREW/CMC Partnership), then the 7BREW/CMC Partnership section (since 2020, exclusive manufacturer, ~1 â†’ 2 locations/week).
- `About` â€” "ABOUT CMC" overview (founded 2021 from ADC, notable projects, 7 Brew, differentiators) + `<section id="Ministry">`: Ministry Heart header, motto "We build people, we build buildings," six C.H.R.I.S.T. `ValueCard`s, mission statement ending "â€¦for the glory of God through His son Jesus Christ." **C.H.R.I.S.T. values are real HTML** (heading + description + small SVG icon), NOT the baked-in-text raster PNGs from Duda (those have scripture text like "Revelation 21:5" baked into pixels â€” invisible to screen readers/search and uneditable). Name + description live as structured data.
- `Careers` â€” hero, "SEE OUR JOB OPENINGS HERE" external CTA, benefits list (Retirement, Weekly Paid Bible Study, Dental, Leadership retreats, Local fitness memberships, Monthly luncheon, Vacation pay, Yearly Christmas party, Holiday pay), "Build Something That Matters," EOE statement.
- `CareersFaq` â€” hero + `Accordion` of 14 Q&A + "Email HR Dept" â†’ `mailto:hr@cmcmod.com`.
- `Contact` â€” hero ("We love to build, and it shows." + the "Share your visionâ€¦" copy), `ContactForm`, `MapEmbed`, `SocialLinks`.
- `Projects` / `Partners` / `CommunityPartners` / `News` â€” rebuilt from captured Duda content (or 301 if the owner chooses to fold them).
- `Privacy` â€” new; see Section 13.
- `NotFound` â€” branded 404.

---

## 6. Content Model & How the Owner Edits Content

**Structure (day one):** all copy lives as typed Markdown+JSON under `content/`, loaded at build via `import.meta.glob` into typed objects (`src/content/types.ts`). The 14 FAQ pairs, four service cards, six C.H.R.I.S.T. values, and portfolio projects are data arrays the components map over.

**Editing (launch requirement â€” Decap CMS):** Decap at `cmcmod.com/admin`. `public/admin/config.yml` defines collections matching the structure:
- `settings` â€” contact info, socials, `mapsPlaceUrl`, `applyUrl`, nav labels.
- `pages` â€” named fields (`hero_image`, `hero_tagline`, service-card list, C.H.R.I.S.T.-value list, etc.).
- `projects` â€” folder collection: owner clicks "New Project," it appears in the Home grid automatically.
- `faq` â€” list, drag to reorder.

**Every image field has a required `alt` text field with helper text** (a non-technical owner will otherwise upload images with no alt text, breaking accessibility). Login via Netlify Identity + Git Gateway (no GitHub account needed). Editorial Workflow enabled for drafts. Publishing commits to Git â†’ Netlify rebuilds (~1â€“2 min). **Migration note:** if Netlify Identity is sunset, switch to Sveltia CMS + GitHub OAuth â€” content files unchanged.

**Expectation-setting:** `EDITING.md` documents the publish latency (~1â€“2 min, not Duda's instant in-place edit), that new sections/layouts are a developer task, and the alt-text requirement. We do **not** present GitHub-web-UI editing as the owner's self-service path.

---

## 7. Styling & Brand System

Tailwind config defines `colors.brand = { DEFAULT, dark, light, fg }`. **The exact blue is owner-confirmed first** (ask for official hex/Pantone), then sampled from the highest-fidelity source â€” the Duda Media Manager original or SVG, from a solid interior region of a letter (not an anti-aliased edge), since the only CDN logo is a downscaled, anti-aliased PNG (max ~847px wide; the un-suffixed original returns 404). The chosen hex is recorded in `tokens.css` with a provenance comment.

Everything references `brand.*`, so one value re-skins the site. Mobile-first breakpoints (sm/md/lg); nav collapses to `MobileNav` below `md`; hero scales fluidly; cards use CSS grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`). `@tailwindcss/typography` (`prose`) styles long copy. Accessibility built in: focus-visible rings, AA-contrast pairs, `scroll-margin-top` for the Ministry anchor, `prefers-reduced-motion` respected. `theme-color` (manifest + meta) = brand blue. CSS fully purged â†’ a few KB.

---

## 8. Contact Form Backend (concrete, with chosen service + spam protection)

**Chosen service: Netlify Forms** (zero backend, zero secrets).

**Mechanism (field-name contract is load-bearing):**
- `public/__forms.html` is a hidden static form and the **single source of truth for field names**: `<form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>` listing exactly `firstName, lastName, email, phone, message` plus `bot-field`. Because it lives in `public/`, it is copied verbatim to `dist/` and Netlify's deploy-time HTML parser registers the form.
- The visible React `ContactForm` is a **plain JS-handled form** (no `data-netlify` attributes on the rendered form) backed solely by the blueprint â€” this avoids `vite-react-ssg` pre-rendering a second, differently-shaped form and causing double-registration. It POSTs `application/x-www-form-urlencoded` to `/` with **exactly** `form-name=contact`, `firstName`, `lastName`, `email`, `phone`, `message`, and the honeypot. Any field-name mismatch silently drops data, so this contract is pinned and tested.

**Email delivery (BLOCKER fix â€” Netlify Forms emails no one by default):**
- Netlify Forms only files submissions in the dashboard. Delivery to `inquiries@cmcmod.com` requires a **manual dashboard step**: *Site configuration â†’ Forms â†’ Form notifications â†’ Add notification â†’ Email*. This is a UI action, not in Git, so it does **not** survive a site re-create.
- **Gating launch task (Phase 6):** add the email notification to `inquiries@cmcmod.com`, then **send a real test submission and confirm it arrives in that inbox (not spam) before cutover.** Document the step in `EDITING.md`. Because Netlify cannot set Reply-To to the submitter on the built-in notification, the submitter's email address is rendered prominently in the notification body so staff can reply by copy/paste. (If true reply-to is required, that alone justifies the Function+Resend upgrade.)

**Validation & UX states:**
- zod is **strict on `email` format only**; `firstName`, `lastName`, `phone` stay permissive (phone is free text per brief â€” avoid rejecting valid edge/international inputs). All five fields required unless the owner says otherwise. `bot-field` is a visually-hidden input, excluded from the zod schema and not submitted by real users.
- **Success = `fetch` resolves with `response.ok` (2xx); failure = rejected fetch or non-2xx.** Success copy (typo preserved verbatim, pending owner confirmation per Section 15): **"Thank you for contacting Creative Modular Construcrion. We will get back to you as soon as possible."** Error copy: **"Oops, there was an error sending your message. Please try again later."** Note documented in `EDITING.md`: client-side "success" means *accepted*, not *delivered* â€” which is exactly why the Phase 6 end-to-end inbox check is mandatory.

**Spam protection (hardened â€” honeypot alone is insufficient for a sole lead form):**
- Enable **Netlify reCAPTCHA v2** (`data-netlify-recaptcha`, widget present in the visible form) in addition to the honeypot. For a public B2B lead form this is treated as required, not optional.
- Netlify's Akismet can **silently quarantine** real leads under "spam." Operational note in `EDITING.md`: periodically check the Netlify **spam** submissions tab so a misclassified lead is not lost.

**Cost (corrected):** a **new (2026) Netlify account is on the credit-based plan, where form submissions are free/unlimited** â€” the old "100 submissions/month" cap applied only to legacy (pre-Sept-2025) accounts. Re-verify on `netlify.com/pricing` at account-creation time (Netlify changed Forms billing repeatedly in 2025â€“2026) and confirm the free Starter tier still includes Forms. Volume is **not** the trigger for upgrading.

**Documented upgrade path (only if reply-to / CRM / spam needs outgrow Netlify Forms):** a Netlify Function `/api/contact` that verifies hCaptcha server-side, rate-limits by IP, and sends via **Resend** with Reply-To set to the submitter. Secrets in env vars only. Same success/error UX.

---

## 9. Asset & Content Rescue from Duda (do BEFORE touching DNS, while Duda is reachable)

**Critical correction:** the unified plan's `wget -r https://cmcmod.com` approach **fails** â€” verified live, images are served from `lirp.cdn-website.com` / `irp.cdn-website.com` (Duda CDN, account `e329c186`), not `cmcmod.com`, and `wget -r` does not cross hosts by default. The CDN also serves **only downscaled derivatives** (e.g. logo only as `â€¦-95w/108w/182w/719w/847w.png`; the un-suffixed original returns HTTP 404), and Duda HTML is lazy-load/JS-heavy. So a static crawl captures almost no usable originals.

**Phase 0 capture gate (must complete and be verified before any DNS change, and well before cancelling Duda):**

1. **Secure Duda access first.** Confirm account-owner/staff login. Capture is impossible without it, and Section 12 cancels Duda after launch â€” un-captured originals are then gone forever.
2. **Primary capture = Duda native tools (not scraping):**
   - **Duda Site Export** (zip of HTML/CSS/JS/images/media).
   - **Duda Media Manager** â€” the only place true full-resolution originals live. Download everything: logo full set, all six value graphics, every hero/section/portfolio image, project photos, favicon, OG images, fonts.
3. **Fallback capture** (only if native export is unavailable): host-spanning crawl that explicitly allow-lists `lirp.cdn-website.com`, `irp.cdn-website.com`, and `cmcmod.com`, plus per-page DevTools Network capture **after scrolling** to trigger lazy-load. **Hit the Duda origin directly** (Host header + `--resolve` to `100.24.208.97` / `35.172.94.1`, or capture after Supersonic removal) so you don't save Supersonic 502 pages; validate each saved file is a real image/HTML, not a 502.
4. **Logo:** get the vector/original from Media Manager. If none is recoverable, this is an explicit **re-trace task** (budget for it) â€” do not assume a clean high-res PNG is downloadable. Sample brand blue per Section 7.
5. **SEO capture (hard gate, and currently impossible via the normal URL):** every public path returns the Supersonic 502 "Bad Gateway" page, so naive `curl`/view-source captures garbage. Capture true metadata via:
   ```
   curl -L -H 'Host: www.cmcmod.com' --resolve www.cmcmod.com:443:100.24.208.97 https://www.cmcmod.com/<path>
   ```
   (alt origin `35.172.94.1`), **or** remove Supersonic first (restores DNS to Duda) and capture while Duda is live. **There are zero Wayback Machine snapshots of cmcmod.com â€” there is no fallback source.** All titles, descriptions, canonicals, and the 10-URL inventory in this plan were captured this way and are already transcribed into Sections 4 and 10.
6. **Maps:** the live embed is a keyless `google.com/maps/place/â€¦` share URL (verified â€” no `key=` parameter), geo `37.2124029, -93.2367381`. Store the place URL in `global.json`; reuse the geo in LocalBusiness JSON-LD. No Google Cloud billing account needed.
7. **Puppy hero = placeholder.** Do NOT migrate it; stage a "replace me" marker.
8. **Optimize & archive:** strip EXIF, sane crops; `vite-imagetools` emits responsive AVIF/WebP at build. Archive all originals to `design-assets/` (out of deploy).

**Owner must supply (launch dependency â€” this is the true critical path):**
- Print-quality photography to replace the puppy hero and any placeholder imagery (real manufacturing/team/building shots).
- Real project photos: Wonders of Wildlife, MSU Welcome Center, Joplin High School, 7 Brew (the plan does not assume these exist on Duda).
- **Full text** of all 14 FAQ Q&A pairs, the six C.H.R.I.S.T. value descriptions, per-project portfolio copy, the company description / vision / full About prose. The brief only *summarizes* these.
- Decision on each "View more" button destination (Section 15).
- Official brand color (hex/Pantone).

---

## 10. SEO & URL Preservation

- **URL parity for all 10 live paths** (Section 4). Each surviving path returns 200 (rebuilt) or 301 (folded) â€” never 404. Verify post-cutover with `curl -I` that a known-bad URL returns 404 and any redirected legacy path returns 301.
- **Titles, descriptions, canonicals â€” transcribed verbatim from the live origin** (not authored fresh). Existing descriptions captured for all 10 pages (e.g. Home: *"Creative Modular Construction specializes in innovative modular buildings. Contact us for efficient, high-quality construction solutions."*; About: *"Learn about CMC's innovative modular construction methodsâ€¦"*; etc.). Treat description parity with the same "hand-verify" discipline as titles.
- **Canonical host = `www`** everywhere (canonical tags, `og:url`, sitemap `<loc>`) to match Google's indexed URLs; apex 301s to www. Do not flip to apex.
- **Per-page meta** from `seo.ts` via Helmet, pre-rendered into the head; per-page OG/Twitter cards (1200Ã—630 in `public/og`).
- **JSON-LD:** site-wide Organization + LocalBusiness (name, logo, address `319 N Main Ave Ste 200, Springfield, MO 65802`, `telephone +1-417-832-1160`, email, geo `37.2124029,-93.2367381`, `sameAs` all socials, `foundingDate 2021`); **FAQPage** schema on `/careers-faq` from the 14 Q&A.
- **Sitemap:** `vite-plugin-sitemap` with `hostname: https://www.cmcmod.com`, emitting only surviving canonical (www) URLs. Redirected legacy paths are handled by `netlify.toml` 301s, not listed in the sitemap. `/admin` excluded.
- **`/about#Ministry`:** exact case-sensitive `id="Ministry"` preserved; hash scroll fires after layout settles; Playwright asserts the section is in view.
- **Post-cutover:** re-submit the sitemap in Search Console; watch Coverage for new 404s (especially the 4 formerly-overlooked paths) for several weeks.

---

## 11. Deployment & Hosting

- **Host:** Netlify (free/Starter) â€” global CDN, auto Let's Encrypt SSL (auto-renew), atomic deploys, one-click rollback, Forms, Identity, Git Gateway.
- **`netlify.toml`:** `command = "pnpm build"` (runs `vite-react-ssg build`), `publish = "dist"`, Node version pinned (mirrored in `.nvmrc`), the ordered redirects from Section 4, security headers (X-Content-Type-Options, Referrer-Policy, HSTS), immutable cache headers for hashed assets.
- **CI/CD:** GitHub repo connected to Netlify; every push to `main` (including Decap publish commits) auto-builds; PRs get Deploy Previews. A lightweight GitHub Actions workflow runs typecheck + ESLint + Vitest + Playwright smoke suite (see Section 13) with axe a11y assertions. No hard LHCI merge-gating; one Lighthouse spot-check against the perf budget before launch.
- **Single edge layer (the architectural anti-502 guarantee):** Netlify is the only CDN/SSL terminator. **No second proxy is ever stacked in front.**
- **Secrets:** `.env.example` lists every variable (`VITE_ANALYTICS_DOMAIN`; future `RESEND_API_KEY`, `HCAPTCHA_SECRET`); set in the Netlify dashboard; never committed; the owner never touches env vars (developer-managed). The keyless Maps embed needs no key.
- **Local dev (`README.md`):** required Node version, `pnpm install / dev / build / preview / test`, and a note that **Netlify Forms only works on deployed / Deploy-Preview builds (or via `netlify dev`)** â€” local form testing uses `netlify-cli`.

---

## 12. Domain Cutover off Duda at Namecheap (downtime-safe, anti-502, with rollback)

**Verified live state:** apex `cmcmod.com` returns **three** A records â€” `100.24.208.97` and `35.172.94.1` (Duda) plus `162.0.212.5` (reverse-resolves to `delta.supersonic.ai`) â€” round-robined. `www` is a CNAME to the apex (so it inherits the Supersonic IP too). Authoritative DNS is **Namecheap** (`pdns1/pdns2.registrar-servers.com`); parent NS delegation TTL is `3601s`. No external MX was observed, but **email hosting must be confirmed, not assumed**, before touching DNS.

**Default path: keep Namecheap DNS and edit records only.** This is the recommended approach (reversing the unified plan's nameserver-switch default) because it leaves MX/SPF/DKIM/DMARC and any subdomains untouched, eliminating the email-outage risk, and makes rollback a matter of minutes. A full Netlify-nameserver switch is the **discouraged** option and only acceptable after every MX/TXT/subdomain record is replicated in Netlify DNS and mail flow is verified.

**Step-by-step:**

0. **Capture the rollback artifact + confirm email.** Export the **complete current Namecheap zone** (every A, AAAA, CNAME, MX, TXT/SPF/DKIM/DMARC, SRV, subdomain) and save it â€” this is the literal set of records to restore on rollback. Confirm where `inquiries@`/`hr@cmcmod.com` email is hosted (Namecheap Private Email, Google Workspace, etc.) so it survives.
1. **Remove Supersonic CDN FIRST.** Namecheap â†’ Apps â†’ Supersonic CDN â†’ CDN Dashboard â†’ cmcmod.com â†’ â‹® â†’ **Remove**; turn off its subscription/auto-renew. This is the single most important step â€” repointing while Supersonic still proxies reproduces the 502 against Netlify.
2. **WAIT for Namecheap's automatic zone-restore to settle (~60 min).** Removing Supersonic triggers Namecheap to rewrite the zone; if you edit records before this lands, the restore can overwrite your new records ~60 min later. **Do not interleave.**
3. **Verify the apex is clean.** Run external lookups against `8.8.8.8` and `1.1.1.1` and assert `162.0.212.5` (and any other supersonic.ai-range IP) is **gone** from the apex A set. This is a hard gate before repointing.
4. **Pre-stage Netlify.** Add `cmcmod.com` and `www.cmcmod.com` as custom domains in Netlify **before** the DNS change; set canonical = `www`, enable Force HTTPS. Verify the staging site fully on `*.netlify.app` first (form submission lands + email notification arrives, `/about#Ministry`, external EasyApply link, both apex+www behavior, Maps click-to-load).
5. **Lower record TTL correctly.** Set the website A/CNAME TTL to 300s **at least one full old-TTL period (â‰¥1h here, safely 24h) before cutover**, so the low TTL is actually live when you flip. (Note: the parent NS delegation TTL cannot be lowered by the registrant â€” irrelevant on the record-edit path, but it's why the nameserver-switch option propagates for up to 24â€“48h.)
6. **Repoint records (Advanced DNS):**
   - **apex (`@`):** use Namecheap's **ALIAS record** â†’ `your-site.netlify.app` (CNAME-flattening that tracks Netlify's IP changes), rather than a pinned A to `75.2.60.5`. (Mirrors the 502 doc's "prefer CNAME over pinned A" guidance.) If ALIAS is unavailable, fall back to A â†’ the value Netlify shows.
   - **`www`:** **delete the existing `www â†’ apex` CNAME** and replace with `www â†’ your-site.netlify.app`.
   - Delete all leftover Duda A records (`100.24.208.97`, `35.172.94.1`), the `staticip2.multiscreensite.com` CNAME, and any Supersonic record. **Leave MX/TXT/email-auth records untouched.**
   - Every record **DNS-only** â€” no Supersonic, no Cloudflare orange-cloud.
7. **SSL â€” pre-provision to avoid a "Not Secure" window.** Because Let's Encrypt only issues after DNS points at Netlify, there is a gap where the apex/www could present a cert mismatch. Having pre-added both domains (step 4), verify in the Netlify UI that the certificate shows **provisioned for both apex and www** before announcing the site live. Budget for this gap; do the flip in a low-traffic window.
8. **Verify in incognito:** `https://cmcmod.com` and `https://www.cmcmod.com` (apexâ†’www redirect correct), the contact form end-to-end (inbox receipt), `/about#Ministry`, external Apply link, Maps. Confirm `www` no longer resolves to any Duda or `162.0.212.5` IP. **Send a test email to `inquiries@` and `hr@`** to confirm inbound mail still works.
9. **Keep Duda live until green, then cancel.** Only cancel the Duda subscription after the new site is verified AND the asset archive (Section 9) is confirmed complete. **Never re-add any Namecheap CDN/Supersonic product to this domain.**

**Rollback (record-edit path = minutes):** re-enter the saved zone â€” apex A records back to Duda's `100.24.208.97` + `35.172.94.1` (or the live values from the Duda dashboard), `www` CNAME back to `staticip2.multiscreensite.com`, remove the Netlify ALIAS/CNAME. (If the nameserver-switch path were taken instead, rollback is *hours* due to NS delegation TTL â€” another reason to edit records.)

---

## 13. Accessibility, Analytics, Legal & Performance

**Accessibility (site-wide, beyond component primitives):**
- `<html lang="en">`; accessible names (`aria-label`) on all icon-only links/buttons (socials, WhatsApp, Call Now); `title` on the Maps iframe.
- Radix primitives for nav/accordion/dialog; focus-visible rings; AA contrast; skip link; `prefers-reduced-motion`.
- **Decap requires an `alt` field on every image** (non-technical owner won't add it otherwise); helper text documented in `EDITING.md`.
- Pre-launch a11y pass includes per-page heading-outline check (axe won't catch poor alt text or heading order on owner content).

**Analytics:**
- **Plausible recommended** (cookieless â†’ no consent banner). If the owner insists on GA4, add a lightweight consent mechanism. Measurement ID/domain via env var; script deferred.
- **Google property continuity:** confirm/obtain access to the existing Google Search Console property (or create one) and ensure any Search Console DNS TXT verification record **survives the cutover** (it lives in the Namecheap zone we're preserving). Create the Plausible/GA4 property and capture its ID. Verify the **Google Business Profile** NAP (name/address/phone) matches the LocalBusiness JSON-LD â€” local-ranking critical for a physical Springfield business.

**Legal:**
- New **`/privacy`** route, linked in the footer: what the contact form collects (name, email, phone, message = PII), where it goes (Netlify Forms dashboard, retained indefinitely), analytics tooling and whether cookies are used, retention, and a contact for data requests. Mentions Google Maps and social embeds. Policy text is owner/counsel-provided (template acceptable); flagged as owner-supplied content. Choosing Plausible avoids consent-UI obligations.

**Performance budget (numeric, not just "spot-check"):**
- LCP < 2.5s, CLS < 0.1, INP < 200ms (mobile); main-thread JS < ~150KB gzipped.
- Hero as responsive AVIF/WebP with `fetchpriority="high"`; Maps iframe click-to-load; analytics deferred. Targets recorded in `README.md` and verified in the pre-launch Lighthouse run.

**External-link hygiene & integration verification:**
- All external anchors via `ExternalLink` (`rel="noopener noreferrer" target="_blank"`).
- **WhatsApp normalized** to `https://wa.me/14178321160` (digits only â€” the brief's `1-417-832-1160` with dashes is non-functional). **Confirm with the owner the number is actually WhatsApp-enabled** (office landlines often aren't); if not, drop the icon rather than ship a dead link.
- `tel:+14178321160` (E.164) for all phone links; `mailto:inquiries@cmcmod.com` in footer/contact, `mailto:hr@cmcmod.com` for "Email HR Dept." Phone/emails/socials/`applyUrl`/`mapsPlaceUrl` all centralized in `global.json`.
- Confirm `https://creativemodularconstructionllc.easyapply.co/` loads the live CMC listing (not an expired tenant); capture a screenshot; optional free uptime monitor on it.

**Automated tests (back the manual checks):**
- Playwright smoke: routing for all 10 paths, `/about#Ministry` in view, external Apply + social + Maps anchors carry `rel="noopener"`, mobile drawer opens / submenu expands / Apply opens new tab.
- **Title-parity unit/SSG test:** each route's rendered `<title>` equals the frozen string in `tests/fixtures/titles.json` (catches transcription regressions automatically â€” SEO parity is load-bearing).
- **`hr@` vs `inquiries@` test:** assert `/careers-faq` "Email HR Dept" â†’ `mailto:hr@cmcmod.com` and contact/footer â†’ `mailto:inquiries@cmcmod.com` (so they never get swapped).
- JSON-LD shape validation test.
- Deploy-Preview form test: submits and asserts success copy renders; Phase 6 adds the manual end-to-end inbox confirmation.

---

## 14. Milestone Roadmap (ordered, empty repo â†’ live, with rough effort)

Estimates are developer effort; elapsed time is gated on **owner-supplied content/photos** (the true critical path). Net: **~2â€“3 developer-weeks elapsed.** The Plain-English summary's "go live in days" framing is retired.

| Phase | Work | Effort | Gating dependency |
|---|---|---|---|
| **0 â€” Asset & SEO rescue** | Secure Duda login; Site Export + Media Manager download; capture all 10 titles/descriptions via origin Host-header; archive originals; sample brand blue; confirm email host; export Namecheap zone; verify EasyApply + Maps. | ~0.5â€“1 day | **Blocked on Duda access + owner content** |
| **1 â€” Scaffold** | pnpm + React/TS/Vite + `vite-react-ssg` + Tailwind + Radix; `vite.config.ts` (ssg + imagetools + sitemap); brand tokens; ESLint/Prettier; `routes.tsx` (all 10 paths + `/privacy` + 404); favicon/manifest set from logo. | ~1 day | Phase 0 |
| **2 â€” Global shell** | Header/Nav/MobileNav/Footer/CallNowButton/SocialLinks/SkipLink/ExternalLink wired to `global.json`/`nav.json`; `Seo` + `JsonLd`; external Apply link + submenus. | ~1 day | Phase 1 |
| **3 â€” Content + pages** | Write `content/` (all pages incl. projects/partners/community-partners/news, 14 FAQ, 6 values as HTML); `loader.ts` + `types.ts`; build all pages with **real (non-puppy) imagery** via `Picture`; C.H.R.I.S.T. values as HTML+SVG. | ~2â€“3 days | **Blocked on owner photos + full copy** |
| **4 â€” Form + integrations** | `__forms.html` blueprint + JS `ContactForm` (exact success/error copy, honeypot, reCAPTCHA, zod email-only); click-to-load `MapEmbed`; tel/mailto/WhatsApp/socials. | ~0.5 day | Phase 3 |
| **5 â€” SEO / perf / a11y / legal** | Verbatim meta parity, canonicals (www), OG cards, sitemap/robots, Org+LocalBusiness+FAQPage JSON-LD; image optimization to budget; analytics; `/privacy`; axe + Lighthouse. | ~1 day | Phase 4 |
| **6 â€” Deploy to staging** | GitHubâ†’Netlify green build on `*.netlify.app`; **add Form email notification to `inquiries@` and confirm test submission in inbox**; check spam tab behavior; deep links/refresh/anchors/external links on real devices; CI smoke green; write `EDITING.md`; owner sign-off. | ~1 day + owner latency | Phase 5 |
| **7 â€” Decap CMS** | `/admin` + `config.yml` (collections, required alt-text); Netlify Identity + Git Gateway; owner login; confirm Publishâ†’rebuildâ†’live; visual editing handoff. | ~1â€“2 days | Phase 6 |
| **8 â€” Domain cutover** | Section 12: remove Supersonic, wait for zone-restore, verify apex clean, lower TTL, repoint records (ALIAS apex + www CNAME), pre-provision SSL, verify apex+www+redirect+form+anchors+email in incognito. | ~0.5 day active + â‰¤48h propagation | Phase 6 (and 7) |
| **9 â€” Post-launch** | Submit sitemap to Search Console; monitor first form submissions, 404 coverage (esp. the 4 formerly-missed paths), Core Web Vitals; **then decommission Duda** (only after archive confirmed). | ongoing | Phase 8 verified |

---

## 15. Open Questions / Decisions Needed from the Owner

1. **Content delivery (critical path):** When can you provide the **full text** of the 14 FAQ answers, the 6 C.H.R.I.S.T. value descriptions, and per-project portfolio copy? Phase 3 is blocked until these arrive.
2. **Photography (critical path):** Do you have print-quality replacements for the puppy hero and real project photos (Wonders of Wildlife, MSU Welcome Center, Joplin HS, 7 Brew)? If not, we need ADC/brand files before launch â€” the site should not ship with placeholders.
3. **The 4 extra pages** (`/projects`, `/partners`, `/community-partners`, `/news`): rebuild each as a real page, or fold any of them into another page with a 301 redirect? (Default: rebuild all four.)
4. **Success-message typo:** keep "Construcrion" exactly as on the current site, or correct it to "Construction"? (Default: preserved verbatim â€” but it misspells your own company name, so we recommend correcting.)
5. **Brand blue:** what is the official hex/Pantone? (We will otherwise sample from the Media Manager original.)
6. **Analytics:** Plausible (cookieless, tiny recurring cost, **no consent banner**) or GA4 (free, familiar, **requires a consent mechanism**)? We recommend Plausible.
7. **WhatsApp:** is `1-417-832-1160` actually WhatsApp-enabled? If not, we drop the icon rather than ship a dead link.
8. **"View more" buttons** on the Home portfolio: do they link somewhere, expand in place, or open a modal?
9. **Email hosting:** where is `inquiries@`/`hr@cmcmod.com` mail hosted? (We must confirm before the DNS change so it survives.)
10. **Account access / cutover window:** who holds the Namecheap and Duda logins, and who is available to perform the Supersonic removal + DNS change during the cutover window?
11. **Backlinks:** are there known inbound links using trailing-slash or `.html` variants beyond the 11 paths, so we add explicit 301s?
12. **Privacy policy text:** will you/your counsel provide it, or should we supply a template for your review?

---

## 16. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| **DNS cutover breaks company email** (nameserver switch drops MX/SPF/DKIM) | Blocker | Default to **record-edit path** (leaves MX/TXT intact); export full zone first; confirm email host; post-cutover send test emails to `inquiries@`/`hr@`. |
| **Leftover Supersonic IP (`162.0.212.5`) survives into cutover** â†’ reproduces 502 on ~1/3 of traffic | Blocker | Hard gate: after Supersonic removal, wait for the ~60-min zone-restore, then verify externally (`8.8.8.8`+`1.1.1.1`) that the IP is gone before repointing. |
| **4 indexed pages 404 after launch** (`/projects`,`/partners`,`/community-partners`,`/news`) | Blocker | All 10 live URLs in `routes.tsx`/redirect map; each returns 200 or 301; verified with `curl -I`; re-submit sitemap and watch Coverage. |
| **Contact form silently loses every lead** (Netlify emails no one by default) | Blocker | Phase 6 gating task: add dashboard email notification to `inquiries@` and confirm a test submission reaches the inbox; document (it's not in Git). |
| **Mis-transcribed title** (the brief's Home title was wrong) | High | Titles captured verbatim from origin; frozen in `titles.json`; automated title-parity test. |
| **Canonical/redirect mismatch** if apex chosen over indexed www | High | Canonicalize to **www** everywhere; apex 301â†’www in `netlify.toml`. |
| **Lost asset fidelity** (CDN serves only downscaled derivatives; original logo 404s) | High | Capture via Duda Site Export + Media Manager (only full-res source); re-trace logo if needed; archive to `design-assets/`. |
| **SSL "Not Secure" window during cutover** | High | Pre-add both domains in Netlify and verify cert "provisioned" for apex+www before announcing live; low-traffic window. |
| **Maps embed breaks / leaks tracking** | High/Med | Live embed is keyless place URL (verified) â†’ no billing needed; use **click-to-load** consent placeholder. |
| **Owner can't maintain site** (GitHub editing unrealistic) | High | Decap CMS is a **launch requirement**, not optional; required alt-text fields; `EDITING.md`. |
| **Spam quarantines a real lead** (honeypot weak; Akismet silent) | Med | Add reCAPTCHA v2; document checking the Netlify spam tab. |
| **No legal/consent layer for PII + analytics** | Med | `/privacy` route; recommend cookieless Plausible to avoid consent UI. |
| **Rollback assumed fast but isn't** (on a nameserver switch) | Med | Use record-edit path (rollback in minutes); saved zone export is the literal restore artifact. |
| **Netlify lock-in** (Forms/Identity) | Low/Med | Content is plain Git files (portable); Identity â†’ Sveltia/GitHub-OAuth fallback; Forms â†’ Function+Resend fallback. |
| **No timeline â†’ owner can't plan Duda cancellation** | Med | Section 14 per-phase estimates; Duda canceled only after launch verified + archive confirmed. |


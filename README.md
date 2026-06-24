# Creative Modular Construction — Website

React + Vite rebuild of [cmcmod.com](https://cmcmod.com), migrating off Duda.

See [REACT-VITE-REBUILD-PLAN.md](REACT-VITE-REBUILD-PLAN.md) for the full migration
plan (architecture, SEO/URL preservation, contact-form backend, and the downtime-safe
domain cutover off Duda/Namecheap).

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # production build to ./dist
npm run preview    # preview the production build locally
npm run typecheck  # type-check without emitting
```

Requires Node 24 (see `.nvmrc`).

## Project layout

- `src/content/` — all site copy + data (captured from the live site). Edit here to
  change text. `site.ts` = global contact/nav, `pages.ts` = per-page copy,
  `seo.ts` = per-page titles/descriptions.
- `src/components/` — reusable UI (`ui/`), global shell (`layout/`), form, map.
- `src/pages/` — one component per route.
- `src/routes.tsx` — the route table (single source of truth; preserves all live URLs).
- `design-assets/` — drop zone for the real logo, photos, and brand color
  (see `design-assets/README.md`). Not deployed.

## Pending (needs owner input)

These are placeholders until assets/decisions arrive — see plan §15:

- **Brand color** — `tailwind.config.js` uses a placeholder blue. Swap `colors.brand`.
- **Logo** — `src/components/layout/Logo.tsx` + `public/favicon.svg` are text placeholders.
- **Photos** — every `<Picture>` is a labeled placeholder.
- **Contact form delivery** — wired for Netlify Forms; before launch add the email
  notification to `inquiries@cmcmod.com` in the Netlify dashboard and send a test.

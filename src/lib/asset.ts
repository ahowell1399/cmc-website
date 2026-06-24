/**
 * Resolve a public-folder asset against Vite's configured base path.
 *
 * Hardcoded root-absolute URLs like `/cmc-logo.png` break when the site is
 * served from a sub-path (e.g. a GitHub Pages project site at
 * `/cmc-website/`). Wrapping them with `asset()` prepends the active base so
 * the same call works everywhere:
 *   - root deploys (Netlify, local dev) → `import.meta.env.BASE_URL` is `/`,
 *     so `asset('/cmc-logo.png')` === `/cmc-logo.png` (unchanged).
 *   - sub-path deploys → base is `/cmc-website/`, so it becomes
 *     `/cmc-website/cmc-logo.png`.
 */
export function asset(path: string): string {
  // BASE_URL always ends with '/'. Strip any leading slash off the asset path
  // so the join never produces a double slash.
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

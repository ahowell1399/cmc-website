# Fixing the 502 — Namecheap Supersonic CDN in front of a Duda site

**Date:** 2026-06-24
**Symptom:** Navigating to a new page hangs, then Namecheap's *"We're having trouble
connecting"* page appears with **Error code: 502**. The CDN diagram shows
**You = OK**, **Supersonic CDN = OK**, **Origin Server `100.24.208.97` = WARNING**.

---

## TL;DR

> **The 502 is caused by Namecheap's Supersonic CDN being stacked in front of a
> Duda-hosted site — an unsupported topology. The Duda origin is healthy.**
> **Fix: remove the Supersonic CDN and point DNS straight at Duda (DNS-only, no proxy).**

This is **not** a code problem. The `cmc-client-portal` repo is unrelated to the
live site — it's a localhost-only Vite app with a mocked backend, with zero
references to Duda, Namecheap, the IP, or any DNS/deploy config.

---

## Diagnosis

### The site is hosted on Duda (multi-tenant SaaS)
Duda runs on AWS, which is why the origin is an AWS IP (`100.24.208.97`). Duda is
**multi-tenant**: it selects which customer's site to serve by the HTTP **Host
header**, and which TLS certificate to present by **SNI**.

### The direct-to-origin curl "failures" are normal Duda behavior — not a dead origin

```
$ curl -v http://100.24.208.97
* Established connection to 100.24.208.97 (port 80)
* Empty reply from server
curl: (52) Empty reply from server

$ curl -vk https://100.24.208.97
* schannel: using IP address, SNI is not supported by OS.
* schannel: failed to receive handshake, SSL/TLS connection failed
curl: (35) ...
```

Both probes hit the **bare IP**, which strips the Host and SNI that Duda needs:

| Port | Result | Why it's expected |
|------|--------|-------------------|
| 80 | TCP connects, then **empty reply** (curl 52) | `Host: 100.24.208.97` matches no tenant → Duda drops the connection |
| 443 | **TLS handshake fails** (curl 35) | No SNI → Duda can't choose a per-tenant cert → aborts the handshake |

Every strict multi-tenant SaaS answers a no-Host/no-SNI probe this way. **These
results do not prove the origin is down.**

### The "stale IP" theory is refuted
`100.24.208.97` is one of Duda's **two current official origin IPs** (the other is
`35.172.94.1`) and still resolves live from Duda's own hostname
`staticip2.multiscreensite.com`. The CDN is pointed at a **correct, live Duda
front door** — so a stale IP is **not** the active cause. *(It remains a future
risk because Duda rotates IPs — see the CNAME tip below.)*

### Root cause: the CDN-in-front-of-Duda topology
Duda runs its **own** edge/CDN **and terminates SSL itself** (auto-issuing Let's
Encrypt) — but only when DNS points **straight at Duda with no fronting proxy**.
Duda's own docs instruct Cloudflare users to keep records **DNS-only (grey
cloud)** for exactly this reason: a fronting proxy fights Duda over
SSL/Host/SNI termination.

Namecheap Supersonic is functionally the same orange-cloud origin-pull proxy, so
it hits the same wall — it can't get a usable response from Duda's per-tenant
edge, and Namecheap surfaces that as **502 / Origin = WARNING**. The
"navigate → hang → 502" pattern fits a proxy that serves some cached pages but
fails on uncached origin pulls.

*(Supersonic CDN also has a public history of its own 500/502/503 outages through
2025–2026 — removing it eliminates both possible causes at once.)*

---

## Optional: prove the origin is healthy

Probe it **correctly**, supplying the real Host/SNI (replace `YOURDOMAIN.com`):

```bash
curl -H "Host: YOURDOMAIN.com" http://100.24.208.97
curl --resolve YOURDOMAIN.com:443:100.24.208.97 https://YOURDOMAIN.com
```

These should return your real HTML — confirming the origin is fine and the CDN
layer is the whole problem.

---

## The fix

1. **Remove Supersonic CDN from the domain.**
   Namecheap account → **Apps** (left sidebar) → **Supersonic CDN** →
   **CDN Dashboard** → find the domain → **⋮ menu → Remove**.
   *(Namecheap restores the pre-CDN DNS; can take up to ~60 min.)*

2. **(Optional — stop billing)** Apps → **Subscriptions** → turn off auto-renew,
   or ask Namecheap support to cancel the Supersonic subscription.
   *Not required to fix the 502.*

3. **Point DNS straight at Duda.**
   Namecheap → Domain List → **Manage → Advanced DNS**. Set records to the
   **exact values shown in your Duda dashboard** ("Make Your Site Live" / domain
   setup). Duda's shape:
   - **CNAME** for `www` → Duda's stable hostname
   - **A records** for the apex / `@` → the two IPs Duda lists

   **Delete any leftover/extra A records and Supersonic records** — Duda warns
   that extra A records interfere.

4. **No proxy in front.** Keep everything plain **DNS-only**. Do **not** re-enable
   Supersonic for this domain.

5. **Let Duda finish.** After propagation (minutes to a few hours), re-check the
   domain in Duda and let it **auto-issue/re-issue the SSL** (~15–30 min). If a
   leftover SSL error shows, use Duda's **re-create certificate** option. Verify
   in a fresh incognito window.

---

## DNS guidance & pro tip

- Use the **exact values from your Duda dashboard** — don't hardcode any IP
  (including `100.24.208.97`) permanently, because Duda rotates IPs.
- **Prefer Duda's CNAME** where possible: a CNAME auto-follows Duda's IP changes,
  whereas pinned A records (or a CDN pinned to one IP) can silently break later.
- Every record must be **DNS-only** — no CDN/proxy in the path. Duda manages CDN
  and SSL itself.

---

## Caveats

- The precise internal failure of Supersonic (mangled Host, wrong/no SNI, or a
  pinned IP) is inferred from architecture + Duda's Cloudflare guidance, not a
  captured request trace. **The fix is the same regardless.**
- Namecheap has no explicit "don't use Supersonic with Duda" statement; the
  conclusion rests on Supersonic's documented support boundary (Namecheap DNS /
  its own hosting / EasyWP) plus Duda's explicit "turn the proxy off" requirement.
- The exact records to enter must be read from **your** Duda dashboard — they
  weren't observable here.

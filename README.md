# Anmore Adventures – Static Website

A high‑energy, responsive landing site for **Anmore Adventures** with a cool adventure ethos.

## What’s Included
- Multi‑page static site: `index.html`, `adventures.html`, `membership.html`, `community.html`, `about.html`, `404.html`
- Responsive layout, accessible markup, and smooth animations
- Value calculator (client‑side)
- PWA basics: `site.webmanifest` and `sw.js` for offline caching
- SEO meta, Open Graph, social icon SVGs, `robots.txt`, `sitemap.xml`

## Quick Start
1. Upload all files to your web server root (or a subfolder).
2. Ensure the domain in `sitemap.xml` and `index.html` Open Graph URLs reflect your real domain.
3. Optional: Update `hello@example.com` to your contact email.

### Local Preview (any simple server)
- Python 3: `python3 -m http.server 8080` then open `http://localhost:8080`

## Customize
- **Brand colors & typography**: edit `assets/css/styles.css` variables
- **Logo/OG image**: replace files in `assets/img/`
- **Copy**: edit HTML sections directly

## Notes
- Images are gradient/illustrative placeholders; swap in real photos as needed.
- Service worker caches static assets for faster reloads.

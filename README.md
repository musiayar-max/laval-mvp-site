# LAVAL MVP Static Site Package — Real Image Pass

This package upgrades the earlier coded shell by replacing synthetic configurator visuals with **real uploaded mantel references** and **detail/texture crops** derived from those uploads.

## What changed in this pass
- Family cards now use real uploaded mantel images.
- Profile cards now use representative real mantel images.
- Leg cards use real detail crops from the uploaded references.
- Shelf / crown cards use real detail crops from the uploaded references.
- Finish cards use real stone/texture crops from the uploaded references.
- The review step now uses a **representative reference image**, not a fake composited custom render.

## Important honesty rule
This is still an MVP.

The site now uses your **real uploaded images**, but it does **not** pretend to have full custom rendering.  
The review image is a **representative profile reference**, while the text summary carries the exact selected Family / Profile / Leg / Shelf / Finish values.

That is intentional and more trustworthy than fake compositing.

## Included pages
- `index.html`
- `configurator.html`
- `trade.html`
- `portfolio.html`
- `contact.html`

## Included support artifacts
- `LAVAL_Asset_Manifest_Real_Image_Population_Pass_v1.md`
- `LAVAL_Asset_Manifest_Real_Image_Population_Pass_v1.csv`

## Stack
- Standard HTML
- Standard CSS
- Lightweight vanilla JavaScript
- No framework dependency

## Current build standard
- premium-feeling brand shell
- real uploaded imagery at the option-card layer
- representative reference preview at the review stage
- code-first static site
- easy future handoff to a developer or agency
- deployable to Cloudflare Pages or any static host

## Font note
The live build references Google-hosted Cormorant Garamond and DM Sans.
Bristol Script is not bundled here; the accent system still needs the final licensed/approved webfont if you want exact brand fidelity.

## Form note
The request-pricing form is wired for front-end flow testing only.
Right now it stores the submitted payload in `localStorage` under `laval-last-lead`.
Before launch, connect it to one of these:
- Airtable automation / webhook
- Formspree
- Cloudflare Worker endpoint
- other CRM or server endpoint

## Deploy to Cloudflare Pages
1. Create a new GitHub repo.
2. Upload the contents of this folder.
3. Push the repo to GitHub.
4. In Cloudflare Pages, create a new project from the repo.
5. Framework preset: **None**.
6. Build command: leave blank.
7. Output directory: `/`.
8. Add your custom domain in Cloudflare once ready.

## Structure
- `assets/css/styles.css` = visual system
- `assets/js/site.js` = option data + real-image mappings + shared helpers
- `assets/js/configurator.js` = configurator state and UI rendering
- `assets/js/contact.js` = review summary + form payload setup
- `assets/img/` = populated real-image asset folders

## What still needs refinement later
- exact licensed brand-font implementation
- live lead routing
- production-safe copyright-cleared photography or commissioned imagery
- cleaner component-isolated crops if you want a more polished configurator in version 2
- analytics instrumentation
- device QA and launch hardening

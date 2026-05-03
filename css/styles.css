/* ============================================================
   LAVAL — SITE SHELL
   Unified design tokens, header, footer, typography,
   section rhythm, CTA language, and shared patterns.
============================================================ */

:root {
  /* Color */
  --bg:            #f5f1ea;
  --bg-soft:       #eee7dc;
  --surface:       #faf7f2;
  --surface-strong:#ffffff;
  --text:          #151515;
  --muted:         #6b655d;
  --line:          rgba(21, 21, 21, 0.10);
  --line-strong:   rgba(21, 21, 21, 0.20);

  /* Layout
     Philosophy: content extends FULL viewport width.
     Frame elements (nav, footer, media, rails) use small edge padding.
     Only EDITORIAL TEXT columns are constrained to narrow centered widths. */
  --frame-pad:     clamp(20px, 2.5vw, 44px);   /* edge padding for full-width elements */
  --text-container:720px;                      /* narrow editorial text column */
  --container:     1280px;                     /* medium constraint */
  --header-h:      64px;

  /* Rhythm */
  --section-pad-y:    110px;
  --section-pad-y-sm: 72px;
  --head-gap:         clamp(20px, 3vw, 40px);
  --rail-gap:         clamp(12px, 1.5vw, 20px);

  /* Shape */
  --radius-pill:   999px;

  /* Type */
  --display-serif: 'Cormorant Garamond', 'Times New Roman', serif;
  --ui-sans:       'Inter', system-ui, -apple-system, Segoe UI, sans-serif;

  /* Easing */
  --ease-luxury:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* ============================================================
   RESET / BASE
============================================================ */

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--ui-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body.menu-open { overflow: hidden; }

main {
  display: block;
  padding-top: var(--header-h);
}

img, svg, video {
  display: block;
  max-width: 100%;
}

button, input, textarea, select { font: inherit; }

a { color: inherit; }

/* ============================================================
   LAYOUT PRIMITIVES
============================================================ */

/* Narrow editorial text column */
.container {
  width: 100%;
  max-width: var(--text-container);
  margin: 0 auto;
  padding-left: var(--frame-pad);
  padding-right: var(--frame-pad);
}

/* Wider container for section heads */
.container--wide {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding-left: var(--frame-pad);
  padding-right: var(--frame-pad);
}

.section {
  padding: var(--section-pad-y) 0;
  scroll-margin-top: calc(var(--header-h) + 18px);
}

.section--tight      { padding: 72px 0; }
.section--flush-top  { padding-top: 0; }
.section--flush-bot  { padding-bottom: 0; }

/* ============================================================
   TYPOGRAPHY
============================================================ */

.eyebrow,
.card-label,
.menu-kicker {
  margin: 0 0 16px;
  font-family: var(--ui-sans);
  font-size: 0.70rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.eyebrow--light { color: rgba(255, 255, 255, 0.75); }

.h-display,
.page-hero h1,
.hero h1 {
  margin: 0;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.01em;
  line-height: 1.05;
  font-size: clamp(3.6rem, 7vw, 6.15rem);
  text-wrap: balance;
}

.h-section,
.section-head h2,
.page-intro h1 {
  margin: 0;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.12;
  font-size: clamp(2.4rem, 4.4vw, 4.4rem);
  text-wrap: balance;
}

.h-card {
  margin: 0;
  font-family: var(--display-serif);
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.1;
  font-size: clamp(1.7rem, 2.2vw, 2.1rem);
}

.prose p,
.section-copy,
.page-intro p {
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
  font-size: 1rem;
  font-weight: 300;
  max-width: 54ch;
}

.prose p + p { margin-top: 1em; }

.section-copy { max-width: 52ch; }

.section-head {
  display: block;
  max-width: 62rem;
  margin-bottom: var(--head-gap);
}

.section-head .eyebrow { margin-bottom: 16px; }
.section-head h2       { margin-bottom: 14px; max-width: 14ch; }
.section-head p        { max-width: 44ch; font-size: 1rem; font-weight: 300; line-height: 1.75; }

.section-head--center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.section-head--center h2,
.section-head--center p {
  margin-left: auto;
  margin-right: auto;
}

/* ============================================================
   LINKS & CTAs
============================================================ */

.text-link {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  text-decoration: none;
  font-family: var(--ui-sans);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: inherit;
  transition: opacity 0.25s ease;
}

.text-link:hover { opacity: 0.55; }

.text-link--light { color: #ffffff; }
.text-link--light:hover { opacity: 0.65; }

.text-link--muted { color: var(--muted); }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 32px;
  border-radius: 0;
  text-decoration: none;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: opacity 0.25s ease, background 0.25s ease;
  cursor: pointer;
  border: none;
}
.btn-primary     { background: var(--text); color: #fff; }
.btn-primary:hover { opacity: 0.82; }
.btn-secondary   { border: 0.5px solid var(--line-strong); color: var(--text); background: transparent; }
.btn-secondary:hover { opacity: 0.60; }

/* ============================================================
   HEADER — full-viewport-width with small edge padding
============================================================ */

.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 300;
  background: rgba(250, 247, 242, 0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 0.5px solid var(--line);
  color: var(--text);
  transition: background 0.40s ease, border-color 0.40s ease;
}

/* Header shell fills the viewport with small edge padding.
   NOT constrained to 1280px — the previous implementation's mistake. */
.header-shell {
  width: 100%;
  max-width: none;
  height: var(--header-h);
  padding: 0 var(--frame-pad);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left, .header-center, .header-right {
  display: flex;
  align-items: center;
}

.header-left   { justify-content: flex-start; }
.header-center { justify-content: center; pointer-events: none; }
.header-center .brand { pointer-events: auto; }
.header-right  { justify-content: flex-end; gap: 22px; }

.brand {
  text-decoration: none;
  font-family: var(--display-serif);
  font-size: 1.85rem;           /* matches Bvlgari nav brand prominence */
  font-weight: 400;
  letter-spacing: 0.26em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
  transition: opacity 0.25s ease;
}

.brand:hover { opacity: 0.55; }

/* ============================================================
   MENU TRIGGER + ICONS — opacity-only hover, no transforms
============================================================ */

.menu-trigger {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0;
  color: currentColor;
  cursor: pointer;
  transition: opacity 0.25s ease;
}
.menu-trigger:hover { opacity: 0.55; }

.menu-label { display: none; }

.menu-icon {
  width: 22px;
  height: 14px;
  position: relative;
  display: inline-block;
}
.menu-icon span {
  position: absolute;
  left: 0;
  width: 22px;
  height: 1px;
  background: currentColor;
  transition: top 0.28s ease, transform 0.28s ease, opacity 0.2s ease;
}
.menu-icon span:first-child { top: 3px; }
.menu-icon span:last-child  { top: 11px; }

.menu-trigger[aria-expanded="true"] .menu-icon span:first-child {
  top: 7px; transform: rotate(45deg);
}
.menu-trigger[aria-expanded="true"] .menu-icon span:last-child {
  top: 7px; transform: rotate(-45deg);
}

.icon-button {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 4px;
  cursor: pointer;
  color: currentColor;
  transition: opacity 0.25s ease;
}
.icon-button:hover { opacity: 0.55; }

.icon-button svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ============================================================
   MENU OVERLAY
============================================================ */

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 280;
  background: rgba(21, 21, 21, 0.97);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.35s ease, visibility 0.35s ease;
  overflow: auto;
  color: #ffffff;
}
.menu-overlay.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.menu-overlay-inner {
  width: 100%;
  max-width: none;
  padding: calc(var(--header-h) + 40px) var(--frame-pad) 60px;
}

.menu-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 16px;
  margin-bottom: 40px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.menu-title {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.40);
}

.menu-close {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.60);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: opacity 0.25s ease;
}
.menu-close:hover { opacity: 0.55; }

.menu-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;
}

.menu-nav {
  display: grid;
  gap: 0;
}

.menu-nav a {
  text-decoration: none;
  font-family: var(--display-serif);
  font-size: clamp(2rem, 3.6vw, 3.4rem);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #ffffff;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
  padding: 14px 0;
  /* Start hidden + offset left — animate in when menu opens */
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 0.38s var(--ease-luxury), transform 0.38s var(--ease-luxury);
}
.menu-nav a:hover { opacity: 0.50; }

/* When menu is open, items animate in with staggered delays — Bvlgari pattern */
.menu-overlay.is-open .menu-nav a {
  opacity: 1;
  transform: translateX(0);
}
.menu-overlay.is-open .menu-nav a:nth-child(1) { transition-delay: 0.08s; }
.menu-overlay.is-open .menu-nav a:nth-child(2) { transition-delay: 0.14s; }
.menu-overlay.is-open .menu-nav a:nth-child(3) { transition-delay: 0.20s; }
.menu-overlay.is-open .menu-nav a:nth-child(4) { transition-delay: 0.26s; }
.menu-overlay.is-open .menu-nav a:nth-child(5) { transition-delay: 0.32s; }
.menu-overlay.is-open .menu-nav a:nth-child(6) { transition-delay: 0.38s; }

.menu-notes .menu-kicker {
  color: rgba(255, 255, 255, 0.45);
  opacity: 0;
  transition: opacity 0.35s ease 0.14s;
}
.menu-overlay.is-open .menu-notes .menu-kicker {
  opacity: 1;
}

.menu-notes h2 {
  margin: 0;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.12;
  font-size: clamp(2rem, 3.5vw, 3.4rem);
  max-width: 14ch;
  color: #ffffff;
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 0.40s var(--ease-luxury) 0.20s, transform 0.40s var(--ease-luxury) 0.20s;
}
.menu-overlay.is-open .menu-notes h2 {
  opacity: 1;
  transform: translateX(0);
}

.menu-notes p {
  margin: 22px 0 0;
  max-width: 46ch;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.8;
  font-weight: 300;
  font-size: 0.95rem;
  opacity: 0;
  transition: opacity 0.40s ease 0.30s;
}
.menu-overlay.is-open .menu-notes p {
  opacity: 1;
}

/* ============================================================
   HERO
============================================================ */

.hero {
  position: relative;
  min-height: calc(100svh - var(--header-h));
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: #d9d1c4;
}

.hero-media,
.hero-scrim {
  position: absolute;
  inset: 0;
}

.hero-media {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.hero-scrim {
  background:
    linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.02) 28%, rgba(0,0,0,0.18) 100%),
    linear-gradient(90deg, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.04) 48%, rgba(0,0,0,0) 72%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  padding-bottom: clamp(56px, 9vh, 96px);
}

.hero-copy      { max-width: 32rem; color: #ffffff; }
.hero-location  {
  margin: 0 0 16px;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.70);
}

.hero-subline {
  margin: 20px 0 0;
  max-width: 30ch;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.78;
  color: rgba(255, 255, 255, 0.82);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 30px;
}

.page-hero {
  position: relative;
  min-height: clamp(420px, 58vh, 640px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: #d9d1c4;
}
.page-hero .hero-media,
.page-hero .hero-scrim { position: absolute; inset: 0; }

.page-hero .hero-inner { padding-bottom: clamp(48px, 7vh, 80px); }

.page-hero h1 {
  color: #ffffff;
  font-size: clamp(3rem, 6vw, 5.2rem);
  max-width: 12ch;
}

.page-hero .hero-subline { max-width: 40ch; }

/* ============================================================
   SCROLL REVEAL
============================================================ */

.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.72s var(--ease-luxury), transform 0.72s var(--ease-luxury);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-group > * {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.70s var(--ease-luxury), transform 0.70s var(--ease-luxury);
}
.reveal-group.is-visible > *:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: 0s; }
.reveal-group.is-visible > *:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: 0.12s; }
.reveal-group.is-visible > *:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: 0.22s; }
.reveal-group.is-visible > *:nth-child(4) { opacity: 1; transform: translateY(0); transition-delay: 0.32s; }

/* Editorial page intro */
.page-intro {
  padding: clamp(80px, 12vh, 140px) var(--frame-pad) clamp(40px, 6vh, 70px);
  text-align: center;
}
.page-intro .eyebrow { margin-bottom: 18px; }
.page-intro h1 {
  margin: 0 auto;
  max-width: 16ch;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.08;
  font-size: clamp(2.6rem, 5vw, 4.6rem);
}
.page-intro p {
  margin: 22px auto 0;
  max-width: 52ch;
  color: var(--muted);
  font-weight: 300;
  line-height: 1.8;
}

/* ============================================================
   RAIL — full-width with minimal edge padding
============================================================ */

.rail-shell {
  width: 100%;
  max-width: none;
  padding-left: var(--frame-pad);
  padding-right: var(--frame-pad);
}

.rail {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--rail-gap);
  align-items: start;
}

.rail--4col { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.rail--2col { grid-template-columns: repeat(2, minmax(0, 1fr)); }

.rail-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rail-media {
  overflow: hidden;
  background: #ddd6cb;
}

.rail-media img {
  width: 100%;
  aspect-ratio: 4 / 5.35;
  object-fit: cover;
  transition: transform 0.65s var(--ease-luxury);
}

.rail-item:hover .rail-media img { transform: scale(1.04); }

.rail-copy { padding-right: 8px; }
.rail-copy .card-label { margin-bottom: 14px; }
.rail-copy h3 { margin: 0 0 10px; }
.rail-copy p  { max-width: 29ch; color: var(--muted); font-weight: 300; line-height: 1.8; font-size: 0.94rem; }

.rail-footer { margin-top: 30px; }

/* ============================================================
   FEATURE CARD — truly full-bleed (100vw, edge-to-edge)
============================================================ */

.feature {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
}

.feature-card {
  position: relative;
  overflow: hidden;
  background: #d7cec1;
}

.feature-image {
  width: 100%;
  aspect-ratio: 16 / 8;
  object-fit: cover;
  transition: transform 0.65s var(--ease-luxury);
}

.feature-card:hover .feature-image { transform: scale(1.02); }

.feature-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.06) 44%, rgba(0,0,0,0.40) 100%),
    linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.16) 28%, rgba(0,0,0,0.04) 56%, rgba(0,0,0,0) 76%);
}

.feature-content {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  z-index: 2;
  max-width: 40rem;
  padding: clamp(32px, 5vw, 72px);
  color: #ffffff;
}

.feature-content .eyebrow { margin-bottom: 16px; color: rgba(255,255,255,0.70); }

.feature-content h2 {
  margin: 0;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.08;
  font-size: clamp(2.4rem, 4vw, 4rem);
  max-width: 12ch;
  color: #ffffff;
}

.feature-content p {
  margin: 18px 0 0;
  max-width: 34ch;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 300;
  line-height: 1.8;
}

.feature-actions { margin-top: 28px; }

/* ============================================================
   SITE FOOTER — full width with small edge padding
============================================================ */

.site-footer {
  background: #ebe6dd;
  border-top: 0.5px solid var(--line);
  padding: clamp(60px, 7vw, 88px) 0 0;
}

/* Footer hub extends full width with edge padding — NOT container-constrained */
.footer-hub {
  width: 100%;
  max-width: none;
  padding: 0 var(--frame-pad) clamp(48px, 6vw, 72px);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(32px, 3.5vw, 56px) clamp(24px, 3vw, 48px);
  margin: 0;
}

/* Column header — larger, tighter tracking */
.footer-column h3 {
  margin: 0 0 20px;
  font-family: var(--ui-sans);
  font-size: 0.80rem;
  font-weight: 500;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--text);
}

.footer-links {
  display: grid;
  gap: 11px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Footer links — larger, proper weight, opacity hover */
.footer-links a {
  text-decoration: none;
  color: var(--muted);
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.5;
  transition: opacity 0.25s ease;
}

.footer-links a:hover { opacity: 0.55; }

.footer-bottom {
  border-top: 0.5px solid var(--line);
  padding: 24px 0 30px;
}

/* Footer bottom — full width with edge padding.
   Brand mark is centered, note sits below it — matches Bvlgari footer bottom. */
.footer-bottom-inner {
  width: 100%;
  max-width: none;
  padding: 0 var(--frame-pad);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 300;
  color: var(--muted);
  margin: 0;
}

.footer-brand-mark {
  font-family: var(--display-serif);
  font-size: 1.55rem;
  font-weight: 400;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--text);
}

.footer-note {
  margin: 0;
  color: var(--muted);
  font-size: 0.78rem;
}

/* ============================================================
   ACCESSIBILITY
============================================================ */

.menu-trigger:focus-visible,
.icon-button:focus-visible,
.menu-close:focus-visible,
.menu-nav a:focus-visible,
.brand:focus-visible,
.btn:focus-visible,
.text-link:focus-visible,
.footer-links a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* ============================================================
   RESPONSIVE
============================================================ */

@media (max-width: 1180px) {
  .footer-hub {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1080px) {
  .menu-grid { grid-template-columns: 1fr; }
  .hero-copy { max-width: 29rem; }
}

@media (max-width: 760px) {
  :root {
    --header-h: 56px;
    --section-pad-y: var(--section-pad-y-sm);
    --frame-pad: 20px;
  }

  .header-shell {
    grid-template-columns: auto 1fr auto;
    gap: 14px;
    height: var(--header-h);
  }

  .brand { font-size: 1.45rem; letter-spacing: 0.20em; }
  .header-right { gap: 14px; }

  .hero, .page-hero {
    min-height: calc(100svh - var(--header-h));
  }
  .page-hero { min-height: clamp(380px, 50vh, 520px); }

  .hero-inner { padding-bottom: 36px; }
  .hero-copy  { max-width: 100%; }

  .hero h1 {
    font-size: clamp(3.3rem, 15vw, 5rem);
    max-width: 5ch;
  }

  .hero-location { margin-bottom: 12px; font-size: 0.64rem; }
  .hero-subline  { max-width: 25ch; font-size: 0.95rem; line-height: 1.68; }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .section { padding: var(--section-pad-y-sm) 0; }

  .page-intro { padding: 56px var(--frame-pad) 30px; }

  .btn { width: 100%; }

  .menu-nav a { font-size: clamp(1.8rem, 8vw, 2.6rem); }
  .menu-grid { gap: 40px; }

  .rail, .rail--4col, .rail--2col {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .rail-media img { aspect-ratio: 4 / 4.9; }

  .feature-image { aspect-ratio: 4 / 5; }
  .feature-content { max-width: 100%; padding: 24px 20px; }
  .feature-content p { max-width: 28ch; }

  .footer-hub {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-bottom: 40px;
  }
  .footer-column h3 { margin-bottom: 14px; font-size: 0.76rem; }
  .footer-links { gap: 10px; }
  .footer-links a { font-size: 0.88rem; }
  .footer-bottom { padding: 20px 0 28px; }
  .footer-bottom-inner { font-size: 0.74rem; }

  .reveal { transform: translateY(16px); }
}

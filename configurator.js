:root {
  --bg: #161719;
  --bg-elevated: #1c1d20;
  --panel: #222327;
  --panel-soft: rgba(255, 255, 255, 0.04);
  --text: #ece7df;
  --text-soft: #cfc7bb;
  --muted: #9e9487;
  --line: rgba(255,255,255,0.10);
  --accent-1: #bbbab0;
  --accent-2: #ddd9d0;
  --accent-3: #9a7f62;
  --accent-4: #9e8873;
  --accent-5: #d3cec5;
  --success: #8db391;
  --shadow: 0 22px 50px rgba(0, 0, 0, 0.25);
  --radius-xl: 28px;
  --radius-lg: 20px;
  --radius-md: 14px;
  --container: 1220px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background:
    radial-gradient(circle at top left, rgba(154, 127, 98, 0.18), transparent 35%),
    radial-gradient(circle at top right, rgba(211, 206, 197, 0.10), transparent 32%),
    linear-gradient(180deg, #111214 0%, var(--bg) 45%, #18191c 100%);
  color: var(--text);
  font-family: 'Inter', 'Glacial Indifference', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button, input, select, textarea {
  font: inherit;
}
button {
  cursor: pointer;
}

.container {
  width: min(var(--container), calc(100% - 40px));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(18px);
  background: rgba(17,18,20,0.72);
  border-bottom: 1px solid var(--line);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 0;
}

.brand-mark {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.brand-name {
  font-family: 'Cormorant Garamond', Georgia, serif;
  letter-spacing: 0.08em;
  font-size: clamp(2rem, 2.6vw, 2.8rem);
  line-height: 0.9;
}

.brand-script {
  font-family: 'Bristol Script', 'Snell Roundhand', 'Brush Script MT', cursive;
  font-size: 1.15rem;
  color: var(--accent-2);
  opacity: 0.92;
}

.nav-links {
  display: flex;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
}

.nav-link {
  color: var(--text-soft);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.nav-link:hover,
.nav-link[aria-current="page"] {
  color: var(--text);
}

.btn,
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, border-color 180ms ease;
}

.btn:hover,
.button:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-2), var(--accent-4));
  color: #111214;
  box-shadow: 0 10px 30px rgba(211, 206, 197, 0.22);
}

.btn-secondary {
  background: rgba(255,255,255,0.03);
  border-color: var(--line);
  color: var(--text);
}

.btn-ghost {
  background: transparent;
  border-color: var(--line);
  color: var(--text-soft);
}

.page-hero {
  padding: 72px 0 32px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 34px;
  align-items: stretch;
}

.hero-copy,
.hero-panel,
.panel,
.card {
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025));
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
}

.hero-copy {
  padding: clamp(28px, 4vw, 52px);
}

.kicker,
.overline {
  color: var(--accent-2);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
  margin-bottom: 16px;
}

.display,
.page-title,
.section-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  letter-spacing: -0.02em;
  line-height: 0.95;
}

.display {
  font-size: clamp(3.2rem, 7vw, 6.2rem);
  margin: 0 0 18px;
}

.page-title {
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  margin: 0 0 14px;
}

.lead,
.hero-copy p,
.panel p,
.card p,
.body-text {
  color: var(--text-soft);
  line-height: 1.75;
  font-size: 1rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 14px;
  margin-top: 36px;
}

.metric {
  padding: 16px;
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}

.metric strong {
  display: block;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  margin-bottom: 4px;
}

.metric span {
  color: var(--muted);
  font-size: 0.9rem;
}

.hero-panel {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.texture {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  min-height: 320px;
  background:
    linear-gradient(120deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
    linear-gradient(165deg, #4e463f 0%, #726559 14%, #c3b8aa 26%, #7a6a5d 39%, #dad0c3 54%, #92806f 70%, #e5ded4 84%, #867668 100%);
}

.texture::before,
.texture::after {
  content: "";
  position: absolute;
  inset: -10% auto -10% auto;
  width: 48%;
  background: linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.03));
  filter: blur(2px);
  opacity: 0.62;
  border-radius: 40% 60% 55% 45% / 60% 36% 64% 40%;
}

.texture::before { left: 8%; transform: rotate(9deg); }
.texture::after { right: 12%; transform: rotate(-7deg); opacity: 0.38; }

.texture-copy {
  position: absolute;
  inset: 0;
  padding: 26px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.texture-copy small {
  color: rgba(17,18,20,0.72);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.texture-copy strong {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.6rem;
  color: rgba(255,255,255,0.86);
}

.section {
  padding: 26px 0 72px;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 18px;
  margin-bottom: 24px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.3rem);
  margin: 0;
}

.section-subtitle {
  color: var(--muted);
  max-width: 680px;
  line-height: 1.7;
}

.grid {
  display: grid;
  gap: 20px;
}

.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.card,
.panel {
  padding: 22px;
}

.card h3,
.panel h3,
.stat-title,
.option-card-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.9rem;
  margin: 0 0 10px;
}

.subtle {
  color: var(--muted);
}

.family-tile,
.option-card,
.finish-card,
.portfolio-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
}

.option-card,
.finish-card,
.family-tile {
  min-height: 100%;
}

.card-visual {
  min-height: 220px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.07);
  display: grid;
  place-items: center;
  overflow: hidden;
  position: relative;
}

.card-visual svg {
  width: 100%;
  height: 100%;
}

.card-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pill-row,
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  min-height: 34px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-soft);
  font-size: 0.86rem;
}

.option-card.is-selected,
.family-tile.is-selected,
.finish-card.is-selected {
  border-color: rgba(221,217,208,0.35);
  box-shadow: 0 14px 28px rgba(221,217,208,0.08);
}

.option-card.is-selected .card-visual,
.family-tile.is-selected .card-visual,
.finish-card.is-selected .card-visual {
  border-color: rgba(221,217,208,0.35);
}

.config-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) 400px;
  gap: 24px;
  align-items: start;
}

.config-panel {
  padding: 24px;
  position: sticky;
  top: 100px;
}

.stepper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.step-chip {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--muted);
  background: rgba(255,255,255,0.02);
  font-size: 0.9rem;
}

.step-chip.is-active,
.step-chip.is-complete {
  color: var(--text);
  border-color: rgba(221,217,208,0.25);
}

.preview-stage {
  position: relative;
  min-height: 430px;
  border-radius: 24px;
  background:
    radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 42%),
    linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.08);
  overflow: hidden;
}

.preview-stage::after {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 0;
  height: 18%;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border-top: 1px solid rgba(255,255,255,0.06);
}

.preview-meta {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.summary-list {
  display: grid;
  gap: 10px;
}

.summary-item,
.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
  color: var(--text-soft);
}

.summary-item strong,
.detail-row strong {
  color: var(--text);
  font-weight: 600;
}

.config-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 16px;
}

.field,
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label,
.form-field label {
  color: var(--text);
  font-size: 0.92rem;
}

.input,
textarea,
select,
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
input[type="url"] {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: var(--text);
  padding: 14px 16px;
  min-height: 50px;
  outline: none;
}

textarea {
  min-height: 140px;
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: rgba(236,231,223,0.45);
}

.radio-group,
.checkbox-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.radio-pill {
  position: relative;
  overflow: hidden;
}

.radio-pill input {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.radio-pill span {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: var(--text-soft);
}

.radio-pill input:checked + span {
  color: #111214;
  background: linear-gradient(135deg, var(--accent-2), var(--accent-4));
  border-color: transparent;
}

.notice,
.success-box {
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(141,179,145,0.10);
  border: 1px solid rgba(141,179,145,0.22);
  color: var(--text);
}

.portfolio-card .card-visual {
  min-height: 260px;
}

.quote-block {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  margin: 0;
}

.site-footer {
  padding: 36px 0 56px;
  border-top: 1px solid var(--line);
  margin-top: 28px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;
}

.footer-note {
  color: var(--muted);
  line-height: 1.7;
}

.hide {
  display: none !important;
}

@media (max-width: 1080px) {
  .hero-grid,
  .config-shell,
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .config-panel {
    position: static;
  }
}

@media (max-width: 820px) {
  .grid-3,
  .grid-4,
  .grid-2,
  .form-grid {
    grid-template-columns: 1fr;
  }
  .hero-metrics {
    grid-template-columns: 1fr;
  }
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav-links {
    gap: 12px 14px;
  }
  .page-hero {
    padding-top: 46px;
  }
}


.card-image,
.swatch-image,
.reference-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-visual .swatch-image {
  object-fit: cover;
  transform: scale(1.02);
}

.reference-frame {
  position: relative;
  width: 100%;
  height: 100%;
}

.reference-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(18, 18, 21, 0.72);
  border: 1px solid rgba(255,255,255,0.08);
  color: #f4efe8;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.reference-note {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  padding: 14px 16px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(17,18,20,0.14), rgba(17,18,20,0.82));
  color: #f4efe8;
  font-size: 0.92rem;
  line-height: 1.45;
}

.preview-stage::after {
  display: none;
}


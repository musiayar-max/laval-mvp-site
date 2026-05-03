/* =========================================================================
   LAVAL — Right Browser (OBJ-17..21)
   Primary selection territory. Circle-first option tokens. Nested sub-editor
   mounts INSIDE this envelope — never as a modal or a new page.
   ========================================================================= */

.browser {
  grid-area: browser;
  position: relative;
  z-index: var(--z-hud);
  margin: 4px var(--inset-band) var(--inset-band) 0;
  padding: 22px 22px 22px;
  background: var(--glass-fill);
  border: 1px solid var(--border-ivory);
  backdrop-filter: blur(var(--blur-hud));
  -webkit-backdrop-filter: blur(var(--blur-hud));
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-panel);
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  overflow: hidden;
}

.browser__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-ivory);
}
.browser__eyebrow {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
}
.browser__count {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  color: var(--text-on-dark-helper);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
}
.browser__title {
  font-family: var(--display-serif);
  font-weight: 300;
  font-size: 28px;
  line-height: var(--lh-editorial);
  color: var(--text-on-dark-active);
  letter-spacing: -0.005em;
}

/* The option list — always scrollable locally (LAW-15) */
.browser__body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,252,246,0.22) transparent;
}
.browser__body::-webkit-scrollbar { width: 4px; }
.browser__body::-webkit-scrollbar-thumb { background: rgba(255,252,246,0.18); border-radius: 2px; }

/* Option row — circle-first orb plus label cluster */
.option {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 10px 12px 10px 8px;
  border-radius: var(--radius-chip);
  background: transparent;
  border: 1px solid transparent;
  text-align: left;
  width: 100%;
  transition:
    background var(--dur-hover) var(--ease-soft),
    border-color var(--dur-hover) var(--ease-soft),
    opacity var(--dur-commit) var(--ease-soft);
}
.option:hover:not([disabled]) {
  background: rgba(255, 252, 246, 0.05);
  border-color: rgba(255, 252, 246, 0.14);
}
.option.is-selected {
  background: rgba(255, 250, 243, 0.09);
  border-color: rgba(255, 252, 246, 0.38);
}
.option[disabled] {
  opacity: 0.40;
  cursor: not-allowed;
}

.option__orb {
  width: var(--orb-browser);
  height: var(--orb-browser);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  background: var(--ivory);
  border: 1px solid rgba(255, 252, 246, 0.22);
  transition: box-shadow var(--dur-hover) var(--ease-soft),
              border-color var(--dur-hover) var(--ease-soft);
}
.option:hover:not([disabled]) .option__orb {
  border-color: rgba(255, 252, 246, 0.48);
}
.option.is-selected .option__orb {
  border-color: rgba(255, 252, 246, 0.95);
  box-shadow:
    0 0 0 2px var(--char),
    0 0 0 3px var(--ring-active);
}

/* The orb interior — SVG glyph / material / thumbnail */
.option__orb svg,
.option__orb img,
.option__orb .swatch {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* Material swatch for finishes — actual material gradients live here */
.swatch {
  border-radius: 50%;
}

.option__text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.option__name {
  font-family: var(--display-serif);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  color: var(--text-on-dark-active);
  letter-spacing: -0.002em;
}
.option__code {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
}
.option__desc {
  font-size: var(--fs-label);
  line-height: 1.5;
  color: var(--text-on-dark-primary);
  font-weight: 300;
  margin-top: 2px;
}

.option__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  flex: 0 0 auto;
}
.option__ring {
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(255, 252, 246, 0.34);
  transition: all var(--dur-hover) var(--ease-soft);
}
.option.is-selected .option__ring {
  background: var(--ivory);
  border-color: var(--ivory);
  box-shadow: inset 0 0 0 3px var(--char);
}
.option__block-tag {
  font-size: 9.5px;
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
  padding: 2px 6px;
  border: 1px solid var(--border-ivory);
  border-radius: var(--radius-hair);
  white-space: nowrap;
}

/* --- Nested sub-editor sheet (OBJ-21..25) -------------------------------
   Mounts INSIDE this browser envelope. Never a full-screen modal.
   Used for the Request Pricing form at the review step. */
.sheet {
  position: absolute;
  inset: 0;
  background: var(--glass-fill-high);
  border-radius: var(--radius-panel);
  backdrop-filter: blur(var(--blur-hud-strong));
  -webkit-backdrop-filter: blur(var(--blur-hud-strong));
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transform: translateY(4%);
  opacity: 0;
  pointer-events: none;
  transition:
    transform var(--dur-commit) var(--ease-soft),
    opacity   var(--dur-commit) var(--ease-soft);
}
.sheet.is-open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.sheet__header {
  display: flex; justify-content: space-between; align-items: baseline;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-ivory);
}
.sheet__title {
  font-family: var(--display-serif);
  font-weight: 300;
  font-size: 24px;
  line-height: var(--lh-editorial);
  color: var(--text-on-dark-active);
}
.sheet__eyebrow {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
}
.sheet__close {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: grid; place-items: center;
  color: var(--text-on-dark-helper);
  transition: color var(--dur-hover) var(--ease-soft),
              background var(--dur-hover) var(--ease-soft);
}
.sheet__close:hover { color: var(--text-on-dark-active); background: var(--halo-hover); }
.sheet__close::before, .sheet__close::after {
  content: "";
  position: absolute;
  width: 12px; height: 1px;
  background: currentColor;
}
.sheet__close { position: relative; }
.sheet__close::before { transform: rotate(45deg); }
.sheet__close::after  { transform: rotate(-45deg); }

.sheet__body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 16px;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,252,246,0.22) transparent;
}
.sheet__body::-webkit-scrollbar { width: 4px; }
.sheet__body::-webkit-scrollbar-thumb { background: rgba(255,252,246,0.18); border-radius: 2px; }

/* --- Form fields (quiet, luxurious, generous) --------------------------- */
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field__label {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
}
.field__helper {
  font-size: var(--fs-label);
  color: var(--text-on-dark-helper);
  font-weight: 300;
  font-style: italic;
}

.input, .textarea, .select {
  width: 100%;
  padding: 11px 14px;
  background: rgba(255, 252, 246, 0.06);
  border: 1px solid var(--border-ivory);
  border-radius: var(--radius-chip);
  color: var(--text-on-dark-active);
  font-family: var(--ui-sans);
  font-size: var(--fs-body);
  font-weight: 300;
  transition: border-color var(--dur-hover) var(--ease-soft),
              background var(--dur-hover) var(--ease-soft);
}
.input:focus, .textarea:focus, .select:focus {
  outline: none;
  border-color: rgba(255, 252, 246, 0.48);
  background: rgba(255, 252, 246, 0.09);
}
.input::placeholder, .textarea::placeholder {
  color: var(--text-on-dark-helper);
  font-style: italic;
  opacity: 0.8;
}
.textarea {
  min-height: 80px;
  resize: vertical;
  line-height: 1.55;
}
.select { appearance: none; background-image:
  linear-gradient(45deg, transparent 50%, currentColor 50%),
  linear-gradient(-45deg, transparent 50%, currentColor 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  padding-right: 34px;
}

/* Chip-group (budget bands, timing, tier) */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  font-size: var(--fs-label);
  letter-spacing: var(--track-caps);
  color: var(--text-on-dark-primary);
  border: 1px solid var(--border-ivory);
  background: transparent;
  font-weight: 500;
  transition: all var(--dur-hover) var(--ease-soft);
}
.chip:hover { color: var(--text-on-dark-active); border-color: rgba(255,252,246,0.42); }
.chip.is-active {
  background: var(--ivory);
  color: var(--char);
  border-color: var(--ivory);
}

/* Two-column field row where space permits */
.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 640px) {
  .row-2 { grid-template-columns: 1fr; }
}

.sheet__footer {
  padding-top: 14px;
  border-top: 1px solid var(--border-ivory);
  display: flex; justify-content: space-between; align-items: center;
  gap: 12px;
}

/* Success state after submit */
.sheet__success {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 36px 4px 10px;
  text-align: center;
}
.sheet__success-mark {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: grid; place-items: center;
  margin: 0 auto 8px;
  border: 1px solid rgba(255,252,246,0.42);
  color: var(--text-on-dark-active);
  font-family: var(--display-serif);
  font-size: 20px;
}
.sheet__success-title {
  font-family: var(--display-serif);
  font-weight: 300;
  font-size: 26px;
  line-height: var(--lh-editorial);
  color: var(--text-on-dark-active);
}
.sheet__success-body {
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-on-dark-primary);
  max-width: 42ch;
  margin: 0 auto;
}

/* --- Review state layout ------------------------------------------------ */
.review-grid {
  display: grid;
  gap: 12px;
}
.review-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-chip);
  background: rgba(255, 252, 246, 0.04);
  border: 1px solid var(--border-ivory);
}
.review-row__step {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  color: var(--text-on-dark-helper);
  font-weight: 500;
  width: 70px;
}
.review-row__name {
  font-family: var(--display-serif);
  font-weight: 500;
  font-size: 16px;
  color: var(--text-on-dark-active);
  letter-spacing: -0.002em;
}
.review-row__edit {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
  transition: color var(--dur-hover) var(--ease-soft);
}
.review-row__edit:hover { color: var(--text-on-dark-active); }

/* =========================================================================
   LAVAL — Creator Shell
   Implements Section C (OBJ-01..07, 11, 26) as a persistent topology.
   The shell does NOT reflow when the step changes. Only content mutates.
   ========================================================================= */

/* --- Reset & base -------------------------------------------------------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  overflow: hidden;                  /* the shell is its own viewport */
  font-family: var(--ui-sans);
  font-weight: 300;
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-primary);
  background: var(--char);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
img, svg { display: block; max-width: 100%; }

/* --- Shell grid ---------------------------------------------------------- *
   Column layout gives the left pane, protected stage, right browser their
   own territory. The category rail and HUD sit as absolute overlays.
   -------------------------------------------------------------------------- */
.shell {
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-columns:
    minmax(260px, 22vw)            /* left pane */
    minmax(320px, 1fr)             /* stage */
    minmax(300px, 24vw);           /* right browser */
  grid-template-rows:
    auto
    1fr
    auto;
  grid-template-areas:
    "top    top    top"
    "pane   stage  browser"
    "hud    hud    hud";
  background:
    radial-gradient(
      120% 80% at 50% 78%,
      var(--world-base) 0%,
      var(--world-mid) 48%,
      var(--world-top) 100%
    );
  color: var(--text-on-dark-primary);
}

/* --- Top governance band (OBJ-01 / OBJ-02 / OBJ-03) ---------------------- */
.top {
  grid-area: top;
  position: relative;
  z-index: var(--z-hud);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: var(--inset-band) calc(var(--inset-band) + 4px);
  gap: 16px;
  pointer-events: none;              /* children opt back in */
}
.top > * { pointer-events: auto; }

.top__left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.wordmark {
  font-family: var(--display-serif);
  font-weight: 300;
  font-size: 22px;
  letter-spacing: 0.22em;
  color: var(--text-on-dark-active);
}
.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  color: var(--text-on-dark-helper);
  font-weight: 500;
}
.crumb::before {
  content: "";
  width: 18px; height: 1px;
  background: var(--border-ivory);
}

.top__center {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--glass-fill);
  border: 1px solid var(--border-ivory);
  backdrop-filter: blur(var(--blur-hud));
  -webkit-backdrop-filter: blur(var(--blur-hud));
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-panel-soft);
}
.top__center .cap-label {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  color: var(--text-on-dark-helper);
  padding: 0 8px;
  text-transform: uppercase;
  font-weight: 500;
}
.top__center .cap-step {
  font-family: var(--display-serif);
  font-weight: 500;
  font-size: 15px;
  color: var(--text-on-dark-active);
  padding: 0 4px;
}
.cap-divider {
  width: 1px; height: 14px;
  background: var(--border-ivory);
}

.top__right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}
.pill-ghost, .pill-accent {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 16px;
  border-radius: var(--radius-pill);
  font-size: var(--fs-label);
  letter-spacing: var(--track-caps);
  font-weight: 500;
  transition: background var(--dur-hover) var(--ease-soft),
              color var(--dur-hover) var(--ease-soft),
              border-color var(--dur-hover) var(--ease-soft);
}
.pill-ghost {
  color: var(--text-on-dark-helper);
  border: 1px solid var(--border-ivory);
}
.pill-ghost:hover { color: var(--text-on-dark-active); border-color: rgba(255,252,246,0.42); }

.pill-accent {
  color: var(--char);
  background: var(--ivory);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 22px -14px rgba(0,0,0,0.45);
}
.pill-accent:hover { background: #ffffff; }

/* --- Left semantic pane (OBJ-04/05/06) ---------------------------------- */
.pane {
  grid-area: pane;
  position: relative;
  z-index: var(--z-hud);
  margin: 4px 0 var(--inset-band) var(--inset-band);
  padding: 26px 26px 22px;
  background: var(--glass-fill);
  border: 1px solid var(--border-ivory);
  backdrop-filter: blur(var(--blur-hud));
  -webkit-backdrop-filter: blur(var(--blur-hud));
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-panel);
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 0;
  overflow: hidden;
}
.pane__eyebrow {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
}
.pane__title {
  font-family: var(--display-serif);
  font-weight: 300;
  font-size: var(--fs-display-l);
  line-height: var(--lh-editorial);
  color: var(--text-on-dark-active);
  letter-spacing: -0.01em;
}
.pane__rule {
  height: 1px;
  background: var(--border-ivory);
  margin: 4px 0;
}
.pane__body {
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--text-on-dark-primary);
  font-weight: 300;
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,252,246,0.24) transparent;
}
.pane__body::-webkit-scrollbar { width: 4px; }
.pane__body::-webkit-scrollbar-thumb { background: rgba(255,252,246,0.18); border-radius: 2px; }

.pane__summary {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--border-ivory);
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.pane__summary-row {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 12px;
  font-size: var(--fs-label);
}
.pane__summary-row .k {
  color: var(--text-on-dark-helper);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  font-size: var(--fs-label-s);
}
.pane__summary-row .v {
  color: var(--text-on-dark-active);
  font-family: var(--display-serif);
  font-weight: 500;
  font-size: 14px;
  text-align: right;
}
.pane__summary-row .v.is-empty {
  color: var(--text-on-dark-helper);
  font-family: var(--ui-sans);
  font-weight: 300;
  font-style: italic;
  font-size: var(--fs-label);
}

/* --- Near-subject category rail (OBJ-07/08/09/10) ----------------------- */
.rail {
  position: absolute;
  left: calc(22vw + 20px);          /* just beyond the pane's right edge */
  top: 50%;
  transform: translateY(-50%);
  z-index: var(--z-hud);
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 12px 10px;
  background: var(--glass-fill-low);
  border: 1px solid var(--border-ivory);
  backdrop-filter: blur(var(--blur-hud));
  -webkit-backdrop-filter: blur(var(--blur-hud));
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-panel-soft);
}
.orb {
  width: var(--orb-cat); height: var(--orb-cat);
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
  transition: transform var(--dur-hover) var(--ease-soft);
}
.orb__inner {
  width: 30px; height: 30px;
  border-radius: 50%;
  display: grid; place-items: center;
  background: rgba(255, 252, 246, 0.05);
  border: 1px solid rgba(255, 252, 246, 0.18);
  color: var(--text-on-dark-helper);
  font-family: var(--display-serif);
  font-weight: 500;
  font-size: 13px;
  transition: all var(--dur-commit) var(--ease-soft);
}
.orb:hover .orb__inner {
  background: var(--halo-hover);
  color: var(--text-on-dark-active);
  border-color: rgba(255,252,246,0.42);
}
.orb.is-active .orb__inner {
  background: var(--ivory);
  color: var(--char);
  border-color: rgba(255, 252, 246, 0.95);
  box-shadow: 0 0 0 3px rgba(255, 250, 243, 0.14);
}
.orb.is-complete .orb__inner::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(255, 250, 243, 0.28);
}
.orb[disabled] { cursor: not-allowed; opacity: 0.55; }

/* Tooltip label that appears on hover — quiet, above blur */
.orb__label {
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background: var(--ivory);
  color: var(--char);
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  border-radius: var(--radius-pill);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-hover) var(--ease-soft);
  box-shadow: var(--shadow-panel);
}
.orb:hover .orb__label,
.orb.is-active .orb__label { opacity: 0; }  /* suppressed once shown in HUD */

/* --- Bottom HUD (HUD-GRP-A / B / C, HUD-01..07) ------------------------- */
.hud {
  grid-area: hud;
  position: relative;
  z-index: var(--z-hud);
  padding: 0 var(--inset-band) var(--inset-band);
  display: grid;
  place-items: center;
  pointer-events: none;
}
.hud__strip {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  padding: 10px 16px;
  background: var(--glass-fill);
  border: 1px solid var(--border-ivory);
  backdrop-filter: blur(var(--blur-hud));
  -webkit-backdrop-filter: blur(var(--blur-hud));
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-panel);
  pointer-events: auto;
  min-width: min(640px, 92vw);
}

/* Left descriptive state zone */
.hud__state {
  display: flex; align-items: center; gap: 10px;
  min-width: 0;
  padding-left: 6px;
}
.hud__state .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--ring-active-warm);
  box-shadow: 0 0 8px var(--ring-active-warm);
}
.hud__state-text {
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Center widget dock — individual tiles, visibly separated */
.hud__dock {
  display: flex;
  align-items: center;
  gap: var(--gap-dock);
}
.hud-tile {
  width: 34px; height: 34px;
  border-radius: var(--radius-chip);
  display: grid; place-items: center;
  background: rgba(255, 252, 246, 0.05);
  border: 1px solid rgba(255, 252, 246, 0.14);
  color: var(--text-on-dark-helper);
  font-family: var(--display-serif);
  font-weight: 500;
  font-size: 13px;
  transition: background var(--dur-hover) var(--ease-soft),
              color var(--dur-hover) var(--ease-soft),
              border-color var(--dur-hover) var(--ease-soft);
}
.hud-tile:hover {
  background: var(--halo-hover);
  color: var(--text-on-dark-active);
}
.hud-tile.is-active {
  background: var(--ivory);
  color: var(--char);
  border-color: rgba(255,252,246,0.95);
}
.hud-tile.is-complete {
  color: var(--text-on-dark-active);
  border-color: rgba(255,252,246,0.34);
}
.hud-tile[disabled] { opacity: 0.45; cursor: not-allowed; }

/* Right edge advance/back */
.hud__nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding-right: 4px;
}
.hud-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
  border: 1px solid transparent;
  transition: all var(--dur-hover) var(--ease-soft);
}
.hud-nav-btn:hover { color: var(--text-on-dark-active); border-color: var(--border-ivory); }
.hud-nav-btn.is-primary {
  background: rgba(255,250,243,0.12);
  color: var(--text-on-dark-active);
  border-color: rgba(255,252,246,0.34);
}
.hud-nav-btn.is-primary:hover { background: rgba(255,250,243,0.22); }
.hud-nav-btn[disabled] { opacity: 0.35; cursor: not-allowed; pointer-events: none; }

.hud-nav-btn .arrow { width: 14px; height: 1px; background: currentColor; position: relative; }
.hud-nav-btn .arrow::after {
  content: "";
  position: absolute;
  right: -1px; top: 50%;
  width: 6px; height: 6px;
  border-right: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: translateY(-50%) rotate(45deg);
}
.hud-nav-btn.is-back .arrow { transform: scaleX(-1); }

/* --- Responsive clamp (shell integrity preserved, never reflowed) ------- */
@media (max-width: 1100px) {
  .shell {
    grid-template-columns: minmax(220px, 26vw) 1fr minmax(260px, 30vw);
  }
  .rail { left: calc(26vw + 16px); }
}
@media (max-width: 820px) {
  /* Collapse to a stacked shell only at tablet/phone — the category rail
     moves to the bottom. Shell identity preserved, topology adapts. */
  .shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    grid-template-areas:
      "top"
      "stage"
      "browser"
      "hud";
  }
  .pane { display: none; }             /* the stage and HUD carry context */
  .rail {
    position: fixed;
    left: 50%; top: auto; bottom: calc(var(--inset-band) + 64px);
    transform: translateX(-50%);
    flex-direction: row;
    border-radius: var(--radius-pill);
  }
  .orb__label { left: 50%; top: calc(100% + 6px); transform: translateX(-50%); }
}

/* =========================================================================
   LAVAL — Protected Stage (OBJ-11..16)
   The subject (mantel) lives here. No HUD panel may invade the frieze axis.
   World shell (OBJ-14) + floor glow (OBJ-15) + fog (OBJ-16) live under the
   subject per the Z-layer discipline: World L0 / Floor L1 / Subject L2 /
   Hotspots L3 / HUD L4.
   ========================================================================= */

.stage {
  grid-area: stage;
  position: relative;
  overflow: hidden;
  z-index: var(--z-world);
}

/* The world shell — a soft warm studio, not a scenic environment.
   Recolors (LAW-10) would adjust these gradients without touching HUD. */
.stage__world {
  position: absolute; inset: 0;
  background:
    radial-gradient(
      60% 45% at 50% 70%,
      rgba(255, 244, 220, 0.08) 0%,
      rgba(255, 244, 220, 0.02) 45%,
      transparent 75%
    ),
    radial-gradient(
      120% 100% at 50% 110%,
      var(--world-base) 0%,
      var(--world-mid) 48%,
      var(--world-top) 100%
    );
  z-index: var(--z-world);
}

/* Floor glow — an ellipse of warm ivory under the subject.
   Stays subordinate to subject and HUD legibility. */
.stage__floor-glow {
  position: absolute;
  left: 50%; bottom: 6%;
  width: 72%; height: 22%;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse at center,
    var(--floor-glow) 0%,
    rgba(232, 220, 198, 0.08) 40%,
    transparent 70%
  );
  filter: blur(28px);
  z-index: var(--z-floor);
  pointer-events: none;
}

/* Fog — soft atmosphere, low contrast. Never reads as VFX. */
.stage__fog {
  position: absolute; inset: 0;
  background:
    radial-gradient(60% 40% at 50% 30%, var(--fog) 0%, transparent 70%),
    radial-gradient(80% 30% at 50% 95%, rgba(255, 248, 235, 0.04) 0%, transparent 70%);
  z-index: var(--z-floor);
  pointer-events: none;
}

/* Subtle vignette — section E: "very light use only" */
.stage__vignette {
  position: absolute; inset: 0;
  background: radial-gradient(
    100% 80% at 50% 50%,
    transparent 55%,
    rgba(0, 0, 0, 0.28) 100%
  );
  z-index: var(--z-hotspots);
  pointer-events: none;
  mix-blend-mode: multiply;
}

/* The subject zone itself — the camera acts on this element's transform. */
.stage__subject {
  position: absolute;
  inset: 0;
  z-index: var(--z-subject);
  display: grid;
  place-items: center;
  transition:
    transform var(--dur-reframe) var(--ease-calm),
    filter    var(--dur-reframe) var(--ease-calm);
  will-change: transform, filter;
}

/* The SVG mantel container. Width is generous for full-body framing;
   camera.js adjusts transform (scale + translate) to mimic push-in/pull-back. */
.mantel {
  width: min(62%, 640px);
  aspect-ratio: 5 / 6;
  position: relative;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.45));
  transition: filter var(--dur-reframe) var(--ease-calm);
}
.mantel svg { width: 100%; height: 100%; display: block; }

/* A gentle breath idle animation — below the "quiet utility software" line.
   Disabled by prefers-reduced-motion via tokens.css. */
@keyframes stage-breath {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-2px); }
}
.mantel { animation: stage-breath 6.5s var(--ease-calm) infinite; }

/* Empty state / pre-selection hint that reads as editorial quiet */
.stage__hint {
  position: absolute;
  left: 50%; bottom: 14%;
  transform: translateX(-50%);
  z-index: var(--z-hotspots);
  padding: 8px 16px;
  border: 1px solid var(--border-ivory);
  background: var(--glass-fill-low);
  backdrop-filter: blur(var(--blur-hud));
  -webkit-backdrop-filter: blur(var(--blur-hud));
  border-radius: var(--radius-pill);
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--text-on-dark-helper);
  opacity: 0;
  transition: opacity var(--dur-commit) var(--ease-soft);
}
.stage[data-step="family"]:not([data-family]) .stage__hint { opacity: 1; }

/* Connector SVG overlay — CONN-A..D. Shows during active focus states. */
.connectors {
  position: absolute; inset: 0;
  z-index: var(--z-hotspots);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--dur-commit) var(--ease-soft);
}
.connectors.is-visible { opacity: 1; }

.connectors line,
.connectors path {
  stroke: var(--connector-line);
  stroke-width: 1.25;
  stroke-linecap: round;
  fill: none;
  filter: drop-shadow(0 0 4px var(--connector-halo));
}
.connectors circle.node {
  fill: var(--connector-node);
  filter: drop-shadow(0 0 6px var(--connector-halo));
}
.connectors circle.node-origin {
  fill: var(--connector-line);
  r: 3;
}

/* Camera zones — applied to .stage__subject. Driven by data-framing attr. */
.stage__subject[data-framing="wide"]     { transform: scale(1.00) translate3d(0, 0, 0); }
.stage__subject[data-framing="crown"]    { transform: scale(1.26) translate3d(0, 11%, 0); }
.stage__subject[data-framing="legs"]     { transform: scale(1.32) translate3d(0, -10%, 0); }
.stage__subject[data-framing="opening"]  { transform: scale(1.18) translate3d(0, 2%, 0); }
.stage__subject[data-framing="review"]   { transform: scale(0.94); }

/* Mobile: camera stays wide to avoid cropping on small viewports. */
@media (max-width: 820px) {
  .stage__subject[data-framing] { transform: scale(1.0); }
  .mantel { width: min(76%, 420px); }
}

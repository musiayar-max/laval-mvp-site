/* =========================================================================
   LAVAL — Landing page
   A quiet editorial entry. Consistent with the configurator shell palette.
   Minimal — exists to route into /configurator.html in the MVP.
   ========================================================================= */

.landing {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background:
    radial-gradient(100% 60% at 50% 0%, #2a251f 0%, #1e1a16 60%, #161311 100%);
  color: var(--text-on-dark-primary);
  overflow: hidden;
  position: relative;
}

.landing::before {
  content: "";
  position: absolute;
  left: 50%; top: 40%;
  width: 80vmax; height: 80vmax;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle at center,
    rgba(232, 220, 198, 0.08) 0%,
    transparent 60%
  );
  pointer-events: none;
  filter: blur(20px);
}

.landing__nav {
  position: relative;
  padding: 28px max(28px, 4vw);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  z-index: 2;
}
.landing__links {
  display: flex;
  justify-content: flex-end;
  gap: 22px;
  font-size: var(--fs-label);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  color: var(--text-on-dark-helper);
  font-weight: 500;
}
.landing__links a { transition: color var(--dur-hover) var(--ease-soft); }
.landing__links a:hover { color: var(--text-on-dark-active); }

.landing__hero {
  position: relative;
  padding: 4vmin max(28px, 4vw) 6vmin;
  display: grid;
  align-content: center;
  gap: 28px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
}

.landing__eyebrow {
  font-size: var(--fs-label);
  letter-spacing: var(--track-eyebrow);
  text-transform: uppercase;
  color: var(--text-on-dark-helper);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 14px;
}
.landing__eyebrow::before {
  content: "";
  width: 28px; height: 1px;
  background: var(--border-ivory);
}

.landing__title {
  font-family: var(--display-serif);
  font-weight: 300;
  font-size: var(--fs-display-xl);
  line-height: 1.02;
  color: var(--text-on-dark-active);
  letter-spacing: -0.015em;
  max-width: 18ch;
}
.landing__title em {
  font-style: italic;
  font-weight: 300;
  color: var(--text-on-dark-primary);
}

.landing__sub {
  font-size: 17px;
  line-height: 1.7;
  color: var(--text-on-dark-primary);
  font-weight: 300;
  max-width: 48ch;
}

.landing__ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 6px;
}
.landing__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  font-size: var(--fs-label);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  font-weight: 500;
  border-radius: var(--radius-pill);
  transition: all var(--dur-commit) var(--ease-soft);
}
.landing__cta.is-primary {
  background: var(--ivory);
  color: var(--char);
  border: 1px solid var(--ivory);
}
.landing__cta.is-primary:hover {
  background: #ffffff;
  transform: translateY(-1px);
}
.landing__cta.is-ghost {
  color: var(--text-on-dark-primary);
  border: 1px solid var(--border-ivory);
}
.landing__cta.is-ghost:hover {
  color: var(--text-on-dark-active);
  border-color: rgba(255,252,246,0.42);
}
.landing__cta .arrow {
  width: 18px; height: 1px; background: currentColor; position: relative;
}
.landing__cta .arrow::after {
  content: ""; position: absolute; right: -1px; top: 50%;
  width: 7px; height: 7px;
  border-right: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: translateY(-50%) rotate(45deg);
}

.landing__foot {
  position: relative;
  padding: 22px max(28px, 4vw);
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  font-size: var(--fs-label-s);
  letter-spacing: var(--track-caps);
  text-transform: uppercase;
  color: var(--text-on-dark-helper);
  font-weight: 500;
  border-top: 1px solid var(--border-ivory);
  z-index: 2;
}

/* Quiet aside on the side — families list as editorial preview */
.landing__aside {
  margin-top: 32px;
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  font-size: var(--fs-label);
  color: var(--text-on-dark-helper);
}
.landing__aside-item {
  display: flex; flex-direction: column; gap: 4px;
}
.landing__aside-num {
  font-family: var(--display-serif);
  font-weight: 500;
  color: var(--text-on-dark-active);
  font-size: 18px;
}

@media (max-width: 680px) {
  .landing__title { font-size: clamp(40px, 10vw, 56px); }
  .landing__nav { grid-template-columns: auto 1fr; }
  .landing__links { display: none; }
}

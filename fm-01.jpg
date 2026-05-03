/* =========================================================================
   LAVAL — Design Tokens
   Derived from LAVAL_UI_Clone_Forensic_Spec_v7_4 Section E (material/atmosphere),
   Section F (typography), Section D (geometry), and the LAVAL brand stack.

   Override laws enforced:
   - Warm ivory / pale stone / parchment / stone-smoke / charcoal family only.
   - Cold game hues, frosted blues, neon accents are disallowed.
   - Cormorant Garamond for editorial hierarchy; Inter for functional UI.
   ========================================================================= */

:root {
  /* --- Core palette (brand-evidenced) --------------------------------- */
  --paper:        #ffffff;
  --ivory:        #faf7f2;          /* warm ivory glass wash base */
  --stone:        #e9e7e3;          /* pale stone / quiet taupe-gray */
  --stone-2:      #d9d6d0;          /* deeper pale stone */
  --parchment:    #efe9df;          /* parchment for warm surfaces */
  --smoke:        #a8a39a;          /* stone-smoke mid tone */
  --char:         #151515;          /* near-black charcoal */
  --char-soft:    #2a2723;          /* warmed charcoal */

  /* --- Text classes (OBJ-31/32/33) ------------------------------------ */
  --text-active:       rgba(21, 18, 14, 0.96);
  --text-primary:      rgba(21, 18, 14, 0.82);
  --text-secondary:    rgba(21, 18, 14, 0.64);
  --text-inactive:     rgba(21, 18, 14, 0.46);   /* still legible, not ambiguous */
  --text-disabled:     rgba(21, 18, 14, 0.32);

  --text-on-dark-active:   rgba(255, 250, 243, 0.96);
  --text-on-dark-primary:  rgba(255, 250, 243, 0.82);
  --text-on-dark-helper:   rgba(255, 250, 243, 0.65);

  /* --- Glass system (Section E tolerances) ---------------------------- */
  --glass-fill-low:    rgba(250, 247, 242, 0.08);
  --glass-fill:        rgba(250, 247, 242, 0.11);
  --glass-fill-high:   rgba(250, 247, 242, 0.14);
  --glass-lift:        rgba(255, 252, 246, 0.18);   /* inner ivory lift */

  --border-hair:       rgba(21, 21, 21, 0.08);
  --border-hair-soft:  rgba(21, 21, 21, 0.06);
  --border-hair-firm:  rgba(21, 21, 21, 0.10);
  --border-ivory:      rgba(255, 252, 246, 0.24);

  --blur-hud:          22px;                        /* target 18–26px band */
  --blur-hud-strong:   28px;

  --shadow-panel:      0 10px 30px -18px rgba(21, 18, 14, 0.35),
                       0 2px 8px -4px rgba(21, 18, 14, 0.18);
  --shadow-panel-soft: 0 6px 20px -14px rgba(21, 18, 14, 0.28);

  /* --- Selection emphasis (OBJ-09/20) --------------------------------- */
  --ring-active:       rgba(255, 250, 243, 0.78);
  --ring-active-warm:  rgba(232, 217, 190, 0.70);
  --halo-hover:        rgba(255, 250, 243, 0.22);

  /* --- World shell (OBJ-14/15/16) ------------------------------------- */
  --world-top:         #1e1a16;                     /* warm charcoal sky */
  --world-mid:         #2b2620;                     /* warmed mid */
  --world-base:        #35302a;                     /* floor meets backwall */
  --floor-glow:        rgba(232, 220, 198, 0.22);   /* warm ivory glow */
  --fog:               rgba(245, 238, 225, 0.06);

  /* --- Connector system (CONN-A..D) ----------------------------------- */
  --connector-line:    rgba(255, 248, 235, 0.55);
  --connector-node:    rgba(255, 248, 235, 0.88);
  --connector-halo:    rgba(255, 242, 220, 0.18);

  /* --- Typography (Section F, LAVAL override law) --------------------- */
  --display-serif:  'Cormorant Garamond', 'Cormorant', Georgia, 'Times New Roman', serif;
  --ui-sans:        'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --fs-display-xl:  clamp(44px, 5.6vw, 84px);
  --fs-display-l:   clamp(32px, 3.4vw, 52px);
  --fs-display-m:   clamp(22px, 2.0vw, 30px);
  --fs-display-s:   18px;

  --fs-body:        14px;
  --fs-body-s:      13px;
  --fs-label:       12px;
  --fs-label-s:     11px;            /* minimum interactive floor */
  --fs-micro:       10.5px;

  --lh-editorial:   1.08;
  --lh-body:        1.80;
  --lh-ui:          1.40;

  --track-eyebrow:  0.18em;
  --track-caps:     0.08em;

  /* --- Geometry (Section D) ------------------------------------------- */
  --inset-band:     22px;            /* top governance band inset (1.5–2.5% of typical W) */
  --gap-hud:        14px;
  --gap-dock:       8px;

  --radius-pill:    999px;
  --radius-panel:   20px;
  --radius-panel-s: 14px;
  --radius-chip:    12px;
  --radius-hair:    2px;

  --orb-cat:        40px;            /* category rail orb (28–40) */
  --orb-browser:    72px;            /* browser option orb (56–74) */

  /* --- Motion (Section G) --------------------------------------------- */
  --ease-soft:      cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-calm:      cubic-bezier(0.4, 0, 0.2, 1);

  --dur-hover:      120ms;
  --dur-commit:     180ms;
  --dur-reframe:    320ms;
  --dur-bridge:     480ms;

  /* --- Z layer discipline (Section D: L0..L6) ------------------------- */
  --z-world:        0;
  --z-floor:        1;
  --z-subject:      2;
  --z-hotspots:     3;
  --z-hud:          4;
  --z-overlay:      5;
  --z-cursor:       6;
}

/* Reduced motion respects the forensic spec's restraint law. */
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-hover:   0ms;
    --dur-commit:  0ms;
    --dur-reframe: 0ms;
    --dur-bridge:  0ms;
  }
}

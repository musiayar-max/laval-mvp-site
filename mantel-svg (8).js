/* ============================================================
   LAVAL — HOMEPAGE ONLY
   Full-viewport-width layout applied.
   Hero bleeds behind transparent nav (100svh).
   Feature card is TRULY full-bleed (100vw, no constraint).
   Rail extends with minimal edge padding.
============================================================ */

/* -----------------------------------------------------------
   HOMEPAGE HERO: bleeds behind transparent nav
----------------------------------------------------------- */

.homepage main {
  padding-top: 0;
}

.homepage .hero--home {
  min-height: 100svh;
  align-items: center;
}

/* -----------------------------------------------------------
   HOMEPAGE HEADER
   Transparent over hero, fills after scroll.
----------------------------------------------------------- */

.homepage .site-header {
  background: transparent;
  border-bottom-color: transparent;
  box-shadow: none;
  color: #ffffff;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.homepage .site-header .brand,
.homepage .site-header .menu-trigger,
.homepage .site-header .icon-button {
  color: #ffffff;
}

.homepage .site-header.is-scrolled {
  background: rgba(250, 247, 242, 0.96);
  border-bottom-color: rgba(21, 21, 21, 0.10);
  color: var(--text);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.homepage .site-header.is-scrolled .brand,
.homepage .site-header.is-scrolled .menu-trigger,
.homepage .site-header.is-scrolled .icon-button {
  color: var(--text);
}

/* -----------------------------------------------------------
   HERO
----------------------------------------------------------- */

.hero--home .hero-media {
  background-image: url('../images/laval-hero-desktop-v1.png');
  background-position: center center;
}

.hero--home .hero-scrim {
  background:
    linear-gradient(180deg,
      rgba(0,0,0,0.10) 0%,
      rgba(0,0,0,0.06) 38%,
      rgba(0,0,0,0.46) 100%
    );
}

/* Hero inner uses the narrow container but on the homepage
   we widen it so the centered text can breathe. */
.hero--home .hero-inner {
  padding-bottom: clamp(72px, 11vh, 120px);
  max-width: none;
  padding-left: var(--frame-pad);
  padding-right: var(--frame-pad);
}

.hero-copy--center {
  max-width: 54rem;
  margin: 0 auto;
  text-align: center;
  color: #ffffff;
}

.hero--home .hero-location {
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.65);
}

.hero--home .hero-copy h1 {
  margin: 0;
  max-width: none;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.01em;
  line-height: 1.05;
  font-size: clamp(3.8rem, 7.5vw, 7rem);
  color: #ffffff;
}

.hero--home .hero-subline {
  margin: 24px auto 0;
  max-width: 36ch;
  font-family: var(--ui-sans);
  font-weight: 300;
  font-size: clamp(1rem, 1.15vw, 1.06rem);
  line-height: 1.78;
  color: rgba(255, 255, 255, 0.82);
}

.hero-actions--center {
  justify-content: center;
  margin-top: 34px;
}

/* -----------------------------------------------------------
   FAMILIES
   Section head uses wider container; rail goes full-width.
----------------------------------------------------------- */

.families-section {
  background: var(--bg);
  padding-top: clamp(100px, 11vw, 140px);
  padding-bottom: clamp(96px, 10vw, 130px);
}

/* Override the narrow container for the families section head —
   it needs to align with the wider rail below it. */
.families-section .container {
  max-width: none;
}

.families-section .section-head {
  max-width: none;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: clamp(36px, 4vw, 52px);
  text-align: left;
}

.families-section .section-head .eyebrow {
  display: none;
}

.families-section .section-head h2 {
  margin: 0 0 12px;
  max-width: none;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.1;
  font-size: clamp(2.7rem, 4.2vw, 4.4rem);
  color: var(--text);
}

.families-section .section-head p {
  margin: 0;
  max-width: 52ch;
  font-family: var(--ui-sans);
  font-weight: 300;
  font-size: clamp(1rem, 1.12vw, 1.04rem);
  line-height: 1.78;
  color: var(--muted);
}

.families-section .rail {
  align-items: start;
}

.families-section .rail-item {
  gap: 20px;
}

.families-section .rail-copy {
  padding-right: 0;
}

.families-section .rail-copy h3 {
  margin-bottom: 10px;
}

.families-section .rail-copy p {
  max-width: 30ch;
}

/* -----------------------------------------------------------
   FEATURE — truly full-bleed
----------------------------------------------------------- */

.home-editorial-section {
  background: var(--bg);
  padding-top: 0;
  padding-bottom: clamp(100px, 11vw, 140px);
}

.home-editorial-section .feature-image {
  aspect-ratio: 16 / 7.4;
}

.home-editorial-section .feature-content h2 {
  max-width: none;
  white-space: nowrap;
  font-weight: 300;
  letter-spacing: 0.02em;
}

.home-editorial-section .feature-content p {
  max-width: 34ch;
}

/* -----------------------------------------------------------
   QUIET CTA
----------------------------------------------------------- */

.home-cta-section {
  background: #e9e7e3;
  padding-top: clamp(88px, 10vw, 128px);
  padding-bottom: clamp(88px, 10vw, 128px);
}

.home-cta-wrap {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding-left: var(--frame-pad);
  padding-right: var(--frame-pad);
}

.home-cta-block {
  max-width: 48rem;
}

.home-cta-block h2 {
  margin: 0;
  font-family: var(--display-serif);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.1;
  font-size: clamp(2.4rem, 4vw, 4rem);
  color: var(--text);
}

.home-cta-lead {
  margin: 20px 0 0;
  max-width: 48ch;
  font-family: var(--ui-sans);
  font-weight: 300;
  font-size: clamp(1rem, 1.15vw, 1.06rem);
  line-height: 1.78;
  color: var(--text);
}

.home-cta-body {
  margin: 28px 0 0;
  max-width: 50ch;
  font-family: var(--ui-sans);
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.82;
  color: var(--muted);
}

.home-cta-link-row {
  margin-top: 34px;
}

/* -----------------------------------------------------------
   MOBILE
----------------------------------------------------------- */

@media (max-width: 760px) {
  .hero--home .hero-media {
    background-image: url('../images/laval-hero-mobile-v1.png');
    background-position: center top;
  }

  .hero--home .hero-scrim {
    background:
      linear-gradient(180deg,
        rgba(0,0,0,0.12) 0%,
        rgba(0,0,0,0.10) 40%,
        rgba(0,0,0,0.46) 100%
      );
  }

  .hero--home .hero-inner {
    padding-bottom: 52px;
  }

  .hero-copy--center {
    text-align: left;
  }

  .hero--home .hero-copy h1 {
    font-size: clamp(3rem, 13vw, 4.4rem);
    line-height: 1.06;
  }

  .hero--home .hero-subline {
    max-width: 28ch;
    font-size: 1rem;
    line-height: 1.65;
    margin-left: 0;
    margin-right: 0;
  }

  .hero-actions--center {
    justify-content: flex-start;
  }

  .families-section {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .families-section .section-head {
    margin-bottom: 32px;
  }

  .families-section .section-head h2 {
    font-size: clamp(2.2rem, 10vw, 3rem);
    line-height: 1.1;
    margin-bottom: 12px;
  }

  .families-section .section-head p {
    max-width: 100%;
    font-size: 1rem;
  }

  .home-editorial-section {
    padding-bottom: 80px;
  }

  .home-editorial-section .feature-image {
    aspect-ratio: 4 / 4.9;
  }

  .home-editorial-section .feature-content h2 {
    white-space: normal;
    font-size: clamp(2rem, 8vw, 3rem);
  }

  .home-cta-section {
    padding-top: 72px;
    padding-bottom: 72px;
  }

  .home-cta-block h2 {
    font-size: clamp(1.95rem, 9vw, 2.8rem);
    line-height: 1.1;
  }

  .home-cta-lead,
  .home-cta-body {
    max-width: 100%;
  }
}

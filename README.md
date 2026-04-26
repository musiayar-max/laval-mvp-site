/* =========================================================================
   LAVAL — Procedural SVG Mantel Renderer
   Replaces the PNG placeholder approach from the Asset Production Map with a
   live vector renderer. Every selection morphs the geometry in-place.
   - Family drives base silhouette proportion.
   - Profile drives the opening geometry + frieze language.
   - Leg drives jamb profile.
   - Shelf drives crown profile.
   - Finish drives stone material (gradient fills + optional veining).

   The renderer is intentionally restrained — simplified silhouettes, not
   photoreal renders. This is the "rough placeholders hidden behind a premium
   shell" contract applied at vector fidelity.
   ========================================================================= */

import { finishById } from './data.js';

const VB_W = 500;   // viewBox width
const VB_H = 600;   // viewBox height (mantel taller than wide)

/* ----- Finish → gradient stops --------------------------------------------*/
function finishStops(finish) {
  if (!finish) return { base: '#efece4', hi: '#f7f4ec', lo: '#c8c2b6', vein: null };
  return finish.swatch;
}

/* ----- Path generators ----------------------------------------------------*/
function openingPath(profileId) {
  // Opening rectangle dimensions — consistent across profiles, geometry varies.
  // Coords are in viewBox space.
  const cx = VB_W / 2;
  const openW = 220;
  const openH = 260;
  const x0 = cx - openW / 2;
  const x1 = cx + openW / 2;
  const y0 = 190;          // top of opening
  const y1 = y0 + openH;   // bottom of opening (== top of hearth plate)

  switch (profileId) {
    // Rectangular
    case 'TC-P1':
    case 'TC-P2':
      return `M ${x0} ${y0} L ${x1} ${y0} L ${x1} ${y1} L ${x0} ${y1} Z`;

    // Soft shoulder rectangle
    case 'TC-P3':
    case 'SS-P1':
      return `M ${x0} ${y0 + 22}
              Q ${x0} ${y0} ${x0 + 22} ${y0}
              L ${x1 - 22} ${y0}
              Q ${x1} ${y0} ${x1} ${y0 + 22}
              L ${x1} ${y1}
              L ${x0} ${y1} Z`;

    // Serpentine / wave shoulder
    case 'SS-P2':
    case 'FO-P1': {
      const peak = y0 - 10;
      return `M ${x0} ${y0 + 28}
              C ${x0} ${y0}     ${x0 + 40} ${y0 - 4} ${cx - 34} ${peak + 10}
              Q ${cx} ${peak}   ${cx + 34} ${peak + 10}
              C ${x1 - 40} ${y0 - 4} ${x1} ${y0}     ${x1} ${y0 + 28}
              L ${x1} ${y1}
              L ${x0} ${y1} Z`;
    }

    // Full classical arch
    case 'FO-P3':
    case 'FO-P2': {
      const r = openW / 2;
      const ay = y0 - r + 40;
      return `M ${x0} ${y0 + r - 40}
              A ${r} ${r} 0 0 1 ${x1} ${y0 + r - 40}
              L ${x1} ${y1}
              L ${x0} ${y1} Z`;
    }

    // Waisted / niche shoulder
    case 'SS-P3':
      return `M ${x0 + 10} ${y0 + 30}
              Q ${x0 + 10} ${y0} ${cx - 50} ${y0 - 6}
              Q ${cx} ${y0 - 24} ${cx + 50} ${y0 - 6}
              Q ${x1 - 10} ${y0} ${x1 - 10} ${y0 + 30}
              L ${x1 - 10} ${y1}
              L ${x0 + 10} ${y1} Z`;

    default:
      return `M ${x0} ${y0} L ${x1} ${y0} L ${x1} ${y1} L ${x0} ${y1} Z`;
  }
}

function legPath(legId, side /* 'L' | 'R' */) {
  // Legs are mirror pairs. All paths returned as if left leg; mirrored for right.
  const outerX = side === 'L' ? 60 : VB_W - 60;
  const innerX = side === 'L' ? 140 : VB_W - 140;
  const top = 180;
  const bottom = 520;
  const dir = side === 'L' ? 1 : -1;

  switch (legId) {
    case 'LG-1': // Plain jamb — clean rectangle
      return `M ${outerX} ${top} L ${innerX} ${top} L ${innerX} ${bottom} L ${outerX} ${bottom} Z`;

    case 'LG-2': // Fluted pilaster — same silhouette, flutes drawn separately
      return `M ${outerX} ${top} L ${innerX} ${top} L ${innerX} ${bottom} L ${outerX} ${bottom} Z`;

    case 'LG-3': // Rounded sculpted — bulged inner edge
      return `M ${outerX} ${top}
              L ${innerX} ${top}
              Q ${innerX + (10 * dir)} ${top + 110} ${innerX} ${top + 170}
              Q ${innerX + (6 * dir)} ${top + 260} ${innerX} ${bottom}
              L ${outerX} ${bottom} Z`;

    case 'LG-4': // Tapered curve — narrows slightly downward
      return `M ${outerX} ${top}
              L ${innerX} ${top}
              C ${innerX + (4 * dir)} ${top + 180} ${innerX + (8 * dir)} ${bottom - 40} ${innerX - (6 * dir)} ${bottom}
              L ${outerX} ${bottom} Z`;

    case 'LG-5': // French scroll — expressive curl at the base
      return `M ${outerX} ${top}
              L ${innerX} ${top}
              L ${innerX} ${bottom - 80}
              Q ${innerX + (4 * dir)} ${bottom - 50} ${innerX - (8 * dir)} ${bottom - 30}
              Q ${innerX - (20 * dir)} ${bottom - 8} ${innerX - (30 * dir)} ${bottom}
              L ${outerX} ${bottom} Z`;

    default:
      return `M ${outerX} ${top} L ${innerX} ${top} L ${innerX} ${bottom} L ${outerX} ${bottom} Z`;
  }
}

function shelfPath(shelfId) {
  // Shelf sits above the frieze, roughly y = 110..170 depending on shelf
  switch (shelfId) {
    case 'SH-1': // Classical stepped shelf
      return `M 40 160
              L 460 160
              L 460 130
              L 450 130
              L 450 118
              L 50 118
              L 50 130
              L 40 130 Z`;

    case 'SH-2': // Mitered frame shelf — single crisp step
      return `M 40 160 L 460 160 L 460 120 L 40 120 Z`;

    case 'SH-3': // Sculpted crown — thicker, rolled
      return `M 38 165
              L 462 165
              Q 470 160 466 148
              Q 468 134 458 122
              Q 454 112 438 110
              L 62 110
              Q 46 112 42 122
              Q 32 134 34 148
              Q 30 160 38 165 Z`;

    case 'SH-4': // French serpentine shelf — curved underside
      return `M 40 160
              Q 70 155 110 158
              Q 250 172 390 158
              Q 430 155 460 160
              L 460 124
              Q 430 118 390 122
              Q 250 108 110 122
              Q 70 118 40 124 Z`;

    default:
      return `M 40 160 L 460 160 L 460 120 L 40 120 Z`;
  }
}

function plinthPath() {
  return `M 30 520 L 470 520 L 470 560 L 30 560 Z`;
}

function friezeBodyPath() {
  // The frieze/body area sits between shelf underside and opening top
  // It spans the full width minus a small margin, from y=160 to y=190
  return `M 50 160 L 450 160 L 450 190 L 50 190 Z`;
}

/* ----- Ornament overlays per profile -------------------------------------*/
function ornamentOverlay(profileId) {
  const cx = VB_W / 2;

  switch (profileId) {
    case 'TC-P2': // Fluted lintel — subtle vertical grooves on frieze
      return Array.from({ length: 8 }).map((_, i) => {
        const x = 100 + i * 40;
        return `<line x1="${x}" y1="168" x2="${x}" y2="182"
                stroke="rgba(40,32,22,0.22)" stroke-width="1.2" />`;
      }).join('');

    case 'FO-P1':
    case 'FO-P3': // Crest — a small centered ornament on frieze
      return `
        <path d="M ${cx - 18} 180
                 Q ${cx - 8} 168 ${cx} 174
                 Q ${cx + 8} 168 ${cx + 18} 180
                 Q ${cx + 10} 186 ${cx} 184
                 Q ${cx - 10} 186 ${cx - 18} 180 Z"
              fill="rgba(40,32,22,0.28)" />
        <circle cx="${cx}" cy="176" r="1.8" fill="rgba(40,32,22,0.36)" />`;

    case 'FO-P2': // Baroque relief — distributed ornaments across frieze
      return [
        `<circle cx="${cx - 120}" cy="175" r="4" fill="rgba(40,32,22,0.22)" />`,
        `<circle cx="${cx - 60}"  cy="175" r="5" fill="rgba(40,32,22,0.26)" />`,
        `<path d="M ${cx - 20} 178 Q ${cx} 166 ${cx + 20} 178 Q ${cx + 10} 186 ${cx} 182 Q ${cx - 10} 186 ${cx - 20} 178 Z"
              fill="rgba(40,32,22,0.30)" />`,
        `<circle cx="${cx + 60}"  cy="175" r="5" fill="rgba(40,32,22,0.26)" />`,
        `<circle cx="${cx + 120}" cy="175" r="4" fill="rgba(40,32,22,0.22)" />`,
      ].join('');

    case 'SS-P2': // Wave frieze — soft curved hairline
      return `<path d="M 60 176 Q 130 168 200 176 T 340 176 T 440 176"
              stroke="rgba(40,32,22,0.24)" stroke-width="1.2" fill="none" />`;

    default:
      return '';
  }
}

/* ----- Leg detail overlays (flutes, rounds) ------------------------------*/
function legDetail(legId, side) {
  const dir = side === 'L' ? 1 : -1;
  const baseX = side === 'L' ? 100 : VB_W - 100;
  if (legId === 'LG-2') {
    return Array.from({ length: 3 }).map((_, i) => {
      const x = baseX + (i - 1) * 14 * dir;
      return `<line x1="${x}" y1="195" x2="${x}" y2="510"
              stroke="rgba(40,32,22,0.20)" stroke-width="1.2" />`;
    }).join('');
  }
  if (legId === 'LG-5') {
    // A small scroll detail near the base
    const sx = side === 'L' ? 110 : VB_W - 110;
    return `<circle cx="${sx}" cy="500" r="6" fill="none"
              stroke="rgba(40,32,22,0.28)" stroke-width="1.2" />
            <circle cx="${sx}" cy="500" r="2.5" fill="rgba(40,32,22,0.32)" />`;
  }
  return '';
}

/* ----- Vein overlays for marble finishes ---------------------------------*/
function veinOverlay(finish) {
  if (!finish || !finish.swatch.vein) return '';
  const c = finish.swatch.vein;
  // Restrained, hand-drawn-ish veining paths. Higher-drama for FN-4.
  const heavy = finish.id === 'FN-4';
  const paths = heavy
    ? [
        'M 60 250 Q 150 290 240 260 T 420 300',
        'M 80 420 Q 180 390 260 430 T 430 400',
        'M 120 180 Q 180 200 240 190',
        'M 280 520 Q 340 500 400 530',
        'M 60 340 Q 120 360 200 340',
      ]
    : [
        'M 80 280 Q 160 300 240 280 T 420 310',
        'M 100 430 Q 200 410 300 440',
      ];
  return paths.map(d =>
    `<path d="${d}" stroke="${c}" stroke-width="${heavy ? 1.6 : 1.1}" fill="none"
       stroke-linecap="round" opacity="${heavy ? 0.85 : 0.55}" />`
  ).join('');
}

/* ----- Main render --------------------------------------------------------*/
export function renderMantel({ family, profile, leg, shelf, finish }) {
  const f = finishById(finish);
  const stops = finishStops(f);
  const gradId = 'stoneGrad_' + (finish || 'default');
  const veinGradId = 'veinGrad_' + (finish || 'default');

  // The "firebox" — behind the opening. Dark, warm.
  const firebox = `
    <rect x="140" y="190" width="220" height="260" rx="2"
          fill="url(#fireboxGrad)" />
  `;

  const profileId = profile || 'TC-P1';
  const legId     = leg     || 'LG-1';
  const shelfId   = shelf   || 'SH-2';

  const legL = legPath(legId, 'L');
  const legR = legPath(legId, 'R');
  const crown = shelfPath(shelfId);
  const plinth = plinthPath();
  const frieze = friezeBodyPath();
  const opening = openingPath(profileId);

  // Family-level proportional adjustment via group transform
  const familyScale =
    family === 'soft-sculptural' ? 'scale(1.0, 1.02)' :
    family === 'french-ornate'   ? 'scale(1.02, 1.0)' :
    'scale(1, 1)';

  return `
<svg viewBox="0 0 ${VB_W} ${VB_H}" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Mantel preview — live composition">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="${stops.hi}" />
      <stop offset="50%" stop-color="${stops.base}" />
      <stop offset="100%" stop-color="${stops.lo}" />
    </linearGradient>
    <linearGradient id="fireboxGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#0d0a07" />
      <stop offset="100%" stop-color="#1f1812" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
      <feOffset dx="0" dy="4" result="offsetblur" />
      <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <clipPath id="stoneClip">
      <path d="${legL} ${legR} ${crown} ${plinth} ${frieze}" />
    </clipPath>
  </defs>

  <!-- Firebox (goes behind stone body) -->
  ${firebox}

  <!-- Stone body group -->
  <g transform="translate(${VB_W/2} ${VB_H/2}) ${familyScale} translate(${-VB_W/2} ${-VB_H/2})">
    <!-- Solid stone silhouette first -->
    <path d="${plinth}" fill="url(#${gradId})" filter="url(#softShadow)" />
    <path d="${legL}"   fill="url(#${gradId})" filter="url(#softShadow)" />
    <path d="${legR}"   fill="url(#${gradId})" filter="url(#softShadow)" />
    <path d="${frieze}" fill="url(#${gradId})" />
    <path d="${crown}"  fill="url(#${gradId})" filter="url(#softShadow)" />

    <!-- Veining overlay, clipped to stone body -->
    <g clip-path="url(#stoneClip)">
      ${veinOverlay(f)}
    </g>

    <!-- Ornament on frieze -->
    ${ornamentOverlay(profileId)}

    <!-- Leg detail (flutes, scrolls) -->
    ${legDetail(legId, 'L')}
    ${legDetail(legId, 'R')}

    <!-- Opening cut (the opening sits OVER the stone to punch through visually) -->
    <path d="${opening}" fill="url(#fireboxGrad)" />

    <!-- Subtle inner shadow around opening for depth -->
    <path d="${opening}" fill="none" stroke="rgba(0,0,0,0.38)" stroke-width="2" />
  </g>

  <!-- Top highlight — a quiet ivory light catch on the shelf -->
  <path d="M 60 118 L 440 118" stroke="rgba(255,250,240,0.28)" stroke-width="0.8" />
</svg>`;
}

export function mount(el, selection) {
  el.innerHTML = renderMantel(selection);
}
Cloudflare rebuild trigger.

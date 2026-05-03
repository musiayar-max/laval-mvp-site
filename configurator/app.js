/* ==========================================================================
   LAVAL Configurator — app.js (refined build)
   --------------------------------------------------------------------------
   All named functions required by the refined build
     setActiveStep · renderStepRail · renderDockTokens · renderOptionTiles
     selectOption · renderSelectionSummary · resetConfigurator
     canContinue · continueToNextStep
   --------------------------------------------------------------------------
   No React / Vite / Tailwind / Next / backend.
   No nested editor population (refined build).
   No connector activation (refined build).
   No responsive layout (refined build).
   Undo / Redo / Save Draft remain non-functional placeholders (refined build).
   ========================================================================== */

import {
  STEPS,
  STEP_ORDER,
  STEP_OPTIONS,
  DEFAULT_STEP_ID
} from './data/options.js';

import {
  ASSET_VARIANTS,
  FAMILY_DEFAULT_VARIANT,
  ASSET_OPTION_TO_LAYER,
  SELECTABLE_LAYER_STEPS
} from './data/asset-catalog.js';

// ---------------------------------------------------------------------------
// LAVAL_DEV_LEAD_LOGGING (refined build)
// ---------------------------------------------------------------------------
// Development-only console logging of the structured lead payload.
// THIS IS A PROTOTYPE FLAG. It must be set to false (or removed entirely
// and replaced with a real submission endpoint) BEFORE production lead
// routing. The current MVP has no backend by D-031/D-032; this flag makes
// the prototype boundary explicit so a future engineer cannot mistake
// console-logging for a production lead handoff.
// ---------------------------------------------------------------------------
const LAVAL_DEV_LEAD_LOGGING = true; // Development-only. Disable or replace before production lead routing.

// ---------------------------------------------------------------------------
// State
// All mutable state lives in this single object. Nothing else holds state.
// ---------------------------------------------------------------------------
const state = {
  activeStepId: DEFAULT_STEP_ID,
  selections: {
    family:  null,
    profile: null,
    leg:     null,
    shelf:   null,
    finish:  null
  },
  editorActiveTab: 'stone-finish',  // refined build
  connectorTimer:  null,            // refined build
  reviewActive:    false,           // refined build
  reviewSubmitted: false            // refined build
};

// ---------------------------------------------------------------------------
// DOM element references (resolved once after DOMContentLoaded)
// ---------------------------------------------------------------------------
const el = {};

function resolveElements() {
  el.rail          = document.getElementById('laval-step-rail-list');
  el.dockWidgets   = document.getElementById('laval-dock-widgets');
  el.dockStepText  = document.getElementById('laval-dock-step-text');
  el.browserGrid   = document.getElementById('laval-browser-grid');
  el.browserTitle  = document.getElementById('laval-browser-title');
  el.paneEyebrow   = document.getElementById('laval-pane-eyebrow');
  el.paneTitle     = document.getElementById('laval-pane-title');
  el.paneHelper    = document.getElementById('laval-pane-helper');
  el.summaryList   = document.querySelector('.laval-pane-summary-list');
  el.continueBtn   = document.querySelector('.laval-dock-advance');
  el.resetBtn      = document.querySelector('.laval-top-utility [aria-label="Reset selection"]');
  el.stageCaption  = document.querySelector('.laval-stage-caption-text');
  el.rightBrowser  = document.querySelector('.laval-right-browser');   // refined build
  el.editorSlot    = document.getElementById('laval-editor-slot');     // refined build
  el.shell         = document.getElementById('laval-shell');           // refined build
  el.connectorLayer = document.getElementById('laval-connector-layer'); // refined build
  // refined build
  el.reviewSheet   = document.getElementById('laval-review-sheet');
  el.reviewBack    = document.getElementById('laval-review-back');
  el.reviewSummary = document.getElementById('laval-review-summary-list');
  el.reviewForm    = document.getElementById('laval-review-form');
  el.reviewConfirm = document.getElementById('laval-review-confirm');
}

// ---------------------------------------------------------------------------
// setActiveStep(stepId)
// Central state transition. refined build
// refined build
// refined build
// ---------------------------------------------------------------------------
export function setActiveStep(stepId) {
  if (!STEP_ORDER.includes(stepId)) return;
  deactivateReviewState();            // refined build
  state.activeStepId = stepId;
  hideConnector();
  renderStepRail();
  renderDockTokens();
  renderOptionTiles(stepId);
  updatePaneForStep(stepId);
  updateDockStepText(stepId);
  updateContinueButton();
  if (stepId === 'finish') {
    mountNestedEditor();
  } else {
    unmountNestedEditor();
  }
}

// ---------------------------------------------------------------------------
// renderStepRail()
// Renders all five MantelStepRail orbs. Marks the active one as is-selected.
// Markup only — click delegation is wired once in wireGlobalEvents().
// ---------------------------------------------------------------------------
export function renderStepRail() {
  if (!el.rail) return;
  el.rail.innerHTML = STEPS.map((step) => {
    const isActive = step.id === state.activeStepId;
    const isDone   = state.selections[step.id] !== null;
    return `<li>
      <button
        class="laval-step-orb${isActive ? ' is-selected' : ''}${isDone ? ' is-done' : ''}"
        type="button"
        data-step-id="${step.id}"
        aria-label="${step.label} — ${step.eyebrow}"
        aria-current="${isActive ? 'step' : 'false'}">
        <span aria-hidden="true">${step.index}</span>
        <span class="laval-step-orb-tooltip">${step.label}</span>
      </button>
    </li>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// renderDockTokens()
// Renders the five compact numbered tokens inside the BottomWidgetDock.
// Marks active and done states.
// Markup only — click delegation is wired once in wireGlobalEvents().
// ---------------------------------------------------------------------------
export function renderDockTokens() {
  if (!el.dockWidgets) return;
  el.dockWidgets.innerHTML = STEPS.map((step) => {
    const isActive = step.id === state.activeStepId;
    const isDone   = state.selections[step.id] !== null;
    return `<button
      class="laval-dock-token${isActive ? ' is-selected' : ''}${isDone ? ' is-done' : ''}"
      type="button"
      data-step-id="${step.id}"
      aria-label="${step.label}"
      aria-current="${isActive ? 'step' : 'false'}">
      ${step.index}
    </button>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// renderOptionTiles(stepId)
// Populates the RightOptionBrowser grid with options for the given step.
// Marks the currently selected option for that step as is-selected.
// Also updates the browser header title for the active step.
// Markup only — click delegation is wired once in wireGlobalEvents().
// ---------------------------------------------------------------------------
export function renderOptionTiles(stepId) {
  if (!el.browserGrid) return;
  let options = STEP_OPTIONS[stepId] || [];
  // Real-image pass: all downstream options are constrained by selected family.
  if (stepId === 'profile' && state.selections.family) {
    options = getCompatibleProfiles(state.selections.family);
  }
  if ((stepId === 'leg' || stepId === 'shelf' || stepId === 'finish') && state.selections.family) {
    options = getCompatibleOptions(stepId, state.selections.family);
  }
  const currentSelection = state.selections[stepId];

  el.browserGrid.innerHTML = options.map((opt) => {
    const isSelected = opt.id === currentSelection;
    return `<li>
      <button
        class="laval-tile${isSelected ? ' is-selected' : ''}"
        type="button"
        data-step-id="${stepId}"
        data-option-id="${opt.id}"
        aria-label="${opt.label} — ${opt.subtitle}"
        aria-pressed="${isSelected}">
        <span class="laval-tile-media" aria-hidden="true">
          ${opt.icon
            ? `<img class="laval-tile-image" src="${opt.icon}" alt="" loading="lazy" decoding="async">`
            : `<span class="laval-tile-swatch" data-swatch="${opt.swatch}"></span>`}
        </span>
        <span class="laval-tile-text">
          <span class="laval-tile-label">${opt.label}</span>
          <span class="laval-tile-subtitle">${opt.subtitle}</span>
        </span>
        <span class="laval-tile-ring" aria-hidden="true"></span>
      </button>
    </li>`;
  }).join('');

  // Update browser title (non-event, safe to do here)
  if (el.browserTitle) {
    const step = STEPS.find((s) => s.id === stepId);
    if (step) el.browserTitle.textContent = step.label;
  }
}

// ---------------------------------------------------------------------------
// selectOption(stepId, optionId, sourceEl)
// Records a selection. refined build
// refined build
//   sourceEl — the clicked tile or chip DOM element (optional).
// ---------------------------------------------------------------------------
export function selectOption(stepId, optionId, sourceEl = null) {
  if (!(stepId in state.selections)) return;
  state.selections[stepId] = optionId;
  // Pass 3 + Pass 5: family change invalidates stale incompatible downstream
  // selections (profile / leg / shelf). The active step's tiles are
  // re-rendered if it is one of the affected steps.
  if (stepId === 'family') {
    for (const downstream of ['profile', 'leg', 'shelf', 'finish']) {
      if (state.selections[downstream] && !isSelectionStillValid(downstream, optionId)) {
        state.selections[downstream] = null;
        if (state.activeStepId === downstream) renderOptionTiles(downstream);
      }
    }
  }
  renderOptionTiles(stepId);
  renderSelectionSummary();
  updateContinueButton();
  updateStageCaption();
  renderMantelPreview();          // Pass 2: visibly reconfigure the center stage
  if (stepId === 'finish' && state.activeStepId === 'finish') {
    syncEditorChipState(optionId);
  }

  // Connector precision fix:
  // renderOptionTiles() replaces browser tile DOM. Measuring sourceEl after
  // that render can point at a stale/disconnected element, which makes the
  // connector appear detached or random. Resolve the live selected control
  // after rendering, then draw from that actual element.
  const connectorSource = resolveConnectorSource(stepId, optionId, sourceEl);
  if (connectorSource) showConnector(connectorSource);
}

// ---------------------------------------------------------------------------
// renderSelectionSummary()
// Updates the LeftSemanticPane "Selection so far" list with labels for
// all steps that have a selection. Unselected steps show an em-dash.
// ---------------------------------------------------------------------------
export function renderSelectionSummary() {
  if (!el.summaryList) return;
  el.summaryList.innerHTML = STEPS.map((step) => {
    const selId    = state.selections[step.id];
    const options  = STEP_OPTIONS[step.id] || [];
    const opt      = options.find((o) => o.id === selId);
    const hasValue = opt !== undefined;
    return `<li class="laval-pane-summary-item${hasValue ? ' is-filled' : ' is-empty'}">
      <span class="laval-pane-summary-key">${step.label}</span>
      <span class="laval-pane-summary-val">${hasValue ? opt.label : '—'}</span>
    </li>`;
  }).join('');
}

// ---------------------------------------------------------------------------
// resetConfigurator()
// Clears all selections and returns to Step 1.
// refined build
// ---------------------------------------------------------------------------
export function resetConfigurator() {
  deactivateReviewState();            // refined build
  hideConnector();
  for (const key of STEP_ORDER) {
    state.selections[key] = null;
  }
  state.activeStepId = DEFAULT_STEP_ID;
  renderStepRail();
  renderDockTokens();
  renderOptionTiles(DEFAULT_STEP_ID);
  updatePaneForStep(DEFAULT_STEP_ID);
  updateDockStepText(DEFAULT_STEP_ID);
  renderSelectionSummary();
  updateContinueButton();
  updateStageCaption();
  renderMantelPreview();              // Pass 2: redraw to default state
}

// ---------------------------------------------------------------------------
// canContinue()
// Returns true only when the current active step has a selection recorded.
// ---------------------------------------------------------------------------
export function canContinue() {
  return state.selections[state.activeStepId] !== null;
}

// ---------------------------------------------------------------------------
// continueToNextStep()
// Advances to the next step if canContinue() is true.
// refined build) with a selection, activate review state.
// ---------------------------------------------------------------------------
export function continueToNextStep() {
  if (!canContinue()) return;
  const currentIndex = STEP_ORDER.indexOf(state.activeStepId);
  const isLast       = currentIndex === STEP_ORDER.length - 1;
  if (isLast) {
    activateReviewState();            // refined build
    return;
  }
  setActiveStep(STEP_ORDER[currentIndex + 1]);
}

// ---------------------------------------------------------------------------
// updateContinueButton()
// Enables or disables the Continue pill based on canContinue(). On the
// last step, updates the label to "Review Configuration" (refined build
// wire the actual lead-handoff; for now it just advances to Review state).
// ---------------------------------------------------------------------------
function updateContinueButton() {
  if (!el.continueBtn) return;
  const able      = canContinue();
  const isLast    = state.activeStepId === STEP_ORDER[STEP_ORDER.length - 1];
  const labelSpan = el.continueBtn.querySelector('span');
  if (labelSpan) {
    labelSpan.textContent = isLast && able ? 'Review' : 'Continue';
  }
  if (able) {
    el.continueBtn.removeAttribute('disabled');
  } else {
    el.continueBtn.setAttribute('disabled', '');
  }
}

// ---------------------------------------------------------------------------
// updatePaneForStep(stepId)
// Updates the LeftSemanticPane title, eyebrow, and helper text.
// ---------------------------------------------------------------------------
function updatePaneForStep(stepId) {
  const step = STEPS.find((s) => s.id === stepId);
  if (!step) return;
  if (el.paneEyebrow) el.paneEyebrow.textContent = step.eyebrow;
  if (el.paneTitle)   el.paneTitle.textContent   = `Mantel ${step.label}`;
  if (el.paneHelper)  el.paneHelper.textContent  = step.helper;
}

// ---------------------------------------------------------------------------
// updateDockStepText(stepId)
// Updates the left zone of the BottomWidgetDock with "NN of NN · Label".
// ---------------------------------------------------------------------------
function updateDockStepText(stepId) {
  if (!el.dockStepText) return;
  const step  = STEPS.find((s) => s.id === stepId);
  if (!step) return;
  const padded = String(step.index).padStart(2, '0');
  const total  = String(STEPS.length).padStart(2, '0');
  el.dockStepText.textContent = `${padded} of ${total} · ${step.label}`;
}

// ---------------------------------------------------------------------------
// updateStageCaption()
// Reflects current Family and Finish selections (or sensible default when
// nothing has been chosen yet). Pass 2: caption now corroborates a live
// preview rather than acting as the only feedback channel.
// ---------------------------------------------------------------------------
function updateStageCaption() {
  if (!el.stageCaption) return;
  const sel       = state.selections;
  const familyOpt = (STEP_OPTIONS.family || []).find((o) => o.id === sel.family);
  const finishOpt = (STEP_OPTIONS.finish || []).find((o) => o.id === sel.finish);
  if (!familyOpt && !finishOpt) {
    el.stageCaption.textContent = 'Tailored Classical · Select options to refine';
    return;
  }
  const familyLbl = familyOpt ? familyOpt.label : 'Tailored Classical';
  const tail      = finishOpt ? finishOpt.label : 'Select options to refine';
  el.stageCaption.textContent = `${familyLbl} · ${tail}`;
}

// ===========================================================================
// PASS 2 — Layered 2D Mantel Preview System
// ---------------------------------------------------------------------------
// Every step visibly reconfigures the center stage:
//   family  → silhouette / proportions / corner language / optional crown
//   profile → frieze treatment (rect / fluted / arch / cove / wave / niche / crest / baroque / columned)
//   leg     → pilaster treatment (plain / fluted / rounded / tapered / scrolled)
//   shelf   → top cap (classical / mitered / sculpted crown / serpentine)
//   finish  → stone color + veining overlay
// renderMantelPreview() is the single entry point. It rebuilds the SVG
// inside #laval-mantel-mount on every relevant state change.
// ===========================================================================

const FINISH_THEME = {
  'pale-limestone':         { hi:'#f1e7d4', mid:'#d8c8ad', lo:'#b59c7a', edgeHi:'#f5ebda', edgeLo:'#9c8268', shadow:'rgba(0,0,0,0.55)', vein:null },
  'soft-ivory-stone':       { hi:'#f6eedf', mid:'#e2d5bd', lo:'#c4b292', edgeHi:'#f9f1e3', edgeLo:'#a8927a', shadow:'rgba(0,0,0,0.50)', vein:null },
  'white-marble':           { hi:'#f5efe6', mid:'#e3ddd0', lo:'#c8c1b3', edgeHi:'#fbf6ee', edgeLo:'#b6afa1', shadow:'rgba(0,0,0,0.50)', vein:{ stroke:'rgba(120,108,90,0.22)', width:0.7, count:2 } },
  'dramatic-veined-marble': { hi:'#3f3631', mid:'#2a2520', lo:'#15110e', edgeHi:'#52483f', edgeLo:'#0d0a08', shadow:'rgba(0,0,0,0.72)', vein:{ stroke:'rgba(245,238,222,0.62)', width:1.6, count:4 } },
  'warm-taupe-stone':       { hi:'#b09c80', mid:'#8c7a64', lo:'#6c5b48', edgeHi:'#bda584', edgeLo:'#564636', shadow:'rgba(0,0,0,0.62)', vein:null }
};

const FAMILY_GEOM = {
  'tailored-classical': { ml:100, mr:700, pilW:78, friezeH:60, cornerR:0,  crownH:0  },
  'soft-sculptural':    { ml:100, mr:700, pilW:82, friezeH:70, cornerR:14, crownH:0  },
  'french-ornate':      { ml:90,  mr:710, pilW:78, friezeH:74, cornerR:4,  crownH:22 }
};

const PROFILE_FAMILY_MAP = Object.fromEntries(
  (STEP_OPTIONS.profile || [])
    .filter((option) => Array.isArray(option.compatibleFamilies) && option.compatibleFamilies.length > 0)
    .map((option) => [option.id, option.compatibleFamilies[0]])
);

export function getCompatibleProfiles(familyId) {
  if (!familyId) return STEP_OPTIONS.profile;
  return (STEP_OPTIONS.profile || []).filter((option) => {
    if (!Array.isArray(option.compatibleFamilies)) return true;
    return option.compatibleFamilies.includes(familyId);
  });
}

export function getCompatibleOptions(stepId, familyId) {
  const base = STEP_OPTIONS[stepId] || [];
  if (!familyId) return base;
  return base.filter((opt) => {
    if (!Array.isArray(opt.compatibleFamilies)) return true;
    return opt.compatibleFamilies.includes(familyId);
  });
}

function isSelectionStillValid(stepId, familyId) {
  const selId = state.selections[stepId];
  if (!selId) return true;
  if (stepId === 'profile') {
    return PROFILE_FAMILY_MAP[selId] === familyId;
  }
  const opt = (STEP_OPTIONS[stepId] || []).find((o) => o.id === selId);
  if (!opt) return false;
  if (!Array.isArray(opt.compatibleFamilies)) return true;
  return opt.compatibleFamilies.includes(familyId);
}

function shelfGeometry(shelfId, familyId) {
  if (shelfId === 'mitered-frame-shelf')     return { thickness:26, overhang:32, kind:'mitered' };
  if (shelfId === 'sculpted-crown')          return { thickness:38, overhang:40, kind:'sculpted' };
  if (shelfId === 'french-serpentine-shelf') return { thickness:26, overhang:38, kind:'serpentine' };
  if (shelfId === 'classical-shelf')         return { thickness:22, overhang:28, kind:'classical' };
  // Defaults differ by family so the preview reads distinctly even before shelf is picked
  if (familyId === 'french-ornate')   return { thickness:26, overhang:32, kind:'mitered'   };
  if (familyId === 'soft-sculptural') return { thickness:24, overhang:30, kind:'classical' };
  return { thickness:22, overhang:26, kind:'classical' };
}

function buildMantelSvg() {
  const sel  = state.selections;
  const fam  = sel.family || 'tailored-classical';
  const prof = sel.profile;
  const lg   = sel.leg;
  const sh   = sel.shelf;
  const fin  = sel.finish || 'pale-limestone';

  const theme = FINISH_THEME[fin];
  const G     = FAMILY_GEOM[fam];
  const S     = shelfGeometry(sh, fam);

  // Layout (y grows downward in SVG)
  const bottomY    = 540;
  const friezeBotY = 250;
  const friezeTopY = friezeBotY - G.friezeH;
  const shelfBotY  = friezeTopY;
  const shelfTopY  = shelfBotY - S.thickness;
  const crownBotY  = shelfTopY;
  const crownTopY  = crownBotY - G.crownH;
  const ml = G.ml, mr = G.mr, pilW = G.pilW;
  const innerL = ml + pilW;
  const innerR = mr - pilW;
  const fbL = 258, fbR = 542;
  const fbTopY = friezeBotY + 10;

  // ----- defs (gradients + shadow filter) -----
  const defs = `<defs>
    <linearGradient id="mt-stone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0"    stop-color="${theme.hi}"/>
      <stop offset="0.45" stop-color="${theme.mid}"/>
      <stop offset="1"    stop-color="${theme.lo}"/>
    </linearGradient>
    <linearGradient id="mt-edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${theme.edgeHi}"/>
      <stop offset="1" stop-color="${theme.edgeLo}"/>
    </linearGradient>
    <radialGradient id="mt-firebox" cx="0.5" cy="0.6" r="0.7">
      <stop offset="0" stop-color="#1c1612"/>
      <stop offset="1" stop-color="#0a0807"/>
    </radialGradient>
    <filter id="mt-shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
  </defs>`;

  // ----- floor anchor shadow -----
  const floorShadow = `<ellipse cx="400" cy="558" rx="${(mr - ml) / 2 + 8}" ry="12"
    fill="${theme.shadow}" filter="url(#mt-shadow)"/>`;

  // ----- hearth slab -----
  const hearth = `<rect x="${ml - 22}" y="540" width="${(mr - ml) + 44}" height="14"
    fill="url(#mt-edge)"/>`;

  // ----- crown band (french-ornate only) -----
  let crown = '';
  if (G.crownH > 0) {
    crown = `<rect x="${ml - S.overhang - 6}" y="${crownTopY}"
        width="${(mr - ml) + (S.overhang + 6) * 2}" height="${G.crownH}"
        fill="url(#mt-edge)"/>
      <rect x="${ml - S.overhang - 2}" y="${crownTopY + G.crownH - 4}"
        width="${(mr - ml) + (S.overhang + 2) * 2}" height="3"
        fill="rgba(0,0,0,0.18)"/>`;
  }

  // ----- shelf cap -----
  const shelfX = ml - S.overhang;
  const shelfW = (mr - ml) + S.overhang * 2;
  let shelf = '';
  if (S.kind === 'serpentine') {
    const cy = shelfBotY + 8;
    shelf = `<path d="M ${shelfX} ${shelfTopY}
      L ${shelfX + shelfW} ${shelfTopY}
      L ${shelfX + shelfW} ${shelfBotY - 4}
      C ${shelfX + shelfW * 0.75} ${cy}, ${shelfX + shelfW * 0.6} ${shelfBotY - 6}, ${shelfX + shelfW * 0.5} ${shelfBotY}
      C ${shelfX + shelfW * 0.4} ${shelfBotY + 4}, ${shelfX + shelfW * 0.25} ${cy - 2}, ${shelfX} ${shelfBotY - 4} Z"
      fill="url(#mt-edge)"/>`;
  } else {
    shelf = `<rect x="${shelfX}" y="${shelfTopY}" width="${shelfW}" height="${S.thickness}"
      fill="url(#mt-edge)"/>`;
    if (S.kind === 'mitered') {
      shelf += `<rect x="${shelfX + 4}" y="${shelfBotY - 6}" width="${shelfW - 8}" height="3"
          fill="rgba(0,0,0,0.10)"/>
        <rect x="${shelfX + 8}" y="${shelfBotY - 12}" width="${shelfW - 16}" height="2"
          fill="rgba(255,255,255,0.18)"/>`;
    } else if (S.kind === 'sculpted') {
      shelf += `<rect x="${shelfX + 6}" y="${shelfTopY + 8}" width="${shelfW - 12}" height="4"
          fill="rgba(255,255,255,0.20)"/>
        <rect x="${shelfX + 4}" y="${shelfBotY - 10}" width="${shelfW - 8}" height="3"
          fill="rgba(0,0,0,0.16)"/>
        <rect x="${shelfX + 2}" y="${shelfBotY - 4}" width="${shelfW - 4}" height="2"
          fill="rgba(0,0,0,0.10)"/>`;
    } else {
      shelf += `<rect x="${shelfX + 4}" y="${shelfBotY - 4}" width="${shelfW - 8}" height="2"
        fill="rgba(0,0,0,0.10)"/>`;
    }
  }

  // ----- frieze panel -----
  const frieze = `<rect x="${ml}" y="${friezeTopY}" width="${mr - ml}" height="${G.friezeH}"
      fill="url(#mt-stone)"/>
    <rect x="${ml + 8}" y="${friezeTopY + 4}" width="${mr - ml - 16}" height="2"
      fill="rgba(255,255,255,0.10)"/>`;

  // ----- profile decoration inside frieze -----
  let profileDecor = '';
  if (prof === 'tc-p1') {
    profileDecor = `<rect x="${ml + 22}" y="${friezeTopY + 12}"
        width="${mr - ml - 44}" height="${G.friezeH - 24}"
        fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="1"/>
      <rect x="${ml + 28}" y="${friezeTopY + 18}"
        width="${mr - ml - 56}" height="${G.friezeH - 36}"
        fill="rgba(255,255,255,0.04)"/>`;
  } else if (prof === 'tc-p2') {
    const flutes = [];
    const sx = ml + 30, ex = mr - 30, step = 16;
    for (let x = sx; x <= ex; x += step) {
      flutes.push(`<rect x="${x}" y="${friezeTopY + 8}" width="2" height="${G.friezeH - 16}"
        fill="rgba(0,0,0,0.18)"/>`);
      flutes.push(`<rect x="${x + 2}" y="${friezeTopY + 8}" width="1" height="${G.friezeH - 16}"
        fill="rgba(255,255,255,0.18)"/>`);
    }
    profileDecor = flutes.join('');
  } else if (prof === 'tc-p3') {
    profileDecor = `<path d="M ${innerL + 10} ${friezeBotY - 2}
        Q 400 ${friezeBotY - G.friezeH * 0.45} ${innerR - 10} ${friezeBotY - 2}"
      fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="1.4"/>`;
  } else if (prof === 'ss-p1') {
    profileDecor = `<path d="M ${ml + 8} ${friezeBotY - 2}
        Q 400 ${friezeTopY + 6} ${mr - 8} ${friezeBotY - 2}"
      fill="rgba(255,255,255,0.10)" stroke="rgba(0,0,0,0.14)" stroke-width="1"/>`;
  } else if (prof === 'ss-p2') {
    let pts = `M ${ml + 10} ${friezeTopY + G.friezeH * 0.5}`;
    const segs = 8, segW = (mr - ml - 20) / segs;
    for (let i = 1; i <= segs; i++) {
      const x1 = ml + 10 + (i - 0.5) * segW;
      const x2 = ml + 10 + i * segW;
      const yMid = friezeTopY + G.friezeH * 0.5 + (i % 2 === 0 ? 8 : -8);
      pts += ` Q ${x1} ${yMid} ${x2} ${friezeTopY + G.friezeH * 0.5}`;
    }
    profileDecor = `<path d="${pts}" fill="none" stroke="rgba(0,0,0,0.20)" stroke-width="1.4"/>`;
  } else if (prof === 'ss-p3') {
    const r = G.friezeH * 0.42;
    profileDecor = `<path d="M ${400 - r} ${friezeBotY - 2}
        A ${r} ${r} 0 0 1 ${400 + r} ${friezeBotY - 2}"
      fill="rgba(0,0,0,0.18)" stroke="rgba(0,0,0,0.24)" stroke-width="1"/>`;
  } else if (prof === 'fo-p1') {
    profileDecor = `<path d="M ${400 - 60} ${friezeBotY - 4}
        L ${400 - 30} ${friezeTopY + 6}
        L 400 ${friezeTopY + 14}
        L ${400 + 30} ${friezeTopY + 6}
        L ${400 + 60} ${friezeBotY - 4} Z"
      fill="rgba(0,0,0,0.18)" stroke="rgba(0,0,0,0.28)" stroke-width="1"/>
      <circle cx="400" cy="${friezeTopY + 18}" r="4" fill="rgba(255,255,255,0.22)"/>`;
  } else if (prof === 'fo-p2') {
    profileDecor = `<circle cx="400" cy="${friezeTopY + G.friezeH * 0.5}" r="9"
        fill="rgba(255,255,255,0.14)" stroke="rgba(0,0,0,0.24)" stroke-width="1"/>
      <circle cx="400" cy="${friezeTopY + G.friezeH * 0.5}" r="3" fill="rgba(0,0,0,0.30)"/>
      <path d="M ${400 - 70} ${friezeTopY + G.friezeH * 0.5}
        Q ${400 - 50} ${friezeTopY + 8}, ${400 - 14} ${friezeTopY + G.friezeH * 0.5}
        M ${400 + 14} ${friezeTopY + G.friezeH * 0.5}
        Q ${400 + 50} ${friezeTopY + 8}, ${400 + 70} ${friezeTopY + G.friezeH * 0.5}"
        fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="1.2"/>`;
  } else if (prof === 'fo-p3') {
    profileDecor = `<path d="M ${innerL + 16} ${friezeBotY - 2}
        Q 400 ${friezeTopY + 4} ${innerR - 16} ${friezeBotY - 2}"
      fill="none" stroke="rgba(0,0,0,0.26)" stroke-width="1.4"/>
      <rect x="${innerL + 6}" y="${friezeTopY + 8}" width="6" height="${G.friezeH - 16}"
        fill="rgba(0,0,0,0.18)"/>
      <rect x="${innerR - 12}" y="${friezeTopY + 8}" width="6" height="${G.friezeH - 16}"
        fill="rgba(0,0,0,0.18)"/>`;
  }

  // ----- pilaster legs -----
  const pilT = friezeBotY;
  const pilH = bottomY - pilT;
  const cR   = G.cornerR;

  function legShape(xLeft, side) {
    if (lg === 'tapered-curve') {
      if (side === 'L') {
        return `<path d="M ${xLeft + 12} ${pilT}
          L ${xLeft + pilW} ${pilT}
          L ${xLeft + pilW} ${bottomY}
          L ${xLeft} ${bottomY}
          L ${xLeft} ${pilT + 18}
          Q ${xLeft} ${pilT + 4}, ${xLeft + 12} ${pilT} Z"
          fill="url(#mt-stone)"/>`;
      }
      return `<path d="M ${xLeft} ${pilT}
        L ${xLeft + pilW - 12} ${pilT}
        Q ${xLeft + pilW} ${pilT + 4}, ${xLeft + pilW} ${pilT + 18}
        L ${xLeft + pilW} ${bottomY}
        L ${xLeft} ${bottomY} Z"
        fill="url(#mt-stone)"/>`;
    }
    if (lg === 'rounded-sculpted') {
      return `<rect x="${xLeft}" y="${pilT}" width="${pilW}" height="${pilH}"
          rx="14" fill="url(#mt-stone)"/>
        <rect x="${xLeft - 4}" y="${bottomY - 14}" width="${pilW + 8}" height="14"
          rx="3" fill="url(#mt-edge)"/>
        <rect x="${xLeft - 2}" y="${pilT}" width="${pilW + 4}" height="10"
          rx="3" fill="url(#mt-edge)"/>`;
    }
    if (lg === 'french-scroll') {
      return `<rect x="${xLeft}" y="${pilT + 8}" width="${pilW}" height="${pilH - 8}"
          fill="url(#mt-stone)"/>
        <path d="M ${xLeft - 4} ${pilT + 18}
          C ${xLeft - 4} ${pilT - 4}, ${xLeft + pilW + 4} ${pilT - 4}, ${xLeft + pilW + 4} ${pilT + 18}
          L ${xLeft + pilW + 4} ${pilT + 22}
          C ${xLeft + pilW - 8} ${pilT + 6}, ${xLeft + 8} ${pilT + 6}, ${xLeft - 4} ${pilT + 22} Z"
          fill="url(#mt-edge)"/>
        <circle cx="${xLeft + 12}" cy="${pilT + 14}" r="3" fill="rgba(0,0,0,0.32)"/>
        <circle cx="${xLeft + pilW - 12}" cy="${pilT + 14}" r="3" fill="rgba(0,0,0,0.32)"/>
        <rect x="${xLeft - 2}" y="${bottomY - 14}" width="${pilW + 4}" height="14"
          fill="url(#mt-edge)"/>`;
    }
    // plain-jamb (default) and fluted-pilaster share base
    const base = `<rect x="${xLeft}" y="${pilT}" width="${pilW}" height="${pilH}"
      ${cR ? `rx="${cR}"` : ''} fill="url(#mt-stone)"/>`;
    if (lg === 'fluted-pilaster') {
      const flutes = [];
      const flCount = 4;
      const flStartX = xLeft + 10;
      const flEndX   = xLeft + pilW - 10;
      const flStep   = (flEndX - flStartX) / (flCount - 1);
      for (let i = 0; i < flCount; i++) {
        const fx = flStartX + flStep * i;
        flutes.push(`<rect x="${fx}" y="${pilT + 14}" width="2.5" height="${pilH - 32}"
          fill="rgba(0,0,0,0.20)"/>`);
        flutes.push(`<rect x="${fx + 2.5}" y="${pilT + 14}" width="1" height="${pilH - 32}"
          fill="rgba(255,255,255,0.20)"/>`);
      }
      return base + flutes.join('');
    }
    return base;
  }

  const legL = legShape(ml, 'L');
  const legR = legShape(mr - pilW, 'R');

  const pilHi = `<rect x="${innerL - 2}" y="${pilT + 4}" width="2" height="${pilH - 8}"
      fill="rgba(255,255,255,0.18)"/>
    <rect x="${innerR}" y="${pilT + 4}" width="2" height="${pilH - 8}"
      fill="rgba(255,255,255,0.18)"/>`;

  // ----- inner stone (lintel + jambs) and firebox -----
  const archProfile = prof === 'tc-p3' || prof === 'fo-p1' || prof === 'fo-p3';
  const lintel = `<rect x="${innerL}" y="${pilT}" width="${innerR - innerL}" height="10"
    fill="url(#mt-stone)"/>`;
  const innerJambL = `<rect x="${innerL}" y="${pilT + 10}"
    width="${fbL - innerL}" height="${bottomY - pilT - 10}"
    fill="url(#mt-stone)" opacity="0.94"/>`;
  const innerJambR = `<rect x="${fbR}" y="${pilT + 10}"
    width="${innerR - fbR}" height="${bottomY - pilT - 10}"
    fill="url(#mt-stone)" opacity="0.94"/>`;

  let firebox;
  if (archProfile) {
    const archR = (fbR - fbL) / 2;
    const cx    = (fbL + fbR) / 2;
    const archTopY = fbTopY - archR * 0.55;
    firebox = `<path d="M ${fbL} ${bottomY}
      L ${fbL} ${fbTopY}
      Q ${cx} ${archTopY} ${fbR} ${fbTopY}
      L ${fbR} ${bottomY} Z"
      fill="url(#mt-firebox)"/>`;
  } else {
    firebox = `<rect x="${fbL}" y="${fbTopY}" width="${fbR - fbL}" height="${bottomY - fbTopY}"
      fill="url(#mt-firebox)"/>`;
  }

  const lintelHi = `<rect x="${innerL + 4}" y="${pilT}" width="${innerR - innerL - 8}" height="3"
    fill="rgba(255,255,255,0.16)"/>`;

  // ----- veining overlay (marbles only) -----
  let veining = '';
  if (theme.vein) {
    const v = theme.vein;
    const lines = [];
    if (v.count >= 2) {
      lines.push(`<path d="M ${ml + 8} ${pilT + 30}
          Q ${ml + pilW * 0.6} ${pilT + 110}, ${ml + pilW - 4} ${pilT + 220}"
        fill="none" stroke="${v.stroke}" stroke-width="${v.width}" stroke-linecap="round"/>`);
      lines.push(`<path d="M ${ml + 40} ${friezeTopY + 12}
          Q 380 ${friezeTopY + G.friezeH - 18}, ${mr - 60} ${friezeTopY + 14}"
        fill="none" stroke="${v.stroke}" stroke-width="${v.width}" stroke-linecap="round"/>`);
    }
    if (v.count >= 4) {
      lines.push(`<path d="M ${mr - 8} ${pilT + 50}
          Q ${mr - pilW * 0.5} ${pilT + 140}, ${mr - pilW + 6} ${pilT + 250}"
        fill="none" stroke="${v.stroke}" stroke-width="${v.width * 0.85}" stroke-linecap="round"/>`);
      lines.push(`<path d="M ${innerL + 6} ${pilT + 60}
          Q ${innerL + 22} ${pilT + 180}, ${innerL + 4} ${bottomY - 30}"
        fill="none" stroke="${v.stroke}" stroke-width="${v.width * 0.7}" stroke-linecap="round"/>`);
    }
    veining = lines.join('');
  }

  return `<svg class="laval-mantel" viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
    role="img" aria-label="Mantel preview">
    ${defs}
    ${floorShadow}
    ${hearth}
    ${crown}
    ${shelf}
    ${frieze}
    ${profileDecor}
    ${legL}
    ${legR}
    ${lintel}
    ${innerJambL}
    ${innerJambR}
    ${firebox}
    ${lintelHi}
    ${pilHi}
    ${veining}
  </svg>`;
}

function getStageOptionFromVariant(variant, component) {
  if (!variant || !component) return null;
  const componentOptions = variant.components?.[component];
  if (!componentOptions) return null;
  const defaultKey = variant.defaultComponents?.[component] || Object.keys(componentOptions)[0];
  return defaultKey ? componentOptions[defaultKey] : null;
}

function getMappedStageOption(stepId, optionId, activeVariant) {
  if (!stepId || !optionId) return null;
  const map = ASSET_OPTION_TO_LAYER?.[stepId]?.[optionId];
  if (!map) return null;
  const mappedVariant = ASSET_VARIANTS[map.variantId];
  if (!mappedVariant || !activeVariant) return null;
  if (mappedVariant.family !== activeVariant.family) return null;
  return getStageOptionFromVariant(mappedVariant, map.component);
}

function getActiveVariantId() {
  const selectedProfile = state.selections.profile;
  if (selectedProfile && ASSET_VARIANTS[selectedProfile]) return selectedProfile;
  const selectedFamily = state.selections.family || 'tailored-classical';
  return FAMILY_DEFAULT_VARIANT[selectedFamily] || FAMILY_DEFAULT_VARIANT['tailored-classical'];
}

function getLayerOptionForComponent(component, activeVariant) {
  for (const [stepId, assetComponent] of Object.entries(SELECTABLE_LAYER_STEPS)) {
    if (assetComponent !== component) continue;
    const selectedLayer = getMappedStageOption(stepId, state.selections[stepId], activeVariant);
    if (selectedLayer?.stage) return selectedLayer;
  }
  return getStageOptionFromVariant(activeVariant, component);
}

function buildAssetMantelMarkup() {
  const activeVariantId = getActiveVariantId();
  const activeVariant = ASSET_VARIANTS[activeVariantId];
  if (!activeVariant) return '<div class="laval-mantel laval-asset-stage" aria-label="Mantel preview unavailable"></div>';
  const order = Array.isArray(activeVariant.layerOrder) && activeVariant.layerOrder.length
    ? activeVariant.layerOrder
    : ['hearth', 'mantel-floor', 'firebox', 'firebox-fixed', 'door', 'profile', 'legs', 'shelf', 'finish', 'relief'];
  const rendered = new Set();
  const layerMarkup = [];
  for (const component of order) {
    if (rendered.has(component)) continue;
    const option = getLayerOptionForComponent(component, activeVariant);
    if (!option?.stage) continue;
    rendered.add(component);
    const safeComponent = component.replace(/[^a-z0-9-]/gi, '-');
    layerMarkup.push(`<img class="laval-asset-layer laval-asset-layer--${safeComponent}" src="${option.stage}" alt="" loading="eager" decoding="async" draggable="false">`);
  }
  return `<div class="laval-mantel laval-asset-stage" data-asset-variant="${activeVariantId}" data-asset-family="${activeVariant.family}" role="img" aria-label="${activeVariant.familyLabel} — ${activeVariant.label}">${layerMarkup.join('\n')}</div>`;
}

export function renderMantelPreview() {
  const mount  = document.getElementById('laval-mantel-mount');
  const figure = document.getElementById('laval-stage-figure');
  if (!mount || !figure) return;
  const sel = state.selections;
  const activeVariantId = getActiveVariantId();
  const activeVariant = ASSET_VARIANTS[activeVariantId];
  figure.dataset.family  = sel.family  || activeVariant?.family || 'tailored-classical';
  figure.dataset.profile = sel.profile || activeVariantId || '';
  figure.dataset.leg     = sel.leg     || '';
  figure.dataset.shelf   = sel.shelf   || '';
  figure.dataset.finish  = sel.finish  || '';
  if (activeVariant) {
    figure.dataset.assetVariant = activeVariantId;
    figure.dataset.assetStatus = activeVariant.status || '';
  }
  mount.innerHTML = buildAssetMantelMarkup();
}

// ---------------------------------------------------------------------------
// refined build
// ---------------------------------------------------------------------------

// activateReviewState()
// Shows the review sheet, dims existing shell zones, hides connector.
// Only callable when activeStepId === 'finish' and canContinue().
export function activateReviewState() {
  if (!el.reviewSheet || !el.shell) return;
  state.reviewActive    = false; // set after guard
  state.reviewSubmitted = false;
  hideConnector();
  // Unmount nested editor if still mounted (avoid overlap with review sheet)
  unmountNestedEditor();
  // Populate the selection summary
  populateReviewSummary();
  // Reset form to unfilled state
  if (el.reviewForm)    el.reviewForm.reset();
  if (el.reviewConfirm) el.reviewConfirm.setAttribute('hidden', '');
  if (el.reviewForm)    el.reviewForm.removeAttribute('hidden');
  // Show sheet
  el.reviewSheet.removeAttribute('hidden');
  el.shell.setAttribute('data-review-active', 'true');
  state.reviewActive = true;
  // Focus the back button for keyboard users
  if (el.reviewBack) el.reviewBack.focus();
}

// deactivateReviewState()
// Hides the review sheet and restores shell zones.
// Called by Back button, setActiveStep, and resetConfigurator.
export function deactivateReviewState() {
  if (!state.reviewActive) return;
  state.reviewActive = false;
  if (el.reviewSheet) el.reviewSheet.setAttribute('hidden', '');
  if (el.shell)       el.shell.removeAttribute('data-review-active');
}

// populateReviewSummary()
// Fills the review summary list with the current selections.
function populateReviewSummary() {
  if (!el.reviewSummary) return;
  el.reviewSummary.innerHTML = STEPS.map((step) => {
    const selId   = state.selections[step.id];
    const options = STEP_OPTIONS[step.id] || [];
    const opt     = options.find((o) => o.id === selId);
    const hasVal  = opt !== undefined;
    return `<li class="laval-review-summary-item">
      <span class="laval-review-summary-key">${step.label}</span>
      <span class="laval-review-summary-val${hasVal ? '' : ' is-empty'}">
        ${hasVal ? opt.label : '—'}
      </span>
    </li>`;
  }).join('');
}

// buildLeadPayload()
// Constructs a structured JSON payload from selections + form values.
// Returns the object; does NOT send anywhere.
export function buildLeadPayload() {
  const nameEl  = document.getElementById('laval-field-name');
  const emailEl = document.getElementById('laval-field-email');
  const phoneEl = document.getElementById('laval-field-phone');
  const msgEl   = document.getElementById('laval-field-message');

  const getSelection = (stepId) => {
    const selId   = state.selections[stepId];
    const options = STEP_OPTIONS[stepId] || [];
    const opt     = options.find((o) => o.id === selId);
    return opt ? { id: opt.id, label: opt.label } : { id: null, label: null };
  };

  return {
    source:    'LAVAL configurator MVP',
    timestamp: new Date().toISOString(),
    selections: {
      family:  getSelection('family'),
      profile: getSelection('profile'),
      leg:     getSelection('leg'),
      shelf:   getSelection('shelf'),
      finish:  getSelection('finish')
    },
    contact: {
      name:    nameEl  ? nameEl.value.trim()  : '',
      email:   emailEl ? emailEl.value.trim() : '',
      phone:   phoneEl ? phoneEl.value.trim() : '',
      message: msgEl   ? msgEl.value.trim()   : ''
    },
    meta: {
      version:         'refined build',
      currentViewport: `${window.innerWidth}x${window.innerHeight}`,
      stage:           'MVP static prototype — no backend'
    },
    // -----------------------------------------------------------------------
    // Future-readiness hooks (refined build)
    // -----------------------------------------------------------------------
    // Inert null placeholders. They reserve attachment points for later
    // phases without building any of those features in the MVP. A future
    // portal pass attaches authenticated client-review state to
    // portalReviewHook; a future provenance pass attaches a ledger/
    // immutable-record reference to ledgerProvenanceHook. The MVP must not
    // populate either field — they remain null by D-031 (off-chain MVP)
    // and the no-auth/no-portal scope of the launch product.
    // -----------------------------------------------------------------------
    portalReviewHook:      null,  // Reserved for future client portal / review state. Do not populate in MVP.
    ledgerProvenanceHook:  null   // Reserved for future provenance/ledger attachment. Do not populate in MVP.
  };
}

// submitLeadForm()
// Validates required fields, builds payload, console.logs, shows confirmation.
export function submitLeadForm() {
  const nameEl  = document.getElementById('laval-field-name');
  const emailEl = document.getElementById('laval-field-email');

  // Basic required-field validation (browser validation is also active via
  // required + type="email" attributes, but we guard here too)
  if (!nameEl || !nameEl.value.trim()) {
    nameEl && nameEl.focus();
    return;
  }
  if (!emailEl || !emailEl.value.trim() || !emailEl.validity.valid) {
    emailEl && emailEl.focus();
    return;
  }

  const payload = buildLeadPayload();
  // ---------------------------------------------------------------------
  // Dev-only payload logging (refined build).
  // This is NOT a production lead-submission path. It is a prototype
  // debugging aid. A real submission endpoint must replace this block
  // before any production lead routing is enabled. See D-031/D-032 and
  // the LAVAL_CLAUDE_98_README §18 lead-capture production hygiene rule.
  // ---------------------------------------------------------------------
  if (LAVAL_DEV_LEAD_LOGGING) {
    console.log('[LAVAL][DEV-ONLY] Request Pricing payload (no backend):', JSON.stringify(payload, null, 2));
  }

  // Show confirmation state; hide form
  if (el.reviewForm)    el.reviewForm.setAttribute('hidden', '');
  if (el.reviewConfirm) el.reviewConfirm.removeAttribute('hidden');
  state.reviewSubmitted = true;
}

// ---------------------------------------------------------------------------
// refined build
// ---------------------------------------------------------------------------

// getStageTargetPoint(stepId)
// Returns an {x, y} point in SVG viewBox coordinates (0–100) representing
// the step-relevant anchor on the mantel stage. Each step maps to a
// different part of the mantel for visual specificity.
export function getStageTargetPoint(stepId) {
  const mantelEl = document.querySelector('.laval-mantel');
  if (!mantelEl || !el.shell) return { x: 48, y: 50 };

  const mRect = mantelEl.getBoundingClientRect();
  const sRect = el.shell.getBoundingClientRect();

  // Fractional anchors within the mantel bounding rect per step
  const anchors = {
    family:  { mx: 0.50, my: 0.52 },  // center — whole silhouette
    profile: { mx: 0.48, my: 0.35 },  // upper frieze area
    leg:     { mx: 0.30, my: 0.68 },  // pilaster / left leg
    shelf:   { mx: 0.50, my: 0.26 },  // shelf cap at top
    finish:  { mx: 0.50, my: 0.50 },  // center body — stone surface
  };
  const a = anchors[stepId] || anchors.family;

  return {
    x: ((mRect.left + mRect.width  * a.mx) - sRect.left) / sRect.width  * 100,
    y: ((mRect.top  + mRect.height * a.my) - sRect.top)  / sRect.height * 100
  };
}

// ---------------------------------------------------------------------------
// resolveConnectorSource(stepId, optionId, fallbackEl)
// Returns the live DOM element the connector should originate from. Browser
// tiles are re-rendered during selection, so this must run after render work.
// ---------------------------------------------------------------------------
function resolveConnectorSource(stepId, optionId, fallbackEl = null) {
  const isUsable = (node) => {
    if (!node || !node.isConnected) return false;
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  // Finish chips are not destroyed by renderOptionTiles(); keep the clicked
  // chip if it remains connected and measurable.
  if (isUsable(fallbackEl)) return fallbackEl;

  const candidates = document.querySelectorAll('.laval-tile, .laval-finish-chip');
  for (const node of candidates) {
    const isTileMatch =
      node.classList.contains('laval-tile') &&
      node.dataset.stepId === stepId &&
      node.dataset.optionId === optionId;

    const isChipMatch =
      node.classList.contains('laval-finish-chip') &&
      node.dataset.chipStepId === stepId &&
      node.dataset.chipOptionId === optionId;

    if ((isTileMatch || isChipMatch) && isUsable(node)) return node;
  }

  return null;
}

// showConnector(sourceEl)
// Draws a fine warm-ivory connector line + terminal orb from the selected
// tile or chip toward the step-relevant mantel anchor.
// Source is tied to the clicked element's left edge + vertical centre so
// the line reads as originating from the selection, not the browser edge.
// Auto-hides after ~2000 ms; repeat calls replace the previous connector.
export function showConnector(sourceEl) {
  if (!el.connectorLayer || !el.shell || !sourceEl || !sourceEl.isConnected) return;

  // Cancel any pending auto-hide timer
  if (state.connectorTimer !== null) {
    clearTimeout(state.connectorTimer);
    state.connectorTimer = null;
  }

  const sRect   = el.shell.getBoundingClientRect();
  const srcRect = sourceEl.getBoundingClientRect();
  if (srcRect.width <= 0 || srcRect.height <= 0) return;

  // Map viewport coords to SVG viewBox (0–100 scale)
  const toSVG = (cx, cy) => ({
    x: (cx - sRect.left) / sRect.width  * 100,
    y: (cy - sRect.top)  / sRect.height * 100
  });

  // Target: step-relevant anchor on the mantel stage.
  const tgt = getStageTargetPoint(state.activeStepId);

  // Source: the selected control edge closest to the target. In the current
  // shell this is usually the left edge of the right-browser tile, but this
  // edge-aware logic keeps the connector stable if a future source appears
  // elsewhere in the shell.
  const sourceCenter = toSVG(
    srcRect.left + srcRect.width * 0.5,
    srcRect.top  + srcRect.height * 0.5
  );
  const sourceEdgeX = tgt.x < sourceCenter.x ? srcRect.left : srcRect.right;
  const src = toSVG(sourceEdgeX, srcRect.top + srcRect.height * 0.5);

  // Orthogonal connector geometry:
  // selected source → horizontal run → sharp 90° turn → vertical run →
  // sharp 90° turn → terminal target. No diagonal segment.
  const minElbowGap = 4.0;
  const rawBendX = src.x + (tgt.x - src.x) * 0.52;
  let bendX = rawBendX;
  if (tgt.x < src.x) {
    bendX = Math.max(tgt.x + minElbowGap, Math.min(src.x - minElbowGap, rawBendX));
  } else {
    bendX = Math.min(tgt.x - minElbowGap, Math.max(src.x + minElbowGap, rawBendX));
  }

  const elbowA = { x: bendX, y: src.y };
  const elbowB = { x: bendX, y: tgt.y };
  const points = [src, elbowA, elbowB, tgt]
    .map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ');

  // Tuned for quiet premium feel — crisp architectural line, not neon/game.
  const lineStroke = 'rgba(255,247,235,0.34)';
  const nodeFill   = 'rgba(255,247,235,0.58)';
  const nodeStroke = 'rgba(255,247,235,0.24)';

  el.connectorLayer.innerHTML = `<defs>
    <filter id="laval-conn-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="0.34" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <polyline
    points="${points}"
    fill="none"
    stroke="${lineStroke}"
    stroke-width="1.35px"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    vector-effect="non-scaling-stroke"
    shape-rendering="geometricPrecision"
    filter="url(#laval-conn-glow)"/>
  <circle
    cx="${src.x.toFixed(2)}"
    cy="${src.y.toFixed(2)}"
    r="0.30"
    fill="${nodeFill}"
    stroke="${nodeStroke}"
    stroke-width="1px"
    vector-effect="non-scaling-stroke"
    filter="url(#laval-conn-glow)"/>
  <circle
    cx="${elbowA.x.toFixed(2)}"
    cy="${elbowA.y.toFixed(2)}"
    r="0.22"
    fill="${nodeFill}"
    filter="url(#laval-conn-glow)"/>
  <circle
    cx="${elbowB.x.toFixed(2)}"
    cy="${elbowB.y.toFixed(2)}"
    r="0.22"
    fill="${nodeFill}"
    filter="url(#laval-conn-glow)"/>
  <circle
    cx="${tgt.x.toFixed(2)}"
    cy="${tgt.y.toFixed(2)}"
    r="0.42"
    fill="${nodeFill}"
    stroke="${nodeStroke}"
    stroke-width="1px"
    vector-effect="non-scaling-stroke"
    filter="url(#laval-conn-glow)"/>`;

  el.connectorLayer.removeAttribute('hidden');

  // Persist briefly through the visual confirmation hold, then clear.
  state.connectorTimer = setTimeout(hideConnector, 2400);
}


// hideConnector()
// Immediately removes the connector and cancels any pending auto-hide timer.
export function hideConnector() {
  if (state.connectorTimer !== null) {
    clearTimeout(state.connectorTimer);
    state.connectorTimer = null;
  }
  if (!el.connectorLayer) return;
  el.connectorLayer.setAttribute('hidden', '');
  el.connectorLayer.innerHTML = '';
}

// ---------------------------------------------------------------------------
// wireGlobalEvents()
// refined build
// ---------------------------------------------------------------------------
function wireGlobalEvents() {
  // Rail orb delegation (MantelStepRail)
  if (el.rail) {
    el.rail.addEventListener('click', (e) => {
      const btn = e.target.closest('.laval-step-orb');
      if (!btn) return;
      setActiveStep(btn.dataset.stepId);
    });
  }

  // Dock token delegation (BottomWidgetDock)
  if (el.dockWidgets) {
    el.dockWidgets.addEventListener('click', (e) => {
      const btn = e.target.closest('.laval-dock-token');
      if (!btn) return;
      setActiveStep(btn.dataset.stepId);
    });
  }

  // Option tile delegation — passes tile as sourceEl for connector
  if (el.browserGrid) {
    el.browserGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.laval-tile');
      if (!btn) return;
      selectOption(btn.dataset.stepId, btn.dataset.optionId, btn); // refined build
    });
  }

  // Continue pill
  if (el.continueBtn) {
    el.continueBtn.addEventListener('click', () => {
      continueToNextStep();
    });
  }

  // Reset button
  if (el.resetBtn) {
    el.resetBtn.removeAttribute('disabled');
    el.resetBtn.addEventListener('click', () => {
      resetConfigurator();
    });
  }

  // Editor slot delegation — passes chip as sourceEl for connector
  if (el.editorSlot) {
    el.editorSlot.addEventListener('click', (e) => {
      const chip = e.target.closest('.laval-finish-chip');
      if (chip) {
        selectOption(chip.dataset.chipStepId, chip.dataset.chipOptionId, chip); // refined build
        return;
      }
      const tab = e.target.closest('.laval-editor-tab');
      if (tab) { setEditorTab(tab.dataset.tabId); return; }
      const close = e.target.closest('.laval-nested-editor-close');
      if (close) { unmountNestedEditor(); return; }
    });
  }

  // refined build
  if (el.reviewBack) {
    el.reviewBack.addEventListener('click', () => {
      deactivateReviewState();
    });
  }

  // refined build
  if (el.reviewForm) {
    el.reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitLeadForm();
    });
  }
}

// mountNestedEditor()
// Activates the #laval-editor-slot inside the right browser envelope.
// Called by setActiveStep when stepId === 'finish'.
// Sets data-editor-active on .laval-right-browser so CSS can constrain
// .laval-browser-body height and reveal the slot.
export function mountNestedEditor() {
  if (!el.editorSlot || !el.rightBrowser) return;
  // Reset tab to default on every mount
  state.editorActiveTab = 'stone-finish';
  // Build editor markup
  el.editorSlot.innerHTML = buildEditorMarkup();
  // Show the slot
  el.editorSlot.removeAttribute('hidden');
  el.editorSlot.removeAttribute('aria-hidden');
  el.editorSlot.dataset.mounted = 'true';
  // Activate CSS layout via attribute on parent
  el.rightBrowser.setAttribute('data-editor-active', 'true');
  // Render the default tab content
  renderFinishChips();
}

// unmountNestedEditor()
// Hides the nested editor and restores browser to full height.
// refined build
export function unmountNestedEditor() {
  if (!el.editorSlot || !el.rightBrowser) return;
  hideConnector();                    // refined build
  el.editorSlot.setAttribute('hidden', '');
  el.editorSlot.setAttribute('aria-hidden', 'true');
  el.editorSlot.dataset.mounted = 'false';
  el.editorSlot.innerHTML = '';
  el.rightBrowser.removeAttribute('data-editor-active');
}

// buildEditorMarkup()
// Returns the static HTML shell of the nested editor (header + tab strip
// + body placeholder + note). Body content is rendered separately by
// renderFinishChips() or the Material Look placeholder.
function buildEditorMarkup() {
  return `<div class="laval-nested-editor">
    <div class="laval-nested-editor-header">
      <div class="laval-nested-editor-meta">
        <span class="laval-eyebrow">Detail</span>
        <span class="laval-nested-editor-title">Stone Finish</span>
      </div>
      <nav class="laval-nested-editor-tabs" role="tablist" aria-label="Finish editor tabs">
        <button
          class="laval-editor-tab is-active"
          type="button"
          role="tab"
          aria-selected="true"
          data-tab-id="stone-finish">
          Stone Finish
        </button>
        <button
          class="laval-editor-tab"
          type="button"
          role="tab"
          aria-selected="false"
          data-tab-id="material-look">
          Material Look
        </button>
      </nav>
      <button
        class="laval-nested-editor-close"
        type="button"
        aria-label="Collapse editor">
        &#215;
      </button>
    </div>
    <div class="laval-nested-editor-body" id="laval-nested-editor-body">
      <!-- Populated by renderFinishChips() or Material Look placeholder -->
    </div>
    <p class="laval-nested-editor-note">
      Real image assets are active for MVP visual review.
      Final stone availability is confirmed by the studio.
    </p>
  </div>`;
}

// renderFinishChips()
// Populates the nested editor body with a 2-column chip grid for the five
// finish options from STEP_OPTIONS.finish.
// Compact chip-grid grammar — source evidence in laval_component_map.json.
export function renderFinishChips() {
  const body = document.getElementById('laval-nested-editor-body');
  if (!body) return;
  const options   = getCompatibleOptions('finish', state.selections.family) || [];
  const currentSel = state.selections.finish;
  body.innerHTML = `<ul class="laval-finish-chip-grid">
    ${options.map((opt) => {
      const isSel = opt.id === currentSel;
      return `<li>
        <button
          class="laval-finish-chip${isSel ? ' is-selected' : ''}"
          type="button"
          data-chip-step-id="finish"
          data-chip-option-id="${opt.id}"
          aria-label="${opt.label}"
          aria-pressed="${isSel}">
          <span class="laval-finish-chip-media" aria-hidden="true">
            ${opt.icon
              ? `<img class="laval-finish-chip-image" src="${opt.icon}" alt="" loading="lazy" decoding="async">`
              : `<span class="laval-finish-chip-swatch" data-swatch="${opt.swatch}"></span>`}
          </span>
          <span class="laval-finish-chip-label">${opt.label}</span>
        </button>
      </li>`;
    }).join('')}
  </ul>`;
}

// setEditorTab(tabId)
// Switches the active tab in the nested editor.
// 'stone-finish' → renders finish chips.
// 'material-look' → renders placeholder content.
export function setEditorTab(tabId) {
  state.editorActiveTab = tabId;
  // Update tab button states
  const tabs = document.querySelectorAll('.laval-editor-tab');
  tabs.forEach((btn) => {
    const isActive = btn.dataset.tabId === tabId;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  // Render body content
  const body = document.getElementById('laval-nested-editor-body');
  if (!body) return;
  if (tabId === 'stone-finish') {
    renderFinishChips();
  } else {
    // Material Look tab — placeholder only. No real material engine.
    body.innerHTML = `<div class="laval-material-placeholder">
      <span class="laval-material-placeholder-label">Coming soon</span>
      <span class="laval-material-placeholder-sub">
        Real asset-backed finish options are active in Stone Finish.
        Pricing and stone availability remain studio-confirmed.
      </span>
    </div>`;
  }
}

// syncEditorChipState(optionId)
// Updates chip selected state inside the nested editor without rebuilding
// the whole editor — called from selectOption() when stepId === 'finish'.
function syncEditorChipState(optionId) {
  const chips = document.querySelectorAll('.laval-finish-chip');
  if (!chips.length) return;
  chips.forEach((chip) => {
    const isSel = chip.dataset.chipOptionId === optionId;
    chip.classList.toggle('is-selected', isSel);
    chip.setAttribute('aria-pressed', String(isSel));
  });
}


// ---------------------------------------------------------------------------
// init()
// Bootstrap sequence. Called once after DOM is ready.
// ---------------------------------------------------------------------------
function init() {
  resolveElements();

  // Initial render
  renderStepRail();
  renderDockTokens();
  renderOptionTiles(state.activeStepId);
  updatePaneForStep(state.activeStepId);
  updateDockStepText(state.activeStepId);
  renderSelectionSummary();
  updateContinueButton();
  updateStageCaption();
  renderMantelPreview();              // Pass 2: paint default mantel on load

  // Wire global buttons
  wireGlobalEvents();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

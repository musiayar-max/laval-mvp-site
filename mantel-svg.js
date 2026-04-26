/* =========================================================================
   LAVAL — Configurator controller
   Wires state → DOM. Renders the browser list per step, applies camera
   framing, draws connectors, manages the Request Pricing sheet, and
   assembles the structured payload per LAVAL_Webflow_CMS_Seed_Map §5.
   ========================================================================= */

import {
  STEPS, FAMILIES, PROFILES, LEGS, SHELVES, FINISHES, BUDGET_BANDS,
  TIMING_OPTIONS, CLIENT_TYPES, isAllowed,
  familyById, profileById, legById, shelfById, finishById,
} from './data.js';
import { mount as mountMantel } from './mantel-svg.js';
import { applyFraming } from './camera.js';
import { drawConnector, hideConnector } from './connectors.js';
import { store, setFamily, setStep, openSheet, closeSheet } from './state.js';

/* ---------- DOM refs ---------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);

const els = {
  stage:      $('.stage'),
  subject:    $('.stage__subject'),
  mantel:     $('.mantel'),
  connectors: $('.connectors'),

  paneEyebrow: $('[data-pane="eyebrow"]'),
  paneTitle:   $('[data-pane="title"]'),
  paneBody:    $('[data-pane="body"]'),
  summaryList: $('[data-pane="summary"]'),

  browserTitle:   $('[data-browser="title"]'),
  browserEyebrow: $('[data-browser="eyebrow"]'),
  browserCount:   $('[data-browser="count"]'),
  browserBody:    $('[data-browser="body"]'),

  topStep:    $('[data-top="step"]'),
  topCrumb:   $('[data-top="crumb"]'),
  topPill:    $('[data-top="pill"]'),

  hudDock:    $('[data-hud="dock"]'),
  hudState:   $('[data-hud="state"]'),
  hudBack:    $('[data-hud="back"]'),
  hudNext:    $('[data-hud="next"]'),

  rail:       $('.rail'),

  sheet:      $('.sheet'),
  sheetBody:  $('.sheet__body'),
  sheetFooter:$('.sheet__footer'),

  resetBtn:   $('[data-action="reset"]'),
};

/* ---------- SVG glyph makers for option orbs ---------------------------- */
const SWATCH_NS = 'http://www.w3.org/2000/svg';

function familyGlyph(family) {
  // Three distinct mantel silhouettes showing the family character.
  const label = {
    'tailored-classical': 'TC',
    'soft-sculptural':    'SS',
    'french-ornate':      'FO',
  }[family.id];

  let shape = '';
  if (family.id === 'tailored-classical') {
    shape = `<rect x="18" y="20" width="36" height="30" fill="#efece4" />
             <rect x="26" y="32" width="20" height="22" fill="#1f1812" />
             <rect x="14" y="18" width="44" height="4" fill="#efece4" />`;
  } else if (family.id === 'soft-sculptural') {
    shape = `<path d="M 18 50 L 18 24 Q 18 20 22 20 L 50 20 Q 54 20 54 24 L 54 50 Z" fill="#efece4" />
             <path d="M 26 54 L 26 36 Q 26 32 30 32 L 42 32 Q 46 32 46 36 L 46 54 Z" fill="#1f1812" />
             <rect x="14" y="18" width="44" height="4" fill="#efece4" rx="1" />`;
  } else {
    shape = `<path d="M 18 50 L 18 28 Q 18 22 24 20 Q 36 14 48 20 Q 54 22 54 28 L 54 50 Z" fill="#efece4" />
             <path d="M 28 54 L 28 38 Q 28 30 36 26 Q 44 30 44 38 L 44 54 Z" fill="#1f1812" />
             <path d="M 14 20 Q 36 12 58 20 L 58 24 Q 36 18 14 24 Z" fill="#efece4" />`;
  }

  return `<svg viewBox="0 0 72 72" xmlns="${SWATCH_NS}">
    <rect width="72" height="72" fill="#2a2620" />
    ${shape}
    <text x="36" y="66" text-anchor="middle" fill="rgba(255,250,243,0.7)"
          font-family="serif" font-style="italic" font-size="7">${label}</text>
  </svg>`;
}

function profileGlyph(p) {
  // A small rectangle + opening variation illustrating the profile's geometry.
  const openings = {
    'TC-P1': '<rect x="24" y="28" width="24" height="28" fill="#1f1812" />',
    'TC-P2': '<rect x="24" y="28" width="24" height="28" fill="#1f1812" /><line x1="22" y1="22" x2="50" y2="22" stroke="#1f1812" stroke-width="1.2" /><line x1="22" y1="18" x2="50" y2="18" stroke="#1f1812" stroke-width="1.2" />',
    'TC-P3': '<path d="M 24 56 L 24 34 Q 24 28 30 28 L 42 28 Q 48 28 48 34 L 48 56 Z" fill="#1f1812" />',
    'SS-P1': '<path d="M 24 56 L 24 36 Q 24 26 36 26 Q 48 26 48 36 L 48 56 Z" fill="#1f1812" />',
    'SS-P2': '<path d="M 24 56 L 24 34 Q 30 26 36 30 Q 42 26 48 34 L 48 56 Z" fill="#1f1812" />',
    'SS-P3': '<path d="M 26 56 L 26 36 Q 26 24 36 22 Q 46 24 46 36 L 46 56 Z" fill="#1f1812" />',
    'FO-P1': '<path d="M 24 56 L 24 38 Q 30 22 36 24 Q 42 22 48 38 L 48 56 Z" fill="#1f1812" />',
    'FO-P2': '<path d="M 24 56 L 24 36 Q 24 26 36 24 Q 48 26 48 36 L 48 56 Z" fill="#1f1812" /><circle cx="30" cy="20" r="2" fill="#1f1812" /><circle cx="42" cy="20" r="2" fill="#1f1812" />',
    'FO-P3': '<path d="M 24 56 L 24 32 A 12 12 0 0 1 48 32 L 48 56 Z" fill="#1f1812" />',
  }[p.id] || '<rect x="24" y="28" width="24" height="28" fill="#1f1812" />';

  return `<svg viewBox="0 0 72 72" xmlns="${SWATCH_NS}">
    <rect width="72" height="72" fill="#efece4" />
    <rect x="12" y="14" width="48" height="6" fill="#d9d3c7" />
    ${openings}
    <rect x="12" y="56" width="48" height="4" fill="#d9d3c7" />
  </svg>`;
}

function legGlyph(l) {
  const shapes = {
    'LG-1': '<rect x="30" y="14" width="12" height="46" fill="#efece4" />',
    'LG-2': `<rect x="30" y="14" width="12" height="46" fill="#efece4" />
             <line x1="33" y1="18" x2="33" y2="56" stroke="#b8afa0" stroke-width="0.8" />
             <line x1="36" y1="18" x2="36" y2="56" stroke="#b8afa0" stroke-width="0.8" />
             <line x1="39" y1="18" x2="39" y2="56" stroke="#b8afa0" stroke-width="0.8" />`,
    'LG-3': '<path d="M 30 14 L 42 14 Q 44 36 42 60 L 30 60 Q 28 36 30 14 Z" fill="#efece4" />',
    'LG-4': '<path d="M 28 14 L 44 14 Q 42 40 40 60 L 32 60 Q 30 40 28 14 Z" fill="#efece4" />',
    'LG-5': `<path d="M 30 14 L 42 14 L 42 50 Q 48 54 44 58 Q 38 62 36 60 L 30 60 Z" fill="#efece4" />
             <circle cx="44" cy="56" r="2" fill="none" stroke="#8a8275" stroke-width="0.8" />`,
  };
  return `<svg viewBox="0 0 72 72" xmlns="${SWATCH_NS}">
    <rect width="72" height="72" fill="#2a2620" />
    ${shapes[l.id] || shapes['LG-1']}
  </svg>`;
}

function shelfGlyph(s) {
  const shapes = {
    'SH-1': `<rect x="10" y="36" width="52" height="4" fill="#efece4" />
             <rect x="12" y="32" width="48" height="4" fill="#efece4" />
             <rect x="14" y="28" width="44" height="4" fill="#efece4" />`,
    'SH-2': `<rect x="10" y="30" width="52" height="10" fill="#efece4" />`,
    'SH-3': `<path d="M 10 40 L 62 40 Q 66 32 58 26 L 14 26 Q 6 32 10 40 Z" fill="#efece4" />`,
    'SH-4': `<path d="M 10 40 Q 26 36 36 40 Q 46 44 62 40 L 62 30 Q 46 34 36 30 Q 26 26 10 30 Z" fill="#efece4" />`,
  };
  return `<svg viewBox="0 0 72 72" xmlns="${SWATCH_NS}">
    <rect width="72" height="72" fill="#2a2620" />
    ${shapes[s.id] || shapes['SH-2']}
  </svg>`;
}

function finishSwatch(f) {
  const { base, hi, lo, vein } = f.swatch;
  const vId = 'v-' + f.id;
  const veinPaths = vein
    ? (f.id === 'FN-4'
        ? '<path d="M 10 28 Q 30 38 50 30 T 86 50" stroke="' + vein + '" stroke-width="1.4" fill="none" opacity="0.9" /><path d="M 18 52 Q 38 44 58 54" stroke="' + vein + '" stroke-width="1.2" fill="none" opacity="0.75" />'
        : '<path d="M 14 42 Q 36 48 58 38" stroke="' + vein + '" stroke-width="0.9" fill="none" opacity="0.55" />')
    : '';
  return `<svg viewBox="0 0 72 72" xmlns="${SWATCH_NS}">
    <defs>
      <linearGradient id="${vId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${hi}" />
        <stop offset="50%" stop-color="${base}" />
        <stop offset="100%" stop-color="${lo}" />
      </linearGradient>
    </defs>
    <rect width="72" height="72" fill="url(#${vId})" />
    ${veinPaths}
  </svg>`;
}

/* ---------- Option row template ----------------------------------------- */
function renderOption(opt, {
  selected, disabled, caution, orbSvg, desc, code,
}) {
  const btn = document.createElement('button');
  btn.className = 'option' + (selected ? ' is-selected' : '');
  btn.type = 'button';
  btn.dataset.optionId = opt.id;
  if (disabled) { btn.setAttribute('disabled', ''); btn.setAttribute('aria-disabled', 'true'); }

  btn.innerHTML = `
    <span class="option__orb">${orbSvg}</span>
    <span class="option__text">
      <span class="option__name">${opt.name}</span>
      <span class="option__code">${code}</span>
      ${desc ? `<span class="option__desc">${desc}</span>` : ''}
    </span>
    <span class="option__meta">
      <span class="option__ring"></span>
      ${caution ? '<span class="option__block-tag">With caution</span>' : ''}
      ${disabled ? '<span class="option__block-tag">Not in family</span>' : ''}
    </span>
  `;
  return btn;
}

/* ---------- Per-step list builders -------------------------------------- */
function buildFamilyList(container, selection) {
  container.innerHTML = '';
  FAMILIES.forEach(f => {
    const row = renderOption(f, {
      selected: selection.family === f.id,
      disabled: false,
      caution:  false,
      orbSvg:   familyGlyph(f),
      desc:     f.tagline,
      code:     f.code,
    });
    row.addEventListener('click', () => {
      setFamily(f.id);
    });
    container.appendChild(row);
  });
}

function buildProfileList(container, selection) {
  container.innerHTML = '';
  const family = selection.family;
  if (!family) {
    container.innerHTML = emptyState('Choose a family first to see compatible profiles.');
    return;
  }
  PROFILES.filter(p => p.family === family).forEach(p => {
    const row = renderOption(p, {
      selected: selection.profile === p.id,
      disabled: false,
      caution:  false,
      orbSvg:   profileGlyph(p),
      desc:     p.description,
      code:     p.id,
    });
    row.addEventListener('click', () => {
      store.setSelection('profile', p.id);
    });
    container.appendChild(row);
  });
}

function buildLegList(container, selection) {
  container.innerHTML = '';
  if (!selection.family) {
    container.innerHTML = emptyState('Choose a family first to see compatible legs.');
    return;
  }
  LEGS.forEach(l => {
    const { allowed, caution } = isAllowed('legs', l.id, selection.family);
    const row = renderOption(l, {
      selected: selection.leg === l.id,
      disabled: !allowed,
      caution,
      orbSvg:   legGlyph(l),
      desc:     l.description,
      code:     l.id,
    });
    if (allowed) {
      row.addEventListener('click', () => store.setSelection('leg', l.id));
    }
    container.appendChild(row);
  });
}

function buildShelfList(container, selection) {
  container.innerHTML = '';
  if (!selection.family) {
    container.innerHTML = emptyState('Choose a family first to see compatible shelves.');
    return;
  }
  SHELVES.forEach(s => {
    const { allowed, caution } = isAllowed('shelves', s.id, selection.family);
    const row = renderOption(s, {
      selected: selection.shelf === s.id,
      disabled: !allowed,
      caution,
      orbSvg:   shelfGlyph(s),
      desc:     s.description,
      code:     s.id,
    });
    if (allowed) {
      row.addEventListener('click', () => store.setSelection('shelf', s.id));
    }
    container.appendChild(row);
  });
}

function buildFinishList(container, selection) {
  container.innerHTML = '';
  if (!selection.family) {
    container.innerHTML = emptyState('Choose a family first to see compatible finishes.');
    return;
  }
  FINISHES.forEach(f => {
    const { allowed, caution } = isAllowed('finishes', f.id, selection.family);
    const row = renderOption(f, {
      selected: selection.finish === f.id,
      disabled: !allowed,
      caution,
      orbSvg:   finishSwatch(f),
      desc:     f.description,
      code:     f.id,
    });
    if (allowed) {
      row.addEventListener('click', () => store.setSelection('finish', f.id));
    }
    container.appendChild(row);
  });
}

function buildReviewList(container, selection) {
  container.innerHTML = '';
  const rows = [
    { step: 'Family',  val: familyById(selection.family),  stepId: 'family'  },
    { step: 'Profile', val: profileById(selection.profile), stepId: 'profile' },
    { step: 'Legs',    val: legById(selection.leg),         stepId: 'leg'     },
    { step: 'Shelf',   val: shelfById(selection.shelf),     stepId: 'shelf'   },
    { step: 'Finish',  val: finishById(selection.finish),   stepId: 'finish'  },
  ];

  const grid = document.createElement('div');
  grid.className = 'review-grid';
  rows.forEach(r => {
    const el = document.createElement('div');
    el.className = 'review-row';
    el.innerHTML = `
      <span class="review-row__step">${r.step}</span>
      <span class="review-row__name">${r.val ? r.val.name : '— Not selected'}</span>
      <button class="review-row__edit" type="button" data-goto="${r.stepId}">Edit</button>
    `;
    grid.appendChild(el);
  });
  container.appendChild(grid);

  // Bind edit buttons
  grid.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => setStep(btn.dataset.goto));
  });
}

function emptyState(msg) {
  return `<div class="option" style="opacity:0.6; pointer-events:none;">
    <span class="option__orb" style="background:transparent;border-color:transparent;"></span>
    <span class="option__text"><span class="option__desc">${msg}</span></span>
    <span></span>
  </div>`;
}

/* ---------- Sheet: Request Pricing form --------------------------------- */
let formState = {
  clientType: 'homeowner',
  budget: null,
  timing: null,
  name: '',
  email: '',
  phone: '',
  zip: '',
  dimensions: '',
  notes: '',
};

function buildSheetForm() {
  const sel = store.get().selection;
  els.sheet.querySelector('.sheet__header')?.remove();
  els.sheetBody.innerHTML = '';
  els.sheetFooter.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.className = 'sheet__header';
  header.innerHTML = `
    <div>
      <div class="sheet__eyebrow">Request Pricing</div>
      <div class="sheet__title">Your Mantel, in Review</div>
    </div>
    <button class="sheet__close" type="button" aria-label="Close" data-action="sheet-close"></button>
  `;
  els.sheet.prepend(header);

  // Body
  const body = els.sheetBody;

  // Client type chips
  const clientField = field(
    'I am a…',
    chipGroup(CLIENT_TYPES.map(c => c.label), CLIENT_TYPES.find(c => c.id === formState.clientType)?.label, (label) => {
      const match = CLIENT_TYPES.find(c => c.label === label);
      formState.clientType = match ? match.id : 'homeowner';
      buildSheetForm();
    })
  );
  body.appendChild(clientField);

  body.appendChild(field('Budget band', chipGroup(BUDGET_BANDS, formState.budget, v => { formState.budget = v; buildSheetForm(); })));
  body.appendChild(field('Project timing', chipGroup(TIMING_OPTIONS, formState.timing, v => { formState.timing = v; buildSheetForm(); })));

  // Contact row
  const row1 = document.createElement('div');
  row1.className = 'row-2';
  row1.appendChild(field('Full name', input({
    value: formState.name, placeholder: 'Your name', onInput: v => formState.name = v,
  })));
  row1.appendChild(field(formState.clientType === 'trade' ? 'Firm / Studio' : 'Zip code', input({
    value: formState.zip, placeholder: formState.clientType === 'trade' ? 'Company or studio name' : 'Charleston zip',
    onInput: v => formState.zip = v,
  })));
  body.appendChild(row1);

  const row2 = document.createElement('div');
  row2.className = 'row-2';
  row2.appendChild(field('Email', input({
    value: formState.email, placeholder: 'you@example.com', type: 'email', onInput: v => formState.email = v,
  })));
  row2.appendChild(field('Phone (optional)', input({
    value: formState.phone, placeholder: '+1', type: 'tel', onInput: v => formState.phone = v,
  })));
  body.appendChild(row2);

  body.appendChild(field('Rough mantel dimensions', input({
    value: formState.dimensions,
    placeholder: 'Opening W × H × Shelf depth, if known',
    onInput: v => formState.dimensions = v,
  }), 'Final scope and pricing are confirmed after review.'));

  body.appendChild(field('Notes', textarea({
    value: formState.notes, placeholder: 'Room context, installation timing, special requests…',
    onInput: v => formState.notes = v,
  })));

  // Selection summary inside sheet
  const summary = document.createElement('div');
  summary.className = 'review-grid';
  summary.style.marginTop = '8px';
  [
    ['Family',  familyById(sel.family)?.name],
    ['Profile', profileById(sel.profile)?.name],
    ['Legs',    legById(sel.leg)?.name],
    ['Shelf',   shelfById(sel.shelf)?.name],
    ['Finish',  finishById(sel.finish)?.name],
  ].forEach(([k, v]) => {
    const el = document.createElement('div');
    el.className = 'review-row';
    el.innerHTML = `
      <span class="review-row__step">${k}</span>
      <span class="review-row__name">${v || '—'}</span>
      <span></span>
    `;
    summary.appendChild(el);
  });
  body.appendChild(summary);

  // Footer
  els.sheetFooter.innerHTML = `
    <button class="hud-nav-btn is-back" type="button" data-action="sheet-close">
      <span class="arrow"></span><span>Back</span>
    </button>
    <button class="pill-accent" type="button" data-action="submit">Submit Request</button>
  `;
  els.sheetFooter.querySelector('[data-action="sheet-close"]').addEventListener('click', closeSheet);
  els.sheetFooter.querySelector('[data-action="submit"]').addEventListener('click', submitPayload);
  header.querySelector('[data-action="sheet-close"]').addEventListener('click', closeSheet);
}

function field(label, child, helper) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  const lbl = document.createElement('label');
  lbl.className = 'field__label';
  lbl.textContent = label;
  wrap.appendChild(lbl);
  wrap.appendChild(child);
  if (helper) {
    const h = document.createElement('div');
    h.className = 'field__helper';
    h.textContent = helper;
    wrap.appendChild(h);
  }
  return wrap;
}

function input({ value = '', placeholder = '', type = 'text', onInput }) {
  const el = document.createElement('input');
  el.className = 'input';
  el.type = type;
  el.placeholder = placeholder;
  el.value = value;
  el.addEventListener('input', (e) => onInput?.(e.target.value));
  return el;
}
function textarea({ value = '', placeholder = '', onInput }) {
  const el = document.createElement('textarea');
  el.className = 'textarea';
  el.placeholder = placeholder;
  el.value = value;
  el.addEventListener('input', (e) => onInput?.(e.target.value));
  return el;
}
function chipGroup(options, active, onPick) {
  const wrap = document.createElement('div');
  wrap.className = 'chips';
  options.forEach(v => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (v === active ? ' is-active' : '');
    b.textContent = v;
    b.addEventListener('click', () => onPick?.(v));
    wrap.appendChild(b);
  });
  return wrap;
}

/* ---------- Payload assembly per CMS Seed Map §5 ------------------------ */
function assemblePayload() {
  const s = store.get().selection;
  const fam  = familyById(s.family);
  const prof = profileById(s.profile);
  const leg  = legById(s.leg);
  const shel = shelfById(s.shelf);
  const fin  = finishById(s.finish);

  return {
    // Visible configurator selections (name + slug)
    family_name:   fam?.name   || null,
    family_slug:   fam?.id     || null,
    profile_name:  prof?.name  || null,
    profile_slug:  prof?.slug  || null,
    leg_name:      leg?.name   || null,
    leg_slug:      leg?.slug   || null,
    shelf_name:    shel?.name  || null,
    shelf_slug:    shel?.slug  || null,
    finish_name:   fin?.name   || null,
    finish_slug:   fin?.slug   || null,

    // Hidden internal mapping bundle
    internal_mapping_bundle: {
      family_code:  fam?.code        || null,
      OP:           prof?.hiddenOP   || null,
      FR:           prof?.hiddenFR   || null,
      OM:           prof?.hiddenOM   || null,
      LG:           leg?.id          || null,
      SH:           shel?.id         || null,
      FN:           fin?.id          || null,
    },

    // Form fields
    client_type:   formState.clientType,
    budget_band:   formState.budget,
    timing:        formState.timing,
    contact: {
      name:        formState.name,
      email:       formState.email,
      phone:       formState.phone,
      zip_or_firm: formState.zip,
    },
    dimensions:    formState.dimensions,
    notes:         formState.notes,

    // Routing / attribution
    source_page:          'configurator',
    session_id_placeholder: sessionId(),
    created_at:           new Date().toISOString(),
  };
}

let _sid;
function sessionId() {
  if (_sid) return _sid;
  _sid = 'laval_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);
  return _sid;
}

async function submitPayload() {
  const payload = assemblePayload();

  // v1 behavior: log to console and show success state.
  // In deploy, swap this for a fetch() to a Webflow/Formspree/Airtable endpoint.
  console.log('[LAVAL] Lead payload ready:', payload);

  // TODO(deploy): replace with real POST
  // await fetch('https://formspree.io/f/XXXXX', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  //   body: JSON.stringify(payload),
  // });

  // Success state
  els.sheetBody.innerHTML = `
    <div class="sheet__success">
      <div class="sheet__success-mark">✓</div>
      <div class="sheet__success-title">Your request has been received</div>
      <div class="sheet__success-body">
        A member of the LAVAL team will confirm dimensions, material lead times,
        and scope within two business days. Your configuration has been preserved
        for reference — no further action is needed now.
      </div>
    </div>
  `;
  els.sheetFooter.innerHTML = `
    <span></span>
    <button class="hud-nav-btn" type="button" data-action="sheet-close">Close</button>
  `;
  els.sheetFooter.querySelector('[data-action="sheet-close"]').addEventListener('click', () => {
    closeSheet();
    formState = { clientType: 'homeowner', budget: null, timing: null, name: '', email: '', phone: '', zip: '', dimensions: '', notes: '' };
  });
}

/* ---------- Renderer: a single render() reconciles the whole shell ------ */
function render() {
  const { step, selection, sheet } = store.get();
  const stepMeta = STEPS.find(s => s.id === step) || STEPS[0];

  // 1) Pane — contextual descriptor + running summary
  els.paneEyebrow.textContent = stepMeta.eyebrow;
  els.paneTitle.textContent   = stepMeta.title;
  els.paneBody.textContent    = stepMeta.pane;
  renderSummary(els.summaryList, selection);

  // 2) Top governance band
  els.topStep.textContent  = `${String(stepMeta.index).padStart(2,'0')} · ${stepMeta.label}`;
  els.topCrumb.textContent = 'Configurator';
  // Pill: ghost until review step, primary at review
  const onReview = step === 'review';
  els.topPill.className = onReview ? 'pill-accent' : 'pill-ghost';
  els.topPill.textContent = onReview ? 'Submit Request' : 'Request Pricing';

  // 3) Browser — title + options
  els.browserEyebrow.textContent = stepMeta.eyebrow;
  els.browserTitle.textContent   = stepMeta.title;
  const count = optionCountForStep(step, selection);
  els.browserCount.textContent   = count ? `${count.available}/${count.total}` : '';

  switch (step) {
    case 'family':  buildFamilyList(els.browserBody, selection); break;
    case 'profile': buildProfileList(els.browserBody, selection); break;
    case 'leg':     buildLegList(els.browserBody, selection); break;
    case 'shelf':   buildShelfList(els.browserBody, selection); break;
    case 'finish':  buildFinishList(els.browserBody, selection); break;
    case 'review':  buildReviewList(els.browserBody, selection); break;
  }

  // 4) Category rail + HUD dock — selected/complete states
  renderRail(step, selection);
  renderHudDock(step, selection);

  // 5) Stage — mantel render + camera framing + connector
  els.stage.dataset.step = step;
  if (selection.family) els.stage.dataset.family = selection.family;
  else els.stage.removeAttribute('data-family');

  mountMantel(els.mantel, selection);
  applyFraming(els.subject, step);

  // Re-draw connector after frame settle
  requestAnimationFrame(() => {
    const selectedOption = els.browserBody.querySelector('.option.is-selected');
    drawConnector({
      svgEl:    els.connectors,
      sourceEl: selectedOption,
      stageEl:  els.stage,
      mantelEl: els.mantel,
      step,
    });
  });

  // 6) Sheet state
  if (sheet === 'request-pricing') {
    els.sheet.classList.add('is-open');
    buildSheetForm();
  } else {
    els.sheet.classList.remove('is-open');
  }
}

function renderSummary(container, sel) {
  const rows = [
    ['Family',  familyById(sel.family)?.name],
    ['Profile', profileById(sel.profile)?.name],
    ['Legs',    legById(sel.leg)?.name],
    ['Shelf',   shelfById(sel.shelf)?.name],
    ['Finish',  finishById(sel.finish)?.name],
  ];
  container.innerHTML = rows.map(([k, v]) => `
    <div class="pane__summary-row">
      <span class="k">${k}</span>
      <span class="v ${v ? '' : 'is-empty'}">${v || 'Not selected'}</span>
    </div>
  `).join('');
}

function renderRail(currentStep, selection) {
  els.rail.querySelectorAll('.orb').forEach(orb => {
    const step = orb.dataset.step;
    const isActive = step === currentStep;
    const isComplete = isStepComplete(step, selection);
    orb.classList.toggle('is-active', isActive);
    orb.classList.toggle('is-complete', isComplete && !isActive);
  });
}

function renderHudDock(currentStep, selection) {
  els.hudDock.innerHTML = '';
  STEPS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'hud-tile';
    btn.type = 'button';
    btn.dataset.step = s.id;
    btn.textContent = String(s.index).padStart(2, '0');
    btn.setAttribute('aria-label', s.label);
    if (s.id === currentStep) btn.classList.add('is-active');
    else if (isStepComplete(s.id, selection)) btn.classList.add('is-complete');
    btn.addEventListener('click', () => setStep(s.id));
    els.hudDock.appendChild(btn);
  });

  // State text
  els.hudState.textContent =
    stepStateLine(currentStep, selection);

  // Back / Next buttons
  const idx = STEPS.findIndex(s => s.id === currentStep);
  els.hudBack.toggleAttribute('disabled', idx === 0);
  const canAdvance = canAdvanceFrom(currentStep, selection);
  els.hudNext.toggleAttribute('disabled', !canAdvance);

  if (currentStep === 'review') {
    els.hudNext.classList.add('is-primary');
    els.hudNext.querySelector('.label').textContent = 'Request Pricing';
  } else {
    els.hudNext.classList.remove('is-primary');
    els.hudNext.querySelector('.label').textContent = 'Continue';
  }
}

function stepStateLine(step, sel) {
  const fam = familyById(sel.family)?.name;
  switch (step) {
    case 'family':  return sel.family ? `Family · ${fam}` : 'Begin · choose a family';
    case 'profile': return sel.profile ? `${fam} · ${profileById(sel.profile).name}` : `${fam || 'Family'} · select a profile`;
    case 'leg':     return sel.leg     ? `Legs · ${legById(sel.leg).name}`           : 'Select a leg system';
    case 'shelf':   return sel.shelf   ? `Shelf · ${shelfById(sel.shelf).name}`      : 'Select a shelf';
    case 'finish':  return sel.finish  ? `Finish · ${finishById(sel.finish).name}`   : 'Select a finish';
    case 'review':  return 'Review your composition';
    default:        return '';
  }
}

function isStepComplete(step, sel) {
  switch (step) {
    case 'family':  return !!sel.family;
    case 'profile': return !!sel.profile;
    case 'leg':     return !!sel.leg;
    case 'shelf':   return !!sel.shelf;
    case 'finish':  return !!sel.finish;
    case 'review':  return !!(sel.family && sel.profile && sel.leg && sel.shelf && sel.finish);
    default:        return false;
  }
}

function canAdvanceFrom(step, sel) {
  if (step === 'review') {
    return !!(sel.family && sel.profile && sel.leg && sel.shelf && sel.finish);
  }
  return isStepComplete(step, sel);
}

function optionCountForStep(step, sel) {
  switch (step) {
    case 'family':  return { available: FAMILIES.length, total: FAMILIES.length };
    case 'profile': return { available: PROFILES.filter(p => p.family === sel.family).length, total: PROFILES.length };
    case 'leg':     return countBy('legs', LEGS, sel);
    case 'shelf':   return countBy('shelves', SHELVES, sel);
    case 'finish':  return countBy('finishes', FINISHES, sel);
    default:        return null;
  }
}
function countBy(kind, list, sel) {
  if (!sel.family) return { available: 0, total: list.length };
  const available = list.filter(x => isAllowed(kind, x.id, sel.family).allowed).length;
  return { available, total: list.length };
}

/* ---------- Rail + HUD dock static wiring ------------------------------- */
function wireRail() {
  els.rail.querySelectorAll('.orb').forEach(orb => {
    const step = orb.dataset.step;
    orb.addEventListener('click', () => setStep(step));
  });
}

function wireNav() {
  els.hudBack.addEventListener('click', () => {
    const { step } = store.get();
    const idx = STEPS.findIndex(s => s.id === step);
    if (idx > 0) setStep(STEPS[idx - 1].id);
  });
  els.hudNext.addEventListener('click', () => {
    const { step, selection } = store.get();
    if (!canAdvanceFrom(step, selection)) return;
    if (step === 'review') {
      openSheet('request-pricing');
      return;
    }
    const idx = STEPS.findIndex(s => s.id === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  });
  els.topPill.addEventListener('click', () => {
    const { step, selection } = store.get();
    if (step === 'review' && canAdvanceFrom('review', selection)) {
      openSheet('request-pricing');
    } else {
      // Jump to review
      setStep('review');
    }
  });
  els.resetBtn?.addEventListener('click', () => {
    if (!confirm('Reset your selections?')) return;
    store.set({
      step: 'family',
      selection: { family: null, profile: null, leg: null, shelf: null, finish: null },
    });
  });
}

/* ---------- Resize handling (redraw connector after layout settles) ---- */
let resizeRaf;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    const { step } = store.get();
    const selected = els.browserBody.querySelector('.option.is-selected');
    drawConnector({
      svgEl:    els.connectors,
      sourceEl: selected,
      stageEl:  els.stage,
      mantelEl: els.mantel,
      step,
    });
  });
});

/* ---------- Boot -------------------------------------------------------- */
store.subscribe(render);
wireRail();
wireNav();
render();

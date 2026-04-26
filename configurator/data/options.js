// LAVAL Configurator — prototype/data/options.js
// Phase 2: extended with per-step option arrays for all five public steps.
//
// Decisions inherited from project context:
//   D-028  3-family taxonomy: Tailored Classical / Soft Sculptural / French Ornate
//   D-029  Controlled public option set — no pricing, no hidden complexity exposed here
//   D-031  Off-chain MVP, blockchain-ready model
//   D-032  Code-first static site in GitHub + Cloudflare Pages
//
// Hidden mapping fields (opIdHook, frHook, lgHook, shHook, orHook) exist as null
// placeholders so Phase 3+ can attach internal OP/FR/LG/SH/OR logic without
// restructuring this file. They are never rendered in the public UI.
//
// Phase 7 — WO-8 future-readiness hooks (FUT-003 / FUT-004):
// PORTAL_REVIEW_HOOK_SCHEMA and LEDGER_PROVENANCE_HOOK_SCHEMA below are
// inert documentation-only schema shapes that name the attachment point
// for later phases. They are NOT implementations. The MVP has no auth,
// no portal, no ledger, and no blockchain — see scope law in
// LAVAL_CLAUDE_98_README §5.3 / §19.

// ---------------------------------------------------------------------------
// FUT-003 — portal/client-review hook (inert schema, no implementation)
// ---------------------------------------------------------------------------
// Reserved attachment point for a future authenticated client review pass.
// MVP must not populate or send these fields. A later phase may extend
// the lead payload (buildLeadPayload in app.js) with a populated
// portalReviewHook object matching this shape.
export const PORTAL_REVIEW_HOOK_SCHEMA = Object.freeze({
  enabled:        false,        // boolean — set true only when a portal exists
  reviewState:    null,         // string  — e.g. "draft" | "submitted" | "approved"
  clientId:       null,         // string  — opaque id assigned by future auth layer
  reviewedAt:     null,         // ISO date string
  reviewerNote:   null          // string  — optional comment text
});

// ---------------------------------------------------------------------------
// FUT-004 — ledger/provenance hook (inert schema, no implementation)
// ---------------------------------------------------------------------------
// Reserved attachment point for a future provenance / immutable-record
// pass. The MVP is off-chain (D-031) and does NOT compute, sign, or
// transmit any ledger reference. A later phase may attach a populated
// ledgerProvenanceHook object matching this shape; it must remain null
// until a real provenance system exists.
export const LEDGER_PROVENANCE_HOOK_SCHEMA = Object.freeze({
  enabled:        false,        // boolean — set true only when a ledger exists
  ledgerType:     null,         // string  — e.g. "off-chain-signed-record" | future option
  recordId:       null,         // string  — opaque id assigned by future ledger
  recordedAt:     null,         // ISO date string
  signature:      null          // string  — opaque integrity reference; never a private key
});

// ---------------------------------------------------------------------------
// Step metadata
// ---------------------------------------------------------------------------
export const STEPS = [
  {
    id: 'family',
    index: 1,
    label: 'Family',
    eyebrow: 'Step 01',
    helper:
      'Choose the architectural family that anchors the mantel. ' +
      'The family sets the silhouette grammar; later steps refine ' +
      'profile, legs, shelf, and stone finish.'
  },
  {
    id: 'profile',
    index: 2,
    label: 'Profile',
    eyebrow: 'Step 02',
    helper:
      'Refine the silhouette inside the chosen family. The profile ' +
      'defines the lintel treatment and overall visual weight of the surround.'
  },
  {
    id: 'leg',
    index: 3,
    label: 'Leg',
    eyebrow: 'Step 03',
    helper:
      'Select the jamb or pilaster treatment. The leg carries the ' +
      'vertical language of the mantel and grounds the composition.'
  },
  {
    id: 'shelf',
    index: 4,
    label: 'Shelf',
    eyebrow: 'Step 04',
    helper:
      'Set the shelf or crown profile. The shelf is the topmost ' +
      'architectural plane — it frames what sits above the fire.'
  },
  {
    id: 'finish',
    index: 5,
    label: 'Finish',
    eyebrow: 'Step 05',
    helper:
      'Apply the stone finish and material look. Each finish is sourced ' +
      'from natural stone and carries its own tonal character.'
  }
];

// ---------------------------------------------------------------------------
// Step order (canonical sequence)
// ---------------------------------------------------------------------------
export const STEP_ORDER = ['family', 'profile', 'leg', 'shelf', 'finish'];

// ---------------------------------------------------------------------------
// Default active step on load and after reset
// ---------------------------------------------------------------------------
export const DEFAULT_STEP_ID = 'family';

// ---------------------------------------------------------------------------
// Per-step option arrays
// Option shape:
//   id       — unique within step
//   label    — primary display label (serif, Title Case)
//   subtitle — secondary descriptor (sans, lowercase)
//   swatch   — CSS key for swatch variant
//   *Hook    — reserved for internal mapping (null in Phase 2, never rendered)
// ---------------------------------------------------------------------------
export const STEP_OPTIONS = {

  family: [
    {
      id: 'tailored-classical',
      label: 'Tailored Classical',
      subtitle: 'Architectural restraint',
      swatch: 'tc',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'soft-sculptural',
      label: 'Soft Sculptural',
      subtitle: 'Quiet curvature',
      swatch: 'ss',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'french-ornate',
      label: 'French Ornate',
      subtitle: 'Crested relief',
      swatch: 'fo',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    }
  ],

  profile: [
    {
      id: 'tc-p1',
      label: 'Framed Rectilinear',
      subtitle: 'Tailored Classical · P1',
      swatch: 'p-rect',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'tc-p2',
      label: 'Fluted Lintel',
      subtitle: 'Tailored Classical · P2',
      swatch: 'p-flute',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'tc-p3',
      label: 'Soft Arch Frame',
      subtitle: 'Tailored Classical · P3',
      swatch: 'p-arch',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'ss-p1',
      label: 'Rounded Cove',
      subtitle: 'Soft Sculptural · P1',
      swatch: 'p-cove',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'ss-p2',
      label: 'Wave Frieze',
      subtitle: 'Soft Sculptural · P2',
      swatch: 'p-wave',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'ss-p3',
      label: 'Niche Arch',
      subtitle: 'Soft Sculptural · P3',
      swatch: 'p-niche',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'fo-p1',
      label: 'Crest Arch',
      subtitle: 'French Ornate · P1',
      swatch: 'p-crest',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'fo-p2',
      label: 'Baroque Relief',
      subtitle: 'French Ornate · P2',
      swatch: 'p-baroque',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'fo-p3',
      label: 'Columned Arch',
      subtitle: 'French Ornate · P3',
      swatch: 'p-columned',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    }
  ],

  leg: [
    {
      id: 'plain-jamb',
      label: 'Plain Jamb',
      subtitle: 'Clean, unadorned reveal',
      swatch: 'l-plain',
      compatibleFamilies: ['tailored-classical', 'soft-sculptural', 'french-ornate'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'fluted-pilaster',
      label: 'Fluted Pilaster',
      subtitle: 'Vertical channel relief',
      swatch: 'l-flute',
      compatibleFamilies: ['tailored-classical', 'french-ornate'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'rounded-sculpted',
      label: 'Rounded Sculpted',
      subtitle: 'Soft turned profile',
      swatch: 'l-round',
      compatibleFamilies: ['soft-sculptural'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'tapered-curve',
      label: 'Tapered Curve',
      subtitle: 'Gentle inward taper',
      swatch: 'l-taper',
      compatibleFamilies: ['soft-sculptural', 'tailored-classical'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'french-scroll',
      label: 'French Scroll',
      subtitle: 'Scrolled bracket detail',
      swatch: 'l-scroll',
      compatibleFamilies: ['french-ornate'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    }
  ],

  shelf: [
    {
      id: 'classical-shelf',
      label: 'Classical Shelf',
      subtitle: 'Generous overhang, clean edge',
      swatch: 's-classical',
      compatibleFamilies: ['tailored-classical', 'french-ornate'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'mitered-frame-shelf',
      label: 'Mitered Frame Shelf',
      subtitle: 'Framed top with mitered returns',
      swatch: 's-mitered',
      compatibleFamilies: ['tailored-classical', 'soft-sculptural'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'sculpted-crown',
      label: 'Sculpted Crown',
      subtitle: 'Moulded crown at top',
      swatch: 's-crown',
      compatibleFamilies: ['soft-sculptural', 'french-ornate'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'french-serpentine-shelf',
      label: 'French Serpentine Shelf',
      subtitle: 'Curved front, serpentine plan',
      swatch: 's-serpentine',
      compatibleFamilies: ['french-ornate'],
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    }
  ],

  finish: [
    {
      id: 'pale-limestone',
      label: 'Pale Limestone',
      subtitle: 'Soft, quiet warmth',
      swatch: 'f-limestone',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'soft-ivory-stone',
      label: 'Soft Ivory Stone',
      subtitle: 'Creamy, refined surface',
      swatch: 'f-ivory',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'white-marble',
      label: 'White Marble',
      subtitle: 'Classic veined white',
      swatch: 'f-white-marble',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'dramatic-veined-marble',
      label: 'Dramatic Veined Marble',
      subtitle: 'Bold movement, dark veining',
      swatch: 'f-veined',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    },
    {
      id: 'warm-taupe-stone',
      label: 'Warm Taupe Stone',
      subtitle: 'Earthy, grounded tone',
      swatch: 'f-taupe',
      opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null
    }
  ]

};

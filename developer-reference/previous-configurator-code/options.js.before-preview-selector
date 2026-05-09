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
    { id: 'tailored-classical', label: 'Tailored Classical', subtitle: 'Traditional stone language', swatch: 'tc', icon: 'assets/mantels/traditional/classical-arched/icons/laval__classical-arched__profile__front-surround-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'soft-sculptural', label: 'Soft Sculptural', subtitle: 'Quiet curvature and mass', swatch: 'ss', icon: 'assets/mantels/soft-sculptural/variant-a/icons/laval__soft-sculptural__profile__rectangular-classic-surround-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'french-ornate', label: 'French Ornate', subtitle: 'Crested relief and carved detail', swatch: 'fo', icon: 'assets/mantels/french-ornate/variant-a/icons/laval__french-ornate__profile__cohesive-full-mantel-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null }
  ],
  profile: [
    { id: 'tc-p1', label: 'Classical Arched', subtitle: 'Tailored Classical · Profile A', swatch: 'p-arch', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p1', icon: 'assets/mantels/traditional/classical-arched/icons/laval__classical-arched__profile__front-surround-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-p2', label: 'Gothic Arched', subtitle: 'Tailored Classical · Profile B', swatch: 'p-arch', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p2', icon: 'assets/mantels/traditional/classical-gothic-arched/icons/laval__classical-gothic-arched__profile__front-surround-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-p3', label: 'Scroll Arched', subtitle: 'Tailored Classical · Profile C', swatch: 'p-crest', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p3', icon: 'assets/mantels/traditional/classical-scroll-arched/icons/laval__classical-scroll-arched__profile__front-surround-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-p1', label: 'Rectangular Classic', subtitle: 'Soft Sculptural · Profile A', swatch: 'p-rect', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p1', icon: 'assets/mantels/soft-sculptural/variant-a/icons/laval__soft-sculptural__profile__rectangular-classic-surround-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-p2', label: 'Rounded Radius Return', subtitle: 'Soft Sculptural · Profile B', swatch: 'p-cove', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p2', icon: 'assets/mantels/soft-sculptural/variant-b/icons/laval__soft-sculptural__profile__rounded-radius-return-slab-surround-b__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-p3', label: 'Cylindrical Column', subtitle: 'Soft Sculptural · Profile C', swatch: 'p-columned', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p3', icon: 'assets/mantels/soft-sculptural/variant-c/icons/laval__soft-sculptural__profile__rectangular-slab-frieze-surround-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-p1', label: 'White Serpentine Acanthus', subtitle: 'French Ornate · Profile A', swatch: 'p-baroque', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p1', icon: 'assets/mantels/french-ornate/variant-a/icons/laval__french-ornate__profile__cohesive-full-mantel-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-p2', label: 'White Shell Cartouche', subtitle: 'French Ornate · Profile B', swatch: 'p-crest', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p2', icon: 'assets/mantels/french-ornate/variant-c/icons/laval__french-ornate__profile__cohesive-full-mantel-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-p3', label: 'Viola Serpentine', subtitle: 'French Ornate · Profile C', swatch: 'f-veined', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p3', icon: 'assets/mantels/french-ornate/viola/icons/laval__french-ornate__profile__cohesive-full-mantel-viola__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null }
  ],
  leg: [
    { id: 'tc-leg-pilaster-pair', label: 'Classical Pilaster Pair', subtitle: 'Tailored Classical · arched pair', swatch: 'l-plain', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p1', icon: 'assets/mantels/traditional/classical-arched/icons/laval__classical-arched__legs__pilaster-pair-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-leg-carved-gothic-pair', label: 'Gothic Carved Pair', subtitle: 'Tailored Classical · carved verticals', swatch: 'l-flute', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p2', icon: 'assets/mantels/traditional/classical-gothic-arched/icons/laval__classical-gothic-arched__legs__carved-legs-pair-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-leg-scroll-pilaster-pair', label: 'Scroll Pilaster Pair', subtitle: 'Tailored Classical · scroll structure', swatch: 'l-scroll', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p3', icon: 'assets/mantels/traditional/classical-scroll-arched/icons/laval__classical-scroll-arched__legs__pilaster-pair-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-leg-rounded-pilaster', label: 'Rounded Pilaster Blocks', subtitle: 'Soft Sculptural · block base', swatch: 'l-round', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p1', icon: 'assets/mantels/soft-sculptural/variant-a/icons/laval__soft-sculptural__legs__rounded-pilaster-block-base-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-leg-integrated-slab', label: 'Integrated Slab Jambs', subtitle: 'Soft Sculptural · smooth return', swatch: 'l-plain', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p2', icon: 'assets/mantels/soft-sculptural/variant-b/icons/laval__soft-sculptural__legs__integrated-slab-jambs-b__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-leg-cylinder-column', label: 'Cylindrical Column Pair', subtitle: 'Soft Sculptural · columned mass', swatch: 'l-round', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p3', icon: 'assets/mantels/soft-sculptural/variant-c/icons/laval__soft-sculptural__legs__cylindrical-column-leg-pair-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-leg-scroll-pilaster', label: 'Carved Scroll Pilasters', subtitle: 'French Ornate · selector image', swatch: 'l-scroll', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p1', icon: 'assets/mantels/french-ornate/variant-a/icons/laval__french-ornate__legs__carved-scroll-pilaster-pair-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-leg-carved-pair', label: 'Carved Leg Pair', subtitle: 'French Ornate · selector image', swatch: 'l-scroll', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p2', icon: 'assets/mantels/french-ornate/variant-c/icons/laval__french-ornate__legs__carved-leg-pair-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-leg-rounded-column', label: 'Rounded Viola Columns', subtitle: 'French Ornate · selector image', swatch: 'l-round', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p3', icon: 'assets/mantels/french-ornate/viola/icons/laval__french-ornate__legs__rounded-column-leg-pair-viola-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null }
  ],
  shelf: [
    { id: 'tc-shelf-crown', label: 'Classical Crown', subtitle: 'Tailored Classical · arched crown', swatch: 's-classical', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p1', icon: 'assets/mantels/traditional/classical-arched/icons/laval__classical-arched__shelf__crown-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-shelf-gothic-crown', label: 'Gothic Crown', subtitle: 'Tailored Classical · carved cap', swatch: 's-crown', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p2', icon: 'assets/mantels/traditional/classical-gothic-arched/icons/laval__classical-gothic-arched__shelf__shelf-crown-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-shelf-rounded-crown', label: 'Rounded Scroll Crown', subtitle: 'Tailored Classical · rounded upper cap', swatch: 's-serpentine', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p3', icon: 'assets/mantels/traditional/classical-scroll-arched/icons/laval__classical-scroll-arched__shelf__rounded-crown-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-shelf-stepped-crown', label: 'Stepped Classic Crown', subtitle: 'Soft Sculptural · softened steps', swatch: 's-classical', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p1', icon: 'assets/mantels/soft-sculptural/variant-a/icons/laval__soft-sculptural__shelf__stepped-classic-crown-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-shelf-minimal-slab', label: 'Minimal Flat Slab', subtitle: 'Soft Sculptural · quiet cap', swatch: 's-mitered', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p2', icon: 'assets/mantels/soft-sculptural/variant-b/icons/laval__soft-sculptural__shelf__minimal-flat-slab-cap-b__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-shelf-rolled-cap', label: 'Rolled Cylinder Cap', subtitle: 'Soft Sculptural · sculpted cylinder', swatch: 's-crown', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p3', icon: 'assets/mantels/soft-sculptural/variant-c/icons/laval__soft-sculptural__shelf__rolled-cylinder-cap-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-shelf-ogee-slab', label: 'Layered Ogee Crown', subtitle: 'French Ornate · selector image', swatch: 's-serpentine', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p1', icon: 'assets/mantels/french-ornate/variant-a/icons/laval__french-ornate__shelf__layered-rounded-ogee-slab-crown-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-shelf-shell-crown', label: 'Shell Cartouche Crown', subtitle: 'French Ornate · selector image', swatch: 's-crown', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p2', icon: 'assets/mantels/french-ornate/variant-c/icons/laval__french-ornate__shelf__crown-shelf-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-shelf-rolled-viola', label: 'Rolled Viola Slab', subtitle: 'French Ornate · selector image', swatch: 's-serpentine', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p3', icon: 'assets/mantels/french-ornate/viola/icons/laval__french-ornate__shelf__rolled-slab-crown-viola-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null }
  ],
  finish: [
    { id: 'tc-finish-cream-limestone', label: 'Cream Limestone', subtitle: 'Tailored Classical · pale stone', swatch: 'f-limestone', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p1', icon: 'assets/mantels/traditional/classical-arched/icons/laval__classical-arched__finish__cream-limestone-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-finish-gothic-stone', label: 'Gothic Pale Stone', subtitle: 'Tailored Classical · light carved finish', swatch: 'f-white-marble', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p2', icon: 'assets/mantels/traditional/classical-gothic-arched/icons/laval__classical-gothic-arched__finish__finish-material-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'tc-finish-warm-ivory', label: 'Warm Ivory Stone', subtitle: 'Tailored Classical · warm painted stone', swatch: 'f-ivory', compatibleFamilies: ['tailored-classical'], assetVariantId: 'tc-p3', icon: 'assets/mantels/traditional/classical-scroll-arched/icons/laval__classical-scroll-arched__finish__warm-ivory-painted-stone-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-finish-white-grey', label: 'White Grey Honed Marble', subtitle: 'Soft Sculptural · quiet veining', swatch: 'f-white-marble', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p1', icon: 'assets/mantels/soft-sculptural/variant-a/icons/laval__soft-sculptural__finish__white-grey-veined-honed-marble-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-finish-bold-veined', label: 'Bold Veined Honed Marble', subtitle: 'Soft Sculptural · stronger movement', swatch: 'f-veined', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p2', icon: 'assets/mantels/soft-sculptural/variant-b/icons/laval__soft-sculptural__finish__white-grey-bold-veined-honed-marble-b__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'ss-finish-calacatta', label: 'Warm Calacatta', subtitle: 'Soft Sculptural · warm white veining', swatch: 'f-ivory', compatibleFamilies: ['soft-sculptural'], assetVariantId: 'ss-p3', icon: 'assets/mantels/soft-sculptural/variant-c/icons/laval__soft-sculptural__finish__warm-white-calacatta-veined-marble-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-finish-white-grey-a', label: 'White Grey Marble', subtitle: 'French Ornate · selector image', swatch: 'f-white-marble', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p1', icon: 'assets/mantels/french-ornate/variant-a/icons/laval__french-ornate__finish__white-grey-veined-marble-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-finish-white-shell', label: 'White Shell Marble', subtitle: 'French Ornate · selector image', swatch: 'f-white-marble', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p2', icon: 'assets/mantels/french-ornate/variant-c/icons/laval__french-ornate__finish__white-grey-marble-c__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null },
    { id: 'fo-finish-viola', label: 'Burgundy Viola Marble', subtitle: 'French Ornate · dramatic veining', swatch: 'f-veined', compatibleFamilies: ['french-ornate'], assetVariantId: 'fo-p3', icon: 'assets/mantels/french-ornate/viola/icons/laval__french-ornate__finish__burgundy-grey-veined-marble-a__icon.png', opIdHook: null, frHook: null, lgHook: null, shHook: null, orHook: null }
  ]
};

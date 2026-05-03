/* =========================================================================
   LAVAL — Data model
   Public-facing option set + hidden internal mappings + allowed-logic.
   Source of truth: brief <public_option_set> + <allowed_logic>, cross-checked
   against LAVAL_Webflow_CMS_Seed_Map_v1 Section 3 and LAVAL_Visual_Option_Matrix.
   ========================================================================= */

export const FAMILIES = [
  {
    id: 'tailored-classical',
    code: 'FM-01',
    name: 'Tailored Classical',
    tagline: 'Quiet · Rectilinear · Disciplined',
    description:
      'A restrained classical language built on straight lines and refined proportion. The surface carries meaning through geometry rather than ornament.',
  },
  {
    id: 'soft-sculptural',
    code: 'FM-02',
    name: 'Soft Sculptural',
    tagline: 'Rounded · Arched · Warm',
    description:
      'Rounded shoulders, softened arches, and quiet massing. Architectural without being formal — low-to-medium ornament carries the read.',
  },
  {
    id: 'french-ornate',
    code: 'FM-03',
    name: 'French Ornate',
    tagline: 'Serpentine · Crested · Old-World',
    description:
      'Serpentine friezes, cresting, and shell or cartouche motifs. An expressive old-world language reserved for rooms that invite it.',
  },
];

export const PROFILES = [
  // Tailored Classical
  { id: 'TC-P1', family: 'tailored-classical', name: 'Framed Rectilinear', slug: 'tc-p1-framed-rectilinear',
    description: 'A clean rectangular opening inside a restrained framed lintel. Quiet classical read.',
    hiddenOP: 'OP-01', hiddenFR: 'FR-02' },
  { id: 'TC-P2', family: 'tailored-classical', name: 'Fluted Lintel', slug: 'tc-p2-fluted-lintel',
    description: 'Rectangular opening with stronger classical molding and fluted logic across the frieze.',
    hiddenOP: 'OP-01', hiddenFR: 'FR-03' },
  { id: 'TC-P3', family: 'tailored-classical', name: 'Soft Arch Frame', slug: 'tc-p3-soft-arch-frame',
    description: 'Rectilinear body with a softened inner shoulder — a quiet bridge to sculptural language.',
    hiddenOP: 'OP-02', hiddenFR: 'FR-03' },

  // Soft Sculptural
  { id: 'SS-P1', family: 'soft-sculptural', name: 'Rounded Cove', slug: 'ss-p1-rounded-cove',
    description: 'A soft cove arch with thick quiet shoulders and low ornament.',
    hiddenOP: 'OP-02', hiddenFR: 'FR-04' },
  { id: 'SS-P2', family: 'soft-sculptural', name: 'Wave Frieze', slug: 'ss-p2-wave-frieze',
    description: 'Softly animated frieze paired with rounded opening logic.',
    hiddenOP: 'OP-03', hiddenFR: 'FR-05' },
  { id: 'SS-P3', family: 'soft-sculptural', name: 'Niche Arch', slug: 'ss-p3-niche-arch',
    description: 'An architectural niche / chimney-piece feeling with integrated soft-arch language.',
    hiddenOP: 'OP-05', hiddenFR: 'FR-04', hiddenOM: 'OM-01' },

  // French Ornate
  { id: 'FO-P1', family: 'french-ornate', name: 'Crest Arch', slug: 'fo-p1-crest-arch',
    description: 'Serpentine French opening with a centered crest motif.',
    hiddenOP: 'OP-03', hiddenFR: 'FR-05' },
  { id: 'FO-P2', family: 'french-ornate', name: 'Baroque Relief', slug: 'fo-p2-baroque-relief',
    description: 'Richer relief across the frieze with a more decorated body language.',
    hiddenOP: 'OP-03', hiddenFR: 'FR-06' },
  { id: 'FO-P3', family: 'french-ornate', name: 'Columned Arch', slug: 'fo-p3-columned-arch',
    description: 'A formal French arch supported by stronger columnar or ornamental side logic.',
    hiddenOP: 'OP-04', hiddenFR: 'FR-05' },
];

export const LEGS = [
  { id: 'LG-1', name: 'Plain Jamb', slug: 'lg-1-plain-jamb',
    description: 'Straight, restrained, quietly architectural.' },
  { id: 'LG-2', name: 'Fluted Pilaster', slug: 'lg-2-fluted-pilaster',
    description: 'Classic tailored architectural read with vertical flutes.' },
  { id: 'LG-3', name: 'Rounded Sculpted', slug: 'lg-3-rounded-sculpted',
    description: 'Softer, fuller jamb with rounded shoulders.' },
  { id: 'LG-4', name: 'Tapered Curve', slug: 'lg-4-tapered-curve',
    description: 'A bridge leg — works across families when the composition allows.' },
  { id: 'LG-5', name: 'French Scroll', slug: 'lg-5-french-scroll',
    description: 'Decorative and expressive — scrolled support logic.' },
];

export const SHELVES = [
  { id: 'SH-1', name: 'Classical Shelf', slug: 'sh-1-classical-shelf',
    description: 'Stepped and traditional — the quiet default.' },
  { id: 'SH-2', name: 'Mitered Frame Shelf', slug: 'sh-2-mitered-frame-shelf',
    description: 'Sharper picture-frame read for restrained compositions.' },
  { id: 'SH-3', name: 'Sculpted Crown', slug: 'sh-3-sculpted-crown',
    description: 'Thicker, softer massing — a warmer architectural crown.' },
  { id: 'SH-4', name: 'French Serpentine Shelf', slug: 'sh-4-french-serpentine-shelf',
    description: 'A curved, old-world shelf line for expressive profiles.' },
];

export const FINISHES = [
  { id: 'FN-1', name: 'Pale Limestone', slug: 'fn-1-pale-limestone',
    description: 'Light, chalky, quiet stone with a soft grain.',
    swatch: { base: '#e8e3d8', hi: '#f2eee5', lo: '#c6beb0', vein: null } },
  { id: 'FN-2', name: 'Soft Ivory Stone', slug: 'fn-2-soft-ivory-stone',
    description: 'Warm ivory, travertine-adjacent, with subtle warmth.',
    swatch: { base: '#ece3d2', hi: '#f7efdd', lo: '#cdbfa4', vein: 'rgba(180,158,124,0.22)' } },
  { id: 'FN-3', name: 'White Marble', slug: 'fn-3-white-marble',
    description: 'Bright, classic, clean — a timeless neutral.',
    swatch: { base: '#f2efe9', hi: '#ffffff', lo: '#d4d0c8', vein: 'rgba(120,112,100,0.28)' } },
  { id: 'FN-4', name: 'Dramatic Veined Marble', slug: 'fn-4-dramatic-veined-marble',
    description: 'A high-drama statement stone — use where the room invites it.',
    swatch: { base: '#e8e1d3', hi: '#f6f0e2', lo: '#958b78', vein: 'rgba(40,34,28,0.44)' } },
  { id: 'FN-5', name: 'Warm Taupe Stone', slug: 'fn-5-warm-taupe-stone',
    description: 'A muted warm-neutral stone read — deeply grounding.',
    swatch: { base: '#ccbfa9', hi: '#dcd0bb', lo: '#9f927a', vein: 'rgba(80,68,52,0.24)' } },
];

/* -------------------------------------------------------------------------
   Allowed logic (from brief <allowed_logic>, cross-checked against
   LAVAL_Configurator_Asset_Production_Map_v1 Section 5).
   "caution" is treated as allowed-but-marked in the UI.
   ------------------------------------------------------------------------- */
export const ALLOWED = {
  'tailored-classical': {
    profiles: ['TC-P1', 'TC-P2', 'TC-P3'],
    legs:     ['LG-1', 'LG-2', 'LG-4'],
    shelves:  ['SH-1', 'SH-2'],
    finishes: ['FN-1', 'FN-2', 'FN-3', 'FN-4', 'FN-5'],
    caution:  { shelves: [], legs: [], finishes: [] },
  },
  'soft-sculptural': {
    profiles: ['SS-P1', 'SS-P2', 'SS-P3'],
    legs:     ['LG-3', 'LG-4'],
    shelves:  ['SH-3', 'SH-4', 'SH-1'],
    finishes: ['FN-1', 'FN-2', 'FN-3', 'FN-5'],
    caution:  { shelves: ['SH-1'], legs: [], finishes: [] },
  },
  'french-ornate': {
    profiles: ['FO-P1', 'FO-P2', 'FO-P3'],
    legs:     ['LG-4', 'LG-5'],
    shelves:  ['SH-4', 'SH-3'],
    finishes: ['FN-2', 'FN-3', 'FN-4'],
    caution:  { shelves: ['SH-3'], legs: [], finishes: [] },
  },
};

/* -------------------------------------------------------------------------
   Step metadata: used to label the shell, drive camera framing, and render
   the correct browser list per step.
   ------------------------------------------------------------------------- */
export const STEPS = [
  { id: 'family',  index: 1, label: 'Family',
    title: 'Choose a Family',
    eyebrow: 'Step 01 · Architectural Language',
    framing: 'wide',
    pane: 'Every LAVAL mantel begins with a language. The family you choose shapes every subsequent decision — from the opening profile to the leg system to the finish. Choose the one that fits the room\u2019s architecture, not only its mood.',
  },
  { id: 'profile', index: 2, label: 'Profile',
    title: 'Select a Profile',
    eyebrow: 'Step 02 · Opening & Frieze',
    framing: 'opening',
    pane: 'The profile sets the opening geometry and the frieze logic above it. Three profiles are available within your chosen family; each carries a quietly different architectural posture.',
  },
  { id: 'leg',     index: 3, label: 'Legs',
    title: 'Choose a Leg System',
    eyebrow: 'Step 03 · Jambs',
    framing: 'legs',
    pane: 'Legs carry the weight of the shelf and define the mantel\u2019s vertical rhythm. The family and profile constrain which legs compose correctly; incompatible options are dimmed.',
  },
  { id: 'shelf',   index: 4, label: 'Shelf',
    title: 'Select a Shelf',
    eyebrow: 'Step 04 · Crown',
    framing: 'crown',
    pane: 'The shelf is the crown of the composition. Its profile, thickness, and edge language complete the family read.',
  },
  { id: 'finish',  index: 5, label: 'Finish',
    title: 'Choose a Finish',
    eyebrow: 'Step 05 · Material',
    framing: 'wide',
    pane: 'Material resolves the mantel. Pale limestone and soft ivory stone work broadly; dramatic veined marble is reserved for compositions that can carry its weight.',
  },
  { id: 'review',  index: 6, label: 'Review',
    title: 'Review & Request',
    eyebrow: 'Step 06 · Confirm',
    framing: 'review',
    pane: 'Your selections compose a specification, not a finished quote. A LAVAL team member will confirm scope, dimensions, and material lead time after reviewing your request.',
  },
];

/* Budget bands per LAVAL_Launch_Ops_Closure_Pack v1 §2.1 */
export const BUDGET_BANDS = [
  'Under $8K',
  '$8K \u2013 $15K',
  '$15K \u2013 $25K',
  '$25K+',
];

export const TIMING_OPTIONS = [
  'Exploring',
  'Within 3 months',
  '3\u20136 months',
  '6\u201312 months',
  'Flexible',
];

export const CLIENT_TYPES = [
  { id: 'homeowner', label: 'Homeowner' },
  { id: 'trade',     label: 'Trade / Designer' },
];

/* --- Lookup helpers ------------------------------------------------------ */
export const byId = (list, id) => list.find(x => x.id === id) || null;
export const familyById   = (id) => byId(FAMILIES, id);
export const profileById  = (id) => byId(PROFILES, id);
export const legById      = (id) => byId(LEGS, id);
export const shelfById    = (id) => byId(SHELVES, id);
export const finishById   = (id) => byId(FINISHES, id);

/* Returns { allowed: boolean, caution: boolean } for a given option in context. */
export function isAllowed(kind, optionId, familyId) {
  if (!familyId) return { allowed: true, caution: false };
  const rules = ALLOWED[familyId];
  if (!rules) return { allowed: true, caution: false };
  const set = rules[kind];
  const allowed = set.includes(optionId);
  const caution = (rules.caution[kind] || []).includes(optionId);
  return { allowed, caution };
}

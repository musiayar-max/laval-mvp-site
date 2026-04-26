/* =========================================================================
   LAVAL — Connector guidance system (CONN-A..D)
   A fine ivory-pearl line bridges the selected source (right browser option)
   to the relevant subject locus (the mantel region being edited). Orb nodes
   mark elbow and terminus.

   Show during active focus states; dim/hide in idle or on the review step.
   ========================================================================= */

const SUBJECT_LOCI = {
  family:  null,                         // no pointer in family step
  profile: { x: 0.50, y: 0.46 },         // frieze / opening shoulder
  leg:     { x: 0.30, y: 0.72 },         // lower-left jamb
  shelf:   { x: 0.50, y: 0.26 },         // top crown
  finish:  { x: 0.62, y: 0.50 },         // mid-body surface
  review:  null,
};

let raf = null;

export function drawConnector({ svgEl, sourceEl, stageEl, mantelEl, step }) {
  if (!svgEl || !stageEl) return;

  svgEl.innerHTML = '';
  svgEl.classList.remove('is-visible');

  const locus = SUBJECT_LOCI[step];
  if (!locus || !sourceEl || !mantelEl) return;

  const stageRect  = stageEl.getBoundingClientRect();
  const sourceRect = sourceEl.getBoundingClientRect();
  const mantelRect = mantelEl.getBoundingClientRect();

  // Set the SVG viewBox to match the stage in pixels so we can draw in px coords.
  svgEl.setAttribute('viewBox', `0 0 ${stageRect.width} ${stageRect.height}`);
  svgEl.setAttribute('preserveAspectRatio', 'none');

  // Source point — midpoint of the left edge of the source option (where it
  // meets the stage column).
  const sx = sourceRect.left - stageRect.left;
  const sy = sourceRect.top - stageRect.top + sourceRect.height / 2;

  // Target point — locus inside the mantel's bounding rect, translated into
  // stage-local coords.
  const tx = mantelRect.left - stageRect.left + mantelRect.width * locus.x;
  const ty = mantelRect.top  - stageRect.top  + mantelRect.height * locus.y;

  // Elbow point — a single right-angle bend mid-way. Clean, deliberate.
  const ex = tx + (sx - tx) * 0.42;
  const ey = sy;

  // Build the line as two straight segments with an orb node at the elbow
  // and a terminal orb at the target.
  const ns = 'http://www.w3.org/2000/svg';

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', `M ${sx} ${sy} L ${ex} ${ey} L ${tx} ${ty}`);
  svgEl.appendChild(path);

  const originDot = document.createElementNS(ns, 'circle');
  originDot.setAttribute('class', 'node node-origin');
  originDot.setAttribute('cx', sx);
  originDot.setAttribute('cy', sy);
  originDot.setAttribute('r', 2);
  svgEl.appendChild(originDot);

  const elbowDot = document.createElementNS(ns, 'circle');
  elbowDot.setAttribute('class', 'node');
  elbowDot.setAttribute('cx', ex);
  elbowDot.setAttribute('cy', ey);
  elbowDot.setAttribute('r', 2.4);
  svgEl.appendChild(elbowDot);

  const termDot = document.createElementNS(ns, 'circle');
  termDot.setAttribute('class', 'node');
  termDot.setAttribute('cx', tx);
  termDot.setAttribute('cy', ty);
  termDot.setAttribute('r', 3);
  svgEl.appendChild(termDot);

  // Reveal in the next frame so the CSS transition runs
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => svgEl.classList.add('is-visible'));
}

export function hideConnector(svgEl) {
  if (!svgEl) return;
  svgEl.classList.remove('is-visible');
}

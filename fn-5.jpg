/* =========================================================================
   LAVAL — Camera reframing
   Implements LAW-04 (push-in on face-sensitive categories) and LAW-05
   (pull-back on body/outfit categories) by adjusting data-framing on the
   stage subject. CSS handles the actual transform via stage.css.

   For mantels:
     family   -> wide
     profile  -> opening  (push toward frieze/opening axis)
     leg      -> legs     (push to lower mantel for jamb inspection)
     shelf    -> crown    (push to upper mantel for shelf inspection)
     finish   -> wide     (pull back — material reads on the whole form)
     review   -> review   (a slight pull-back composed shot)

   The HUD does NOT move during reframing. Only the subject transforms.
   ========================================================================= */

export const FRAMING_BY_STEP = {
  family:  'wide',
  profile: 'opening',
  leg:     'legs',
  shelf:   'crown',
  finish:  'wide',
  review:  'review',
};

export function applyFraming(subjectEl, step) {
  if (!subjectEl) return;
  const framing = FRAMING_BY_STEP[step] || 'wide';
  subjectEl.setAttribute('data-framing', framing);
}

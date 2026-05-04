# LAVAL True Component Swap Hotfix v4

This patch restores component-layer rendering. Profile selection defines the active layout/template. Leg, shelf, and finish selections remain independent and are normalized into the active profile slot using alpha-bounds metadata in `data/component-alignments.js`.

Known asset truth:
- Traditional and Soft Sculptural have usable stage component PNGs.
- French Ornate currently has full-mantel profile stage PNGs, while its legs/shelf/finish options are selector-icon-only. It cannot do true stage-level component swapping until those stage PNGs are generated.
- Finish stage images are full/near-full material renders, not clean clipped material masks. This patch applies a material wash instead of stacking full finish geometry.

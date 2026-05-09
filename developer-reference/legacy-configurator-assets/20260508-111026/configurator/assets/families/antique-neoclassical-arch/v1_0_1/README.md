# Antique Neoclassical Arch — LAVAL Family Package v1.0

## Current stage
Build now: this package supports the LAVAL / Musiayar Mantles MVP layered 2D configurator.

## Approved design direction
Antique European neoclassical arched fireplace mantel with aged warm limestone / cream stone, plain block pilasters, a long shallow rounded slab shelf, a black arched cast-iron insert, incised spandrel linework, a central fluted keystone/drop block, and optional twin eroded magnolia roundel reliefs.

## Included stage assets
Stage assets are production stack layers only and live in `/stage`:

- `laval__antique-neoclassical-arch__profile__arched-neoclassical-surround-a.png`
- `laval__antique-neoclassical-arch__legs__plain-block-pilaster-pair-a.png`
- `laval__antique-neoclassical-arch__shelf__long-shallow-rounded-slab-a.png`
- `laval__antique-neoclassical-arch__door__black-arched-cast-iron-insert-a.png`
- `laval__antique-neoclassical-arch__finish__aged-warm-limestone-a.png`
- `laval__antique-neoclassical-arch__relief__twin-eroded-magnolia-roundels-a.png`

No `relief__none.png` stage asset is included. The no-relief state is handled by `manifest.json` with `"stage": null`.

## Included icon assets
Selector icons live in `/icons` and are for UI option selection only:

- profile icon
- legs icon
- shelf icon
- door/firebox icon
- finish icon
- twin eroded magnolia relief icon
- no-relief icon

Icons must not be loaded as production stage layers.

## Included preview assets
Preview files live in `/previews` and are review-only:

- `assembled-preview__with-relief.png`
- `assembled-preview__no-relief.png`
- `debug-alignment-overlay.png`
- `source-reference.jpg`

Previews must not be used by the live configurator stack.

## Canvas standards
- Stage canvas: 2400 x 1800 px, PNG, RGBA, transparent where required.
- Icon canvas: 1024 x 1024 px, PNG.

## Layer order
The manifest layer order is:

1. `door`
2. `profile`
3. `legs`
4. `shelf`
5. `finish`
6. `relief`

## Anchor geometry
- `centerlineX`: 1200
- `baselineY`: 1560
- `openingBox`: x 760, y 560, width 880, height 760
- `reliefAnchors.leftRoundel`: x 650, y 420
- `reliefAnchors.rightRoundel`: x 1750, y 420

## Relief behavior
Relief is a controlled option group. The active relief option is `twin-eroded-magnolia-roundels-a`. The no-relief option uses `stage: null`; Code Lane must hide the relief layer for that selection.

## Visual approval status
The family direction, stage layers, with-relief preview, no-relief preview, debug overlay, and selector icons were visually approved in-session.

## Fabrication status
This package is not fabrication-ready. A human fabrication/fabricator review is still required for stone thickness, seams, plinth construction, shelf support, cast-iron insert fit, relief carving feasibility, install constraints, and CNC/schematic translation.

## Code Lane rendering instructions
- Load `manifest.json`.
- Render a fixed 4:3 configurator stage.
- Render all stage PNGs as absolute-positioned image layers with `inset: 0`, `width: 100%`, `height: 100%`, `object-fit: contain`, and `object-position: center center`.
- Follow `manifest.layerOrder` exactly.
- If a selected option has `stage: null`, hide that component layer.
- Do not use per-option offsets.
- Do not use `/icons` as stage assets.
- Do not use `/previews` as stage assets.
- Validate stage assets at 2400 x 1800 and icon assets at 1024 x 1024 before production use.

## Future-readiness impact
This package preserves a clean component taxonomy, manifest-driven rendering, no-relief null logic, relief anchor metadata, and future metadata placeholders for fabrication review, CNC planning, 3D conversion, and provenance/ledger readiness.


## v1.0.1 Manifest normalization
This repaired package adds `anchors.reliefAnchor` as a standard Code Lane fallback while preserving `anchors.reliefAnchors.leftRoundel` and `anchors.reliefAnchors.rightRoundel` for the twin-roundel relief logic. It also adds `previews/assembled-preview.png` as the generic assembled preview.

# Tailored Classical — LAVAL Family Package v1.0.1 Repair

## Repair status
This is a technical repair of the uploaded `2 : 3 Of Classical Collection` package. The human-designated family taxonomy is preserved: `family = tailored-classical`.

## Repairs applied
- Preserved the Tailored Classical root folder, manifest family slug, and asset naming convention.
- Rebuilt the oversized center shell-scroll relief as a compact 2400 x 1800 transparent stage overlay centered on `anchors.reliefAnchor`.
- Regenerated the corrupted finish selector icon as a clean 1024 x 1024 PNG material swatch.
- Added generic `previews/assembled-preview.png`.
- Preserved no-relief behavior as `stage: null` with no `relief__none.png` stage asset.
- Validated stage/icon dimensions and manifest file paths.

## Production note
This repair fixes technical asset/package issues only. It does not rename, reclassify, or override the human-approved family designation.

---

# LAVAL Tailored Classical Family Pack v1

## Approved family direction
Tailored Classical is a restrained European classical stone mantel family adapted for a high-end Charleston / Lowcountry renovation client. The approved direction uses a broad arched opening, rectangular outer surround, inset panel molding, simple pilaster/plinth logic, a long shallow cap, warm pale honed limestone, a black arched firebox insert, and a compact center shell-scroll crest relief.

## Package contents
This family package contains production stage layers, selector icons, QA previews, `manifest.json`, and this README.

## Component list
- Profile: `arched-panel-surround-a`
- Legs: `pilaster-plinth-pair-a`
- Shelf / Crown: `long-shallow-classical-cap-a`
- Door / Firebox: `black-arched-insert-a`
- Finish / Material: `warm-honed-limestone-a`
- Relief: `center-shell-scroll-crest-a`
- No Relief: manifest null stage state

## Stage canvas rules
All production stage assets are PNG files on a 2400 x 1800 px RGBA canvas. They are intended to stack at `x=0`, `y=0`, `scale=1`, `rotation=0` without per-option offsets.

## Icon canvas rules
All selector icons are PNG files on a 1024 x 1024 px canvas. Icons are UI assets only and must not be used as production stage layers.

## Layer order
1. door
2. profile
3. legs
4. shelf
5. finish
6. relief

## Anchor geometry
- `centerlineX`: 1200
- `baselineY`: 1560
- `openingBox`: x 760, y 560, width 880, height 760
- `reliefAnchor`: x 1200, y 360

## Relief / no-relief behavior
The approved Tailored Classical relief is `center-shell-scroll-crest-a`. It is a separate controlled option layer. The `none` relief option uses `stage: null`; no `relief__none.png` production stage file is included.

## Human QA status
Human-approved gates in this session:
- Master direction approved
- Separated component direction approved
- Stage QA direction approved
- Selector icon direction approved
- Correct compact relief approved
- With-relief / no-relief preview behavior approved

## Fabrication validation still required
This is a visual MVP asset package. A qualified fabrication / stone professional still needs to validate stone thickness, seams, real carving feasibility, mounting, installation constraints, weight, firebox compatibility, and CNC/schematic translation.

## Code Lane rendering notes
Code Lane should load `manifest.json`, follow `layerOrder`, render only `/stage` PNGs inside the fixed 4:3 configurator stage, and hide any component option whose `stage` value is `null`. The live configurator must not load files from `/previews` or use `/icons` as stage layers.

## Future-readiness notes
The manifest preserves hooks for future fabrication review, CNC mapping, 3D conversion, portal workflows, material provenance, and ledger/smart-contract readiness. None of those later systems are live in this MVP package.

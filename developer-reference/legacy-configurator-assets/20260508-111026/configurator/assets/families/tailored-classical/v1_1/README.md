# LAVAL Tailored Classical Family Pack v1

## Current stage
Build now: MVP layered 2D configurator asset package for the Tailored Classical family.

## Included
- `/stage`: normalized 2400 x 1800 PNG stage assets for live configurator stacking.
- `/icons`: normalized 1024 x 1024 selector icons for the UI.
- `/previews`: review-only images, including assembled preview, debug overlay, source reference, and review sheet.
- `manifest.json`: option paths, anchors, layer order, and future metadata.

## Relief logic
The `No Relief` option is intentionally represented as a null stage asset:

```json
"none": {
  "label": "No Relief",
  "stage": null,
  "icon": "icons/laval__tailored-classical__relief__none__icon.png"
}
```

No `/stage/laval__tailored-classical__relief__none.png` file is included. If the customer selects No Relief, Code Lane should hide/remove the relief layer rather than render a blank plaque.

## Code Lane rendering rule
Render selected stage assets in this layer order:
1. door
2. profile
3. legs
4. shelf
5. finish
6. relief

All stage images should be placed at `x=0`, `y=0`, `scale=1`, `rotation=0` using identical CSS positioning.

## Preserve now for upgrade paths
The package preserves component taxonomy, canvas standards, manifest-driven layer order, centerline/baseline/opening anchors, relief null-state logic, and future metadata for fabrication, CNC, 3D, and provenance.

## Human / Fabrication validation still required
This package is suitable for MVP visual integration and UI testing. It is not a fabrication drawing set. Stone thickness, seams, installation logic, firebox clearance, and CNC geometry require later human/fabrication validation.


## v1.1 Relief Revision

This package adds the first validated Tailored Classical relief anchor test:

- `relief.none` remains a null stage state. It renders no stone relief and does not load a blank plaque.
- `relief.center-crest-a` renders `stage/laval__tailored-classical__relief__center-crest-a.png`.
- The center crest relief is a transparent 2400 x 1800 stage overlay, aligned to the Tailored Classical centerline and relief anchor.
- Additional Tailored Classical reliefs may be added later if they share this anchor, scale band, and profile compatibility. If a later profile changes geometry, define profile-specific relief compatibility in the manifest.

Do not use `/icons` or `/previews` as stage assets. Do not create `laval__tailored-classical__relief__none.png`; no-relief is intentionally represented by `"stage": null`.

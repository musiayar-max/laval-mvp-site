# LAVAL Family Pack Zone Audit Tool

This is a normal Python QA script. It does **not** require the OpenAI API.

## What it does

It audits LAVAL layered 2D configurator family packs for:

- folder structure
- manifest validity
- missing referenced files
- stage image dimensions
- stage transparency
- icon dimensions
- preview/icon/stage separation
- relief null logic
- shelf/crown intrusion into the opening box
- door/firebox placement versus opening box
- relief overlay size and anchor-zone fit
- finish alpha density
- generated stack previews at `x=0, y=0, scale=1, rotation=0`
- zone overlay diagnostic images

## Install

```bash
pip install pillow
```

## Run

```bash
python laval_family_pack_zone_audit.py path/to/family.zip --out audit_output
```

Multiple files:

```bash
python laval_family_pack_zone_audit.py family1.zip family2.zip family3.zip --out audit_output
```

Audit a bundle zip:

```bash
python laval_family_pack_zone_audit.py LAVAL_revised_classical_family_packs_FOR_AUDIT_2026-05-06.zip --out audit_output
```

## Output

The tool creates:

- `LAVAL_automated_zone_audit_report.md`
- `findings.json`
- assembled stack preview PNGs
- zone-overlay diagnostic PNGs
- per-package `metrics.json`

## Important limitation

This script can catch many structural and zone failures, but it cannot replace human approval for luxury realism, fabrication plausibility, or family taxonomy. It should be used as a gate before Code Lane, not as the final design judge.

## Stronger future option

Add family-specific `zones` to each manifest:

```json
"zones": {
  "shelfZone": { "x": 300, "y": 120, "width": 1800, "height": 420 },
  "reliefZone": { "x": 840, "y": 180, "width": 720, "height": 360 },
  "doorZone": { "x": 760, "y": 560, "width": 880, "height": 760 }
}
```

This makes shelf/relief/door detection stricter and less dependent on defaults.

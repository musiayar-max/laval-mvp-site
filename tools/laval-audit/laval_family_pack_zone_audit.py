#!/usr/bin/env python3
"""
LAVAL Family Pack Zone Audit Tool
Version: 1.0

Purpose:
  Audit LAVAL / Musiayar Mantles layered 2D configurator family packs.

What this catches:
  - Bad folder structure
  - Missing manifest / README
  - Broken manifest paths
  - Stage images not 2400 x 1800
  - Icons not 1024 x 1024
  - Missing alpha transparency
  - Previews/icons referenced as stage assets
  - relief.none incorrectly using an image
  - forbidden relief__none.png stage files
  - Shelf/crown pixels entering the opening/firebox zone
  - Door/firebox pixels outside the opening box
  - Relief overlays that are too large or outside relief anchors
  - Suspicious finish alpha density
  - Layer stack previews rendered at x=0, y=0, scale=1, rotation=0

What this cannot guarantee:
  - Perfect taste
  - Luxury realism
  - Fabrication plausibility
  - Whether a human-designated family taxonomy is correct
  - Whether an intentionally unusual design is acceptable

Dependencies:
  pip install pillow

Usage:
  python laval_family_pack_zone_audit.py path/to/family.zip --out audit_output
  python laval_family_pack_zone_audit.py bundle.zip family_folder/ --out audit_output

Optional:
  Add a "zones" object to manifest.json for stricter family-specific QA:
  {
    "zones": {
      "shelfZone": {"x": 300, "y": 120, "width": 1800, "height": 420},
      "reliefZone": {"x": 840, "y": 180, "width": 720, "height": 360},
      "doorZone": {"x": 760, "y": 560, "width": 880, "height": 760}
    }
  }
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
import zipfile
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

from PIL import Image, ImageChops, ImageDraw, ImageFont


RGBA = "RGBA"
DEFAULT_STAGE = {"width": 2400, "height": 1800}
DEFAULT_ICON = {"width": 1024, "height": 1024}
ALPHA_THRESHOLD = 8


@dataclass
class Finding:
    severity: str  # PASS, INFO, WARN, FAIL
    package: str
    check: str
    message: str
    file: Optional[str] = None


def add(findings: List[Finding], severity: str, package: str, check: str, message: str, file: Optional[str] = None):
    findings.append(Finding(severity, package, check, message, file))


def safe_extract_zip(zip_path: Path, dest: Path) -> Path:
    out_dir = dest / zip_path.stem
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(zip_path, "r") as z:
        for member in z.infolist():
            member_path = out_dir / member.filename
            resolved = member_path.resolve()
            if not str(resolved).startswith(str(out_dir.resolve())):
                raise RuntimeError(f"Unsafe zip path: {member.filename}")
            z.extract(member, out_dir)
    return out_dir


def collect_inputs(inputs: List[Path], work_dir: Path) -> List[Path]:
    roots = []
    for p in inputs:
        p = p.expanduser().resolve()
        if not p.exists():
            raise FileNotFoundError(p)
        if p.is_file() and p.suffix.lower() == ".zip":
            roots.append(safe_extract_zip(p, work_dir))
        elif p.is_dir():
            roots.append(p)
        else:
            raise ValueError(f"Unsupported input: {p}")
    return roots


def find_manifests(roots: List[Path]) -> List[Path]:
    manifests = []
    for root in roots:
        manifests.extend(root.rglob("manifest.json"))
    # Deduplicate while preserving order.
    seen = set()
    unique = []
    for m in manifests:
        if m.resolve() not in seen:
            unique.append(m)
            seen.add(m.resolve())
    return unique


def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def rel(path: Path, base: Path) -> str:
    try:
        return str(path.relative_to(base))
    except Exception:
        return str(path)


def image_info(path: Path) -> Dict[str, Any]:
    with Image.open(path) as im:
        info = {
            "format": im.format,
            "width": im.width,
            "height": im.height,
            "mode": im.mode,
            "has_alpha": "A" in im.getbands(),
        }
        if info["has_alpha"]:
            alpha = im.convert("RGBA").getchannel("A")
            extrema = alpha.getextrema()
            mask = alpha.point(lambda a: 255 if a > ALPHA_THRESHOLD else 0)
            bbox = mask.getbbox()
            visible = sum(1 for v in alpha.getdata() if v > ALPHA_THRESHOLD)
            total = im.width * im.height
            info.update({
                "alpha_min": extrema[0],
                "alpha_max": extrema[1],
                "alpha_visible_pixels": visible,
                "alpha_visible_pct": visible / total if total else 0,
                "alpha_bbox": bbox,
            })
        return info


def rect_from_manifest(obj: Dict[str, Any]) -> Optional[Tuple[int, int, int, int]]:
    if not obj:
        return None
    keys = {"x", "y", "width", "height"}
    if keys.issubset(obj.keys()):
        x, y, w, h = int(obj["x"]), int(obj["y"]), int(obj["width"]), int(obj["height"])
        return (x, y, x + w, y + h)
    return None


def rect_area(r: Optional[Tuple[int, int, int, int]]) -> int:
    if not r:
        return 0
    return max(0, r[2] - r[0]) * max(0, r[3] - r[1])


def rect_intersect(a: Optional[Tuple[int, int, int, int]], b: Optional[Tuple[int, int, int, int]]) -> Optional[Tuple[int, int, int, int]]:
    if not a or not b:
        return None
    x1, y1 = max(a[0], b[0]), max(a[1], b[1])
    x2, y2 = min(a[2], b[2]), min(a[3], b[3])
    if x2 <= x1 or y2 <= y1:
        return None
    return (x1, y1, x2, y2)


def alpha_pixel_count_in_rect(path: Path, rect: Tuple[int, int, int, int]) -> int:
    with Image.open(path) as im:
        alpha = im.convert("RGBA").getchannel("A")
        x1, y1, x2, y2 = rect
        crop = alpha.crop((x1, y1, x2, y2))
        return sum(1 for v in crop.getdata() if v > ALPHA_THRESHOLD)


def visible_bbox(path: Path) -> Optional[Tuple[int, int, int, int]]:
    with Image.open(path) as im:
        alpha = im.convert("RGBA").getchannel("A")
        mask = alpha.point(lambda a: 255 if a > ALPHA_THRESHOLD else 0)
        return mask.getbbox()


def default_zones(manifest: Dict[str, Any]) -> Dict[str, Tuple[int, int, int, int]]:
    stage = manifest.get("stageCanvas") or {}
    W = int(stage.get("width", DEFAULT_STAGE["width"]))
    H = int(stage.get("height", DEFAULT_STAGE["height"]))

    anchors = manifest.get("anchors") or {}
    opening = rect_from_manifest(anchors.get("openingBox") or {}) or (
        int(W * 0.3167), int(H * 0.3111), int(W * 0.6833), int(H * 0.7333)
    )

    zones = {}
    user_zones = manifest.get("zones") or {}

    shelf = rect_from_manifest(user_zones.get("shelfZone") or {})
    if not shelf:
        # Broad top band. Family-specific manifest zones are better.
        shelf = (int(W * 0.12), int(H * 0.04), int(W * 0.88), int(H * 0.34))
    zones["shelfZone"] = shelf

    door = rect_from_manifest(user_zones.get("doorZone") or {}) or opening
    zones["doorZone"] = door
    zones["openingBox"] = opening

    relief = rect_from_manifest(user_zones.get("reliefZone") or {})
    if not relief:
        # Prefer plural anchors for twin roundels, otherwise single anchor.
        relief_rects = []
        plural = anchors.get("reliefAnchors") or manifest.get("reliefAnchors") or {}
        if isinstance(plural, dict) and plural:
            for _, anchor in plural.items():
                if isinstance(anchor, dict) and "x" in anchor and "y" in anchor:
                    ax, ay = int(anchor["x"]), int(anchor["y"])
                    relief_rects.append((ax - 260, ay - 220, ax + 260, ay + 220))
            if relief_rects:
                x1 = min(r[0] for r in relief_rects)
                y1 = min(r[1] for r in relief_rects)
                x2 = max(r[2] for r in relief_rects)
                y2 = max(r[3] for r in relief_rects)
                relief = (x1, y1, x2, y2)
        if not relief:
            anchor = anchors.get("reliefAnchor") or manifest.get("reliefAnchor") or {"x": W // 2, "y": int(H * 0.20)}
            ax, ay = int(anchor.get("x", W // 2)), int(anchor.get("y", int(H * 0.20)))
            relief = (ax - 420, ay - 260, ax + 420, ay + 260)

    zones["reliefZone"] = relief
    return zones


def stage_paths_from_manifest(family_dir: Path, manifest: Dict[str, Any]) -> List[Tuple[str, str, Path]]:
    out = []
    components = manifest.get("components") or {}
    for component, config in components.items():
        options = (config or {}).get("options") or {}
        for option_key, option in options.items():
            if not isinstance(option, dict):
                continue
            stage = option.get("stage")
            if stage:
                out.append((component, option_key, family_dir / stage))
    return out


def icon_paths_from_manifest(family_dir: Path, manifest: Dict[str, Any]) -> List[Tuple[str, str, Path]]:
    out = []
    components = manifest.get("components") or {}
    for component, config in components.items():
        options = (config or {}).get("options") or {}
        for option_key, option in options.items():
            if not isinstance(option, dict):
                continue
            icon = option.get("icon")
            if icon:
                out.append((component, option_key, family_dir / icon))
    return out


def first_valid_selection(manifest: Dict[str, Any]) -> Dict[str, str]:
    selection = {}
    for component in manifest.get("layerOrder") or []:
        options = ((manifest.get("components") or {}).get(component) or {}).get("options") or {}
        for key, opt in options.items():
            if isinstance(opt, dict) and opt.get("stage"):
                selection[component] = key
                break
        if component == "relief" and "relief" not in selection and "none" in options:
            selection["relief"] = "none"
    return selection


def render_stack(family_dir: Path, manifest: Dict[str, Any], selection: Dict[str, str]) -> Image.Image:
    stage = manifest.get("stageCanvas") or {}
    W = int(stage.get("width", DEFAULT_STAGE["width"]))
    H = int(stage.get("height", DEFAULT_STAGE["height"]))
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    components = manifest.get("components") or {}
    for component in manifest.get("layerOrder") or []:
        option_key = selection.get(component)
        option = (((components.get(component) or {}).get("options") or {}).get(option_key) or {})
        src = option.get("stage") if isinstance(option, dict) else None
        if not src:
            continue
        p = family_dir / src
        if not p.exists():
            continue
        with Image.open(p) as im:
            layer = im.convert("RGBA")
            if layer.size != (W, H):
                layer = layer.resize((W, H))
            canvas.alpha_composite(layer, (0, 0))
    return canvas


def all_relief_selections(manifest: Dict[str, Any]) -> List[Dict[str, str]]:
    base = first_valid_selection(manifest)
    rel = (((manifest.get("components") or {}).get("relief") or {}).get("options") or {})
    if not rel:
        return [base]
    selections = []
    for key in rel.keys():
        s = dict(base)
        s["relief"] = key
        selections.append(s)
    return selections


def draw_zone_overlay(base: Image.Image, zones: Dict[str, Tuple[int, int, int, int]], title: str) -> Image.Image:
    img = base.convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    palette = {
        "openingBox": (255, 0, 0, 170),
        "doorZone": (255, 90, 0, 140),
        "shelfZone": (0, 120, 255, 150),
        "reliefZone": (160, 0, 255, 150),
    }
    for name, r in zones.items():
        color = palette.get(name, (0, 255, 0, 140))
        d.rectangle(r, outline=color, width=5)
        d.text((r[0] + 8, r[1] + 8), name, fill=color)

    d.text((24, 24), title, fill=(255, 255, 255, 230))
    return Image.alpha_composite(img, overlay)


def compare_to_preview(stack: Image.Image, preview_path: Path) -> Optional[float]:
    if not preview_path.exists():
        return None
    with Image.open(preview_path) as prev:
        prev = prev.convert("RGBA")
        if prev.size != stack.size:
            return None
        diff = ImageChops.difference(stack, prev)
        # Similarity based on average absolute channel difference.
        hist = diff.histogram()
        total = stack.width * stack.height * 4
        score = 0
        for i, count in enumerate(hist):
            score += (i % 256) * count
        max_score = 255 * total
        return 1.0 - (score / max_score)


def validate_package(manifest_path: Path, out_dir: Path) -> Tuple[str, List[Finding], Dict[str, Any]]:
    family_dir = manifest_path.parent
    manifest = load_json(manifest_path)
    package = family_dir.name
    findings: List[Finding] = []
    metrics: Dict[str, Any] = {
        "package": package,
        "familyDir": str(family_dir),
        "manifest": str(manifest_path),
        "stageAssets": [],
        "iconAssets": [],
        "stackPreviews": [],
    }

    # Structure.
    for folder in ["stage", "icons", "previews"]:
        if (family_dir / folder).is_dir():
            add(findings, "PASS", package, "folder_structure", f"{folder}/ exists")
        else:
            add(findings, "FAIL", package, "folder_structure", f"{folder}/ missing")

    if (family_dir / "README.md").exists():
        add(findings, "PASS", package, "readme", "README.md exists")
    else:
        add(findings, "FAIL", package, "readme", "README.md missing")

    # Manifest basics.
    layer_order = manifest.get("layerOrder")
    if isinstance(layer_order, list) and layer_order:
        add(findings, "PASS", package, "manifest_layerOrder", f"layerOrder explicit: {layer_order}")
    else:
        add(findings, "FAIL", package, "manifest_layerOrder", "layerOrder missing or empty")

    # No relief none file.
    relief_none_files = list((family_dir / "stage").glob("*relief__none*.png")) if (family_dir / "stage").exists() else []
    if relief_none_files:
        for p in relief_none_files:
            add(findings, "FAIL", package, "relief_none", "Forbidden relief__none stage asset exists", rel(p, family_dir))
    else:
        add(findings, "PASS", package, "relief_none", "No relief__none stage asset found")

    relief_options = (((manifest.get("components") or {}).get("relief") or {}).get("options") or {})
    if "none" in relief_options:
        stage_val = relief_options["none"].get("stage") if isinstance(relief_options["none"], dict) else "INVALID"
        if stage_val is None:
            add(findings, "PASS", package, "relief_none", "relief.none.stage is null")
        else:
            add(findings, "FAIL", package, "relief_none", f"relief.none.stage should be null, got {stage_val}")

    # Dimensions.
    stage_req = manifest.get("stageCanvas") or DEFAULT_STAGE
    icon_req = manifest.get("iconCanvas") or DEFAULT_ICON
    required_stage = (int(stage_req.get("width", 2400)), int(stage_req.get("height", 1800)))
    required_icon = (int(icon_req.get("width", 1024)), int(icon_req.get("height", 1024)))

    stage_assets = stage_paths_from_manifest(family_dir, manifest)
    icon_assets = icon_paths_from_manifest(family_dir, manifest)

    referenced = set()

    for component, option_key, p in stage_assets:
        referenced.add(p.resolve())
        file_rel = rel(p, family_dir)
        if not p.exists():
            add(findings, "FAIL", package, "stage_path", f"Missing stage file for {component}.{option_key}", file_rel)
            continue
        if "/icons/" in file_rel or file_rel.startswith("icons/"):
            add(findings, "FAIL", package, "stage_path", "Icon referenced as stage asset", file_rel)
        if "/previews/" in file_rel or file_rel.startswith("previews/"):
            add(findings, "FAIL", package, "stage_path", "Preview referenced as stage asset", file_rel)

        info = image_info(p)
        row = {"component": component, "option": option_key, "path": file_rel, **info}
        metrics["stageAssets"].append(row)

        if info["format"] != "PNG":
            add(findings, "FAIL", package, "stage_format", f"Stage file is not PNG: {info['format']}", file_rel)
        if (info["width"], info["height"]) == required_stage:
            add(findings, "PASS", package, "stage_dimensions", f"{component}.{option_key} is {required_stage[0]}x{required_stage[1]}", file_rel)
        else:
            add(findings, "FAIL", package, "stage_dimensions", f"{component}.{option_key} is {info['width']}x{info['height']} not {required_stage}", file_rel)
        if info["has_alpha"] and info.get("alpha_min", 255) < 255:
            add(findings, "PASS", package, "stage_alpha", f"{component}.{option_key} has alpha transparency", file_rel)
        else:
            add(findings, "FAIL", package, "stage_alpha", f"{component}.{option_key} lacks genuine transparency", file_rel)

        # Component-specific visual audits.
        bbox = info.get("alpha_bbox")
        zones = default_zones(manifest)
        visible = max(1, int(info.get("alpha_visible_pixels", 1)))

        if component in ("shelf", "crown", "shelf/crown"):
            opening = zones["openingBox"]
            count = alpha_pixel_count_in_rect(p, opening)
            pct = count / visible
            if pct > 0.015:
                add(findings, "FAIL", package, "shelf_opening_intrusion",
                    f"Shelf/crown has {pct:.2%} of visible pixels inside openingBox. Likely crosses firebox/profile zone.",
                    file_rel)
            else:
                add(findings, "PASS", package, "shelf_opening_intrusion",
                    f"Shelf/crown opening intrusion acceptable: {pct:.2%}", file_rel)

            shelf_zone = zones["shelfZone"]
            bbox_inter = rect_intersect(bbox, shelf_zone) if bbox else None
            bbox_area = max(1, rect_area(bbox))
            inside_ratio = rect_area(bbox_inter) / bbox_area if bbox else 0
            if inside_ratio < 0.55:
                add(findings, "WARN", package, "shelf_zone",
                    f"Shelf bbox only {inside_ratio:.1%} inside default shelfZone. Family-specific zones may be needed.",
                    file_rel)

        if component in ("door", "firebox"):
            door_zone = zones["doorZone"]
            bbox_inter = rect_intersect(bbox, door_zone) if bbox else None
            bbox_area = max(1, rect_area(bbox))
            inside_ratio = rect_area(bbox_inter) / bbox_area if bbox else 0
            if inside_ratio < 0.65:
                add(findings, "WARN", package, "door_zone",
                    f"Door/firebox bbox only {inside_ratio:.1%} inside doorZone/openingBox.", file_rel)
            else:
                add(findings, "PASS", package, "door_zone",
                    f"Door/firebox bbox fits doorZone/openingBox: {inside_ratio:.1%}", file_rel)

        if component == "relief":
            coverage = info.get("alpha_visible_pct", 0)
            # Single crest should be compact. Twin roundels can be larger. Still flag very large coverage.
            if coverage > 0.10:
                add(findings, "FAIL", package, "relief_coverage",
                    f"Relief visible coverage is {coverage:.2%} of canvas; likely contains non-relief structure.",
                    file_rel)
            elif coverage > 0.055:
                add(findings, "WARN", package, "relief_coverage",
                    f"Relief visible coverage is {coverage:.2%}; verify this is intentional for twin/large relief.",
                    file_rel)
            else:
                add(findings, "PASS", package, "relief_coverage",
                    f"Relief coverage compact: {coverage:.2%}", file_rel)

            relief_zone = zones["reliefZone"]
            bbox_inter = rect_intersect(bbox, relief_zone) if bbox else None
            bbox_area = max(1, rect_area(bbox))
            inside_ratio = rect_area(bbox_inter) / bbox_area if bbox else 0
            if inside_ratio < 0.65:
                add(findings, "WARN", package, "relief_zone",
                    f"Relief bbox only {inside_ratio:.1%} inside reliefZone. Check anchor or add family-specific zones.",
                    file_rel)
            else:
                add(findings, "PASS", package, "relief_zone",
                    f"Relief bbox fits reliefZone: {inside_ratio:.1%}", file_rel)

        if component == "finish":
            alpha_max = info.get("alpha_max", 255)
            alpha_visible_pct = info.get("alpha_visible_pct", 0)
            if alpha_max < 128:
                add(findings, "WARN", package, "finish_alpha_density",
                    f"Finish max alpha is {alpha_max}/255 and coverage {alpha_visible_pct:.2%}. Confirm semi-transparent wash is intentional.",
                    file_rel)
            else:
                add(findings, "PASS", package, "finish_alpha_density",
                    f"Finish alpha density acceptable by max-alpha screen: {alpha_max}/255", file_rel)

    for component, option_key, p in icon_assets:
        file_rel = rel(p, family_dir)
        if not p.exists():
            add(findings, "FAIL", package, "icon_path", f"Missing icon file for {component}.{option_key}", file_rel)
            continue
        info = image_info(p)
        metrics["iconAssets"].append({"component": component, "option": option_key, "path": file_rel, **info})
        if (info["width"], info["height"]) == required_icon:
            add(findings, "PASS", package, "icon_dimensions", f"{component}.{option_key} is {required_icon[0]}x{required_icon[1]}", file_rel)
        else:
            add(findings, "FAIL", package, "icon_dimensions", f"{component}.{option_key} is {info['width']}x{info['height']} not {required_icon}", file_rel)

    # Stage folder contamination: stage may contain unreferenced PNGs. Warn, do not fail by default.
    if (family_dir / "stage").exists():
        for p in (family_dir / "stage").glob("*"):
            if p.is_file() and p.suffix.lower() == ".png" and p.resolve() not in referenced:
                add(findings, "WARN", package, "unreferenced_stage_file", "Stage PNG exists but is not referenced in manifest", rel(p, family_dir))

    # Render stack previews.
    package_out = out_dir / package
    package_out.mkdir(parents=True, exist_ok=True)
    zones = default_zones(manifest)

    selections = all_relief_selections(manifest)
    for i, selection in enumerate(selections, start=1):
        stack = render_stack(family_dir, manifest, selection)
        name = "__".join([f"{k}-{v}" for k, v in selection.items() if k == "relief"]) or f"selection-{i}"
        stack_path = package_out / f"assembled_stack_{i}_{name}.png"
        stack.save(stack_path)

        overlay = draw_zone_overlay(stack, zones, f"{package} | {selection}")
        overlay_path = package_out / f"assembled_stack_{i}_{name}_ZONE_OVERLAY.png"
        overlay.save(overlay_path)

        metrics["stackPreviews"].append({"selection": selection, "stack": str(stack_path), "zoneOverlay": str(overlay_path)})

    # Compare common previews when possible.
    preview_candidates = [
        ("assembled-preview.png", "generic"),
        ("assembled-preview__no-relief.png", "no-relief"),
        ("assembled-preview__with-relief.png", "with-relief"),
    ]
    first_stack = render_stack(family_dir, manifest, first_valid_selection(manifest))
    for fname, label in preview_candidates:
        p = family_dir / "previews" / fname
        sim = compare_to_preview(first_stack, p)
        if sim is not None:
            add(findings, "INFO", package, "stack_preview_similarity", f"{fname} similarity to first manifest stack: {sim:.2%}", rel(p, family_dir))

    # Write metrics.
    (package_out / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")

    return package, findings, metrics


def verdict_for(findings: List[Finding]) -> Tuple[str, bool]:
    has_fail = any(f.severity == "FAIL" for f in findings)
    has_warn = any(f.severity == "WARN" for f in findings)
    if has_fail:
        return "FAIL", False
    if has_warn:
        return "CONDITIONAL PASS", False
    return "PASS", True


def write_markdown_report(all_findings: List[Finding], package_names: List[str], out_dir: Path):
    by_pkg: Dict[str, List[Finding]] = {p: [] for p in package_names}
    for f in all_findings:
        by_pkg.setdefault(f.package, []).append(f)

    lines = []
    lines.append("# LAVAL Automated Family Pack Zone Audit")
    lines.append("")
    lines.append("This report checks technical validity plus zone-based visual-risk indicators.")
    lines.append("")
    lines.append("## Executive verdict")
    lines.append("")
    lines.append("| Package | Verdict | Production-ready? | Main reason |")
    lines.append("|---|---|:---:|---|")

    for pkg in package_names:
        fs = by_pkg.get(pkg, [])
        verdict, ready = verdict_for(fs)
        if verdict == "FAIL":
            main = next((f.message for f in fs if f.severity == "FAIL"), "Blocking failure")
        elif verdict == "CONDITIONAL PASS":
            main = next((f.message for f in fs if f.severity == "WARN"), "Warnings require human decision")
        else:
            main = "No automated blocking issues found"
        lines.append(f"| {pkg} | **{verdict}** | {'✅' if ready else '⚠️/❌'} | {main} |")

    lines.append("")
    lines.append("## Package-by-package findings")

    for pkg in package_names:
        fs = by_pkg.get(pkg, [])
        lines.append("")
        lines.append(f"### {pkg}")
        verdict, ready = verdict_for(fs)
        lines.append(f"**Verdict:** {verdict}")
        lines.append("")
        for severity in ["FAIL", "WARN", "INFO", "PASS"]:
            subset = [f for f in fs if f.severity == severity]
            if not subset:
                continue
            lines.append(f"#### {severity}")
            for f in subset:
                file_part = f" — `{f.file}`" if f.file else ""
                lines.append(f"- **{f.check}:** {f.message}{file_part}")
            lines.append("")

        lines.append("Current stage: automated QA")
        lines.append("Next move: fix FAIL items; human-review WARN items; approve visual realism manually.")
        lines.append("Future-readiness impact: prevents Code Lane offsets and preserves clean manifest-driven rendering.")
        lines.append("Owner lane: Code Lane validation + Image Lane repair + Human visual approval.")
        lines.append("Risks: automated zone checks use default zones unless manifest zones are explicitly supplied.")
        lines.append("Needed decisions: confirm any flagged finish opacity, relief size, or unusual component placement.")

    lines.append("")
    lines.append("## Integration warning")
    lines.append("")
    lines.append("If two packages use the same `family` value, do not rename the human family automatically. Use a technical registry key such as `productId`, `packageId`, `collectionId`, or SKU-like option namespace.")
    lines.append("")
    lines.append("## Final line")
    lines.append("")
    lines.append("If any layer requires CSS offsets or manual nudging to look correct, that package is not production-ready.")
    lines.append("")

    report_path = out_dir / "LAVAL_automated_zone_audit_report.md"
    report_path.write_text("\n".join(lines), encoding="utf-8")
    return report_path


def main():
    parser = argparse.ArgumentParser(description="Audit LAVAL family-pack zips/folders.")
    parser.add_argument("inputs", nargs="+", help="Zip files or folders to audit.")
    parser.add_argument("--out", default="laval_audit_output", help="Output directory.")
    parser.add_argument("--work", default=None, help="Working extract directory.")
    args = parser.parse_args()

    out_dir = Path(args.out).resolve()
    work_dir = Path(args.work).resolve() if args.work else out_dir / "_extracted"
    out_dir.mkdir(parents=True, exist_ok=True)
    work_dir.mkdir(parents=True, exist_ok=True)

    roots = collect_inputs([Path(x) for x in args.inputs], work_dir)
    manifests = find_manifests(roots)

    if not manifests:
        print("No manifest.json files found.", file=sys.stderr)
        sys.exit(2)

    all_findings: List[Finding] = []
    package_names: List[str] = []

    for manifest_path in manifests:
        pkg, findings, _metrics = validate_package(manifest_path, out_dir)
        package_names.append(pkg)
        all_findings.extend(findings)

    report = write_markdown_report(all_findings, package_names, out_dir)

    # Also write machine-readable findings.
    json_path = out_dir / "findings.json"
    json_path.write_text(json.dumps([asdict(f) for f in all_findings], indent=2), encoding="utf-8")

    print(f"Audit complete.")
    print(f"Report: {report}")
    print(f"Findings JSON: {json_path}")
    print(f"Stack/zone previews are inside: {out_dir}")


if __name__ == "__main__":
    main()

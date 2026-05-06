#!/usr/bin/env bash
set -euo pipefail

echo "LAVAL current family asset install starting..."

REQUIRED_FILES=(
  "laval__tailored-classical__family-pack-v1_1.zip"
  "laval__tailored-classical__family-pack-v1_0_1-repaired-2of3.zip"
  "laval__antique-neoclassical-arch__family-pack-v1_0_1.zip"
  "LAVAL_family_pack_zone_audit_tool_v1.zip"
)

mkdir -p _asset_intake/current-family

echo "Copying current zip files into intake..."
for f in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "MISSING REQUIRED FILE: $f"
    exit 1
  fi
  cp "$f" "_asset_intake/current-family/$f"
done

echo "Testing zip integrity..."
for f in "${REQUIRED_FILES[@]}"; do
  unzip -t "_asset_intake/current-family/$f" >/dev/null
  echo "OK: $f"
done

echo "Installing audit tool..."
rm -rf tools/laval-audit
mkdir -p tools/laval-audit
unzip -q "_asset_intake/current-family/LAVAL_family_pack_zone_audit_tool_v1.zip" -d tools/laval-audit

echo "Backing up old configurator image folders..."
BACKUP_DIR="_asset_backups/configurator-assets-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

for d in \
  "configurator/assets/mantels" \
  "configurator/assets/generated" \
  "configurator/assets/families"
do
  if [ -d "$d" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$d")"
    mv "$d" "$BACKUP_DIR/$d"
    echo "Moved old active folder to backup: $d"
  else
    echo "No old folder found: $d"
  fi
done

echo "Creating clean current-family asset folders..."
mkdir -p configurator/assets/families/tailored-classical/v1_1
mkdir -p configurator/assets/families/tailored-classical/2of3-v1_0_1
mkdir -p configurator/assets/families/antique-neoclassical-arch/v1_0_1
mkdir -p configurator/data
mkdir -p _asset_extract

install_family_zip () {
  ZIP_PATH="$1"
  TARGET_DIR="$2"
  TMP_DIR="_asset_extract/tmp_install"

  rm -rf "$TMP_DIR"
  mkdir -p "$TMP_DIR"

  unzip -q "$ZIP_PATH" -d "$TMP_DIR"

  MANIFEST_PATH="$(find "$TMP_DIR" -name manifest.json | head -n 1 || true)"

  if [ -z "$MANIFEST_PATH" ]; then
    echo "No manifest.json found inside $ZIP_PATH"
    exit 1
  fi

  SRC_DIR="$(dirname "$MANIFEST_PATH")"

  rm -rf "$TARGET_DIR"
  mkdir -p "$TARGET_DIR"

  cp -a "$SRC_DIR"/. "$TARGET_DIR"/

  echo "Installed $(basename "$ZIP_PATH") to $TARGET_DIR"
}

install_family_zip \
  "_asset_intake/current-family/laval__tailored-classical__family-pack-v1_1.zip" \
  "configurator/assets/families/tailored-classical/v1_1"

install_family_zip \
  "_asset_intake/current-family/laval__tailored-classical__family-pack-v1_0_1-repaired-2of3.zip" \
  "configurator/assets/families/tailored-classical/2of3-v1_0_1"

install_family_zip \
  "_asset_intake/current-family/laval__antique-neoclassical-arch__family-pack-v1_0_1.zip" \
  "configurator/assets/families/antique-neoclassical-arch/v1_0_1"

echo "Writing family package registry..."

cat > configurator/data/family-pack-registry.json <<'JSON'
{
  "version": "1.0.0",
  "purpose": "Technical registry for current LAVAL configurator family packages. Human family taxonomy is preserved; productId prevents technical collisions.",
  "families": [
    {
      "family": "tailored-classical",
      "displayName": "Tailored Classical",
      "packages": [
        {
          "productId": "tailored-classical-v1-1",
          "label": "Tailored Classical — v1.1",
          "assetRoot": "/configurator/assets/families/tailored-classical/v1_1",
          "manifest": "/configurator/assets/families/tailored-classical/v1_1/manifest.json",
          "status": "visual-qa-reopen",
          "notes": "Technically valid, but shelf/profile relationship requires visual confirmation before production."
        },
        {
          "productId": "tailored-classical-2of3-v1-0-1",
          "label": "Tailored Classical — 2 of 3",
          "assetRoot": "/configurator/assets/families/tailored-classical/2of3-v1_0_1",
          "manifest": "/configurator/assets/families/tailored-classical/2of3-v1_0_1/manifest.json",
          "status": "conditional-pass",
          "notes": "Requires owner decision on semi-transparent finish layer."
        }
      ]
    },
    {
      "family": "antique-neoclassical-arch",
      "displayName": "Antique Neoclassical Arch",
      "packages": [
        {
          "productId": "antique-neoclassical-arch-v1-0-1",
          "label": "Antique Neoclassical Arch — v1.0.1",
          "assetRoot": "/configurator/assets/families/antique-neoclassical-arch/v1_0_1",
          "manifest": "/configurator/assets/families/antique-neoclassical-arch/v1_0_1/manifest.json",
          "status": "ready-for-audit",
          "notes": "Revised manifest supports reliefAnchor fallback and twin reliefAnchors."
        }
      ]
    }
  ]
}
JSON

cat > configurator/data/family-pack-registry.js <<'JS'
export const LAVAL_FAMILY_PACK_REGISTRY = {
  version: "1.0.0",
  purpose: "Technical registry for current LAVAL configurator family packages. Human family taxonomy is preserved; productId prevents technical collisions.",
  families: [
    {
      family: "tailored-classical",
      displayName: "Tailored Classical",
      packages: [
        {
          productId: "tailored-classical-v1-1",
          label: "Tailored Classical — v1.1",
          assetRoot: "/configurator/assets/families/tailored-classical/v1_1",
          manifest: "/configurator/assets/families/tailored-classical/v1_1/manifest.json",
          status: "visual-qa-reopen",
          notes: "Technically valid, but shelf/profile relationship requires visual confirmation before production."
        },
        {
          productId: "tailored-classical-2of3-v1-0-1",
          label: "Tailored Classical — 2 of 3",
          assetRoot: "/configurator/assets/families/tailored-classical/2of3-v1_0_1",
          manifest: "/configurator/assets/families/tailored-classical/2of3-v1_0_1/manifest.json",
          status: "conditional-pass",
          notes: "Requires owner decision on semi-transparent finish layer."
        }
      ]
    },
    {
      family: "antique-neoclassical-arch",
      displayName: "Antique Neoclassical Arch",
      packages: [
        {
          productId: "antique-neoclassical-arch-v1-0-1",
          label: "Antique Neoclassical Arch — v1.0.1",
          assetRoot: "/configurator/assets/families/antique-neoclassical-arch/v1_0_1",
          manifest: "/configurator/assets/families/antique-neoclassical-arch/v1_0_1/manifest.json",
          status: "ready-for-audit",
          notes: "Revised manifest supports reliefAnchor fallback and twin reliefAnchors."
        }
      ]
    }
  ]
};
JS

echo "Running LAVAL asset audit..."
python3 tools/laval-audit/laval_family_pack_zone_audit.py \
  configurator/assets/families \
  --out _asset_audits/current-family

echo ""
echo "DONE."
echo ""
echo "Current family assets installed at:"
find configurator/assets/families -maxdepth 4 -type d | sort
echo ""
echo "Registry:"
echo "configurator/data/family-pack-registry.json"
echo ""
echo "Audit report:"
echo "_asset_audits/current-family/LAVAL_automated_zone_audit_report.md"
echo ""
echo "Old assets were moved to:"
echo "$BACKUP_DIR"

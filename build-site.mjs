import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "dist");

const EXCLUDED_DIRS = new Set([
  ".git",
  ".github",
  ".wrangler",
  ".cloudflare",
  "node_modules",
  "dist",
  "__MACOSX"
]);

const EXCLUDED_FILES = new Set([
  ".DS_Store",
  "package-lock.json",
  "bun.lockb",
  "pnpm-lock.yaml",
  "yarn.lock",
  "wrangler.toml",
  "wrangler.json",
  "wrangler.jsonc",
  "build-site.mjs",
  "package.json"
]);

const ALLOWED_ROOT_EXTENSIONS = new Set([
  ".html",
  ".css",
  ".js",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".svg",
  ".gif",
  ".ico",
  ".txt",
  ".json",
  ".pdf"
]);

const ALWAYS_COPY_DIRS = new Set([
  "assets",
  "css",
  "images",
  "configurator"
]);

const MAX_ASSET_BYTES = 24 * 1024 * 1024;

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function shouldSkipDir(name) {
  return EXCLUDED_DIRS.has(name);
}

function shouldSkipFile(name, fullPath) {
  if (EXCLUDED_FILES.has(name)) return true;

  const stat = fs.statSync(fullPath);
  if (stat.size > MAX_ASSET_BYTES) {
    console.warn(`Skipping oversized asset: ${path.relative(ROOT, fullPath)} (${Math.round(stat.size / 1024 / 1024)} MiB)`);
    return true;
  }

  return false;
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  ensureDir(destDir);

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      copyDir(srcPath, destPath);
      continue;
    }

    if (entry.isFile()) {
      if (shouldSkipFile(entry.name, srcPath)) continue;
      copyFile(srcPath, destPath);
    }
  }
}

function shouldCopyRootFile(name, fullPath) {
  if (shouldSkipFile(name, fullPath)) return false;

  const ext = path.extname(name).toLowerCase();

  if (ALWAYS_COPY_DIRS.has(name)) return true;
  if (ALLOWED_ROOT_EXTENSIONS.has(ext)) return true;

  return false;
}

function build() {
  console.log("Building LAVAL static site into dist/ ...");

  removeDir(OUT_DIR);
  ensureDir(OUT_DIR);

  const entries = fs.readdirSync(ROOT, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(ROOT, entry.name);
    const destPath = path.join(OUT_DIR, entry.name);

    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;

      if (ALWAYS_COPY_DIRS.has(entry.name)) {
        copyDir(srcPath, destPath);
      }

      continue;
    }

    if (entry.isFile()) {
      if (shouldCopyRootFile(entry.name, srcPath)) {
        copyFile(srcPath, destPath);
      }
    }
  }

  const requiredFiles = [
    "index.html",
    "configurator/index.html",
    "configurator/styles.css",
    "configurator/app.js",
    "configurator/data/options.js"
  ];

  const missing = requiredFiles.filter((file) => {
    return !fs.existsSync(path.join(OUT_DIR, file));
  });

  if (missing.length > 0) {
    console.error("Build failed. Missing required deploy files:");
    for (const file of missing) {
      console.error(`- ${file}`);
    }
    process.exit(1);
  }

  console.log("Build complete. Static deploy folder created at dist/.");
}

build();

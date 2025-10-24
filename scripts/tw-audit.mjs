import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd(), "src");
const IGNORE_DIRS = new Set(["node_modules", "dist", "build", ".vite", ".next", ".git"]);

const FILE_RE = /\.(tsx?|jsx?|css|mdx|html)$/i;
const TAILWIND_CLASS_RE =
  /\b(?:from|via|to|bg|text|border|ring|outline|fill|stroke|divide|placeholder|ring-offset)-[a-z0-9-/]+/gi;

// Patterns to flag
const PATS = {
  v3Opacity:
    /\b(?:ring|bg|text|divide|border|placeholder|ring-offset)-opacity-\d{1,3}\b/g,
  badResize: /\bresize-vertical\b/g,
};

const results = [];
let moduleCssNeedsReference = [];

function read(file) {
  try { return fs.readFileSync(file, "utf8"); } catch { return null; }
}

function pushMatches(file, name, content, re) {
  const m = content.match(re);
  if (m && m.length) {
    results.push({ file, type: name, samples: [...new Set(m)].slice(0, 6) });
  }
}

function scanFile(file) {
  const content = read(file);
  if (!content) return;

  // Check module CSS for missing @reference if Tailwind classes present
  if (/\.module\.css$/i.test(file)) {
    const usesTw = TAILWIND_CLASS_RE.test(content);
    const hasRef = /@reference\s+["']tailwindcss["']\s*;?/.test(content);
    if (usesTw && !hasRef) {
      moduleCssNeedsReference.push(file);
    }
  }

  // Flag patterns
  pushMatches(file, "V3 opacity utilities", content, PATS.v3Opacity);
  pushMatches(file, "Invalid resize", content, PATS.badResize);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && FILE_RE.test(entry.name)) scanFile(p);
  }
}

function checkIndexCss() {
  const idx = path.join(ROOT, "index.css");
  const css = read(idx);
  if (!css) return;
  if (!/@import\s+["']tailwindcss["']\s*;?/.test(css)) {
    results.push({ file: idx, type: "Missing import", samples: ['Add: @import "tailwindcss";'] });
  }
}

(function main() {
  if (!fs.existsSync(ROOT)) {
    console.error(`No src/ directory found at ${ROOT}`);
    process.exit(1);
  }

  walk(ROOT);
  checkIndexCss();

  if (results.length === 0 && moduleCssNeedsReference.length === 0) {
    console.log("✅ No Tailwind v4 issues found.");
    process.exit(0);
  }

  console.log("Found potential issues:");
  for (const r of results) {
    console.log(`- ${r.file}\n  • ${r.type}: ${r.samples.join(", ")}`);
  }

  if (moduleCssNeedsReference.length) {
    console.log("\nCSS Modules missing @reference \"tailwindcss\":");
    for (const f of moduleCssNeedsReference) console.log(`- ${f}`);
    console.log('  Fix: add `@reference "tailwindcss";` at the top of those files.');
  }

  process.exit(1);
})();
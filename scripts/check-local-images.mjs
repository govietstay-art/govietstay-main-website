import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

// Fast, dependency-free check for local images referenced by pages and components.
// It prevents a missing gallery item from silently rendering as a broken image.
const root = process.cwd();
const codeDirectories = ["app", "components", "lib"];
const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const imageReference = /["'`](\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp|avif))["'`]/g;
const missing = [];
let referencesChecked = 0;

function inspectDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      inspectDirectory(filename);
      continue;
    }
    if (!entry.isFile() || !codeExtensions.has(path.extname(entry.name))) continue;

    const source = readFileSync(filename, "utf8");
    for (const match of source.matchAll(imageReference)) {
      const publicPath = match[1];
      referencesChecked += 1;
      if (!existsSync(path.join(root, "public", publicPath.slice(1)))) {
        missing.push(`${path.relative(root, filename)} → ${publicPath}`);
      }
    }
  }
}

for (const directory of codeDirectories) {
  inspectDirectory(path.join(root, directory));
}

if (missing.length > 0) {
  console.error(`Found ${missing.length} broken local-image references:`);
  for (const entry of missing) console.error(`  ${entry}`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${referencesChecked} local-image references — all files exist.`);
}

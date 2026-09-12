import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const BASE = "https://www.govietstay.com";
const ENDPOINT = "https://yandex.com/indexnow";
const ROOT = process.cwd();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getKey() {
  const publicDir = path.join(ROOT, "public");
  const files = fs
    .readdirSync(publicDir)
    .filter((name) => /^gvs-indexnow-[A-Za-z0-9-]+\.txt$/.test(name))
    .sort();

  if (!files.length) throw new Error("IndexNow key file not found in /public.");

  const file = files.at(-1);
  const key = fs.readFileSync(path.join(publicDir, file), "utf8").trim();

  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error("Invalid IndexNow key format.");
  }
  if (file !== `${key}.txt`) {
    throw new Error("IndexNow key filename must match the key value.");
  }
  return key;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

async function getSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Cannot load sitemap.xml: HTTP ${res.status}`);

  const xml = await res.text();
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((m) => decodeXml(m[1].trim()))
    .filter((u) => {
      try {
        return new URL(u).host === new URL(BASE).host;
      } catch {
        return false;
      }
    });
}

function priorityPhuQuoc(urls) {
  return urls
    .filter((u) => {
      const p = new URL(u).pathname.toLowerCase();
      return (
        p.includes("phu-quoc") ||
        p.includes("phuquoc") ||
        p.startsWith("/ru/phu-quoc/") ||
        p === "/ru/tours/phu-quoc"
      );
    })
    .slice(0, 100);
}

function routeFromPageFile(file) {
  const normalized = file.replaceAll("\\", "/");
  if (!normalized.startsWith("app/")) return null;
  if (!/(^|\/)page\.(tsx|ts|jsx|js)$/.test(normalized)) return null;

  let route = normalized
    .slice(4)
    .replace(/(^|\/)page\.(tsx|ts|jsx|js)$/, "");

  const parts = route.split("/").filter(Boolean);
  if (parts.some((p) => p.includes("[") || p.includes("]"))) return null;

  route = parts
    .filter((p) => !(p.startsWith("(") && p.endsWith(")")))
    .join("/");

  return route ? `${BASE}/${route}` : `${BASE}/`;
}

function changedFiles(before, after) {
  let from = before;
  if (!from || /^0+$/.test(from)) from = `${after}^`;

  try {
    const out = execFileSync("git", ["diff", "--name-only", from, after], {
      encoding: "utf8",
    });
    return out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  } catch {
    const out = execFileSync("git", ["show", "--pretty=", "--name-only", after], {
      encoding: "utf8",
    });
    return out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  }
}

async function urlsFromChanges(before, after) {
  const files = changedFiles(before, after);
  const urls = new Set();

  for (const file of files) {
    const route = routeFromPageFile(file);
    if (route) urls.add(route);
  }

  const sharedPhuQuocChange = files.some((f) =>
    /(^components\/.*phu.?quoc|^components\/phu-quoc-guide\/|^app\/sitemap\.ts$)/i.test(
      f.replaceAll("\\", "/"),
    ),
  );

  if (sharedPhuQuocChange) {
    const sitemap = await getSitemapUrls();
    for (const u of priorityPhuQuoc(sitemap)) urls.add(u);
  }

  return [...urls];
}

async function waitForKey(key) {
  const url = `${BASE}/${key}.txt`;

  for (let attempt = 1; attempt <= 24; attempt++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const text = res.ok ? (await res.text()).trim() : "";
      if (res.ok && text === key) {
        console.log(`[OK] IndexNow key is live: ${url}`);
        return;
      }
      console.log(`[WAIT ${attempt}/24] Key not live yet: HTTP ${res.status}`);
    } catch (error) {
      console.log(`[WAIT ${attempt}/24] ${error.message}`);
    }
    await sleep(15000);
  }

  throw new Error(
    "IndexNow key did not become live on production within 6 minutes.",
  );
}

async function postBatch(key, urls) {
  const unique = [...new Set(urls)].filter(Boolean);
  if (!unique.length) {
    console.log("[INFO] No changed page URLs to submit.");
    return;
  }

  console.log(`[INFO] Submitting ${unique.length} URL(s) to Yandex IndexNow...`);

  for (let i = 0; i < unique.length; i += 200) {
    const urlList = unique.slice(i, i + 200);
    const payload = {
      host: new URL(BASE).host,
      key,
      keyLocation: `${BASE}/${key}.txt`,
      urlList,
    };

    let accepted = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const body = await res.text();

      if (res.status === 200) {
        console.log(`[OK] Yandex accepted batch ${i / 200 + 1}: HTTP 200`);
        accepted = true;
        break;
      }

      if (res.status === 202) {
        console.log(
          `[INFO] Yandex accepted key verification: HTTP 202. Retrying shortly...`,
        );
        await sleep(30000);
        continue;
      }

      throw new Error(
        `Yandex IndexNow failed: HTTP ${res.status}${body ? ` - ${body}` : ""}`,
      );
    }

    if (!accepted) {
      console.log(
        "[INFO] Yandex still returns HTTP 202. The key is queued for verification.",
      );
    }
  }
}

async function main() {
  const key = getKey();
  const args = process.argv.slice(2);

  let urls = [];

  if (args[0] === "--bootstrap") {
    console.log("[MODE] Bootstrap Phu Quoc priority pages");
    const sitemap = await getSitemapUrls();
    urls = priorityPhuQuoc(sitemap);
  } else if (args[0] === "--changed") {
    console.log("[MODE] Changed pages only");
    const before = args[1] || process.env.INDEXNOW_BEFORE;
    const after = args[2] || process.env.INDEXNOW_AFTER || "HEAD";
    urls = await urlsFromChanges(before, after);
  } else {
    console.log(
      "Usage: node scripts/indexnow-submit.mjs --bootstrap | --changed <before> <after>",
    );
    process.exit(0);
  }

  if (!urls.length) {
    console.log("[INFO] Nothing to submit.");
    return;
  }

  await waitForKey(key);
  await postBatch(key, urls);
}

main().catch((error) => {
  console.error(`[ERROR] ${error.message}`);
  process.exit(1);
});
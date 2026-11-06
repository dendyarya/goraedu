// Makes a 1600x900 lead image for a news post: our own title card ("Own work"), never a photo from another site.
// Usage: node scripts/news-card.mjs --out public/news/<slug>.png --topic "CDL" --tag "Final rule" \
//          --title "Line one|Line two|Line three" --source "Federal Register" --date "Nov 6, 2026"
// The last line of --title is shown in the accent colour. Needs Playwright (preinstalled in the build container).
import fs from "node:fs";
import { createRequire } from "node:module";

// CommonJS resolution so a globally installed Playwright (NODE_PATH) is found too.
const { chromium } = createRequire(import.meta.url)("playwright");

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const out = arg("out");
const lines = arg("title", "")
  .split("|")
  .map((l) => esc(l.trim()))
  .filter(Boolean);
if (!out || !/^public\/news\/[a-z0-9-]+\.png$/.test(out) || lines.length === 0) {
  console.error("Need --out public/news/<lowercase-slug>.png and --title");
  process.exit(1);
}
const topic = esc(arg("topic", "News"));
const tag = esc(arg("tag", "Rule news"));
const source = esc(arg("source", ""));
const date = esc(arg("date", ""));
const size = lines.join("").length > 60 ? 76 : 92;
const title = lines.map((l, i) => (i === lines.length - 1 && lines.length > 1 ? `<span class="b">${l}</span>` : l));

const font = (f) => fs.readFileSync(new URL(`../app/fonts/${f}`, import.meta.url)).toString("base64");
const html = `<!doctype html><html><head><style>
@font-face{font-family:SG;src:url(data:font/woff2;base64,${font("space-grotesk-variable.woff2")}) format('woff2');font-weight:300 700}
@font-face{font-family:MR;src:url(data:font/woff2;base64,${font("manrope-variable.woff2")}) format('woff2');font-weight:200 800}
body{margin:0;width:1600px;height:900px;background:#f3f8fe;font-family:MR;color:#0e1b2c;overflow:hidden;position:relative;font-variant-ligatures:no-common-ligatures}
.ring{position:absolute;right:-140px;top:90px;width:760px;height:760px;border-radius:50%;border:56px solid #f5b82e;border-top-color:#2e90fa;border-left-color:#2e90fa;transform:rotate(-20deg);box-sizing:border-box}
.dash{position:absolute;right:-30px;top:200px;width:540px;height:540px;border-radius:50%;border:4px dashed #bcd6f5;box-sizing:border-box}
.wrap{position:absolute;left:110px;top:110px;width:920px}
.pill{display:inline-block;padding:10px 26px;border-radius:999px;font-weight:800;font-size:30px}
h1{font-family:SG;font-weight:700;font-size:${size}px;line-height:1.04;letter-spacing:-0.03em;margin:44px 0 0}
.b{color:#1673e0}
.foot{position:absolute;left:110px;bottom:90px;font-size:30px;font-weight:700;color:#44566d}
.card{position:absolute;right:150px;top:330px;max-width:420px;background:#fff;border:2px solid #dbe8f8;border-radius:40px;padding:36px 44px;font-family:SG;font-weight:700}
</style></head><body>
<div class="ring"></div><div class="dash"></div>
${source || date ? `<div class="card"><div style="font-family:MR;font-size:26px;color:#44566d;font-weight:700">${source}</div><div style="font-size:56px;margin-top:6px">${date}</div></div>` : ""}
<div class="wrap">
  <span class="pill" style="background:#e7f1fd;color:#1166d4">${topic}</span>
  <span class="pill" style="background:#0e1b2c;color:#fff;margin-left:12px">${tag}</span>
  <h1>${title.join("<br>")}</h1>
</div>
<div class="foot">goraedu.com · News</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent(html);
await page.waitForTimeout(300);
await page.screenshot({ path: out });
await browser.close();
console.log("wrote", out);

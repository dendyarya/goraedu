import fs from "node:fs";
import path from "node:path";

// Study guides live in content/guides/<cluster>/<section>.json. Every point carries its source and the exact words
// that support it. Quotes from the eCFR are checked at build time against the dated text snapshot in data/sources,
// so a guide cannot be published with a quote the regulation does not contain.

export type GuidePoint = {
  text: string;
  quote: string;
  source: { title: string; url: string };
  checked: string;
};

export type GuideTopic = { id: string; name: string; points: GuidePoint[]; notCovered?: string };

export type Guide = {
  cluster: string;
  slug: string;
  title: string;
  description: string;
  intro: string;
  topics: GuideTopic[];
  href: string;
};

const ROOT = path.join(process.cwd(), "content", "guides");
const SNAPSHOTS: Record<string, string> = {
  "epa-608": path.join(process.cwd(), "data", "sources", "ecfr", "40cfr82-subpartF-2026-11-03.txt"),
};
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const norm = (s: string) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/- /g, "-")
    .trim()
    .toLowerCase();

/** Drops the running page headers and footers the eCFR PDF export puts between lines of rule text. */
function stripPageChrome(text: string): string {
  return text
    .split("\n")
    .filter(
      (l) =>
        !/^\s*Recycling and Emissions Reduction\s*$/.test(l) &&
        !/^\s*40 CFR Part 82 Subpart F \(up to date/.test(l) &&
        !/^\s{20,}40 CFR 82\.\S+\s*$/.test(l),
    )
    .join("\n");
}

function validate(file: string, raw: unknown, snapshot: string | null): Guide {
  const fail = (msg: string): never => {
    throw new Error(`content/guides/${file}: ${msg}`);
  };
  const g = raw as Partial<Guide>;
  for (const k of ["cluster", "slug", "title", "description", "intro"] as const) {
    if (typeof g[k] !== "string" || !g[k]) fail(`${k} is required`);
  }
  if (!Array.isArray(g.topics) || g.topics.length === 0) fail("topics must be a non-empty list");
  const ids = new Set<string>();
  for (const t of g.topics!) {
    if (!t.id || ids.has(t.id)) fail(`topic id ${t.id} missing or repeated`);
    ids.add(t.id);
    if (!t.name) fail(`topic ${t.id}: name is required`);
    if (!Array.isArray(t.points)) fail(`topic ${t.id}: points must be a list`);
    if (t.points.length === 0 && !t.notCovered) fail(`topic ${t.id}: needs points or a notCovered note`);
    t.points.forEach((p, i) => {
      const at = `topic ${t.id} point ${i + 1}`;
      if (!p.text?.trim()) fail(`${at}: text is required`);
      if (!DATE.test(p.checked ?? "")) fail(`${at}: checked must be YYYY-MM-DD`);
      if (!p.source?.title || !/^https:\/\//.test(p.source?.url ?? "")) fail(`${at}: source needs a title and URL`);
      if (p.source.url.includes("ecfr.gov")) {
        if (!p.quote?.trim()) fail(`${at}: eCFR points need a quote`);
        if (snapshot && !snapshot.includes(norm(p.quote))) fail(`${at}: quote not found in the eCFR snapshot`);
      }
    });
  }
  return { ...(g as Guide), href: `/${g.cluster}/${g.slug}/study-guide/` };
}

let cache: Guide[] | null = null;

export function getAllGuides(): Guide[] {
  if (cache) return cache;
  const out: Guide[] = [];
  if (fs.existsSync(ROOT)) {
    for (const cluster of fs.readdirSync(ROOT)) {
      const dir = path.join(ROOT, cluster);
      if (!fs.statSync(dir).isDirectory()) continue;
      const snapFile = SNAPSHOTS[cluster];
      const snap =
        snapFile && fs.existsSync(snapFile) ? norm(stripPageChrome(fs.readFileSync(snapFile, "utf8"))) : null;
      // files starting with "_" are drafts and never published
      for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json") && !x.startsWith("_"))) {
        out.push(validate(`${cluster}/${f}`, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")), snap));
      }
    }
  }
  cache = out;
  return out;
}

export function guideChecked(g: Guide): string {
  return g.topics
    .flatMap((t) => t.points.map((p) => p.checked))
    .sort()
    .at(-1)!;
}

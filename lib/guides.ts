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
  /** Topic pages only: a short direct answer, every claim of which is also a quoted point. */
  summary?: string;
  topics: GuideTopic[];
  href: string;
};

const SOURCES_DIR = path.join(process.cwd(), "data", "sources");
const ECFR_DIR = path.join(SOURCES_DIR, "ecfr");
// Official sources whose quotes are checked: eCFR rule text and, for FAA Part 107, FAA's own publications.
const CHECKED_HOSTS = ["ecfr.gov", "faa.gov"];
// Dated rule text each cluster's quotes are checked against. Subpart G (SNAP) has wide tables, so it is kept twice:
// as laid out on the page and in reading order (one table cell after another); a quote may match either copy.
const SNAPSHOTS: Record<string, string[]> = {
  "epa-608": ["40cfr82-subpartF-2026-11-03.txt"],
  osha: [
    "29cfr1926-subpartC-2026-11-03.txt",
    "29cfr1926-subpartE-2026-11-03.txt",
    "29cfr1926-subpartK-2026-11-03.txt",
    "29cfr1926-subpartL-2026-11-03.txt",
    "29cfr1926-subpartM-2026-11-03.txt",
    "29cfr1926-subpartP-2026-11-03.txt",
    "29cfr1926-subpartX-2026-11-03.txt",
    "29cfr1926-subpartC-2026-11-03.reading-order.txt",
    "29cfr1926-subpartE-2026-11-03.reading-order.txt",
    "29cfr1926-subpartK-2026-11-03.reading-order.txt",
    "29cfr1926-subpartL-2026-11-03.reading-order.txt",
    "29cfr1926-subpartM-2026-11-03.reading-order.txt",
    "29cfr1926-subpartP-2026-11-03.reading-order.txt",
    "29cfr1926-subpartX-2026-11-03.reading-order.txt",
    "29cfr1903-2026-11-03.txt",
    "29cfr1903-2026-11-03.reading-order.txt",
    "29cfr1904-2026-11-03.txt",
    "29cfr1904-2026-11-03.reading-order.txt",
    "29cfr1926-subpartD-2026-11-03.txt",
    "29cfr1926-subpartD-2026-11-03.reading-order.txt",
    "29cfr1926-1153-2026-11-03.txt",
    "29cfr1926-1153-2026-11-03.reading-order.txt",
    "29cfr1910-1200-2026-11-03.txt",
    "29cfr1910-1200-2026-11-03.reading-order.txt",
  ],
  "osha-general-industry": [
    "29cfr1910-subpartD-2026-11-03.txt",
    "29cfr1910-subpartD-2026-11-03.reading-order.txt",
    "29cfr1910-subpartE-2026-11-03.txt",
    "29cfr1910-subpartE-2026-11-03.reading-order.txt",
    "29cfr1910-subpartI-2026-11-03.txt",
    "29cfr1910-subpartI-2026-11-03.reading-order.txt",
    "29cfr1910-subpartL-2026-11-03.txt",
    "29cfr1910-subpartL-2026-11-03.reading-order.txt",
    "29cfr1910-subpartO-2026-11-03.txt",
    "29cfr1910-subpartO-2026-11-03.reading-order.txt",
    "29cfr1910-subpartS-2026-11-03.txt",
    "29cfr1910-subpartS-2026-11-03.reading-order.txt",
    "29cfr1910-147-2026-11-03.txt",
    "29cfr1910-147-2026-11-03.reading-order.txt",
    "29cfr1910-178-2026-11-03.txt",
    "29cfr1910-178-2026-11-03.reading-order.txt",
    "29cfr1910-95-2026-11-03.txt",
    "29cfr1910-95-2026-11-03.reading-order.txt",
    "29cfr1910-1030-2026-11-03.txt",
    "29cfr1910-1030-2026-11-03.reading-order.txt",
    "29cfr1910-1200-2026-11-03.txt",
    "29cfr1910-1200-2026-11-03.reading-order.txt",
    "29cfr1903-2026-11-03.txt",
    "29cfr1903-2026-11-03.reading-order.txt",
    "29cfr1904-2026-11-03.txt",
    "29cfr1904-2026-11-03.reading-order.txt",
    "29cfr1910-101-2026-11-03.txt",
    "29cfr1910-101-2026-11-03.reading-order.txt",
    "29cfr1910-106-2026-11-03.txt",
    "29cfr1910-106-2026-11-03.reading-order.txt",
    "29cfr1910-subpartN-2026-11-03.txt",
    "29cfr1910-subpartN-2026-11-03.reading-order.txt",
    "29cfr1910-subpartQ-2026-11-03.txt",
    "29cfr1910-subpartQ-2026-11-03.reading-order.txt",
    "29cfr1910-146-2026-11-03.txt",
    "29cfr1910-146-2026-11-03.reading-order.txt",
  ],
  cdl: [
    "49cfr383-2026-11-03.txt",
    "49cfr383-2026-11-03.reading-order.txt",
    "49cfr391-2026-11-03.txt",
    "49cfr391-2026-11-03.reading-order.txt",
    "49cfr392-2026-11-03.txt",
    "49cfr392-2026-11-03.reading-order.txt",
    "49cfr395-2026-11-03.txt",
    "49cfr395-2026-11-03.reading-order.txt",
    "49cfr396-2026-11-03.txt",
    "49cfr396-2026-11-03.reading-order.txt",
    "49cfr382-2026-11-03.txt",
    "49cfr382-2026-11-03.reading-order.txt",
    "49cfr393-subpartC-2026-11-03.txt",
    "49cfr393-subpartC-2026-11-03.reading-order.txt",
    "49cfr393-subpartI-2026-11-03.txt",
    "49cfr393-subpartI-2026-11-03.reading-order.txt",
    "49cfr171-8-2026-11-04.txt",
    "49cfr171-8-2026-11-04.reading-order.txt",
    "49cfr173-2-2026-11-04.txt",
    "49cfr173-2-2026-11-04.reading-order.txt",
    "49cfr172-subpartC-2026-11-04.txt",
    "49cfr172-subpartC-2026-11-04.reading-order.txt",
    "49cfr172-subpartD-2026-11-04.txt",
    "49cfr172-subpartD-2026-11-04.reading-order.txt",
    "49cfr172-subpartF-2026-11-04.txt",
    "49cfr172-subpartF-2026-11-04.reading-order.txt",
    "49cfr172-subpartG-2026-11-04.txt",
    "49cfr172-subpartG-2026-11-04.reading-order.txt",
    "49cfr172-subpartH-2026-11-04.txt",
    "49cfr172-subpartH-2026-11-04.reading-order.txt",
    "49cfr177-2026-11-04.txt",
    "49cfr177-2026-11-04.reading-order.txt",
    "49cfr397-2026-11-04.txt",
    "49cfr397-2026-11-04.reading-order.txt",
  ],
  "faa-107": [
    "14cfr107-2026-11-03.txt",
    "14cfr107-2026-11-03.reading-order.txt",
    "14cfr89-2026-11-03.txt",
    "14cfr89-2026-11-03.reading-order.txt",
    "14cfr48-2026-11-03.txt",
    "14cfr48-2026-11-03.reading-order.txt",
    "faa/uas-acs.txt",
    "faa/uas-acs.reading-order.txt",
    "faa/remote-pilot-study-guide.txt",
    "faa/remote-pilot-study-guide.reading-order.txt",
  ],
  "water-operator": [
    "40cfr141-subpartA-2026-11-03.txt",
    "40cfr141-subpartA-2026-11-03.reading-order.txt",
    "40cfr141-subpartG-2026-11-03.txt",
    "40cfr141-subpartG-2026-11-03.reading-order.txt",
    "40cfr141-subpartH-2026-11-03.txt",
    "40cfr141-subpartH-2026-11-03.reading-order.txt",
    "40cfr141-subpartI-2026-11-03.txt",
    "40cfr141-subpartI-2026-11-03.reading-order.txt",
    "40cfr141-subpartY-2026-11-03.txt",
    "40cfr141-subpartY-2026-11-03.reading-order.txt",
    "40cfr141-subpartQ-2026-11-03.txt",
    "40cfr141-subpartQ-2026-11-03.reading-order.txt",
    "40cfr141-subpartL-2026-11-04.txt",
    "40cfr141-subpartL-2026-11-04.reading-order.txt",
    "40cfr143-2026-11-04.txt",
    "40cfr143-2026-11-04.reading-order.txt",
  ],
  "wastewater-operator": [
    "40cfr133-2026-11-04.txt",
    "40cfr133-2026-11-04.reading-order.txt",
    "40cfr122-2-2026-11-04.txt",
    "40cfr122-2-2026-11-04.reading-order.txt",
    "40cfr122-41-2026-11-04.txt",
    "40cfr122-41-2026-11-04.reading-order.txt",
    "40cfr122-subpartC-2026-11-04.txt",
    "40cfr122-subpartC-2026-11-04.reading-order.txt",
    "40cfr136-1-2026-11-04.txt",
    "40cfr136-1-2026-11-04.reading-order.txt",
    "40cfr136-2-2026-11-04.txt",
    "40cfr136-2-2026-11-04.reading-order.txt",
    "40cfr136-3-2026-11-04.txt",
    "40cfr136-3-2026-11-04.reading-order.txt",
    "40cfr403-2026-11-04.txt",
    "40cfr403-2026-11-04.reading-order.txt",
    "40cfr503-2026-11-04.txt",
    "40cfr503-2026-11-04.reading-order.txt",
  ],
  "lead-rrp": [
    "40cfr745-subpartE-2026-11-04.txt",
    "40cfr745-subpartE-2026-11-04.reading-order.txt",
    "40cfr745-subpartL-2026-11-04.txt",
    "40cfr745-subpartL-2026-11-04.reading-order.txt",
    "40cfr745-subpartD-2026-11-04.txt",
    "40cfr745-subpartD-2026-11-04.reading-order.txt",
    "40cfr745-103-2026-11-04.txt",
    "40cfr745-103-2026-11-04.reading-order.txt",
  ],
  "pesticide-applicator": ["40cfr171-2026-11-04.txt"],
  asbestos: [
    "29cfr1926-1101-2026-11-04.txt",
    "29cfr1926-1101-2026-11-04.reading-order.txt",
    "40cfr763-subpartE-2026-11-04.txt",
    "40cfr763-subpartE-2026-11-04.reading-order.txt",
  ],
  "faa-amt": [
    "14cfr65-subpartD-2026-11-04.txt",
    "14cfr65-subpartD-2026-11-04.reading-order.txt",
    "14cfr43-2026-11-04.txt",
    "14cfr43-2026-11-04.reading-order.txt",
  ],
  forklift: [
    "29cfr1910-178-2026-11-04.txt",
    "29cfr1910-178-2026-11-04.reading-order.txt",
    "29cfr1926-602-2026-11-04.txt",
    "29cfr1926-602-2026-11-04.reading-order.txt",
  ],
  "osha-crane": [
    "29cfr1926-1401-2026-11-04.txt",
    "29cfr1926-1401-2026-11-04.reading-order.txt",
    "29cfr1926-1408-2026-11-04.txt",
    "29cfr1926-1408-2026-11-04.reading-order.txt",
    "29cfr1926-1412-2026-11-04.txt",
    "29cfr1926-1412-2026-11-04.reading-order.txt",
    "29cfr1926-1417-2026-11-04.txt",
    "29cfr1926-1417-2026-11-04.reading-order.txt",
    "29cfr1926-1419-2026-11-04.txt",
    "29cfr1926-1419-2026-11-04.reading-order.txt",
    "29cfr1926-1424-2026-11-04.txt",
    "29cfr1926-1424-2026-11-04.reading-order.txt",
    "29cfr1926-1427-2026-11-04.txt",
    "29cfr1926-1427-2026-11-04.reading-order.txt",
    "29cfr1926-1428-2026-11-04.txt",
    "29cfr1926-1428-2026-11-04.reading-order.txt",
    "29cfr1926-1431-2026-11-04.txt",
    "29cfr1926-1431-2026-11-04.reading-order.txt",
  ],
  "epa-609": [
    "40cfr82-subpartB-2026-11-03.txt",
    "40cfr82-subpartG-2026-11-03.txt",
    "40cfr82-subpartG-2026-11-03.reading-order.txt",
  ],
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
// Running page titles the eCFR PDF export repeats on every page (one per subpart we keep).
const PAGE_TITLES = [
  "Recycling and Emissions Reduction",
  "Servicing of Motor Vehicle Air Conditioners",
  "Significant New Alternatives Policy Program",
  "General Safety and Health Provisions",
  "Personal Protective and Life Saving Equipment",
  "Electrical",
  "Scaffolds",
  "Fall Protection",
  "Excavations",
  "Stairways and Ladders",
  "Inspections, Citations and Proposed Penalties",
  "Recording and Reporting Occupational Injuries and Illnesses",
  "Occupational Health and Environmental Controls",
  "Hazard communication.",
  "Respirable crystalline silica.",
  "Walking-Working Surfaces",
  "Exit Routes and Emergency Planning",
  "Personal Protective Equipment",
  "Fire Protection",
  "Machinery and Machine Guarding",
  "Bloodborne pathogens.",
  "The control of hazardous energy (lockout/tagout).",
  "Powered industrial trucks.",
  "Occupational noise exposure.",
  "Compressed gases (general requirements).",
  "Flammable liquids.",
  "Materials Handling and Storage",
  "Welding, Cutting and Brazing",
  "Permit-required confined spaces.",
  "Controlled Substances and Alcohol Use and Testing",
  "Commercial Driver's License Standards; Requirements and Penalties",
  "Qualifications of Drivers and Longer Combination Vehicle (LCV) Driver...",
  "Driving of Commercial Motor Vehicles",
  "Brakes",
  "Protection Against Shifting and Falling Cargo",
  "Hours of Service of Drivers",
  "Inspection, Repair, and Maintenance",
  "Small Unmanned Aircraft Systems",
  "Registration and Marking Requirements for Small Unmanned Aircraft",
  "Remote Identification of Unmanned Aircraft",
  "General",
  "National Primary Drinking Water Regulations: Maximum Contaminant Levels...",
  "Filtration and Disinfection",
  "Control of Lead and Copper",
  "Disinfectant Residuals, Disinfection Byproducts, and Disinfection...",
  "Public Notification of Drinking Water Violations",
  "Revised Total Coliform Rule",
  "Other Safe Drinking Water Act Regulations",
  "Definitions.",
  "Conditions applicable to all permits (applicable to State programs, see...",
  "Permit Conditions",
  "Secondary Treatment Regulation",
  "Applicability.",
  "Identification of test procedures.",
  "General Pretreatment Regulations for Existing and New Sources of Pollution",
  "Standards for the Use or Disposal of Sewage Sludge",
  "Definitions and abbreviations.",
  "Shipping Papers",
  "Marking",
  "Placarding",
  "Emergency Response Information",
  "Training",
  "Hazardous material classes and index to hazard class definitions.",
  "Carriage by Public Highway",
  "Transportation of Hazardous Materials; Driving and Parking Rules",
  "Lead-Based Paint Hazards",
  "Residential Property Renovation",
  "Lead-Based Paint Activities",
  "Power line safety (up to 350 kV)—equipment operations.",
  "Inspections.",
  "Operation.",
  "Signals—general requirements.",
  "Work area control.",
  "Operator training, certification, and evaluation.",
  "Hoisting personnel.",
  "Signal person qualifications.",
  "Material handling equipment.",
  "Mechanics",
  "Asbestos.",
  "Asbestos-Containing Materials in Schools",
  "Maintenance, Preventive Maintenance, Rebuilding, and Alteration",
];

function stripPageChrome(text: string): string {
  return text
    .split("\n")
    .filter((l) => {
      const t = l.trim();
      return !(
        PAGE_TITLES.includes(t) ||
        /^\d+ CFR (Part \d+( Subpart [A-Z])?|[\d.]+) \(up to date/.test(t) ||
        /^\d+ CFR [\d.]+[\d()a-zA-Z]*$/.test(t) ||
        /^\d+ CFR [\d.]+-[\d.]+$/.test(t) ||
        /^\d+ CFR [\d.]+ \([A-Z][a-z]+\.? \d+, \d{4}\)$/.test(t) ||
        /^\d+ CFR Appendix-\S+( \S+)?$/.test(t) ||
        /^\d+ CFR [\d.]+ “[^”]+”$/.test(t) ||
        /^\d+ CFR [\d.]+(\([^)]*\))+ “[^”]+”$/.test(t) ||
        /^\d+ CFR Part \d+( Subpart [A-Z])? \([A-Z][a-z]+\.? \d+, \d{4}\)$/.test(t) ||
        /^page \d+ of \d+$/.test(t) ||
        /\(enhanced display\)(\s+page \d+ of \d+)?$/.test(t) ||
        /^\s{20,}\d+ CFR \S/.test(l) ||
        /\S\s{15,}(\d+ CFR |Part-\d+\()\S*\s*$/.test(l)
      );
    })
    .join("\n");
}

function validate(file: string, raw: unknown, snapshot: string | null, kind: "guides" | "topics"): Guide {
  const fail = (msg: string): never => {
    throw new Error(`content/${kind}/${file}: ${msg}`);
  };
  const g = raw as Partial<Guide>;
  for (const k of ["cluster", "slug", "title", "description", "intro"] as const) {
    if (typeof g[k] !== "string" || !g[k]) fail(`${k} is required`);
  }
  if (kind === "topics" && (typeof g.summary !== "string" || !g.summary)) fail("summary is required");
  if (!Array.isArray(g.topics) || g.topics.length === 0) fail("topics must be a non-empty list");
  const ids = new Set<string>();
  for (const t of g.topics!) {
    if (!t.id || ids.has(t.id)) fail(`topic id ${t.id} missing or repeated`);
    ids.add(t.id);
    if (!t.name) fail(`topic ${t.id}: name is required`);
    if (!Array.isArray(t.points)) fail(`topic ${t.id}: points must be a list`);
    // A notCovered note may be written as one string or a list of sentences; pages show it as one paragraph.
    const nc: unknown = t.notCovered;
    if (Array.isArray(nc)) {
      if (!nc.every((s) => typeof s === "string" && s)) fail(`topic ${t.id}: notCovered must be text`);
      t.notCovered = (nc as string[]).join(" ");
    } else if (nc !== undefined && typeof nc !== "string") fail(`topic ${t.id}: notCovered must be text`);
    if (t.points.length === 0 && !t.notCovered) fail(`topic ${t.id}: needs points or a notCovered note`);
    t.points.forEach((p, i) => {
      const at = `topic ${t.id} point ${i + 1}`;
      if (!p.text?.trim()) fail(`${at}: text is required`);
      if (!DATE.test(p.checked ?? "")) fail(`${at}: checked must be YYYY-MM-DD`);
      if (!p.source?.title || !/^https:\/\//.test(p.source?.url ?? "")) fail(`${at}: source needs a title and URL`);
      if (CHECKED_HOSTS.some((h) => p.source.url.includes(h))) {
        if (!p.quote?.trim()) fail(`${at}: eCFR points need a quote`);
        if (snapshot && !snapshot.includes(norm(p.quote))) fail(`${at}: quote not found in the eCFR snapshot`);
      }
    });
  }
  // A cluster with a single exam (e.g. EPA 609) sets "href" itself, e.g. /epa-609/study-guide/.
  const href =
    typeof g.href === "string" && /^\/[a-z0-9-/]+\/$/.test(g.href)
      ? g.href
      : kind === "guides"
        ? `/${g.cluster}/${g.slug}/study-guide/`
        : `/${g.cluster}/guide/${g.slug}/`;
  return { ...(g as Guide), href };
}

const snapCache: Record<string, string | null> = {};
function snapshotFor(cluster: string): string | null {
  if (!(cluster in snapCache)) {
    const files = (SNAPSHOTS[cluster] ?? [])
      .map((f) => (f.includes("/") ? path.join(SOURCES_DIR, f) : path.join(ECFR_DIR, f)))
      .filter((f) => fs.existsSync(f));
    snapCache[cluster] = files.length
      ? files.map((f) => norm(stripPageChrome(fs.readFileSync(f, "utf8")))).join("\n\u0000\n")
      : null;
  }
  return snapCache[cluster]!;
}

/** Build-time check used by tools: throws if an official quote is not in the cluster's dated snapshot. */
export function assertQuotes(cluster: string, quotes: string[]): void {
  const snap = snapshotFor(cluster);
  if (!snap) throw new Error(`no source snapshot for ${cluster}`);
  for (const q of quotes) if (!snap.includes(norm(q))) throw new Error(`quote not found in ${cluster} snapshot: ${q}`);
}

const cache: Partial<Record<"guides" | "topics", Guide[]>> = {};

function load(kind: "guides" | "topics"): Guide[] {
  if (cache[kind]) return cache[kind]!;
  const root = path.join(process.cwd(), "content", kind);
  const out: Guide[] = [];
  if (fs.existsSync(root)) {
    for (const cluster of fs.readdirSync(root)) {
      const dir = path.join(root, cluster);
      if (!fs.statSync(dir).isDirectory()) continue;
      const snap = snapshotFor(cluster);
      // files starting with "_" are drafts and never published
      for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json") && !x.startsWith("_"))) {
        out.push(validate(`${cluster}/${f}`, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")), snap, kind));
      }
    }
  }
  cache[kind] = out;
  return out;
}

/** Section study guides: content/guides/<cluster>/<section>.json, published at /<cluster>/<section>/study-guide/. */
export const getAllGuides = () => load("guides");

/** Focused topic pages: content/topics/<cluster>/<slug>.json, published at /<cluster>/guide/<slug>/. */
export const getAllTopicPages = () => load("topics");

export function guideChecked(g: Guide): string {
  return g.topics
    .flatMap((t) => t.points.map((p) => p.checked))
    .sort()
    .at(-1)!;
}

import fs from "node:fs";
import path from "node:path";

// Practice question sets live in content/questions/<cluster>/<set>.json and are validated at build time,
// so a question without a source, a check date or exactly one correct answer can never be published.

export type Choice = "A" | "B" | "C" | "D";

export type Question = {
  id: string;
  topic: string;
  question: string;
  options: Record<Choice, string>;
  answer: Choice;
  explanation: string;
  source: { title: string; url: string };
  checked: string;
};

export type QuestionSet = {
  cluster: string;
  slug: string;
  title: string;
  description: string;
  /** Page where the set is published */
  href: string;
  questions: Question[];
};

const ROOT = path.join(process.cwd(), "content", "questions");
const CHOICES: Choice[] = ["A", "B", "C", "D"];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function validate(file: string, raw: unknown): QuestionSet {
  const fail = (msg: string): never => {
    throw new Error(`content/questions/${file}: ${msg}`);
  };
  const set = raw as Partial<QuestionSet>;
  for (const k of ["cluster", "slug", "title", "description", "href"] as const) {
    if (typeof set[k] !== "string" || !set[k]) fail(`${k} is required`);
  }
  if (!Array.isArray(set.questions) || set.questions.length === 0) fail("questions must be a non-empty list");
  const ids = new Set<string>();
  set.questions!.forEach((q, i) => {
    const at = `questions[${i}] (${q?.id ?? "no id"})`;
    if (!q.id || ids.has(q.id)) fail(`${at}: id missing or repeated`);
    ids.add(q.id);
    for (const k of ["topic", "question", "explanation", "checked"] as const) {
      if (typeof q[k] !== "string" || !q[k].trim()) fail(`${at}: ${k} is required`);
    }
    if (!DATE.test(q.checked)) fail(`${at}: checked must be YYYY-MM-DD`);
    if (!q.options || CHOICES.some((c) => typeof q.options[c] !== "string" || !q.options[c].trim())) {
      fail(`${at}: options A, B, C and D are all required`);
    }
    if (new Set(CHOICES.map((c) => q.options[c].trim().toLowerCase())).size !== 4) fail(`${at}: options must differ`);
    if (!CHOICES.includes(q.answer)) fail(`${at}: answer must be A, B, C or D`);
    if (!q.source?.title || !/^https:\/\//.test(q.source?.url ?? "")) {
      fail(`${at}: source needs a title and an https URL (accuracy principle 3)`);
    }
  });
  return set as QuestionSet;
}

let cache: QuestionSet[] | null = null;

export function getAllSets(): QuestionSet[] {
  if (cache) return cache;
  const sets: QuestionSet[] = [];
  if (fs.existsSync(ROOT)) {
    for (const cluster of fs.readdirSync(ROOT)) {
      const dir = path.join(ROOT, cluster);
      if (!fs.statSync(dir).isDirectory()) continue;
      // files starting with "_" are drafts and never published
      for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json") && !x.startsWith("_"))) {
        const rel = `${cluster}/${f}`;
        sets.push(validate(rel, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))));
      }
    }
  }
  cache = sets;
  return sets;
}

export function getSet(cluster: string, slug: string): QuestionSet {
  const set = getAllSets().find((s) => s.cluster === cluster && s.slug === slug);
  if (!set) throw new Error(`question set ${cluster}/${slug} not found`);
  return set;
}

/** Latest "checked" date in a set, for the page byline. */
export function lastChecked(set: QuestionSet): string {
  return set.questions
    .map((q) => q.checked)
    .sort()
    .at(-1)!;
}

/** Display name of an EPA 608 section slug. */
export const SECTION_NAME: Record<string, string> = {
  core: "Core",
  "type-1": "Type I",
  "type-2": "Type II",
  "type-3": "Type III",
  universal: "Universal",
};

/** Distinct topics in the order they first appear. */
export function topicsOf(set: QuestionSet): string[] {
  return [...new Set(set.questions.map((q) => q.topic))];
}

/**
 * The EPA 608 Universal practice exam pools every published section set, with each question's topic set to its
 * section, so the exam can draw 25 per section the way Appendix D lays out the Universal test.
 */
export function universalPool(): { href: string; sections: string[]; questions: Question[] } {
  const order = ["core", "type-1", "type-2", "type-3"];
  const sets = order
    .map((slug) => getAllSets().find((s) => s.cluster === "epa-608" && s.slug === slug))
    .filter((s): s is QuestionSet => Boolean(s));
  return {
    href: "/epa-608/universal/practice-test/",
    sections: sets.map((s) => SECTION_NAME[s.slug]!),
    questions: sets.flatMap((s) => s.questions.map((q) => ({ ...q, topic: SECTION_NAME[s.slug]! }))),
  };
}

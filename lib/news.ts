import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// News posts live in content/news/*.md (one file per post, edited on GitHub; a push publishes it).
// Front matter is validated here so a bad post fails the build instead of shipping.

export type NewsSource = { title: string; url: string; checked: string };
export type NewsPost = {
  slug: string;
  title: string;
  /** Certification the post is about, e.g. "EPA 608" or "CDL" */
  topic: string;
  summary: string;
  published: string; // ISO date or date-time of first publication on goraedu
  updated?: string;
  sources: NewsSource[];
  body: string;
};

const DIR = path.join(process.cwd(), "content", "news");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2}))?$/;

function fail(file: string, msg: string): never {
  throw new Error(`content/news/${file}: ${msg}`);
}

function str(v: unknown): string | undefined {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function load(file: string): NewsPost | null {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  if (data.draft === true) return null;
  const slug = file.replace(/\.md$/, "");
  if (!SLUG.test(slug)) fail(file, "file name must be lowercase words joined by hyphens");
  const title = str(data.title) ?? fail(file, "title is required");
  const topic = str(data.topic) ?? fail(file, "topic is required (the certification the post is about, e.g. EPA 608)");
  const summary = str(data.summary) ?? fail(file, "summary is required");
  const published = str(data.published) ?? fail(file, "published date is required");
  if (!DATE.test(published)) fail(file, "published must be YYYY-MM-DD or an ISO date-time");
  const updated = str(data.updated);
  if (updated && !DATE.test(updated)) fail(file, "updated must be YYYY-MM-DD or an ISO date-time");
  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    fail(file, "at least one official source is required (accuracy principle 3)");
  }
  const sources = (data.sources as unknown[]).map((s, i) => {
    const o = (s ?? {}) as Record<string, unknown>;
    const t = str(o.title) ?? fail(file, `sources[${i}].title is required`);
    const url = str(o.url) ?? fail(file, `sources[${i}].url is required`);
    if (!/^https:\/\//.test(url)) fail(file, `sources[${i}].url must start with https://`);
    const checked = str(o.checked) ?? fail(file, `sources[${i}].checked date is required`);
    if (!DATE.test(checked)) fail(file, `sources[${i}].checked must be YYYY-MM-DD`);
    return { title: t, url, checked };
  });
  return { slug, title, topic, summary, published, updated, sources, body: content.trim() };
}

let cache: NewsPost[] | null = null;

/** All published posts, newest first. */
export function getAllNews(): NewsPost[] {
  if (cache) return cache;
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
  cache = files
    .map(load)
    .filter((p): p is NewsPost => p !== null)
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
  return cache;
}

export function getNews(slug: string): NewsPost | undefined {
  return getAllNews().find((p) => p.slug === slug);
}

/** "November 5, 2026" in U.S. style, independent of the build machine's time zone. */
export function formatDate(iso: string): string {
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

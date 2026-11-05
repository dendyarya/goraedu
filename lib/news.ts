import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";

// News posts live in content/news/*.md (one file per post, edited on GitHub; a push publishes it).
// Front matter is validated here so a bad post fails the build instead of shipping.

export type NewsSource = { title: string; url: string; checked: string };

/**
 * A post's lead image. Only images we may use commercially: our own work, U.S. federal government works
 * (public domain), or a license that allows commercial use. Credit and license are always shown under the image.
 */
export type NewsImage = {
  src: string; // path under public/, e.g. /news/epa-hfc-rule.jpg
  alt: string;
  credit: string; // who made it, e.g. "goraedu" or "U.S. EPA"
  license: (typeof IMAGE_LICENSES)[number];
  url?: string; // page the image came from (required unless it is our own work)
  width: number;
  height: number;
};

export const IMAGE_LICENSES = [
  "Own work",
  "Public domain (U.S. government work)",
  "CC0",
  "CC BY 4.0",
  "Unsplash License",
  "Pexels License",
] as const;
export type NewsPost = {
  slug: string;
  title: string;
  /** Certification the post is about, e.g. "EPA 608" or "CDL" */
  topic: string;
  summary: string;
  published: string; // ISO date or date-time of first publication on goraedu
  updated?: string;
  image?: NewsImage;
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
  const image = data.image ? loadImage(file, data.image) : undefined;
  return { slug, title, topic, summary, published, updated, image, sources, body: content.trim() };
}

function loadImage(file: string, raw: unknown): NewsImage {
  const o = (raw ?? {}) as Record<string, unknown>;
  const src = str(o.src) ?? fail(file, "image.src is required, e.g. /news/my-post.jpg");
  if (!/^\/news\/[a-z0-9-]+\.(jpe?g|png|webp)$/.test(src)) {
    fail(file, "image.src must be /news/<lowercase-name>.jpg, .png or .webp (the file goes in public/news/)");
  }
  const onDisk = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(onDisk)) fail(file, `image file public${src} not found`);
  const alt = str(o.alt) ?? fail(file, "image.alt is required: describe the image for people who cannot see it");
  const credit = str(o.credit) ?? fail(file, "image.credit is required: who made the image");
  const license = str(o.license) as NewsImage["license"] | undefined;
  if (!license || !IMAGE_LICENSES.includes(license)) {
    fail(file, `image.license must be one of: ${IMAGE_LICENSES.join("; ")}`);
  }
  const url = str(o.url);
  if (license !== "Own work" && !url) fail(file, "image.url is required: the page the image came from");
  if (url && !/^https:\/\//.test(url)) fail(file, "image.url must start with https://");
  const { width, height } = imageSize(fs.readFileSync(onDisk));
  if (!width || !height) fail(file, "image could not be read");
  // Google recommends large images (at least 1200 px wide) for news and Discover.
  if (width < 1200) fail(file, `image is ${width}px wide; use one at least 1200px wide`);
  return { src, alt, credit, license, url, width, height };
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

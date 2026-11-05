import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Trust and legal pages live in content/pages/<slug>.md and are served at /<slug>/.
export type SitePage = { slug: string; title: string; description: string; updated: string; body: string };

const DIR = path.join(process.cwd(), "content", "pages");

function load(file: string): SitePage {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const slug = file.replace(/\.md$/, "");
  const req = (k: string) => {
    const v = data[k] instanceof Date ? (data[k] as Date).toISOString().slice(0, 10) : data[k];
    if (typeof v !== "string" || !v.trim()) throw new Error(`content/pages/${file}: ${k} is required`);
    return v.trim();
  };
  return { slug, title: req("title"), description: req("description"), updated: req("updated"), body: content.trim() };
}

export function getAllPages(): SitePage[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load);
}

export function getPage(slug: string): SitePage | undefined {
  return getAllPages().find((p) => p.slug === slug);
}

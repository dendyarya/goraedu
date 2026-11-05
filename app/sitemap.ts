import type { MetadataRoute } from "next";
import { getAllNews } from "@/lib/news";
import { getAllPages } from "@/lib/pages";
import { getAllSets } from "@/lib/questions";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// Every indexable page goes here as it is published (noindex pages never go in the sitemap).
const PATHS = ["/", "/certifications/", "/practice-tests/", "/epa-608/", "/epa-608/guide/passing-score/", "/news/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...PATHS, ...getAllSets().map((s) => s.href), ...getAllPages().map((p) => `/${p.slug}/`)].map(
    (path) => ({ url: `${SITE.url}${path}` }),
  );
  const news = getAllNews().map((p) => ({
    url: `${SITE.url}/news/${p.slug}/`,
    lastModified: p.updated ?? p.published,
  }));
  return [...pages, ...news];
}

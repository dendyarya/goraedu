import { getAllNews } from "@/lib/news";
import { SITE } from "@/lib/site";

// Google News sitemap (developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap):
// only articles first published in the last two days, at most 1,000. Rebuilt on every deploy, so a push that
// adds a post refreshes it. An empty news sitemap is valid.
export const dynamic = "force-static";

const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

function xml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const now = Date.now();
  const recent = SITE.indexable
    ? getAllNews()
        .filter(
          (p) => now - Date.parse(p.published.length === 10 ? `${p.published}T00:00:00Z` : p.published) <= TWO_DAYS,
        )
        .slice(0, 1000)
    : [];
  const urls = recent
    .map(
      (p) => `  <url>
    <loc>${xml(`${SITE.url}/news/${p.slug}/`)}</loc>
    <news:news>
      <news:publication>
        <news:name>${xml(SITE.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${xml(p.published)}</news:publication_date>
      <news:title>${xml(p.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

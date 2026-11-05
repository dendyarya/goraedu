import { WITH_FAMILY } from "@/lib/clusters";
import { getAllGuides, getAllTopicPages } from "@/lib/guides";
import { getAllNews } from "@/lib/news";
import { getAllPages } from "@/lib/pages";
import { getAllSets } from "@/lib/questions";
import { TOOLS } from "@/lib/tools";

export const dynamic = "force-static";

/**
 * Site search index, built at deploy time and fetched by the header search only when someone opens it.
 * Short keys keep it small: t = title, u = URL, k = kind, d = extra text to match.
 */
export function GET() {
  type Entry = { t: string; u: string; k: string; d?: string };
  const out: Entry[] = [
    { t: "All certifications", u: "/certifications/", k: "Page" },
    { t: "Practice tests", u: "/practice-tests/", k: "Page" },
    { t: "Tools", u: "/tools/", k: "Page" },
    { t: "News", u: "/news/", k: "Page" },
    {
      t: "EPA 608 passing score and exam format",
      u: "/epa-608/guide/passing-score/",
      k: "Guide",
      d: "70 percent 84 percent appendix D",
    },
    {
      t: "EPA 608 Universal practice exam",
      u: "/epa-608/universal/practice-test/",
      k: "Practice test",
      d: "100 questions",
    },
  ];
  for (const c of WITH_FAMILY.filter((c) => c.href))
    out.push({ t: c.name, u: c.href!, k: "Certification", d: c.summary });
  for (const s of getAllSets()) {
    out.push({ t: s.title, u: s.href, k: "Practice test", d: s.description });
    for (const q of s.questions)
      out.push({ t: q.question, u: `${s.href}#${q.id}`, k: "Question", d: `${q.topic} ${s.title}` });
  }
  for (const g of getAllGuides()) {
    out.push({ t: g.title, u: g.href, k: "Study guide", d: g.description });
    for (const t of g.topics) out.push({ t: `${t.name} (${g.title})`, u: `${g.href}#${t.id}`, k: "Study guide" });
  }
  for (const g of getAllTopicPages()) out.push({ t: g.title, u: g.href, k: "Rules explained", d: g.description });
  for (const t of TOOLS) out.push({ t: t.name, u: t.href, k: "Tool", d: t.summary });
  for (const p of getAllNews())
    out.push({ t: p.title, u: `/news/${p.slug}/`, k: "News", d: `${p.topic} ${p.summary}` });
  for (const p of getAllPages()) out.push({ t: p.title, u: `/${p.slug}/`, k: "About goraedu", d: p.description });
  return Response.json(out);
}

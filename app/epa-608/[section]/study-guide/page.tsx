import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import SourceList, { type Source } from "@/components/SourceList";
import { getAllGuides, guideChecked, type GuidePoint } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { getAllSets, SECTION_NAME } from "@/lib/questions";

export const dynamicParams = false;

const guidesFor = () => getAllGuides().filter((g) => g.cluster === "epa-608");

export function generateStaticParams() {
  return guidesFor().map((g) => ({ section: g.slug }));
}

type Props = { params: Promise<{ section: string }> };

const find = (section: string) => guidesFor().find((g) => g.slug === section);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = find((await params).section);
  if (!g) return {};
  return {
    title: `EPA 608 ${SECTION_NAME[g.slug] ?? g.slug} Study Guide (from 40 CFR Part 82)`,
    description: g.description,
    alternates: { canonical: g.href },
  };
}

/** "eCFR: 40 CFR 82.156, Proper evacuation…" → "40 CFR 82.156"; "EPA: Some page" → "EPA: Some page". */
function shortSource(p: GuidePoint) {
  const m = p.source.title.match(/40 CFR (?:Part 82, Subpart F, )?(82\.\d+|Appendix [A-Z]\d?)/);
  if (m) return m[1]!.startsWith("82.") ? `40 CFR ${m[1]}` : `40 CFR Part 82, Subpart F, ${m[1]}`;
  return p.source.title.replace(/\s*\(as of [^)]+\)/, "");
}

export default async function StudyGuidePage({ params }: Props) {
  const g = find((await params).section);
  if (!g) notFound();
  const name = SECTION_NAME[g.slug] ?? g.slug;
  const checked = guideChecked(g);
  const test = getAllSets().find((s) => s.cluster === "epa-608" && s.slug === g.slug);
  const others = guidesFor().filter((x) => x.slug !== g.slug);
  const count = g.topics.reduce((n, t) => n + t.points.length, 0);

  const sources: Source[] = [];
  for (const p of g.topics.flatMap((t) => t.points)) {
    const s = sources.find((x) => x.url === p.source.url);
    if (!s) sources.push({ title: p.source.title, url: p.source.url, checked: p.checked });
    else if (p.checked > s.checked) s.checked = p.checked;
  }

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "EPA 608", href: "/epa-608/" }, { label: `${name} study guide` }]}
      title={`EPA 608 ${name} study guide`}
      lead={g.intro}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[15rem_1fr]">
        <nav aria-label="Topics in this guide" className="lg:sticky lg:top-6 lg:self-start">
          <p className="text-[0.9375rem] font-semibold">
            {g.topics.length} topics, {count} points
          </p>
          <ol className="mt-3 space-y-1.5 border-l-2 border-line text-[0.9375rem]">
            {g.topics.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="-ml-0.5 block border-l-2 border-transparent pl-3 hover:border-low hover:text-low"
                >
                  {t.name}
                </a>
              </li>
            ))}
          </ol>
          {test ? (
            <Link
              href={test.href}
              className="mt-6 inline-block rounded-[10px] bg-low px-4 py-2.5 font-semibold text-white hover:brightness-110"
            >
              Take the {name} practice test
            </Link>
          ) : null}
        </nav>

        <div className="min-w-0 max-w-[70ch]">
          {g.topics.map((t) => (
            <section key={t.id} id={t.id} className="scroll-mt-6 border-b border-line pb-10 pt-2 [&+section]:pt-10">
              <h2 className="text-[1.625rem] font-bold">{t.name}</h2>
              {t.points.length > 0 ? (
                <ul className="mt-5 space-y-6">
                  {t.points.map((p, i) => (
                    <li key={i} className="border-l-[3px] border-low pl-4">
                      <p className="text-[1.0625rem]">{p.text}</p>
                      {p.quote ? (
                        <blockquote className="mt-2 text-[0.9375rem] text-muted">&ldquo;{p.quote}&rdquo;</blockquote>
                      ) : null}
                      <p className="mt-1.5 text-[0.9375rem]">
                        <a href={p.source.url} className="text-low underline" rel="noopener">
                          {shortSource(p)}
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
              {t.notCovered ? (
                <div className="mt-6 rounded-xl border border-hose/60 bg-hose-soft p-4 text-[0.9375rem]">
                  <p className="font-semibold text-hose-ink">Not covered here</p>
                  <p className="mt-1">
                    {t.notCovered} We only write what an official source states, so study these parts with your
                    certifying program&apos;s materials.
                  </p>
                </div>
              ) : null}
            </section>
          ))}

          <div className="mt-12">
            <SourceList
              sources={sources}
              note={
                <>
                  Quotes from 40 CFR Part 82 are checked against the eCFR text dated November 3, 2026. Independent. Not
                  affiliated with or endorsed by the U.S. EPA or any certifying organization. Found an error?{" "}
                  <Link href="/contact/" className="text-low underline">
                    Tell us
                  </Link>
                  .
                </>
              }
            />
          </div>

          {others.length > 0 ? (
            <p className="mt-8 text-[0.9375rem]">
              Other study guides:{" "}
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 ? ", " : ""}
                  <Link href={o.href} className="text-low underline">
                    {SECTION_NAME[o.slug] ?? o.slug}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}

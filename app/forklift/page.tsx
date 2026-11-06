import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import SourceList, { type Source } from "@/components/SourceList";
import TradeIcon from "@/components/TradeIcon";
import { assertQuotes, getAllGuides } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_CLUSTERS } from "@/lib/osha";
import { getAllSets } from "@/lib/questions";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Forklift Operator Rules: Free Practice Questions and Study Guides (OSHA 29 CFR 1910.178)",
  description:
    "Free practice questions and study guides on OSHA's forklift rules: operator training and evaluation, truck types and locations, batteries, traveling, loading, maintenance.",
  alternates: { canonical: "/forklift/" },
};

const CHECKED = "2026-11-06";
const GI = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-N/section-1910.178";
const CO = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1926/subpart-O/section-1926.602";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "The employer must make sure each operator is competent to operate a powered industrial truck safely, shown by completing the training and evaluation in 1910.178(l).",
    quote:
      "The employer shall ensure that each powered industrial truck operator is competent to operate a powered industrial truck safely, as demonstrated by the successful completion of the training and evaluation specified in this paragraph (l).",
    cite: "29 CFR 1910.178(l)(1)(i)",
    url: GI,
  },
  {
    text: "Each operator's performance must be evaluated at least once every three years.",
    quote:
      "An evaluation of each powered industrial truck operator's performance shall be conducted at least once every three years.",
    cite: "29 CFR 1910.178(l)(4)(iii)",
    url: GI,
  },
];

assertQuotes(
  "forklift",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  { title: "eCFR: 29 CFR 1910.178, Powered industrial trucks (as of Nov 4, 2026)", url: GI, checked: CHECKED },
  { title: "eCFR: 29 CFR 1926.602, Material handling equipment (as of Nov 4, 2026)", url: CO, checked: CHECKED },
];

export default function ForkliftPage() {
  const c = OSHA_CLUSTERS.forklift;
  const sets = getAllSets().filter((s) => s.cluster === c.id);
  const guides = getAllGuides().filter((g) => g.cluster === c.id);
  const rows = c.sets
    .map((s) => ({ ...s, set: sets.find((x) => x.slug === s.slug), guide: guides.find((x) => x.slug === s.slug) }))
    .filter((r) => r.set || r.guide);
  const tools = TOOLS.filter((t) => t.cluster === c.id);

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Certifications", href: "/certifications/" },
        { label: "Forklift operator" },
      ]}
      title="Forklift operator: OSHA powered industrial truck rules"
      lead="Practice questions and study guides on OSHA's forklift (powered industrial truck) rules: operator training and evaluation, truck approval and designated locations, fuel and batteries, traveling and loading, maintenance, and forklifts in construction."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">What these pages cover</h2>
            <p className="mt-2">
              Everything here comes from the current eCFR text of 29 CFR 1910.178 (general industry) and 29 CFR
              1926.602(c) and (d) (construction). Under 1910.178(l) the employer trains, evaluates and certifies its own
              operators; a score here is not an operator evaluation. The non-mandatory Appendix A to 1910.178 and the
              consensus standards the rule refers to are not covered. These pages help you study the rule; they are not
              a course. Your State may run its own OSHA-approved plan with its own rules, so check them too.{" "}
              {c.independence}
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">Key rules, in the regulation&apos;s words</h2>
            <ul className="mt-5 space-y-6">
              {FACTS.map((f) => (
                <li key={f.cite} className="flex gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-low text-white">
                    <TradeIcon name="check" size={13} />
                  </span>
                  <div>
                    <p>{f.text}</p>
                    <blockquote className="mt-1.5 text-[0.9375rem] text-muted">&ldquo;{f.quote}&rdquo;</blockquote>
                    <a href={f.url} className="text-[0.9375rem] text-low underline" rel="noopener">
                      {f.cite}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12">
            <SourceList
              sources={SOURCES}
              note={
                <>
                  {c.independence} Found an error? See our{" "}
                  <Link href="/contact/" className="text-low underline">
                    contact page
                  </Link>
                  .
                </>
              }
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-line bg-panel p-6">
            <h2 className="text-[1.25rem] font-bold">Topics</h2>
            <ul className="mt-4 space-y-3">
              {rows.map((r) => (
                <li key={r.slug} className="rounded-2xl border border-line p-3">
                  <p className="font-bold">{r.name}</p>
                  <p className="text-[0.8125rem] text-muted">{r.rule}</p>
                  <p className="mt-1.5 flex flex-wrap gap-x-3 text-[0.9375rem]">
                    {r.set ? (
                      <Link href={r.set.href} className="font-semibold text-low underline">
                        {r.set.questions.length} questions
                      </Link>
                    ) : null}
                    {r.guide ? (
                      <Link href={r.guide.href} className="font-semibold text-low underline">
                        Study guide
                      </Link>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {tools.length ? (
            <div className="rounded-3xl border border-line bg-panel p-6">
              <h2 className="text-[1.25rem] font-bold">Tools</h2>
              <ul className="mt-4 space-y-2">
                {tools.map((t) => (
                  <li key={t.slug}>
                    <Link href={t.href} className="font-semibold text-low underline">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}

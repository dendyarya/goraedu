import type { Metadata } from "next";
import CoverageBox from "@/components/CoverageBox";
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
  title: "Asbestos Rules: Free Practice Questions and Study Guides (OSHA 29 CFR 1926.1101 and EPA AHERA)",
  description:
    "Free practice questions and study guides on OSHA's construction asbestos standard and EPA's school asbestos rule (AHERA): classes of work, controls, training, inspections.",
  alternates: { canonical: "/asbestos/" },
};

const CHECKED = "2026-11-06";
const OS = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1926/subpart-Z/section-1926.1101";
const EP = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-763/subpart-E";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "OSHA's construction standard covers asbestos exposure in construction work, including demolition and removal or encapsulation of asbestos-containing materials.",
    quote:
      "This section regulates asbestos exposure in all work as defined in 29 CFR 1910.12(b), including but not limited to the following:",
    cite: "29 CFR 1926.1101(a)",
    url: OS,
  },
  {
    text: "EPA's school rule requires local education agencies to identify friable and nonfriable asbestos-containing material in elementary and secondary schools.",
    quote:
      "This rule requires local education agencies to identify friable and nonfriable asbestos-containing material (ACM) in public and private elementary and secondary schools by visually inspecting school buildings for such materials, sampling such materials if they are not assumed to be ACM, and having samples analyzed by appropriate techniques referred to in this rule.",
    cite: "40 CFR 763.80(a)",
    url: `${EP}/section-763.80`,
  },
];

assertQuotes(
  "asbestos",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  { title: "eCFR: 29 CFR 1926.1101, Asbestos (as of Nov 4, 2026)", url: OS, checked: CHECKED },
  {
    title: "eCFR: 40 CFR Part 763, Subpart E—Asbestos-Containing Materials in Schools (as of Nov 4, 2026)",
    url: EP,
    checked: CHECKED,
  },
];

export default function AsbestosPage() {
  const c = OSHA_CLUSTERS.asbestos;
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
        { label: "Asbestos" },
      ]}
      title="Asbestos: OSHA construction and EPA school rules"
      lead="Practice questions and study guides on OSHA's asbestos standard for construction (classes of work, exposure limits, regulated areas, controls, respirators, training, medical surveillance) and EPA's asbestos rule for schools (inspections, response actions, management plans, records)."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <CoverageBox cluster="asbestos" />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">What these pages cover</h2>
            <p className="mt-2">
              Everything here comes from the current eCFR text of 29 CFR 1926.1101 paragraphs (a) to (o) and 40 CFR
              763.80 to 763.95 and 763.99. The appendices to both rules, enforcement and penalty provisions, and the
              training courses and exams accredited providers run are not covered. These pages help you study the rule;
              they are not a course. Your State may run its own OSHA-approved plan or asbestos program with its own
              rules, so check them too. {c.independence}
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

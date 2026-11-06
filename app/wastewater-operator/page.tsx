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
  title: "Wastewater Operator Federal Rules: Free Practice Questions and Study Guides (40 CFR 122, 133, 136, 403, 503)",
  description:
    "Free practice questions and study guides on the federal wastewater rules: secondary treatment, NPDES permit conditions, sampling, pretreatment and biosolids.",
  alternates: { canonical: "/wastewater-operator/" },
};

const CHECKED = "2026-11-06";
const B = "https://www.ecfr.gov/current/title-40/chapter-I";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "A permittee must comply with every condition of its NPDES permit; any noncompliance is a Clean Water Act violation.",
    quote:
      "The permittee must comply with all conditions of this permit. Any permit noncompliance constitutes a violation of the Clean Water Act",
    cite: "40 CFR 122.41(a)",
    url: `${B}/subchapter-D/part-122/subpart-C/section-122.41`,
  },
  {
    text: "The permittee must properly operate and maintain the treatment and control systems it uses to meet the permit, including adequate laboratory controls and quality assurance.",
    quote:
      "The permittee shall at all times properly operate and maintain all facilities and systems of treatment and control (and related appurtenances) which are installed or used by the permittee to achieve compliance with the conditions of this permit. Proper operation and maintenance also includes adequate laboratory controls and appropriate quality assurance procedures.",
    cite: "40 CFR 122.41(e)",
    url: `${B}/subchapter-D/part-122/subpart-C/section-122.41`,
  },
  {
    text: "Part 133 describes the minimum effluent quality attainable by secondary treatment for BOD5, suspended solids and pH, with exceptions in 133.103 and 133.105.",
    quote:
      "The following paragraphs describe the minimum level of effluent quality attainable by secondary treatment in terms of the parameters—BOD5, SS and pH. All requirements for each parameter shall be achieved except as provided for in §§ 133.103 and 133.105.",
    cite: "40 CFR 133.102",
    url: `${B}/subchapter-D/part-133/section-133.102`,
  },
  {
    text: "The permitting authority may, case by case, impose biosolids requirements in addition to or more stringent than Part 503.",
    quote:
      "On a case-by-case basis, the permitting authority may impose requirements for the use or disposal of sewage sludge in addition to or more stringent than the requirements in this part when necessary to protect public health and the environment from any adverse effect of a pollutant in the sewage sludge.",
    cite: "40 CFR 503.5(a)",
    url: `${B}/subchapter-O/part-503/subpart-A/section-503.5`,
  },
];

assertQuotes(
  "wastewater-operator",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["subchapter-D/part-122/subpart-A/section-122.2", "40 CFR 122.2, Definitions"],
    ["subchapter-D/part-122/subpart-C", "40 CFR Part 122, Subpart C, Permit Conditions"],
    ["subchapter-D/part-133", "40 CFR Part 133, Secondary Treatment Regulation"],
    ["subchapter-D/part-136/section-136.1", "40 CFR 136.1, Applicability"],
    ["subchapter-D/part-136/section-136.2", "40 CFR 136.2, Definitions"],
    ["subchapter-D/part-136/section-136.3", "40 CFR 136.3, Identification of test procedures"],
    [
      "subchapter-N/part-403",
      "40 CFR Part 403, General Pretreatment Regulations for Existing and New Sources of Pollution",
    ],
    ["subchapter-O/part-503", "40 CFR Part 503, Standards for the Use or Disposal of Sewage Sludge"],
  ].map(([p, t]) => ({ title: `eCFR: ${t} (as of Nov 4, 2026)`, url: `${B}/${p}`, checked: CHECKED })),
];

export default function WastewaterOperatorPage() {
  const c = OSHA_CLUSTERS["wastewater-operator"];
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
        { label: "Wastewater operator" },
      ]}
      title="Wastewater operator: federal rules"
      lead="Practice questions and study guides on the federal Clean Water Act rules that wastewater treatment operators work under: secondary treatment, NPDES permit conditions and monitoring, sampling and test procedures, industrial pretreatment and biosolids."
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
              Everything here comes from the current eCFR text of 40 CFR Parts 122, 133, 136, 403 and 503. Operator
              certification exams are run by each state, and many use exam content and operator manuals we do not use.
              Those exams also test plant operation, laboratory work and process math, which these rules do not cover.
              Your facility&apos;s NPDES permit sets the limits and conditions that apply to you. Your State program and
              your facility&apos;s permit may have their own requirements, so check them too. {c.independence}
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

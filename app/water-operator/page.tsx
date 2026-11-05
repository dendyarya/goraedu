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
  title: "Drinking Water Operator Federal Rules: Free Practice Questions and Study Guides (40 CFR 141)",
  description:
    "Free practice questions and study guides on the federal drinking water rules in 40 CFR Parts 141 and 143: MCLs, coliform, disinfection, lead and copper, public notice.",
  alternates: { canonical: "/water-operator/" },
};

const CHECKED = "2026-11-06";
const B = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "A public water system is one that provides water for human consumption to the public and has at least 15 service connections or regularly serves an average of at least 25 people daily at least 60 days out of the year.",
    quote:
      "Public water system means a system for the provision to the public of water for human consumption through pipes or, after August 5, 1998, other constructed conveyances, if such system has at least fifteen service connections or regularly serves an average of at least twenty-five individuals daily at least 60 days out of the year.",
    cite: "40 CFR 141.2",
    url: `${B}/part-141/subpart-A/section-141.2`,
  },
  {
    text: "A maximum contaminant level (MCL) is the enforceable limit for water delivered to any user; a maximum contaminant level goal (MCLG) is a nonenforceable health goal.",
    quote: "Maximum contaminant level goals are nonenforceable health goals.",
    cite: "40 CFR 141.2",
    url: `${B}/part-141/subpart-A/section-141.2`,
  },
  {
    text: "For a Tier 1 violation or situation, the system must give public notice as soon as practical and no later than 24 hours after it learns of it.",
    quote:
      "Provide a public notice as soon as practical but no later than 24 hours after the system learns of the violation or situation requiring Tier 1 public notice;",
    cite: "40 CFR 141.202(b)(1)",
    url: `${B}/part-141/subpart-Q/section-141.202`,
  },
  {
    text: "The lead and copper rule as revised in 2024 must be met by community and non-transient non-community water systems no later than November 1, 2027, except where the rule says otherwise or an exemption applies. Until then, the rule says which earlier text and provisions apply.",
    quote:
      "Community water systems and non-transient non-community water systems must comply with the requirements of this subpart no later than November 1, 2027, except where otherwise specified in",
    cite: "40 CFR 141.80(a)(3)",
    url: `${B}/part-141/subpart-I/section-141.80`,
  },
];

assertQuotes(
  "water-operator",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["part-141/subpart-A", "40 CFR Part 141, Subpart A, General", "Nov 3"],
    [
      "part-141/subpart-G",
      "40 CFR Part 141, Subpart G, Maximum Contaminant Levels and Maximum Residual Disinfectant Levels",
      "Nov 3",
    ],
    ["part-141/subpart-H", "40 CFR Part 141, Subpart H, Filtration and Disinfection", "Nov 3"],
    ["part-141/subpart-I", "40 CFR Part 141, Subpart I, Control of Lead and Copper", "Nov 3"],
    [
      "part-141/subpart-L",
      "40 CFR Part 141, Subpart L, Disinfectant Residuals, Disinfection Byproducts, and Disinfection Byproduct Precursors",
      "Nov 4",
    ],
    ["part-141/subpart-Q", "40 CFR Part 141, Subpart Q, Public Notification of Drinking Water Violations", "Nov 3"],
    ["part-141/subpart-Y", "40 CFR Part 141, Subpart Y, Revised Total Coliform Rule", "Nov 3"],
    ["part-143", "40 CFR Part 143, Other Safe Drinking Water Act Regulations", "Nov 4"],
  ].map(([p, t, d]) => ({ title: `eCFR: ${t} (as of ${d}, 2026)`, url: `${B}/${p}`, checked: CHECKED })),
];

export default function WaterOperatorPage() {
  const c = OSHA_CLUSTERS["water-operator"];
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
        { label: "Drinking water operator" },
      ]}
      title="Drinking water operator: federal rules"
      lead="Practice questions and study guides on the federal drinking water rules that treatment and distribution operators work under: definitions, contaminant limits, coliform monitoring, filtration and disinfection, disinfection byproducts, lead and copper, public notice and secondary standards."
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
              Everything here comes from the current eCFR text of 40 CFR Part 141 (National Primary Drinking Water
              Regulations) and Part 143 (secondary standards and lead free plumbing). Operator certification exams are
              run by each state, and many use exam content and operator manuals we do not use. Those exams also test
              plant operation and process math, which federal rules do not cover. Your state drinking water program may
              have its own requirements, so check them too. {c.independence}
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">Dates to keep in mind</h2>
            <p className="mt-3">
              Subpart I (lead and copper) was revised in 2024. The revised text is effective December 30, 2024, and
              systems must comply with it no later than November 1, 2027, except where the rule says otherwise. Until
              then, 40 CFR 141.80(a)(4) points to the text as codified on July 1, 2020, plus a list of new provisions.
              Our lead and copper pages describe the revised text and say so on every point.
            </p>
          </section>

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

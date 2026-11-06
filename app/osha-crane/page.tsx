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
  title: "OSHA Crane Operator Rules: Free Practice Questions and Study Guides (29 CFR 1926 Subpart CC)",
  description:
    "Free practice questions and study guides on OSHA's construction crane rules: power lines, inspections, operation, signals, operator certification, hoisting personnel.",
  alternates: { canonical: "/osha-crane/" },
};

const CHECKED = "2026-11-06";
const B = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1926/subpart-CC";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "Before operating near power lines, the employer must determine whether the equipment, load line or load could get closer than 20 feet to a line at maximum working radius, and if so use one of three options.",
    quote:
      "Determine if any part of the equipment, load line or load (including rigging and lifting accessories), if operated up to the equipment's maximum working radius in the work zone, could get closer than 20 feet to a power line. If so, the employer must meet the requirements in Option (1), Option (2), or Option (3) of this section, as follows:",
    cite: "29 CFR 1926.1408(a)(2)",
    url: `${B}/section-1926.1408`,
  },
  {
    text: "Under Option (3), the utility owner/operator must provide the requested voltage information within two working days.",
    quote:
      "Where Option (3) of this section is used, the utility owner/operator of the power lines must provide the requested voltage information within two working days of the employer's request.",
    cite: "29 CFR 1926.1408(c)",
    url: `${B}/section-1926.1408`,
  },
];

assertQuotes(
  "osha-crane",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["1401", "Definitions"],
    ["1408", "Power line safety (up to 350 kV)—equipment operations"],
    ["1412", "Inspections"],
    ["1417", "Operation"],
    ["1419", "Signals—general requirements"],
    ["1424", "Work area control"],
    ["1427", "Operator training, certification, and evaluation"],
    ["1431", "Hoisting personnel"],
  ].map(([n, t]) => ({
    title: `eCFR: 29 CFR 1926.${n}, ${t} (as of Nov 4, 2026)`,
    url: `${B}/section-1926.${n}`,
    checked: CHECKED,
  })),
];

export default function OshaCranePage() {
  const c = OSHA_CLUSTERS["osha-crane"];
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
        { label: "OSHA crane operator" },
      ]}
      title="OSHA crane operator: construction crane rules"
      lead="Practice questions and study guides on OSHA's construction crane and derrick rules: power line safety, inspections, operation and work area control, signals, operator certification and evaluation, and hoisting personnel."
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
              Everything here comes from the current eCFR text of eight sections of 29 CFR 1926 Subpart CC (1926.1401,
              1408, 1412, 1417, 1419, 1424, 1427 and 1431). Other sections of Subpart CC, such as assembly, ground
              conditions, signal person and rigger qualification, are not covered yet. Under 1926.1427, an operator is
              licensed by a State or local government where that applies, or otherwise certified by an accredited crane
              operator testing organization or through an audited employer program. Certification exams use their own
              content, which we do not use. These pages help you study the rule; they are not a course. Your State may
              run its own OSHA-approved plan with its own rules, so check them too. {c.independence}
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

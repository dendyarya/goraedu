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
  title: "FAA Aviation Mechanic (A&P) Rules: Free Practice Questions and Study Guides (14 CFR Parts 65 and 43)",
  description:
    "Free practice questions and study guides on FAA mechanic rules: eligibility, ratings, privileges, inspection authorization, who may approve return to service, records.",
  alternates: { canonical: "/faa-amt/" },
};

const CHECKED = "2026-11-06";
const P65 = "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-65/subpart-D";
const P43 = "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-C/part-43";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "A certificated mechanic may perform or supervise maintenance, preventive maintenance or alteration of what the mechanic is rated for, with the exclusions the rule names.",
    quote:
      "A certificated mechanic may perform or supervise the maintenance, preventive maintenance or alteration of an aircraft or appliance, or a part thereof, for which that person is rated (but excluding major repairs to, and major alterations of, propellers, and any repair to, or alteration of, instruments), and may perform additional duties in accordance with §§ 65.85, 65.87, and 65.95.",
    cite: "14 CFR 65.81(a)",
    url: `${P65}/section-65.81`,
  },
  {
    text: "Each inspection authorization expires on March 31 of each odd-numbered year.",
    quote: "Each inspection authorization expires on March 31 of each odd-numbered year.",
    cite: "14 CFR 65.92(a)",
    url: `${P65}/section-65.92`,
  },
];

assertQuotes(
  "faa-amt",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  { title: "eCFR: 14 CFR Part 65, Subpart D—Mechanics (as of Nov 4, 2026)", url: P65, checked: CHECKED },
  {
    title: "eCFR: 14 CFR Part 43, Maintenance, Preventive Maintenance, Rebuilding, and Alteration (as of Nov 4, 2026)",
    url: P43,
    checked: CHECKED,
  },
];

export default function FaaAmtPage() {
  const c = OSHA_CLUSTERS["faa-amt"];
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
        { label: "FAA aviation mechanic" },
      ]}
      title="FAA aviation mechanic: certificate and maintenance rules"
      lead="Practice questions and study guides on the FAA rules behind the mechanic certificate: eligibility and ratings, privileges and recent experience, inspection authorization, who may perform maintenance and approve return to service, records, performance rules, and major repairs and preventive maintenance."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <CoverageBox cluster="faa-amt" />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">What these pages cover</h2>
            <p className="mt-2">
              Everything here comes from the current eCFR text of 14 CFR Part 65 Subpart D (mechanics) and 14 CFR Part
              43 (maintenance, preventive maintenance, rebuilding and alteration). The FAA knowledge, oral and practical
              tests use their own content, which we do not use, and documents the rules incorporate by reference are not
              covered. These pages help you study the rule; they are not a course. {c.independence}
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

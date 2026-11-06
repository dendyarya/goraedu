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
  title: "Industrial Radiography: Free Practice Questions and Study Guides (NRC 10 CFR Part 34)",
  description:
    "Free practice questions and study guides on the NRC rules for industrial radiography: radiographer training and certification, equipment, sealed sources, surveys, records.",
  alternates: { canonical: "/industrial-radiography/" },
};

const CHECKED = "2026-11-07";
const P = "https://www.ecfr.gov/current/title-10/chapter-I/part-34";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "Outside a permanent radiographic installation, a radiographer must be accompanied by at least one other qualified individual; radiography may not be done with only one qualified person present.",
    quote:
      "Whenever radiography is performed at a location other than a permanent radiographic installation, the radiographer must be accompanied by at least one other qualified radiographer or an individual who has at a minimum met the requirements of § 34.43(c).",
    cite: "10 CFR 34.41(a)",
    url: `${P}/subpart-D/section-34.41`,
  },
  {
    text: "Before a licensee lets someone act as a radiographer, the person must, among other things, have training in the listed subjects, at least 2 months of on-the-job training, and certification by a certifying entity.",
    quote:
      "Has received training in the subjects in paragraph (g) of this section, in addition to a minimum of 2 months of on-the-job training, and is certified through a radiographer certification program by a certifying entity in accordance with the criteria specified in appendix A of this part.",
    cite: "10 CFR 34.43(a)(1)",
    url: `${P}/subpart-D/section-34.43`,
  },
  {
    text: "The licensee must give each radiographer and radiographer's assistant refresher safety training at intervals not to exceed 12 months.",
    quote:
      "The licensee shall provide annual refresher safety training for each radiographer and radiographer's assistant at intervals not to exceed 12 months.",
    cite: "10 CFR 34.43(d)",
    url: `${P}/subpart-D/section-34.43`,
  },
  {
    text: "Each sealed source must be leak tested at intervals not to exceed 6 months.",
    quote:
      "Each licensee who uses a sealed source shall have the source tested for leakage at intervals not to exceed 6 months.",
    cite: "10 CFR 34.27(c)(1)",
    url: `${P}/subpart-C/section-34.27`,
  },
];

assertQuotes(
  "industrial-radiography",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  {
    title:
      "eCFR: 10 CFR Part 34, Licenses for Industrial Radiography and Radiation Safety Requirements for Industrial Radiographic Operations (as of Nov 4, 2026)",
    url: P,
    checked: CHECKED,
  },
];

export default function IndustrialRadiographyPage() {
  const c = OSHA_CLUSTERS["industrial-radiography"];
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
        { label: "Industrial radiography" },
      ]}
      title="Industrial radiography: NRC rules (10 CFR Part 34)"
      lead="Practice questions and study guides on the NRC rules for industrial radiography: radiographer training, certification and supervision; equipment and sealed sources; operations, monitoring and surveys; and licensing and records."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <CoverageBox cluster="industrial-radiography" />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">Scope and sources</h2>
            <p className="mt-2">
              Everything here comes from the current eCFR text of 10 CFR Part 34. Certifying-entity exams and study
              material, radiation physics and shielding, other parts of 10 CFR, NRC guidance documents, and violation
              and penalty provisions are not covered. These pages help you study the rule; they are not a course or
              exam. Agreement States license radiography under their own compatible rules, so check yours too. These
              pages are not radiation safety training and have not been reviewed by a radiation safety professional:
              your licensee&apos;s training program and Radiation Safety Officer decide how the work is done safely.{" "}
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

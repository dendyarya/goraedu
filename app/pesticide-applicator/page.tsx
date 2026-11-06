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
  title: "Pesticide Applicator Certification: Free Practice Questions and Study Guides (EPA 40 CFR Part 171)",
  description:
    "Free practice questions and study guides on EPA's federal standards for certifying restricted use pesticide applicators: categories, exams, private applicators, recertification, supervision.",
  alternates: { canonical: "/pesticide-applicator/" },
};

const CHECKED = "2026-11-06";
const P = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-171";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "You count as a certified applicator only while you hold a certification issued under an EPA-approved plan that is currently valid where you work.",
    quote:
      "A person is a certified applicator for purposes of the Federal Insecticide, Fungicide and Rodenticide Act (FIFRA), 7 U.S.C. 136 et seq., only if the person holds a certification issued pursuant to a plan approved in accordance with this part and currently valid in the pertinent jurisdiction.",
    cite: "40 CFR 171.1(b)",
    url: `${P}/subpart-A/section-171.1`,
  },
  {
    text: "A commercial applicator must pass a written examination that meets the federal exam standards, plus any performance testing the certifying authority requires.",
    quote:
      "a commercial applicator must receive a passing score on a written examination that meets the standards specified in paragraph (a)(2) of this section and any related performance testing that is required by the State, Tribe, or Federal agency.",
    cite: "40 CFR 171.103(a)",
    url: `${P}/subpart-B/section-171.103`,
  },
  {
    text: "A private applicator must be at least 18 years old.",
    quote: "A private applicator must be at least 18 years old.",
    cite: "40 CFR 171.105(g)",
    url: `${P}/subpart-B/section-171.105`,
  },
  {
    text: "A certification expires five years after it is issued unless the applicator is recertified, and the certifying authority may set a shorter period.",
    quote:
      "Each commercial and private applicator certification shall expire five years after issuance, unless the applicator is recertified in accordance with this section. A certifying authority may establish a shorter certification period.",
    cite: "40 CFR 171.107(a)",
    url: `${P}/subpart-B/section-171.107`,
  },
];

assertQuotes(
  "pesticide-applicator",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  {
    title: "eCFR: 40 CFR Part 171, Certification of Pesticide Applicators (as of Nov 4, 2026)",
    url: P,
    checked: CHECKED,
  },
];

export default function PesticideApplicatorPage() {
  const c = OSHA_CLUSTERS["pesticide-applicator"];
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
        { label: "Pesticide applicator" },
      ]}
      title="Pesticide applicator certification: EPA federal standards"
      lead="Practice questions and study guides on EPA's federal standards for certifying applicators of restricted use pesticides: definitions, commercial categories and exams, private applicators, recertification and supervising noncertified applicators."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <CoverageBox cluster="pesticide-applicator" />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">Scope and sources</h2>
            <p className="mt-2">
              Everything here comes from the current eCFR text of 40 CFR Part 171. The exams, manuals and category
              training that States, Tribes and Federal agencies use, pesticide labels, and enforcement and penalty
              provisions are not covered. These pages help you study the rule; they are not a course or exam. States,
              Tribes and Federal agencies run their own certification programs under EPA-approved plans and may set
              stricter or additional requirements, so check yours too. {c.independence}
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

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
  title: "EPA Lead RRP Renovator Rules: Free Practice Questions and Study Guides (40 CFR 745)",
  description:
    "Free practice questions and study guides on EPA's lead renovation, repair and painting rule: scope, certification, pamphlets, work practices, cleaning verification.",
  alternates: { canonical: "/lead-rrp/" },
};

const CHECKED = "2026-11-06";
const B = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-745";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "The renovation rule covers renovations performed for compensation in target housing and child-occupied facilities, with listed exceptions.",
    quote:
      "This subpart applies to all renovations performed for compensation in target housing and child-occupied facilities, except for the following:",
    cite: "40 CFR 745.82(a)",
    url: `${B}/subpart-E/section-745.82`,
  },
  {
    text: "Target housing is housing built before 1978, except housing for the elderly or persons with disabilities and 0-bedroom dwellings, unless a child under 6 lives or is expected to live there.",
    quote:
      "Target housing means any housing constructed prior to 1978, except housing for the elderly or persons with disabilities or any 0-bedroom dwelling (unless any child who is less than 6 years of age resides or is expected to reside in such housing).",
    cite: "40 CFR 745.103",
    url: `${B}/subpart-F/section-745.103`,
  },
  {
    text: "Firms that perform renovations for compensation must apply to EPA for certification.",
    quote:
      "Firms that perform renovations for compensation must electronically apply to EPA for certification to perform renovations or dust sampling.",
    cite: "40 CFR 745.89(a)(1)",
    url: `${B}/subpart-E/section-745.89`,
  },
  {
    text: "A certified renovator is someone who completed a renovator course accredited by EPA or by an EPA-authorized State or Tribal program.",
    quote:
      "A certified renovator is a renovator who has successfully completed a renovator course accredited by EPA or an EPA-authorized State or Tribal program.",
    cite: "40 CFR 745.83",
    url: `${B}/subpart-E/section-745.83`,
  },
  {
    text: "Minor repair and maintenance activities are not renovations under the rule.",
    quote: "The term renovation does not include minor repair and maintenance activities.",
    cite: "40 CFR 745.83",
    url: `${B}/subpart-E/section-745.83`,
  },
];

assertQuotes(
  "lead-rrp",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["subpart-E", "40 CFR Part 745, Subpart E, Residential Property Renovation"],
    ["subpart-L", "40 CFR Part 745, Subpart L, Lead-Based Paint Activities"],
    ["subpart-D", "40 CFR Part 745, Subpart D, Lead-Based Paint Hazards"],
    ["subpart-F/section-745.103", "40 CFR 745.103, Definitions"],
  ].map(([p, t]) => ({ title: `eCFR: ${t} (as of Nov 4, 2026)`, url: `${B}/${p}`, checked: CHECKED })),
];

export default function LeadRrpPage() {
  const c = OSHA_CLUSTERS["lead-rrp"];
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
        { label: "EPA Lead RRP" },
      ]}
      title="EPA Lead-Safe Renovator (RRP): federal rules"
      lead="Practice questions and study guides on EPA's lead renovation, repair and painting rule in 40 CFR Part 745: which jobs it covers, firm and renovator certification, the pre-renovation pamphlet, work practices, cleaning verification and the lead hazard standards."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <CoverageBox cluster="lead-rrp" />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">What these pages cover</h2>
            <p className="mt-2">
              Everything here comes from the current eCFR text of 40 CFR Part 745 Subparts D, E and L and § 745.103. The
              Certified Renovator credential is earned only by completing an accredited renovator course, and firms
              apply to EPA (or to an authorized State or Tribe) for certification. These pages help you study the rule;
              they are not a course and do not count toward certification. HUD and other rules that may also apply are
              not covered. Your State or Tribe may run its own authorized program, so check its rules too.{" "}
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

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import SourceList, { type Source } from "@/components/SourceList";
import TradeIcon from "@/components/TradeIcon";
import { assertQuotes, getAllGuides } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_INDEPENDENCE, OSHA_SETS } from "@/lib/osha";
import { getAllSets } from "@/lib/questions";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "OSHA Construction Safety (29 CFR 1926): Free Practice Questions and Study Guides",
  description:
    "Free practice questions, study guides and tools on the OSHA rules behind the OSHA 10 and 30 construction topics: falls, electrical, excavations, health hazards.",
  alternates: { canonical: "/osha/" },
};

const CHECKED = "2026-11-05";
const BASE = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1926";

// Each fact: our plain-English statement plus the exact words of 29 CFR Part 1926 it rests on.
// The build fails if a quote is not in the dated eCFR snapshot (data/sources/ecfr).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "Workers on a walking or working surface with an unprotected side or edge 6 feet or more above a lower level must be protected from falling.",
    quote:
      "Each employee on a walking/working surface (horizontal and vertical surface) with an unprotected side or edge which is 6 feet (1.8 m) or more above a lower level shall be protected from falling by the use of guardrail systems, safety net systems, or personal fall arrest systems.",
    cite: "29 CFR 1926.501(b)(1)",
    url: `${BASE}/subpart-M/section-1926.501`,
  },
  {
    text: "Employers must teach each worker to recognize and avoid unsafe conditions on the job.",
    quote:
      "The employer shall instruct each employee in the recognition and avoidance of unsafe conditions and the regulations applicable to his work environment to control or eliminate any hazards or other exposure to illness or injury.",
    cite: "29 CFR 1926.21(b)(2)",
    url: `${BASE}/subpart-C/section-1926.21`,
  },
  {
    text: "Safety programs must include frequent and regular inspections by competent persons the employer designates.",
    quote:
      "Such programs shall provide for frequent and regular inspections of the job sites, materials, and equipment to be made by competent persons designated by the employers.",
    cite: "29 CFR 1926.20(b)(2)",
    url: `${BASE}/subpart-C/section-1926.20`,
  },
  {
    text: "Workers in an excavation must be protected from cave-ins, with narrow exceptions for stable rock and some shallow trenches.",
    quote:
      "Each employee in an excavation shall be protected from cave-ins by an adequate protective system designed in accordance with paragraph (b) or (c) of this section except when:",
    cite: "29 CFR 1926.652(a)(1)",
    url: `${BASE}/subpart-P/section-1926.652`,
  },
  {
    text: "A portable ladder used to reach an upper landing must extend at least 3 feet above it, unless that is not possible because of the ladder's length.",
    quote:
      "When portable ladders are used for access to an upper landing surface, the ladder side rails shall extend at least 3 feet (.9 m) above the upper landing surface to which the ladder is used to gain access;",
    cite: "29 CFR 1926.1053(b)(1)",
    url: `${BASE}/subpart-X/section-1926.1053`,
  },
];

assertQuotes(
  "osha",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["C", "General Safety and Health Provisions"],
    ["D", "Occupational Health and Environmental Controls"],
    ["E", "Personal Protective and Life Saving Equipment"],
    ["K", "Electrical"],
    ["L", "Scaffolds"],
    ["M", "Fall Protection"],
    ["P", "Excavations"],
    ["X", "Stairways and Ladders"],
  ].map(([s, t]) => ({
    title: `eCFR: 29 CFR Part 1926, Subpart ${s}, ${t} (as of Nov 3, 2026)`,
    url: `${BASE}/subpart-${s}`,
    checked: CHECKED,
  })),
  ...[
    ["part-1903", "29 CFR Part 1903, Inspections, Citations and Proposed Penalties"],
    ["part-1904", "29 CFR Part 1904, Recording and Reporting Occupational Injuries and Illnesses"],
    ["part-1926/subpart-Z/section-1926.1153", "29 CFR 1926.1153, Respirable crystalline silica"],
    ["part-1910/subpart-Z/section-1910.1200", "29 CFR 1910.1200, Hazard communication"],
  ].map(([p, t]) => ({
    title: `eCFR: ${t} (as of Nov 3, 2026)`,
    url: `https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/${p}`,
    checked: CHECKED,
  })),
  {
    title: "OSHA Outreach Training Program: Construction Industry Procedures (revised July 1, 2024)",
    url: "https://aotc.sph.rutgers.edu/documents/OTP_Construction_Procedures_2024.pdf",
    checked: CHECKED,
  },
];

export default function OshaPage() {
  const sets = getAllSets().filter((s) => s.cluster === "osha");
  const guides = getAllGuides().filter((g) => g.cluster === "osha");
  const rows = OSHA_SETS.map((s) => ({
    ...s,
    set: sets.find((x) => x.slug === s.slug),
    guide: guides.find((x) => x.slug === s.slug),
  })).filter((r) => r.set || r.guide);

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Certifications", href: "/certifications/" },
        { label: "OSHA Construction" },
      ]}
      title="OSHA construction safety rules"
      lead="Practice questions, study guides and tools on the OSHA rules behind the OSHA 10-hour and 30-hour construction course topics: the construction standards in 29 CFR Part 1926, plus OSHA inspections, recordkeeping and hazard communication."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">About OSHA 10 and OSHA 30 cards</h2>
            <p className="mt-2">
              OSHA 10-hour and 30-hour cards come only from authorized trainers in OSHA&apos;s Outreach Training
              Program. {OSHA_INDEPENDENCE} Use these pages to learn and review the rules.
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">What the construction course covers</h2>
            <p className="mt-3">
              Under OSHA&apos;s Outreach Training Program Construction Industry Procedures (revised July 1, 2024), the
              10-hour construction course must include Introduction to OSHA, the OSHA Focus Four hazards (falls,
              electrocution, struck-by and caught-in or between), personal protective equipment, and health hazards in
              construction. The 30-hour course adds Managing Safety and Health and Stairways and Ladders, among other
              topics. Our pages follow the construction standards behind those topics.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">Key rules, in OSHA&apos;s words</h2>
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
                  {OSHA_INDEPENDENCE} Found an error? See our{" "}
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
                  <p className="text-[0.8125rem] text-muted">
                    {r.rule}
                    {r.focus ? ` · Focus Four: ${r.focus}` : ""}
                  </p>
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
          <div className="rounded-3xl border border-line bg-panel p-6">
            <h2 className="text-[1.25rem] font-bold">Tools</h2>
            <ul className="mt-4 space-y-2">
              {TOOLS.filter((t) => t.cluster === "osha").map((t) => (
                <li key={t.slug}>
                  <Link href={t.href} className="font-semibold text-low underline">
                    {t.name.replace("OSHA ", "").replace(/^./, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

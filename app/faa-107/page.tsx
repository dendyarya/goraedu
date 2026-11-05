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
  title: "FAA Part 107 Remote Pilot: Free Practice Questions and Study Guides",
  description:
    "Free practice questions and study guides on 14 CFR Part 107, Remote ID, drone registration, airspace, weather and safe operations, from FAA sources.",
  alternates: { canonical: "/faa-107/" },
};

const CHECKED = "2026-11-05";
const B = "https://www.ecfr.gov/current/title-14/chapter-I";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "A small unmanned aircraft may not fly higher than 400 feet above ground level, except near a structure as the rule allows.",
    quote:
      "The altitude of the small unmanned aircraft cannot be higher than 400 feet above ground level, unless the small unmanned aircraft:",
    cite: "14 CFR 107.51(b)",
    url: `${B}/subchapter-F/part-107/subpart-B/section-107.51`,
  },
  {
    text: "The remote pilot in command, the visual observer if one is used, and the person at the controls must be able to see the aircraft throughout the flight with unaided vision (corrective lenses allowed).",
    quote:
      "With vision that is unaided by any device other than corrective lenses, the remote pilot in command, the visual observer (if one is used), and the person manipulating the flight control of the small unmanned aircraft system must be able to see the unmanned aircraft throughout the entire flight in order to:",
    cite: "14 CFR 107.31(a)",
    url: `${B}/subchapter-F/part-107/subpart-B/section-107.31`,
  },
  {
    text: "To act as remote pilot in command, a person must have passed the initial knowledge test, completed recurrent training, or met another listed option within the previous 24 calendar months.",
    quote:
      "A person may not exercise the privileges of a remote pilot in command with small UAS rating unless that person has accomplished one of the following in a manner acceptable to the Administrator within the previous 24 calendar months:",
    cite: "14 CFR 107.65",
    url: `${B}/subchapter-F/part-107/subpart-C/section-107.65`,
  },
  {
    text: "Since September 16, 2023, unmanned aircraft must meet a Remote ID option to fly in U.S. airspace, unless otherwise authorized or operating under § 89.120.",
    quote:
      "Except as otherwise authorized by the Administrator or as provided in § 89.120, after September 16, 2023, no person may operate an unmanned aircraft within the airspace of the United States unless the operation meets the requirements of § 89.110 or § 89.115.",
    cite: "14 CFR 89.105",
    url: `${B}/subchapter-F/part-89/subpart-B/section-89.105`,
  },
];

assertQuotes(
  "faa-107",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["subchapter-F/part-107", "14 CFR Part 107, Small Unmanned Aircraft Systems"],
    ["subchapter-F/part-89", "14 CFR Part 89, Remote Identification of Unmanned Aircraft"],
    ["subchapter-C/part-48", "14 CFR Part 48, Registration and Marking Requirements for Small Unmanned Aircraft"],
  ].map(([p, t]) => ({ title: `eCFR: ${t} (as of Nov 3, 2026)`, url: `${B}/${p}`, checked: CHECKED })),
  {
    title: "FAA-S-ACS-10B, Remote Pilot – Small Unmanned Aircraft Systems Airman Certification Standards (April 2021)",
    url: "https://www.faa.gov/training_testing/testing/acs/uas_acs.pdf",
    checked: CHECKED,
  },
  {
    title: "FAA-G-8082-22, Remote Pilot – Small Unmanned Aircraft Systems Study Guide (August 2016)",
    url: "https://www.faa.gov/sites/faa.gov/files/uas/resources/policy_library/remote_pilot_study_guide.pdf",
    checked: CHECKED,
  },
];

export default function Faa107Page() {
  const c = OSHA_CLUSTERS["faa-107"];
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
        { label: "FAA Part 107" },
      ]}
      title="FAA Part 107 remote pilot"
      lead="Practice questions and study guides on the rules in 14 CFR Part 107, Remote ID and drone registration, and on the knowledge areas of the FAA Remote Pilot knowledge test: airspace, weather, loading and performance, and operations."
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
              Rules come from the current eCFR text of 14 CFR Parts 107, 89 and 48. Background knowledge (airspace
              classes, weather, performance, decision-making) comes from the FAA Remote Pilot Study Guide, which is
              dated August 2016; where rules changed after that, we quote the current regulation instead. The FAA test
              also asks you to read sectional charts, which these text pages do not reproduce. {c.independence}
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">What the knowledge test covers</h2>
            <p className="mt-3">
              The FAA Remote Pilot Airman Certification Standards (FAA-S-ACS-10B, April 2021) list five areas:
              Regulations (15–25% of the test), Airspace and Requirements (15–25%), Weather (11–16%), Loading and
              Performance (7–11%) and Operations (35–45%).
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

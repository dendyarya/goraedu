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
  title: "CDL Federal Rules (FMCSA, 49 CFR): Free Practice Questions and Study Guides",
  description:
    "Free practice questions and study guides on the federal FMCSA rules every CDL driver must know: license standards, hours of service, inspections, drug and alcohol testing.",
  alternates: { canonical: "/cdl/" },
};

const CHECKED = "2026-11-05";
const BASE = "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B";

// Each fact: our plain-English statement plus the exact words of 49 CFR it rests on.
// The build fails if a quote is not in the dated eCFR snapshot (data/sources/ecfr).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "A person who operates a commercial motor vehicle may hold only one driver's license.",
    quote: "No person who operates a commercial motor vehicle shall at any time have more than one driver's license.",
    cite: "49 CFR 383.21",
    url: `${BASE}/part-383/subpart-B/section-383.21`,
  },
  {
    text: "A property-carrying driver may drive a total of 11 hours within the 14-hour period that follows 10 consecutive hours off duty.",
    quote:
      "Driving time. A driver may drive a total of 11 hours during the period specified in paragraph (a)(2) of this section.",
    cite: "49 CFR 395.3(a)(3)(i)",
    url: `${BASE}/part-395/subpart-A/section-395.3`,
  },
  {
    text: "Drivers may not use alcohol or be under its influence within 4 hours before going on duty or operating a commercial motor vehicle.",
    quote:
      "Use alcohol, as defined in § 382.107 of this subchapter, or be under the influence of alcohol, within 4 hours before going on duty or operating, or having physical control of, a commercial motor vehicle;",
    cite: "49 CFR 392.5(a)(1)",
    url: `${BASE}/part-392/subpart-A/section-392.5`,
  },
  {
    text: "Drivers in safety-sensitive functions may not report for or remain on duty with an alcohol concentration of 0.04 or greater.",
    quote:
      "No driver shall report for duty or remain on duty requiring the performance of safety-sensitive functions while having an alcohol concentration of 0.04 or greater.",
    cite: "49 CFR 382.201",
    url: `${BASE}/part-382/subpart-B/section-382.201`,
  },
  {
    text: "Before driving, the driver must be satisfied that the vehicle is in safe operating condition.",
    quote:
      "Before driving a motor vehicle, the driver shall: (a) Be satisfied that the motor vehicle is in safe operating condition;",
    cite: "49 CFR 396.13(a)",
    url: `${BASE}/part-396/section-396.13`,
  },
];

assertQuotes(
  "cdl",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["part-382", "49 CFR Part 382, Controlled Substances and Alcohol Use and Testing"],
    ["part-383", "49 CFR Part 383, Commercial Driver's License Standards; Requirements and Penalties"],
    ["part-391", "49 CFR Part 391, Qualifications of Drivers"],
    ["part-392", "49 CFR Part 392, Driving of Commercial Motor Vehicles"],
    ["part-393/subpart-C", "49 CFR Part 393, Subpart C, Brakes"],
    ["part-393/subpart-I", "49 CFR Part 393, Subpart I, Protection Against Shifting and Falling Cargo"],
    ["part-395", "49 CFR Part 395, Hours of Service of Drivers"],
    ["part-396", "49 CFR Part 396, Inspection, Repair, and Maintenance"],
  ].map(([p, t]) => ({ title: `eCFR: ${t} (as of Nov 3, 2026)`, url: `${BASE}/${p}`, checked: CHECKED })),
];

export default function CdlPage() {
  const c = OSHA_CLUSTERS.cdl;
  const sets = getAllSets().filter((s) => s.cluster === c.id);
  const guides = getAllGuides().filter((g) => g.cluster === c.id);
  const rows = c.sets
    .map((s) => ({ ...s, set: sets.find((x) => x.slug === s.slug), guide: guides.find((x) => x.slug === s.slug) }))
    .filter((r) => r.set || r.guide);
  const tools = TOOLS.filter((t) => t.cluster === c.id);

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "Certifications", href: "/certifications/" }, { label: "CDL" }]}
      title="CDL federal rules"
      lead="Practice questions and study guides on the federal motor carrier safety rules in 49 CFR that apply to commercial driver's license holders: license standards, driver qualifications, hours of service, inspections, brakes, cargo securement and drug and alcohol testing."
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
              CDL knowledge tests are given by each state, from that state&apos;s commercial driver manual. Much of a
              state test is about driving skills and vehicle systems that are not written in federal rules. These pages
              cover only the federal rules in 49 CFR, quoted word for word, so use them alongside your state&apos;s
              official CDL manual. {c.independence}
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
                      {t.name.replace("CDL ", "").replace(/^./, (ch) => ch.toUpperCase())}
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

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import SourceList, { type Source } from "@/components/SourceList";
import TradeIcon from "@/components/TradeIcon";
import { assertQuotes, getAllGuides } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_CLUSTERS, OSHA_INDEPENDENCE, OSHA_SHARED } from "@/lib/osha";
import { getAllSets } from "@/lib/questions";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "OSHA General Industry Safety (29 CFR 1910): Free Practice Questions and Study Guides",
  description:
    "Free practice questions and study guides on the OSHA general industry rules behind the OSHA 10 and 30 topics: exits, electrical, PPE, lockout/tagout, forklifts.",
  alternates: { canonical: "/osha-general-industry/" },
};

const CHECKED = "2026-11-05";
const BASE = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910";

// Each fact: our plain-English statement plus the exact words of 29 CFR Part 1910 it rests on.
// The build fails if a quote is not in the dated eCFR snapshot (data/sources/ecfr).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "Workers on a walking-working surface with an unprotected side or edge 4 feet or more above a lower level must be protected from falling, except where the subpart provides otherwise.",
    quote:
      "Except as provided elsewhere in this section, the employer must ensure that each employee on a walking-working surface with an unprotected side or edge that is 4 feet (1.2 m) or more above a lower level is protected from falling by one or more of the following:",
    cite: "29 CFR 1910.28(b)(1)(i)",
    url: `${BASE}/subpart-D/section-1910.28`,
  },
  {
    text: "Exit routes must be free and unobstructed.",
    quote: "Exit routes must be free and unobstructed.",
    cite: "29 CFR 1910.37(a)(3)",
    url: `${BASE}/subpart-E/section-1910.37`,
  },
  {
    text: "Employers must assess the workplace for hazards that call for personal protective equipment.",
    quote:
      "The employer shall assess the workplace to determine if hazards are present, or are likely to be present, which necessitate the use of personal protective equipment (PPE).",
    cite: "29 CFR 1910.132(d)(1)",
    url: `${BASE}/subpart-I/section-1910.132`,
  },
  {
    text: "Before servicing or maintenance where unexpected startup could injure someone, the machine must be isolated from its energy source and made inoperative under an energy control program.",
    quote:
      "The employer shall establish a program consisting of energy control procedures, employee training and periodic inspections to ensure that before any employee performs any servicing or maintenance on a machine or equipment where the unexpected energizing, start up or release of stored energy could occur and cause injury, the machine or equipment shall be isolated from the energy source, and rendered inoperative.",
    cite: "29 CFR 1910.147(c)(1)",
    url: `${BASE}/subpart-J/section-1910.147`,
  },
  {
    text: "Each powered industrial truck (forklift) operator must be shown competent through the rule's training and evaluation.",
    quote:
      "The employer shall ensure that each powered industrial truck operator is competent to operate a powered industrial truck safely, as demonstrated by the successful completion of the training and evaluation specified in this paragraph (l).",
    cite: "29 CFR 1910.178(l)(1)(i)",
    url: `${BASE}/subpart-N/section-1910.178`,
  },
];

assertQuotes(
  "osha-general-industry",
  FACTS.map((f) => f.quote),
);

const SOURCES: Source[] = [
  ...[
    ["subpart-D", "29 CFR Part 1910, Subpart D, Walking-Working Surfaces"],
    ["subpart-E", "29 CFR Part 1910, Subpart E, Exit Routes and Emergency Planning"],
    ["subpart-I", "29 CFR Part 1910, Subpart I, Personal Protective Equipment"],
    ["subpart-L", "29 CFR Part 1910, Subpart L, Fire Protection"],
    ["subpart-O", "29 CFR Part 1910, Subpart O, Machinery and Machine Guarding"],
    ["subpart-S", "29 CFR Part 1910, Subpart S, Electrical"],
    ["subpart-G/section-1910.95", "29 CFR 1910.95, Occupational noise exposure"],
    ["subpart-J/section-1910.147", "29 CFR 1910.147, The control of hazardous energy (lockout/tagout)"],
    ["subpart-N/section-1910.178", "29 CFR 1910.178, Powered industrial trucks"],
    ["subpart-Z/section-1910.1030", "29 CFR 1910.1030, Bloodborne pathogens"],
  ].map(([p, t]) => ({ title: `eCFR: ${t} (as of Nov 3, 2026)`, url: `${BASE}/${p}`, checked: CHECKED })),
  {
    title: "OSHA Outreach Training Program: General Industry Procedures (revised July 1, 2024)",
    url: "https://www.osha.gov/sites/default/files/OTP_General_Industry_Procedures_2024.pdf",
    checked: CHECKED,
  },
];

export default function OshaGeneralIndustryPage() {
  const c = OSHA_CLUSTERS["osha-general-industry"];
  const sets = getAllSets().filter((s) => s.cluster === c.id);
  const guides = getAllGuides().filter((g) => g.cluster === c.id);
  const rows = c.sets
    .map((s) => ({ ...s, set: sets.find((x) => x.slug === s.slug), guide: guides.find((x) => x.slug === s.slug) }))
    .filter((r) => r.set || r.guide);
  const shared = OSHA_SHARED.map((slug) => ({
    slug,
    set: getAllSets().find((s) => s.cluster === "osha" && s.slug === slug),
    guide: getAllGuides().find((g) => g.cluster === "osha" && g.slug === slug),
    name: OSHA_CLUSTERS.osha.sets.find((s) => s.slug === slug)?.name ?? slug,
  })).filter((r) => r.set || r.guide);
  const tools = TOOLS.filter((t) => t.cluster === c.id);

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "Certifications", href: "/certifications/" }, { label: c.label }]}
      title="OSHA general industry safety rules"
      lead="Practice questions and study guides on the OSHA general industry standards in 29 CFR Part 1910, covering the topics the OSHA 10-hour and 30-hour general industry courses include."
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
              OSHA 10-hour and 30-hour general industry cards come only from authorized trainers in OSHA&apos;s Outreach
              Training Program. {OSHA_INDEPENDENCE} Use these pages to learn and review the rules.
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">What the general industry course covers</h2>
            <p className="mt-3">
              Under OSHA&apos;s Outreach Training Program General Industry Procedures (revised July 1, 2024), the
              10-hour general industry course must include Introduction to OSHA; Walking and Working Surfaces, including
              fall protection; Exit Routes, Emergency Action Plans, Fire Prevention Plans, and Fire Protection;
              Electrical; Personal Protective Equipment; and Hazard Communication. Elective topics include
              Lockout/Tagout, Machine Guarding, Bloodborne Pathogens and Powered Industrial Vehicles, among others. The
              30-hour course adds Managing Safety and Health and Materials Handling to the required topics. Our pages
              follow the general industry standards behind those topics.
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
          {shared.length ? (
            <div className="rounded-3xl border border-line bg-panel p-6">
              <h2 className="text-[1.25rem] font-bold">Shared with construction</h2>
              <p className="mt-2 text-[0.9375rem] text-muted">
                These rules apply in both industries, so each has one set of pages.
              </p>
              <ul className="mt-4 space-y-3">
                {shared.map((r) => (
                  <li key={r.slug} className="rounded-2xl border border-line p-3">
                    <p className="font-bold">{r.name}</p>
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
          ) : null}
          {tools.length ? (
            <div className="rounded-3xl border border-line bg-panel p-6">
              <h2 className="text-[1.25rem] font-bold">Tools</h2>
              <ul className="mt-4 space-y-2">
                {tools.map((t) => (
                  <li key={t.slug}>
                    <Link href={t.href} className="font-semibold text-low underline">
                      {t.name.replace("OSHA ", "").replace(/^./, (ch) => ch.toUpperCase())}
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

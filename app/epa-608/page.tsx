import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import SourceList, { type Source } from "@/components/SourceList";
import TradeIcon from "@/components/TradeIcon";
import { getAllGuides, getAllTopicPages } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";
import { formatDate } from "@/lib/news";
import { getAllSets, SECTION_NAME, universalPool } from "@/lib/questions";

export const metadata: Metadata = {
  title: "EPA 608 Certification: Types, Requirements and Free Practice Tests",
  description:
    "What EPA Section 608 technician certification covers, the four certification types in EPA's words, how certification works, and free practice tests with official sources.",
  alternates: { canonical: "/epa-608/" },
};

const CHECKED = "2026-11-05";

const SOURCES: Source[] = [
  {
    title: "EPA: Section 608 Technician Certification Requirements",
    url: "https://www.epa.gov/section608/section-608-technician-certification-requirements",
    checked: CHECKED,
  },
  {
    title: "EPA: Questions and Answers for Section 608 Certified Technicians",
    url: "https://www.epa.gov/section608/epas-refrigerant-management-program-questions-and-answers-section-608-certified",
    checked: CHECKED,
  },
  {
    title: "EPA: Section 608 Technician Certification (approved programs)",
    url: "https://www.epa.gov/section608/section-608-technician-certification-0",
    checked: CHECKED,
  },
  {
    title: "eCFR: 40 CFR Part 82, Subpart F, Appendix D (as of Nov 3, 2026)",
    url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F",
    checked: CHECKED,
  },
  {
    title: "EPA: Section 608 Technician Certification Test Topics",
    url: "https://www.epa.gov/section608/test-topics",
    checked: CHECKED,
  },
];

const TYPES = [
  { name: "Type I", covers: "Servicing small appliances" },
  {
    name: "Type II",
    covers: "Servicing or disposing of high- or very high-pressure appliances, except small appliances and MVACs",
  },
  { name: "Type III", covers: "Servicing or disposing of low-pressure appliances" },
  { name: "Universal", covers: "Servicing all types of equipment" },
];

const FACTS = [
  "Section 608 technician certification credentials do not expire.",
  "EPA does not give the tests or issue cards. EPA-approved certifying organizations do, and they have up to 30 days after the test to issue results.",
  "Universal certification requires passing the examinations at all levels.",
  "The passing score for the closed-book Type I, Type II, Type III and Universal tests is 70 percent (84 percent for mail-in Type I tests).",
  "Keep a copy of your certification at your place of business until three years after you stop working as a technician. EPA does not require you to carry the card while servicing.",
  "A small appliance is one fully manufactured, charged and hermetically sealed in a factory with five pounds or less of refrigerant.",
  "If you lose your card, contact the organization that certified you. Its name is on the card.",
];

export default function Epa608Page() {
  const sets = getAllSets().filter((x) => x.cluster === "epa-608");
  const tests = ["core", "type-1", "type-2", "type-3"].map((slug) => {
    const set = sets.find((x) => x.slug === slug);
    return { name: SECTION_NAME[slug] ?? slug, href: set?.href, count: set?.questions.length };
  });
  const guides = getAllGuides().filter((x) => x.cluster === "epa-608");
  const topicPages = getAllTopicPages().filter((x) => x.cluster === "epa-608");
  const universal = universalPool();
  tests.push({ name: "Universal exam", href: universal.href, count: universal.sections.length * 25 });

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Certifications", href: "/certifications/" },
        { label: "EPA 608" },
      ]}
      title="EPA Section 608 certification"
      lead="The certification U.S. technicians need to maintain, service or repair refrigeration and air-conditioning equipment, and to dispose of most appliances that contain refrigerant."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <section>
            <h2 className="text-[1.75rem] font-bold">The four certification types</h2>
            <p className="mt-3 text-muted">
              Technicians must pass an EPA-approved test for the type of equipment they work on. These are EPA&apos;s
              descriptions of each type.
            </p>
            <table className="mt-5 w-full border-collapse text-left">
              <caption className="sr-only">EPA Section 608 certification types</caption>
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="w-28 py-2 pr-4 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="py-2 font-semibold">
                    What it covers
                  </th>
                </tr>
              </thead>
              <tbody>
                {TYPES.map((t) => (
                  <tr key={t.name} className="border-b border-line align-top">
                    <th
                      scope="row"
                      className="py-3.5 pr-4 font-[family-name:var(--font-display)] text-[1.1875rem] font-bold [font-stretch:88%]"
                    >
                      {t.name}
                    </th>
                    <td className="py-3.5">{t.covers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">Key facts from EPA</h2>
            <ul className="mt-5 space-y-3.5">
              {FACTS.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-low text-white">
                    <TradeIcon name="check" size={13} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">How to get certified</h2>
            <p className="mt-3">
              Choose a program from{" "}
              <a
                href="https://www.epa.gov/section608/section-608-technician-certification-0"
                className="text-low underline"
                rel="noopener"
              >
                EPA&apos;s list of approved technician certification programs
              </a>{" "}
              and pass its test for the types you need. Study the{" "}
              <a href="https://www.epa.gov/section608/test-topics" className="text-low underline" rel="noopener">
                topics EPA lists for each section
              </a>
              , then use our practice tests to check what you know.
            </p>
          </section>

          <div className="mt-12">
            <SourceList
              sources={SOURCES}
              note={
                <>
                  Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying organization. Found an
                  error? See our{" "}
                  <Link href="/contact/" className="text-low underline">
                    contact page
                  </Link>
                  .
                </>
              }
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-line bg-panel p-6">
            <h2 className="text-[1.25rem] font-bold">Practice tests</h2>
            <ul className="mt-4 space-y-2">
              {tests.map((t) => (
                <li key={t.name}>
                  {t.href ? (
                    <Link
                      href={t.href}
                      className="flex items-center justify-between rounded-xl border border-low/40 bg-low-soft px-4 py-3 font-semibold text-low hover:border-low"
                    >
                      {t.name}
                      <span className="text-[0.875rem] font-medium">{t.count} questions</span>
                    </Link>
                  ) : (
                    <span className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-muted">
                      {t.name}
                      <span className="rounded-full border border-line px-2 text-[0.75rem] leading-5">Soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.9375rem]">
              <Link href="/epa-608/guide/passing-score/" className="text-low underline">
                Exam format and passing score
              </Link>
            </p>
          </div>
          <div className="mt-6 rounded-2xl border border-line bg-panel p-6">
            <h2 className="text-[1.25rem] font-bold">Tools</h2>
            <ul className="mt-4 space-y-2">
              {TOOLS.filter((t) => t.cluster === "epa-608").map((t) => (
                <li key={t.slug}>
                  <Link href={t.href} className="font-semibold text-low underline">
                    {t.name.replace("EPA 608 ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {topicPages.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-line bg-panel p-6">
              <h2 className="text-[1.25rem] font-bold">Rules explained</h2>
              <ul className="mt-4 space-y-2">
                {topicPages.map((g) => (
                  <li key={g.slug}>
                    <Link href={g.href} className="font-semibold text-low underline">
                      {g.title.replace(/^EPA 608 (.)/, (_, c: string) => c.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {guides.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-line bg-panel p-6">
              <h2 className="text-[1.25rem] font-bold">Study guides</h2>
              <ul className="mt-4 space-y-2">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={g.href} className="font-semibold text-low underline">
                      {SECTION_NAME[g.slug] ?? g.slug} study guide
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

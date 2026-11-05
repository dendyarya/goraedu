import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import SourceList, { type Source } from "@/components/SourceList";
import TradeIcon from "@/components/TradeIcon";
import { assertQuotes, getAllGuides, getAllTopicPages } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { getAllSets } from "@/lib/questions";

export const metadata: Metadata = {
  title: "EPA 609 Certification: Who Needs It, Shop Rules and a Free Practice Test",
  description:
    "What EPA Section 609 motor vehicle air conditioning certification covers, who needs it, shop and refrigerant sales rules, and a free practice test with official sources.",
  alternates: { canonical: "/epa-609/" },
};

const CHECKED = "2026-11-05";
const ECFR = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-B";

// Each fact is our plain-English statement plus the exact words from 40 CFR Part 82 Subpart B it rests on.
// The build fails if a quote is not in the dated eCFR snapshot (data/sources/ecfr).
const FACTS: { text: string; quote: string; section: string }[] = [
  {
    text: "Anyone who repairs or services motor vehicle air conditioners for pay must be trained and certified by an EPA-approved program before doing any service involving the refrigerant.",
    quote:
      "Unless any such person repairing or servicing an MVAC has been properly trained and certified by a technician certification program approved by the Administrator pursuant to § 82.40",
    section: "82.34",
  },
  {
    text: "Being paid includes cash, credit, goods or services. Only work done for free is left out.",
    quote:
      "Service for consideration means being paid to perform service, whether it is in cash, credit, goods, or services. This includes all service except that done for free.",
    section: "82.32",
  },
  {
    text: "Simply topping off a system with refrigerant counts as service involving refrigerant.",
    quote:
      "Service involving refrigerant includes any service in which an MVAC or MVAC-like appliance is charged with refrigerant but no other service involving refrigerant is performed (i.e., a “top-off”).",
    section: "82.32",
  },
  {
    text: "Approved programs give each certified technician proof of certification, such as a wallet card, with a unique number.",
    quote:
      "Each certification program must offer individual proof of certification, such as a certificate, wallet-sized card, or display card, upon successful completion of the test. Each certification program must provide a unique number for each certified technician.",
    section: "82.40",
  },
  {
    text: "Containers of class I or class II refrigerant under 20 pounds may only be sold to certified technicians, or to buyers who certify they are for resale only.",
    quote:
      "in a container which contains less than 20 pounds of such refrigerant to any person unless that person is properly trained and certified under § 82.40 or intended the containers for resale only",
    section: "82.34",
  },
  {
    text: "Shops must keep the required records for at least three years, on site.",
    quote:
      "All records required to be maintained pursuant to this section must be kept for a minimum of three years unless otherwise indicated. Entities which service motor vehicle air conditioners for consideration must keep these records on-site.",
    section: "82.42",
  },
  {
    text: "EPA has not set a renewal cycle in the rule, but reserves the right to require recertification later.",
    quote:
      "The Administrator reserves the right to specify the need for technician recertification at some future date, if necessary.",
    section: "82.40",
  },
];

assertQuotes(
  "epa-609",
  FACTS.map((f) => f.quote),
);

const SECTION_TITLE: Record<string, string> = {
  "82.32": "Definitions",
  "82.34": "Prohibitions and required practices",
  "82.40": "Technician training and certification",
  "82.42": "Certification, recordkeeping and public notification requirements",
};

const SOURCES: Source[] = [
  ...["82.32", "82.34", "82.40", "82.42"].map((s) => ({
    title: `eCFR: 40 CFR ${s}, ${SECTION_TITLE[s]} (as of Nov 3, 2026)`,
    url: `${ECFR}/section-${s}`,
    checked: CHECKED,
  })),
  {
    title: "EPA: Section 609 Technician Training and Certification Programs",
    url: "https://www.epa.gov/mvac/section-609-technician-training-and-certification-programs",
    checked: CHECKED,
  },
  {
    title: "EPA: Regulatory Requirements for MVAC System Servicing",
    url: "https://www.epa.gov/mvac/regulatory-requirements-mvac-system-servicing",
    checked: CHECKED,
  },
];

export default function Epa609Page() {
  const set = getAllSets().find((s) => s.cluster === "epa-609");
  const guide = getAllGuides().find((g) => g.cluster === "epa-609");
  const topics = getAllTopicPages().filter((g) => g.cluster === "epa-609");

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Certifications", href: "/certifications/" },
        { label: "EPA 609" },
      ]}
      title="EPA Section 609 certification"
      lead="The certification U.S. technicians need to service motor vehicle air conditioning for pay. These are the rules in 40 CFR Part 82, Subpart B, with the exact words they come from."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <section>
            <h2 className="text-[1.75rem] font-bold">Key facts from the rule</h2>
            <ul className="mt-5 space-y-6">
              {FACTS.map((f) => (
                <li key={f.text} className="flex gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-low text-white">
                    <TradeIcon name="check" size={13} />
                  </span>
                  <div>
                    <p>{f.text}</p>
                    <blockquote className="mt-1.5 text-[0.9375rem] text-muted">&ldquo;{f.quote}&rdquo;</blockquote>
                    <a
                      href={`${ECFR}/section-${f.section}`}
                      className="text-[0.9375rem] text-low underline"
                      rel="noopener"
                    >
                      40 CFR {f.section}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">How to get certified</h2>
            <p className="mt-3">
              Choose a program from{" "}
              <a
                href="https://www.epa.gov/mvac/section-609-technician-training-and-certification-programs"
                className="text-low underline"
                rel="noopener"
              >
                EPA&apos;s list of approved Section 609 training and certification programs
              </a>
              , complete its training and pass its test. Under 40 CFR 82.161, technicians who service MVAC-like
              appliances, such as the air conditioning on agricultural or construction vehicles, may be certified either
              as Section 608 Type II technicians or under Section 609. See{" "}
              <a
                href="https://www.epa.gov/section608/section-608-and-section-609-overlap"
                className="text-low underline"
                rel="noopener"
              >
                EPA&apos;s page on the overlap between Sections 608 and 609
              </a>
              .
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

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-line bg-panel p-6">
            <h2 className="text-[1.25rem] font-bold">Study and practice</h2>
            <ul className="mt-4 space-y-2">
              {set ? (
                <li>
                  <Link
                    href={set.href}
                    className="flex items-center justify-between rounded-xl border border-low/40 bg-low-soft px-4 py-3 font-semibold text-low hover:border-low"
                  >
                    Practice test
                    <span className="text-[0.875rem] font-medium">{set.questions.length} questions</span>
                  </Link>
                </li>
              ) : null}
              {guide ? (
                <li>
                  <Link href={guide.href} className="font-semibold text-low underline">
                    EPA 609 study guide
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          {topics.length > 0 ? (
            <div className="rounded-2xl border border-line bg-panel p-6">
              <h2 className="text-[1.25rem] font-bold">Rules explained</h2>
              <ul className="mt-4 space-y-2">
                {topics.map((g) => (
                  <li key={g.slug}>
                    <Link href={g.href} className="font-semibold text-low underline">
                      {g.title.replace(/^EPA 609 (.)/, (_, c: string) => c.toUpperCase())}
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

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
  title: "Home Inspector Topics: Free Practice Questions on Lead Disclosure and Radon (EPA Rules and Guidance)",
  description:
    "Free practice questions and study guides on EPA's lead-based paint disclosure rule for pre-1978 home sales and leases (40 CFR 745 Subpart F) and EPA's radon testing and reduction guidance.",
  alternates: { canonical: "/home-inspector/" },
};

const CHECKED = "2026-11-15";
const F = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-745/subpart-F";
const RADON = "https://www.epa.gov/sites/default/files/2015-05/documents/hmbuygud.pdf";

// Each fact: our plain-English statement plus the exact words of the source it rests on.
// The build fails if a quote is not in the dated snapshot (data/sources).
const FACTS: { text: string; quote: string; cite: string; url: string }[] = [
  {
    text: "The federal lead disclosure rule covers housing built before 1978, except housing for the elderly or persons with disabilities and 0-bedroom dwellings where no child under 6 lives or is expected to live.",
    quote:
      "Target housing means any housing constructed prior to 1978, except housing for the elderly or persons with disabilities or any 0-bedroom dwelling (unless any child who is less than 6 years of age resides or is expected to reside in such housing).",
    cite: "40 CFR 745.103",
    url: `${F}/section-745.103`,
  },
  {
    text: "Before a buyer or tenant is bound by the contract, the seller or landlord must give them an EPA-approved lead hazard pamphlet and disclose any known lead-based paint or hazards.",
    quote:
      "The seller or lessor shall disclose to the purchaser or lessee the presence of any known lead-based paint and/or lead-based paint hazards in the target housing being sold or leased.",
    cite: "40 CFR 745.107(a)(2)",
    url: `${F}/section-745.107`,
  },
  {
    text: "A buyer gets a 10-day period to have a risk assessment or inspection done, unless both sides agree in writing on a different period; the buyer may also waive it in writing.",
    quote:
      "Before a purchaser is obligated under any contract to purchase target housing, the seller shall permit the purchaser a 10-day period (unless the parties mutually agree, in writing, upon a different period of time) to conduct a risk assessment or inspection for the presence of lead-based paint and/or lead-based paint hazards.",
    cite: "40 CFR 745.110(a)",
    url: `${F}/section-745.110`,
  },
  {
    text: "EPA recommends testing for radon when buying or selling a home, and fixing the home if the level is 4 pCi/L or higher.",
    quote: "Fix the home if the radon level is 4 picocuries per liter (pCi/L) or higher.",
    cite: "EPA, Home Buyer's and Seller's Guide to Radon",
    url: RADON,
  },
];

assertQuotes("home-inspector", [
  ...FACTS.map((f) => f.quote),
  "If you are buying or selling a home, have it tested for radon.",
]);

const SOURCES: Source[] = [
  {
    title:
      "eCFR: 40 CFR Part 745 Subpart F, Disclosure of Known Lead-Based Paint and/or Lead-Based Paint Hazards Upon Sale or Lease of Residential Property (as of Nov 12, 2026)",
    url: F,
    checked: CHECKED,
  },
  {
    title: "EPA: Real Estate Disclosures about Potential Lead Hazards",
    url: "https://www.epa.gov/lead/real-estate-disclosures-about-potential-lead-hazards",
    checked: CHECKED,
  },
  { title: "EPA: Home Buyer's and Seller's Guide to Radon (revised March 2024)", url: RADON, checked: CHECKED },
  {
    title: "EPA: A Citizen's Guide to Radon (EPA 402/K-12/002, 2025 edition)",
    url: "https://www.epa.gov/sites/default/files/2016-12/documents/2016_a_citizens_guide_to_radon.pdf",
    checked: CHECKED,
  },
  {
    title: "EPA: Consumer's Guide to Radon Reduction (EPA 402/K-10/005, 2025 edition)",
    url: "https://www.epa.gov/sites/default/files/2016-12/documents/2016_consumers_guide_to_radon_reduction.pdf",
    checked: CHECKED,
  },
];

export default function HomeInspectorPage() {
  const c = OSHA_CLUSTERS["home-inspector"];
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
        { label: "Home inspector" },
      ]}
      title="Home inspector topics: lead disclosure and radon"
      lead="Practice questions and study guides on two federal topics that come up in home sales and inspections: EPA's lead-based paint disclosure rule for pre-1978 housing, and EPA's guidance on testing for and reducing radon."
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <CoverageBox cluster="home-inspector" />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">Scope and sources</h2>
            <p className="mt-2">
              Everything here comes from the current eCFR text of 40 CFR Part 745 Subpart F and from EPA&apos;s
              published radon guides. EPA&apos;s radon guides are recommendations, not regulations. State home inspector
              licensing rules, standards of practice, building systems, HUD&apos;s matching disclosure rule and any
              State or national exam are not covered. These pages help you study; they are not a course or exam. Home
              inspector licensing is set by each State, and State and local rules may add their own requirements, so
              check yours too. {c.independence}
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">Key points, in the sources&apos; words</h2>
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

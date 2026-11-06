import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { FAA_INDEPENDENCE_TEXT } from "@/lib/osha";
import { getAllSets } from "@/lib/questions";

const COUNT = 60;
const PASS = 70;
const MATRIX = "https://www.faa.gov/training_testing/testing/testing_matrix";
const MATRIX_CHECKED = "2026-11-06";
const ACS = "https://www.faa.gov/training_testing/testing/acs/uas_acs.pdf";
const TIME_QUOTE = "The knowledge test applicant has up to two hours to complete the test.";
// The ACS's knowledge test weights by Area of Operation (page "Remote Pilot Knowledge Test Areas").
const AREA_QUOTES = [
  "I. Regulations 15-25%",
  "II. Airspace & Requirements 15-25%",
  "III. Weather 11-16%",
  "IV. Loading & Performance 7-11%",
  "V. Operations 35-45%",
];
assertQuotes("faa-107", [TIME_QUOTE, ...AREA_QUOTES]);

// Our split of the 60 questions, each count inside the ACS range for its area (our calculation).
const AREAS: { name: string; range: string; count: number; sets: string[]; topics?: string[] }[] = [
  {
    name: "Regulations",
    range: "15–25%",
    count: 12,
    sets: ["operating-rules", "operations-over-people", "remote-pilot-certificate", "registration-remote-id"],
  },
  { name: "Airspace and requirements", range: "15–25%", count: 12, sets: ["airspace"] },
  { name: "Weather", range: "11–16%", count: 8, sets: ["weather"] },
  {
    name: "Loading and performance",
    range: "7–11%",
    count: 5,
    sets: ["loading-performance", "operations-safety"],
    topics: ["Weight and balance", "Load factor and stalls", "Performance and air density"],
  },
  {
    name: "Operations",
    range: "35–45%",
    count: 23,
    sets: ["airport-operations-radio", "aeronautical-decision-making", "operations-safety"],
  },
];

export const metadata: Metadata = {
  title: "FAA Part 107 Practice Exam (60 Questions, Free, with Official Sources)",
  description:
    "A free 60-question practice exam for the FAA Remote Pilot (Part 107) knowledge test, scored against the 70 percent passing score in the FAA Airman Knowledge Testing Matrix.",
  alternates: { canonical: "/faa-107/practice-exam/" },
};

export default function Part107PracticeExamPage() {
  const sets = getAllSets().filter((s) => s.cluster === "faa-107");
  const questions = sets.flatMap((s) => s.questions);
  // operations-safety is split by topic: its loading and performance topics go to that area, the rest to Operations.
  const taken = new Set<string>();
  const areas = AREAS.map((a) => {
    const ids = sets
      .filter((s) => a.sets.includes(s.slug))
      .flatMap((s) => s.questions)
      .filter((q) => !taken.has(q.id))
      .filter((q) => !a.topics || q.id.startsWith("lp-") || a.topics.includes(q.topic))
      .map((q) => q.id);
    ids.forEach((id) => taken.add(id));
    return { name: a.name, count: a.count, ids };
  });
  const checked = questions
    .map((q) => q.checked)
    .sort()
    .at(-1)!;

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "FAA Part 107", href: "/faa-107/" }, { label: "Practice exam" }]}
      title="FAA Part 107 practice exam"
      lead={`${COUNT} questions drawn at random from our ${questions.length}-question bank and scored against the ${PASS} percent passing score the FAA lists for the Unmanned Aircraft General – Small (UAG) knowledge test. Each answer is explained and linked to its official source.`}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <PracticeTest
            title="FAA Part 107 practice exam"
            questions={questions}
            drawTotal={COUNT}
            areas={areas}
            passPct={PASS}
            passNote="The passing score the FAA Airman Knowledge Testing Matrix lists for the UAG test."
            timeLimitMin={120}
            timeNote="The FAA Remote Pilot Airman Certification Standards (FAA-S-ACS-10B) say the applicant has up to two hours."
          />
        </div>
        <aside className="space-y-6 text-[0.9375rem]">
          <div className="rounded-3xl border border-line bg-panel p-5">
            <h2 className="text-[1.125rem] font-bold">The real test, per the FAA</h2>
            <p className="mt-3 text-muted">
              The FAA Airman Knowledge Testing Matrix lists the Unmanned Aircraft General – Small (UAG) test with{" "}
              {COUNT} questions and a passing score of {PASS}.
            </p>
            <p className="mt-2">
              <a href={MATRIX} className="text-low underline" rel="noopener">
                FAA Airman Knowledge Testing Matrix
              </a>{" "}
              <span className="text-muted">(revised 9/25/26, checked {formatDate(MATRIX_CHECKED)})</span>
            </p>
            <blockquote className="mt-3 text-muted">&ldquo;{TIME_QUOTE}&rdquo;</blockquote>
            <p className="mt-3 text-muted">
              The same Airman Certification Standards weight the test by area. Our split of the {COUNT} questions (our
              calculation, inside each range):
            </p>
            <ul className="mt-2 space-y-1">
              {AREAS.map((a) => (
                <li key={a.name}>
                  {a.name}: <span className="text-muted">ACS {a.range}</span>, ours {a.count}
                </li>
              ))}
            </ul>
            <p className="mt-1">
              <a href={ACS} className="text-low underline" rel="noopener">
                FAA-S-ACS-10B, Remote Pilot Airman Certification Standards
              </a>
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-panel p-5 text-muted">
            <p>
              A practice exam, not the official test, and a practice score does not predict your result. Our questions
              are our own, written from 14 CFR Part 107 and FAA study materials; they do not cover every area of the
              FAA&apos;s Airman Certification Standards for the test.
            </p>
            <p className="mt-3">
              {FAA_INDEPENDENCE_TEXT} Spot an error?{" "}
              <Link href="/contact/" className="text-low underline">
                Tell us
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

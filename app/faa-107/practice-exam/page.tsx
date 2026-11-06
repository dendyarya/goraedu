import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import { formatDate } from "@/lib/news";
import { FAA_INDEPENDENCE_TEXT } from "@/lib/osha";
import { getAllSets } from "@/lib/questions";

const COUNT = 60;
const PASS = 70;
const MATRIX = "https://www.faa.gov/training_testing/testing/testing_matrix";
const MATRIX_CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "FAA Part 107 Practice Exam (60 Questions, Free, with Official Sources)",
  description:
    "A free 60-question practice exam for the FAA Remote Pilot (Part 107) knowledge test, scored against the 70 percent passing score in the FAA Airman Knowledge Testing Matrix.",
  alternates: { canonical: "/faa-107/practice-exam/" },
};

export default function Part107PracticeExamPage() {
  const sets = getAllSets().filter((s) => s.cluster === "faa-107");
  const questions = sets.flatMap((s) => s.questions);
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
            passPct={PASS}
            passNote="The passing score the FAA Airman Knowledge Testing Matrix lists for the UAG test."
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

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import QuestionReview from "@/components/QuestionReview";
import { getAllGuides } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { getSet, lastChecked, topicsOf } from "@/lib/questions";

export const metadata: Metadata = {
  title: "EPA 609 Practice Test (Free, with Official Sources)",
  description:
    "Free EPA Section 609 motor vehicle air conditioning practice questions. Every answer is explained and linked to the section of 40 CFR Part 82 (Subparts B and G) it comes from.",
  alternates: { canonical: "/epa-609/practice-test/" },
};

export default function Epa609PracticeTestPage() {
  const set = getSet("epa-609", "mvac");
  const checked = lastChecked(set);
  const topics = topicsOf(set);
  const guide = getAllGuides().find((g) => g.cluster === "epa-609");

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "EPA 609", href: "/epa-609/" }, { label: "Practice test" }]}
      title="EPA 609 practice test"
      lead={`${set.questions.length} free practice questions on the Section 609 rules for motor vehicle air conditioning. Each answer is explained and linked to the official source it comes from.`}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <PracticeTest title="EPA 609" questions={set.questions} />
          <QuestionReview title="EPA 609" questions={set.questions} />
        </div>
        <aside className="space-y-6 text-[0.9375rem]">
          {guide ? (
            <div className="rounded-3xl border border-low/40 bg-low-soft p-5">
              <h2 className="text-[1.125rem] font-bold">Study first</h2>
              <p className="mt-2 text-muted">
                Every point of the Section 609 rules, with the exact words of the regulation.
              </p>
              <Link href={guide.href} className="mt-3 inline-block font-semibold text-low underline">
                EPA 609 study guide
              </Link>
            </div>
          ) : null}
          <div className="rounded-3xl border border-line bg-panel p-5">
            <h2 className="text-[1.125rem] font-bold">Topics in this set</h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {topics.map((t) => (
                <li key={t}>
                  {t} ({set.questions.filter((q) => q.topic === t).length})
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-panel p-5 text-muted">
            <p>
              These are our own questions, written from 40 CFR Part 82, Subparts B and G. They are not questions from
              any real exam or any approved training program&apos;s test. We add questions as each one passes our{" "}
              <Link href="/question-writing-standards/" className="text-low underline">
                writing standards
              </Link>
              .
            </p>
            <p className="mt-3">
              Not affiliated with or endorsed by the U.S. EPA. Spot an error?{" "}
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

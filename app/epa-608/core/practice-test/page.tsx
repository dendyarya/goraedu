import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import { formatDate } from "@/lib/news";
import { getSet, lastChecked, topicsOf } from "@/lib/questions";

const set = getSet("epa-608", "core");

export const metadata: Metadata = {
  title: "EPA 608 Core Practice Test (Free, with Official Sources)",
  description: set.description,
  alternates: { canonical: set.href },
};

export default function CorePracticeTestPage() {
  const checked = lastChecked(set);
  const topics = topicsOf(set);
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "EPA 608", href: "/epa-608/" }, { label: "Core practice test" }]}
      title="EPA 608 Core practice test"
      lead={`${set.questions.length} free practice questions on the Core section. Each answer is explained and linked to the EPA page it comes from.`}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <PracticeTest title="EPA 608 Core" questions={set.questions} />
        </div>
        <aside className="space-y-6 text-[0.9375rem]">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <h2 className="text-[1.125rem] font-bold">Topics in this set</h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {topics.map((t) => (
                <li key={t}>
                  {t} ({set.questions.filter((q) => q.topic === t).length})
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-panel p-5 text-muted">
            <p>
              These are our own questions, written from EPA&apos;s published rules and test topics. They are not
              questions from any real exam. We add questions as each one passes our{" "}
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

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import { formatDate } from "@/lib/news";
import { universalPool } from "@/lib/questions";

const PER_SECTION = 25;

export const metadata: Metadata = {
  title: "EPA 608 Universal Practice Exam (100 Questions, Free, with Official Sources)",
  description:
    "A free 100-question EPA 608 Universal practice exam: 25 random questions each from Core, Type I, Type II and Type III, with every answer explained and linked to 40 CFR Part 82.",
  alternates: { canonical: "/epa-608/universal/practice-test/" },
};

export default function UniversalPracticeTestPage() {
  const pool = universalPool();
  const checked = pool.questions
    .map((q) => q.checked)
    .sort()
    .at(-1)!;
  const total = pool.sections.length * PER_SECTION;

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA 608", href: "/epa-608/" },
        { label: "Universal practice exam" },
      ]}
      title="EPA 608 Universal practice exam"
      lead={`${total} questions, ${PER_SECTION} from each of ${new Intl.ListFormat("en-US").format(pool.sections)}, drawn at random from our ${pool.questions.length}-question bank. Each answer is explained and linked to the official source it comes from.`}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <PracticeTest
            title="EPA 608 Universal"
            questions={pool.questions}
            drawPerTopic={PER_SECTION}
            passPct={70}
            passNote="The passing score the EPA rule sets for closed-book tests (40 CFR Part 82, Subpart F, Appendix D)."
          />
        </div>
        <aside className="space-y-6 text-[0.9375rem]">
          <div className="rounded-3xl border border-line bg-panel p-5">
            <h2 className="text-[1.125rem] font-bold">How the real Universal test is built</h2>
            <p className="mt-3 text-muted">
              Under Appendix D of 40 CFR Part 82 Subpart F, Universal tests have 100 questions: 25 from Group 1 (Core)
              and 25 from each of Type I, Type II and Type III. They may be taken all at once or by combining passing
              scores on separate Type I, II and III tests. Mail-in Type I tests cannot count toward Universal.
            </p>
            <p className="mt-3">
              <Link href="/epa-608/guide/passing-score/" className="text-low underline">
                Exam format and passing score
              </Link>
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-panel p-5">
            <h2 className="text-[1.125rem] font-bold">Practice one section</h2>
            <ul className="mt-3 space-y-1.5">
              {[
                ["Core", "/epa-608/core/practice-test/"],
                ["Type I", "/epa-608/type-1/practice-test/"],
                ["Type II", "/epa-608/type-2/practice-test/"],
                ["Type III", "/epa-608/type-3/practice-test/"],
              ]
                .filter(([name]) => pool.sections.includes(name!))
                .map(([name, href]) => (
                  <li key={href}>
                    <Link href={href!} className="text-low underline">
                      {name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-panel p-5 text-muted">
            <p>
              These are our own questions, written from the EPA rules in 40 CFR Part 82 and EPA&apos;s published
              guidance. They are not questions from any real exam.
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

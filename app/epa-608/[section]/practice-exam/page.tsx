import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { SECTION_NAME, typeExamPool } from "@/lib/questions";

export const dynamicParams = false;

const PER_SECTION = 25;
const PASS = 70;
const APPENDIX_D = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F";
const QUOTES = [
  "Each test must include 25 questions drawn from Group 1 and 25 questions drawn from each relevant technical Group.",
  "The passing score for the closed-book Type I, Type II, Type III and Universal certification test is 70 percent. The passing score for Type I certification tests using the mail-in format is 84 percent.",
];
assertQuotes("epa-608", QUOTES);

export function generateStaticParams() {
  return ["type-1", "type-2", "type-3"].filter((s) => typeExamPool(s)).map((section) => ({ section }));
}

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).section;
  const pool = typeExamPool(slug);
  if (!pool) return {};
  const name = SECTION_NAME[slug]!;
  return {
    title: `EPA 608 ${name} Practice Exam (50 Questions, Free, with Official Sources)`,
    description: `A free 50-question EPA 608 ${name} practice exam in the format 40 CFR Part 82 Appendix D sets: 25 Core and 25 ${name} questions, scored against the 70 percent passing score.`,
    alternates: { canonical: pool.href },
  };
}

export default async function TypePracticeExamPage({ params }: Props) {
  const slug = (await params).section;
  const pool = typeExamPool(slug);
  if (!pool) notFound();
  const name = SECTION_NAME[slug]!;
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
        { label: `${name} practice exam` },
      ]}
      title={`EPA 608 ${name} practice exam`}
      lead={`${total} questions, ${PER_SECTION} Core and ${PER_SECTION} ${name}, drawn at random from our bank and scored against the ${PASS} percent passing score in the EPA rule. Each answer is explained and linked to its official source.`}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <PracticeTest
            title={`EPA 608 ${name} practice exam`}
            questions={pool.questions}
            drawPerTopic={PER_SECTION}
            passPct={PASS}
            passNote="The passing score the EPA rule sets for closed-book tests (40 CFR Part 82, Subpart F, Appendix D)."
          />
        </div>
        <aside className="space-y-6 text-[0.9375rem]">
          <div className="rounded-3xl border border-line bg-panel p-5">
            <h2 className="text-[1.125rem] font-bold">How the real test is built</h2>
            <blockquote className="mt-3 text-muted">&ldquo;{QUOTES[0]}&rdquo;</blockquote>
            <blockquote className="mt-3 text-muted">&ldquo;{QUOTES[1]}&rdquo;</blockquote>
            <p className="mt-2">
              <a href={APPENDIX_D} className="text-low underline" rel="noopener">
                40 CFR Part 82, Subpart F, Appendix D
              </a>
            </p>
            <p className="mt-3">
              <Link href="/epa-608/guide/passing-score/" className="text-low underline">
                Exam format and passing score
              </Link>
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-panel p-5 text-muted">
            <p>
              A practice exam, not the official test. The official test is given by an EPA-approved certifying program
              using questions from EPA&apos;s test bank; ours are our own questions written from the rule. A practice
              score does not predict your result.
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

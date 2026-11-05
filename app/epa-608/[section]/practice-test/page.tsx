import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import QuestionReview from "@/components/QuestionReview";
import { getAllGuides } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { getAllSets, lastChecked, SECTION_NAME, topicsOf } from "@/lib/questions";

export const dynamicParams = false;

const setsFor = () => getAllSets().filter((s) => s.cluster === "epa-608");

export function generateStaticParams() {
  return setsFor().map((s) => ({ section: s.slug }));
}

type Props = { params: Promise<{ section: string }> };

function find(section: string) {
  return setsFor().find((s) => s.slug === section);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const set = find((await params).section);
  if (!set) return {};
  const name = SECTION_NAME[set.slug] ?? set.slug;
  return {
    title: `EPA 608 ${name} Practice Test (Free, with Official Sources)`,
    description: set.description,
    alternates: { canonical: set.href },
  };
}

export default async function SectionPracticeTestPage({ params }: Props) {
  const set = find((await params).section);
  if (!set) notFound();
  const name = SECTION_NAME[set.slug] ?? set.slug;
  const checked = lastChecked(set);
  const topics = topicsOf(set);
  const others = setsFor().filter((s) => s.slug !== set.slug);
  const guide = getAllGuides().find((g) => g.cluster === "epa-608" && g.slug === set.slug);

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA 608", href: "/epa-608/" },
        { label: `${name} practice test` },
      ]}
      title={`EPA 608 ${name} practice test`}
      lead={`${set.questions.length} free practice questions on the ${name} section. Each answer is explained and linked to the official source it comes from.`}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <PracticeTest title={`EPA 608 ${name}`} questions={set.questions} />
          <QuestionReview title={`EPA 608 ${name}`} questions={set.questions} />
        </div>
        <aside className="space-y-6 text-[0.9375rem]">
          {guide ? (
            <div className="rounded-2xl border border-low/40 bg-low-soft p-5">
              <h2 className="text-[1.125rem] font-bold">Study first</h2>
              <p className="mt-2 text-muted">
                Every point of the {name} rules, with the exact words of the regulation.
              </p>
              <Link href={guide.href} className="mt-3 inline-block font-semibold text-low underline">
                {name} study guide
              </Link>
            </div>
          ) : null}
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
          {others.length > 0 ? (
            <div className="rounded-2xl border border-line bg-panel p-5">
              <h2 className="text-[1.125rem] font-bold">Other EPA 608 sections</h2>
              <ul className="mt-3 space-y-1.5">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className="text-low underline">
                      {SECTION_NAME[s.slug] ?? s.slug} ({s.questions.length} questions)
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                <Link href="/epa-608/guide/passing-score/" className="text-low underline">
                  Exam format and passing score
                </Link>
              </p>
            </div>
          ) : null}
          <div className="rounded-2xl border border-line bg-panel p-5 text-muted">
            <p>
              These are our own questions, written from the EPA rules in 40 CFR Part 82 and EPA&apos;s published
              guidance. They are not questions from any real exam. We add questions as each one passes our{" "}
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import QuestionReview from "@/components/QuestionReview";
import { getAllGuides } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_INDEPENDENCE, OSHA_SETS, oshaSetName } from "@/lib/osha";
import { getAllSets, lastChecked, topicsOf } from "@/lib/questions";

export const dynamicParams = false;

const setsFor = () => getAllSets().filter((s) => s.cluster === "osha");

export function generateStaticParams() {
  return setsFor().map((s) => ({ set: s.slug }));
}

type Props = { params: Promise<{ set: string }> };
const find = (slug: string) => setsFor().find((s) => s.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const set = find((await params).set);
  if (!set) return {};
  return {
    title: `OSHA Construction ${oshaSetName(set.slug)} Practice Questions (29 CFR 1926)`,
    description: set.description,
    alternates: { canonical: set.href },
  };
}

export default async function OshaPracticePage({ params }: Props) {
  const set = find((await params).set);
  if (!set) notFound();
  const name = oshaSetName(set.slug);
  const meta = OSHA_SETS.find((s) => s.slug === set.slug);
  const checked = lastChecked(set);
  const topics = topicsOf(set);
  const guide = getAllGuides().find((g) => g.cluster === "osha" && g.slug === set.slug);
  const others = setsFor().filter((s) => s.slug !== set.slug);

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "OSHA Construction", href: "/osha/" },
        { label: `${name} practice` },
      ]}
      title={`OSHA construction ${name.toLowerCase()} practice questions`}
      lead={`${set.questions.length} free practice questions from ${meta ? meta.rule : "29 CFR Part 1926"}. Each answer is explained and linked to the rule it comes from.`}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <PracticeTest title={`OSHA ${name}`} questions={set.questions} />
          <QuestionReview title={`OSHA ${name}`} questions={set.questions} />
        </div>
        <aside className="space-y-6 text-[0.9375rem]">
          {guide ? (
            <div className="rounded-3xl border border-low/40 bg-low-soft p-5">
              <h2 className="text-[1.125rem] font-bold">Study first</h2>
              <p className="mt-2 text-muted">The {name.toLowerCase()} rules, with the exact words of the regulation.</p>
              <Link href={guide.href} className="mt-3 inline-block font-semibold text-low underline">
                {name} study guide
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
          {others.length ? (
            <div className="rounded-3xl border border-line bg-panel p-5">
              <h2 className="text-[1.125rem] font-bold">Other OSHA topics</h2>
              <ul className="mt-3 space-y-1.5">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className="text-low underline">
                      {oshaSetName(s.slug)} ({s.questions.length})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-3xl border border-line bg-panel p-5 text-muted">
            <p>
              Our own questions, written from the OSHA construction standards in 29 CFR Part 1926. They are not
              questions from any OSHA Outreach course or trainer.
            </p>
            <p className="mt-3">{OSHA_INDEPENDENCE}</p>
            <p className="mt-3">
              Spot an error?{" "}
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

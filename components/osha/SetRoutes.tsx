// Shared route logic for OSHA topic sets (practice test and study guide pages) in both OSHA clusters.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideBody from "@/components/guide/GuideBody";
import PageShell from "@/components/PageShell";
import PracticeTest from "@/components/PracticeTest";
import QuestionReview from "@/components/QuestionReview";
import { getAllGuides, guideChecked } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_CLUSTERS, type OshaClusterId, oshaPageTitle, oshaRank, oshaSetName } from "@/lib/osha";
import { getAllSets, lastChecked, topicsOf } from "@/lib/questions";

type Props = { params: Promise<{ set: string }> };

const intro = (name: string) => name.startsWith("Introduction");

/** Lowercases word-initial capitals but keeps acronyms such as RTCR or ID. */
const lower = (name: string) => name.replace(/\b([A-Z])(?=[a-z])/g, (m) => m.toLowerCase());

export function practiceRoute(cluster: OshaClusterId) {
  const c = OSHA_CLUSTERS[cluster];
  const setsFor = () =>
    getAllSets()
      .filter((s) => s.cluster === cluster)
      .sort((a, b) => oshaRank(cluster, a.slug) - oshaRank(cluster, b.slug));
  const find = (slug: string) => setsFor().find((s) => s.slug === slug);

  return {
    generateStaticParams: () => setsFor().map((s) => ({ set: s.slug })),
    generateMetadata: async ({ params }: Props): Promise<Metadata> => {
      const set = find((await params).set);
      if (!set) return {};
      return {
        title: oshaPageTitle(set.slug, "Practice Questions", cluster),
        description: set.description,
        alternates: { canonical: set.href },
      };
    },
    Page: async function OshaPracticePage({ params }: Props) {
      const set = find((await params).set);
      if (!set) notFound();
      const name = oshaSetName(set.slug, cluster);
      const meta = c.sets.find((s) => s.slug === set.slug);
      const checked = lastChecked(set);
      const topics = topicsOf(set);
      const guide = getAllGuides().find((g) => g.cluster === cluster && g.slug === set.slug);
      const others = setsFor().filter((s) => s.slug !== set.slug);
      const label = intro(name)
        ? name
        : cluster === "water-operator"
          ? `Drinking water ${lower(name)}`
          : cluster === "wastewater-operator"
            ? `Wastewater ${lower(name)}`
            : cluster === "lead-rrp"
              ? `Lead RRP ${lower(name)}`
              : cluster === "osha-crane"
                ? `Crane ${lower(name)}`
                : cluster === "forklift"
                  ? `Forklift ${lower(name)}`
                  : `${cluster === "cdl" ? "CDL" : cluster === "faa-107" ? "Part 107" : "OSHA"} ${name}`;

      return (
        <PageShell
          crumbs={[{ label: "Home", href: "/" }, { label: c.label, href: c.href }, { label: `${name} practice` }]}
          title={set.title}
          lead={`${set.questions.length} free practice questions from ${meta ? meta.rule : c.part}. Each answer is explained and linked to the rule it comes from.`}
          meta={
            <>
              Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
            </>
          }
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
            <div className="min-w-0">
              <PracticeTest title={label} questions={set.questions} />
              <QuestionReview title={label} questions={set.questions} />
            </div>
            <aside className="space-y-6 text-[0.9375rem]">
              {guide ? (
                <div className="rounded-3xl border border-low/40 bg-low-soft p-5">
                  <h2 className="text-[1.125rem] font-bold">Study first</h2>
                  <p className="mt-2 text-muted">
                    The {intro(name) ? "OSHA inspection and recordkeeping" : lower(name)} rules, with the exact words of
                    the regulation.
                  </p>
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
                  <h2 className="text-[1.125rem] font-bold">Other {c.label} topics</h2>
                  <ul className="mt-3 space-y-1.5">
                    {others.map((s) => (
                      <li key={s.slug}>
                        <Link href={s.href} className="text-low underline">
                          {oshaSetName(s.slug, cluster)} ({s.questions.length})
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="rounded-3xl border border-line bg-panel p-5 text-muted">
                <p>
                  Our own questions, written from {meta ? meta.rule : c.part}. They are not questions from {c.notFrom}.
                </p>
                <p className="mt-3">{c.independence}</p>
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
    },
  };
}

export function guideRoute(cluster: OshaClusterId) {
  const c = OSHA_CLUSTERS[cluster];
  const guidesFor = () =>
    getAllGuides()
      .filter((g) => g.cluster === cluster)
      .sort((a, b) => oshaRank(cluster, a.slug) - oshaRank(cluster, b.slug));
  const find = (slug: string) => guidesFor().find((g) => g.slug === slug);

  return {
    generateStaticParams: () => guidesFor().map((g) => ({ set: g.slug })),
    generateMetadata: async ({ params }: Props): Promise<Metadata> => {
      const g = find((await params).set);
      if (!g) return {};
      return {
        title: oshaPageTitle(g.slug, "Study Guide", cluster),
        description: g.description,
        alternates: { canonical: g.href },
      };
    },
    Page: async function OshaGuidePage({ params }: Props) {
      const g = find((await params).set);
      if (!g) notFound();
      const name = oshaSetName(g.slug, cluster);
      const meta = c.sets.find((s) => s.slug === g.slug);
      const checked = guideChecked(g);
      const test = getAllSets().find((s) => s.cluster === cluster && s.slug === g.slug);
      const others = guidesFor().filter((x) => x.slug !== g.slug);

      return (
        <PageShell
          crumbs={[{ label: "Home", href: "/" }, { label: c.label, href: c.href }, { label: `${name} study guide` }]}
          title={g.title}
          lead={g.intro}
          meta={
            <>
              Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
            </>
          }
        >
          <GuideBody
            g={g}
            aside={
              test ? (
                <Link
                  href={test.href}
                  className="mt-6 inline-block rounded-full bg-low px-4 py-2.5 font-semibold text-white hover:brightness-110"
                >
                  Practice {lower(name)}
                </Link>
              ) : null
            }
            sourceNote={
              <>
                Quotes from {meta ? meta.rule : c.part} are checked against the eCFR text dated November 3, 2026.{" "}
                {c.independence} Found an error?{" "}
                <Link href="/contact/" className="text-low underline">
                  Tell us
                </Link>
                .
              </>
            }
            footer={
              others.length > 0 ? (
                <p className="mt-8 text-[0.9375rem]">
                  Other {c.label} study guides:{" "}
                  {others.map((o, i) => (
                    <span key={o.slug}>
                      {i > 0 ? ", " : ""}
                      <Link href={o.href} className="text-low underline">
                        {oshaSetName(o.slug, cluster)}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null
            }
          />
        </PageShell>
      );
    },
  };
}

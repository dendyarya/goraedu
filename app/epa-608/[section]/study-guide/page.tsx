import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import GuideBody from "@/components/guide/GuideBody";
import { getAllGuides, guideChecked } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { getAllSets, SECTION_NAME } from "@/lib/questions";

export const dynamicParams = false;

const guidesFor = () => getAllGuides().filter((g) => g.cluster === "epa-608");

export function generateStaticParams() {
  return guidesFor().map((g) => ({ section: g.slug }));
}

type Props = { params: Promise<{ section: string }> };

const find = (section: string) => guidesFor().find((g) => g.slug === section);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = find((await params).section);
  if (!g) return {};
  return {
    title: `EPA 608 ${SECTION_NAME[g.slug] ?? g.slug} Study Guide (from 40 CFR Part 82)`,
    description: g.description,
    alternates: { canonical: g.href },
  };
}

export default async function StudyGuidePage({ params }: Props) {
  const g = find((await params).section);
  if (!g) notFound();
  const name = SECTION_NAME[g.slug] ?? g.slug;
  const checked = guideChecked(g);
  const test = getAllSets().find((s) => s.cluster === "epa-608" && s.slug === g.slug);
  const others = guidesFor().filter((x) => x.slug !== g.slug);

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "EPA 608", href: "/epa-608/" }, { label: `${name} study guide` }]}
      title={`EPA 608 ${name} study guide`}
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
              className="mt-6 inline-block rounded-[10px] bg-low px-4 py-2.5 font-semibold text-white hover:brightness-110"
            >
              Take the {name} practice test
            </Link>
          ) : null
        }
        sourceNote={
          <>
            Topics follow{" "}
            <a href="https://www.epa.gov/section608/test-topics" className="text-low underline" rel="noopener">
              EPA&apos;s published test topics
            </a>
            . Quotes from 40 CFR Part 82 are checked against the eCFR text dated November 3, 2026. Independent. Not
            affiliated with or endorsed by the U.S. EPA or any certifying organization. Found an error?{" "}
            <Link href="/contact/" className="text-low underline">
              Tell us
            </Link>
            .
          </>
        }
        footer={
          others.length > 0 ? (
            <p className="mt-8 text-[0.9375rem]">
              Other study guides:{" "}
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 ? ", " : ""}
                  <Link href={o.href} className="text-low underline">
                    {SECTION_NAME[o.slug] ?? o.slug}
                  </Link>
                </span>
              ))}
            </p>
          ) : null
        }
      />
    </PageShell>
  );
}

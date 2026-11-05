import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideBody from "@/components/guide/GuideBody";
import PageShell from "@/components/PageShell";
import { getAllTopicPages, guideChecked } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { TOOLS } from "@/lib/tools";

export const dynamicParams = false;

const pagesFor = () => getAllTopicPages().filter((g) => g.cluster === "epa-608");

export function generateStaticParams() {
  return pagesFor().map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => pagesFor().find((g) => g.slug === slug);

/** Tools that belong next to a topic page. */
const RELATED_TOOL: Record<string, string> = {
  "leak-repair-rules": "leak-rate-calculator",
  "evacuation-requirements": "evacuation-levels",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = find((await params).slug);
  if (!g) return {};
  return {
    title: g.title.replace(/^EPA 608/, "EPA 608"),
    description: g.description,
    alternates: { canonical: g.href },
  };
}

export default async function TopicPage({ params }: Props) {
  const g = find((await params).slug);
  if (!g) notFound();
  const checked = guideChecked(g);
  const tool = TOOLS.find((t) => t.slug === RELATED_TOOL[g.slug]);
  const others = pagesFor().filter((x) => x.slug !== g.slug);

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "EPA 608", href: "/epa-608/" },
        { label: g.title.replace(/^EPA 608 /, "") },
      ]}
      title={g.title}
      lead={g.intro}
      meta={
        <>
          Fact-checked against official sources · Last checked <time dateTime={checked}>{formatDate(checked)}</time>
        </>
      }
    >
      <div className="mb-12 max-w-[70ch] rounded-2xl border border-low/40 bg-low-soft p-6 lg:ml-[18rem]">
        <h2 className="text-[1.25rem] font-bold">The short answer</h2>
        <p className="mt-2 text-[1.0625rem]">{g.summary}</p>
        <p className="mt-2 text-[0.9375rem] text-muted">Each part of this answer is quoted from the rule below.</p>
      </div>
      <GuideBody
        g={g}
        aside={
          tool ? (
            <Link
              href={tool.href}
              className="mt-6 inline-block rounded-[10px] bg-low px-4 py-2.5 font-semibold text-white hover:brightness-110"
            >
              Open the {tool.name.replace("EPA 608 ", "")}
            </Link>
          ) : null
        }
        sourceNote={
          <>
            Quotes from 40 CFR Part 82 are checked against the eCFR text dated November 3, 2026. Independent. Not
            affiliated with or endorsed by the U.S. EPA or any certifying organization. Found an error?{" "}
            <Link href="/contact/" className="text-low underline">
              Tell us
            </Link>
            .
          </>
        }
        footer={
          others.length > 0 ? (
            <div className="mt-8 text-[0.9375rem]">
              <p className="font-semibold">More EPA 608 rules explained</p>
              <ul className="mt-2 space-y-1">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={o.href} className="text-low underline">
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        }
      />
    </PageShell>
  );
}

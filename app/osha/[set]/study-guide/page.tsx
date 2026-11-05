import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideBody from "@/components/guide/GuideBody";
import PageShell from "@/components/PageShell";
import { getAllGuides, guideChecked } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { OSHA_INDEPENDENCE, oshaSetName } from "@/lib/osha";
import { getAllSets } from "@/lib/questions";

export const dynamicParams = false;

const guidesFor = () => getAllGuides().filter((g) => g.cluster === "osha");

export function generateStaticParams() {
  return guidesFor().map((g) => ({ set: g.slug }));
}

type Props = { params: Promise<{ set: string }> };
const find = (slug: string) => guidesFor().find((g) => g.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = find((await params).set);
  if (!g) return {};
  return {
    title: `OSHA Construction ${oshaSetName(g.slug)} Study Guide (29 CFR 1926)`,
    description: g.description,
    alternates: { canonical: g.href },
  };
}

export default async function OshaGuidePage({ params }: Props) {
  const g = find((await params).set);
  if (!g) notFound();
  const name = oshaSetName(g.slug);
  const checked = guideChecked(g);
  const test = getAllSets().find((s) => s.cluster === "osha" && s.slug === g.slug);
  const others = guidesFor().filter((x) => x.slug !== g.slug);

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "OSHA Construction", href: "/osha/" },
        { label: `${name} study guide` },
      ]}
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
              Practice {name.toLowerCase()}
            </Link>
          ) : null
        }
        sourceNote={
          <>
            Quotes from 29 CFR Part 1926 are checked against the eCFR text dated November 3, 2026. {OSHA_INDEPENDENCE}{" "}
            Found an error?{" "}
            <Link href="/contact/" className="text-low underline">
              Tell us
            </Link>
            .
          </>
        }
        footer={
          others.length > 0 ? (
            <p className="mt-8 text-[0.9375rem]">
              Other OSHA study guides:{" "}
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 ? ", " : ""}
                  <Link href={o.href} className="text-low underline">
                    {oshaSetName(o.slug)}
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

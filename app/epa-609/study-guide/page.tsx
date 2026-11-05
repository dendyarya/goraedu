import type { Metadata } from "next";
import Link from "next/link";
import GuideBody from "@/components/guide/GuideBody";
import PageShell from "@/components/PageShell";
import { getAllGuides, guideChecked } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { getAllSets } from "@/lib/questions";

const guide = () => getAllGuides().find((g) => g.cluster === "epa-609")!;

export function generateMetadata(): Metadata {
  const g = guide();
  return {
    title: "EPA 609 Study Guide (from 40 CFR Part 82, Subpart B)",
    description: g.description,
    alternates: { canonical: g.href },
  };
}

export default function Epa609StudyGuidePage() {
  const g = guide();
  const checked = guideChecked(g);
  const test = getAllSets().find((s) => s.cluster === "epa-609");

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "EPA 609", href: "/epa-609/" }, { label: "Study guide" }]}
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
              Take the EPA 609 practice test
            </Link>
          ) : null
        }
        sourceNote={
          <>
            Quotes from 40 CFR Part 82, Subparts B and G are checked against the eCFR text dated November 3, 2026.
            Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying organization. Found an error?{" "}
            <Link href="/contact/" className="text-low underline">
              Tell us
            </Link>
            .
          </>
        }
      />
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { IconTile } from "@/components/TradeIcon";
import { WITH_FAMILY } from "@/lib/clusters";
import { getAllSets } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Free Practice Tests",
  description:
    "Free practice tests for U.S. skilled trades certifications. Every answer is explained and linked to its official source.",
  alternates: { canonical: "/practice-tests/" },
};

export default function PracticeTestsPage() {
  const sets = getAllSets();
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "Practice tests" }]}
      title="Practice tests"
      lead="Free practice questions for each certification we cover. Every answer is explained and linked to its official source. New sets appear here as they are finished."
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sets.map((s) => {
          const cluster = WITH_FAMILY.find((c) => c.id === s.cluster);
          return (
            <li key={`${s.cluster}/${s.slug}`}>
              <Link
                href={s.href}
                className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 hover:border-low"
              >
                <div className="flex items-center gap-3">
                  {cluster ? <IconTile name={cluster.family.icon} /> : null}
                  <span className="text-[0.875rem] text-muted">{cluster?.name}</span>
                </div>
                <h2 className="mt-5 text-[1.375rem] font-bold">{s.title}</h2>
                <p className="mt-2 text-[0.9375rem] text-muted">{s.questions.length} questions</p>
                <span className="mt-4 font-semibold text-low">Start practicing</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { IconTile } from "@/components/TradeIcon";
import { WITH_FAMILY } from "@/lib/clusters";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Tools for Trade Certifications",
  description:
    "Free calculators and lookups built from official rules, for U.S. skilled trades certifications. Every result shows the rule text it comes from.",
  alternates: { canonical: "/tools/" },
};

export default function ToolsPage() {
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "Tools" }]}
      title="Tools"
      lead="Free calculators and lookups built from the official rules. Each result shows the exact rule text it comes from, and everything runs in your browser."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {TOOLS.map((t) => {
          const cluster = WITH_FAMILY.find((c) => c.id === t.cluster);
          return (
            <li key={t.slug}>
              <Link
                href={t.href}
                className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 hover:border-low"
              >
                <div className="flex items-center gap-3">
                  {cluster ? <IconTile name={cluster.family.icon} /> : null}
                  <span className="text-[0.875rem] text-muted">{cluster?.name}</span>
                </div>
                <h2 className="mt-5 text-[1.375rem] font-bold">{t.name}</h2>
                <p className="mt-2 text-[0.9375rem] text-muted">{t.summary}</p>
                <span className="mt-4 font-semibold text-low">Open the tool</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}

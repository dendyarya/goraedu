import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { formatDate, getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "EPA Refrigerant and Certification News",
  description:
    "Changes to EPA refrigerant rules and Section 608 technician certification, each linked to the official source.",
  alternates: { canonical: "/news/" },
};

export default function NewsIndex() {
  const posts = getAllNews();
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      title="EPA refrigerant and certification news"
      lead="Changes to EPA refrigerant rules and Section 608 technician certification. Every post links to the Federal Register, eCFR or EPA.gov, and says whether a rule is proposed or final."
    >
      {posts.length === 0 ? (
        <p>No news yet. New posts appear here when EPA publishes a change that affects technicians.</p>
      ) : (
        <ul className="max-w-3xl divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug} className="py-6">
              <time dateTime={p.published} className="text-[0.9375rem] text-muted">
                {formatDate(p.published)}
              </time>
              <h2 className="mt-1 text-[1.5rem] font-bold">
                <Link href={`/news/${p.slug}/`} className="hover:text-low hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-[68ch] text-muted">{p.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}

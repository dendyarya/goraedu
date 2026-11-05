import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { formatDate, getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Certification News",
  description:
    "Official rule changes that affect U.S. skilled trades certifications, each linked to the official source.",
  alternates: { canonical: "/news/" },
};

export default function NewsIndex() {
  const posts = getAllNews();
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      title="Certification news"
      lead="Official changes that affect the certifications we cover. Every post links to the Federal Register, the eCFR or the agency's own site, and says whether a rule is proposed or final."
    >
      {posts.length === 0 ? (
        <p>
          No posts yet. New posts appear here when an agency publishes a change that affects one of our certifications.
        </p>
      ) : (
        <ul className="max-w-3xl divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug} className="py-6">
              <p className="flex flex-wrap items-center gap-3 text-[0.9375rem] text-muted">
                <span className="rounded-full border border-low/40 bg-low-soft px-2.5 text-[0.8125rem] font-medium leading-6 text-low">
                  {p.topic}
                </span>
                <time dateTime={p.published}>{formatDate(p.published)}</time>
              </p>
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

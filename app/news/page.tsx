import type { Metadata } from "next";
import Link from "next/link";
import { NewsThumb } from "@/components/NewsFigure";
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
        <ul className="grid gap-5 lg:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="flex h-full flex-col rounded-[1.75rem] border border-line bg-panel p-6">
                {p.image ? <NewsThumb image={p.image} className="mb-5" /> : null}
                <p className="flex flex-wrap items-center gap-2.5 text-[0.875rem]">
                  <span className="rounded-full bg-low-soft px-3 font-bold leading-7 text-low">{p.topic}</span>
                  <time dateTime={p.published} className="font-semibold text-muted">
                    {formatDate(p.published)}
                  </time>
                </p>
                <h2 className="mt-3 text-[1.5rem]">
                  <Link href={`/news/${p.slug}/`} className="hover:text-low hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-muted">{p.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}

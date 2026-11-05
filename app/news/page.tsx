import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "EPA Refrigerant and Certification News",
  description:
    "Updates on EPA refrigerant rules and Section 608 technician certification, each with links to the official sources.",
  alternates: { canonical: "/news/" },
};

export default function NewsIndex() {
  const posts = getAllNews();
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-sm">
        <Link href="/" className="text-brand underline">
          Home
        </Link>{" "}
        › News
      </p>
      <h1 className="mt-3 text-3xl font-bold">EPA Refrigerant and Certification News</h1>
      <p className="mt-3 text-muted">
        Changes to EPA refrigerant rules and Section 608 technician certification. Every post links to the official
        source.
      </p>
      {posts.length === 0 ? (
        <p className="mt-8">No news yet.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-line pb-6">
              <p className="text-sm text-muted">
                <time dateTime={p.published}>{formatDate(p.published)}</time>
              </p>
              <h2 className="mt-1 text-xl font-semibold">
                <Link href={`/news/${p.slug}/`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2">{p.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

import Link from "next/link";
import { formatDate, getAllNews } from "@/lib/news";
import { SITE } from "@/lib/site";

export default function Home() {
  const latest = getAllNews().slice(0, 3);
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">{SITE.name}</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{SITE.tagline}</h1>
      <p className="mt-5 text-lg text-muted">
        Free practice tests and study guides for U.S. skilled trades certifications, starting with EPA Section 608.
        Every answer links to the official source, with the date we checked it.
      </p>
      <p className="mt-8 inline-block rounded-md border border-line px-4 py-3 text-sm">
        Coming soon: EPA 608 Core, Type I, Type II, Type III and Universal practice tests.
      </p>
      {latest.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Latest EPA news</h2>
          <ul className="mt-4 space-y-3">
            {latest.map((p) => (
              <li key={p.slug}>
                <Link href={`/news/${p.slug}/`} className="font-medium hover:underline">
                  {p.title}
                </Link>
                <span className="block text-sm text-muted">
                  <time dateTime={p.published}>{formatDate(p.published)}</time>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/news/" className="mt-4 inline-block text-sm text-brand underline">
            All news
          </Link>
        </section>
      ) : null}
      <p className="mt-12 text-xs text-muted">
        Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying organization.
      </p>
    </main>
  );
}

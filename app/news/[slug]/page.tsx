import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getAllNews, getNews } from "@/lib/news";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getNews((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/news/${post.slug}/` },
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.published },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const post = getNews((await params).slug);
  if (!post) notFound();
  const lastChecked = post.sources
    .map((s) => s.checked)
    .sort()
    .at(-1)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    mainEntityOfPage: `${SITE.url}/news/${post.slug}/`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD built from validated front matter, "<" escaped
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <p className="text-sm">
        <Link href="/" className="text-brand underline">
          Home
        </Link>{" "}
        ›{" "}
        <Link href="/news/" className="text-brand underline">
          News
        </Link>
      </p>
      <article>
        <h1 className="mt-3 text-3xl font-bold leading-tight">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">
          Published <time dateTime={post.published}>{formatDate(post.published)}</time>
          {post.updated ? (
            <>
              {" "}
              · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          ) : null}
        </p>
        <p className="mt-1 text-sm text-muted">
          Fact-checked against official EPA sources · Last checked{" "}
          <time dateTime={lastChecked}>{formatDate(lastChecked)}</time>
        </p>
        <div className="prose-news mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
        <section className="mt-10 border-t border-line pt-6">
          <h2 className="text-lg font-semibold">Sources</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {post.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="text-brand underline" rel="noopener">
                  {s.title}
                </a>{" "}
                <span className="text-muted">· checked {formatDate(s.checked)}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <p className="mt-10 text-xs text-muted">
        Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying organization. Found an error?
        Email {SITE.contactEmail}.
      </p>
    </main>
  );
}

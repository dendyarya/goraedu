import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NewsFigure from "@/components/NewsFigure";
import PageShell from "@/components/PageShell";
import { formatDate, getAllNews, getNews, KIND_LABEL } from "@/lib/news";
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
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.published,
      images: post.image
        ? [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }]
        : undefined,
    },
    twitter: post.image ? { card: "summary_large_image" } : undefined,
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
    "@type": post.kind === "explainer" ? "Article" : "NewsArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    mainEntityOfPage: `${SITE.url}/news/${post.slug}/`,
    ...(post.image ? { image: [`${SITE.url}${post.image.src}`] } : {}),
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news/" }, { label: post.title }]}
      title={post.title}
      lead={post.summary}
      meta={
        <>
          <p>
            <span className="mr-3 rounded-full border border-low/40 bg-low-soft px-2.5 text-[0.8125rem] font-medium leading-6 text-low">
              {post.topic}
            </span>
            <span className="mr-3 text-[0.9375rem] font-semibold">{KIND_LABEL[post.kind]}</span>
            Published <time dateTime={post.published}>{formatDate(post.published)}</time>
            {post.updated ? (
              <>
                , updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            ) : null}
          </p>
          <p className="mt-1">
            Fact-checked against official sources · Last checked{" "}
            <time dateTime={lastChecked}>{formatDate(lastChecked)}</time>
          </p>
        </>
      }
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD built from validated front matter, "<" escaped
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {post.image ? (
        <div className="mb-10">
          <NewsFigure image={post.image} priority />
        </div>
      ) : null}
      <article className="prose-page">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </article>
      <section className="mt-12 max-w-[68ch] rounded-[1.75rem] border border-line bg-panel p-6">
        <h2 className="text-[1.25rem] font-bold">Sources</h2>
        <ul className="mt-3 space-y-3 text-[0.9375rem]">
          {post.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} className="text-low underline" rel="noopener">
                {s.title}
              </a>
              <span className="block text-[0.875rem] text-muted">Checked {formatDate(s.checked)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-line pt-4 text-[0.875rem] text-muted">
          Found an error? Email {SITE.contactEmail}. We review reports within 7 days and log fixes on the{" "}
          <Link href="/corrections/" className="text-low underline">
            corrections page
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}

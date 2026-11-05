import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageShell from "@/components/PageShell";
import { formatDate } from "@/lib/news";
import { getAllPages, getPage } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPages().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${page.slug}/` } };
}

export default async function TrustPage({ params }: Props) {
  const page = getPage((await params).slug);
  if (!page) notFound();
  return (
    <PageShell
      crumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      title={page.title}
      lead={page.description}
      meta={
        <>
          Last updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
        </>
      }
    >
      <div className="prose-page">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.body}</ReactMarkdown>
      </div>
    </PageShell>
  );
}

import type { Metadata } from "next";
import NewsGrid from "@/components/NewsGrid";
import PageShell from "@/components/PageShell";
import { getAllNews, newsCards } from "@/lib/news";

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
        <NewsGrid posts={newsCards(posts)} filters />
      )}
    </PageShell>
  );
}

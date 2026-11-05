"use client";

import Link from "next/link";
import { useState } from "react";

export type NewsCard = {
  slug: string;
  title: string;
  topic: string;
  date: string; // ISO
  dateLabel: string; // "Nov 5, 2026"
  image?: { src: string; width: number; height: number };
};

/** Cover for a card: the post's own image, or a plain drawn cover with the topic when it has none. */
function Cover({ p }: { p: NewsCard }) {
  if (p.image)
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export
      <img
        src={p.image.src}
        alt=""
        width={p.image.width}
        height={p.image.height}
        loading="lazy"
        className="aspect-[16/9] w-full rounded-[1.1rem] border border-line object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    );
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.1rem] border border-line bg-low-soft"
    >
      <span className="absolute -right-[12%] -top-[30%] aspect-square w-[62%] rotate-[-20deg] rounded-full border-[14px] border-hose border-l-sky border-t-sky" />
      <span className="absolute bottom-3 left-3 rounded-full bg-panel px-2.5 text-[0.75rem] font-bold leading-6 text-low">
        {p.topic}
      </span>
    </div>
  );
}

/**
 * News cards in a responsive grid (1 to 4 columns), with topic filter pills when `filters` is set.
 * The filter only hides cards in the browser; every post is in the page for readers and search engines.
 */
export default function NewsGrid({ posts, filters = false }: { posts: NewsCard[]; filters?: boolean }) {
  const topics = [...new Set(posts.map((p) => p.topic))];
  const [topic, setTopic] = useState<string | null>(null);
  const shown = topic ? posts.filter((p) => p.topic === topic) : posts;

  return (
    <div>
      {filters && topics.length > 1 ? (
        <div role="group" aria-label="Filter by certification" className="mb-7 flex flex-wrap gap-2">
          {[null, ...topics].map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={`min-h-11 rounded-full px-5 text-[0.9375rem] font-bold ${
                topic === t ? "bg-ink text-paper" : "border border-line bg-panel hover:border-low hover:text-low"
              }`}
            >
              {t ?? "All"}
            </button>
          ))}
        </div>
      ) : null}
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((p) => (
          <li key={p.slug}>
            <article className="group relative">
              <Cover p={p} />
              <p className="mt-4 text-[0.8125rem] font-bold tracking-wide text-low">{p.topic}</p>
              <h3 className="mt-1.5 text-[1.1875rem] leading-snug">
                <Link href={`/news/${p.slug}/`} className="after:absolute after:inset-0 hover:text-low">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-[0.875rem] text-muted">
                goraedu · <time dateTime={p.date}>{p.dateLabel}</time>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { NewsImage } from "@/lib/news";

/** A news image with its credit and license underneath, always shown (we only use images we may reuse). */
export default function NewsFigure({ image, priority = false }: { image: NewsImage; priority?: boolean }) {
  return (
    <figure className="max-w-[68ch]">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export: images are served as uploaded */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="aspect-[16/9] w-full rounded-[1.75rem] border border-line object-cover"
      />
      <figcaption className="mt-2 text-[0.875rem] text-muted">
        Image:{" "}
        {image.url ? (
          <a href={image.url} className="underline hover:text-low" rel="noopener">
            {image.credit}
          </a>
        ) : (
          image.credit
        )}{" "}
        · {image.license}
      </figcaption>
    </figure>
  );
}

/** Small cover for news lists: decorative there, since the title next to it says what the post is. */
export function NewsThumb({ image, className = "" }: { image: NewsImage; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export
    <img
      src={image.src}
      alt=""
      width={image.width}
      height={image.height}
      loading="lazy"
      className={`aspect-[16/9] w-full rounded-[1.25rem] border border-line object-cover ${className}`}
    />
  );
}

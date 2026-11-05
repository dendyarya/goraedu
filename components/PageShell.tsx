import Link from "next/link";

/** Breadcrumb + title block shared by every inner page. */
export default function PageShell({
  crumbs,
  title,
  lead,
  meta,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  lead?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main id="main">
      <div className="border-b border-line bg-panel">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.9375rem] text-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden="true">/</span> : null}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-low hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-5 max-w-[22ch] text-[2.5rem] font-bold sm:text-[3.375rem]">{title}</h1>
          {lead ? <p className="mt-4 max-w-[62ch] text-[1.1875rem] leading-relaxed text-muted">{lead}</p> : null}
          {meta ? (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[0.875rem] font-semibold text-muted">
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3 8.5l3 3 7-8"
                  fill="none"
                  stroke="var(--color-low)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{meta}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </main>
  );
}

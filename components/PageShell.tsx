import Link from "next/link";

/** Breadcrumb + title block shared by trust pages and news. */
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
            <ol className="flex flex-wrap items-center gap-2 text-[0.875rem] text-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden="true">/</span> : null}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-low hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-5 max-w-[24ch] text-[2.25rem] font-[750] sm:text-[2.875rem]">{title}</h1>
          {lead ? <p className="mt-4 max-w-[62ch] text-[1.1875rem] leading-relaxed text-muted">{lead}</p> : null}
          {meta ? <div className="mt-4 text-[0.875rem] text-muted">{meta}</div> : null}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </main>
  );
}

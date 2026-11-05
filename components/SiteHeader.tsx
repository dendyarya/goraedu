import Link from "next/link";
import HeaderDismiss from "@/components/HeaderDismiss";
import HeaderSearch from "@/components/HeaderSearch";
import Logo from "@/components/Logo";
import { FAMILIES, STATUS_LABEL } from "@/lib/clusters";
import { NAV } from "@/lib/site";

function NavItem({ label, href }: { label: string; href?: string }) {
  if (!href) {
    return (
      <span className="flex items-center gap-1.5 px-3.5 py-2 text-muted">
        {label}
        <span className="rounded-full border border-line px-2 text-[0.75rem] leading-5">Soon</span>
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="block rounded-full px-3.5 py-2 font-semibold text-ink hover:bg-low-soft hover:text-low"
    >
      {label}
    </Link>
  );
}

/** Every certification on the roadmap, grouped by trade; live ones link, the rest show their status. */
function CertificationList() {
  return (
    <>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {FAMILIES.map((f) => (
          <div key={f.name}>
            <p className="font-[family-name:var(--font-display)] text-[1.0625rem] font-bold">{f.name}</p>
            <ul className="mt-2 space-y-1.5">
              {f.clusters.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  {c.href ? (
                    <Link href={c.href} className="font-bold text-ink hover:text-low hover:underline">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-muted">{c.name}</span>
                  )}
                  <span
                    className={`shrink-0 rounded-full px-2.5 text-[0.75rem] font-bold leading-6 ${
                      c.status === "available" ? "bg-ok-soft text-ok" : "border border-line text-muted"
                    }`}
                  >
                    {STATUS_LABEL[c.status]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 flex flex-wrap justify-between gap-3 border-t border-line pt-4">
        <span className="text-muted">We finish one certification before starting the next.</span>
        <Link href="/certifications/" className="font-bold text-low underline">
          See all certifications
        </Link>
      </p>
    </>
  );
}

export default function SiteHeader() {
  const [certs, ...rest] = NAV;
  return (
    <header className="relative z-30 border-b border-line bg-panel">
      <HeaderDismiss />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="text-ink" aria-label="goraedu home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 text-[0.9375rem]">
            <li>
              {/* A native disclosure: opens without JavaScript and stays keyboard accessible */}
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full px-3.5 py-2 font-semibold hover:bg-low-soft hover:text-low group-open:bg-low-soft group-open:text-low [&::-webkit-details-marker]:hidden">
                  {certs!.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="group-open:rotate-180">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </summary>
                <div className="absolute inset-x-0 top-full px-4 pt-2 sm:px-6">
                  <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-line bg-panel p-7 text-[0.9375rem] shadow-[0_30px_60px_-30px_rgba(14,27,44,0.35)]">
                    <CertificationList />
                  </div>
                </div>
              </details>
            </li>
            {rest.map((item) => (
              <li key={item.label}>
                <NavItem {...item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <HeaderSearch />
          <Link
            href="/practice-tests/"
            className="hidden min-h-11 items-center rounded-full bg-low px-5 text-[0.9375rem] font-bold text-white hover:brightness-110 lg:inline-flex"
          >
            Start practicing
          </Link>
          {/* Phones: a native disclosure menu, works without JavaScript */}
          <details className="group relative md:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-line px-4 text-[0.9375rem] font-semibold [&::-webkit-details-marker]:hidden">
              Menu
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="group-open:rotate-180">
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </summary>
            <nav
              aria-label="Main"
              className="absolute right-0 z-40 mt-2 w-64 rounded-3xl border border-line bg-panel p-2 shadow-[0_24px_48px_-24px_rgba(14,27,44,0.35)]"
            >
              <ul className="text-[0.9375rem]">
                <li className="px-2 py-2">
                  <NavItem {...certs!} />
                  <ul className="mt-1.5 space-y-1.5 border-l-2 border-line pl-3">
                    {FAMILIES.flatMap((f) => f.clusters)
                      .filter((c) => c.href)
                      .map((c) => (
                        <li key={c.id}>
                          <Link href={c.href!} className="text-low hover:underline">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                {rest.map((item) => (
                  <li key={item.label} className="px-2 py-2">
                    <NavItem {...item} />
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

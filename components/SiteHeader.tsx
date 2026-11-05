import Link from "next/link";
import Logo from "@/components/Logo";
import { FAMILIES, STATUS_LABEL } from "@/lib/clusters";
import { NAV } from "@/lib/site";

function NavItem({ label, href }: { label: string; href?: string }) {
  if (!href) {
    return (
      <span className="flex items-center gap-1.5 text-muted">
        {label}
        <span className="rounded-full border border-line px-2 text-[0.75rem] leading-5">Soon</span>
      </span>
    );
  }
  return (
    <Link href={href} className="font-medium text-ink hover:text-low hover:underline">
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
            <p className="font-semibold">{f.name}</p>
            <ul className="mt-2 space-y-1.5">
              {f.clusters.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  {c.href ? (
                    <Link href={c.href} className="font-medium text-low hover:underline">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-muted">{c.name}</span>
                  )}
                  <span className="shrink-0 rounded-full border border-line px-2 text-[0.75rem] leading-5 text-muted">
                    {STATUS_LABEL[c.status]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-line pt-4">
        <Link href="/certifications/" className="font-semibold text-low underline">
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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="text-ink" aria-label="goraedu home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            <li>
              {/* A native disclosure: opens without JavaScript and stays keyboard accessible */}
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 font-medium hover:text-low [&::-webkit-details-marker]:hidden">
                  {certs!.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="group-open:rotate-180">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </summary>
                <div className="absolute inset-x-0 top-full border-b border-line bg-panel shadow-[0_16px_32px_rgba(16,36,58,0.12)]">
                  <div className="mx-auto max-w-6xl px-4 py-6 text-[0.9375rem] sm:px-6">
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

        {/* Phones: a native disclosure menu, works without JavaScript */}
        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-line px-3 py-1.5 text-[0.9375rem] font-medium [&::-webkit-details-marker]:hidden">
            Menu
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="group-open:rotate-180">
              <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </summary>
          <nav
            aria-label="Main"
            className="absolute right-0 z-40 mt-2 w-64 rounded-md border border-line bg-panel p-2 shadow-[0_8px_24px_rgba(16,36,58,0.12)]"
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
    </header>
  );
}

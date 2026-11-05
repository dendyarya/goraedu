import Link from "next/link";
import Logo from "@/components/Logo";
import { ALL_CLUSTERS } from "@/lib/clusters";
import { NAV } from "@/lib/site";

// Certifications that are live get their own menu link, read from the roadmap, so the header never hard-codes
// one cluster. Short names: "EPA Section 608" → "EPA 608".
const LIVE = ALL_CLUSTERS.filter((c) => c.status === "available" && c.href).map((c) => ({
  label: c.name.replace(/Section /, ""),
  href: c.href!,
}));
const ITEMS = [NAV[0]!, ...LIVE, ...NAV.slice(1)];

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

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="text-ink" aria-label="goraedu home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            {ITEMS.map((item) => (
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
            className="absolute right-0 z-40 mt-2 w-56 rounded-md border border-line bg-panel p-2 shadow-[0_8px_24px_rgba(16,36,58,0.12)]"
          >
            <ul className="text-[0.9375rem]">
              {ITEMS.map((item) => (
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

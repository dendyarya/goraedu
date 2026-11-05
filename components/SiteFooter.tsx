import Link from "next/link";
import Logo from "@/components/Logo";
import { FOOTER_GROUPS, SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-20 bg-night text-[#d6e1eb]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Logo className="text-white" />
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed">
              Free practice for U.S. skilled trades certifications. Every answer links to the official rule.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-[0.9375rem] font-semibold text-white [font-family:var(--font-body)] [font-stretch:100%]">
                {group.title}
              </h2>
              <ul className="mt-3 space-y-2 text-[0.9375rem]">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-[0.875rem] leading-relaxed text-[#a9b9c8]">
          <p>{SITE.independence}</p>
          <p className="mt-2">Educational information only. Not legal or compliance advice.</p>
          <p className="mt-2">© 2026 goraedu.com</p>
        </div>
      </div>
    </footer>
  );
}

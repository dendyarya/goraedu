import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">{SITE.name}</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{SITE.tagline}</h1>
      <p className="mt-5 text-lg text-muted">
        Free practice tests and study guides for U.S. skilled trades certifications, starting with EPA Section 608.
        Every answer links to the official source, with the date we checked it.
      </p>
      <p className="mt-8 inline-block rounded-md border border-line px-4 py-3 text-sm">
        Coming soon: EPA 608 Core, Type I, Type II, Type III and Universal practice tests.
      </p>
      <p className="mt-12 text-xs text-muted">
        Independent. Not affiliated with or endorsed by the U.S. EPA or any certifying organization.
      </p>
    </main>
  );
}

import { COVERAGE, COVERAGE_CHECKED } from "@/lib/coverage";
import { formatDate } from "@/lib/news";

/** What a certification page covers versus what the real test or credential involves, with official links. */
export default function CoverageBox({ cluster }: { cluster: string }) {
  const c = COVERAGE[cluster];
  if (!c) return null;
  return (
    <section
      aria-labelledby={`coverage-${cluster}`}
      className="mb-12 rounded-3xl border border-line bg-panel p-6 text-[0.9375rem] sm:p-7"
    >
      <h2 id={`coverage-${cluster}`} className="text-[1.25rem] font-bold">
        What these pages cover, and what they don&apos;t
      </h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="font-bold">The real test or credential</h3>
          <p className="mt-1.5">{c.official}</p>
        </div>
        <div>
          <h3 className="font-bold">Our pages</h3>
          <p className="mt-1.5">{c.ours}</p>
        </div>
      </div>
      {c.links.length ? (
        <ul className="mt-4 space-y-1">
          {c.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} className="text-low underline" rel="noopener">
                {l.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-3 text-[0.8125rem] text-muted">
        {c.links.length ? `Checked against these official pages on ${formatDate(COVERAGE_CHECKED)}. ` : ""}Practice here
        does not replace the official training or test.
      </p>
    </section>
  );
}

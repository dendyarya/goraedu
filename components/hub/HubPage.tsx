import Link from "next/link";
import PageShell from "@/components/PageShell";
import TradeIcon from "@/components/TradeIcon";
import { assertQuotes, getAllGuides } from "@/lib/guides";
import type { Hub } from "@/lib/hubs";
import { formatDate } from "@/lib/news";
import { OSHA_CLUSTERS, type OshaClusterId } from "@/lib/osha";
import { getAllSets } from "@/lib/questions";
import { TOOLS } from "@/lib/tools";

const INDEPENDENCE =
  "goraedu is an independent study site built from official sources. It does not train, test, license or certify anyone, and its questions are not a license or certification exam. Not affiliated with or endorsed by OSHA, the U.S. EPA, any State or any certification body.";

/** A trade hub: what goraedu covers for this trade (existing federal-rule sets) and what it does not. */
export default function HubPage({ hub }: { hub: Hub }) {
  for (const f of hub.facts) assertQuotes(f.cluster, [f.quote]);
  const sets = getAllSets();
  const guides = getAllGuides();
  const rows = hub.sets.map((r) => {
    const set = sets.find((s) => s.cluster === r.cluster && s.slug === r.slug);
    if (!set) throw new Error(`hub ${hub.id}: set ${r.cluster}/${r.slug} not found`);
    const guide = guides.find((g) => g.cluster === r.cluster && g.slug === r.slug);
    const c = OSHA_CLUSTERS[r.cluster as OshaClusterId];
    const name = c?.sets.find((s) => s.slug === r.slug)?.name ?? set.title;
    return { ...r, set, guide, name, label: c?.label ?? r.cluster };
  });
  const tools = hub.tools.map((slug) => {
    const t = TOOLS.find((x) => x.slug === slug);
    if (!t) throw new Error(`hub ${hub.id}: tool ${slug} not found`);
    return t;
  });

  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Certifications", href: "/certifications/" },
        { label: hub.name },
      ]}
      title={hub.title}
      lead={hub.lead}
      meta={
        <>
          Fact-checked against official sources · Last checked{" "}
          <time dateTime={hub.checked}>{formatDate(hub.checked)}</time>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-[68ch]">
          <div className="rounded-3xl border border-[#f3dca0] bg-hose-soft p-6">
            <h2 className="text-[1.25rem] font-bold">What this page covers</h2>
            <p className="mt-2">
              {hub.notCovered} Licensing and certification rules differ by State and program, so check yours.{" "}
              {INDEPENDENCE}
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">Practice sets for this trade</h2>
            <ul className="mt-5 space-y-4">
              {rows.map((r) => (
                <li key={`${r.cluster}/${r.slug}`} className="rounded-2xl border border-line p-4">
                  <p className="font-bold">
                    {r.label}: {r.name}
                  </p>
                  <p className="text-[0.9375rem] text-muted">{r.why}</p>
                  <p className="mt-1.5 flex flex-wrap gap-x-4 text-[0.9375rem]">
                    <Link href={r.set.href} className="font-semibold text-low underline">
                      {r.set.questions.length} practice questions
                    </Link>
                    {r.guide ? (
                      <Link href={r.guide.href} className="font-semibold text-low underline">
                        Study guide
                      </Link>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.75rem] font-bold">Key rules, in the regulation&apos;s words</h2>
            <ul className="mt-5 space-y-6">
              {hub.facts.map((f) => (
                <li key={f.cite} className="flex gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-low text-white">
                    <TradeIcon name="check" size={13} />
                  </span>
                  <div>
                    <p>{f.text}</p>
                    <blockquote className="mt-1.5 text-[0.9375rem] text-muted">&ldquo;{f.quote}&rdquo;</blockquote>
                    <a href={f.url} className="text-[0.9375rem] text-low underline" rel="noopener">
                      {f.cite}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <p className="mt-12 text-[0.9375rem] text-muted">
            Found an error? See our{" "}
            <Link href="/contact/" className="text-low underline">
              contact page
            </Link>
            .
          </p>
        </div>

        <aside className="space-y-6">
          {tools.length ? (
            <div className="rounded-3xl border border-line bg-panel p-6">
              <h2 className="text-[1.25rem] font-bold">Tools</h2>
              <ul className="mt-4 space-y-2">
                {tools.map((t) => (
                  <li key={t.slug}>
                    <Link href={t.href} className="font-semibold text-low underline">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
            <h2 className="text-[1.25rem] font-bold">Why no license exam questions?</h2>
            <p className="mt-2 text-muted">
              goraedu writes questions only from official government text that anyone may use. The codes and exams these
              licenses and certifications are built on are owned by private organizations, so we leave them out.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

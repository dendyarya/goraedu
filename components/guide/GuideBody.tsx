import SourceList, { type Source } from "@/components/SourceList";
import type { Guide, GuidePoint } from "@/lib/guides";

/** "eCFR: 40 CFR 82.156, Proper evacuation…" → "40 CFR 82.156"; "EPA: Some page" → "EPA: Some page". */
function shortSource(p: GuidePoint) {
  const m = p.source.title.match(/40 CFR (?:Part 82, Subpart F, )?(82\.\d+|Appendix [A-Z]\d?)/);
  if (m) return m[1]!.startsWith("82.") ? `40 CFR ${m[1]}` : `40 CFR Part 82, Subpart F, ${m[1]}`;
  return p.source.title.replace(/\s*\(as of [^)]+\)/, "");
}

/**
 * Body shared by study guides and topic pages: a topic index on the left, quoted points on the right, the
 * "not covered" notes and the source list.
 */
export default function GuideBody({
  g,
  aside,
  sourceNote,
  footer,
}: {
  g: Guide;
  aside?: React.ReactNode;
  sourceNote: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const count = g.topics.reduce((n, t) => n + t.points.length, 0);
  const sources: Source[] = [];
  for (const p of g.topics.flatMap((t) => t.points)) {
    const s = sources.find((x) => x.url === p.source.url);
    if (!s) sources.push({ title: p.source.title, url: p.source.url, checked: p.checked });
    else if (p.checked > s.checked) s.checked = p.checked;
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[15rem_1fr]">
      <nav aria-label="Topics in this guide" className="lg:sticky lg:top-6 lg:self-start">
        <p className="text-[0.9375rem] font-semibold">
          {g.topics.length} topics, {count} points
        </p>
        <ol className="mt-3 space-y-1.5 border-l-2 border-line text-[0.9375rem]">
          {g.topics.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className="-ml-0.5 block border-l-2 border-transparent pl-3 hover:border-low hover:text-low"
              >
                {t.name}
              </a>
            </li>
          ))}
        </ol>
        {aside}
      </nav>

      <div className="min-w-0 max-w-[70ch]">
        {g.topics.map((t) => (
          <section key={t.id} id={t.id} className="scroll-mt-6 border-b border-line pb-10 pt-2 [&+section]:pt-10">
            <h2 className="text-[1.625rem] font-bold">{t.name}</h2>
            {t.points.length > 0 ? (
              <ul className="mt-5 space-y-6">
                {t.points.map((p, i) => (
                  <li key={i} className="border-l-[3px] border-low pl-4">
                    <p className="text-[1.0625rem]">{p.text}</p>
                    {p.quote ? (
                      <blockquote className="mt-2 text-[0.9375rem] text-muted">&ldquo;{p.quote}&rdquo;</blockquote>
                    ) : null}
                    <p className="mt-1.5 text-[0.9375rem]">
                      <a href={p.source.url} className="text-low underline" rel="noopener">
                        {shortSource(p)}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
            {t.notCovered ? (
              <div className="mt-6 rounded-xl border border-hose/60 bg-hose-soft p-4 text-[0.9375rem]">
                <p className="font-semibold text-hose-ink">Not covered here</p>
                <p className="mt-1">
                  {t.notCovered} We only write what an official source states, so study these parts with your certifying
                  program&apos;s materials.
                </p>
              </div>
            ) : null}
          </section>
        ))}

        <div className="mt-12">
          <SourceList sources={sources} note={sourceNote} />
        </div>

        {footer}
      </div>
    </div>
  );
}

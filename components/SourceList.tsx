export type Source = { title: string; url: string; checked: string };

function fmt(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Sources box shown at the end of every study page. */
export default function SourceList({ sources, note }: { sources: Source[]; note?: React.ReactNode }) {
  return (
    <section className="max-w-[68ch] rounded-3xl border border-line bg-panel p-6">
      <h2 className="text-[1.25rem] font-bold">Sources</h2>
      <ul className="mt-3 space-y-3 text-[0.9375rem]">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} className="text-low underline" rel="noopener">
              {s.title}
            </a>
            <span className="block text-[0.875rem] text-muted">Checked {fmt(s.checked)}</span>
          </li>
        ))}
      </ul>
      {note ? <div className="mt-5 border-t border-line pt-4 text-[0.875rem] text-muted">{note}</div> : null}
    </section>
  );
}

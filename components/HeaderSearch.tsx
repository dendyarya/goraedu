"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type Entry = { t: string; u: string; k: string; d?: string };

const POPULAR = [
  { label: "Leak rate calculator", href: "/epa-608/tools/leak-rate-calculator/" },
  { label: "EPA 608 Type I", href: "/epa-608/type-1/practice-test/" },
  { label: "Passing score", href: "/epa-608/guide/passing-score/" },
  { label: "EPA 609 practice test", href: "/epa-609/practice-test/" },
];

// Pages rank above single questions when both match.
const WEIGHT: Record<string, number> = {
  Certification: 0,
  Tool: 1,
  "Rules explained": 1,
  "Study guide": 2,
  "Practice test": 2,
};

/**
 * The search button in the header. Hidden until pressed; then a search row opens under the header. The index
 * (/search-index.json) is fetched only on first open, and nothing typed leaves the browser.
 */
export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    if (!index && !failed)
      fetch("/search-index.json")
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then(setIndex)
        .catch(() => setFailed(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, failed]);

  const results = useMemo(() => {
    const words = q
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 1);
    if (!index || words.length === 0) return [];
    return (
      index
        .map((e) => {
          const title = e.t.toLowerCase();
          const all = `${title} ${(e.d ?? "").toLowerCase()}`;
          if (!words.every((w) => all.includes(w))) return null;
          const inTitle = words.filter((w) => title.includes(w)).length;
          return { e, score: (WEIGHT[e.k] ?? 3) - inTitle * 2 };
        })
        .filter((x): x is { e: Entry; score: number } => x !== null)
        .sort((a, b) => a.score - b.score)
        .map((x) => x.e)
        // Show pages first and at most four single questions, so a common word does not bury the guides.
        .filter((e, i, all) => e.k !== "Question" || all.slice(0, i).filter((x) => x.k === "Question").length < 4)
        .slice(0, 8)
    );
  }, [q, index]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close search" : "Search"}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className={`grid h-11 w-11 place-items-center rounded-full ${open ? "bg-ink text-paper" : "border border-line bg-panel text-ink hover:border-low"}`}
      >
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id={id}
          role="search"
          className="absolute inset-x-0 top-full border-y border-line bg-panel shadow-[0_24px_48px_-28px_rgba(14,27,44,0.45)]"
        >
          <form
            className="mx-auto max-w-6xl px-4 py-4 sm:px-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (results[0]) window.location.href = results[0].u;
            }}
          >
            <label htmlFor={`${id}-q`} className="text-[0.875rem] font-bold text-muted">
              Search goraedu
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-full border-2 border-low bg-panel py-1.5 pl-4 pr-1.5 focus-within:shadow-[0_0_0_4px_rgba(22,115,224,0.2)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="shrink-0 text-muted"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
              <input
                ref={input}
                id={`${id}-q`}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Questions, rules, tools… e.g. leak rate"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-2 text-[1.0625rem] font-semibold outline-none focus-visible:outline-none"
              />
              <button
                type="submit"
                className="min-h-11 rounded-full bg-low px-5 font-bold text-white hover:brightness-110"
              >
                Search
              </button>
            </div>

            {q.trim().length > 1 ? (
              <div aria-live="polite" className="mt-3">
                {failed ? (
                  <p className="text-[0.9375rem] text-high">Search could not load. Try again in a moment.</p>
                ) : !index ? (
                  <p className="text-[0.9375rem] text-muted">Loading…</p>
                ) : results.length === 0 ? (
                  <p className="text-[0.9375rem] text-muted">No matches. Try fewer or different words.</p>
                ) : (
                  <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
                    {results.map((r) => (
                      <li key={r.u}>
                        <Link
                          href={r.u}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-low-soft"
                        >
                          <span className="font-semibold">{r.t}</span>
                          <span className="shrink-0 rounded-full border border-line px-2.5 text-[0.75rem] font-bold leading-6 text-muted">
                            {r.k}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.875rem]">
                <span className="font-semibold text-muted">Popular:</span>
                {POPULAR.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-line bg-paper px-3 py-1.5 font-semibold hover:border-low hover:text-low"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>
      ) : null}
    </>
  );
}

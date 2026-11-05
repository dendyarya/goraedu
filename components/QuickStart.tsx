"use client";

import { useState } from "react";

export type QuickStartOption = { cert: string; tests: { label: string; href: string }[] };

/** Hero picker: choose a certification and a test, then go straight to it. */
export default function QuickStart({ options }: { options: QuickStartOption[] }) {
  const [cert, setCert] = useState(0);
  const [test, setTest] = useState(0);
  const tests = options[cert]?.tests ?? [];
  return (
    <form
      className="flex max-w-[36rem] flex-wrap items-stretch gap-2 rounded-[1.4rem] border border-line bg-panel p-2"
      onSubmit={(e) => {
        e.preventDefault();
        const t = tests[test];
        if (t) window.location.href = t.href;
      }}
    >
      <label className="flex min-w-[12rem] flex-1 flex-col justify-center rounded-2xl bg-paper px-4 py-1.5">
        <span className="text-[0.8125rem] font-semibold text-muted">Certification</span>
        <select
          value={cert}
          onChange={(e) => {
            setCert(Number(e.target.value));
            setTest(0);
          }}
          className="bg-transparent py-0.5 text-[1rem] font-semibold outline-none"
        >
          {options.map((o, i) => (
            <option key={o.cert} value={i}>
              {o.cert}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-[10rem] flex-1 flex-col justify-center rounded-2xl bg-paper px-4 py-1.5">
        <span className="text-[0.8125rem] font-semibold text-muted">Test</span>
        <select
          value={test}
          onChange={(e) => setTest(Number(e.target.value))}
          className="bg-transparent py-0.5 text-[1rem] font-semibold outline-none"
        >
          {tests.map((t, i) => (
            <option key={t.href} value={i}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="min-h-[3.25rem] rounded-2xl bg-low px-6 font-bold text-white hover:brightness-110"
      >
        Start test
      </button>
    </form>
  );
}

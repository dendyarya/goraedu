"use client";

import { useId, useState } from "react";
import { RNOISE, TABLE_G16A } from "@/lib/osha-gi-rules";
import { Label, RuleQuote } from "./parts";

type Row = { level: string; hours: string };
const LEVELS = Object.keys(TABLE_G16A).map(Number);
const fmt = (n: number, d = 1) => n.toLocaleString("en-US", { maximumFractionDigits: d });

/** Noise dose and 8-hour TWA from 29 CFR 1910.95 Appendix A and Table G-16a, for the hearing conservation program. */
export default function NoiseDose() {
  const id = useId();
  const [rows, setRows] = useState<Row[]>([
    { level: "", hours: "" },
    { level: "", hours: "" },
  ]);
  const set = (i: number, k: keyof Row, v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));

  const parsed = rows.map((r) => {
    const L = Number(r.level);
    const C = Number(r.hours);
    const filled = r.level !== "" && r.hours.trim() !== "";
    const ok = filled && L in TABLE_G16A && Number.isFinite(C) && C > 0 && C <= 24;
    return { L, C, filled, ok, T: ok ? (TABLE_G16A[L] ?? NaN) : NaN };
  });
  const used = parsed.filter((p) => p.ok);
  const bad = parsed.some((p) => p.filled && !p.ok);
  const totalHours = used.reduce((n, p) => n + p.C, 0);
  const dose = used.reduce((n, p) => n + (100 * p.C) / p.T, 0);
  const twa = dose > 0 ? 16.61 * Math.log10(dose / 100) + 90 : NaN;
  const ready = used.length > 0 && !bad && totalHours <= 24;
  const hcp = ready && dose >= 50;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          Enter each period of the work day: its A-weighted sound level (slow response) and how long it lasted.{" "}
          <Label kind="input" />
        </p>
        {rows.map((r, i) => (
          <fieldset key={i} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
            <legend className="sr-only">Period {i + 1}</legend>
            <div>
              <label htmlFor={`${id}-l${i}`} className="mb-1.5 block text-[0.9375rem] font-medium">
                Sound level (dBA)
              </label>
              <select
                id={`${id}-l${i}`}
                value={r.level}
                onChange={(e) => set(i, "level", e.target.value)}
                className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
              >
                <option value="">Choose</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l} dBA
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-h${i}`} className="mb-1.5 block text-[0.9375rem] font-medium">
                Hours
              </label>
              <input
                id={`${id}-h${i}`}
                inputMode="decimal"
                value={r.hours}
                onChange={(e) => set(i, "hours", e.target.value)}
                placeholder="e.g. 4"
                className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
              />
            </div>
            <button
              type="button"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}
              disabled={rows.length === 1}
              aria-label={`Remove period ${i + 1}`}
              className="min-h-11 rounded-full border border-line px-3 text-[0.9375rem] font-semibold disabled:opacity-40"
            >
              Remove
            </button>
          </fieldset>
        ))}
        {rows.length < 8 ? (
          <button
            type="button"
            onClick={() => setRows([...rows, { level: "", hours: "" }])}
            className="min-h-11 rounded-full border border-low px-4 font-semibold text-low hover:bg-low-soft"
          >
            Add a period
          </button>
        ) : null}
        {bad ? <p className="text-high">Enter hours as a number above 0 for every period with a sound level.</p> : null}
        {totalHours > 24 ? <p className="text-high">The periods add up to more than 24 hours.</p> : null}
        <p className="text-[0.9375rem] text-muted">
          Levels are whole decibels from 80 to 130, the rows of Table G-16a. Sound below 80 dBA is left out because the
          rule integrates 80 to 130 decibels.
        </p>
        <RuleQuote source={RNOISE.integrate} />
      </form>

      <div aria-live="polite" className="space-y-5">
        <div className={`rounded-3xl border p-6 ${hcp ? "border-high/50 bg-high-soft" : "border-low/40 bg-low-soft"}`}>
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Noise dose and 8-hour TWA <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2.5rem] font-bold leading-none">
            {ready ? `${fmt(dose)}%` : "—"}
          </p>
          <p className="mt-1 text-[1.125rem] font-semibold">{ready ? `TWA ${fmt(twa)} dBA` : "TWA —"}</p>
          {ready ? (
            <p className="mt-3">
              {hcp
                ? "At or above a dose of 50% (TWA 85 dBA): under 1910.95(c)(1) the employer must run a hearing conservation program for this exposure."
                : "Below a dose of 50% (TWA 85 dBA), the level at which 1910.95(c)(1) requires a hearing conservation program."}
            </p>
          ) : (
            <p className="mt-3 text-muted">Add at least one period to see the dose.</p>
          )}
          {ready ? (
            <ul className="mt-3 space-y-1 text-[0.9375rem] text-muted">
              {used.map((p, i) => (
                <li key={i}>
                  {p.L} dBA for {fmt(p.C, 2)} h: T = {p.T} h <Label kind="official" />, adds {fmt((100 * p.C) / p.T)}%
                </li>
              ))}
            </ul>
          ) : null}
          <RuleQuote source={RNOISE.hcp} />
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <h2 className="text-[1.125rem] font-bold">How it is worked out</h2>
          <RuleQuote source={RNOISE.doseMixed} />
          <RuleQuote source={RNOISE.twa} />
          <p className="mt-4">
            This is the hearing conservation program calculation. The permissible exposure limits are in Table G-16, and
            exposures above them call for controls:
          </p>
          <RuleQuote source={RNOISE.controls} />
          <p className="mt-4 text-muted">
            A study aid. Real exposures are measured with a sound level meter or dosimeter, and hearing protection is
            not subtracted.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { addMonths } from "@/lib/asbestos-rules";
import { RAD_ITEMS } from "@/lib/radiography-rules";
import { Label, RuleQuote } from "./parts";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

/** Latest next dates for the recurring 10 CFR Part 34 checks, from the date each was last done. */
export default function RadiographyDueDates() {
  const id = useId();
  const [last, setLast] = useState<Record<string, string>>({});

  return (
    <div className="space-y-5">
      <p className="text-[0.9375rem] text-muted">
        Enter the date each item was last done; leave the rest blank. <Label kind="input" /> Nothing you type leaves
        your browser.
      </p>
      <ul className="space-y-4">
        {RAD_ITEMS.map((it) => {
          const v = last[it.key] ?? "";
          const next = v ? addMonths(v, it.months) : null;
          return (
            <li key={it.key} className="rounded-3xl border border-line bg-panel p-5">
              <div className="grid gap-4 md:grid-cols-[1fr_15rem] md:items-end">
                <label htmlFor={`${id}-${it.key}`} className="font-semibold">
                  {it.label}
                  <span className="mt-1 block text-[0.9375rem] font-normal text-muted">
                    Interval not to exceed {it.months} months
                  </span>
                </label>
                <input
                  id={`${id}-${it.key}`}
                  type="date"
                  min="1990-01-01"
                  max="2100-12-31"
                  value={v}
                  onChange={(e) => setLast((s) => ({ ...s, [it.key]: e.target.value }))}
                  className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
                />
              </div>
              <div aria-live="polite" className="mt-3">
                {v && !next ? <p className="text-[0.9375rem] font-semibold text-high">Enter a valid date.</p> : null}
                {next ? (
                  <p className="flex flex-wrap items-center gap-2 text-[1.0625rem] font-semibold">
                    Next one no later than {fmt(next)} <Label kind="calc" />
                  </p>
                ) : null}
                <RuleQuote source={it.source} />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-[0.9375rem] text-muted">
        A study aid, not a compliance determination. Some items also apply at other times (for example after instrument
        servicing, or before first use); your license, procedures and any Agreement State rules may set more.
      </p>
    </div>
  );
}

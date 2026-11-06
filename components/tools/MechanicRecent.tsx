"use client";

import { useId, useState } from "react";
import { ACTIVITIES, nextIaExpiry, R65 } from "@/lib/amt-rules";
import { Field, Label, RuleQuote } from "./parts";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

/** Recent experience under 14 CFR 65.83 and inspection authorization expiry under 65.92(a). */
export default function MechanicRecent() {
  const id = useId();
  const [months, setMonths] = useState("");
  const [found, setFound] = useState(false);
  const [day, setDay] = useState("");
  const m = months.trim() === "" ? null : Number(months);
  const bad = m !== null && (!Number.isFinite(m) || m < 0 || m > 24);
  const ok = found || (m !== null && !bad && m >= 6);
  const expiry = day ? nextIaExpiry(day) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          One certificated mechanic. <Label kind="input" />
        </p>
        <Field
          label="Within the preceding 24 months, how many months in total were spent on the activities listed in 65.83(b)? (0 to 24)"
          htmlFor={`${id}-m`}
        >
          <input
            id={`${id}-m`}
            inputMode="decimal"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="e.g. 8"
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        <ul className="space-y-1.5 text-[0.9375rem] text-muted">
          {ACTIVITIES.map((a, i) => (
            <li key={a}>
              ({i + 1}) {a.replace(/;( or)?$|\.$/, "")}
            </li>
          ))}
        </ul>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={found}
            onChange={(e) => setFound(e.target.checked)}
            className="mt-1.5 h-4 w-4 shrink-0"
          />
          <span>
            Within the preceding 24 months, the Administrator has found that the mechanic is able to do that work
          </span>
        </label>
        {bad ? <p className="text-[0.9375rem] font-semibold text-high">Enter a number from 0 to 24.</p> : null}
        <Field label="Optional: a date while holding an inspection authorization" htmlFor={`${id}-d`}>
          <input
            id={`${id}-d`}
            type="date"
            min="1977-01-01"
            max="2100-12-31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Under 14 CFR 65.83 <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight">
            {m === null && !found
              ? "Enter the months or tick the box"
              : ok
                ? "The 65.83 recent experience condition is met"
                : "The 65.83 recent experience condition is not met"}
          </p>
          <p className="mt-3 text-[0.9375rem]">
            {found
              ? "You ticked the Administrator's finding in 65.83(a), which is one of the two ways to meet the section."
              : m !== null && !bad
                ? m >= 6
                  ? `${m} months is at least 6 months, which meets 65.83(b).`
                  : `${m} months is less than the 6 months 65.83(b) names, and no Administrator finding was ticked.`
                : "The section sets two ways: an Administrator finding, or at least 6 months of the listed activities, both within the preceding 24 months."}
          </p>
          <RuleQuote source={R65.recent} />
          <RuleQuote source={found ? R65.found : R65.sixMonths} />
        </div>
        {expiry ? (
          <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
            <p className="flex flex-wrap items-center gap-2">
              Inspection authorization <Label kind="calc" />
            </p>
            <p className="mt-2 font-semibold">
              The first March 31 of an odd-numbered year on or after {fmt(day)} is {fmt(expiry)}.
            </p>
            <RuleQuote source={R65.iaExpires} />
          </div>
        ) : null}
        <p className="text-[0.9375rem] text-muted">
          A study aid, not a determination of anyone&apos;s certificate status. It does not cover the other privileges
          and limitations in 65.81 to 65.89, or inspection authorization renewal in 65.93.
        </p>
      </div>
    </div>
  );
}

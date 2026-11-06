"use client";

import { useId, useState } from "react";
import { addMonths, R763 } from "@/lib/asbestos-rules";
import { Field, Label, RuleQuote } from "./parts";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

/** Next reinspection (763.85(b)) and periodic surveillance (763.92(b)) dates for one school building. */
export default function AheraSchedule() {
  const id = useId();
  const [re, setRe] = useState("");
  const [ps, setPs] = useState("");
  const reDue = re ? addMonths(re, 36) : null;
  const psDue = ps ? addMonths(ps, 6) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          One school building with a management plan in effect. <Label kind="input" />
        </p>
        <Field label="Date of the last reinspection" htmlFor={`${id}-r`}>
          <input
            id={`${id}-r`}
            type="date"
            min="1987-01-01"
            max="2100-12-31"
            value={re}
            onChange={(e) => setRe(e.target.value)}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        <Field label="Date of the last periodic surveillance" htmlFor={`${id}-p`}>
          <input
            id={`${id}-p`}
            type="date"
            min="1987-01-01"
            max="2100-12-31"
            value={ps}
            onChange={(e) => setPs(e.target.value)}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        {(re && !reDue) || (ps && !psDue) ? (
          <p className="text-[0.9375rem] font-semibold text-high">Enter a valid date.</p>
        ) : null}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Reinspection, 40 CFR 763.85(b) <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.5rem] font-bold leading-tight">
            {reDue ? `Next reinspection no later than ${fmt(reDue)}` : "Enter the last reinspection date"}
          </p>
          {reDue ? (
            <p className="mt-3 text-[0.9375rem]">
              That is 3 years after {fmt(re)}. The rule says &ldquo;at least once every 3 years&rdquo;, so it may be
              done earlier.
            </p>
          ) : null}
          <RuleQuote source={R763.reinspection} />
          <RuleQuote source={R763.inspector} />
        </div>
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Periodic surveillance, 40 CFR 763.92(b) <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.5rem] font-bold leading-tight">
            {psDue ? `Next periodic surveillance no later than ${fmt(psDue)}` : "Enter the last surveillance date"}
          </p>
          {psDue ? (
            <p className="mt-3 text-[0.9375rem]">
              That is 6 months after {fmt(ps)}. The rule says &ldquo;at least once every 6 months&rdquo;, so it may be
              done earlier.
            </p>
          ) : null}
          <RuleQuote source={R763.surveillance} />
        </div>
        <p className="text-[0.9375rem] text-muted">
          A study aid, not a compliance determination. It does not cover what each reinspection or surveillance must
          include, recordkeeping, or response actions. Your State may have its own asbestos rules, so check them too.
        </p>
      </div>
    </div>
  );
}

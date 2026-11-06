"use client";

import { useId, useState } from "react";
import { addMonths } from "@/lib/asbestos-rules";
import { R171 } from "@/lib/pesticide-rules";
import { Field, Label, RuleQuote } from "./parts";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const PERIODS = [5, 4, 3, 2, 1] as const;

/** Latest expiry of a restricted use pesticide applicator certification under 40 CFR 171.107(a). */
export default function PesticideExpiry() {
  const id = useId();
  const [issued, setIssued] = useState("");
  const [years, setYears] = useState<(typeof PERIODS)[number]>(5);
  const expires = issued ? addMonths(issued, years * 12) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          One commercial or private applicator certification. <Label kind="input" />
        </p>
        <Field label="Date the certification was issued" htmlFor={`${id}-i`}>
          <input
            id={`${id}-i`}
            type="date"
            min="1987-01-01"
            max="2100-12-31"
            value={issued}
            onChange={(e) => setIssued(e.target.value)}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        <Field label="Certification period set by your certifying authority" htmlFor={`${id}-y`}>
          <select
            id={`${id}-y`}
            value={years}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (PERIODS.includes(v as (typeof PERIODS)[number])) setYears(v as (typeof PERIODS)[number]);
            }}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          >
            {PERIODS.map((p) => (
              <option key={p} value={p}>
                {p === 5 ? "5 years (the federal maximum)" : `${p} year${p === 1 ? "" : "s"} (shorter period)`}
              </option>
            ))}
          </select>
        </Field>
        {issued && !expires ? <p className="text-[0.9375rem] font-semibold text-high">Enter a valid date.</p> : null}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Certification expiry, 40 CFR 171.107(a) <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.5rem] font-bold leading-tight">
            {expires ? `Expires ${fmt(expires)} unless recertified` : "Enter the date the certification was issued"}
          </p>
          {expires ? (
            <p className="mt-3 text-[0.9375rem]">
              That is {years} year{years === 1 ? "" : "s"} after {fmt(issued)}. To keep the certification without a
              break, the rule says recertification must happen before it expires.
            </p>
          ) : null}
          <RuleQuote source={R171.expiry} />
          <RuleQuote source={R171.continuity} />
        </div>
        <p className="text-[0.9375rem] text-muted">
          A study aid, not a compliance determination. Your certifying authority may set a shorter period or its own way
          of counting it, and decides how you recertify (exam or continuing education), so check its rules and your
          credential.
        </p>
      </div>
    </div>
  );
}

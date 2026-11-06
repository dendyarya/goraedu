"use client";

import { useId, useState } from "react";
import { R178, threeYearsAfter, TRIGGERS } from "@/lib/forklift-rules";
import { Field, Label, RuleQuote } from "./parts";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

/** Refresher training triggers and the three-year evaluation under 29 CFR 1910.178(l)(4). */
export default function ForkliftRefresher() {
  const id = useId();
  const [last, setLast] = useState("");
  const [hit, setHit] = useState<string[]>([]);
  const due = last ? threeYearsAfter(last) : null;
  const toggle = (k: string) => setHit((h) => (h.includes(k) ? h.filter((x) => x !== k) : [...h, k]));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          One operator. <Label kind="input" />
        </p>
        <Field label="Date of the operator's last performance evaluation" htmlFor={`${id}-d`}>
          <input
            id={`${id}-d`}
            type="date"
            min="1999-01-01"
            max="2100-12-31"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        <fieldset>
          <legend className="font-semibold">Has any of these happened since then? Tick all that apply.</legend>
          <ul className="mt-3 space-y-2.5">
            {TRIGGERS.map((t) => (
              <li key={t.key}>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={hit.includes(t.key)}
                    onChange={() => toggle(t.key)}
                    className="mt-1.5 h-4 w-4 shrink-0"
                  />
                  <span>
                    ({t.key}) {t.text.replace(/;( or)?$|\.$/, "")}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        {last && !due ? <p className="text-[0.9375rem] font-semibold text-high">Enter a valid date.</p> : null}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Under 29 CFR 1910.178(l)(4) <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight">
            {hit.length ? "Refresher training is required" : "No listed refresher trigger ticked"}
          </p>
          <p className="mt-3 text-[0.9375rem]">
            {hit.length
              ? `You ticked ${hit.map((k) => `(${k})`).join(", ")}. The rule requires refresher training in relevant topics when any listed situation occurs, including an evaluation of how effective that training was.`
              : "Refresher training is tied to the five situations listed in (l)(4)(ii). If none of them has occurred, this paragraph does not trigger it."}
          </p>
          <RuleQuote source={R178.refresher} />
          {hit.length ? <RuleQuote source={R178.refresherEval} /> : null}
          {due ? (
            <>
              <p className="mt-4 font-semibold">
                Three years after {fmt(last)} is {fmt(due)}. The next performance evaluation must be conducted no later
                than that date; it may be done earlier.
              </p>
              <RuleQuote source={R178.evaluation} />
            </>
          ) : null}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <p className="font-semibold">What the employer must certify</p>
          <RuleQuote source={R178.certification} />
          <p className="mt-4 text-muted">
            A study aid, not a compliance determination. It does not cover initial training content, avoidance of
            duplicative training in (l)(5), or the construction rules in 1926.602. Your State may run its own
            OSHA-approved plan with its own rules, so check them too.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { R1408, TABLE_A } from "@/lib/crane-rules";
import { Field, Label, RuleQuote } from "./parts";

const num = (s: string) => {
  const n = Number(s);
  return s.trim() === "" ? null : Number.isFinite(n) && n >= 0 && n <= 1e6 ? n : NaN;
};

/** Table A clearance and the 20-foot determination under 29 CFR 1926.1408 (lines up to 350 kV). */
export default function CranePowerLine() {
  const id = useId();
  const [kv, setKv] = useState("");
  const [dist, setDist] = useState("");
  const v = num(kv);
  const d = num(dist);
  const row = v !== null && !Number.isNaN(v) && v > 0 ? TABLE_A.find((r) => v <= r.max) : undefined;
  const over = v !== null && !Number.isNaN(v) && v > 350;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          One power line near the work zone. <Label kind="input" />
        </p>
        <Field label="Line voltage (nominal kV, alternating current); leave blank if not known" htmlFor={`${id}-v`}>
          <input
            id={`${id}-v`}
            inputMode="decimal"
            value={kv}
            onChange={(e) => setKv(e.target.value)}
            placeholder="e.g. 13.8"
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        <Field
          label="Closest the equipment, load line or load could get to the line, operating up to maximum working radius in the work zone (feet)"
          htmlFor={`${id}-d`}
        >
          <input
            id={`${id}-d`}
            inputMode="decimal"
            value={dist}
            onChange={(e) => setDist(e.target.value)}
            placeholder="e.g. 18"
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        {(v !== null && Number.isNaN(v)) || (d !== null && Number.isNaN(d)) ? (
          <p className="text-[0.9375rem] font-semibold text-high">Enter numbers of 0 or more.</p>
        ) : null}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Under 29 CFR 1926.1408 <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight">
            {over
              ? "Over 350 kV: outside this section"
              : row
                ? `Table A minimum clearance: ${row.feet} feet`
                : "Table A: enter the voltage"}
          </p>
          <p className="mt-3 text-[0.9375rem]">
            {over
              ? "Section 1926.1408 is headed “up to 350 kV”. This tool does not cover higher voltages."
              : row
                ? `${v} kV falls in the Table A row “${row.label}” kV. That distance applies if you use Option (3).`
                : "Without the voltage, Option (3) cannot be used yet. Under Option (3) the utility owner/operator must give the voltage when asked."}
          </p>
          <RuleQuote source={over ? R1408.heading : row ? R1408.option3 : R1408.voltage} />
          {row ? <RuleQuote source={R1408.note} /> : null}
          {d !== null && !Number.isNaN(d) ? (
            <>
              <p className="mt-4 font-semibold">
                {d < 20
                  ? `It could get within ${d} feet, closer than 20 feet: the employer must meet Option (1), (2) or (3).`
                  : `It could not get closer than 20 feet (${d} feet), so the Option (1)–(3) requirement in (a)(2) is not triggered by this line.`}
              </p>
              <RuleQuote source={R1408.twenty} />
            </>
          ) : null}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <p className="font-semibold">The three options</p>
          <RuleQuote source={R1408.option1} />
          <RuleQuote source={R1408.option2} />
          <RuleQuote source={R1408.option3} />
          <p className="mt-4 text-muted">
            Options (2) and (3) also require the encroachment precautions in 1926.1408(b). A study aid, not a compliance
            determination: it does not cover the work zone rules in (a)(1), operations below or traveling near lines, or
            other sections of Subpart CC. Your State may run its own OSHA-approved plan with its own rules, so check
            them too.
          </p>
        </div>
      </div>
    </div>
  );
}

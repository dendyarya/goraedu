"use client";

import { useId, useState } from "react";
import { R133 } from "@/lib/wastewater-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

type Param = "bod" | "cbod" | "ss";

const LEVELS: Record<Param, { name: string; avg30: number; avg7: number; src: (typeof R133)[keyof typeof R133] }> = {
  bod: { name: "BOD5", avg30: 30, avg7: 45, src: R133.bod },
  cbod: { name: "CBOD5", avg30: 25, avg7: 40, src: R133.cbod },
  ss: { name: "SS (total suspended solids)", avg30: 30, avg7: 45, src: R133.ss },
};

const num = (s: string) => {
  const n = Number(s);
  return s.trim() !== "" && Number.isFinite(n) && n >= 0 && n <= 1e6 ? n : null;
};
const clean = (n: number) => Number(n.toPrecision(10));

type Check = { name: string; ok: boolean; detail: string };

/** Compares 30-day and 7-day averages with the secondary treatment levels in 40 CFR 133.102(a) and (b). */
export default function SecondaryTreatment() {
  const id = useId();
  const [param, setParam] = useState<Param>("bod");
  const [inf, setInf] = useState("");
  const [eff, setEff] = useState("");
  const [eff7, setEff7] = useState("");
  const L = LEVELS[param];

  const i30 = num(inf);
  const e30 = num(eff);
  const e7 = num(eff7);
  const removal = i30 !== null && e30 !== null && i30 > 0 ? clean(((i30 - e30) / i30) * 100) : null;

  const checks: Check[] = [];
  if (e30 !== null)
    checks.push({
      name: "30-day average",
      ok: e30 <= L.avg30,
      detail: `${e30} mg/l; the level is "shall not exceed ${L.avg30} mg/l".`,
    });
  if (e7 !== null)
    checks.push({
      name: "7-day average",
      ok: e7 <= L.avg7,
      detail: `${e7} mg/l; the level is "shall not exceed ${L.avg7} mg/l".`,
    });
  if (removal !== null)
    checks.push({
      name: "30-day average percent removal",
      ok: removal >= 85,
      detail: `(${i30} − ${e30}) ÷ ${i30} × 100 = ${removal}%; the level is "shall not be less than 85 percent".`,
    });

  const allOk = checks.length > 0 && checks.every((c) => c.ok);
  const box = (v: string, set: (x: string) => void, label: string, hint: string, key: string) => (
    <Field label={label} htmlFor={`${id}-${key}`}>
      <input
        id={`${id}-${key}`}
        inputMode="decimal"
        value={v}
        onChange={(e) => set(e.target.value)}
        placeholder={hint}
        className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
      />
    </Field>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          Enter averages you have already worked out from your results. <Label kind="input" />
        </p>
        <Segmented
          legend="Parameter"
          value={param}
          onChange={setParam}
          options={[
            { value: "bod", label: "BOD5" },
            { value: "cbod", label: "CBOD5", hint: "Only where the permitting authority substitutes it for BOD5" },
            { value: "ss", label: "SS (total suspended solids)" },
          ]}
        />
        {box(inf, setInf, "30-day average influent concentration (mg/l)", "e.g. 220", "i")}
        {box(eff, setEff, "30-day average effluent concentration (mg/l)", "e.g. 18", "e")}
        {box(eff7, setEff7, "Highest 7-day average effluent concentration (mg/l)", "e.g. 27", "e7")}
        {i30 === 0 ? (
          <p className="text-[0.9375rem] font-semibold text-high">
            Influent must be more than 0 to work out percent removal.
          </p>
        ) : null}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div
          className={`rounded-3xl border p-6 ${checks.length && !allOk ? "border-high/50 bg-high-soft" : "border-low/40 bg-low-soft"}`}
        >
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            {L.name} against 40 CFR 133.102 <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold leading-tight">
            {checks.length === 0 ? "—" : allOk ? "Within the levels checked" : "Outside a level"}
          </p>
          {checks.length ? (
            <ul className="mt-4 space-y-3">
              {checks.map((c) => (
                <li key={c.name}>
                  <p className="font-semibold">
                    {c.ok ? "Within" : "Outside"}: {c.name}
                  </p>
                  <p className="text-[0.9375rem] text-muted">{c.detail}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">Enter at least one value.</p>
          )}
          <RuleQuote source={L.src} />
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <p className="font-semibold">How the averages are defined</p>
          <RuleQuote source={R133.avg30} />
          <RuleQuote source={R133.avg7} />
          <RuleQuote source={R133.removal} />
          <p className="mt-4">
            We work out percent removal as (influent − effluent) ÷ influent × 100 from the two 30-day averages. The rule
            describes percent removal in words and does not print a formula.
          </p>
          <p className="mt-4 font-semibold">What these levels are</p>
          <RuleQuote source={R133.intro} />
          <p className="mt-4">Section 133.103 allows adjustments, for example for combined sewers in wet weather:</p>
          <RuleQuote source={R133.combined} />
          <p className="mt-4 text-muted">
            A study aid, not a compliance determination. Your facility&apos;s NPDES permit sets the limits that apply to
            you, and it can differ from these levels (for example treatment equivalent to secondary treatment in
            133.105). Your State program and your facility&apos;s permit may have their own requirements, so check them
            too.
          </p>
        </div>
      </div>
    </div>
  );
}

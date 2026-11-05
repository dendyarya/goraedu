"use client";

import { useId, useState } from "react";
import { RLCR } from "@/lib/water-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

type Metal = "lead" | "copper";
type Unit = "mgl" | "ugl";

/** Parses one result per line or separated by commas/spaces. Returns null if any entry is not a number from 0 up. */
function parse(text: string): number[] | null {
  const parts = text.split(/[\s,;]+/).filter(Boolean);
  if (parts.length > 1000) return null;
  const out: number[] = [];
  for (const p of parts) {
    const n = Number(p);
    if (!Number.isFinite(n) || n < 0 || n > 1e6) return null;
    out.push(n);
  }
  return out;
}

// Avoids float noise such as 0.30000000000000004 in what we display; the comparison uses the same cleaned value.
const clean = (n: number) => Number(n.toPrecision(12));
const show = (n: number, unit: Unit) => `${clean(n)} ${unit === "mgl" ? "mg/L" : "µg/L"}`;

/** 90th percentile of lead or copper tap results under 40 CFR 141.80(c)(3)(i), as revised in 2024. */
export default function LeadCopper90th() {
  const id = useId();
  const [metal, setMetal] = useState<Metal>("lead");
  const [unit, setUnit] = useState<Unit>("mgl");
  const [text, setText] = useState("");

  const values = parse(text);
  const sorted = values ? [...values].sort((a, b) => a - b) : [];
  const n = sorted.length;
  const at = (i: number): number => sorted[i] ?? 0;
  const level = metal === "lead" ? 0.01 : 1.3; // mg/L, 141.80(c)(1) and (c)(2)
  const toMgl = (v: number) => clean(unit === "mgl" ? v : v / 1000);

  type Result =
    | { kind: "value"; value: number; how: string; src: (typeof RLCR)[keyof typeof RLCR] }
    | { kind: "between"; lo: number; hi: number; pos: number };
  let result: Result | null = null;
  if (values && n > 0) {
    if (n < 5)
      result = {
        kind: "value",
        value: at(n - 1),
        how: `With ${n} result${n === 1 ? "" : "s"} (fewer than five), the highest result is the 90th percentile value.`,
        src: RLCR.fewer,
      };
    else if (n === 5)
      result = {
        kind: "value",
        value: clean((at(3) + at(4)) / 2),
        how: `With five results, the 90th percentile is the average of the highest (${show(at(4), unit)}) and second highest (${show(at(3), unit)}).`,
        src: RLCR.five,
      };
    else if ((n * 9) % 10 === 0) {
      const k = (n * 9) / 10;
      result = {
        kind: "value",
        value: at(k - 1),
        how: `${n} results × 0.9 = ${k}, so the 90th percentile is result number ${k} counting up from the lowest.`,
        src: RLCR.multiply,
      };
    } else {
      const pos = clean(n * 0.9);
      result = { kind: "between", lo: at(Math.floor(pos) - 1), hi: at(Math.ceil(pos) - 1), pos };
    }
  }

  const exceeded = (v: number) => toMgl(v) > level;
  const verdict =
    result === null
      ? null
      : result.kind === "value"
        ? exceeded(result.value)
        : exceeded(result.lo) === exceeded(result.hi)
          ? exceeded(result.lo)
          : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          Enter the tap sample results from one tap sampling period. <Label kind="input" />
        </p>
        <Segmented
          legend="Metal"
          value={metal}
          onChange={setMetal}
          options={[
            { value: "lead", label: "Lead", hint: "Action level: greater than 0.010 mg/L" },
            { value: "copper", label: "Copper", hint: "Action level: greater than 1.3 mg/L" },
          ]}
        />
        <Segmented
          legend="Unit of your results"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "mgl", label: "mg/L" },
            { value: "ugl", label: "µg/L (1 mg/L = 1,000 µg/L)" },
          ]}
        />
        <Field label="Results, one per line or separated by commas" htmlFor={`${id}-r`}>
          <textarea
            id={`${id}-r`}
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={unit === "mgl" ? "0.002\n0.004\n0.011" : "2\n4\n11"}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        {values === null ? (
          <p className="text-[0.9375rem] font-semibold text-high">
            Each entry must be a number of zero or more (up to 1,000 results). Remove any units or text.
          </p>
        ) : null}
        <p className="text-[0.9375rem] text-muted">
          Enter only results that are eligible for the 90th percentile under § 141.86(e). Nothing you type leaves your
          browser.
        </p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div
          className={`rounded-3xl border p-6 ${verdict ? "border-high/50 bg-high-soft" : "border-low/40 bg-low-soft"}`}
        >
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            90th percentile, 2024-revised Subpart I <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold leading-tight">
            {result === null
              ? "—"
              : result.kind === "value"
                ? show(result.value, unit)
                : `Between ${show(result.lo, unit)} and ${show(result.hi, unit)}`}
          </p>
          {result === null ? (
            <p className="mt-3 text-muted">Enter at least one result.</p>
          ) : (
            <>
              <p className="mt-3 font-semibold">
                {verdict === null
                  ? "Whether the action level is exceeded depends on which of the two results is used."
                  : verdict
                    ? `Above the ${metal} action level`
                    : `Not above the ${metal} action level`}
              </p>
              {result.kind === "value" ? (
                <>
                  <p className="mt-2 text-[0.9375rem] text-muted">{result.how}</p>
                  <RuleQuote source={result.src} />
                </>
              ) : (
                <>
                  <p className="mt-2 text-[0.9375rem] text-muted">
                    {n} results × 0.9 = {result.pos}, which is not a whole number. The rule text multiplies by 0.9 but
                    does not say how to treat a fraction, so we show results number {Math.floor(result.pos)} and{" "}
                    {Math.ceil(result.pos)}. Ask your State drinking water program how it applies this.
                  </p>
                  <RuleQuote source={RLCR.multiply} />
                </>
              )}
              <RuleQuote source={metal === "lead" ? RLCR.lead : RLCR.copper} />
              <details className="mt-4 text-[0.9375rem]">
                <summary className="cursor-pointer font-semibold">Results in ascending order</summary>
                <ol className="mt-2 list-decimal pl-6 text-muted">
                  {sorted.map((v, i) => (
                    <li key={i}>{show(v, unit)}</li>
                  ))}
                </ol>
              </details>
            </>
          )}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <p className="font-semibold">Dates</p>
          <p className="mt-1">
            This tool follows Subpart I as revised in 2024. Systems must comply with it no later than November 1, 2027,
            except where the rule says otherwise:
          </p>
          <RuleQuote source={RLCR.compliance} />
          <p className="mt-4">Until then, the earlier text applies, with listed additions:</p>
          <RuleQuote source={RLCR.interim} />
          <p className="mt-4 font-semibold">Which results go in the list</p>
          <p className="mt-1">
            The count above follows 141.80(c)(3)(i), for systems whose sites are all Tier 3, 4 or 5. Systems with enough
            Tier 1 and 2 sites use (c)(3)(ii), which counts the same way but says which result per site goes in the
            list:
          </p>
          <RuleQuote source={RLCR.tiers} />
          <p className="mt-4 text-muted">
            A study aid, not a compliance determination. It does not cover (c)(3)(iii) (too few Tier 1 and 2 sites), the
            sample eligibility rules in § 141.86(e), or State decisions. Your State may set stricter requirements.
          </p>
        </div>
      </div>
    </div>
  );
}

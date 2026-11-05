"use client";

import { useId, useState } from "react";
import { LEAK_RATES, SRC, type RuleSource } from "@/lib/epa608-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

type Method = "annualizing" | "rolling";

function num(s: string) {
  const n = Number(s);
  return s.trim() !== "" && Number.isFinite(n) ? n : NaN;
}

/**
 * Leak rate under 40 CFR 82.152, with both methods the rule allows, compared with the §82.157(c)(2) rates.
 * Runs only in the browser; nothing typed here is stored or sent.
 */
export default function LeakRateCalculator() {
  const id = useId();
  const [refrigerant, setRefrigerant] = useState<"ods" | "substitute">("ods");
  const [category, setCategory] = useState<(typeof LEAK_RATES)[number]["id"]>("comfort");
  const [method, setMethod] = useState<Method>("annualizing");
  const [charge, setCharge] = useState("");
  const [added, setAdded] = useState("");
  const [days, setDays] = useState("");

  const full = num(charge);
  const add = num(added);
  const d = num(days);
  const threshold = LEAK_RATES.find((r) => r.id === category)!;

  let error = "";
  if (charge && !(full > 0)) error = "Enter the full charge in pounds, more than 0.";
  else if (added && !(add >= 0)) error = "Enter the refrigerant added in pounds, 0 or more.";
  else if (method === "annualizing" && days && !(Number.isInteger(d) && d >= 1))
    error = "Enter the days since refrigerant was last added as a whole number, 1 or more.";

  const ready = !error && full > 0 && add >= 0 && (method === "rolling" || (Number.isInteger(d) && d >= 1));

  let notApplicable: { reason: string; source: RuleSource } | null = null;
  if (refrigerant === "substitute")
    notApplicable = {
      reason: "The leak repair rules in § 82.157 do not apply to this appliance.",
      source: SRC.substitutes,
    };
  else if (full > 0 && full < 50)
    notApplicable = {
      reason: "With a full charge under 50 pounds, the leak repair rules in § 82.157 do not apply to this appliance.",
      source: SRC.applicability,
    };

  // Annualizing: (added / full) / (min(days, 365) / 365) × 100. Rolling average: (sum added over 365 days / full) × 100.
  const rate = ready
    ? method === "annualizing"
      ? (add / full / (Math.min(d, 365) / 365)) * 100
      : (add / full) * 100
    : NaN;
  const over = rate > threshold.rate;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-6 rounded-2xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <Segmented
          legend="Refrigerant in the appliance"
          value={refrigerant}
          onChange={setRefrigerant}
          options={[
            { value: "ods", label: "Class I or II (ozone-depleting), or a blend with one" },
            { value: "substitute", label: "Only substitute refrigerants (for example, HFCs)" },
          ]}
        />
        <Field label="Appliance category" htmlFor={`${id}-cat`}>
          <select
            id={`${id}-cat`}
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="w-full rounded-xl border border-line bg-paper px-3 py-2.5"
          >
            {LEAK_RATES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Full charge (pounds)" htmlFor={`${id}-full`}>
          <input
            id={`${id}-full`}
            inputMode="decimal"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
            className="w-full rounded-xl border border-line bg-paper px-3 py-2.5"
            placeholder="e.g. 300"
          />
        </Field>
        <Segmented
          legend="Calculation method"
          value={method}
          onChange={setMethod}
          options={[
            { value: "annualizing", label: "Annualizing method" },
            { value: "rolling", label: "Rolling average method" },
          ]}
        />
        <Field
          label={
            method === "annualizing"
              ? "Refrigerant added to return it to a full charge (pounds)"
              : "Total refrigerant added over the previous 365 days (pounds)"
          }
          htmlFor={`${id}-add`}
        >
          <input
            id={`${id}-add`}
            inputMode="decimal"
            value={added}
            onChange={(e) => setAdded(e.target.value)}
            className="w-full rounded-xl border border-line bg-paper px-3 py-2.5"
            placeholder="e.g. 12"
          />
        </Field>
        {method === "annualizing" ? (
          <Field label="Days since refrigerant was last added" htmlFor={`${id}-days`}>
            <input
              id={`${id}-days`}
              inputMode="numeric"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-3 py-2.5"
              placeholder="e.g. 90"
            />
          </Field>
        ) : (
          <p className="text-[0.9375rem] text-muted">
            If a successful follow-up verification test showed all leaks repaired less than a year ago, use the
            refrigerant added since that test.
          </p>
        )}
        <p className="text-[0.9375rem] text-muted">
          Everything you type stays in your browser. All numbers above are <Label kind="input" />.
        </p>
      </form>

      <div aria-live="polite" className="space-y-5">
        {error ? (
          <div className="rounded-2xl border border-high/50 bg-high-soft p-6 text-high">{error}</div>
        ) : notApplicable ? (
          <div className="rounded-2xl border border-line bg-panel p-6">
            <h2 className="text-[1.375rem] font-bold">Not covered by § 82.157</h2>
            <p className="mt-2">{notApplicable.reason}</p>
            <RuleQuote source={notApplicable.source} />
          </div>
        ) : !ready ? (
          <div className="rounded-2xl border border-dashed border-line p-6 text-muted">
            Enter the full charge, the refrigerant added
            {method === "annualizing" ? " and the days since the last addition" : ""} to see the leak rate.
          </div>
        ) : (
          <div
            className={`rounded-2xl border p-6 ${over ? "border-high/50 bg-high-soft" : "border-low/40 bg-low-soft"}`}
          >
            <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
              Leak rate <Label kind="calc" />
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-[3rem] font-bold leading-none [font-stretch:88%]">
              {rate.toFixed(1)}%
            </p>
            <p className="mt-2 text-[0.9375rem] text-muted">
              {method === "annualizing"
                ? `(${add} ÷ ${full}) ÷ (${Math.min(d, 365)} ÷ 365) × 100`
                : `(${add} ÷ ${full}) × 100`}
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-2">
              Applicable leak rate: <strong>{threshold.rate}%</strong> <Label kind="official" />
            </p>
            <p className={`mt-3 text-[1.125rem] font-semibold ${over ? "text-high" : "text-low"}`}>
              {over
                ? `Over the ${threshold.rate}% leak rate for this category.`
                : `Not over the ${threshold.rate}% leak rate for this category.`}
            </p>
            {over ? (
              <>
                <p className="mt-2">
                  The rule requires the owner or operator to repair the leaks within 30 days (120 days if an industrial
                  process shutdown is required), or to retrofit or retire the appliance under the rule&apos;s plan
                  requirements.
                </p>
                <RuleQuote source={SRC.repair} />
                <RuleQuote source={SRC.repairOrRetire} />
              </>
            ) : null}
            <RuleQuote source={SRC.rates} />
          </div>
        )}
        <div className="rounded-2xl border border-line bg-panel p-6 text-[0.9375rem]">
          <h2 className="text-[1.125rem] font-bold">What the rule says about the calculation</h2>
          <RuleQuote source={SRC.leakRate} />
          <RuleQuote source={SRC.sameMethod} />
          <RuleQuote source={SRC.calculateEvery} />
        </div>
      </div>
    </div>
  );
}

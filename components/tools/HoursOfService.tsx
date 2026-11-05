"use client";

import { useId, useState } from "react";
import { hm, RHOS } from "@/lib/cdl-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

const num = (s: string, max: number) => {
  const n = Number(s);
  return s.trim() !== "" && Number.isFinite(n) && n >= 0 && n <= max ? n : null;
};

/** Remaining driving time under the property-carrying limits in 49 CFR 395.3, from the driver's own numbers. */
export default function HoursOfService() {
  const id = useId();
  const [week, setWeek] = useState<"60" | "70">("70");
  const [driven, setDriven] = useState("");
  const [sinceOn, setSinceOn] = useState("");
  const [sinceBreak, setSinceBreak] = useState("");
  const [cycle, setCycle] = useState("");

  const d = num(driven, 24);
  const w = num(sinceOn, 24);
  const b = num(sinceBreak, 24);
  const c = num(cycle, 200);
  const limit = week === "60" ? 60 : 70;
  const filled = [driven, sinceOn, sinceBreak, cycle].every((x) => x.trim() !== "");
  const valid = d !== null && w !== null && b !== null && c !== null;
  const bad = filled && !valid;

  const rows = valid
    ? [
        { key: "11-hour driving limit", left: 11 - d!, src: RHOS.driving },
        { key: "14-hour period", left: 14 - w!, src: RHOS.window },
        {
          key: `${limit}-hour / ${week === "60" ? 7 : 8}-day limit`,
          left: limit - c!,
          src: week === "60" ? RHOS.sixty : RHOS.seventy,
        },
      ]
    : [];
  const left = rows.length ? Math.max(0, Math.min(...rows.map((r) => r.left))) : 0;
  const binding = rows.length ? rows.reduce((a, r) => (r.left < a.left ? r : a)) : null;
  const breakIn = valid ? 8 - b! : 0;

  const input = (v: string, set: (s: string) => void, label: string, hint: string, key: string) => (
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
          For a property-carrying vehicle, after at least 10 consecutive hours off duty. Hours in decimals, e.g. 6.5.{" "}
          <Label kind="input" />
        </p>
        {input(driven, setDriven, "Hours driven since the last 10 hours off duty", "e.g. 6", "d")}
        {input(sinceOn, setSinceOn, "Hours since coming on duty (clock time, including breaks)", "e.g. 9", "w")}
        {input(sinceBreak, setSinceBreak, "Hours driven since the last 30-minute interruption", "e.g. 4", "b")}
        <Segmented
          legend="Does the motor carrier operate vehicles every day of the week?"
          value={week}
          onChange={setWeek}
          options={[
            { value: "70", label: "Yes: 70 hours in 8 consecutive days" },
            { value: "60", label: "No: 60 hours in 7 consecutive days" },
          ]}
        />
        {input(
          cycle,
          setCycle,
          `Hours on duty in the last ${week === "60" ? 7 : 8} consecutive days, including today`,
          "e.g. 52",
          "c",
        )}
        {bad ? (
          <p className="text-high">Enter hours as numbers (0 to 24, or up to 200 for the multi-day total).</p>
        ) : null}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-5">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Driving time left under 395.3 <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2.5rem] font-bold leading-none">
            {valid ? hm(left) : "—"}
          </p>
          {valid && binding ? (
            <>
              <p className="mt-3">
                {left <= 0 ? `No driving: the ${binding.key} is used up.` : `The ${binding.key} runs out first.`}{" "}
                {breakIn <= 0
                  ? "A consecutive 30-minute interruption is due before driving again, unless a short-haul exception applies."
                  : breakIn < left
                    ? `A 30-minute interruption is due within ${hm(breakIn)} of driving, unless a short-haul exception applies.`
                    : ""}
              </p>
              <ul className="mt-3 space-y-1 text-[0.9375rem] text-muted">
                {rows.map((r) => (
                  <li key={r.key}>
                    {r.key}: {hm(Math.max(0, r.left))} left <Label kind="official" />
                  </li>
                ))}
                <li>
                  8 hours of driving before a 30-minute interruption: {hm(Math.max(0, breakIn))} left{" "}
                  <Label kind="official" />
                </li>
              </ul>
            </>
          ) : (
            <p className="mt-3 text-muted">Fill in all four numbers to see the result.</p>
          )}
          <RuleQuote source={RHOS.scope} />
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <h2 className="text-[1.125rem] font-bold">The limits it applies</h2>
          <RuleQuote source={RHOS.offDuty} />
          <RuleQuote source={RHOS.window} />
          <RuleQuote source={RHOS.driving} />
          <RuleQuote source={RHOS.breakRule} />
          <RuleQuote source={week === "60" ? RHOS.sixty : RHOS.seventy} />
          <RuleQuote source={week === "60" ? RHOS.restart7 : RHOS.restart8} />
          <p className="mt-4 text-muted">
            A study aid only. It does not apply the exceptions in 49 CFR 395.1 (for example adverse driving conditions,
            short-haul operations or sleeper berth periods) and does not cover passenger-carrying vehicles, which follow
            49 CFR 395.5. Your record of duty status or ELD is the record that counts.
          </p>
        </div>
      </div>
    </div>
  );
}

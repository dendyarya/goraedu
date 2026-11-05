"use client";

import { useId, useState } from "react";
import { feetInches, ROSHA } from "@/lib/osha-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

/** Minimum scaffold clearance from power lines, from the table in 29 CFR 1926.451(f)(6). */
export default function PowerLineClearance() {
  const id = useId();
  const [ins, setIns] = useState<"insulated" | "uninsulated">("uninsulated");
  const [unit, setUnit] = useState<"v" | "kv">("kv");
  const [val, setVal] = useState("");
  const n = Number(val);
  const valid = val.trim() !== "" && Number.isFinite(n) && n > 0 && n <= 1000000;
  const kv = unit === "kv" ? n : n / 1000;

  let result = "";
  let row = "";
  let extra = false;
  if (valid) {
    if (ins === "insulated") {
      if (kv < 0.3) [result, row] = ["3 ft", "Insulated, less than 300 volts"];
      else if (kv <= 50) [result, row] = ["10 ft", "Insulated, 300 volts to 50 kV"];
      else [result, row, extra] = [feetInches(10 + (0.4 * (kv - 50)) / 12), "Insulated, more than 50 kV", true];
    } else {
      if (kv < 50) [result, row] = ["10 ft", "Uninsulated, less than 50 kV"];
      else if (kv > 50)
        [result, row, extra] = [feetInches(10 + (0.4 * (kv - 50)) / 12), "Uninsulated, more than 50 kV", true];
      else [result, row] = ["", "Uninsulated, exactly 50 kV"];
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-6 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <Segmented
          legend="Power line"
          value={ins}
          onChange={setIns}
          options={[
            { value: "uninsulated", label: "Uninsulated" },
            { value: "insulated", label: "Insulated" },
          ]}
        />
        <Segmented
          legend="Voltage unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "kv", label: "Kilovolts (kV)" },
            { value: "v", label: "Volts (V)" },
          ]}
        />
        <Field label={`Line voltage (${unit === "kv" ? "kV" : "V"})`} htmlFor={`${id}-v`}>
          <input
            id={`${id}-v`}
            inputMode="decimal"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={unit === "kv" ? "e.g. 69" : "e.g. 240"}
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        <p className="text-[0.9375rem] text-muted">
          Ask the utility or electrical system operator for the voltage; do not guess it.
        </p>
      </form>

      <div aria-live="polite" className="space-y-5">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Minimum distance {extra ? <Label kind="calc" /> : <Label kind="official" />}
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2.5rem] font-bold leading-none">
            {valid ? result || "Not listed" : "—"}
          </p>
          {valid ? (
            <p className="mt-3 text-muted">
              {row}.{" "}
              {extra
                ? `10 feet plus 0.4 inches for each 1 kV over 50 kV (${(kv - 50).toLocaleString("en-US")} kV over).`
                : !result
                  ? "The table lists uninsulated lines as less than 50 kV or more than 50 kV, with no row for exactly 50 kV."
                  : ""}
            </p>
          ) : null}
          <RuleQuote source={ins === "insulated" ? ROSHA.insulatedRows : ROSHA.uninsulatedRows} />
          {extra ? <RuleQuote source={ROSHA.alternative} /> : null}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <RuleQuote source={ROSHA.scaffoldLines} />
          <RuleQuote source={ROSHA.closerException} />
        </div>
      </div>
    </div>
  );
}

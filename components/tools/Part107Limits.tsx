"use client";

import { useId, useState } from "react";
import { R107 } from "@/lib/faa-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

const num = (s: string, max: number) => {
  const n = Number(s);
  return s.trim() !== "" && Number.isFinite(n) && n >= 0 && n <= max ? n : null;
};

type Check = { name: string; ok: boolean; detail: string; src: (typeof R107)[keyof typeof R107] };

/** Checks planned flight values against the operating limitations in 14 CFR 107.51. */
export default function Part107Limits() {
  const id = useId();
  const [unit, setUnit] = useState<"kt" | "mph">("mph");
  const [speed, setSpeed] = useState("");
  const [alt, setAlt] = useState("");
  const [near, setNear] = useState<"no" | "yes">("no");
  const [structure, setStructure] = useState("");
  const [vis, setVis] = useState("");
  const [below, setBelow] = useState("");
  const [horiz, setHoriz] = useState("");

  const s = num(speed, 1000);
  const a = num(alt, 100000);
  const h = num(structure, 100000);
  const v = num(vis, 1000);
  const cb = num(below, 1000000);
  const ch = num(horiz, 1000000);

  const checks: Check[] = [];
  if (s !== null) {
    const ok = unit === "kt" ? s <= 87 : s <= 100;
    checks.push({
      name: "Groundspeed",
      ok,
      detail: `${s} ${unit === "kt" ? "knots" : "mph"}; the limit is 87 knots (100 mph).`,
      src: R107.speed,
    });
  }
  if (a !== null && (near === "no" || h !== null)) {
    const max = near === "yes" ? (h ?? 0) + 400 : 400;
    checks.push({
      name: "Altitude",
      ok: a <= max,
      detail:
        near === "yes"
          ? `${a} ft AGL; within 400 ft of a ${h} ft structure the limit is 400 ft above its top, ${max} ft AGL.`
          : `${a} ft AGL; the limit is 400 ft above ground level.`,
      src: R107.altitude,
    });
  }
  if (v !== null)
    checks.push({
      name: "Flight visibility",
      ok: v >= 3,
      detail: `${v} statute miles; the minimum is 3 statute miles from the control station.`,
      src: R107.visibility,
    });
  if (cb !== null && ch !== null)
    checks.push({
      name: "Distance from clouds",
      ok: cb >= 500 && ch >= 2000,
      detail: `${cb} ft below and ${ch} ft horizontally; the minimums are 500 ft below and 2,000 ft horizontally.`,
      src: R107.clouds,
    });

  const allOk = checks.length > 0 && checks.every((c) => c.ok);
  const box = (v2: string, set: (x: string) => void, label: string, hint: string, key: string) => (
    <Field label={label} htmlFor={`${id}-${key}`}>
      <input
        id={`${id}-${key}`}
        inputMode="decimal"
        value={v2}
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
          Fill in any of the values for a planned flight. <Label kind="input" />
        </p>
        <Segmented
          legend="Speed unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "mph", label: "Miles per hour" },
            { value: "kt", label: "Knots" },
          ]}
        />
        {box(speed, setSpeed, `Highest groundspeed (${unit === "kt" ? "knots" : "mph"})`, "e.g. 40", "s")}
        {box(alt, setAlt, "Highest altitude above ground level (feet)", "e.g. 350", "a")}
        <Segmented
          legend="Is the aircraft flown within a 400-foot radius of a structure?"
          value={near}
          onChange={setNear}
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]}
        />
        {near === "yes"
          ? box(structure, setStructure, "Height of the structure's top (feet AGL)", "e.g. 300", "h")
          : null}
        {box(vis, setVis, "Flight visibility from the control station (statute miles)", "e.g. 5", "v")}
        {box(below, setBelow, "Distance below the cloud base (feet)", "e.g. 1500", "cb")}
        {box(horiz, setHoriz, "Horizontal distance from the nearest cloud (feet)", "e.g. 3000", "ch")}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div
          className={`rounded-3xl border p-6 ${checks.length && !allOk ? "border-high/50 bg-high-soft" : "border-low/40 bg-low-soft"}`}
        >
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Against 14 CFR 107.51 <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold leading-tight">
            {checks.length === 0 ? "—" : allOk ? "Within the limits checked" : "Outside a limit"}
          </p>
          {checks.length ? (
            <ul className="mt-4 space-y-4">
              {checks.map((c) => (
                <li key={c.name}>
                  <p className="font-semibold">
                    {c.ok ? "Within" : "Outside"}: {c.name}
                  </p>
                  <p className="text-[0.9375rem] text-muted">{c.detail}</p>
                  <RuleQuote source={c.src} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">Enter at least one value to check it.</p>
          )}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <RuleQuote source={R107.scope} />
          <p className="mt-4">
            These limits can be waived only by a certificate of waiver; 107.51 is on the list of waivable rules:
          </p>
          <RuleQuote source={R107.waiver} />
          <p className="mt-4 text-muted">
            A study aid. It checks only 107.51. Other rules still apply, for example airspace authorization (107.41),
            visual line of sight (107.31), operations over people (Subpart D) and night operations (107.29).
          </p>
        </div>
      </div>
    </div>
  );
}

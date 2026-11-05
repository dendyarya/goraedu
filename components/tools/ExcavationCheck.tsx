"use client";

import { useId, useState } from "react";
import { ROSHA } from "@/lib/osha-rules";
import type { RuleSource } from "@/lib/epa608-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

type Row = { title: string; verdict: "yes" | "no" | "check"; body: string; sources: RuleSource[] };

/** What 29 CFR 1926.651–652 require for an excavation of a given depth. A lookup of the rule's own conditions. */
export default function ExcavationCheck() {
  const id = useId();
  const [depth, setDepth] = useState("");
  const [trench, setTrench] = useState<"yes" | "no">("yes");
  const [rock, setRock] = useState<"yes" | "no">("no");
  const [cp, setCp] = useState<"no-sign" | "sign">("sign");
  const [atmo, setAtmo] = useState<"yes" | "no">("no");

  const d = Number(depth);
  const valid = depth.trim() !== "" && Number.isFinite(d) && d > 0 && d <= 200;
  const rows: Row[] = [];
  if (valid) {
    if (rock === "yes")
      rows.push({
        title: "Cave-in protective system",
        verdict: "no",
        body: "Not required by 1926.652(a)(1) when the excavation is made entirely in stable rock.",
        sources: [ROSHA.caveIn, ROSHA.stableRock],
      });
    else if (d < 5 && cp === "no-sign")
      rows.push({
        title: "Cave-in protective system",
        verdict: "no",
        body: "Not required by 1926.652(a)(1): the excavation is less than 5 feet deep and a competent person's examination of the ground shows no indication of a potential cave-in.",
        sources: [ROSHA.caveIn, ROSHA.under5],
      });
    else
      rows.push({
        title: "Cave-in protective system",
        verdict: "yes",
        body:
          d < 5
            ? "Required: the less-than-5-feet exception applies only when a competent person's examination of the ground provides no indication of a potential cave-in."
            : "Required: at 5 feet or deeper, the only exception in 1926.652(a)(1) is an excavation made entirely in stable rock.",
        sources: [ROSHA.caveIn, ROSHA.stableRock, ROSHA.under5],
      });
    rows.push({
      title: "Means of egress (stairway, ladder, ramp)",
      verdict: trench === "yes" && d >= 4 ? "yes" : "check",
      body:
        trench === "yes" && d >= 4
          ? "Required in a trench 4 feet or more deep, placed so that no more than 25 feet of lateral travel is needed."
          : trench === "yes"
            ? "This paragraph applies to trenches 4 feet or more deep; your trench is shallower."
            : "This paragraph is written for trench excavations; check the rest of 1926.651(c) for other excavations.",
      sources: [ROSHA.egress],
    });
    rows.push({
      title: "Atmosphere testing before entry",
      verdict: atmo === "yes" && d > 4 ? "yes" : "check",
      body:
        atmo === "yes" && d > 4
          ? "Required before employees enter, because the excavation is deeper than 4 feet and a hazardous atmosphere or oxygen deficiency exists or could reasonably be expected."
          : "This rule applies to excavations greater than 4 feet deep where a hazardous atmosphere or oxygen deficiency exists or could reasonably be expected to exist.",
      sources: [ROSHA.atmosphere],
    });
  }

  const tone = { yes: "border-high/50 bg-high-soft", no: "border-low/40 bg-low-soft", check: "border-line bg-panel" };
  const tag = { yes: "Required", no: "Not required", check: "Does not apply as described" };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-6 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <Field label="Depth of the excavation (feet)" htmlFor={`${id}-d`}>
          <input
            id={`${id}-d`}
            inputMode="decimal"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="e.g. 6"
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        {depth && !valid ? <p className="text-high">Enter a depth in feet, more than 0.</p> : null}
        <Segmented
          legend="Is it a trench?"
          value={trench}
          onChange={setTrench}
          options={[
            { value: "yes", label: "Yes, a trench (narrow in relation to its length)" },
            { value: "no", label: "No, another excavation" },
          ]}
        />
        <Segmented
          legend="Is it made entirely in stable rock?"
          value={rock}
          onChange={setRock}
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes, entirely in stable rock" },
          ]}
        />
        {valid && d < 5 && rock === "no" ? (
          <Segmented
            legend="Has a competent person examined the ground?"
            value={cp}
            onChange={setCp}
            options={[
              { value: "no-sign", label: "Yes, and found no indication of a potential cave-in" },
              { value: "sign", label: "No, or there is an indication of a cave-in" },
            ]}
          />
        ) : null}
        <Segmented
          legend="Could a hazardous atmosphere or oxygen deficiency reasonably be expected?"
          value={atmo}
          onChange={setAtmo}
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes (for example, a landfill or hazardous substances stored nearby)" },
          ]}
        />
      </form>

      <div aria-live="polite" className="space-y-4">
        {!valid ? (
          <div className="rounded-3xl border border-dashed border-line p-6 text-muted">
            Enter the depth to see what the rule requires.
          </div>
        ) : (
          rows.map((r) => (
            <div key={r.title} className={`rounded-3xl border p-6 ${tone[r.verdict]}`}>
              <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
                {r.title} <Label kind="official" />
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-[1.5rem] font-bold">{tag[r.verdict]}</p>
              <p className="mt-2">{r.body}</p>
              {r.sources.map((s) => (
                <RuleQuote key={s.title} source={s} />
              ))}
            </div>
          ))
        )}
        <p className="text-[0.9375rem] text-muted">
          A study aid covering three rules only. Excavations have many other requirements in 1926.651 and 1926.652, and
          the employer and competent person remain responsible for them.
        </p>
      </div>
    </div>
  );
}

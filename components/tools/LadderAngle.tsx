"use client";

import { useId, useState } from "react";
import { feetInches, ROSHA } from "@/lib/osha-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

/** Base distance for a non-self-supporting ladder under 29 CFR 1926.1053(b)(5). */
export default function LadderAngle() {
  const id = useId();
  const [kind, setKind] = useState<"standard" | "spliced">("standard");
  const [len, setLen] = useState("");
  const n = Number(len);
  const valid = len.trim() !== "" && Number.isFinite(n) && n > 0 && n <= 100;
  const ratio = kind === "standard" ? 4 : 8;
  const base = valid ? n / ratio : NaN;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-6 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <Segmented
          legend="Ladder"
          value={kind}
          onChange={setKind}
          options={[
            { value: "standard", label: "Non-self-supporting ladder (for example, an extension ladder)" },
            { value: "spliced", label: "Wood job-made ladder with spliced side rails" },
          ]}
        />
        <Field label="Working length (feet): along the ladder from the foot to the top support" htmlFor={`${id}-len`}>
          <input
            id={`${id}-len`}
            inputMode="decimal"
            value={len}
            onChange={(e) => setLen(e.target.value)}
            placeholder="e.g. 16"
            className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
          />
        </Field>
        {len && !valid ? <p className="text-high">Enter a length in feet, more than 0 and up to 100.</p> : null}
        <p className="text-[0.9375rem] text-muted">
          Everything you type stays in your browser. The length is <Label kind="input" />.
        </p>
      </form>

      <div aria-live="polite" className="space-y-5">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Foot of the ladder from the wall <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2.5rem] font-bold leading-none">
            {valid ? `about ${feetInches(base)}` : "—"}
          </p>
          <p className="mt-3 text-muted">
            The rule sets the horizontal distance from the top support to the foot at approximately{" "}
            {kind === "standard" ? "one-quarter" : "one-eighth"} of the working length <Label kind="official" />
            {valid ? ` : ${n} ÷ ${ratio}.` : "."}
          </p>
          <RuleQuote source={kind === "standard" ? ROSHA.ladderAngle : ROSHA.ladderSpliced} />
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <h2 className="text-[1.125rem] font-bold">Also in the rule</h2>
          <RuleQuote source={ROSHA.ladderExtend} />
          <RuleQuote source={ROSHA.ladderSurface} />
        </div>
      </div>
    </div>
  );
}

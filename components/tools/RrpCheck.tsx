"use client";

import { useId, useState } from "react";
import { RRRP } from "@/lib/rrp-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

type YN = "no" | "yes";
const num = (s: string) => {
  const n = Number(s);
  return s.trim() === "" ? 0 : Number.isFinite(n) && n >= 0 && n <= 1e6 ? n : null;
};

type Verdict = { title: string; covered: boolean | null; why: string; srcs: (typeof RRRP)[keyof typeof RRRP][] };

/** Walks through 40 CFR 745.82 and the 745.83 definitions to see whether a job is a covered renovation. */
export default function RrpCheck() {
  const id = useId();
  const [paid, setPaid] = useState<YN>("yes");
  const [bldg, setBldg] = useState<"th" | "cof" | "neither">("th");
  const [exc, setExc] = useState<"none" | "det" | "kit" | "chip">("none");
  const [win, setWin] = useState<YN>("no");
  const [demo, setDemo] = useState<YN>("no");
  const [proh, setProh] = useState<YN>("no");
  const [inside, setInside] = useState("");
  const [outside, setOutside] = useState("");
  const [emerg, setEmerg] = useState<YN>("no");

  const i = num(inside);
  const o = num(outside);

  let v: Verdict;
  if (i === null || o === null) {
    v = { title: "—", covered: null, why: "Square feet must be a number of 0 or more.", srcs: [] };
  } else if (paid === "no") {
    v = {
      title: "Outside Subpart E",
      covered: false,
      why: "Subpart E applies to renovations performed for compensation.",
      srcs: [RRRP.applies],
    };
  } else if (bldg === "neither") {
    v = {
      title: "Outside Subpart E",
      covered: false,
      why: "Subpart E applies to renovations in target housing and child-occupied facilities.",
      srcs: [RRRP.applies],
    };
  } else if (exc !== "none") {
    v = {
      title: "Excepted by 745.82(a)",
      covered: false,
      why: "The components affected were found free of paint or coatings with lead at or above 1.0 mg/cm2 or 0.5% by weight, in one of the ways 745.82(a) lists. Each way has its own conditions in the rule.",
      srcs: [exc === "det" ? RRRP.determination : exc === "kit" ? RRRP.testKit : RRRP.chip],
    };
  } else if (win === "yes" || demo === "yes" || proh === "yes" || i > 6 || o > 20) {
    const reasons = [
      win === "yes" ? "it involves window replacement" : "",
      demo === "yes" ? "it involves demolition of painted surface areas" : "",
      proh === "yes" ? "a practice prohibited or restricted by 745.85(a)(3) is used" : "",
      i > 6 ? `it disturbs ${i} sq ft of painted surface in one room (more than 6)` : "",
      o > 20 ? `it disturbs ${o} sq ft of exterior painted surface (more than 20)` : "",
    ].filter(Boolean);
    v = {
      title: "A renovation covered by Subpart E",
      covered: true,
      why: `It is not minor repair and maintenance because ${reasons.join("; ")}.`,
      srcs: [RRRP.applies, RRRP.minor],
    };
  } else if (i === 0 && o === 0) {
    v = {
      title: "No painted surface disturbed",
      covered: false,
      why: "A renovation is a modification that results in the disturbance of painted surfaces. Enter the area you will disturb.",
      srcs: [],
    };
  } else {
    v = {
      title: "Minor repair and maintenance, not a renovation",
      covered: false,
      why: `It disturbs ${i} sq ft per room inside and ${o} sq ft outside, within the 6 and 20 sq ft limits, with no window replacement, demolition or prohibited practice.`,
      srcs: [RRRP.minor, RRRP.notRenovation],
    };
  }

  const yn = (legend: string, value: YN, set: (x: YN) => void) => (
    <Segmented
      legend={legend}
      value={value}
      onChange={set}
      options={[
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ]}
    />
  );
  const box = (val: string, set: (x: string) => void, label: string, key: string) => (
    <Field label={label} htmlFor={`${id}-${key}`}>
      <input
        id={`${id}-${key}`}
        inputMode="decimal"
        value={val}
        onChange={(e) => set(e.target.value)}
        placeholder="0"
        className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
      />
    </Field>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          Describe one job. <Label kind="input" />
        </p>
        {yn("Is the work performed for compensation?", paid, setPaid)}
        <Segmented
          legend="Where is the work?"
          value={bldg}
          onChange={setBldg}
          options={[
            { value: "th", label: "Target housing", hint: "As defined in 40 CFR 745.103" },
            { value: "cof", label: "A child-occupied facility", hint: "Definition shown on the right" },
            { value: "neither", label: "Neither" },
          ]}
        />
        <Segmented
          legend="Were the affected components found free of lead-based paint in one of these ways?"
          value={exc}
          onChange={setExc}
          options={[
            { value: "none", label: "No, or not tested" },
            { value: "det", label: "Written determination by a certified inspector or risk assessor" },
            { value: "kit", label: "EPA-recognized test kit used by a certified renovator" },
            { value: "chip", label: "Paint chip samples analyzed by an EPA-recognized lab" },
          ]}
        />
        {yn("Does the job involve window replacement?", win, setWin)}
        {yn("Does it involve demolition of painted surface areas?", demo, setDemo)}
        {yn("Will any practice prohibited or restricted by 745.85(a)(3) be used?", proh, setProh)}
        {box(inside, setInside, "Interior: painted surface disturbed in the most-affected room (sq ft)", "i")}
        {box(outside, setOutside, "Exterior: painted surface disturbed (sq ft)", "o")}
        <p className="text-[0.9375rem] text-muted">
          Count removed painted components by their whole surface area, and add up jobs in the same room within 30 days.
        </p>
        {yn("Is this an emergency renovation?", emerg, setEmerg)}
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div
          className={`rounded-3xl border p-6 ${v.covered ? "border-high/50 bg-high-soft" : "border-low/40 bg-low-soft"}`}
        >
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Under 40 CFR 745 Subpart E <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight">
            {v.title}
          </p>
          <p className="mt-3 text-[0.9375rem]">{v.why}</p>
          {v.srcs.map((s) => (
            <RuleQuote key={s.title + s.quote.slice(0, 20)} source={s} />
          ))}
          {v.covered && emerg === "yes" ? (
            <>
              <p className="mt-4 text-[0.9375rem]">
                Emergency renovations have some exemptions, but not from the cleaning, cleaning verification and listed
                recordkeeping requirements:
              </p>
              <RuleQuote source={RRRP.emergency} />
            </>
          ) : null}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <RuleQuote source={RRRP.cof} />
          <RuleQuote source={RRRP.sameJob} />
          <p className="mt-4 text-muted">
            A study aid, not a compliance determination. It does not apply the definition of target housing (40 CFR
            745.103) for you, and does not cover HUD rules or other federal, State or local requirements. Your State or
            Tribe may run its own authorized program, so check its rules too.
          </p>
        </div>
      </div>
    </div>
  );
}

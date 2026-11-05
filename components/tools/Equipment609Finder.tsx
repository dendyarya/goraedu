"use client";

import { useState } from "react";
import { equipmentStandard, JOBS, R609, REFRIGERANTS, type Job, type Refrigerant } from "@/lib/epa609-rules";
import { Label, RuleQuote, Segmented } from "./parts";

/** Which standard 40 CFR 82.36(a) names for MVAC refrigerant handling equipment, by refrigerant and job. */
export default function Equipment609Finder() {
  const [r, setR] = useState<Refrigerant>("hfo1234yf");
  const [job, setJob] = useState<Job>("recharge");
  const [contaminated, setContaminated] = useState<"no" | "yes">("no");

  const askContaminated = job === "recover" && (r === "hfc134a" || r === "hfo1234yf" || r === "1234yf-134a");
  const hit = equipmentStandard(r, job, askContaminated && contaminated === "yes");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-6 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <Segmented
          legend="Refrigerant the equipment handles"
          value={r}
          onChange={setR}
          options={REFRIGERANTS.map((x) => ({ value: x.id, label: x.label }))}
        />
        <Segmented
          legend="What the equipment does"
          value={job}
          onChange={setJob}
          options={JOBS.map((x) => ({ value: x.id, label: x.label }))}
        />
        {askContaminated ? (
          <Segmented
            legend="Is it for contaminated refrigerant?"
            value={contaminated}
            onChange={setContaminated}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes, contaminated HFC-134a and/or HFO-1234yf" },
            ]}
          />
        ) : null}
      </form>

      <div aria-live="polite" className="space-y-5">
        {hit ? (
          <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
            <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
              Required standard <Label kind="official" />
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold leading-tight">
              {hit.standard}
            </p>
            <RuleQuote source={hit.source} />
          </div>
        ) : (
          <div className="rounded-3xl border border-line bg-panel p-6">
            <p className="text-[1.25rem] font-bold">Paragraph (a) names no standard for this combination</p>
            <p className="mt-2 text-muted">
              40 CFR 82.36(a) lists equipment by what it does and which refrigerant it handles. Pick the description
              that matches your machine, or check EPA&apos;s list of approved equipment.
            </p>
          </div>
        )}
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <h2 className="text-[1.125rem] font-bold">Certified, not just compatible</h2>
          <RuleQuote source={R609.equipmentCertified} />
          <RuleQuote source={R609.list} />
          <p className="mt-3">
            EPA publishes certified equipment on its{" "}
            <a href="https://www.epa.gov/mvac/certified-equipment" className="text-low underline" rel="noopener">
              Certified Equipment page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

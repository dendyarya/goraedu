"use client";

import Link from "next/link";
import { useState } from "react";
import { APPLIANCE_CLASSES, SRC, table1Level, type ApplianceClass } from "@/lib/epa608-rules";
import { Label, RuleQuote, Segmented } from "./parts";

/**
 * Required evacuation level before opening or disposing of an appliance: Table 1 of 40 CFR 82.156 for most
 * appliances, and §82.156(b) for small appliances. A lookup only; nothing is calculated or stored.
 */
export default function EvacuationLevels() {
  const [cls, setCls] = useState<ApplianceClass>("high");
  const [large, setLarge] = useState<"under" | "over">("under");
  const [equipment, setEquipment] = useState<"new" | "old">("new");
  const [compressor, setCompressor] = useState<"yes" | "no">("yes");

  const needsCharge = cls === "high" || cls === "medium";
  const isSmall = cls === "small";

  let result: string;
  let detail: string;
  if (isSmall) {
    if (equipment === "old") {
      result = "Recover 80 percent of the refrigerant, or evacuate to 4 inches of Hg vacuum";
      detail = "With recovery equipment made before November 15, 1993.";
    } else {
      result =
        compressor === "yes"
          ? "Recover 90 percent of the refrigerant, or evacuate to 4 inches of Hg vacuum"
          : "Recover 80 percent of the refrigerant, or evacuate to 4 inches of Hg vacuum";
      detail = `With recovery equipment made on or after November 15, 1993, when the appliance's compressor is ${
        compressor === "yes" ? "functioning" : "not functioning"
      }.`;
    }
  } else {
    result = table1Level(cls, large === "over", equipment === "new");
    const cl = APPLIANCE_CLASSES.find((c) => c.id === cls)!.label;
    detail = `${cl} appliance${needsCharge ? `, full charge ${large === "over" ? "200 pounds or more" : "under 200 pounds"}` : ""}, with recovery equipment made ${
      equipment === "new" ? "on or after" : "before"
    } November 15, 1993.`;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-6 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <Segmented
          legend="Appliance type (by the refrigerant it uses)"
          value={cls}
          onChange={setCls}
          options={APPLIANCE_CLASSES.map((c) => ({ value: c.id, label: c.label, hint: c.hint }))}
        />
        {needsCharge ? (
          <Segmented
            legend="Full charge of the appliance (or isolated component)"
            value={large}
            onChange={setLarge}
            options={[
              { value: "under", label: "Less than 200 pounds" },
              { value: "over", label: "200 pounds or more" },
            ]}
          />
        ) : null}
        <Segmented
          legend="Your recovery equipment was manufactured or imported"
          value={equipment}
          onChange={setEquipment}
          options={[
            { value: "new", label: "On or after November 15, 1993" },
            { value: "old", label: "Before November 15, 1993" },
          ]}
        />
        {isSmall && equipment === "new" ? (
          <Segmented
            legend="Is the appliance's compressor functioning?"
            value={compressor}
            onChange={setCompressor}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        ) : null}
      </form>

      <div aria-live="polite" className="space-y-5">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Required level <Label kind="official" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold leading-tight">{result}</p>
          <p className="mt-3 text-muted">{detail}</p>
          <RuleQuote source={isSmall ? (equipment === "old" ? SRC.smallOld : SRC.small) : SRC.table1} />
          {!isSmall ? (
            <p className="mt-3 text-[0.9375rem] text-muted">
              Inches of Hg vacuum are relative to standard atmospheric pressure of 29.9 inches Hg, as Table 1 states.
            </p>
          ) : null}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <h2 className="text-[1.125rem] font-bold">Before you open the appliance</h2>
          <RuleQuote source={SRC.verify} />
          <p className="mt-4 text-muted">
            Table 1 has exceptions, for example for some repairs that are not major and for appliances whose leaks make
            these levels unattainable. See the{" "}
            <Link href="/epa-608/type-2/study-guide/#recovery-requirements" className="text-low underline">
              Type II
            </Link>{" "}
            and{" "}
            <Link href="/epa-608/type-3/study-guide/#recovery-requirements" className="text-low underline">
              Type III
            </Link>{" "}
            study guides.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { R609 } from "@/lib/epa609-rules";
import type { RuleSource } from "@/lib/epa608-rules";
import { Label, RuleQuote, Segmented } from "./parts";

type Kind = "mvac" | "like" | "other";
type YN = "yes" | "no";

/**
 * Walks through who the Subpart B certification rule in 40 CFR 82.34(a) covers. A lookup of the rule's own
 * conditions; nothing is stored.
 */
export default function Cert609Checker() {
  const [kind, setKind] = useState<Kind>("mvac");
  const [paid, setPaid] = useState<YN>("yes");
  const [refrigerant, setRefrigerant] = useState<YN>("yes");

  let verdict: string;
  let tone: "need" | "no" | "other";
  let detail: React.ReactNode;
  let sources: RuleSource[];

  if (kind === "other") {
    tone = "other";
    verdict = "Not covered by Section 609";
    detail = (
      <>
        Subpart B covers motor vehicle air conditioners and MVAC-like appliances. Other refrigeration and
        air-conditioning equipment falls under Section 608. See{" "}
        <Link href="/epa-608/" className="text-low underline">
          EPA 608
        </Link>
        .
      </>
    );
    sources = [R609.mvacDef];
  } else if (refrigerant === "no") {
    tone = "no";
    verdict = "The certification rule does not cover this work";
    detail =
      "The rule in 82.34(a) applies to service involving the refrigerant: service during which refrigerant can reasonably be expected to be released, including a top-off.";
    sources = [R609.involving, R609.prohibition];
  } else if (kind === "mvac" && paid === "no") {
    tone = "no";
    verdict = "The MVAC certification rule covers paid work only";
    detail =
      "For MVACs, 82.34(a) applies to persons repairing or servicing them for consideration, which the rule defines as all service except that done for free.";
    sources = [R609.consideration, R609.prohibition];
  } else if (kind === "mvac") {
    tone = "need";
    verdict = "Section 609 certification is required";
    detail =
      "You must be trained and certified by an EPA-approved Section 609 program, and you must properly use approved refrigerant handling equipment.";
    sources = [R609.prohibition, R609.mvacCert];
  } else {
    tone = "need";
    verdict = "Certification is required (Section 609 or Section 608 Type II)";
    detail =
      "For MVAC-like appliances the rule applies whether or not you are paid. You must be certified by a program approved under 82.40 (Section 609) or 82.161(a)(5), and properly use approved equipment.";
    sources = [R609.prohibition, R609.likeCert];
  }

  const box =
    tone === "need"
      ? "border-high/50 bg-high-soft"
      : tone === "no"
        ? "border-low/40 bg-low-soft"
        : "border-line bg-panel";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-6 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <Segmented
          legend="What are you working on?"
          value={kind}
          onChange={setKind}
          options={[
            {
              value: "mvac",
              label: "Motor vehicle air conditioning (MVAC)",
              hint: "Cools the driver's or passenger's compartment of a car, truck or other on-road vehicle",
            },
            {
              value: "like",
              label: "MVAC-like appliance",
              hint: "Air conditioning on off-road vehicles or equipment, such as agricultural or construction vehicles",
            },
            {
              value: "other",
              label: "Something else",
              hint: "For example refrigerated cargo systems, HCFC-22 bus air conditioning, or stationary equipment",
            },
          ]}
        />
        {kind === "mvac" ? (
          <Segmented
            legend="Are you paid for the work (cash, credit, goods or services)?"
            value={paid}
            onChange={setPaid}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No, it is done for free" },
            ]}
          />
        ) : null}
        {kind !== "other" ? (
          <Segmented
            legend="Does the work involve the refrigerant?"
            value={refrigerant}
            onChange={setRefrigerant}
            options={[
              {
                value: "yes",
                label: "Yes, including a top-off",
                hint: "Any service where refrigerant could reasonably be released",
              },
              { value: "no", label: "No" },
            ]}
          />
        ) : null}
        <p className="text-[0.9375rem] text-muted">
          A study aid based on 40 CFR Part 82, Subpart B only. Other federal rules, such as the venting prohibition in
          Subpart F, still apply.
        </p>
      </form>

      <div aria-live="polite" className={`rounded-3xl border p-6 ${box}`}>
        <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
          Result <Label kind="official" />
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-[1.875rem] font-bold leading-tight">{verdict}</p>
        <p className="mt-3">{detail}</p>
        {sources.map((s) => (
          <RuleQuote key={s.title} source={s} />
        ))}
      </div>
    </div>
  );
}

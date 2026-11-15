"use client";

import { useState } from "react";
import { DISCLOSURE } from "@/lib/disclosure-rules";
import { Label, RuleQuote, Segmented } from "./parts";

type YN = "no" | "yes";
type Deal = "sale" | "lease" | "renewal";
type Kind = "regular" | "elderly" | "zero";
type Exc = "none" | "foreclosure" | "lbpfree" | "short";
type Src = (typeof DISCLOSURE)[keyof typeof DISCLOSURE];
type Verdict = { title: string; covered: boolean; why: string; srcs: Src[] };

/** Walks through 40 CFR 745.101 and the 745.103 definitions to see whether a sale or lease falls under Subpart F. */
export default function LeadDisclosureCheck() {
  const [deal, setDeal] = useState<Deal>("sale");
  const [pre1978, setPre1978] = useState<YN>("yes");
  const [kind, setKind] = useState<Kind>("regular");
  const [child, setChild] = useState<YN>("no");
  const [exc, setExc] = useState<Exc>("none");
  const [disclosed, setDisclosed] = useState<YN>("no");

  const isLease = deal !== "sale";
  // An exception picked for the other kind of deal does not apply.
  const excNow: Exc =
    exc === "foreclosure" && isLease ? "none" : (exc === "lbpfree" || exc === "short") && !isLease ? "none" : exc;

  let v: Verdict;
  if (pre1978 === "no") {
    v = {
      title: "Not target housing",
      covered: false,
      why: "Subpart F applies to target housing, which the rule defines as housing constructed prior to 1978.",
      srcs: [DISCLOSURE.targetHousing],
    };
  } else if (kind !== "regular" && child === "no") {
    v = {
      title: "Not target housing",
      covered: false,
      why:
        kind === "elderly"
          ? "Housing for the elderly or persons with disabilities is excepted from target housing, unless a child under 6 resides or is expected to reside there."
          : "A 0-bedroom dwelling is excepted from target housing, unless a child under 6 resides or is expected to reside there.",
      srcs: [DISCLOSURE.targetHousing, kind === "elderly" ? DISCLOSURE.elderly : DISCLOSURE.zeroBedroom],
    };
  } else if (excNow !== "none") {
    v = {
      title: "An exempt transaction",
      covered: false,
      why: "The rule applies to sales and leases of target housing with the exceptions listed in 745.101. This one is listed there.",
      srcs: [
        excNow === "foreclosure"
          ? DISCLOSURE.foreclosure
          : excNow === "lbpfree"
            ? DISCLOSURE.lbpFree
            : DISCLOSURE.shortTerm,
      ],
    };
  } else if (deal === "renewal" && disclosed === "yes") {
    v = {
      title: "An exempt renewal",
      covered: false,
      why: "The lessor already disclosed everything 745.107 requires and has no new information, so the renewal is excepted.",
      srcs: [DISCLOSURE.renewal],
    };
  } else {
    v = {
      title: "Covered by the disclosure rule",
      covered: true,
      why: `This ${deal === "sale" ? "sale" : "lease"} of target housing is not one of the exceptions in 745.101, so the duties below apply before the ${deal === "sale" ? "purchaser" : "lessee"} is obligated under the contract.`,
      srcs: [DISCLOSURE.scope],
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

  const duties: Src[] = v.covered
    ? [
        DISCLOSURE.pamphlet,
        DISCLOSURE.disclose,
        DISCLOSURE.records,
        ...(deal === "sale"
          ? [DISCLOSURE.evaluation, DISCLOSURE.waive, DISCLOSURE.saleAttachment, DISCLOSURE.retainSale]
          : []),
        ...(deal !== "sale" ? [DISCLOSURE.leaseAttachment, DISCLOSURE.retainLease] : []),
        DISCLOSURE.agent,
      ]
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          Describe one transaction. <Label kind="input" />
        </p>
        <Segmented
          legend="What kind of transaction is it?"
          value={deal}
          onChange={setDeal}
          options={[
            { value: "sale", label: "A sale" },
            { value: "lease", label: "A new lease or sublease" },
            { value: "renewal", label: "A renewal of an existing lease" },
          ]}
        />
        {yn("Was the housing constructed before 1978?", pre1978, setPre1978)}
        <Segmented
          legend="What kind of housing is it?"
          value={kind}
          onChange={setKind}
          options={[
            { value: "regular", label: "Ordinary housing" },
            { value: "elderly", label: "Housing for the elderly or persons with disabilities" },
            { value: "zero", label: "A 0-bedroom dwelling", hint: "Definition shown on the right" },
          ]}
        />
        {kind !== "regular"
          ? yn("Does a child under 6 reside, or is one expected to reside, there?", child, setChild)
          : null}
        <Segmented
          legend="Does one of these apply?"
          value={excNow}
          onChange={setExc}
          options={[
            { value: "none", label: "None of these" },
            ...(deal === "sale"
              ? [{ value: "foreclosure" as const, label: "A sale at foreclosure" }]
              : [
                  {
                    value: "lbpfree" as const,
                    label: "The housing was found lead-based paint free by a certified inspector",
                  },
                  {
                    value: "short" as const,
                    label: "A lease of 100 days or less that cannot be renewed or extended",
                  },
                ]),
          ]}
        />
        {deal === "renewal"
          ? yn(
              "Did the lessor already disclose everything 745.107 requires, with no new information since?",
              disclosed,
              setDisclosed,
            )
          : null}
        <p className="text-[0.9375rem] text-muted">Nothing you choose leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div
          className={`rounded-3xl border p-6 ${v.covered ? "border-high/50 bg-high-soft" : "border-low/40 bg-low-soft"}`}
        >
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Under 40 CFR 745 Subpart F <Label kind="calc" />
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight">
            {v.title}
          </p>
          <p className="mt-3 text-[0.9375rem]">{v.why}</p>
          {v.srcs.map((s) => (
            <RuleQuote key={s.title + s.quote.slice(0, 20)} source={s} />
          ))}
        </div>
        {duties.length ? (
          <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
            <h2 className="text-[1.125rem] font-bold">What the rule requires, in its words</h2>
            {duties.map((s) => (
              <RuleQuote key={s.title + s.quote.slice(0, 20)} source={s} />
            ))}
          </div>
        ) : null}
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <RuleQuote source={DISCLOSURE.targetHousing} />
          <RuleQuote source={DISCLOSURE.zeroBedroom} />
          <p className="mt-4 text-muted">
            A study aid, not legal advice or a compliance determination. You decide whether the housing and the
            transaction meet the definitions above. It covers EPA&apos;s rule in 40 CFR 745 Subpart F only, not
            HUD&apos;s matching rule or State and local requirements, which may add their own.
          </p>
        </div>
      </div>
    </div>
  );
}

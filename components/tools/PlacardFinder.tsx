"use client";

import { useId, useState } from "react";
import { R172, TABLE_1, TABLE_2, type PlacardRow } from "@/lib/hazmat-rules";
import { Field, Label, RuleQuote, Segmented } from "./parts";

type Line = { key: number; id: string; lb: string };
const ALL = [
  ...TABLE_1.map((r) => ({ ...r, table: 1 as const })),
  ...TABLE_2.map((r) => ({ ...r, table: 2 as const })),
];
const find = (id: string) => ALL.find((r) => r.id === id);
const num = (s: string) => {
  const n = Number(s);
  return s.trim() !== "" && Number.isFinite(n) && n > 0 && n <= 1e7 ? n : null;
};
const division = (r: PlacardRow) => (/^1\.[1-6]$/.test(r.id) ? Number(r.id) : null);

type Out = { row: PlacardRow & { table: 1 | 2 }; lb: number; status: "required" | "none" | "class9" | "6.2" };

/** Placards for a highway transport vehicle under 49 CFR 172.504 Tables 1 and 2 and selected exceptions. */
export default function PlacardFinder() {
  const id = useId();
  const [lines, setLines] = useState<Line[]>([{ key: 1, id: "3", lb: "" }]);
  const [bulk, setBulk] = useState<"no" | "yes">("no");
  const [sub, setSub] = useState<"no" | "yes">("no");
  const [next, setNext] = useState(2);

  const valid = lines
    .map((l) => ({ row: find(l.id), lb: num(l.lb) }))
    .filter((x): x is { row: NonNullable<ReturnType<typeof find>>; lb: number } => !!x.row && x.lb !== null);

  // Combine lines of the same category.
  const byCat = new Map<string, { row: NonNullable<ReturnType<typeof find>>; lb: number }>();
  for (const v of valid) {
    const cur = byCat.get(v.row.id);
    byCat.set(v.row.id, { row: v.row, lb: (cur?.lb ?? 0) + v.lb });
  }
  const cats = [...byCat.values()];
  const t2total = cats.filter((c) => c.row.table === 2).reduce((s, c) => s + c.lb, 0);
  const exceptionC = bulk === "no" && sub === "no" && t2total > 0 && t2total < 1001;

  const out: Out[] = cats.map((c) => {
    if (c.row.table === 1) return { ...c, status: "required" };
    if (c.row.id === "6.2") return { ...c, status: "6.2" };
    if (exceptionC) return { ...c, status: "none" };
    if (c.row.id === "9") return { ...c, status: "class9" };
    return { ...c, status: "required" };
  });

  // 172.504(f)(1): only the lowest Class 1 division placard must be displayed.
  const divs = out.filter((o) => o.status === "required" && division(o.row) !== null);
  const lowest = divs.length > 1 ? Math.min(...divs.map((o) => division(o.row) ?? 9)) : null;

  const t2required = out.filter((o) => o.row.table === 2 && o.status === "required");
  const dangerousOk = bulk === "no" && new Set(t2required.map((o) => o.row.placard)).size >= 2;

  const set = (key: number, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-5 rounded-3xl border border-line bg-panel p-6" onSubmit={(e) => e.preventDefault()}>
        <p className="text-[0.9375rem] text-muted">
          Highway transport vehicle, domestic trip. Add each hazard class or division on board with its aggregate gross
          weight. <Label kind="input" />
        </p>
        {lines.map((l, i) => (
          <div key={l.key} className="grid gap-3 rounded-2xl border border-line p-4 sm:grid-cols-[1fr_9rem]">
            <Field label={`Material ${i + 1}: category`} htmlFor={`${id}-c${l.key}`}>
              <select
                id={`${id}-c${l.key}`}
                value={l.id}
                onChange={(e) => set(l.key, { id: e.target.value })}
                className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
              >
                <optgroup label="Table 1 (any quantity)">
                  {TABLE_1.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.category}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Table 2">
                  {TABLE_2.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.category}
                    </option>
                  ))}
                </optgroup>
              </select>
            </Field>
            <Field label="Weight (lb)" htmlFor={`${id}-w${l.key}`}>
              <input
                id={`${id}-w${l.key}`}
                inputMode="decimal"
                value={l.lb}
                onChange={(e) => set(l.key, { lb: e.target.value })}
                placeholder="e.g. 600"
                className="w-full rounded-2xl border border-line bg-paper px-3 py-2.5"
              />
            </Field>
            {lines.length > 1 ? (
              <button
                type="button"
                onClick={() => setLines((ls) => ls.filter((x) => x.key !== l.key))}
                className="justify-self-start text-[0.9375rem] font-semibold text-low underline"
              >
                Remove material {i + 1}
              </button>
            ) : null}
          </div>
        ))}
        {lines.length < 12 ? (
          <button
            type="button"
            onClick={() => {
              setLines((ls) => [...ls, { key: next, id: "8", lb: "" }]);
              setNext(next + 1);
            }}
            className="rounded-2xl border border-line bg-paper px-4 py-2.5 font-semibold"
          >
            Add another material
          </button>
        ) : null}
        <Segmented
          legend="Is any of it in a bulk packaging?"
          value={bulk}
          onChange={setBulk}
          options={[
            { value: "no", label: "No, non-bulk packages only" },
            { value: "yes", label: "Yes" },
          ]}
        />
        <Segmented
          legend="Is any of it subject to § 172.505 (placarding for subsidiary hazards)?"
          value={sub}
          onChange={setSub}
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]}
        />
        <p className="text-[0.9375rem] text-muted">Nothing you type leaves your browser.</p>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="rounded-3xl border border-low/40 bg-low-soft p-6">
          <p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
            Placards under 49 CFR 172.504 <Label kind="calc" />
          </p>
          {out.length === 0 ? (
            <p className="mt-3 text-muted">Enter a weight above 0 for at least one material.</p>
          ) : (
            <>
              <p className="mt-2 text-[0.9375rem]">
                Table 2 materials on board: {t2total.toLocaleString("en-US")} lb aggregate gross weight.
              </p>
              <ul className="mt-4 space-y-3">
                {out.map((o) => {
                  const d = division(o.row);
                  const dropped = lowest !== null && d !== null && d !== lowest;
                  return (
                    <li key={o.row.id}>
                      <p className="font-semibold">
                        {o.row.category}: {o.lb.toLocaleString("en-US")} lb
                      </p>
                      <p className="text-[0.9375rem] text-muted">
                        {o.status === "required"
                          ? dropped
                            ? `${o.row.placard} not needed: only the lowest Class 1 division placard (${lowest}) must be displayed.`
                            : `${o.row.placard} placard on each side and each end (design: § ${o.row.section}). Table ${o.row.table}${o.row.table === 1 ? ", any quantity" : ""}.`
                          : o.status === "none"
                            ? "No placard required: less than 1,001 lb of Table 2 materials, non-bulk, nothing subject to § 172.505."
                            : o.status === "class9"
                              ? "CLASS 9 placard not required for domestic transportation (§ 172.504(f)(9)). A bulk packaging still needs its identification number displayed."
                              : "Table 2 lists NONE as the placard for Division 6.2."}
                      </p>
                    </li>
                  );
                })}
              </ul>
              {dangerousOk ? (
                <p className="mt-4 text-[0.9375rem]">
                  Two or more Table 2 placards apply, so a DANGEROUS placard may be used instead of them, except that a
                  category with 2,205 lb or more loaded at one loading facility needs its own placard.
                </p>
              ) : null}
            </>
          )}
        </div>
        <div className="rounded-3xl border border-line bg-panel p-6 text-[0.9375rem]">
          <RuleQuote source={R172.general} />
          <RuleQuote source={R172.under454} />
          <RuleQuote source={R172.dangerous} />
          <RuleQuote source={R172.class1} />
          <RuleQuote source={R172.class9} />
          <p className="mt-4 text-muted">
            A study aid, not a compliance determination. It does not cover the other exceptions in § 172.504(f), §
            172.500, placarding for subsidiary hazards (§ 172.505), radioactive notes, residue-only packages, or
            international and non-highway shipments. Your State may have its own requirements, so check them too.
          </p>
        </div>
      </div>
    </div>
  );
}

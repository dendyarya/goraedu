// Official text from 29 CFR 1910.178(l) (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the forklift refresher tool.
// The tool page calls assertQuotes("forklift", ...) on these, so the build fails if one is not in the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-N/section-1910.178";

export const R178 = {
  refresher: {
    title: "29 CFR 1910.178(l)(4)(ii)",
    url: U,
    quote: "Refresher training in relevant topics shall be provided to the operator when:",
  },
  evaluation: {
    title: "29 CFR 1910.178(l)(4)(iii)",
    url: U,
    quote:
      "An evaluation of each powered industrial truck operator's performance shall be conducted at least once every three years.",
  },
  refresherEval: {
    title: "29 CFR 1910.178(l)(4)(i)",
    url: U,
    quote:
      "Refresher training, including an evaluation of the effectiveness of that training, shall be conducted as required by paragraph (l)(4)(ii) to ensure that the operator has the knowledge and skills needed to operate the powered industrial truck safely.",
  },
  certification: {
    title: "29 CFR 1910.178(l)(6)",
    url: U,
    quote:
      "The employer shall certify that each operator has been trained and evaluated as required by this paragraph (l). The certification shall include the name of the operator, the date of the training, the date of the evaluation, and the identity of the person(s) performing the training or evaluation.",
  },
} satisfies Record<string, RuleSource>;

/** The five triggers listed in 1910.178(l)(4)(ii)(A)–(E), in the rule's words. */
export const TRIGGERS = [
  { key: "A", text: "The operator has been observed to operate the vehicle in an unsafe manner;" },
  { key: "B", text: "The operator has been involved in an accident or near-miss incident;" },
  {
    key: "C",
    text: "The operator has received an evaluation that reveals that the operator is not operating the truck safely;",
  },
  { key: "D", text: "The operator is assigned to drive a different type of truck; or" },
  { key: "E", text: "A condition in the workplace changes in a manner that could affect safe operation of the truck." },
] as const;

/** Three years after an ISO date (YYYY-MM-DD). Feb 29 becomes Feb 28 (the earlier date) in a non-leap year. */
export function threeYearsAfter(iso: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (y < 1999 || y > 2100 || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const check = new Date(Date.UTC(y, mo - 1, d));
  if (check.getUTCMonth() !== mo - 1) return null;
  const last = new Date(Date.UTC(y + 3, mo, 0)).getUTCDate();
  return new Date(Date.UTC(y + 3, mo - 1, Math.min(d, last))).toISOString().slice(0, 10);
}

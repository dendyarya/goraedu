// Official text from 14 CFR 65.83 and 65.92 (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the mechanic tool.
// The tool page calls assertQuotes("faa-amt", ...) on these, so the build fails if one is not in the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-65/subpart-D/section-65.";

export const R65 = {
  recent: {
    title: "14 CFR 65.83",
    url: `${U}83`,
    quote:
      "A certificated mechanic may not exercise the privileges of his certificate and rating unless, within the preceding 24 months—",
  },
  found: {
    title: "14 CFR 65.83(a)",
    url: `${U}83`,
    quote: "The Administrator has found that he is able to do that work; or",
  },
  sixMonths: {
    title: "14 CFR 65.83(b)",
    url: `${U}83`,
    quote: "He has, for at least 6 months—",
  },
  iaExpires: {
    title: "14 CFR 65.92(a)",
    url: `${U}92`,
    quote:
      "Each inspection authorization expires on March 31 of each odd-numbered year. However, the holder may exercise the privileges of that authorization only while he holds a currently effective mechanic certificate with both a currently effective airframe rating and a currently effective powerplant rating.",
  },
} satisfies Record<string, RuleSource>;

/** The activities listed in 65.83(b)(1)–(4), in the rule's words. */
export const ACTIVITIES = [
  "Served as a mechanic under his certificate and rating;",
  "Technically supervised other mechanics;",
  "Supervised, in an executive capacity, the maintenance or alteration of aircraft; or",
  "Been engaged in any combination of paragraph (b) (1), (2), or (3) of this section.",
] as const;

/** March 31 of the first odd-numbered year on or after an ISO date (YYYY-MM-DD). */
export function nextIaExpiry(iso: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (y < 1977 || y > 2100 || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  if (new Date(Date.UTC(y, mo - 1, d)).getUTCMonth() !== mo - 1) return null;
  let year = mo <= 3 ? y : y + 1;
  if (year % 2 === 0) year += 1;
  return `${year}-03-31`;
}

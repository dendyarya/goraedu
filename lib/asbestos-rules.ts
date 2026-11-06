// Official text from 40 CFR 763.85(b) and 763.92(b) (eCFR as of Nov 4, 2026, data/sources/ecfr) used by the AHERA
// schedule tool. The tool page calls assertQuotes("asbestos", ...) on these, so the build fails if one is missing.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-763/subpart-E/section-763.";

export const R763 = {
  reinspection: {
    title: "40 CFR 763.85(b)(1)",
    url: `${U}85`,
    quote:
      "At least once every 3 years after a management plan is in effect, each local education agency shall conduct a reinspection of all friable and nonfriable known or assumed ACBM in each school building that they lease, own, or otherwise use as a school building.",
  },
  inspector: {
    title: "40 CFR 763.85(b)(2)",
    url: `${U}85`,
    quote: "Each inspection shall be made by an accredited inspector.",
  },
  surveillance: {
    title: "40 CFR 763.92(b)(1)",
    url: `${U}92`,
    quote:
      "At least once every 6 months after a management plan is in effect, each local education agency shall conduct periodic surveillance in each building that it leases, owns, or otherwise uses as a school building that contains ACBM or is assumed to contain ACBM.",
  },
} satisfies Record<string, RuleSource>;

/** An ISO date (YYYY-MM-DD) plus a number of months; a day past the end of the target month becomes its last day. */
export function addMonths(iso: string, months: number): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (y < 1987 || y > 2100 || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  if (new Date(Date.UTC(y, mo - 1, d)).getUTCMonth() !== mo - 1) return null;
  const idx = mo - 1 + months;
  const ty = y + Math.floor(idx / 12);
  const tm = ((idx % 12) + 12) % 12;
  const last = new Date(Date.UTC(ty, tm + 1, 0)).getUTCDate();
  return new Date(Date.UTC(ty, tm, Math.min(d, last))).toISOString().slice(0, 10);
}

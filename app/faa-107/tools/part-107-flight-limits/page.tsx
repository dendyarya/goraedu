import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Part107Limits from "@/components/tools/Part107Limits";
import { R107 } from "@/lib/faa-rules";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { FAA_INDEPENDENCE_TEXT } from "@/lib/osha";

assertQuotes(
  "faa-107",
  Object.values(R107).map((s) => s.quote),
);

const CHECKED = "2026-11-05";

export const metadata: Metadata = {
  title: "Part 107 Flight Limits Checker: 400 ft, 87 Knots, Visibility and Clouds (14 CFR 107.51)",
  description:
    "Check a planned drone flight against the operating limits in 14 CFR 107.51: groundspeed, altitude and the structure exception, flight visibility and cloud clearance.",
  alternates: { canonical: "/faa-107/tools/part-107-flight-limits/" },
};

export default function Part107LimitsPage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "FAA Part 107", href: "/faa-107/" },
        { label: "Tools", href: "/tools/" },
        { label: "Flight limits checker" },
      ]}
      title="Part 107 flight limits checker"
      lead="Check a planned flight's speed, altitude, visibility and cloud clearance against the operating limitations in 14 CFR 107.51, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 3, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <Part107Limits />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or flight-planning advice. {FAA_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}

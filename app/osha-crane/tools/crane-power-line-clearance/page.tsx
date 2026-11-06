import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CranePowerLine from "@/components/tools/CranePowerLine";
import { assertQuotes } from "@/lib/guides";
import { formatDate } from "@/lib/news";
import { CRANE_INDEPENDENCE_TEXT } from "@/lib/osha";
import { R1408 } from "@/lib/crane-rules";

assertQuotes(
  "osha-crane",
  Object.values(R1408).map((s) => s.quote),
);

const CHECKED = "2026-11-06";

export const metadata: Metadata = {
  title: "Crane Power Line Clearance: Table A and the 20-Foot Rule (29 CFR 1926.1408)",
  description:
    "Find the Table A minimum clearance for a power line up to 350 kV and whether the 20-foot rule in 29 CFR 1926.1408 is triggered, with the rule's words.",
  alternates: { canonical: "/osha-crane/tools/crane-power-line-clearance/" },
};

export default function CranePowerLinePage() {
  return (
    <PageShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "OSHA crane operator", href: "/osha-crane/" },
        { label: "Tools", href: "/tools/" },
        { label: "Crane power line clearance" },
      ]}
      title="Crane power line clearance"
      lead="Enter a power line's voltage and how close the equipment could get to it, to see the Table A minimum clearance and whether the 20-foot rule in 29 CFR 1926.1408 applies, with the exact words of the rule."
      meta={
        <>
          Fact-checked against official sources (eCFR text as of Nov 4, 2026) · Last checked{" "}
          <time dateTime={CHECKED}>{formatDate(CHECKED)}</time>
        </>
      }
    >
      <CranePowerLine />
      <p className="mt-12 max-w-[68ch] text-[0.9375rem] text-muted">
        A study aid, not legal or compliance advice. {CRANE_INDEPENDENCE_TEXT} Spot an error?{" "}
        <Link href="/contact/" className="text-low underline">
          Tell us
        </Link>
        .
      </p>
    </PageShell>
  );
}
